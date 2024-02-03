'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    const elBooks = document.querySelector('.book-list')
    const books = getBooks()

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
        <h2 style="font-family: Arial;">${book.title}</h2>
        <p style="font-family: Arial;"><strong>Price:</strong> ${book.price}</p>
        <img src="${book.imgUrl}" alt="${book.title}" style="width: 200px; height: auto;">
    `

    elTxt.innerHTML = book.title
    elPre.innerHTML = bookDetailsHTML

    elModal.showModal()
}

function onUpdateBook(bookId){
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
        const book = {
            id: 'bg' + Date.now() % 1000,
            title: title,
            price: price,
            imgUrl: 'lori-ipsi.jpg'
        }
        gBooks.unshift(book)
        elInput.value = ''
        renderBooks()
    } else {
        alert('Invalid input. Please enter a valid title and price.')
    }
}