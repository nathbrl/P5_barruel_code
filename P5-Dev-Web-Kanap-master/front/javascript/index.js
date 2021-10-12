function getAllProducts() {
    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((sofas) => sofas.forEach((sofa, i) => {
            console.log(sofas[i]);
        }));
}
getAllProducts();

