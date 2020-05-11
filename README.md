# Meal Genie

### Installation

Clone the repo and run the following command at the root of the project:

```sh
$ npm install
```

### Configuration

In order to integrate with Font Awesome Pro, you will need to duplicate the .npmrc.sample file in the root of the project, and name it as follows:

```sh
.npmrc
```

Open that file and replace "FONT-AWESOME-AUTH-TOKEN-GOES-HERE" with the actual Font Awesome Pro auth token. This can be found by logging into the Font Awesome account and going to settings. The contents of .npmrc should look something like:

```sh
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=XXXXXXXX-YYYY-ZZZZ-AAAA-BBBBBBBBBBBB
```

In order to successfully connect to the remote MongoDB, you will need to duplicate the config/dev.js.example file (still within the config folder), and name it as follows:

```sh
dev.js
```

Open that file and replace "password" with the password of the admin account with access to the meal-genie-development database. The contents of dev.js should look something like:

```sh
module.exports = {
    mongoURI: 'mongodb+srv://admin:x92hgurtcslg58ch@cluster0-pvd0l.mongodb.net/meal-genie-development?retryWrites=true&w=majority'
}
```

In addition to adding the password to gain access to the MongoDB database, you also need to whitelist your external IP in the MongoDB settings.

Log into MongoDB and open the meal-genie-development project. Go to Network Access (under Security on the left hand side of the screen), and add in your external IP address to the IP whitelist in order for MongoDB to grant you access when establishing the connection.

### Running the app in development

To run the app in development:

```sh
npm run dev
```

### Connecting a development database

Create a new project, cluster and database on [mongodb.com](https://cloud.mongodb.com/v2#/org/5d010935014b764d90359b5a/projects/create)

Create a config/dev.js file using the contents of config/dev.js.example. Add the uri for the database you just created.

```sh
module.exports = {
    mongoURI: 'mongodb+srv://username:password@cluster0-3h4tl.mongodb.net/test?retryWrites=true&w=majority'
}
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
