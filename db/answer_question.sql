update questions
set answer = $1,
answered = true
where id = $2
returning *;