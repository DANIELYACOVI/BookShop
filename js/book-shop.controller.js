'use strict'

var gFilterBy = ''
var gCurrentPage = 0
var gPageSize = 5

function onInit() {
    gFilterBy = ''
    renderBooks()
}

function renderBooks(searchTerm = '') {
    const elBooks = document.querySelector('.book-list')
    const books = getBooks(searchTerm)

    const startIdx = gCurrentPage * gPageSize
    const endIdx = startIdx + gPageSize
    const booksToShow = books.slice(startIdx, endIdx)

    const strHtmls = booksToShow.map(book => `<tr>
    <td>${book.title}</td>
    <td>$${book.price}</td>
    <td>${renderStars(book.rating)}</td>
    <td>
        <button class="read" onclick="onReadBook('${book.id}')">Read</button>
        <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
    </td>`)

    elBooks.innerHTML = strHtmls.join('')

    updateFooterStatistics(books)

    document.querySelector('.pagination button:first-child').disabled = gCurrentPage === 0    
    document.querySelector('.pagination button:last-child').disabled = endIdx >= books.length    
}

function onPrevPage(){
    if (gCurrentPage > 0){
        gCurrentPage--
        renderBooks()
    }
}

function onNextPage(){
    const books= getBooks()
    const totalPages = Math.ceil(books.length / gPageSize)
    if(gCurrentPage < totalPages - 1){
        gCurrentPage++
        renderBooks()
    }
    const nextButton = document.querySelector('.pagination button:last-child')
    nextButton.disabled = gCurrentPage === totalPages - 1
}

function renderStars(rating) {
    const maxRating = 5
    const validRating = Math.min(maxRating, Math.max(0, rating))

    const fullStars = '<span class="star">&#9733;</span>'.repeat(validRating)
    const emptyStars = '<span class="star">&#9734;</span>'.repeat(maxRating - validRating)

    return fullStars + emptyStars
}

function updateFooterStatistics(books) {
    const expensiveBooksCount = books.filter(book => book.price > 200).length
    const averageBooksCount = books.filter(book => book.price >= 80 && book.price <= 200).length
    const cheapBooksCount = books.filter(book => book.price < 80).length

    const expensiveBooksSpan = document.querySelector('.expensive-books')
    const averageBooksSpan = document.querySelector('.average-books')
    const cheapBooksSpan = document.querySelector('.cheap-books')

    expensiveBooksSpan.innerHTML = expensiveBooksCount
    averageBooksSpan.innerHTML = averageBooksCount
    cheapBooksSpan.innerHTML = cheapBooksCount
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
        <p>Rating:${book.rating}<span>&#9733;</span></p>
        <img src="${book.imgUrl}">
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
    const ratingInput = document.getElementById('newRating')

    const title = titleInput.value
    const price = +priceInput.value
    const rating = ratingInput.value

    // console.log(price, title)

    if (title && price && rating) {
        addBook(title, price, rating)
    }
    
    // send to service for save

    titleInput.value = ''
    priceInput.value = ''
    ratingInput.value = ''

    document.querySelector('.add-book-dialog').close()

    renderBooks()

}
function openModalBySelector(selector) {
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

    successMessage.innerHTML = message
    successDialog.showModal()

    setTimeout(() => {
        successDialog.close()
    }, 2000)
}

function onSetFilterBy(elSelect) {
    gFilterBy = elSelect.value
    renderBooks()
}

function onSearch() {
    const searchInput = document.getElementById('searchInput')
    const searchTerm = searchInput.value.toLowerCase()
    
    gFilterBy = ''
    
    renderBooks(searchTerm)
}