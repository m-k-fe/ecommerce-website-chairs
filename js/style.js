$(document).ready(function(){
    //TOGGLE NAVBAR
    $("#bars div").on("click",function(){
        $("#navbar ul").addClass("responsive");
    });
    $(".close").on("click",function(){
        $("#navbar ul").removeClass("responsive");
    });
    //TOGGLE CART MENU
    $(".menu").on("click",function(){
        $(".cart").toggleClass("toggle");
    });
    //GO TO ALL PRODUCTS PAGE
    $(".continue").on("click",function(){
        window.location = "all-products.html";
    });
    //GO TO CART PAGE
    $(".main-btn.view").on("click",function(){
        window.location = "cart.html";
    });
    //HEIGHT CAROUSEL
    let navHeight = $(".header").outerHeight();
    $(".slider-item").css({
        height : `calc(${100}vh - ${navHeight}px)`,
    });
    $(".slider-content").css({
        height : `calc(${100}vh - ${navHeight}px)`,
    });
    //GO TO PRODUCTS PAGE
    $(".shop1").on("click",function(){
        window.location = "all-products.html";
    });
    //GO TO FEATURED PAGE
    $(".shop2").on("click",function(){
        window.location = "featured.html";
    });
    //HEIGHT BUISNESS SECTION
    let buiHeight = $(".buisness").outerHeight();
    $(".buisness-content").css({
        height : `${buiHeight}px`
    });
});