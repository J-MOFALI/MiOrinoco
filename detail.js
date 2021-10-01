/**
 * Afficher des information et customisation du produit
 */

let id = localStorage.getItem("info");

console.log(id);

let url = "http://localhost:3000/api/cameras/" + (id);


let moreDetail = (data) => {
    console.log(data);
    console.log(data.imageUrl);
    document.querySelector("#container1").innerHTML += `<div class="picture">
                                                            <img src="${data.imageUrl}" alt="${data.name}" >
                                                        </div>
                                                        <div class="content">
                                                            <div class="description">${data.description}</div>
                                                            <div class="brand"><label for="brand">Marque :  </label>  ${data.name}</div>
                                                            <div class="price"><label for="price">Prix :  </label>  ${(data.price/1000).toFixed(2)} €</div>
                                                            <div class="lenses">
                                                                <label for="pet-select">Choisissez vos lentilles :</label>
                                                                <select name="pets" id="pet-select">
                                                                    <option value="">--Please choose an option--</option>
                                                                    <option value="dog">${data.lenses[0]}</option>
                                                                    <option value="dog">${data.lenses[1]}</option>
                                                                    <option value="dog">${data.lenses[2]}</option>
                                                                </select>
                                                            </div>
                                                            <div class="quantity"
                                                                <label for="many">Quantité :</label>
                                                                <input type="number" id="tentacles" name="many" min="1"> 
                                                            </div>
                                                            <input type="submit" value="Enregistrer">
                                                        </div>`
}


fetch(url)
    .then(data => data.json())
    .then(moreDetail)
    .catch(function(error) {
        alert(error)
    })