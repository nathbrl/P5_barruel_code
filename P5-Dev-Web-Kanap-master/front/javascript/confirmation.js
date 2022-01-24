function getOrderId() {
    const urlLoc = window.location.href;
    const url = new URL(urlLoc);
    const urlId = url.searchParams.get("orderId");
    return urlId;
}

const orderId = document.getElementById('orderId');
orderId.innerHTML = getOrderId();

localStorage.clear();