insert into dream_journal (lucid, title, date, content, dream_signs, author_id)
values ($1, $2, $3, $4, $5, $6)
returning *;