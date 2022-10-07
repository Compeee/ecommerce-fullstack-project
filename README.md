# 5G00EV16-3001-kaarnalehto-eero-project

# General Information

| First Header       | Second Header                               |
| ------------------ | ------------------------------------------- |
| Owner              | Eero Kaarnalehto / eero.kaarnalehto@tuni.fi |
| Description        | Ecommerce website                           |
| Development Server | localhost                                   |

# Run Locally

### 1. Clone repo

```
$ git clone https://github.com/Compeee/fullstack-project.git
```

### 2. Setup Database

```
$ cd 5g00ev16-3001-kaarnalehto-eero-project
$ docker-compose up -d
$ cd /server/scripts
$ node init-db.js
```

### 3. Run Backend

```
$ cd server
$ npm install
$ npm run dev
```

### 4. Run Frontend

```
$ cd client
$ npm install
$ npm start
```

# Running tests

### 1. Run Frontend tests

```
$ cd client
$ npm run test:coverage
$ npm run test:cypress
```
### 2. Run Backend tests

```
$ cd server
$ npm run test:coverage
```

# API Documentation

Once you have the app running you can access API Documentation

```
http://localhost:5000/api-docs
```
![Semantic description of image](https://i.imgur.com/vCyynZI.png)

# Data Model

![Semantic description of image](https://i.imgur.com/TkUkytF.png)

# Release notes

Release 1.0 is the starting point for the project which was the fullstack excercise

**Release 1.0 - 8.3.2022**

- Normal users can signup, login, edit details and close their account
- Admin users can access a list of all the users and can delete any account

**Release 2.0 - 25.4.2022**

- Normal users can see products on homepage
- Normal users can click on product reviews and see the reviews
- Signed in users can leave reviews
- Admin users can access a list of all the items
- Admin users can add new items and edit or delete existing ones

