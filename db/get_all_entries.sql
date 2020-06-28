select dj.author_id, dj.id, dj.lucid, dj.title, dj.date, dj.content, dj.dream_signs 
from dream_journal dj 
join users u on u.id = dj.author_id;
