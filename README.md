# react-node-boilerplate

react-node-boilerplate allows you to easily create a new project from scratch with minimal setup, getting you coding quicker!

### Installation

Run the following inside your projects directory to clone the boilerplate, replacing \<project-name> with the name of your project E.G. todo-list or music-player

```sh
$ git clone https://github.com/LukeTwomey/react-node-boilerplate <project-name>
```

Change into the project directory that was just created E.G. todo-list or music-player

```sh
$ cd <project-name>
```

Install the required dependencies

```sh
$ npm install
```

### Running the app in development

To run the app in development

```sh
$ npm run dev
```

### Connecting a development database

Create a new project and cluster on [mongodb.com](https://cloud.mongodb.com/v2#/org/5d010935014b764d90359b5a/projects/create)

Open config/dev.js and replace \<dev-database-uri> with the uri to connect to the newly created dev database, E.G.:

```sh
$ mongoURI: 'mongodb+srv://username:password@cluster0-3h4tl.mongodb.net/test?retryWrites=true&w=majority'
```

If the connection is set up correctly, on starting the app a test document like the following should have been added to the database:

```
_id: ObjectId("5d0cf038837aca26837fbab4")
name: "luke"
__v: 0
```

### Deploying to production

Navigate to your web host (in this case Heroku) and create a new app.
Run the following, replacing \<project-name> with the name of your app E.G. todo-list or music-player

```sh
$ heroku git:remote -a <project-name>
```

Make sure all the latest code has been committed to git, then push to Heroku

```sh
$ git add .
$ git commit -m "<commit message here>"
$ git push heroku master
```
