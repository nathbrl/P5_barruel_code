/**
 * 1) récupère l'url de la page où je suis actuellement
 * 2) créer un nouvel objet url à partir de l'url où je suis actuellement
 * 3) à travers le searchParams la fonction récupère l'id 
 * pour chaque produit pour ensuite afficher ses détails propres
 */
function getProductUrl() {
    const urlLoc = window.location.href;
    const url = new URL(urlLoc);
    const urlId = url.searchParams.get("id");
    return urlId;
}
getProductUrl();

const productId = getProductUrl();

let divImg = document.querySelector('.item__img');
let img = document.createElement('img');
divImg.appendChild(img);

let price = document.querySelector('#price');
let description = document.querySelector('#description');
let productName = document.querySelector('#title');
const optionText = document.createElement('option');
const selectOptions = document.querySelector('select').options;
selectOptions.add(optionText)
    optionText.setAttribute('disabled', 'disabled');
    optionText.setAttribute('selected', 'true');
    optionText.textContent = '--SVP choisissez une couleur--';

/**
 * 1) récupère les données de l'APi mais pour un produit uniquement grace à son id unique
 * 2) affiche les détail du produit
 */
fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((sofa) => {
        img.src = sofa.imageUrl;
        img.alt = sofa.altTxt;
        price.innerHTML = sofa.price;
        description.innerHTML = sofa.description;
        productName.innerHTML = sofa.name;
        const arrayColors = sofa.colors;
        arrayColors.forEach((sofa) => {
            const colorOption = document.createElement("option");
            colorOption.setAttribute("value", sofa);
            colorOption.textContent = sofa;
            selectOptions.add(colorOption);
        });
        addProductToCart(sofa);
    });

const cart = JSON.parse(localStorage.getItem('products')) || [];
const addToCartButton = document.querySelector('#addToCart');
const select = document.querySelector('#colors');
const quantity = document.querySelector('#quantity');
let notification = document.querySelector(".item__content__addButton");

/**
 * affiche une notification d'erreur selon l'action de l'utilisateur
 * supprime le message après un certain délais
 */
let deleteNotification = () => {
    let notificationMessage = document.querySelector('#message')
    setTimeout(function () {
        notificationMessage.remove()
    }, 2000)
}

/**
 * ajoute un produit au panier au click sur le bouton 'ajouter au panier'
 * @sofa: article unique qu'on ajoute à partir de la page produit
 * stock le produit ajouté dans le localstorage avec les détails nécessaires
 */
function addProductToCart(sofa) {
    const productImage = sofa.imageUrl;
    const productAltTxt = sofa.altTxt;
    const productName = sofa.name;

    let selectedColor = select.addEventListener('change', (e) => {
        selectedColor = e.target.value;
    });
    let selectedQuantity = quantity.addEventListener('change', (e) => {
        selectedQuantity = parseInt(e.target.value);
    });

    addToCartButton.addEventListener('click', () => {
        if (quantity.value <= 0 || quantity.value > 100 || select.value == '' ) {
            notification.insertAdjacentHTML('afterend', '<span id="message" style="text-align: center; font-weight: bold;"><br>Merci de saisir une quantité valide (entre 1-100) ainsi qu\'une couleur</span>');
            deleteNotification();
        }else {
            let currentProduct = {
                currentProductId: productId,
                productSelectedColor: selectedColor,
                productSelectedQuantity: selectedQuantity,
                productName: productName,
                productImage: productImage,
                altTxt: productAltTxt,
            }
            let sameItem = cart.find(item => item.productSelectedColor === selectedColor
                && item.currentProductId === productId);
    
            if (sameItem) {
                sameItem.productSelectedQuantity += selectedQuantity;
                notification.insertAdjacentHTML('afterend', '<span id="message" style="text-align: center; font-weight: bold;"><br>La quantité a bien été modifiée</span>');
                deleteNotification();
            } else {
                currentProduct.productSelectedQuantity = selectedQuantity;
                cart.push(currentProduct);
                notification.insertAdjacentHTML('afterend', '<span id="message" style="text-align: center; font-weight: bold;"><br>Le produit a bien été ajouté au panier !</span>');
                deleteNotification();
            }
            localStorage.setItem('products', JSON.stringify(cart));
        }
        
    });
}