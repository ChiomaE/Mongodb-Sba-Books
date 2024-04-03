const express = require("express")
const {connectToDb, getDb} = require ('./db');
const { ObjectId } = require("mongodb");
/* const port = 5000; */

// Middleware
const app = express();
app.use(express.json())

//db connection
let db;

connectToDb((err) => {
    if(!err){
        app.listen(5000,()=>{
            console.log(`This server is listening on port 5000`)
        })

        db = getDb();
    }
})


//routes

app.get('/books', (req,res) => {

    let books = [];

    db.collection('books').find().sort({author: 1}).forEach(book => books.push(book)).then(() => {
        console.log('Books fetched:', books)
        res.status(200).json(books)
    }).catch(() => {
        res.status(500).json({error: 'Could not get documents'})
    })

    /* res.json({message: "Welcome to the api"}) */
})

app.get('/books/:id', (req,res) => {

    if(ObjectId.isValid(req.params.id)) {
        db.collection('books').findOne({_id: ObjectId(request.params.id)}).then(doc => {
            res.status(200).json(doc)
        }).catch(err => {
            res.status(500).json({error: 'Could not get documents'})
        })

    } else {
        res.status(500).json({error: 'Not a valid id'})
    }

   
})

app.post('/books', (req,res) => {
    const book = req.body;

    db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({error: 'Could not create new document'})
    })
})

app.delete('/books/:id', (req,res) =>{

    if(ObjectId.isValid(req.params.id)) {
        db.collection('books').deleteOne({_id: ObjectId(request.params.id)}).then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({error: 'Could not delete documents'})
        })

    } else {
        res.status(500).json({error: 'Not a valid id'})
    }

})

app.patch('/books/:id', (req,res) => {
    const updates = req.body;

    if(ObjectId.isValid(req.params.id)) {
        db.collection('books').updateOne({_id: ObjectId(request.params.id)}, {$set: updates}).then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({error: 'Could not update documents'})
        })

    } else {
        res.status(500).json({error: 'Not a valid id'})
    }    
})


/* app.get('/check-connection', (req, res) => {
    if (db) {
        res.status(200).json({ message: 'Database connection is active' });
    } else {
        res.status(500).json({ error: 'Database connection is not active' });
    }
}); */