-- name: InsertReactionTime :one
INSERT INTO reaction_times (time, user_id, tms_insert)
VALUES ($1, $2, NOW())
RETURNING *;