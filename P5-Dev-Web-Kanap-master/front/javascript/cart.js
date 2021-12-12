function displayCartProducts() {
    let divProduct = document.querySelector("#cart__items");
    let cartItems = localStorage.getItem("products");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
   
    if (cartItems && divProduct) {
        divProduct.innerHTML = '';
        cartItems.forEach((product) => {
            divProduct.innerHTML += `
            <article class="cart__item" data-id=${product.productId}>
                <div class="cart__item__img">
                    <img src=${product.productImage}>
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
displayCartProducts();

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