insert into posts (title, date, content, author_id)
values ($1, to_char(now():: date, 'Day Mon dd, yyyy'), $2, $3)
returning *;