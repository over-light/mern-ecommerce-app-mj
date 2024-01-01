# MERN Ecommerce
An ecommerce store built with MERN stack, This ecommerce store enable two main different flows or implementations:

1. Buyers browse the store categories, products, brands and category and 
2. Admins manage and control the entire store components 


* features:
  * Node provides the backend environment for this application
  * Express middleware is used to handle requests, routes
  * Mongoose schemas to model the application data
  * React for displaying UI components
  * Redux to manage application's state
 

 ## Database Seed
 * The seed command will create an admin user in the database
* The email and password are passed with the command as arguments
* Like below command, replace brackets with email and password. 
* For more information, see code [here](server/utils/seed.js)

```
npm run seed:db [email-***@****.com] [password-******] // This is just an example.
```


## Demo

This application is deployed on Vercel Please check it out :smile: [here](https://mern-ecommerce-app-client-gilt.vercel.app/).


## Install

Some basic Git commands are:

```
$ git clone https://github.com/jayeshsimform/mern-ecommerce-app
$ cd project
$ npm install
```

## Start development

```
$ npm run dev
```


## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)