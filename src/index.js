import './css/styles.css';
import '../node_modules/simplelightbox/src/simple-lightbox.scss'
import fetchPhotos from './js/fetchPhotos';
import Notiflix from "notiflix";
import galleryCard from './templates/galleryCard.hbs';
import SimpleLightbox from "simplelightbox";

let page = 1;
const per_page = 40;
let searchQuery = [];
let totalHits = null;
let hits = null;
var lightbox = new SimpleLightbox('.gallery a');

const fetchPhotosInput = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

fetchPhotosInput.addEventListener('submit', onSearch);
// loadMoreBtn.addEventListener('click', nextPage);

async function onSearch(e) {
    // loadMoreBtn.disabled = false;
    // loadMoreBtn.hidden = false;
    resetPage()
    e.preventDefault();

    const form = e.currentTarget;
    searchQuery = form.elements.searchQuery.value;
 
    try {
        clearGalleryMarkup()
        const photos = await fetchPhotos(searchQuery, page, per_page);
        totalHits = photos.data.totalHits;
        hits += photos.data.hits.length;
        
        if (totalHits === 0 || searchQuery.trim() === '') {
            // loadMoreBtn.disabled = true;
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
    ifEndImages(photos);
    renderPhotos(photos);
    scrollSmooth();
      
    
};

function renderPhotos(photos) {
    
    galleryContainer.insertAdjacentHTML('beforeend', galleryCard(photos));
    incrPage();
    lightbox.refresh();
      
    
    // if (page > 1) {
    //     loadMoreBtn.classList.remove('is-hidden');  
    //  }  
};

 window.addEventListener("scroll", () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight > scrollHeight-1) {
       return nextPage();
    }
  });

function ifEndImages(photos) {
    hits += photos.data.hits.length;

    if (hits === totalHits) {
        let message = "We're sorry, but you've reached the end of search results.";
        // loadMoreBtn.hidden = true;
       return Notiflix.Notify.failure(`${message}`);
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

function scrollSmooth() {
    const cardHeight = document.querySelector('.gallery').firstElementChild.getBoundingClientRect().height;

        window.scrollBy({
         top: cardHeight * 2,
         behavior: 'smooth',
         });
        
}
