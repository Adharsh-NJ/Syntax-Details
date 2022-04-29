let cardContainer = document.querySelector("#cardContainer")
let search = document.querySelector("#searchBar")
let data=[];
let id ;

//api request
let fetchData= (url)=>{
    let request = new XMLHttpRequest();
    request.open("GET",url,true)
    request.send();
 request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     data = JSON.parse(this.responseText);
     cardContainer.innerHTML=""
     data?.map(value=>renderCard(value))
}
 }
}

//rendering card
function renderCard(item){
    let card = document.createElement("div")
    let heading = document.createElement("h1")
    let para = document.createElement('p')
    let button = document.createElement('button')
    card.classList.add("card")
    heading.classList.add("card__heading")
    para.classList.add("card__paragraph")
    button.classList.add("card__button")
    button.addEventListener("click",(e)=>{
        e.preventDefault()
        sessionStorage.setItem("id",item.id)
     location.href="./detailsPage.html"
    })
    heading.innerHTML=item.concept_search
    para.innerHTML = item.description
    button.innerHTML = "More Details"
    card.append(heading,para,button)
    cardContainer.appendChild(card)
}
//invoking requests
function invokeSearch(){
    if(search.value){
        fetchData(`https://syntaxdb.com/api/v1/concepts/search?q=${search.value}`)
    }else{
        fetchData(`https://syntaxdb.com/api/v1/concepts?limit=100`)
    }
}
//debouncing
const debounceEvent = (re, time) => {
    let interval;
    return () => {
      clearTimeout(interval);
      interval = setTimeout(() => {
        interval = null;
        re();
      }, time);
    };
  };
  
  search?.addEventListener("input",debounceEvent(invokeSearch,500))

fetchData(`https://syntaxdb.com/api/v1/concepts?limit=100`);


