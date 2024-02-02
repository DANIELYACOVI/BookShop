'use strict'

var gBooks = [
    { id: 'bg4J78', title: 'The adventures of Lori Ipsi', price: 120, imgUrl: 'lori-ipsi.jpg' },
    { id: 'bg4J77', title: 'World Atlas', price: 300, imgUrl: 'lori-ipsi.jpg' },
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