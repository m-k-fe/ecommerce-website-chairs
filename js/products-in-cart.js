//Setup Variables
let cartEmpty = document.querySelector(".cart-empty");
let cartContainer = document.querySelector(".cart-container");
let cartDom = document.querySelector(".cart-items");
let badgeDom = document.querySelector("#badge");
let totalPriceDom = document.querySelector(".total-price span");
let productsInCart = localStorage.getItem("products-in-cart") ?
        JSON.parse(localStorage.getItem("products-in-cart")) :
        [];
//Get Products In Cart
if(productsInCart.length != 0){
    cartEmpty.style.display = "none";
    cartContainer.style.display = "block"; 
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
};