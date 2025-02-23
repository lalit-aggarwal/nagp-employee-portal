# NAGP Node.js Workshop Assignment

### Problem statement

Create an employee portal where the employees can apply for the available opening positions in the company. Also, the project managers can add an opening for the project.

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer. Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.19.0

    $ npm --version
    6.14.8

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Install

    $ git clone https://github.com/lalit-aggarwal/nagp-employee-portal.git
    $ cd nagp-employee-portal
    $ npm install

## Install MongoDb Compass

Download instructions can be found https://docs.mongodb.com/compass/master/install

- #### Select on-premises option
- #### Select community server
- #### Select install as per your platform and install the same
- #### Connect to localhost:27017 mongodb instance

## Running the project

    $ npm start
	
After running above command, Navigate to http://localhost:8000/

## Assumptions

- #### Using local db instance of MongoDb running on port 27017

## Screenshots can be found under screenshots folder
