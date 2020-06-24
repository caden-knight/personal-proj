insert into posts (title, date, content, author_id)
values ($1, current_timestamp, $2, $3);