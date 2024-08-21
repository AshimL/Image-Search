const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');


let page = 1;
const accessKey = 'LOyDuMpxE13pE7r0W30JWDAKg7JW8D1DIIWBXGIAzTU';

window.addEventListener('load', () => {
  const storedResult = JSON.parse(localStorage.getItem('search'));

  if(storedResult){
    searchResult.innerHTML = storedResult;
    showMoreBtn.style.display = "block";
  }
});

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url)
    const { results } = await response.json(); // Destructuring the results directly
    if(page === 1){
      searchResult.innerHTML = "";
    }


    results.map((result) =>{
      const image = document.createElement("img");
      image.src = result.urls.small;

      const imagelink = document.createElement("a");
      imagelink.href = result.links.html;
      imagelink.target = "_blank";        
      
      imagelink.appendChild(image);
      searchResult.appendChild(imagelink);
    });

    localStorage.setItem('search', JSON.stringify(searchResult.innerHTML))
    
    showMoreBtn.style.display = "block";

}

searchForm.addEventListener("submit", (e) =>{
  
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener('click', ()=>{
  page++;
  searchImages()
})


