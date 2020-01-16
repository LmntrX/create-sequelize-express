# Create Sequelize Express

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FLmntrX%2Fcreate-sequelize-express.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2FLmntrX%2Fcreate-sequelize-express?ref=badge_small) [![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/Livin21/create-sequelize-express)

Create Sequelize-Express apps with no configuration.

- [Creating an App](#creating-an-app) – How to create a new app.

Create Sequelize-Express works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/LmntrX/create-sequelize-express/issues/new).

## Quick Overview

```sh
npm install -g create-sequelize-express
npx create-sequelize-express my-app
cd my-app
npm start
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>

### Get Started Immediately

You **don’t** need to install or configure tools.<br>
They are preconfigured and hidden so that you can focus on the code.

Just create a project, and you’re good to go.

## Creating an App

**You’ll need to have Node >= 6 on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

To create a new app:

```sh
create-sequelize-express my-app
```

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app
├── app.js
├── bin
│   └── www
├── package-lock.json
└── src
    ├── config
    │   ├── config.json
    │   └── setup.js
    ├── controllers
    │   ├── auth.js
    │   └── users.js
    ├── migrations
    │   └── 20180918182624-create-user.js
    ├── models
    │   ├── index.js
    │   └── user.js
    ├── routes
    │   ├── auth.js
    │   └── index.js
    ├── seeders
    └── utils
        ├── Commons.js
        ├── Constants.js
        ├── Responder.js
        ├── ResponseTemplate.js
        ├── Strings.js
        └── Validator.js
```

Once the installation is done, you can open your project folder:

```sh
cd my-app
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

A copy of the user guide will be created as `README.md` in your project folder.

## What’s Included?

Your environment will have everything you need to build a modern express REST API with any relational database with the help of [sequelize](http://docs.sequelizejs.com/):

- Simple and organized directory structure
- Easily configurable accross multiple environments
- Built in JWT Authentication
- Built in Response and String templates that you can use anytime aywhere
- Installs all required tools to setup an Express Rest API

## License

Create Sequelize Express is open source software [licensed as Apache 2.0](https://github.com/LmntrX/create-sequelize-express/blob/master/LICENSE).

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FLmntrX%2Fcreate-sequelize-express.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FLmntrX%2Fcreate-sequelize-express?ref=badge_large)
