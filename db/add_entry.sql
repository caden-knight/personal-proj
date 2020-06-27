insert into dream_journal (lucid, title, date, content, dream_signs, author_id)
values ($1, to_char(now():: date, 'Day Mon dd, yyyy'), $2, $3, $4, $5)
returning *;