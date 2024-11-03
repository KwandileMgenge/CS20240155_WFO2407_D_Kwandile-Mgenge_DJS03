import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

export function createBookElement(id, image, title, author) {
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `

    return element
}

export function changeTheme(theme) {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
}

export function showMoreButtonUpdate(matches, page) {
    const button = document.querySelector('[data-list-button]')
    const remainingBooks = matches.length - (page * BOOKS_PER_PAGE)

    button.disabled = remainingBooks < 1

    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `
}