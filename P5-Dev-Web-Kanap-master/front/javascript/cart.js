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
    fetch("http://localhost:3000/api/products/")
        .then((res) => res.json())
        .then((sofa) => {
            //console.log(sofa);
            savingProductId(sofa);
            //checkFormValidity();
            displayCartItems();
            
        }); 
}
getAllProducts();

function savingProductId(sofa) {
    const addToCartButton = document.querySelectorAll('#addToCart');
    //console.log(addToCartButton);
    addToCartButton.forEach((button) => {
        button.addEventListener('click', () => {
            const productId = getProductUrl();
            //console.log(productId);
            const getProduct = sofa.filter(sofa => sofa._id == productId);
            //console.log(getProduct[0].name);
            //cartTotalCost();
            //console.log(getProduct[0]);
            storeProducts(getProduct);
        });
    });
}

function storeProducts(sofa) {
    const productName = sofa[0].name;
    //console.log(productName);
    const productPrice = sofa[0].price;
    //console.log(productPrice);
    const productImg = sofa[0].imageUrl;
    //console.log(productImg);
    const altTxt = sofa[0].altTxt;
    //console.log(altTxt);
    const productId = localStorage.getItem('productId');
    //console.log(productId);
    const selectedColor = localStorage.getItem('selectedColor');
    let selectedQuantity = localStorage.getItem('selectedQuantity');
    //console.log(selectedQuantity);
    //console.log(selectedColor);
    let product = {
        productId: localStorage.productId,
        selectedColor: localStorage.selectedColor,
        selectedQuantity: localStorage.selectedQuantity,
        productName: productName,
        productPrice: productPrice,
        productImg: productImg,
        imgAltTxt: altTxt,
    }
    //console.log(product);
    cart = JSON.parse(localStorage.getItem("products")) || [];
    cart.push(product);
    //const foundId = cart.find(element => (element.productId == productId));
    //console.log(foundId);
    //const foundColor = cart.find(element => console.log(element.selectedColor == selectedColor));
    //console.log(foundColor);
    if (product == cart.find(element => (element.productId == productId)) && cart.find(element => (element.selectedColor == selectedColor))) {
        console.log('ok'); //test pour voir si condition = true
        
    }
    localStorage.setItem("products", JSON.stringify(cart));
}

function displayCartItems() {
    let divProduct = document.querySelector("#cart__items");
    //console.log(divProduct);
    let cartItems = localStorage.getItem("products");
    cartItems = JSON.parse(cartItems);
    //console.log(cartItems);
   
    if (cartItems && divProduct) {
        divProduct.innerHTML = '';
        cartItems.forEach((product) => {
            //console.log(product);
            divProduct.innerHTML += `
            <article class="cart__item" data-id=${product.productId}>
                <div class="cart__item__img">
                    <img src=${product.productImg} alt=${product.imgAltTxt}>
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${product.productName}</h2>
                        <p>${product.productPrice}€</p>
                        <p>${product.selectedColor}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" id="quantity" name="itemQuantity" min="1" max="100"
                            value="${product.selectedQuantity}">
                        </div>
                    </div>
                    <div id=${product.productId} class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </article>`;
        });
    }
}

/*function checkFormValidity() {
    const firstName = document.querySelector('#firstName');
    //console.log(firstName);
    const lastName = document.querySelector('#lastName');
    //console.log(lastName);
    const address = document.querySelector('#address');
    //console.log(address);
    const city = document.querySelector('#city');
    //console.log(city);
    const email = document.querySelector('#email');
    //console.log(email);
    const form = document.querySelector('.cart__order__form');
    //console.log(form);

    const regexForName = /^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/;
    // /^[a-z ,.'-]+$/i
    const regexForAddress = /^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/;
    const regForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!firstName.value.match(regexForName)) {
            alert('le champ prénom contient des erreurs');
            window.location = 'page-panier.html';
        }
        if (!lastName.value.match(regexForName)) {
            alert('le champ nom contient des erreurs');
            window.location = 'page-panier.html';
        }
        if (!address.value.match(regexForAddress)) {
            alert('le champ addresse contient des erreurs');
            window.location = 'page-panier.html';
        }
        if (!city.value.match(regexForName)) {
            alert('le champ ville contient des erreurs');
            window.location = 'page-panier.html';
        }
        if (!email.value.match(regForEmail)) {
            alert('le champ email contient des erreurs');
            window.location = 'page-panier.html';
        } else {
            //sendOrder();
        }
    })
}*/

/*function sendOrder() {

}*/