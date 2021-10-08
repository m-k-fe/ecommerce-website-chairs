//Setup Variables
let postDom = document.querySelector(".post-container");
let commentsDom = document.querySelector(".comments-parent");
let counterDom = document.querySelector(".counter-comments");
let inputName = document.querySelector("#name");
let inputEmail = document.querySelector("#email");
let inputMsg = document.querySelector("#msg");
let sendMsgBtn = document.querySelector("#send");
let postId = localStorage.getItem("post-id");
//Fetch Data
async function fetchData(){
    let data = await fetch("js/data.json");
    let response = await data.json();
    return response[1];
};
//Draw Post Details
async function drawPostDetails(){
    let posts = await fetchData();
    let post = posts.find(item => item.id == postId);
    postDom.innerHTML = `
        <div class="post-img">
            <img src="${post.postBgImage}" class="h-100 w-100" alt="">
        </div>
        <div class="container">
            <div class="post-info">
                <header class="post-header">
                    <h2>${post.postTitle}</h2>
                    <span id="date">${post.postDate}</span>
                    <span id="author">by ${post.postAuthor}</span>
                </header>
                <div class="post-desc">
                <p>${post.postDesc}</p>
            </div>
        </div>
            <div class="row author-info">
                <div class="col-sm-6 author-info-item">
                    <img src="${post.postAuthorImage}" alt="">
                    <div>
                        <h4>${post.postAuthor}</h4>
                        <p>${post.postAuthorDesc}</p>
                    </div>
                </div>
                <div class="col-sm-6 author-info-item">
                    <h4>Share</h4>
                    <ul class="list-unstyled">
                        <li><i class="fa fa-twitter"></i></li>
                        <li><i class="fa fa-facebook"></i></li>
                        <li><i class="fa fa-pinterest"></i></li>
                        <li><i class="fa fa-google"></i></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
};
drawPostDetails();
//Draw Comments
async function drawCommentsInUi(arr = []){
    let posts = await fetchData() || arr;
    let post = posts.find(item => item.id == postId);
    let comments = JSON.parse(localStorage.getItem("comments")) || post.postComments;
    counterDom.innerHTML = `${comments.length} comments`;
    let commentsUi = comments.map(item => {
        return `
            <div class="row comment-box">
                <div class="col-md-4 comment">
                    <h4>${item.name}</h4>
                    <span>${item.date}</span>
                </div>
                <div class="col-md-8 comment">
                    <p>${item.text}</p>
                </div>
            </div>
        `;
    });
    commentsDom.innerHTML = commentsUi.join("");
};
drawCommentsInUi();
//Handle Form
sendMsgBtn.addEventListener("click",async function(e){
    e.preventDefault();
    if (inputName.value === "" || inputEmail.value === "" || inputMsg.value === ""){
        alert("Please Fill Data");
    }else{
        let posts = await fetchData();
        let post = posts.find(item => item.id == postId);
        let arr = localStorage.getItem("comments") ? 
                JSON.parse(localStorage.getItem("comments")) :
                post.postComments;
        let newComment = {
            "name" : inputName.value.trim(),
            "date" : getFormattedDate(),
            "text" : inputMsg.value.trim()
        };
        arr.push(newComment);
        localStorage.setItem("comments",JSON.stringify(arr));
        inputName.value = "";
        inputEmail.value = "";
        inputMsg.value = "";
        drawCommentsInUi(arr);
    };
});
function getFormattedDate() {
    let date = new Date().toString();
    let arr = date.split(" ");
    let dateFormat = `${arr[1]}. ${arr[2]}, ${arr[3]}`;
    return dateFormat;
};