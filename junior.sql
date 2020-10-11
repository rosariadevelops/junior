DROP TABLE IF EXISTS juniors;

CREATE TABLE juniors (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    pword VARCHAR NOT NULL,
    image_url VARCHAR,
    avail VARCHAR,
    job_title VARCHAR,
    stacks VARCHAR
);

DROP TABLE IF EXISTS resetpassword;

CREATE TABLE resetpassword (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

DROP TABLE IF EXISTS ideas;

CREATE TABLE ideas (
    id SERIAL PRIMARY KEY,
    idea_title VARCHAR NOT NULL,
    idea_dev_id INT NOT NULL REFERENCES juniors(id) ON DELETE CASCADE,
    idea_image VARCHAR,
    idea_desc VARCHAR,
    vote_up INT,
    vote_down INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

DROP TABLE IF EXISTS ideas_comments;

CREATE TABLE ideas_comments (
    id SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL,
    idea_id INT NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)