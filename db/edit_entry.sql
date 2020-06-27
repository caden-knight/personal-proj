update dream_journal 
set lucid = $1, 
title = $2, 
date_edited = to_char(now():: date, 'Day Mon dd, yyyy'), 
content = $3, 
dream_signs = $4

where id = $5;