insert into questions(question, date, message, answered)
values($1, to_char(now():: date, 'Day Mon dd, yyyy'), $2, false)
returning *;