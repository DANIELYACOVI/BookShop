'use strict'

var gFilterBy = ''

function onInit() {
    renderBooks()
}

function renderBooks() {
    const elBooks = document.querySelector('.book-list')
    const books = getBooks(gFilterBy)

    const strHtmls = books.map(book => `<tr>
    <td>${book.title}</td>
    <td>${book.price}</td>
    <td>
        <button class="read" onclick="onReadBook('${book.id}')">Read</button>
        <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
    </td>`)

    elBooks.innerHTML = strHtmls.join('')
}

function onReadBook(bookId) {
    // console.log('bookId:', bookId)
    const elModal = document.querySelector('.book-details')
    const elTxt = elModal.querySelector('h2 span')
    const elPre = elModal.querySelector('pre')

    const book = readBook(bookId)
    // const bookStr = JSON.stringify(book, null, 4)
    // console.log('bookStr:', bookStr)

    const bookDetailsHTML = `
        <p style="font-family: Arial;"><strong>Price:</strong> ${book.price}</p>
        <img src="${book.imgUrl}" style="width: 150px; height: 150px; display: block; margin: 0 auto;">
        `

    elTxt.innerHTML = book.title
    elPre.innerHTML = bookDetailsHTML

    elModal.showModal()
}

function onUpdateBook(bookId) {
    const newPrice = prompt('Enter the new price:')

    updatePrice(bookId, newPrice)
    renderBooks()
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    const elInput = document.querySelector('.new-book input')
    const title = elInput.value
    const price = prompt('Enter the price:')

    if (title && price) {
        const book = _createBook(title, price)

        gBooks.unshift(book)
        elInput.value = ''
        renderBooks()
    } else {
        alert('Invalid input. Please enter a valid title and price.')
    }

    _saveBooks()
}