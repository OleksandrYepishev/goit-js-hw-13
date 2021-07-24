
import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22089613-2c269b20f41d8e495fd067b59';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';

async function fetchPhotos(searchField) {
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchField}&${OPTIONS}`);
        return response
    } catch (error) {
        console.log(error)
    }
}


export default fetchPhotos;