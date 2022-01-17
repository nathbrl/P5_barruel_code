let divProduct = document.querySelector("#cart__items");
let cartItems = JSON.parse(localStorage.getItem('products'));

if (cartItems && divProduct) {
    divProduct.innerHTML = "";
    cartItems.forEach((product) => {
        divProduct.innerHTML += `
            <article class="cart__item" data-id=${product.currentProductId}>
                <div class="cart__item__img">
                    <img src=${product.productImage} alt=${product.altTxt}>
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${product.productName}</h2>
                        <p>${product.productPrice}€</p>
                        <p>${product.productSelectedColor}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" id="quantity" name="itemQuantity" min="1" max="100"
                            value="${product.productSelectedQuantity}">
                        </div>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </article>`;
    });
}

const totalArticlesQuantity = document.querySelector('#totalQuantity');
let inputQuantity = document.querySelectorAll('#quantity');
inputQuantity.forEach((item) => {
    console.log(item.value);
    console.log(item.value * item.productSelectedQuantity);
    totalArticlesQuantity.innerHTML = item.value + ' ';
})



let totalArticles = document.querySelector('#totalPrice');
cartItems.forEach((item, i) => {
    console.log(total = item.productPrice * item.productSelectedQuantity);
    totalArticles.innerHTML = total*[i];
})

const suppressButtons = document.querySelectorAll('.deleteItem');

suppressButtons.forEach((button, i) => {
    if (cartItems.filter(item => item.productSelectedColor === cartItems[i].productSelectedColor 
        && item.currentProductId === cartItems[i].currentProductId)) {
            console.log("ok");
            
        button.addEventListener('click', () => {
            console.log("button event ok");
            console.log(cartItems);
            button.closest('article').remove();
            //window.location.href = 'cart.html';
        })
        localStorage.setItem('products', JSON.stringify(cartItems));
    }
})


const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");
const form = document.querySelector(".cart__order__form");
const inputs = document.querySelectorAll('.cart__order__form input');
console.log(inputs);

inputs.forEach((input) => {
    input.addEventListener('change', e => { // input un à un firstName, lastName etc
        console.log(inputs);
        console.log(e);
    })
});

const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const emailErrorMsg = document.getElementById('emailErrorMsg');

const regexForName = /^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/;
const regexForAddress = /^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/;
const regForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function checkFormValidity() {
    form.addEventListener("submit", (e) => {

        e.preventDefault();

        if (!firstName.value.match(regexForName)) {
            firstNameErrorMsg.innerHTML = "le champ prénom contient des erreurs";
            firstName.style.border = 'solid 2px red';
            //window.location = 'cart.html';
        } else if (firstName.value.match(regexForName)) {
            firstName.style.border = 'solid 2px #D5FCB4';
        }
        if (!lastName.value.match(regexForName)) {
            lastNameErrorMsg.innerText = "le champ nom contient des erreurs";
            lastName.style.border = 'solid 2px red';
            //window.location = 'cart.html';
        } else if (lastName.value.match(regexForName)) {
            lastName.style.border = 'solid 2px #D5FCB4';
        }
        if (!address.value.match(regexForAddress)) {
            addressErrorMsg.innerHTML = "le champ addresse contient des erreurs";
            address.style.border = 'solid 2px red';
            //window.location = 'cart.html';
        } else if (address.value.match(regexForAddress)) {
            address.style.border = 'solid 2px #D5FCB4';
        }
        if (!city.value.match(regexForName)) {
            cityErrorMsg.innerHTML = "le champ ville contient des erreurs";
            city.style.border = 'solid 2px red';
            //window.location = 'cart.html';
        } else if (city.value.match(regexForName)) {
            city.style.border = 'solid 2px #D5FCB4';
        }
        if (!email.value.match(regForEmail)) {
            emailErrorMsg.innerHTML = "le champ email contient des erreurs";
            email.style.border = 'solid 2px red';
            //window.location = 'cart.html';
        } else if (email.value.match(regForEmail)) {
            email.style.border = 'solid 2px #D5FCB4';
        } else {
            inputs.style.border = 'solid 2px #D5FCB4';
        //sendOrder();
        
        }
    });
}

checkFormValidity();
/*function sendOrder() {

}*/
