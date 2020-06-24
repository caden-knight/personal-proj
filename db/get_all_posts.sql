select p.title, p.date, p.content, u.username, u.prof_pic from users u
join posts p on u.id = p.author_id;