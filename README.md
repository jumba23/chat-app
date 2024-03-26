# Chat App

Chat App is a web application built with a React frontend and Node.js backend. Socket.io is used for communication between frontend and backend

Try out the live version here: [Chat App](https://chat-app-fullstack-mern.herokuapp.com/)

# About the App

This app was a product of my desire to stay in touch with my family friends around the world. While there are many apps I could use, I wanted to create an app of my own. This app is using socket.io for exchange of data between users. A user can join the app and have other friends join as well. There are also individual theme-related rooms where users can leave their most recent impressions.

Features:

- A user can choose between light and dark mode.
- When a user receives a message small notification will come up and remain there until the user selects on the message.
- Each user will be shown offline if not logged in.

### Sign Up Page

The Sign Up page provides very simple and straight-forward instructions for new user creation. A picture is mandatory.

![chrome_rBDrizW8Nh](https://user-images.githubusercontent.com/80366503/204406626-eedc6719-6b68-4fe7-b6cb-67c59b3411fd.png)

### Chat Room Page

The Chat Room is the center-piece of the app. This is where a user can see available rooms, available friends, and historical presentation of their communication.

![uEUGsZjnlz](https://user-images.githubusercontent.com/80366503/204406503-6dda1c65-8e50-4c67-b4fb-f61d64af20fd.png)

### Dark/Light Mode

Dark and light mode are available throughout the app and can be switched as desired.

![chrome_dmVCQrvE9g](https://user-images.githubusercontent.com/80366503/204406531-56175a31-598d-407d-b888-14b0b0a80e81.png)

# Tools and Technologies

### **_Client-side (Front-End)_**

The front-end of this project is built in React using create-react-app application. For component's state maintenance and communication, REDUX library is used. For API requests I used socket.io-client. React-bootstrap, React-router-bootstrap and CSS are used for styling. React-router-dom is used for routing.

Once a message is captured and sent, socket.io-client will forward the data to back end for further evaluations and communication.

External resources and packages imported for this project are listed below.

- Background images: https://unsplash.com/
- Mobile menu icon: https://react-icons.github.io/react-icons/

### **_Server-side (Back-End)_**

The back-end for this site is created using Express.js. For data storage I used two MongoDB and Cloudinary.com. For connection with MongoDB and data model creation I used mongoose.

This is the point where a message is received and further processed according to associated data that comes with it. Last step is to send the message back to the front end where it should end the journey.

Additional Resources:

- MongoDB: https://www.mongodb.com/
- Cloudinary: https://cloudinary.com/

### **_Deployment_**

For web deployment I use [Heroku](https://www.heroku.com/). Heroku is a container-based cloud Platform as a Service (PaaS). The platform is flexible and easy to use while porviding the simplest path to getting an app to market.

# Running Locally

The below instructions can be followed if you want to run this project locally for custom development or enhancements:

### **_Setup locally_**

- Fork this repository to your GitHub account
- On your local computer, navigate to the folder you want to store the project: cd PROJECT-FOLDER-NAME
- Clone the forked repository locally: git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY

### **_Start Server and Client_**

- Navigate to project folder: **_cd PROJECT-FOLDER-NAME/client_**

  - Install dependencies: npm install or npm i

- Navigate to project folder: **_cd PROJECT-FOLDER-NAME/server_**
  - Install dependencies: npm install or npm i
  - In chat-app-backend folder add .env file to MongoDB file
    DB_PW=YOUR OWN
    DB_USER=YOUR OWN
  - From chat-app-backend start the server and the client simultaneously in development node: npm run dev

# Author

Goran Cvetic - Software Developer - [LinkedIn](https://github.com/jumba23/chat-app)
