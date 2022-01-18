function getOrderId() {
    const urlLoc = window.location.href;
    console.log(urlLoc);
    const url = new URL(urlLoc);
    console.log(url);
    const urlId = url.searchParams.get("orderId");
    console.log(urlId);
    return urlId;
}

const orderId = document.getElementById('orderId');
console.log(orderId);
orderId.innerHTML = getOrderId();

localStorage.clear();