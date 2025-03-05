# Library Books API

## Description
This project is a simple library application using Node.js, Express, and SQLite3. It allows adding, searching, and viewing books through a REST API and an HTML form.

---

## Prerequisites
Before starting, make sure you have installed:
- [Node.js](https://nodejs.org/)
- npm (included with Node.js)

---

## Installation
1. Clone the repository or download the files.
2. Open a terminal in the project folder and run:
    ```sh
    npm install express sqlite3 body-parser
    ```

---

## Start the Server
To start the server, run the following command:
```sh
node app.js
```
If everything is correct, you should see the message:
```
Server listening on port 3000
```

---

## Usage
### Access the Frontend
Open the `index.html` file in your browser.

### Available API Endpoints
You can use Postman or a browser to test the endpoints:
- **GET /books** → Returns all books.
- **GET /books/:keyword** → Returns books containing the keyword in the author, title, genre, or price.
- **POST /books** → Adds a new book to the database.

For `POST /books`, the JSON input format is:
```json
{
  "author": "John Doe",
  "title": "A Great Book",
  "genre": "Drama",
  "price": 19.99
}
```

---

## Technologies Used
- **Node.js** - Backend server
- **Express** - API framework
- **SQLite3** - Database
- **HTML, JavaScript** - Frontend

---

## License
This project is licensed under the Apache-2.0 License.
```

