import './css/styles.css';
import fetchPhotos from './js/fetchPhotos';
import Notiflix from "notiflix";
import galleryCard from './templates/galleryCard.hbs';


const fetchPhotosInput = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');

fetchPhotosInput.addEventListener('submit', onSearch);

async function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.searchQuery.value;
 
    try {
        clearGalleryMarkup()
        const photos = await fetchPhotos(searchQuery);
        let totalHits = photos.data.totalHits;
        
            if (totalHits === 0 || searchQuery.trim() === '' ) {
                let message = 'Sorry, there are no images matching your search query. Please try again.';
               return Notiflix.Notify.failure(`${message}`)
            }
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`)   
        renderPhotos(photos)
        
            } catch (error) {
        console.log(error)
        }
    
};

function renderPhotos(photos) {
    galleryContainer.insertAdjacentHTML('beforeend', galleryCard(photos));
    
};

function clearGalleryMarkup() {
    galleryContainer.innerHTML = '';
   
}
