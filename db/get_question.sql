select u.username, u.email, q.date, q.question, q.message, q.author_id, q.answered, q.answer from questions q
join users u on u.id = q.author_id;

