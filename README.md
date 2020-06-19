# Lucid Dreaming App
## What is the purpose?
- To give users an easy to follow guide on how to Lucid Dream and what the benefits are.
- To allow users a place to share their struggles, successes, experiences and questions with other users.
- Gives a place for users to ask Lucid Dreaming experts questions.
- Offers a dream journal for users to keep track of their dreams when getting started.

## Problems My App Solves
- Making it possible to interact with actual people striving to learn how to Lucid Dreaming and give help to others when needed.
- Allowing support and mentorship by those who have mastered Lucid Dreaming.

## Target Users
- People wanting to learn how to Lucid Dream.

## MVP
- Store the user's dream journal and make it accessible to them
- Capable of posting, editing, and deleting posts.
- Will display a list of posts by various users and allow you to click on each one to read, learn more and reply.

## Components
- App.js - renders the Header component
- Landing.js - Will hold necessary auth requirements such as a form container with an input field for a username and password. It will have username and password variables stored on state and the axios.post request for creating a new user and logging in an existing user along with their respective methods of login() and register()
- Header.js - Will contain the nav links for Home, About, Ask, Post, and DreamJournal. It will contain state with the users name, profile pic info 
- Home.js will contain state for the current user's username so it can display a personalized welcome message.
- About.js - Will have a sidebar which will be a list of various methods of Lucid Dreaming and will link to more info about those methods
- Topics.js will contain the information of various methods of Lucid Dreaming
- GettingStarted.js - Will be a list of steps to have your first Lucid Dreaming.
- Posts.js - will display the list of posts made by the different users which will show the title, topic, date posted, author, and a preview of the content. State will contain posts initialized to an empty array and an isEditing key initialized to false. componentDidMount() will make an axios.get request to retrieve all of the posts and their information. A createNew() method will make an axios.post to save the users post to the database. Once the user has posted, if the post is theirs, they can choose to edit() which will make an axios.put call to allow user to edit. There will also need to be an edit toggle method and change isEditing on state to true. and a delete() option which will have an axios.delete call to delete a user's post if desired.
- Post.js - Will use the post id as a parameter and display the full post made by the user. (maybe not needed)
- Ask.js - will display names of the Lucid dreaming experts which can be clicked on to see the questions they have answered (if time permits). An input box will be provided after clicking an Ask question. A method to update state with what the textarea says will be recorded. After the user submits their question an axios.post will send it to the questions database which only admins can access.
- DreamJournal.js - will contain state for the user's input. a componentDidMount() makes an axios.get call to get the user's dream journal entries. state will contain a search input initialized to an empty string, posts an empty array. it will have a method to update search input. the search() method will make an axios.post call to check if there is an entry with matching titles. You can click on each of your entries to view them in full which will bring you to a screen with your journal entries contained in a book. 
- Entry.js - will display the full journal entry. Will be passed props from Dream Journal containing the entry information and using a parameter of the journal id to get to the specific entry. A componentDidMount() will be needed to do that by making an axios.get call.

## Routes
- / = Landing
- /home = Home
- /about = About
- /about/topics/:topic_id = Topics
- /getting_started = GettingStarted
- /posts = Posts
- /post/:post_id = Post
- /ask = Ask
- /journal = DreamJournal
- /entry/:journal_id = Entry

## Schema
<img src="./pictures/Schema.png">
### Users Table
CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(75),
  "password" VARCHAR(50),
  "admin" BOOLEAN,
  "phone" INT,
  "prof_pic" TEXT
);

### Posts Table
CREATE TABLE IF NOT EXISTS "posts" (
  "id" SERIAL PRIMARY KEY,
  "date" timestamp,
  "title" VARCHAR(100),
  "content" TEXT,
  "author_id" INT
);

### Dream Journal Table
CREATE TABLE IF NOT EXISTS "dream_journal" (
  "id" SERIAL PRIMARY KEY,
  "date" VARCHAR(30),
  "title" VARCHAR(100),
  "content" TEXT,
  "dream_signs" TEXT,
  "author_id" INT
);

### Questions Table
CREATE TABLE IF NOT EXISTS "questions" (
  "id" SERIAL PRIMARY KEY,
  "date" timestamp,
  "title" VARCHAR(100),
  "question" TEXT,
  "author_id" INT,
  "isAnswered" boolean
);

### Foreign Keys/References
ALTER TABLE "dream_journal" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

## Server Endpoints
- GET = /api/posts - gets all posts from the posts
- GET = /api/post/:postId - gets a single post based on the post id param given.
- GET = /api/entries - gets all of the users journal entries where the author_id matches the user_id
- GET = /api/entry/:entryId - gets a single entry from the user's journal where the entry id = matches the id given on params
- POST = /api/create_post - will insert the newly created post to the database and provide the required values
- POST = /api/create_entry - will insert a new post with associated values into the dream journal schema
- POST = /api/auth/login - will authenticate the username and compare their hashed password
- POST = /api/auth/register will take a new username, hash the password give them a unique id and a profile pic url
- PUT = /api/post/:postId = will use the post ID from params to allow a user to update aspects of the selected post
- PUT = /api/entry/:entry_id - allows user to update selected journal entry
- DELETE = /api/post/:post_id - will delete the selected post
- DELETE = /api/entry/:entry_id - will delete the selected journal entry where the entry_id param matches the entry_id on the dream_journal
