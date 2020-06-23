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
  "date" timestamp,
  "title" VARCHAR(100),
  "question" TEXT,
  "author_id" INT,
  "isAnswered" boolean
);

ALTER TABLE "dream_journal" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("author_id") REFERENCES "users" 