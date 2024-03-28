-- name: InsertUser :one
INSERT INTO users (name)
VALUES ($1)
RETURNING *;

-- name: GetUserByName :one
SELECT * FROM users WHERE name = $1;