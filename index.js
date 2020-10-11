/* const express = require("express");
const app = express();
const compression = require("compression");

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8080/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
 */

// MIDDLEWARE
const express = require("express");
const app = express();
const db = require("./db");
const bc = require("./bc");
const bodyParser = require("body-parser");
//const s3 = require("./s3");
const multer = require("multer"); //npm package
const uidSafe = require("uid-safe"); //npm package
const path = require("path"); // core node module
//const { s3Url } = require("./config");
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
//const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");
const server = require("http").Server(app); // constructor for server object
const io = require("socket.io")(server, { origins: "localhost:8080" }); // socket needs a native node server in order to work

app.use(express.static("./public"));
app.use(express.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// COOKIE SESSION
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
}); // creating middleware to give socket access to our cookie session

// CSURF
app.use(csurf());
app.use(function (req, res, next) {
    //console.log("csurf token: ", req.csrfToken());
    res.cookie("mytoken", req.csrfToken());
    next();
});

// GET // REGISTRATION PAGE
app.get("/welcome", (req, res) => {
    console.log("welcome page");
    /* if (req.session.userId) {
        res.redirect("/");
    } else { */
    res.sendFile(__dirname + "/index.html");
    //}
});

// POST // REGISTRATION PAGE
app.post("/welcome", (req, res) => {
    const { first, last, email, password } = req.body;
    console.log("req.body: ", req.body);
    if (first === "" || last === "" || email === "" || password === "") {
        res.json({
            errorMsg: "Please make sure all input fields have been filled.",
            success: false,
        });
    } else {
        bc.hash(password)
            .then((password) => {
                const pword = password;
                console.log("req body password: ", pword);
                db.addJunior(first, last, email, pword).then((result) => {
                    req.session.userId = result.rows[0].id;
                    console.log("user created");
                    console.log("req.session.userId: ", req.session.userId);
                    res.json({
                        success: true,
                    });
                });
            })
            .catch((err) => {
                console.log("err in hash: ", err);
            });
    }
});

// GET // LOGIN PAGE
app.get("/login", (req, res) => {
    console.log("login page");
    res.sendFile(__dirname + "/index.html");
});

// POST // LOGIN PAGE
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "" || password === "" || !email || !password) {
        res.json({
            errorMsg: "Please make sure all input fields have been filled.",
            success: false,
        });
    } else {
        db.checkEmail(email)
            .then((results) => {
                console.log("results: ", results.rows);
                if (results.rows.length === 0) {
                    res.json({
                        error: true,
                    });
                } else {
                    bc.compare(password, results.rows[0].pword)
                        .then((result) => {
                            console.log("compare result:", result);
                            if (result) {
                                const userId = results.rows[0].id;
                                req.session.userId = userId;
                                res.json({
                                    success: true,
                                });
                            } else {
                                res.json({
                                    errorMsg:
                                        "The entered email or password are incorrect. Please try again",
                                    success: false,
                                });
                            }
                        })
                        .catch((err) => {
                            console.log("err in compare: ", err);
                        });
                }
            })
            .catch((err) => {
                console.log("err in checkEmail: ", err);
            });
    }
});

// GET // PASSWORD RESET PAGE
app.get("/password/reset", (req, res) => {
    console.log("password reset page");
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
        // console.log("is this rendering?");
    }
});

// POST // PASSWORD RESET START PAGE
/* app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;

    if (email === "") {
        res.json({
            errorMsg:
                "Please make sure you have entered your registered email.",
            success: false,
        });
    } else {
        db.checkEmail(email)
            .then((result) => {
                console.log("checkEmail /pw/reset/start result: ", result);
                console.log("results: ", result.rows);
                const correctEmail = result.rows[0].email;
                const name = result.rows[0].firstname;
                if (result.rows.length === 0 || correctEmail === "") {
                    console.log("entered login details are somewhat empty");
                    res.json({
                        errorMsg:
                            "The entered email or password are incorrect. Please try again",
                        success: false,
                    });
                } else {
                    const secretCode = cryptoRandomString({
                        length: 6,
                    });
                    db.addPwReset(correctEmail, secretCode).then((r) => {
                        console.log("addPwReset r: ", r);
                        sendEmail(
                            correctEmail,
                            `${secretCode} is your Antisocial account recovery code`,
                            secretCode,
                            name
                        );
                        console.log("Email has been sent to: ", correctEmail);
                        console.log("Timestamp: ", r.rows[0].created_at);
                        res.json({
                            success: true,
                            timestamp: r.rows[0].created_at,
                        });
                    });
                    //
                }
            })
            .catch((err) =>
                console.log("err in checkEmail /password/reset/start: ", err)
            );
    }
}); */

// POST // PASSWORD RESET VERIFY PAGE
app.post("/password/reset/verify", (req, res) => {
    console.log("verify req.body: ", req.body);
    const { cryptocode, password, email } = req.body;

    if (cryptocode === "" || password === "") {
        res.json({
            errorMsg:
                "Please make sure you have entered your code and new password.",
            success: false,
        });
    } else {
        db.findPwReset(email)
            .then((result) => {
                console.log("cryptocode: ", cryptocode);
                console.log(
                    "findPwReset result.rows[0].code: ",
                    result.rows[0].code
                );
                if (cryptocode === result.rows[0].code) {
                    res.json({
                        success: true,
                    });
                } else {
                    res.json({
                        errorMsg:
                            "The code you entered is incorrect, please try again.",
                        success: false,
                    });
                }
            })
            .catch((err) => console.log("err in findPwReset: ", err));
    }
});

// GET // PROFILE
app.get("/profile", (req, res) => {
    console.log("profile page");
    res.sendFile(__dirname + "/index.html");
});

// GET // LOGOUT PAGE
app.get("/logout", (req, res) => {
    console.log("logout page");
    req.session = null;
    console.log("/logout req.session: ", req.session);
    res.redirect("/welcome");
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function () {
    console.log("I'm listening.");
});

// SOCKET.IO
io.on("connection", (socket) => {
    //
});
