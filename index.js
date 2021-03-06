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
const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");
//const { async } = require("crypto-random-string");
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
    res.cookie("mytoken", req.csrfToken());
    next();
});

// GET // REGISTRATION PAGE
app.get("/welcome", (req, res) => {
    res.sendFile(__dirname + "/index.html");
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
                db.addJunior(first, last, email, pword).then((result) => {
                    req.session.userId = result.rows[0].id;
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
                if (results.rows.length === 0) {
                    res.json({
                        error: true,
                    });
                } else {
                    bc.compare(password, results.rows[0].pword)
                        .then((result) => {
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
    res.sendFile(__dirname + "/index.html");
});

// POST // PASSWORD RESET START PAGE
app.post("/password/reset/start", (req, res) => {
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
                //console.log("checkEmail /pw/reset/start result: ", result);
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
                    db.addPwReset(correctEmail, secretCode).then(() => {
                        sendEmail(
                            correctEmail,
                            `${secretCode} is your Junior account recovery code`,
                            secretCode,
                            name
                        );
                        //console.log("Email has been sent to: ", correctEmail);
                        res.json({
                            success: true,
                        });
                    });
                    //
                }
            })
            .catch((err) => console.log("err in checkEmail: ", err));
    }
});

// POST // PASSWORD RESET VERIFY PAGE
app.post("/password/reset/verify", (req, res) => {
    //console.log("verify req.body: ", req.body);
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
                //console.log("cryptocode: ", cryptocode);
                /* console.log(
                    "findPwReset result.rows[0].code: ",
                    result.rows[0].code
                ); */
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

// GET // IDEABOARD
app.get("/ideaboard", async (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        const { rows } = await db
            .getIdeas()
            .catch((err) => console.log("err in getIdeas: ", err));

        res.json({
            success: true,
            ideas: rows,
        });
    }
});

// POST // CREATE IDEA MODAL
app.post("/create-idea", async (req, res) => {
    const loggedInUser = req.session.userId;
    const { idea_title, idea_desc, idea_duedate, stack } = req.body;

    const addIdeaResult = await db
        .addIdea(idea_title, loggedInUser, idea_desc, idea_duedate)
        .catch((err) => console.log("err in addIdea: ", err));

    const addIdeaStackResult = await db.addIdeaStack(
        addIdeaResult.rows[0].id,
        stack
    );

    res.json({
        success: true,
        ideaAdded: addIdeaResult.rows[0],
        ideaStack: addIdeaStackResult.rows[0],
    });
});

// GET // REQUEST COLAB BUTTON
app.get(`/idea-status/:ideaId/:otherUserId`, async (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        const getIdeaResult = await db
            .getIdea(req.params.ideaId)
            .catch((err) => console.log("err in getIdeaResult: ", err));

        /* const getStackResult = await db
            .getStackByIdeaId(req.params.ideaId)
            .catch((err) => console.log("err in getStackResult: ", err)); */

        const ideaId = getIdeaResult.rows[0].id;
        const ideaCreator = getIdeaResult.rows[0].idea_dev_id;

        const { rows } = await db
            .getIdeaStatus(req.session.userId, ideaId)
            .catch((err) => console.log("err in getIdeaStatus: ", err));

        if (rows.length > 0 && rows[0].accepted == true) {
            // console.log("These guys are making some projects!");
            res.json({
                buttonText: "Go to Project",
                blueButton: true,
                creatorId: rows[0].creator_id,
                ideaId: req.params.ideaId,
            });
        } else if (rows.length <= 0 && ideaCreator == req.session.userId) {
            // console.log("Logged in user MADE the ideacard");
            // THIS IS LOGGING AS TRUE FOR ID 1 CARD
            res.json({
                buttonText: "You're still waiting for a partner",
                ideaId: req.params.ideaId,
                greyButton: true,
            });
        } else if (rows.length > 0 && ideaCreator == req.session.userId) {
            // console.log("logged in user RECEIVED the request");
            // THIS IS LOGGING AS TRUE FOR ID 1 CARD
            res.json({
                buttonText: "Accept team-up request",
                ideaId: req.params.ideaId,
                greyButton: true,
            });
        } else if (rows.length > 0) {
            // console.log("idea request PENDING");
            if (
                rows[0].requester_id === req.session.userId &&
                rows[0].accepted === false
            ) {
                // console.log("Logged in user made the REQUEST");
                res.json({
                    buttonText: "Cancel team-up request",
                    creatorId: rows[0].creator_id,
                    ideaId: req.params.ideaId,
                    greyButton: true,
                });
            }
        } else {
            // console.log("NO request existing");
            res.json({
                buttonText: "Ask to team up",
                blueButton: true,
                ideaId: req.params.ideaId,
                loggedInUser: req.params.userId,
            });
        }
    }
});

// POST // REQUEST COLAB BUTTON
app.post(
    "/idea-status/:ideaId/:otherUserId/request-colab",
    async (req, res) => {
        let otherUserId = parseInt(req.params.otherUserId);

        if (otherUserId != req.session.userId) {
            const { rows } = await db
                .insertIdeaRequest(
                    req.params.otherUserId,
                    req.session.userId,
                    req.params.ideaId
                )
                .catch((err) => console.log("err in insertIdeaRequest: ", err));

            if (req.session.userId === rows[0].requester_id) {
                res.json({
                    data: rows[0],
                    status: "Cancel team-up request",
                    success: true,
                });
            } else {
                res.json({
                    data: rows[0],
                    status: "Accept team-up request",
                    success: true,
                });
            }
        } else {
            res.json({
                success: false,
            });
        }
    }
);

// POST // ACCEPT COLAB BUTTON
app.post("/idea-status/:ideaId/:otherUserId/accept-colab", async (req, res) => {
    let otherUserId = parseInt(req.params.otherUserId);

    if (otherUserId === req.session.userId) {
        const { rows } = await db
            .acceptIdeaRequest(req.session.userId, req.params.ideaId)
            .catch((err) => console.log("err in acceptIdeaRequest: ", err));

        res.json({
            data: rows[0],
            status: "Go to Project",
            success: true,
            ideaBecomesProject: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});

// GET // MOVE IDEA TO PROJECTS
app.post(
    "/idea-status/:ideaId/:otherUserId/pairing-accepted",
    async (req, res) => {
        console.log("I need to get the ID of the IDEA");
        console.log("REQ PARAMS: ", req.params);

        const getIdeaResult = await db
            .getIdea(req.params.ideaId)
            .catch((err) =>
                console.log("err in post /pairing-accepted getResult: ", err)
            );
        console.log("getIdeaResult: ", getIdeaResult.rows[0]);

        /* proj_title,
        proj_dev_id_a,
        proj_dev_id_b,
        proj_desc,
        proj_stack,
        proj_duedate; */

        /* if (req.params.otherUserId) {
            const { rows } = await db
                .moveIdeaToProject(
                    proj_title,
                    req.params.otherUserId,
                    req.session.userId,
                    proj_desc,
                    proj_stack,
                    proj_duedate
                )
                .catch((err) => console.log("err in moveIdeaToProject: ", err));
            console.log("ACCEPT COLAB RESULT: ", rows[0]);
            res.json({
                data: rows[0],
                status: "Delete friend",
                success: true,
                ideaBecomesProject: true,
            });
        } else {
            res.json({
                success: false,
            });
        } */
    }
);

// GET // PROJECT SINGLE
app.get("/project/:projId", async (req, res) => {
    console.log("I need to get the ID of the IDEA");
    console.log("REQ PARAMS: ", req.params);

    if (req.params.otherUserId) {
        const { rows } = await db
            .moveIdeaToProject(req.params.otherUserId, req.session.userId)
            .catch((err) => console.log("err in moveIdeaToProject: ", err));
        console.log("ACCEPT COLAB RESULT: ", rows[0]);
        res.json({
            data: rows[0],
            status: "Delete friend",
            success: true,
            ideaBecomesProject: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});

// GET // IDEA MODAL
app.get("/idea/:id.json", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        db.getIdeaInfo(req.params.id)
            .then(({ rows }) => {
                res.json({
                    data: rows[0],
                    success: true,
                });
            })
            .catch((err) => console.log("err in getIdeaInfo: ", err));
    }
});

// GET // IDEA CREATOR
app.get("/idea-creator/:id.json", (req, res) => {
    db.getNameOfJunior(req.params.id)
        .then(({ rows }) => {
            res.json({
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                success: true,
            });
        })
        .catch((err) => console.log("err in getNameOfJunior: ", err));
});

// GET // PROJECTS
app.get("/projects", async (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
        /* const { rows } = await db
            .getProjects()
            .catch((err) => console.log("err in getProjects: ", err));
        console.log("getProjects results: ", rows);
        res.json({
            success: true,
            projects: rows,
        }); */
    }
});

// GET // LOGOUT PAGE
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

/* server.listen(8080, function () {
    console.log("I'm listening.");
}); */
server.listen(process.env.PORT || 8080, () => console.log("Server Listening"));

// SOCKET.IO
io.on("connection", (socket) => {
    const loggedUser = socket.request.session.userId;
    if (!loggedUser) {
        return socket.disconnect(true);
    }

    socket.on(`Card Id`, (cardId) => {
        db.getVotes(cardId).then(({ rows }) => {
            const serverVoteUp = rows[0].vote_up;
            const serverVoteDown = rows[0].vote_down;
            const votes = {
                serverVoteUp,
                serverVoteDown,
                cardId: parseInt(cardId),
            };
            socket.emit("votes", votes);
        });

        db.getLatestComments()
            .then(({ rows }) => {
                const reverseComments = rows.reverse();

                const comments = {
                    reverseComments,
                    cardId: parseInt(cardId),
                };
                io.sockets.emit("ideaComments", comments);
            })
            .catch((err) => console.log("err in getLatestComments: ", err));
    });

    socket.on(`Up Vote on Card`, (insertUpObj) => {
        db.insertVoteUp(insertUpObj.cardId, insertUpObj.count)
            .then(({ rows }) => {
                const votes = {
                    vote_up: rows[0].vote_up,
                    vote_down: rows[0].vote_down,
                    cardId: insertUpObj.cardId,
                };
                io.sockets.emit("newUpVote", votes);
            })
            .catch((err) => console.log("error in insertVoteUp: ", err));
    });

    socket.on(`Down Vote on Card`, (insertDownObj) => {
        db.insertVoteDown(insertDownObj.cardId, insertDownObj.count)
            .then(({ rows }) => {
                const votes = {
                    vote_up: rows[0].vote_up,
                    vote_down: rows[0].vote_down,
                    cardId: insertDownObj.cardId,
                };
                io.sockets.emit("newDownVote", votes);
            })
            .catch((err) => console.log("error in insertVoteDown: ", err));
    });

    socket.on("Latest comment", (newComment, ideaId) => {
        db.addComment(loggedUser, newComment, ideaId).then(({ rows }) => {
            db.renderNewComment(loggedUser, ideaId).then((result) => {
                const newInfo = {
                    ...rows[0],
                    ...result.rows[0],
                };
                io.sockets.emit("newComment", newInfo);
            });
        });
    });
});
