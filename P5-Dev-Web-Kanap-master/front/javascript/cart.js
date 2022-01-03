let divProduct = document.querySelector("#cart__items");
let cartItems = localStorage.getItem("products");
cartItems = JSON.parse(cartItems);

if (cartItems && divProduct) {
    divProduct.innerHTML = "";
    cartItems.forEach((product) => {
        divProduct.innerHTML += `
            <article class="cart__item" data-id=${product.currentProductId}>
                <div class="cart__item__img">
                    <img src=${product.currentProductImage} alt=${product.currentAltTxt}>
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${product.currentProductName}</h2>
                        <p>${product.currentProductPrice}€</p>
                        <p>${product.currentSelectedColor}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" id="quantity" name="itemQuantity" min="1" max="100"
                            value="${product.currentSelectedQuantity}">
                        </div>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </article>`;
    });
}

/*const suppressButtons = document.querySelectorAll('p.deleteItem');
suppressButtons.addEventListener('click', () => {
    localStorage.removeItem('products');
    window.location.reload();
})*/

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");
const form = document.querySelector(".cart__order__form");

const regexForName = /^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/;
const regexForAddress = /^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/;
const regForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function checkFormValidity() {
    form.addEventListener("submit", (e) => {

        e.preventDefault();

        if (!firstName.value.match(regexForName)) {
        firstName.setCustomValidity("le champ prénom contient des erreurs");
        firstName.style.border = 'solid 2px red';
        } else if (firstName.value.match(regexForName)) {
            firstName.style.border = 'solid 2px #D5FCB4';
        }
        if (!lastName.value.match(regexForName)) {
        lastName.setCustomValidity("le champ nom contient des erreurs");
        lastName.style.border = 'solid 2px red';
        } else if (lastName.value.match(regexForName)) {
            lastName.style.border = 'solid 2px #D5FCB4';
        }
        if (!address.value.match(regexForAddress)) {
        address.setCustomValidity("le champ addresse contient des erreurs");
        address.style.border = 'solid 2px red';
        } else if (address.value.match(regexForAddress)) {
            address.style.border = 'solid 2px #D5FCB4';
        }
        if (!city.value.match(regexForName)) {
        city.setCustomValidity("le champ ville contient des erreurs");
        city.style.border = 'solid 2px red';
        } else if (city.value.match(regexForName)) {
            city.style.border = 'solid 2px #D5FCB4';
        }
        if (!email.value.match(regForEmail)) {
        email.setCustomValidity("le champ email contient des erreurs");
        email.style.border = 'solid 2px red';
        } else if (email.value.match(regForEmail)) {
            email.style.border = 'solid 2px #D5FCB4';
        } else {
        //sendOrder();
        }
    });
}

checkFormValidity();
/*function sendOrder() {

}*/
