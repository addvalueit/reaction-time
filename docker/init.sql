CREATE TABLE users (
  id   BIGSERIAL PRIMARY KEY,
  name text      NOT NULL
);

CREATE TABLE reaction_times (
    id BIGSERIAL PRIMARY KEY,
    time BIGSERIAL NOT NULL,
    tms_insert TIMESTAMP NOT NULL,
    user_id BIGSERIAL NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
