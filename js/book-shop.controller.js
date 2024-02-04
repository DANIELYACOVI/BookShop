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
    <td>$${book.price}</td>
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

function onAddBook(ev) {
    ev.preventDefault()
    // inputs value

    const titleInput = document.getElementById('newBookTitle')
    const priceInput = document.getElementById('newBookPrice')

    const title = titleInput.value
    const price = +priceInput.value

    console.log(price, title);

    if(title&&price){
        addBook(title, price)
    }
// 
    // send to service for save

    titleInput.value = ''
    priceInput.value = ''
    
    renderBooks()

}
function openModalBySelector(selector){
    const addBookDialog = document.querySelector(selector)
    addBookDialog.showModal()
}

function onConfirmAddBook(event) {
    event.preventDefault()

    const titleInput = document.getElementById('newBookTitle')
    const priceInput = document.getElementById('newBookPrice')

    const title = titleInput.value
    const price = +priceInput.value

    if (title && price) {
        const book = _createBook(title, price)
        gBooks.unshift(book)
        titleInput.value = ''
        priceInput.value = ''
        renderBooks()
        showSuccessMessage('Book added successfully!')
        _saveBooks()

        document.querySelector('.add-book-dialog').close()
    } else {
        alert('Invalid input. Please enter a valid title and price.')
    }
}

function onCancelAddBook() {
    document.querySelector('.add-book-dialog').close()
}

function onUpdateBook(bookId) {
    const newPrice = +prompt('Enter the new price:')

    updatePrice(bookId, newPrice)
    renderBooks()

    showSuccessMessage('Book updated successfully!')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()

    showSuccessMessage('Book deleted successfully!')
}

function showSuccessMessage(message) {
    const successDialog = document.querySelector('.success-dialog')
    const successMessage = successDialog.querySelector('.success-message')

    successMessage.textContent = message
    successDialog.showModal()

    setTimeout(() => {
        successDialog.close()
    }, 2000)
}