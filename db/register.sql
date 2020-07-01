insert into users (email, username, password, admin, prof_pic)
values ($1, $2, $3, false, $4)
returning *;