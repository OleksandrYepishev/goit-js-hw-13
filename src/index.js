import './css/styles.css';
import fetchPhotos from './js/fetchPhotos';
import Notiflix from "notiflix";
import galleryCard from './templates/galleryCard.hbs';

let page = 1;
const per_page = 4;
let searchQuery = [];


const fetchPhotosInput = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


fetchPhotosInput.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', nextPage);

async function onSearch(e) {
    loadMoreBtn.disabled = false;
    resetPage()
    e.preventDefault();

    const form = e.currentTarget;
    searchQuery = form.elements.searchQuery.value;
 
    try {
        clearGalleryMarkup()
        const photos = await fetchPhotos(searchQuery, page, per_page);
        let totalHits = photos.data.totalHits;
        
        if (totalHits === 0 || searchQuery.trim() === '') {
            loadMoreBtn.disabled = true;
                let message = 'Sorry, there are no images matching your search query. Please try again.';
               return Notiflix.Notify.failure(`${message}`)
            }
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        renderPhotos(photos);
        
       
        
            } catch (error) {
        console.log(error)
        }
    
};

async function nextPage() {
    const photos = await fetchPhotos(searchQuery, page, per_page);
    renderPhotos(photos);
};

function renderPhotos(photos) {
    galleryContainer.insertAdjacentHTML('beforeend', galleryCard(photos));
    incrPage();
    if (page > 1) {
        loadMoreBtn.classList.remove('is-hidden');
    }
   
};

function clearGalleryMarkup() {
    galleryContainer.innerHTML = '';
   
};

function incrPage() {
    page += 1;
};
 
function resetPage(){
    page = 1;
 };
