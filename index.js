const express = require('express')
const app = express()
const logger = require('morgan')

const connectToMongoDB = require('./database/connectToMongoDB')

app.use(express.json())
app.use(logger('dev'))

const usersRouter = require("./routes/usersRouter");
app.use("/api/v1/users", usersRouter)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
  connectToMongoDB()
})

/*
setting up a GitHub Repository
first, create a new repository on GitHub

then run the following commands:

git init - set up your local project as a git project
git add . - begin tracking your files to be committed (staging your changes)
git commit -m "Small message" - creating a snapshot of your currently staged changes to put on github
git remote add origin https-link - tell git to connect to the remote repository you created on github
git push -u origin master\main - get your committed changes from your local repository to your remote repository on github

*/