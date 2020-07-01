insert into questions(question, date, message, answered, author_id)
values($1, to_char(now():: date, 'Day Mon dd, yyyy'), $2, false, $3)
returning *;