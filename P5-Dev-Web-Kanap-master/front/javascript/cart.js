function getAllProducts() {
    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((sofa) => {
            //console.log(sofa);
            //console.log(i);
            productButtonId(sofa);
        });
}
getAllProducts();

function getProductUrl() {
    const urlLoc = window.location.href;
    //console.log(urlLoc);
    const url = new URL(urlLoc);
    //console.log(url);
    const urlId = url.searchParams.get("id");
    return urlId;
}
getProductUrl();

function productButtonId (sofa) {
    const addToCartButton = document.querySelectorAll('#addToCart');
    //console.log(addToCartButton);
    addToCartButton.forEach((button) => {
        button.addEventListener('click', () => {
            const productId = getProductUrl();
            console.log(productId);
            const getProduct = sofa.filter(sofa => sofa._id == productId);
            console.log(getProduct);
        });
    });
}

