/**
 * 1) récupère l'url de la page où je suis actuellement
 * 2) créer un nouvel objet url à partir de l'url actuelle
 * 3) à travers le searchParams récupère l'id 
 */
function getOrderId() {
    const urlLoc = window.location.href;
    const url = new URL(urlLoc);
    const urlId = url.searchParams.get("orderId");
    return urlId;
}

const orderId = document.getElementById('orderId');
orderId.innerHTML = getOrderId();

// Vider le localStorage
localStorage.clear();