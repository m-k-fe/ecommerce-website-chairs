//Setup Variables
let productsDom = document.querySelector(".products-parent");
let postsDom = document.querySelector(".posts-parent");
//Fetch Data Products
async function fetchData(){
    let data = await fetch("js/data.json");
    let response = await data.json();
    return response[0].slice(0,9);
};
//Fetch Data Posts
async function fetchData2(){
    let data = await fetch("js/data.json");
    let response = await data.json();
    return response[1];
};
//Draw Products In Ui
async function drawProductsUi(){
    let products = await fetchData();
    let productsUi = products.map(item => {
        return `
            <div class="col-lg-4 mb-4 product-item">
                <img src="${item.imageUrl[0]}" class="w-100 product-item-img">
                <div class="product-item-overlay">
                    <div>
                        <h4 class="product-item-name" onclick="saveItem(${item.id})">${item.name}</h4>
                        <button class="main-btn" onclick="addToCart(${item.id})">
                            <i class="fa fa-shopping-cart"></i>
                            <span>ADD TO CART</span>
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
drawProductsUi();
//Draw Products In Ui
async function drawPostsUi(){
    let posts = await fetchData2();
    let productsUi = posts.map(item => {
        return `
            <div class="col-lg-4 mb-4 product-item">
                <img src="${item.postImage}" class="w-100 product-item-img">
                <div class="post-item-content">
                    <h4 class="post-item-name" onclick="savePost(${item.id})">${item.postTitle}</h4>
                    <span class="post-item-date">${item.postDate}</span>
                    <p class="post-item-desc">
                        ${item.postDesc.split(" ").slice(0,16).join(" ")}...
                    </p>
                </div>
            </div>
        `;
    });
    postsDom.innerHTML = productsUi.join("");
};
drawPostsUi();
//Add To Cart
async function addToCart(id){
    if (localStorage.getItem("first-name")){
        cartEmpty.style.display = "none";
    cartContainer.style.display = "block"; 
    let products = await fetchData();
    let choosenItem = products.find(item => item.id == id);
    let productIsExist = productsInCart.some(item => item.id == choosenItem.id);
    if(productIsExist){
        productsInCart.map(item => {
            if (item.id == choosenItem.id) item.qty += 1;
            return item;
        });
    }else{
        productsInCart.push(choosenItem);
    };
    cartDom.innerHTML = "";
    productsInCart.forEach(item => {
        cartDom.innerHTML += `
            <div class="cart-item">
                <img src="${item.imageUrl[0]}" class="cart-item-img">
                <div class="cart-item-desc">
                    <h5 class="cart-item-desc-title">${item.name}</h5>
                    <span class="cart-item-desc-price">$${item.newPrice}</span>
                    <span class="cart-item-desc-qty">Q-ty : ${item.qty}</span>
                </div>
            </div>  
        `;
    });
    badgeDom.innerHTML = productsInCart.length;
    let prices = productsInCart.map(item => +item.newPrice * item.qty);
    let totlaPrice = prices.reduce((cur,total) => cur + total,0);
    totalPriceDom.innerHTML = `$${totlaPrice}.00`;
    localStorage.setItem("products-in-cart",JSON.stringify(productsInCart));
    }else{
        window.location = "login.html";
    };
}
//Save Item
function saveItem(id){
    localStorage.setItem("product-id",id);
    window.location = "product-details.html";
};
//Save Post
function savePost(id){
    localStorage.setItem("post-id",id);
    window.location = "post.html";
};