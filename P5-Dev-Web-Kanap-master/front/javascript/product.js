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
            displayName(sofa);
            createColorOption(sofa);
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

function createColorOption(sofa) {
    const optionText = document.createElement('option');
    //console.log(optionText);
    const select = document.querySelector('select').options;
    select.add(optionText)
    //console.log(select);
    optionText.setAttribute('disabled', 'disabled');
    optionText.setAttribute('selected', 'true');
    optionText.textContent = 'SVP choisissez une couleur';
    const arrayColors = sofa.colors;
    //console.log(arrayColors);
    arrayColors.forEach((sofa) => {
        const colorOption = document.createElement("option");
        colorOption.setAttribute("value", sofa);
        colorOption.textContent = sofa;
        //console.log(colorOption);
        select.add(colorOption);
    });
    colorOption();
}

function colorOption() {
    const select = document.querySelector('#colors');
    //console.log(select);
    select.addEventListener('change', (e) => {
        //console.log(e.target.value);
        const selectedColor = e.target.value;
        //console.log(selectedColor);

        localStorage.setItem("selectedColor", selectedColor);
        console.log(localStorage.getItem('selectedColor'));
    })
}












/* get selected option
const options = Array.from(select.options);
options.forEach((option, i) => {
  if (option.value === use_id) select.selectedIndex = i;
}); */

/*function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}*/