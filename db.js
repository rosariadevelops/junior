const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/junior"
);

module.exports.addJunior = (first, last, email, pword) => {
    return db.query(
        `
        INSERT INTO juniors (firstname, lastname, email, pword)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [first, last, email, pword]
    );
};

module.exports.checkEmail = (email) => {
    return db.query(
        `
    SELECT * FROM juniors 
    WHERE email = ($1);`,
        [email]
    );
};

module.exports.addPwReset = (email, code) => {
    return db.query(
        `
        INSERT INTO resetpassword (email, code)
        VALUES ($1, $2)
        RETURNING *`,
        [email, code]
    );
};

module.exports.findPwReset = (email) => {
    return db.query(
        `
    SELECT * FROM resetpassword 
    WHERE email = ($1)
    ORDER BY id DESC
    LIMIT 1;`,
        [email]
    );
};
