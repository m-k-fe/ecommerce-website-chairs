//Fetch Data
async function fetchData(){
    let data = await fetch("js/data.json");
    let response = await data.json();
    return response[0];
}
//Setup Variables
let detailsDom = document.querySelector(".product-details-parent");
let alsoLikeDom = document.querySelector(".also-like-parent");
let productId = localStorage.getItem("product-id");
//Draw Details
async function drawDetailsInUi(){
    let products = await fetchData();
    let detailsItem = products.find(item => item.id == productId);
    detailsDom.innerHTML = `
        <div class="col-md-7 mb-4 details-img">
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-interval="false">
                <div class="carousel-inner">
                    <div class="carousel-item slider-item-details active">
                        <img src="${detailsItem.imageUrl[0]}" class="d-block w-100" alt="">
                    </div>
                    <div class="carousel-item slider-item-details">
                        <img src="${detailsItem.imageUrl[1]}" class="d-block w-100" alt="">
                    </div>
                    <div class="carousel-item slider-item-details">
                        <img src="${detailsItem.imageUrl[2]}" class="d-block w-100" alt="">
                    </div>
                </div>
                <a class="carousel-control-prev control" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon prev-btn" aria-hidden="true">
                        <i class="fa fa-angle-left"></i>
                    </span>
                </a>
                <a class="carousel-control-next control" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon next-btn" aria-hidden="true">
                        <i class="fa fa-angle-right"></i>
                    </span>
                </a>
            </div>
            <div class="gallery">
                <img src="${detailsItem.imageUrl[0]}">
                <img src="${detailsItem.imageUrl[1]}">
                <img src="${detailsItem.imageUrl[2]}">
            </div>
        </div>
        <div class="col-md-5 details-desc">
            <h3>${detailsItem.name}</h3>
            <div class="prices">
                ${detailsItem.oldPrice ? "<span id='old'>$"+ detailsItem.oldPrice +"</span>" : ""}
                <span id="new">$${detailsItem.newPrice}</span>
            </div>
            <button class="main-btn" onclick="addToCart(${detailsItem.id})">
                <i class="fa fa-shopping-cart"></i>
                <span>ADD TO CART</span>
            </button>
            <div class="details">
                <h6>Details</h6>
                <p>${detailsItem.description}</p>
            </div>
            <div class="review">
                <div class="review-header">
                    <h6>Reviews</h6>
                    <span id="toggle-review-btn" onclick="toggleCustomer()">+</span>
                </div>
                <div class="customer-reviews">
                    <h3>Customer Reviews</h3>
                    <div>
                        <span>No reviews yet</span>
                        <span>Write a review</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};
drawDetailsInUi().then(() => getSliderItem());
//Toggle Customer Review
function toggleCustomer(){
    document.querySelector("#toggle-review-btn").classList.toggle("rotate");
    let customerDom = document.querySelector(".customer-reviews");
    customerDom.classList.toggle("toggle-customer");
};
//Get Slider Item
function getSliderItem(){
    let sliderItems = Array.from(document.querySelectorAll(".slider-item-details"));
    let sliderImages = sliderItems.map(item => item.firstElementChild.getAttribute("src"));
    let images = Array.from(document.querySelectorAll(".gallery img"));
    function controlSlider(arr,ele){
        arr.forEach(item => {
            item.classList.remove("active");
        });
        ele.classList.add("active");
    };
    images.forEach(item => {
        item.addEventListener("click",function(){
            let src = this.getAttribute("src");
            if (src == sliderImages[0]){
                controlSlider(sliderItems,sliderItems[0]);
            }else if (src == sliderImages[1]){
                controlSlider(sliderItems,sliderItems[1]);
            }else{
                controlSlider(sliderItems,sliderItems[2]);
            };
        });
    });
};
//Add To Cart
async function addToCart(id){
    if (localStorage.getItem("first-name")){
        cartEmpty.style.display = "none";
    cartContainer.style.display = "block"; 
    let products = await fetchData();
    let detailsItem = products.find(item => item.id == productId);
    let productIsExist = productsInCart.some(item => item.id == detailsItem.id);
    if(productIsExist){
        productsInCart.map(item => {
            if (item.id == detailsItem.id) item.qty += 1;
            return item;
        });
    }else{
        productsInCart.push(detailsItem);
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
    }
}
//Draw Also Like Items In Ui
async function drawAlsoLikeInUi(){
    let products = await fetchData();
    let accessoriesProducts = products.filter(item => item.category == "accessories");
    let chairsProducts = products.filter(item => item.category == "chairs");
    let sofasProducts = products.filter(item => item.category == "sofas");
    let arr = [accessoriesProducts[0],chairsProducts[0],sofasProducts[0]];
    if (productId == arr[0].id){
        arr.splice(0,1,accessoriesProducts[1]);
    }else if (productId == arr[1].id){
        arr.splice(1,1,chairsProducts[1]);
    }else if (productId == arr[2].id){
        arr.splice(2,1,sofasProducts[1]);
    };
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
    alsoLikeDom.innerHTML = productsUi.join("");
};
drawAlsoLikeInUi();
//Save Item
function saveItem(id){
    localStorage.setItem("product-id",id);
    window.location = "product-details.html";
};