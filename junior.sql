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
);

DROP TABLE IF EXISTS ideas CASCADE;

CREATE TABLE ideas (
    id SERIAL PRIMARY KEY,
    idea_title VARCHAR NOT NULL,
    idea_dev_id INT NOT NULL REFERENCES juniors(id) ON DELETE CASCADE,
    idea_image VARCHAR,
    idea_desc VARCHAR,
    idea_duedate DATE NOT NULL DEFAULT CURRENT_DATE,
    vote_up INT NOT NULL DEFAULT 0,
    vote_down INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS ideas_stack CASCADE;

CREATE TABLE ideas_stack (
    id SERIAL PRIMARY KEY,
    idea_id INT NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
    stack TEXT [] NOT NULL,
    project_id INT
);

DROP TABLE IF EXISTS ideas_comments CASCADE;

CREATE TABLE ideas_comments (
    id SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL,
    idea_id INT NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS ideaToProject CASCADE;

CREATE TABLE ideaToProject (
    id SERIAL PRIMARY KEY,
    creator_id INT REFERENCES juniors(id) NOT NULL,
    requester_id INT REFERENCES juniors(id) NOT NULL,
    idea_id INT REFERENCES ideas(id) NOT NULL,
    accepted BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    proj_title VARCHAR NOT NULL,
    proj_dev_id_a INT NOT NULL REFERENCES juniors(id) ON DELETE CASCADE,
    proj_dev_id_b INT NOT NULL REFERENCES juniors(id) ON DELETE CASCADE,
    proj_image VARCHAR,
    proj_desc VARCHAR,
    proj_duedate DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);