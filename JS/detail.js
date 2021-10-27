/**
 * Affichage de l'Id et de la page détail
 */

let id = localStorage.getItem("info");
let url = "http://localhost:3000/api/cameras/" + (id);


//Sélection de l'Id du formulaire "lentilles" et Mettre le choix de l'utilisateur dans une variable

let choixForm;

function changeChoice(e) {
    const idForm = document.querySelector("#choice");
    choixForm = e.srcElement.value;
}

//Sélection et de la quantité
let numberHowMany;

function changeQuantity(e) {
    const howMany = document.querySelector("#how_many");
    numberHowMany = e.srcElement.value;
}

// Cette fonction permet d'afficher correctement les contenus du produit en utilisant les données du tableau
let moreDetail = (data) => {
    let selection = "";
    //la boucle qui permet de récupérer les options
    for (keys of data.lenses) {
        selection += '<option value="' + keys + '">' + keys + '</option>';
    }
    document.querySelector("#container1").innerHTML += `<div class="picture">
                                                            <img src="${data.imageUrl}" alt="${data.name}" >
                                                        </div>
                                                        <div class="content">
                                                            <div id="description">${data.description}</div>
                                                            <div class="sub-content">    
                                                                <div class="brand"><label for="brand" value="${data.name}">Marque :  </label>&nbsp;<input type="text" name="brand" id="brand" value="${data.name}"></div>
                                                                <div class="price"><label for="price">Prix :  </label>&nbsp;<input type="number" name="price" id="price" value="${(data.price/1000).toFixed(2)}">€</div>
                                                                <form>
                                                                    <label for="choice">Choisissez vos lentilles :</label>
                                                                    <select name="choice" onchange="changeChoice(event)" id="choice" required>
                                                                        <option  value="default">Veuillez choisir vos lentilles !</option>
                                                                        ${selection}
                                                                    </select>
                                                                </form>
                                                                <div class="quantity">
                                                                    <label for="how_many">Quantité :</label>
                                                                    <input type="number" id="how_many" name="how_many" min="1" onchange="changeQuantity(event)">
                                                                    <small id="Ici"></small> 
                                                                </div>
                                                            </div>
                                                            <a class="link_to" href="panier.html"><button id="send" type="submit" name="send">Ajouter l'article au panier</button></a>
                                                        </div>`

    //Gestion du panier
    //Récupérer les données envoyés par l'utilisateur et envoie du panier

    //Sélection du prix et de la marque
    const price = document.querySelector("#price");
    const costPrice = price.value;
    console.log(costPrice);

    const brand = document.querySelector("#brand");
    const brandName = brand.value;
    console.log(brandName);

    //Sélection du bouton ajouter au panier
    const btn_send = document.querySelector("#send");
    console.log(btn_send);

    //Ecouter le bouton et envoyé le panier

    //Création de la fenêtre Pop Up confirmation
    const popupConfirmation = () => {
        if (window.confirm(`La caméra ${brand.value} avec les lentilles ${choixForm} a été rajouter au panier.  Cliquez sur OK pour consulter le panier ou ANNULER pour revenir à l'accueil`)) {
            window.location.href = "panier.html";
        } else {
            window.location.href = "../index.html";
        }
    }

    btn_send.addEventListener("click", (e) => {
        e.preventDefault();

        let listName = [];
        let products = [];

        console.log(products);

        if (localStorage.getItem("invoice")) {
            listName = JSON.parse(localStorage.getItem("invoice"));
            products = JSON.parse;
        }

        console.log(e)
            //Récupération des valeurs du formulaire
        listName.push({
            name: brand.value,
            choice: choixForm,
            quantity: numberHowMany,
            cost: price.value,
            total: numberHowMany * price.value,
            _id: id
        })

        const listStringify = JSON.stringify(listName);
        const eltsInvoice = localStorage.setItem("invoice", listStringify);

        popupConfirmation();

        //ajout
        if (!numberHowMany) {
            return false;
        }
    })

    //Pour expliquer au visiteur qu'il doit saisir une quantité supérieur à zéro
    document.querySelector("#how_many").addEventListener('change', function() {
        validNumberHowMany(this);
    });

    const validNumberHowMany = function(inputNumberHowMany) {
        //création de la reg exp du prénom
        numberHowManyRegExp = new RegExp("^([1-9]{1}|[1-9]{1}[0-99]{1,})$");

        testNumberHowMany = numberHowManyRegExp.test(inputNumberHowMany.value);
        console.log(testNumberHowMany);

        let small = document.querySelector("#how_many");
        small = inputNumberHowMany.nextElementSibling;

        if (testNumberHowMany == true) {
            small.innerHTML = "Valide";
            document.querySelector("#Ici").style.color = '#00561B';
        } else {
            small.innerHTML = "Saisissez une quantité supérieure à zéro.";
            document.querySelector("#Ici").style.color = '#f00020';
        }
    }
}

fetch(url)
    .then(data => data.json())
    .then(moreDetail)
    .catch((error) => {
        let container = document.getElementById("container1");
        container.innerHTML +=
            "L'affichage des produits n'est pas possible. Réessayer plus tard ? <br>Si le problème persiste, contactez-nous.";
        container.style.textAlign = "center";
        container.style.padding = "30vh 0";
    })