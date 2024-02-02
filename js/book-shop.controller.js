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
        <button class="update">Update</button>
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
    const bookStr = JSON.stringify(book, null, 4)
    // console.log('bookStr:', bookStr)

    elTxt.innerHTML = book.title
    elPre.innerText = bookStr

    elModal.classList.remove('hidden')
}

function onCloseBookDetails(ev, elModal) {
    ev.preventDefault()
    elModal.classList.add('hidden')
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