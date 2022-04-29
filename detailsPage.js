let heading = document.querySelector('#heading');
let description = document.querySelector('#description');
let syntax = document.querySelector('#syntax');
let note = document.querySelector('#note');
let example = document.querySelector('#example');
let reference = document.querySelector('#reference');
let loading = document.querySelector('#loadingContainer');
let details = document.querySelector('#detailsContainer');
let data;

let fetchData = (url) => {
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            details.style.display = "flex";
            loading.style.display = "none";
            data = JSON.parse(this.responseText);
            renderDetails(data);
        } else if (this.readyState == 3) {
            details.style.display = "none";
            loading.style.display = "flex";
        }
    }
}

let renderDetails = (item) => {
    heading.innerHTML = item.concept_search;
    description.innerHTML = item.description;
    syntax.innerHTML = item.syntax;
    note.innerHTML = item.notes;
    example.innerHTML = item.example;
    reference.innerHTML = item.documentation ? "Reference:" + item.documentation : "";
}

fetchData(`https://syntaxdb.com/api/v1/concepts/${sessionStorage.getItem('id')}`);