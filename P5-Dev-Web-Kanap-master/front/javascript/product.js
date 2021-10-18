function getProductUrl() {
    const urlLoc = window.location.href;
    //console.log(urlLoc);
    const url = new URL(urlLoc);
    //console.log(url);
    const urlId = url.searchParams.get("id");
    return urlId;
}
getProductUrl();

function getAllProducts() {
    const productId = getProductUrl();
    //console.log(productId);
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then((res) => res.json())
        .then((sofa) => {
            //console.log(sofa);
            displayImage(sofa);
            displayPrice(sofa);
            displayDescription(sofa);
            displayColors(sofa);
            displayName(sofa);
        });
}
getAllProducts();

function displayImage(sofa) {
    const img = document.querySelector('.item__img img');
    //console.log(img);
    img.src = sofa.imageUrl;
    img.alt = sofa.altTxt;
    //console.log(img);
}

function displayPrice(sofa) {
    const price = document.querySelector('#price');
    //console.log(price);
    price.innerHTML = sofa.price;
    //console.log(price);
}
function displayDescription(sofa) {
    const description = document.querySelector('#description');
    //console.log(description);
    description.innerHTML = sofa.description;
    //console.log(description);
}

function displayName(sofa) {
    const name = document.querySelector('#title');
    //console.log(name);
    name.innerHTML = sofa.name;
    //console.log(name);
}

function colorOption() {
    const choice = document.querySelector('option');
    //console.log(choice);
    //choice.setAttribute('disabled', 'disabled');
    choice.setAttribute('selected', 'true');
    choice.setAttribute('value', 0);
    //console.log(choice);
}
colorOption();

function displayColors(sofa) {
    const sofaColors = sofa.colors;
    const option = document.querySelector('#colors');
    //console.log(sofa.colors);
    sofaColors.forEach((sofa) => {
        const sofaColorOption = document.querySelector("option");
        sofaColorOption.setAttribute("value", 1);
        sofaColorOption.textContent = sofa;
        console.log(sofaColorOption);
        option.appendChild(sofaColorOption);
    })
}