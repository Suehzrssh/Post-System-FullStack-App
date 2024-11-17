const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();
app.use(express.json());
app.use(cors());

const postRouter = require('./routes/Post.js');
app.use('/posts', postRouter);

const commentsRouter = require('./routes/Comments.js');
app.use('/comments', commentsRouter);

const usersRouter = require('./routes/Users.js');
app.use('/auth', usersRouter);

const likesRouter = require('./routes/Likes.js');
app.use('/like', likesRouter);


db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log("port is working on port 8080");
    });
});

