let url = "http://localhost:3000/api/cameras/";

const enregistrerId = function(id) {
    localStorage.setItem("info", id);
};

let display = (jsonListProduit) => {
    console.log(jsonListProduit);
    for (let jsonProduit of jsonListProduit) {
        let produit = new Produit(jsonProduit);
        const idProduit = "produit-" + produit._id;
        document.querySelector("#container").innerHTML += `<a href="detail.html" id="${idProduit}" onclick="enregistrerId('${produit._id}')">                                                 
                                                                    <div class="product">
                                                                        <img src="${produit.imageUrl}" alt="${produit.name}">
                                                                        <div class="text">
                                                                            <div class="brand">${produit.name}</div>
                                                                            <div class="price">${(produit.price/1000).toFixed(2)} €</div>
                                                                        </div>
                                                                    </div>    
                                                            </a>`;
    }
};

fetch(url)
    .then(data => data.json())
    .then(display)
    .catch((error) => {
        let container = document.querySelector("#container");
        container.innerHTML +=
            "L'affichage des produits n'est pas possible. Réessayer plus tard ? <br>Si le problème persiste, contactez-nous.";
        container.style.textAlign = "center";
        container.style.padding = "30vh 0";
    })