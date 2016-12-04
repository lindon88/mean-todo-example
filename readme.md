# MEAN (MongoDB, Express, Angular.js and Node.js) Todo exmaple

> MEAN is a collection of JavaScript-based technologies — MongoDB, Express.js, AngularJS, and Node.js — used to develop web applications. From the client and server sides to databases, MEAN is a full-stack development toolkit

Todo application login
> username: admin
> password: 1234

**Table of Contents** 

 - [Applications](#application)
	 - [Server application](#server-application)
	 - [Client application](#client-application)
 - [Requirements](#requirements)
 - [Install](#install)
	 - [Node.js](#nodejs) 
	 - [MongoDB](#mongodb)
	 - [Grunt CLI](#grunt-cli)
	 - [MongoDB migrations](#mongodb-migrations)
 - [Run](#run)

#Applications
In this example we have two applications **todo-server** and **todo-application**

## Server application
Server application is developed in **Node.js** for development are used these technologies:

 - Node.js (JavaScript interpreter)
 - MongoDB (NoSQL database)

Also are used these **Node.js** modules:

 - express (http://expressjs.com)
 - body-parser (https://github.com/expressjs/body-parser)
 - mongodb (https://mongodb.github.io/node-mongodb-native)
 - mongodb-migrations (https://github.com/emirotin/mongodb-migrations)
 - jsonwebtoken (https://github.com/auth0/node-jsonwebtoken)
 - promise (https://www.npmjs.com/package/promise)
 - underscore (http://underscorejs.org/)
 - node-uuid (https://www.npmjs.com/package/node-uuid)
 - md5 (https://www.npmjs.com/package/MD5)

## Client application
Client application is developed in JavaScript also for development id used **Angular.js** framework. Also are used other libraries:

 - Bootstrap
 - Angular schema form
 - Angular ui-router
 - Kendo core ui

# Requirements

 - Node.js
 - MongoDB
 - Bower
 - Grunt CLI
 - MongoDB migrations

# Install
Follow these steps to install application and application dependencies. First must install application dependencies.

 - Node.js
 - MongoDB
 - Bower
 - Grunt CLI
 - MongoDB migrations

After dependency installation, we have to install node dependencies (modules) and build applications **todo-application** and **todo-server** this can be done by executing **run.bat**
 
## Node.js
Install Node.js from official web site: https://nodejs.org, here you can find previous releases https://nodejs.org/en/download/releases.

Check if **node** and **npm** are installed, from command line: 
> node --version
> npm --version

## MongoDB
Install MongoDB from official web site: https://www.mongodb.com, downloads page https://www.mongodb.com/download-center?jmp=nav#community or you can download MongoDb from this url https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.2.11-signed.msi

After installation add **MongoDB** path to **System Environment Variables** (here is an example how to do that: http://www.computerhope.com/issues/ch000549.htm)

Check if **MongoDB** is installed and if  **System Environment Variables** is set correctly, from command line: 
> mongod --version
> mongo --version

Then follow **MongoDB** documentation for configuring and running MongoDB
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition

## Bower

Official web site: https://bower.io/
**Bower** can be installed with **npm (Node package manager)** 

If **npm** is installed then run this command:
> npm install bower -g

## Grunt CLI

Official web site: http://gruntjs.com/
**Grunt CLI** can be installed with **npm**

If **npm** is installed then run this command
> npm install grunt-cli -g

## MongoDB migrations

Official web site: https://github.com/emirotin/mongodb-migrations
**MongoDB migrations** is a Node.js module and is used to create and run **MongoDB** migration files.

If **npm** is installed then run this command
> npm install mongodb-migrations -g

# Run
To run applications **todo-server** and **todo-application** in CMD run this command
> run.bat

**run.bat**  will do next:

 - will check if all required applications are installed
 - will install **Node.js** modules for **todo-server** and **todo-application** applications
 - will migrate **MongoDB** migration files and will start **todo-server**, **express** application
 - will install **bower** components for **todo-application**
 - will run **grunt** tasks for **todo-application** and will start **browser sync**


