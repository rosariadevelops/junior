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

module.exports.addIdea = (
    idea_title,
    idea_dev_id,
    idea_desc,
    idea_stack,
    idea_duedate
) => {
    return db.query(
        `
        INSERT INTO ideas (
            idea_title,
            idea_dev_id,
            idea_desc,
            idea_stack,
            idea_duedate)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [idea_title, idea_dev_id, idea_desc, idea_stack, idea_duedate]
    );
};

module.exports.getIdeas = () => {
    return db.query(
        `
    SELECT * FROM ideas;`
    );
};

module.exports.getNameOfJunior = (id) => {
    return db.query(
        `
    SELECT firstname, lastname, image_url FROM juniors
    WHERE id = $1;`,
        [id]
    );
};

module.exports.getNamesOfJuniors = (arrayOfIds) => {
    const query = `SELECT firstname, lastname, image_url FROM juniors WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]);
};

module.exports.getProjects = (id) => {
    return db.query(
        `
    SELECT * FROM projects
    WHERE proj_dev_id = $1;`,
        [id]
    );
};

module.exports.getIdeaStatus = (creator_id, requester_id) => {
    return db.query(
        `
    SELECT * FROM ideaToProject 
    WHERE (creator_id = $1 AND requester_id = $2)
    OR (creator_id = $2 AND requester_id = $1);`,
        [creator_id, requester_id]
    );
};

module.exports.insertIdeaRequest = (creator_id, requester_id) => {
    return db.query(
        `
        INSERT INTO ideaToProject (creator_id, requester_id, accepted)
        VALUES ($1, $2, false)
        RETURNING *
        `,
        [creator_id, requester_id]
    );
};

module.exports.cancelIdeaRequest = (creator_id, requester_id) => {
    return db.query(
        `
        DELETE FROM ideaToProject
        WHERE (creator_id = $1 AND requester_id = $2)
        OR (requester_id = $2 AND creator_id = $1)
        RETURNING *;`,
        [creator_id, requester_id]
    );
};

module.exports.acceptIdeaRequest = (creator_id, requester_id) => {
    return db.query(
        `
        UPDATE ideaToProject 
        SET accepted = true
        WHERE (creator_id = $1 AND requester_id = $2)
        OR (creator_id = $2 AND requester_id = $1)
        RETURNING *;`,
        [creator_id, requester_id]
    );
};

module.exports.getIdeaInfo = (id) => {
    return db.query(
        `
    SELECT * FROM ideas 
    WHERE id = ($1);`,
        [id]
    );
};

module.exports.getVotes = (id) => {
    return db.query(
        `
    SELECT vote_up, vote_down FROM ideas 
    WHERE id = ($1);`,
        [id]
    );
};

module.exports.insertVoteUp = (idea_id, count) => {
    return db.query(
        `
        UPDATE ideas
        SET vote_up = ($2)
        WHERE id = $1
        RETURNING vote_up;`,
        [idea_id, count]
    );
};

module.exports.insertVoteDown = (idea_id, count) => {
    return db.query(
        `
        UPDATE ideas
        SET vote_down = ($2)
        WHERE id = $1
        RETURNING vote_down;`,
        [idea_id, count]
    );
};
