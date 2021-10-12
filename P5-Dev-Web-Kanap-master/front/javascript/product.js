function getProductUrl() {
    const urlLoc = window.location.href;
    console.log(urlLoc);
    const url = new URL(urlLoc);
    //console.log(url);
    const urlId = url.searchParams.get("id");
    console.log(urlId);
}
getProductUrl();

function getAllProducts() {
    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((sofas) =>
        sofas.forEach((sofa) => {
            console.log(sofa);
            //console.log(i);
        })
        );
}
getAllProducts();
