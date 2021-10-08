//Setup Variables
let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let registerBtn = document.querySelector("#register-btn");
//Event
registerBtn.addEventListener("click",register);
//Register Function
function register(e){
    e.preventDefault();
    if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value ===""){
        alert("Please Fill Data");
    }else{
        localStorage.setItem("first-name",firstName.value);
        localStorage.setItem("last-name",lastName.value);
        localStorage.setItem("email",email.value);
        localStorage.setItem("password",password.value);
        setTimeout(() => {
            window.location = "login.html";
        },1500);
    };
};