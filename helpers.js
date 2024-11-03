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

export function createBookList(bookArray) {
    const fragment = document.createDocumentFragment();

    bookArray.forEach(({ author, id, image, title }) => {
        const bookElement = createBookElement(id, image, title, author);
        fragment.appendChild(bookElement);
    });
    
    return fragment;
};

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

export function createDropdownOptions(data, defaultValue, defaultText) {
    const fragment = document.createDocumentFragment();

    const defaultOption = document.createElement('option');
    defaultOption.value = defaultValue;
    defaultOption.innerText = defaultText;

    fragment.appendChild(defaultOption);

    for (const [id, name] of Object.entries(data)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        fragment.appendChild(element);
    }
    return fragment;
};