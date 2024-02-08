'use strict'

var gBooks
_createBooks()

function getBooks(searchTerm) {
    var filteredBooks = gBooks

    if (searchTerm) {
        filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(searchTerm))
    }

    return filteredBooks
}

function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
}

function updatePrice(bookId, newPrice) {
    if(!price) return
    const book = gBooks.find(book => book.id === bookId)
    if (book) {
        book.price = newPrice
    }
    _saveBooks()
}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
    
    _saveBooks()
}

function addBook(title, price, rating){
    const book = _createBook(title, price, rating)
    gBooks.unshift(book)
    _saveBooks()
    // save 
}

// Private functions

function _createBooks() {
    gBooks = loadFromStorage('bookDB')
    if (!gBooks || gBooks.length === 0){
        gBooks = [
            _createBook('האלכימאי', 100, 5, 'image/alchemist_master.jpg'),
            _createBook('הנזיר שמכר את הפרארי שלו', 200, 4, 'image/images.jpeg'),
            _createBook('Zorba the Greek',300 ,3),
        ]
        _saveBooks()
    }
}

function _createBook(title, price, rating, imgUrl = 'image/imagescopy.jpg', description) {
    return {
        id: makeId(),
        title,
        price,
        rating,
        imgUrl,
        description,
    }
}

function _saveBooks() {
    saveToStorage('bookDB', gBooks)
}