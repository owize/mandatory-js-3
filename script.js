

let nav        = document.querySelector("nav");
let section    = document.querySelector("section");
let main       = document.querySelector("main");
let h1         = document.querySelector("h1");
h1.textContent = "";
let img        = document.querySelector("img");
let button     = document.querySelector("button");

let parsedData;
let breed;
let subBreed;
let subString;

//=================== toUpperCase ============================================//
function big(string) { 
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//=================== toLowerCase ============================================//
function small(string) { 
    return string.charAt(0).toLowerCase() + string.slice(1);
}
//=================== request data ===========================================//
function getData() {
    let currentBreed = window.location.hash.substring(1);
    let req = new XMLHttpRequest (); //
    req.open("GET", "https://dog.ceo/api/breeds/list/all");
    req.addEventListener("load", parse);
    req.send();
}
getData();

//=================== parse checked data =====================================//
function parse() {
  if(this.status >= 200 && this.status < 300){
    let parsedData = JSON.parse(this.responseText);
    renderText(parsedData.message);
  }  else {
    console.error("Invalid status" + this.status);
  }
}
//=================== render to list =========================================//
function renderText(data) {
    let ul = document.createElement("ul");
    nav.appendChild(ul);
    for (let key in data){
        let li = document.createElement("li");
        li.textContent = big(key);
        li.addEventListener('click', function (e) {
        window.location.hash = small(e.target.textContent);

        getBreedImg();
        getSubBreed();
      });
      ul.appendChild(li);
    }
  }

//=================== request subbreed data ==================================//
function getSubBreed() {
  let currentBreed = window.location.hash.substring(1);
  let req = new XMLHttpRequest (); //
  req.open('GET', 'https://dog.ceo/api/breed/' + currentBreed + '/list');
  req.addEventListener("load", parseSubBreed);
  req.send();
}
//=================== parse subbreed data ====================================//
function parseSubBreed() {
  let parsedSub = JSON.parse(this.responseText);
  renderSubText(parsedSub.message);
}
//=================== render subbreed data to list ===========================//
function renderSubText(data) {
  if (data.length > 0) {
    section.innerHTML = "";
    let currentBreed = window.location.hash.substring(1);
    let ul = document.createElement("ul");
    section.appendChild(ul);
    for (let key of data){
      let li = document.createElement("li");
      li.textContent = big(key);
      ul.appendChild(li);
      li.addEventListener('click', function (e) {
        window.location.hash = currentBreed + "/" + small(e.target.textContent);
        getBreedImg();
      });
    }
  } else {
    section.innerHTML = "";
  }
}

//=================== request random images ==================================//
function getRandomImg() {
  let currentBreed = window.location.hash.substring(1);
    let req = new XMLHttpRequest ();
    req.open("GET", "https://dog.ceo/api/breeds/image/random");
    req.addEventListener("load", parseImg);
    req.send();
}
//=================== parse random images ====================================//
function parseImg() {
   let parsedData = JSON.parse(this.responseText);
   renderImg(parsedData.message);
}
//=================== render random images ===================================//
function renderImg (imgData) {
  let checkImg = document.querySelector("img");
  if (checkImg){
    main.removeChild(checkImg);
  }
  let img = document.createElement("img");
  img.setAttribute("src", imgData);
  main.appendChild(img);
}

//=================== click for random images ================================//
button.addEventListener("click", function() {
  if (window.location.hash !== "") {
      getBreedImg();
  } else {
      getRandomImg();
  }
});

//=================== request breed pictures =================================//
function getBreedImg() {
  let currentBreed = window.location.hash.substring(1);
  let req = new XMLHttpRequest ();
  req.open("GET", "https://dog.ceo/api/breed/"+currentBreed+"/images/random");
  req.addEventListener("load", parseBreedImg);
  req.send();

}
//=================== parse breed images =====================================//
function parseBreedImg() {
  let parsedData = JSON.parse(this.responseText);
  renderBreedImg(parsedData.message);
}
//=================== render breed images ====================================//
function renderBreedImg (imgData) {
  let checkImg = document.querySelector("img");
  if (checkImg){
    main.removeChild(checkImg);
  }
  let img = document.createElement("img");
  img.setAttribute("src", imgData);
  main.appendChild(img);

  setCurrentBreed();
}

//=================== set title ==============================================//
function setCurrentBreed() {
  let hash = window.location.hash.substring(1).split("/");

  h1.textContent = "";
  if (hash.length === 2) {
    h1.textContent = big(hash[1]) + " " + big(hash[0]);
  } else {
    h1.textContent = big(hash[0]);
  }
}

//=================== call functions IF hash is empty ========================//
if (window.location.hash !== "") {
  getBreedImg();
} else {
  getRandomImg();
}