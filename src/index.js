import './styles.css';
import './basicLightbox.css';
import imageService from "./js/apiService.js";
import photoCard from './templates/photoCard.hbs';
import * as basicLightbox from 'basiclightbox';

const refs = {
    list: document.querySelector('.gallery'),
    searchForm: document.querySelector('input'),
    more: document.querySelector('.btn')
};

refs.list.addEventListener("click", onImageClick);

function onImageClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  event.preventDefault();

  const fullImgLink = event.target.getAttribute("data-large-image");
  const imgAlt = event.target.getAttribute("alt");

  const instance = basicLightbox.create(`
        <img src=${fullImgLink} alt=${imgAlt}/>
    `);

  instance.show();
}

function debounce(callback) {
    let timeout;
    return function(argument) {
      clearTimeout(timeout);
      timeout = setTimeout(callback, 1000, argument);
    };
  }

  function onInput(event) {
    event.preventDefault();
    imageService.query = event.target.value;

    refs.list.innerHTML = '';
    refs.searchForm.value = '';

    imageService.resetPage();
    refs.more.classList.add('is-hidden');
    imageService.fetchImage()
    .then(images => {
        buildPhotoCard(images)
        refs.more.classList.remove('is-hidden');
    });
  
  }
  const debouncedOnInput = debounce(onInput);
  refs.searchForm.addEventListener('input', debouncedOnInput);

  function buildPhotoCard(items) {
    updatePhotoList(photoCard(items));
  }
  function updatePhotoList (data){
    refs.list.insertAdjacentHTML('beforeend', data);
  }

  refs.more.addEventListener('click', () => { 
    imageService.fetchImage()
    .then(images => {
        buildPhotoCard(images)
        window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: "smooth"
        });
    });
});