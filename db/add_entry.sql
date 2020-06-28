insert into dream_journal (lucid, date_created, title, content, dream_signs, date, author_id)
values ($1, to_char(now():: date, 'Day Mon dd, yyyy'), $2, $3, $4, $5, $6)
returning *;