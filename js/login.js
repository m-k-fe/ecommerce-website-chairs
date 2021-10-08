//Setup Variables
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#login-btn");
let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");
//Event
loginBtn.addEventListener("click",login);
//Register Function
function login(e){
    e.preventDefault();
    if (email.value === "" || password.value ===""){
        alert("Please Fill Data");
    }else{
        if ((getEmail && getEmail === email.value) && (getPassword && getPassword === password.value)){
            setTimeout(() => {
                window.location = "index.html";
            },1500);
        }else{
            alert("Username Or Password Is Wrong");
        };
    };
};