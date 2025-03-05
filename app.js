const sqlite3=require('sqlite3').verbose();
const db= new sqlite3.Database('books.db');


class Books{
    constructor(id, author,title,genre,price){
        this.id = id;
        this.author = author;
        this.title = title;
        this.genre = genre;
        this.price = price;
        
    }
}

// Function to add a book to the database
function addBook(db,book){
    try{
        const q=`insert into books values (NULL,"${book.author}","${book.title}","${book.genre}",${book.price})`;
        console.log(q);
        console.log("\n");
        console.log("Book added successfully!");
        
        db.run(q);
    }catch (err){
        alert("An error occurred while adding the book:", err);
        throw err;
        
    }
}

// Function to get all books from the database
async function getAllBooks(db){
    const q = `select * from books`;
    const rows=await runQuery(db,q);
    books = [];

    for(row of rows){
        book = new Books(row.id,row.author,row.title,row.genre,row.price);
        books.push(book);
    }
    return books;   
}

// Function to find books in the database based on a keyword
async function findBooksByKeyword(db,keyword){
    let outputString = "";
    const q=`select * from books where author like "%${keyword}%" OR title like "%${keyword}%" OR genre like "%${keyword}%" OR price like "%${keyword}%"` ;
    const rows=await runQuery(db,q);
    books = [];
    for(row of rows){
        book = new Books(row.id, row.author,row.title,row.genre,row.price);
        books.push(book);
    }
    return books;
    
}

// Function to run a database query
function runQuery(db,q){
    return new Promise((resolve,reject)=>{
        db.all(q,(err,rows)=>{
            if(err){
                console.log('An error occurred while executing the query:', err);
                reject(err);
            }
            resolve(rows);
        });
    });
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Enable CORS
//https://stackoverflow.com/questions/10636611/how-does-the-access-control-allow-origin-header-work
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// Route for retrieving all books
app.get('/books', async (req, res)=>{
    try {
        const books = await getAllBooks(db);
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/books/', async (req, res)=>{
    try {
        const books = await getAllBooks(db);
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route for searching books based on a keyword
app.get(`/books/:keyword`, async (req, res)=>{
    try {
        const keyword = req.params.keyword;
        const books = await findBooksByKeyword(db,keyword);
        if (books.length > 0) {
            res.json(books);
          } else {
            res.send('No books found...');
          }
        
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route for adding a book
app.post('/books', (req, res)=>{
    const books = req.body;
    console.log(books);
    try {
        addBook(db,books);
        res.json({'result':'OK'});
    } catch (err) {
        res.status(500).send(err);
    }
});


app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

// Main function
async function main(){
    try{
        
        const result = await getAllBooks(db);
        //console.log("\n")
        console.log(result);

        result.forEach((book) => {
            console.log(book);
            console.log("\n");
          });
        
    }catch(err){
        console.error('An error occurred:', err.message); 
    }
}

main();
