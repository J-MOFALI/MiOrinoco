let url = "http://localhost:3000/api/cameras/";

fetch(url)
    .then(data => data.json())
    .then(jsonListProduit => {
        console.log(jsonListProduit);
        for (let jsonProduit of jsonListProduit) {
            let produit = new Produit(jsonProduit);
            console.log(produit);
            console.log(produit.name);
            console.log(produit.imageUrl);
            document.querySelector("#container").innerHTML += `<a href="produit.html">
                                                                    <div class="product">
                                                                        <img src="${produit.imageUrl}" alt="${produit.name}">
                                                                        <div class="text">
                                                                            <div class="brand">${produit.name}</div>
                                                                            <div class="price">${(produit.price/1000).toFixed(2)} €</div>
                                                                        </div>
                                                                    </div>    
                                                                </a>`
        }
    })
    .catch(function(error) {
        alert(error)
    })