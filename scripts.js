import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import { changeTheme, showMoreButtonUpdate, createDropdownOptions, createBookList, filterBooks } from './helpers.js';

let page = 1;
let matches = books;

// Initializes the application
const initializeApp = () => {
    renderBooks();
    showMoreButtonUpdate(matches, page);
    generateGenreDropdown();
    generateAuthorsDropdown();
    addEventListeners();
};

const renderBooks = () => {
    document.querySelector('[data-list-items]').appendChild(createBookList(matches.slice(0, BOOKS_PER_PAGE)));
};
    
const generateGenreDropdown = () => {
    document.querySelector('[data-search-genres]').appendChild(createDropdownOptions(genres, 'any', 'All Genres'));
};

const generateAuthorsDropdown = () => {
    document.querySelector('[data-search-authors]').appendChild(createDropdownOptions(authors, 'any', 'All Authors'));
};

// Adding eventlisteners for interactivity
const addEventListeners = () => {
    document.querySelector('[data-search-cancel]').addEventListener('click', closeSearchOverlay);
    document.querySelector('[data-settings-cancel]').addEventListener('click', closeSettingsOverlay);
    document.querySelector('[data-header-search]').addEventListener('click', openSearchOverlay);
    document.querySelector('[data-header-settings]').addEventListener('click', openSettingsOverlay);
    document.querySelector('[data-list-close]').addEventListener('click', closeListOverlay);
    document.querySelector('[data-settings-form]').addEventListener('submit', themeSubmit);
    document.querySelector('[data-search-form]').addEventListener('submit', filterSubmit);
    document.querySelector('[data-list-button]').addEventListener('click', loadMoreBooks);
    document.querySelector('[data-list-items]').addEventListener('click', showBookPreview);
};

// 
const closeSearchOverlay = () => document.querySelector('[data-search-overlay]').open = false;

const closeSettingsOverlay = () => document.querySelector('[data-settings-overlay]').open = false;

const openSearchOverlay = () => {
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
};

const openSettingsOverlay = () => document.querySelector('[data-settings-overlay]').open = true;

const closeListOverlay = () => document.querySelector('[data-list-active]').open = false;

// Handles theme form submission
const themeSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    changeTheme(theme);
    
    closeSearchOverlay();
};

// Handles search form submission
const filterSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);

    page = 1;
    matches = filterBooks(filters);

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show');
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show');
    };

    document.querySelector('[data-list-items]').innerHTML = '';
    const newItems = createBookList(result.slice(0, BOOKS_PER_PAGE));

    document.querySelector('[data-list-items]').appendChild(newItems);
    
    showMoreButtonUpdate(matches, page);

    window.scrollTo({top: 0, behavior: 'smooth'});
    closeSearchOverlay();
};

// Loads more books using show more button
const loadMoreBooks = () => {
    const fragment = createBookList(matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));

    document.querySelector('[data-list-items]').appendChild(fragment);
    page += 1;
    showMoreButtonUpdate(matches, page);
};

// Shows book preview
const showBookPreview = (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            let result = null;
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook;
            } ;
        
            active = result;
        };
    };
    
    // Displays preview modal
    if (active) {
        document.querySelector('[data-list-active]').open = true;
        document.querySelector('[data-list-blur]').src = active.image;
        document.querySelector('[data-list-image]').src = active.image;
        document.querySelector('[data-list-title]').innerText = active.title;
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        document.querySelector('[data-list-description]').innerText = active.description;
    };
};

// Starts the app functions
initializeApp();