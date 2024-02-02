'use strict'

var gBooks = [
    { id: 'bg4J78', title: 'The adventures of Lori Ipsi', price: 120, imgUrl: 'lori-ipsi.jpg' },
    { id: 'bg4J77', title: 'World Atlas', price: 300, imgUrl: 'lori-ipsi.jpg' },
    { id: 'bg4J76', title: 'Zorba the Greek', price: 87, imgUrl: 'lori-ipsi.jpg' }
]

function onInit() {
    renderBooks()
}

function renderBooks() {
    const elBooks = document.querySelector('.book-list')
    const strHtmls = gBooks.map(book => `<tr>
    <td>${book.title}</td>
    <td>${book.price}</td>
    <td>
        <button class="read">Read</button>
        <button class="update">Update</button>
        <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
    </td>`)


    elBooks.innerHTML = strHtmls.join('')
}

function onRemoveBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
    renderBooks()
}

function onAddBook() {
    console.log('hi')
}