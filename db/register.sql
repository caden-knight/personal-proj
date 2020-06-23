insert into users (username, password, admin, prof_pic)
values ($1, $2, false, $3)
returning *;