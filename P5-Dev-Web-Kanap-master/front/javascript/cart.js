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
        .then((sofa) =>  {
                //console.log(sofa);
                savingProductId(sofa);
                displayCartItems(sofa);
                //checkFormValidity();
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
            //console.log(getProduct);
            //totalQuantity(getProduct[0]);
            //cartTotalCost(getProduct[0]);
            //console.log(getProduct[0]);
            storeProducts();
        });
    });
}

function totalQuantity(sofa) {
    let quantity = parseInt(localStorage.getItem('selectedQuantity'));
    console.log(quantity);

    let cartItem = localStorage.getItem('products');
    cartItem = JSON.parse(cartItem);

    let productId = localStorage.productId;
    console.log(productId);
    let productColor = localStorage.selectedColor;
    console.log(productColor);

    if (productColor == productId) {
        localStorage.setItem('selectedQuantity', quantity + 1);
    } else {
        localStorage.setItem('selectedQuantity', 1);
    }
}

function storeProducts() {
    const product = {
        productId: localStorage.productId,
        selectedColor: localStorage.selectedColor,
        selectedQuantity: localStorage.selectedQuantity,
    }
    //console.log(product);
    cart = JSON.parse(localStorage.getItem("products")) || [];
    cart.push(product);
    //console.log(cart);
    localStorage.setItem("products", JSON.stringify(cart));
    console.log(localStorage.getItem("products"));
}
/*function cartTotalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    //console.log(product);
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
    const totalQuantity = document.querySelector('span#totalQuantity');
    //console.log(totalQuantity);
    //totalQuantity.innerHTML = '6';

    const totalCart = document.querySelector('span#totalPrice');
    //console.log(totalCart);
    //totalCart.innerHTML = cartCost;
    //console.log(totalCart);
}*/

function displayCartItems(sofa) {
    //Récupérer l'array avec tous les prdt // = cartItems
    // Itérer sur l'arr, log l'arr du prdt + log (stocker l'id du prd)
    
    let divProduct = document.querySelector("#cart__items");
    //console.log(divProduct);
    let cartItems = localStorage.getItem("products");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    //console.log(cartItems);

    if (cartItems && divProduct) {
        divProduct.innerHTML = '';
        cartItems.forEach((product, i) => {
            //console.log(product);
            divProduct.innerHTML += `
            <article class="cart__item" data-id=${product.productId}>
                <div class="cart__item__img">
                    <img src=${sofa[i].imageUrl} alt=${sofa[i].altTxt}>
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${sofa[i].name}</h2>
                        <p>${sofa[i].price}€</p>
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

/*function removeProduct() {
    const suppressButton = document.querySelectorAll('.cart__item__content__settings__delete');
    console.log(suppressButton);
    suppressButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            console.log(e);
            localStorage.removeItem('products');
            window.location.reload();
        });
    });
}
removeProduct();*/

/*function checkFormValidity() {
    const firstName = document.querySelector('#firstName');
    console.log(firstName);
    const lastName = document.querySelector('#lastName');
    console.log(lastName);
    const address = document.querySelector('#address');
    console.log(address);
    const city = document.querySelector('#city');
    console.log(city);
    const email = document.querySelector('#email');
    console.log(email);
    const form = document.querySelector('.cart__order__form');
    console.log(form);

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
            sendOrder();
        }
    })
}

function sendOrder() {

}*/