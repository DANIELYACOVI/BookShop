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

function addBook(title, price){
    const book = _createBook(title, price)
    gBooks.unshift(book)
    _saveBooks()
    // save 
}

// Private functions

function _createBooks() {
    gBooks = loadFromStorage('bookDB')
    if (!gBooks || gBooks.length === 0){
        gBooks = [
            _createBook('האלכימאי', 100, 'image/alchemist_master.jpg'),
            _createBook('הנזיר שמכר את הפרארי שלו', 200, 'image/images.jpeg'),
            _createBook('Zorba the Greek', 300),
        ]
        _saveBooks()
    }
}

function _createBook(title, price, imgUrl = 'image/imagescopy.jpg', description) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl,
        description,
        // status: 'Active'
    }
}

function _saveBooks() {
    saveToStorage('bookDB', gBooks)
}