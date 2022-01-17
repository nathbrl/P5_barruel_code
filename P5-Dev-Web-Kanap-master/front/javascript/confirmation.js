console.log('ok');

function getOrderId() {
    const urlLoc = window.location.href;
    console.log(urlLoc);
    const url = new URL(urlLoc);
    console.log(url);
    const urlId = url.searchParams.get("id");
    console.log(urlId);
    return urlId;
}
getOrderId();

const orderId = document.getElementById('#orderId');
console.log(orderId);
//orderId.innerHTML = getOrderId();

//Clearing LocalStorage items 
//localStorage.clear();