//Setup Variables
let title = document.querySelector(".search .title-general h2");
let inputSearch = document.querySelector("#search-input");
let searchIcon = document.querySelector(".search-btn");
let productsDom = document.querySelector(".products-parent");
//Fetch Data
async function fetchData(){
    let data = await fetch("js/data.json");
    let response = await data.json();
    return response[0];
};
//Event
searchIcon.addEventListener("click",searchProduct);
//Search Product
async function searchProduct(){
    let products = await fetchData();
    if (inputSearch.value == ""){
        title.innerHTML = `Search`;
        drawProductsUi([]);
    }else{
        productsDom.classList.add("row");
        productsDom.classList.remove("text-center");
        title.innerHTML = `Results for '${inputSearch.value.toLowerCase()}'`;
        let array = products.filter(item => item.name.toLowerCase().indexOf(inputSearch.value.toLowerCase()) != -1);
        if (array.length > 0){
            drawProductsUi(array);
        }else{
            productsDom.classList.remove("row");
            productsDom.classList.add("text-center");
            productsDom.innerHTML = `
                <h2 class="mb-4">No product results</h2>
                <button class="main-btn" onclick="viewAll()">VIEW ALL PRODUCTS</button>
            `;
        };
    }
}
//Draw Products Results
async function drawProductsUi(arr){
    let productsUi = arr.map(item => {
        return `
            <div class="col-lg-4 mb-4 product-item">
                <img src="${item.imageUrl[0]}" class="w-100 product-item-img">
                <button class="main-btn" onclick="saveItem(${item.id})">SHOP NOW</button>
                <div class="also-content">
                    <h5>${item.name}</h5>
                    ${item.oldPrice ? "<span id='also-old'>$" + item.oldPrice + "</span>" : ""}
                    <span id="also-new">$${item.newPrice}</span>
                </div>
            </div>
        `;
    });
    productsDom.innerHTML = productsUi.join("");
};
//Save Item
function saveItem(id){
    localStorage.setItem("product-id",id);
    window.location = "product-details.html";
};
//View All Products
function viewAll(){
    window.location = "all-products.html";
};