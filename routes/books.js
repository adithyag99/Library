const express = require('express')
const router = express.Router()
const Book = require('../models/book.js')

router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
      const books = await Book.find(searchOptions)
      res.render('books/index', {
        books: books,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
    }
  })

router.get('/new', (req, res) => {
    res.render('books/new',{ book : new Book() } )
})

router.post('/', (req, res)=> {
    const book = new Book({
        name : req.body.name
    })
    book.save((err,newBook)=>{
        if(err)
        {
             res.render('books/new', {
                 book : book,
                 errorMessage : 'error creating the book'
             })
        } else{
            res.redirect('books')
        }
    })

})
module.exports=router