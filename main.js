const productContainer = document.getElementById('productContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const firstBtn = document.getElementById('firstBtn');
const paginationNum = 14;
let currPage = 1;


async function fetchProducts(page) {
    const response = await fetch(`https://dummyjson.com/products?limit=${paginationNum}&skip=${(page - 1) * paginationNum}`);
    const data = await response.json();
    displayProducts(data.products);
    prevBtn.disabled = page === 1;
    firstBtn.disabled = page === 1;
    nextBtn.disabled = data.products.length < paginationNum;
}

function displayProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
                <div class="img_cont">
                    <img src="${product.thumbnail}" alt="${product.title}">
                </div>
                <div class="title_cont">
                    <h3>${product.title}</h3>
                </div>
                <div class="text_cont">
                    <p>$${product.price} <span class="disc">${product.discountPercentage}%</span></p>
                    <p>Stock: ${product.stock}</p>   
                </div>
                
            `;
        productContainer.appendChild(productElement);
    });
}
firstBtn.onclick = () => {
    currPage = 1;
    fetchProducts(currPage);
};
prevBtn.onclick = () => {
    if (currPage > 1) {
        currPage--;
        fetchProducts(currPage);
    }
};

nextBtn.onclick = () => {
    currPage++;
    fetchProducts(currPage);
};

fetchProducts(currPage);