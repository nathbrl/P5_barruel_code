

const productId = localStorage.getItem('products.currentProductId');

let divProduct = document.querySelector("#cart__items");
let cartItems = JSON.parse(localStorage.getItem('products'));
let inputQuantity = document.querySelectorAll('#quantity');
let cartFormOrder = document.querySelector('.cart__order__form');

if (cartItems !== null) {
    divProduct.innerHTML = "";
    cartItems.forEach((productLS) => {
        //fetch 
        fetch('http://localhost:3000/api/products/'+`${productLS.currentProductId}`)
        .then((res) => res.json())
        .then((productAPi) => {
            divProduct.innerHTML += `
                <article class="cart__item" data-id=${productAPi.productId}>
                    <div class="cart__item__img">
                        <img src=${productAPi.imageUrl} alt=${productAPi.altTxt}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__titlePrice">
                            <h2>${productAPi.name}</h2>
                            <p>${productAPi.price}€</p>
                            <p>${productLS.productSelectedColor}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" id="quantity" name="itemQuantity" min="1" max="100"
                                value="${productLS.productSelectedQuantity}">
                            </div>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </article>`;
            const totalArticlesQuantity = document.querySelector('#totalQuantity');
            let totalArticlesInCart = productLS.productSelectedQuantity;
                console.log(totalArticlesInCart);
                totalArticlesQuantity.innerHTML = totalArticlesInCart + ' ';
        
            let totalArticles = document.querySelector('#totalPrice');
             console.log(total = productAPi.price * productLS.productSelectedQuantity);
                totalArticles.innerHTML = total;

            let changeQuantity = inputQuantity.addEventListener('change', (e) => {
                changeQuantity = parseInt(e.target.value);
            });
        });
    });
    
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

    function checkFirstName() {
        firstName.addEventListener('change', e => {
            if (!firstName.value.match(regexForName)) {
                firstNameErrorMsg.innerHTML = "le champ prénom contient des erreurs";
                firstName.style.border = 'solid 2px red';
                firstNameErrorMsg.style.color = '#fbbcbc';
            } else if (firstName.value.match(regexForName)) {
                firstName.style.border = 'solid 2px #D5FCB4';
                firstNameErrorMsg.style.color = '#D5FCB4';
                firstNameErrorMsg.innerHTML = "ok";
            }
        });
    }
    checkFirstName();

    function checkLastName() {
        lastName.addEventListener('change', e => {
            if (!lastName.value.match(regexForName)) {
                lastNameErrorMsg.innerText = "le champ nom contient des erreurs";
                lastName.style.border = 'solid 2px red';
                lastNameErrorMsg.style.color = '#fbbcbc';
            } else if (lastName.value.match(regexForName)) {
                lastName.style.border = 'solid 2px #D5FCB4';
                lastNameErrorMsg.style.color = '#D5FCB4';
                lastNameErrorMsg.innerText = "ok";
            }
        });
    }
    checkLastName();

    function checkAddress() {
        address.addEventListener('change', e => {
            if (!address.value.match(regexForAddress)) {
                addressErrorMsg.innerHTML = "le champ addresse contient des erreurs";
                address.style.border = 'solid 2px red';
                addressErrorMsg.style.color = '#fbbcbc';
            } else if (address.value.match(regexForAddress)) {
                address.style.border = 'solid 2px #D5FCB4';
                addressErrorMsg.style.color = '#D5FCB4';
                addressErrorMsg.innerHTML = "ok";
            }
        });
    }
    checkAddress();

    function checkCity() {
        city.addEventListener('change', e => {
            if (!city.value.match(regexForName)) {
                cityErrorMsg.innerHTML = "le champ ville contient des erreurs";
                city.style.border = 'solid 2px red';
                cityErrorMsg.style.color = '#fbbcbc';
            } else if (city.value.match(regexForName)) {
                city.style.border = 'solid 2px #D5FCB4';
                cityErrorMsg.style.color = '#D5FCB4';
                cityErrorMsg.innerHTML = "ok";
            }
        });
    }
    checkCity();

    function checkEmail() {
        email.addEventListener('change', e => {
            if (!email.value.match(regexForEmail)) {
                emailErrorMsg.innerHTML = "le champ email contient des erreurs";
                email.style.border = 'solid 2px red';
                emailErrorMsg.style.color = '#fbbcbc';
            } else if (email.value.match(regexForEmail)) {
                email.style.border = 'solid 2px #D5FCB4';
                emailErrorMsg.style.color = '#D5FCB4';
                emailErrorMsg.innerHTML = "ok";
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
        cartFormOrder.addEventListener("submit", (e) => {
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

    const products = Object.values(cartItems).map((product) => {
        //console.log(product.currentProductId);
        return product.currentProductId;
    });

    function sendOrder() {
        const firstNameValue = document.querySelector("#firstName").value;
        console.log(firstNameValue);
        const lastNameValue = document.querySelector("#lastName").value;
        const addressValue = document.querySelector("#address").value;
        const cityValue = document.querySelector("#city").value;
        const emailValue = document.querySelector("#email").value;

        const orderProducts = {
            contact: {
                firstName: firstNameValue,
                lastName: lastNameValue,
                address: addressValue,
                city: cityValue,
                email: emailValue,
            },
            products: products,
        }
        
        fetch('http://localhost:3000/api/products/order', {
            method: "POST",
            body: JSON.stringify(orderProducts),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then (data => {
            //console.log(data.orderId);
            const orderID = data.orderId;
            console.log(orderID);
            window.location = `confirmation.html?orderId=${orderID}`
        })
    }
}else{
    cartFormOrder.style = 'display: none';
    divProduct.innerHTML = '<h2> Votre panier est vide ! </h2>';
}