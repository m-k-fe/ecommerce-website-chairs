//Setup Variables
let productsDom = document.querySelector(".cart-parent");
let noProductsDom = document.querySelector("#cart-empty");
let summaryDom = document.querySelector(".summary");
let totalPriceSummaryDom = document.querySelector(".t-pr");
//Get Total Price In Summary
let prices = JSON.parse(localStorage.getItem("products-in-cart")).map(item => +item.newPrice * item.qty);
let totlaPrice = prices.reduce((cur,total) => cur + total,0);
totalPriceSummaryDom.innerHTML = `$${totlaPrice}.00`;
//Draw Cart Products In Ui
function drawProductsInCartUi(arr = []){
    let allItems = JSON.parse(localStorage.getItem("products-in-cart")) || arr;
    if (allItems.length == 0){
        cartEmpty.style.display = "block";
        cartContainer.style.display = "none";
        noProductsDom.style.display = "block";
        summaryDom.style.display = "none";
        document.querySelector(".cart .title-general").style.display = "none";
    };
    let productsUi = allItems.map(item => {
        return `
            <div class="cart-child">
                <span class="close" onclick="removeFromCart(${item.id})">x</span>
                <img src="${item.imageUrl[0]}" class="cart-child-img">
                <div class="cart-child-content">
                    <span class="cart-child-name">${item.name}</span>
                    <span class="cart-child-price">Price : $${item.newPrice}</span>
                    <span class="cart-child-qty">Q-ty : ${item.qty}</span>
                </div>
            </div>
        `;
    });
    productsDom.innerHTML = productsUi.join("");
};
drawProductsInCartUi();
//Remove From Cart
function removeFromCart(id){
    let items = JSON.parse(localStorage.getItem("products-in-cart"));
    if (items){
        let filtredItems = items.filter(item => item.id != id);
        cartDom.innerHTML = "";
        filtredItems.forEach(item => {
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
        badgeDom.innerHTML = filtredItems.length;
        let prices = filtredItems.map(item => +item.newPrice * item.qty);
        let totlaPrice = prices.reduce((cur,total) => cur + total,0);
        totalPriceDom.innerHTML = `$${totlaPrice}.00`;
        totalPriceSummaryDom.innerHTML = `$${totlaPrice}.00`;
        localStorage.setItem("products-in-cart",JSON.stringify(filtredItems));
        drawProductsInCartUi(filtredItems);
    };
};