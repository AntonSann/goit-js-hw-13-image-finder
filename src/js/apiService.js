const apiKey = "20295097-829d2b115353c9c8ba250dd1e";

export default {
    imageQuery: '',
    page: 1,
    fetchImage () {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.imageQuery}&page=${this.page}&per_page=12&key=${apiKey}`;
    
        return fetch(url)
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then(images => {
            this.incrementPage();
            return images.hits;
        })
        .catch(error => console.log(error));
    
    },
    get query() {
        return this.imageQuery;
    },
    set query(value) {
        this.imageQuery = value;
    },
    resetPage (){
        this.page = 1;
    },
    incrementPage (){
        this.page += 1;
    }
};