//Récupération des composants de la facture
let panier = localStorage.getItem("invoice");

let panier_js = JSON.parse(panier);

let firstName = "";
let lastName = "";
let address = "";
let city = "";
let postalCode = "";
let email = "";

let testFirstName;
let testLaststName;
let testAddress;
let testCity;
let testPostalCode;
let testEmail;

let firstNameRegExp = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);
let lastNameRegExp = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);
let addressRegExp = new RegExp(/^[A-Za-z0-9\s]{5,50}$/);
let cityRegExp = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);
let postalCodeRegExp = new RegExp("^[0-9]{5}$");
let emailRegExp = new RegExp("^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$");


//Sélection de la div qui va contenir le code html
const panierDynamique = document.querySelector("#panier");


//Si le panier est vide afficher le panier est vide
if (panier_js === null || panier_js == 0) {
    const panierVide = `<div class="panier-vide"><div>Ce panier est vide. Veuillez sélectionner vos articles !!!</div></div>`
    panierDynamique.innerHTML += panierVide;
    panierDynamique.style.color = '#f00020';
    panierDynamique.style.margin = 'auto';
} else {
    //Si le panier n'est pas vide : afficher les produits qui sont dans le local storage            ss
    for (j = 0; j < panier_js.length; j++) {
        console.log("nombre d\'élément dans le panier" + panier_js.length);
        panierDynamique.innerHTML += `<div class="content1">
                                            <div id="brand" class="div">
                                                <label for="brand">Marque :  </label>
                                                <input type="text" name="brand" id="brand" value="${panier_js[j].name}">
                                            </div>
                                            <div id="cost" class="div">
                                                <label for="cost">Prix :  </label>
                                                <input type="text" name="cost" id="cost" value="${panier_js[j].cost}&nbsp;€">
                                            </div>
                                            <div id="quantity" class="div">
                                                <label for="brand">Quantité :  </label>
                                                <input type="text" name="brand" id="brand" value="${panier_js[j].quantity}">
                                            </div>
                                            <div id="total" class="div">
                                                <label for="total">Total :  </label>
                                                <input type="text" name="total" id="total" value="${(panier_js[j].total).toFixed(2)}&nbsp;€">
                                            </div>
                                            <div class="lense div">
                                                <label for="lense">Lentilles :  </label>
                                                <input type="text" name="lense" id="lense" value="${panier_js[j].choice}">
                                            </div>
                                            <button class="btn_produit">Supprimer</button>
                                        </div>`
    }
    //Sélectionner le bouton supprimer
    let supprimer = document.querySelectorAll(".btn_produit");
    console.log(supprimer);

    for (let m = 0; m < supprimer.length; m++) {
        supprimer[m].addEventListener("click", (e) => {
            e.preventDefault();
            console.log(panier_js)

            //sélectionner l'id du produit qui va être supprimer
            let nameChoosenCanceled = panier_js[m].name;
            console.log(nameChoosenCanceled);

            //Supprimer avec la méthode filter
            panier_jsActual = panier_js.filter(elt => elt.name !== nameChoosenCanceled);

            console.log(panier_jsActual)

            //Envoie de la variable dans le localstorage
            localStorage.setItem("invoice", JSON.stringify(panier_jsActual));

            //Rechargement de la page
            alert("Cette marque de produist a été supprimé du panier !");
            window.location.href = "panier.html";
        })
    }

    //Insérer un bouton pour supprimer tout le panier
    let btnCancelledAll_HTML = `<button class="btnCancelledAll"> Vider le panier</button>`;

    panierDynamique.insertAdjacentHTML("beforeend", btnCancelledAll_HTML);

    const btnCancelledAll = document.querySelector(".btnCancelledAll");

    //Suppression de la clé invoice pour vider le panier
    btnCancelledAll.addEventListener("click", (e) => {
        e.preventDefault;
        //Utilisation de removeItem pour supprimer le panier
        localStorage.removeItem("invoice");
        alert("Le panier a été vidé");
        window.location.href = "panier.html";
    })

    //Calcul du Montant Total du panier

    //Récupération des élément à additionner
    let globalTotalInvoice = [];
    console.log(globalTotalInvoice)

    //Prendre les prix du panier pour afficher dans le tableau
    for (let n = 0; n < panier_js.length; n++) {
        let everyTotalInvoice = panier_js[n].total;

        //Affichage dans le tablea
        globalTotalInvoice.push(everyTotalInvoice);

    }



    //Calcul du Prix qu'il y a dans le tableau
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const globalTotal = globalTotalInvoice.reduce(reducer, 0);
    console.log(globalTotal);

    //Insertion de la la div inhérente
    let totalInvoice_HTML = `<div class="totalInvoice"> Facture total à payer : ${(globalTotal).toFixed(2)} € </div>`;
    panierDynamique.insertAdjacentHTML("beforeend", totalInvoice_HTML);
    const totalInvoice = document.querySelector(".totalInvoice");
    let total = localStorage.setItem("total", globalTotal);
    let totalAll = JSON.stringify(total);
}

//Traitement du formulaire

let form = document.querySelector("#form");

//La validation des éléments du form avec une regExp

// Les noms

form.firstName.addEventListener('change', function() {
    validFirstName(this);
});

const validFirstName = function(inputFirstName) {

    testFirstName = firstNameRegExp.test(inputFirstName.value);

    let small1 = inputFirstName.nextElementSibling;

    if (testFirstName == true) {
        small1.innerHTML = "Valide";
        document.querySelector("#small_firstName").style.color = '#00561B';
    } else {
        small1.innerHTML = "Invalide, veuillez saisir une identité valide avec des lettres uniquement.";
        document.querySelector("#small_firstName").style.color = '#f00020';
    }
}

form.lastName.addEventListener('change', function() {
    validLastName(this);
});

const validLastName = function(inputLastName) {

    testLastName = lastNameRegExp.test(inputLastName.value);

    let small2 = inputLastName.nextElementSibling;

    if (testLastName == true) {
        small2.innerHTML = "Valide";
        document.querySelector("#small_lastName").style.color = '#00561B';
    } else {
        small2.innerHTML = "Invalide, veuillez saisir une identité valide avec des lettres uniquement.";
        document.querySelector("#small_lastName").style.color = '#f00020';
    }
}

//Adresse
form.address.addEventListener('change', function() {
    validAdress(this);
});

const validAdress = function(inputAddress) {

    testAddress = addressRegExp.test(inputAddress.value);

    let small3 = inputAddress.nextElementSibling;

    if (testAddress == true) {
        small3.innerHTML = "Valide";
        document.querySelector("#small_address").style.color = '#00561B';
    } else {
        small3.innerHTML = "Invalide, saisissez une adresse sans accent. ";
        document.querySelector("#small_address").style.color = '#f00020';
    }
}

// Ville
form.city.addEventListener('change', function() {
    validCity(this);
});

const validCity = function(inputCity) {

    testCity = cityRegExp.test(inputCity.value);

    let small4 = inputCity.nextElementSibling;

    if (testCity == true) {
        small4.innerHTML = "Valide"
        document.querySelector("#small_city").style.color = '#00561B';
    } else {
        small4.innerHTML = "Invalide, veuillez saisir un nom de ville correct.";
        document.querySelector("#small_city").style.color = '#f00020';
    }
}

// Code Postal
form.postalCode.addEventListener('change', function() {
    validPostalCode(this);
});

const validPostalCode = function(inputPostalCode) {

    testPostalCode = postalCodeRegExp.test(inputPostalCode.value);

    let small5 = inputPostalCode.nextElementSibling;

    if (testPostalCode == true) {
        small5.innerHTML = "Valide"
        document.querySelector("#small_postalCode").style.color = '#00561B';
    } else {
        small5.innerHTML = "Invalide, veuillez saisir un code postal correct.";
        document.querySelector("#small_postalCode").style.color = '#f00020';
    }
}

//Email
form.email.addEventListener('change', function() {
    validEmail(this);
});

const validEmail = function(inputEmail) {

    testEmail = emailRegExp.test(inputEmail.value);

    let small6 = inputEmail.nextElementSibling;

    if (testEmail == true) {
        small6.innerHTML = "Valide";
        document.querySelector("#small_email").style.color = '#00561B';
    } else {
        small6.innerHTML = "Invalide, veuillez un mail correct.";
        document.querySelector("#small_email").style.color = '#f00020';
    }
}

//Récupération des éléments du formulaire
const btnSendForm = document.querySelector("#sendTo");

btnSendForm.addEventListener("click", (e) => {
    e.preventDefault;

    if (!testFirstName || !testLastName || !testAddress || !testCity || !testPostalCode || !testEmail || !panier_js.length) {
        return;
    }
    //Charger les différentes valeurs
    const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        postalCode: document.querySelector("#postalCode").value,
        email: document.querySelector("#email").value
    }

    localStorage.setItem("formulaire", JSON.stringify(contact));

    console.log(contact);
    const products = []

    for (let product of panier_js) {
        products.push(product._id)
    }
    //Récupérer ces valeurs
    console.log(products)
    const sendToBackend = {
        contact,
        products
    }
    console.log(sendToBackend);

    //Envoie vers le Backend
    let finalSend = fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        body: JSON.stringify(sendToBackend),
        headers: {
            "content-type": "application/json; charset=UTF-8"
        }
    })

    ///Voir le résultat du serveur dans le console
    finalSend.then(async(response) => {
        try {
            const contenu = await response.json();
            let contain = JSON.stringify(contenu);
            localStorage.setItem("contenu", contain);
            document.location.href = "valid.html";
        } catch (e) {
            console.log(e);
        }
    })
})