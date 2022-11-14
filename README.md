# Meal Genie

### Installation

Clone the repo and run the following command at the root of the project:

```sh
$ npm install
```

### Configuration

In order to successfully connect to the remote MongoDB, you will need to duplicate the config/dev.js.example file (still within the config folder), and name it as follows:

```sh
dev.js
```

Open that file and replace "password" with the password of the admin account with access to the meal-genie-development database. The contents of dev.js should look something like:

```sh
module.exports = {
    mongoURI: "mongodb+srv://admin:password@cluster0-pvd0l.mongodb.net/heroku_xg884p0t?retryWrites=true&w=majority",
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

Committing to GitHub will automatically deploy a new build to production - in the Railway app
