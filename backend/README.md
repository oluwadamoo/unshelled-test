# Backend

### Introduction

Backend api for a test project

### Api Features

- Sellers can login to their accounts
- Logged in Sellers can update their city and state
- Logged in user can get all their order items
- Logged in user can delete their order items

### Installation Guide

- Clone this repository [here](https://github.com/oluwadamoo/unshelled-test.git)
- **cd backend**
- Run **npm install** to install all dependencies
- Create an .env file in your project root folder and add your variables. see .env.example for assistance.

### Usage

- Run **npm run start:dev** to start the application.
- Connect to the API using Postman on the specified port in the .env file.

### API Documentation

- Access Api documentation [here](https://documenter.getpostman.com/view/11729281/2s935mt5yz)

### API Endpoints

| HTTP Verbs | Endpoints             | Action                                 |
| ---------- | --------------------- | -------------------------------------- |
| POST       | /account/signin       | To signin an existing user account     |
| POST       | /account/signout      | To signout a logged in user            |
| PATCH      | /account              | To update the user's city and/or state |
| GET        | /order_items          | To get loggedin user's order items     |
| DELETE     | /order_items/order_id | To delete an order item                |

### Technologies Used

- [NodeJs](https://nodejs.org/)
- [ExpressJs](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/drivers/node/current/)

### Author

- [Damilola Saliu](https://github.com/oluwadamoo)
