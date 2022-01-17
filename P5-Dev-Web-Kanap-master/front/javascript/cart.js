

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
cartItems.forEach((item, i) => {
    let totalArticlesInCart = item.productSelectedQuantity;
    for(let i = 0; i < cartItems[i].length; i++) {
        totalArticlesInCart = item.productSelectedQuantity;
    }
    //console.log(totalArticlesInCart);
    totalArticlesQuantity.innerHTML = totalArticlesInCart + ' ';
})

/*let totalArticles = document.querySelector('#totalPrice');
cartItems.forEach((item, i) => {
    console.log(total = cartItems[i].productSelectedQuantity * item.productPrice);
    console.log(sum(item.productPrice));
    totalArticles.innerHTML = total;
})*/


const suppressButtons = document.querySelectorAll('.deleteItem');

suppressButtons.forEach((button, i) => {
    if (cartItems.filter(item => item.productSelectedColor === cartItems[i].productSelectedColor 
        && item.currentProductId === cartItems[i].currentProductId)) {
            //console.log("ok");
            
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

function checkFirstName() {
    firstName.addEventListener('change', e => {
        if (!firstName.value.match(regexForName)) {
            firstNameErrorMsg.innerHTML = "le champ prénom contient des erreurs";
            firstName.style.border = 'solid 2px red';
            //window.location = 'cart.html';
        } else if (firstName.value.match(regexForName)) {
            firstName.style.border = 'solid 2px #D5FCB4';
        } else {
            checkFormValidity();
        }
    });
}
checkFirstName();

function checkLastName() {
    lastName.addEventListener('change', e => {
        if (!lastName.value.match(regexForName)) {
            lastNameErrorMsg.innerText = "le champ nom contient des erreurs";
            lastName.style.border = 'solid 2px red';
            //window.location = 'cart.html';
        } else if (lastName.value.match(regexForName)) {
            lastName.style.border = 'solid 2px #D5FCB4';
        } else {
            checkFormValidity();
        }
    });
}
checkLastName();

function checkAddress() {
    address.addEventListener('change', e => {
        if (!address.value.match(regexForAddress)) {
            addressErrorMsg.innerHTML = "le champ addresse contient des erreurs";
            address.style.border = 'solid 2px red';
            //window.location = 'cart.html';
        } else if (address.value.match(regexForAddress)) {
            address.style.border = 'solid 2px #D5FCB4';
        } else {
            checkFormValidity();
        }
    });
}
checkAddress();

function checkCity() {
    city.addEventListener('change', e => {
        if (!city.value.match(regexForName)) {
            cityErrorMsg.innerHTML = "le champ ville contient des erreurs";
            city.style.border = 'solid 2px red';
            //window.location = 'cart.html';
        } else if (city.value.match(regexForName)) {
            city.style.border = 'solid 2px #D5FCB4';
        } else {
            checkFormValidity();
        }
    });
}
checkCity();

function checkEmail() {
    email.addEventListener('change', e => {
        if (!email.value.match(regexForEmail)) {
            emailErrorMsg.innerHTML = "le champ email contient des erreurs";
            email.style.border = 'solid 2px red';
            //window.location = 'cart.html';
        } else if (email.value.match(regexForEmail)) {
            email.style.border = 'solid 2px #D5FCB4';
        } else {
            checkFormValidity();
        }
    });
}
checkEmail();

const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const emailErrorMsg = document.getElementById('emailErrorMsg');

const regexForName = /^([a-zA-Zàâäéèêëïîôöùûüç' ]+){3,20}$/;
const regexForAddress = /^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/;
const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function checkFormValidity() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!email.value.match(regexForEmail) ||
            !city.value.match(regexForName) ||
            !address.value.match(regexForAddress) ||
            !lastName.value.match(regexForName) ||
            !firstName.value.match(regexForName)) {
            console.log('le form ne sera pas envoyé');
        } else{
            sendOrder();
            console.log('le form a été envoyé');
        }
    });
}
checkFormValidity();

const firstNameValue = document.querySelector("#firstName").value;
const lastNameValue = document.querySelector("#lastName").value;
const addressValue = document.querySelector("#address").value;
const cityValue = document.querySelector("#city").value;
const emailValue = document.querySelector("#email").value;

const products = Object.values(cartItems).map((product) => {
     //console.log(product);
    return product;
});

function sendOrder() {
    const order = {
        contact: {
            firstName: firstNameValue,
            lastName: lastNameValue,
            address: addressValue,
            city: cityValue,
            email: emailValue,
        },
        products: {
            products: products,
        }
    }
    const body = JSON.stringify(order);
    
    fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        body: body,
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then (res => {
        const orderI = res.orderId;
        console.log(orderI);
        window.location = `confirmation.html?orderId=${orderI}`
    })
}
