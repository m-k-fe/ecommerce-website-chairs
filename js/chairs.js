//Setup Variables
let productsDom = document.querySelector(".products-parent");
let numberOfProducts = document.querySelector(".counter span");
//Fetch Data
async function fetchData(){
    let data = await fetch("js/data.json");
    let response = await data.json();
    return response[0];
};
//Draw Accessories Products
async function drawAccessoriesProductsInUi(){
    let products = await fetchData();
    let acceSSoriesProducts = products.filter(item => item.category === "chairs");
    numberOfProducts.innerHTML = acceSSoriesProducts.length;
    let productsUi = acceSSoriesProducts.map(item => {
        return `
            <div class="col-lg-4 mb-4 product-item">
                <img src="${item.imageUrl[0]}" class="w-100 product-item-img">
                <div class="product-item-overlay">
                    <div>
                        <h4 class="product-item-name">${item.name}</h4>
                        <button class="main-btn" onclick="saveItem(${item.id})">
                            <span>VIEW PRODUCT</span>
                            <i class="fa fa-long-arrow-right"></i>
                        </button>
                        ${item.oldPrice ? "<span class='old-price'>$" + item.oldPrice + "</span>" : ""}
                        <span class="new-price">$${item.newPrice}</span>
                    </div>
                </div>
            </div>
        `;
    });
    productsDom.innerHTML = productsUi.join("");
};
drawAccessoriesProductsInUi();
//Save Item
function saveItem(id){
    localStorage.setItem("product-id",id);
    window.location = "product-details.html";
};