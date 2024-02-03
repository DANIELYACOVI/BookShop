'use strict'

var gBooks
_createBooks()

function getBooks(filterBy) {
    return gBooks
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
}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)

    _saveBooks()
}

function _saveBooks() {
    saveToStorage('bookDB', gBooks)
}


// Private functions

function _createBooks() {
    gBooks = loadFromStorage('bookDB')
    if (!gBooks || gBooks.length === 0){
        gBooks = [
            _createBook('האלכימאי', 100),
            _createBook('הנזיר שמכר את הפרארי שלו', 200),
            _createBook('Zorba the Greek', 300),
        ]
        _saveBooks()
    }
}

function _createBook(title, price) {
    return {
        id: makeId(),
        title: title,
        price: price,
        imgUrl: 'lori-ipsi.jpg'
    }
}