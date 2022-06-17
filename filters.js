const check = document.querySelectorAll(".filter-check");
const gridItems = document.querySelectorAll('.gridbox-item');

for ( i = 0; i< check.length; i++) {
  check[i].addEventListener('change', (e) => {
    const filter = e.target;
    // console.log(filter);
    
    gridItems.forEach((product) => {
      if (filter.checked && product.classList.contains(filter.name)) {
        product.style.display = "block";
      } else if (filter.checked && !product.classList.contains(filter.name)){
        product.style.display = "none";
      } else {
        product.style.display = "revert";
      }
    })
  })
};


const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-bar');
searchBtn.addEventListener('click', loadFilter);

function loadFilter(e) {
  e.preventDefault();
  
  gridItems.forEach((product) => {
    const productName = product.firstElementChild.children[1];
    const productTitle = productName.textContent.toLowerCase();
    // console.log(productTitle);
    if (productTitle.includes(searchInput.value.toLowerCase())) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
    if (searchInput.value === '') {
      product.style.display = "initial";
    }
  });
  searchInput.value = '';
}