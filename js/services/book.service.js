'use strict'

var gBooks = [
    { id: 'bg4J78', title: 'האלכימאי', price: 120, imgUrl: 'image/alchemist_master.jpg' },
    { id: 'bg4J77', title: 'הנזיר שמכר את הפרארי שלו', price: 300, imgUrl: 'image/images.jpeg' },
    { id: 'bg4J76', title: 'Zorba the Greek', price: 87, imgUrl: 'lori-ipsi.jpg' }
]

function getBooks(){
    return gBooks
}

function readBook(bookId){
    const book = gBooks.find(book => book.id === bookId)
    return book
}

function removeBook(bookId){
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
}