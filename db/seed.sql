CREATE TABLE "users" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(75),
  password TEXT,
  admin BOOLEAN,
  phone INT,
  prof_pic TEXT
);

CREATE TABLE "dream_journal" (
  "id" SERIAL PRIMARY KEY,
  "lucid" BOOLEAN,
  "title" VARCHAR(100),
  "date" VARCHAR(30),
  "content" TEXT,
  "dream_signs" TEXT,
  "author_id" INT
);

CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "date" timestamp,
  "title" VARCHAR(100),
  "content" TEXT,
  "author_id" INT
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "date" text,
  "question" VARCHAR(250),
  "message" TEXT,
  "author_id" INT,
  "answered" boolean
);

ALTER TABLE "dream_journal" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("author_id") REFERENCES "users";

alter table posts alter column date TYPE text;
alter table questions add column answer text;
alter table users add column email varchar(120);
alter table users drop column phone;
ALTER TABLE users ALTER COLUMN username SET NOT NULL;
ALTER TABLE users ALTER COLUMN password SET NOT NULL;
ALTER TABLE users ALTER COLUMN email SET NOT NULL;


