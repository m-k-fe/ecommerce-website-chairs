//Setup Variables
let productItemsOverlay = document.querySelectorAll(".product-item-overlay");
//Fetch Data
async function fetchData(){
    let data = await fetch("js/data.json");
    let response = await data.json();
    return response[0];
};
//Draw Collection Items
async function drawCollectionsInUi(){
    let products = await fetchData();
    let accessoriesProducts = products.filter(item => item.category === "accessories");
    let chairsProducts = products.filter(item => item.category === "chairs");
    let sofasProducts = products.filter(item => item.category === "sofas");
    function updateDom(element,array,number){
        let firstLetter = array[0].category[0].toUpperCase();
        let strCapitalize = firstLetter.concat(array[0].category.slice(1));
        element.innerHTML = `
            <div>
                <h4 class="product-item-name">${strCapitalize}</h4>
                <button class="main-btn" onclick="goToCategoryPage(${number})">SHOP <span>${array[0].category}</span></button>
                <span class="new-price"><span>${array.length}</span> items</span>
            </div>
        `;
    };
    updateDom(productItemsOverlay[0],accessoriesProducts,1);
    updateDom(productItemsOverlay[1],chairsProducts,2);
    updateDom(productItemsOverlay[2],sofasProducts,3);
};
drawCollectionsInUi();
//Go To Category Page
function goToCategoryPage(number){
    if (number == 1){
        window.location = "accessories.html";
    }else if(number == 2){
        window.location = "chairs.html";
    }else{
        window.location = "sofas.html";
    }
};