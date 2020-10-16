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

module.exports.addIdea = (idea_title, idea_dev_id, idea_desc, idea_duedate) => {
    return db.query(
        `
        INSERT INTO ideas (
            idea_title,
            idea_dev_id,
            idea_desc,
            idea_duedate)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [idea_title, idea_dev_id, idea_desc, idea_duedate]
    );
};

/* module.exports.getIdeas = () => {
    return db.query(
        `
    SELECT * FROM ideas`
    );
}; */

/* module.exports.addIdeaStack = (idea_id, stack) => {
    return db.query(
        `
    INSERT INTO ideas (
            idea_id,
            stack)
        VALUES ($1, $2)
        RETURNING *`,
        [idea_id, stack]
    );
}; */

module.exports.addIdeaStack = (idea_id, arrayOfStack) => {
    return db.query(
        `
    INSERT INTO ideas_stack (idea_id, stack)
    VALUES ($1, $2)
    RETURNING *`,
        [idea_id, arrayOfStack]
    );
};

module.exports.getIdeas = () => {
    return db.query(
        `
    SELECT ideas.id, ideas.idea_title, ideas.idea_dev_id, ideas.idea_desc, AGE(ideas.idea_duedate), ideas.vote_up, ideas.vote_down, ideas_stack.stack
    FROM ideas
    JOIN ideas_stack
    ON ideas.id = ideas_stack.idea_id
    ORDER BY ideas.id DESC`
    );
};

module.exports.getStackByIdeaId = (idea_id) => {
    return db.query(
        `
    SELECT * FROM ideas_stack
    WHERE idea_id = ($1)`,
        [idea_id]
    );
};

module.exports.getStackByStack = (stack) => {
    return db.query(
        `
    SELECT * FROM ideas_stack
    WHERE stack = ($1)`,
        [stack]
    );
};

module.exports.getIdea = (ideaId) => {
    return db.query(
        `
    SELECT id, idea_title, idea_dev_id, idea_desc, AGE(idea_duedate), vote_up, vote_down FROM ideas
    WHERE id = ($1);`,
        [ideaId]
    );
};

module.exports.getNameOfJunior = (id) => {
    return db.query(
        `
    SELECT firstname, lastname FROM juniors
    JOIN ideas
    ON (ideas.id = ($1) AND ideas.idea_dev_id = juniors.id)`,
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
    WHERE proj_dev_id = $1`,
        [id]
    );
};

module.exports.getIdeaStatus = (loggedInUser, idea_id) => {
    return db.query(
        `
    SELECT * FROM ideaToProject 
    WHERE (requester_id = $1 AND idea_id = $2)
    OR (creator_id = $1 AND idea_id = $2)`,
        [loggedInUser, idea_id]
    );
};

module.exports.insertIdeaRequest = (creator_id, requester_id, idea_id) => {
    return db.query(
        `
        INSERT INTO ideaToProject (creator_id, requester_id, idea_id, accepted)
        VALUES ($1, $2, $3, false)
        RETURNING *
        `,
        [creator_id, requester_id, idea_id]
    );
};

module.exports.cancelIdeaRequest = (requester_id, idea_id) => {
    return db.query(
        `
        DELETE FROM ideaToProject
        WHERE (requester_id = $1 AND idea_id = $2)
        RETURNING *;`,
        [requester_id, idea_id]
    );
};

module.exports.acceptIdeaRequest = (creator_id, idea_id) => {
    return db.query(
        `
        UPDATE ideaToProject 
        SET accepted = true
        WHERE (creator_id = $1 and idea_id = $2)
        RETURNING *;`,
        [creator_id, idea_id]
    );
};

module.exports.moveIdeaToProject = (
    proj_title,
    proj_dev_id_a,
    proj_dev_id_b,
    proj_desc,
    proj_stack,
    proj_duedate
) => {
    return db.query(
        `
        INSERT INTO (proj_title, proj_dev_id_a, proj_dev_id_b, proj_desc, proj_stack, proj_duedate) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`,
        [
            proj_title,
            proj_dev_id_a,
            proj_dev_id_b,
            proj_desc,
            proj_stack,
            proj_duedate,
        ]
    );
};

module.exports.getIdeaInfo = (id) => {
    return db.query(
        `SELECT ideas.id, ideas.idea_title, ideas.idea_dev_id, ideas.idea_desc, AGE(ideas.idea_duedate), ideas.vote_up, ideas.vote_down, ideas_stack.stack
        FROM ideas
        JOIN ideas_stack
        ON ideas.id = ideas_stack.idea_id
        WHERE ideas.id = ($1)`,
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
        WHERE id = ($1)
        RETURNING *;`,
        [idea_id, count]
    );
};

module.exports.insertVoteDown = (idea_id, count) => {
    return db.query(
        `
        UPDATE ideas
        SET vote_down = ($2)
        WHERE id = ($1)
        RETURNING *;`,
        [idea_id, count]
    );
};

module.exports.getLatestComments = () => {
    return db.query(
        `
    SELECT ideas_comments.id, sender_id, comment, ideas_comments.idea_id, ideas_comments.created_at, firstname, lastname
    FROM ideas_comments 
    JOIN ideas
    ON (idea_id = ideas.id)
    JOIN juniors
    ON (juniors.id = sender_id)
    ORDER BY created_at DESC`
    );
};

module.exports.addComment = (sender_id, comment, idea_id) => {
    return db.query(
        `
    INSERT INTO ideas_comments 
    (sender_id, comment, idea_id) 
    VALUES ($1, $2, $3)
    RETURNING *;`,
        [sender_id, comment, idea_id]
    );
};

module.exports.renderNewComment = (loggedUser, ideaId) => {
    return db.query(
        `
    SELECT firstname, lastname
    FROM juniors
    JOIN ideas_comments
    ON (juniors.id = ($1) AND ideas_comments.idea_id = ($2))
    ORDER BY created_at DESC
    LIMIT 1`,
        [loggedUser, ideaId]
    );
};
