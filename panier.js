//Récupération des composants de la facture
let panier = localStorage.getItem("invoice");

let panier_js = JSON.parse(panier);

console.log(panier_js);

let testFirstname = "";
console.log(testFirstname);
let testLaststname = "";
let testAdress = "";
let testCity = "";
let testEmail = "";

let firststnameRegExp = "";
console.log(firststnameRegExp);
let laststnameRegExp = "";
let adressRegExp = "";
let cityRegExp = "";
let emailRegExp = "";


//Sélection de la div qui va contenir le code html
const panierDynamique = document.querySelector("#panier");


//Si le panier est vide afficher le panier est vide
if (panier_js === null || panier_js == 0) {
    const panierVide = `<div class="panier-vide"><div>Ce panier est vide. Veuillez sélectionner vos articles</div></div>`
    panierDynamique.innerHTML += panierVide;
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

form.firstname.addEventListener('change', function() {
    validFirstName(this);
});

const validFirstName = function(inputFirstname) {
    //création de la reg exp du prénom
    firstnameRegExp = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);

    testFirstname = firstnameRegExp.test(inputFirstname.value);
    console.log(testFirstname);

    let small1 = document.querySelector("#firstsmall");
    small1 = inputFirstname.nextElementSibling;

    if (testFirstname == true) {
        small1.innerHTML = "Valide";
        document.querySelector("#small_firstname").style.color = '#00561B';
    } else {
        small1.innerHTML = "Invalide, veuillez saisir une identité valide avec des lettres uniquement.";
        document.querySelector("#small_firstname").style.color = '#f00020';
    }
}

form.lastname.addEventListener('change', function() {
    validLastName(this);
});

const validLastName = function(inputLastname) {
    //création de la reg exp du prénom
    lastnameRegExp = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);

    testLaststname = lastnameRegExp.test(inputLastname.value);
    console.log(testLaststname);

    let small2 = document.querySelector("#lastsmall");
    small2 = inputLastname.nextElementSibling;

    if (testLaststname == true) {
        small2.innerHTML = "Valide";
        document.querySelector("#small_lastname").style.color = '#00561B';
    } else {
        small2.innerHTML = "Invalide, veuillez saisir une identité valide avec des lettres uniquement.";
        document.querySelector("#small_lastname").style.color = '#f00020';
    }
}

//Adresse
form.adress.addEventListener('change', function() {
    validAdress(this);
});

const validAdress = function(inputAdress) {
    //création de la reg exp du prénom
    adressRegExp = new RegExp("([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)");

    testAdress = adressRegExp.test(inputAdress.value);
    console.log(adressRegExp);

    let small3 = document.querySelector("#adresssmall");
    small3 = inputAdress.nextElementSibling;

    if (testAdress == true) {
        small3.innerHTML = "Valide";
        document.querySelector("#small_adress").style.color = '#00561B';
    } else {
        small3.innerHTML = "Invalide, veuillez saisir une adresse correcte.";
        document.querySelector("#small_adress").style.color = '#f00020';
    }
}

// Ville
form.city.addEventListener('change', function() {
    validCity(this);
});

const validCity = function(inputCity) {
    //création de la reg exp du prénom
    cityRegExp = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);

    testCity = cityRegExp.test(inputCity.value);
    console.log(cityRegExp);

    let small4 = document.querySelector("#cityssmall");
    small4 = inputCity.nextElementSibling;

    if (testCity == true) {
        small4.innerHTML = "Valide"
        document.querySelector("#small_city").style.color = '#00561B';
    } else {
        small4.innerHTML = "Invalide, veuillez saisir un nom de ville correct.";
        document.querySelector("#small_city").style.color = '#f00020';
    }
}

//Email
form.email.addEventListener('change', function() {
    validEmail(this);
});

const validEmail = function(inputEmail) {
    //création de la reg exp du prénom
    emailRegExp = new RegExp("^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$");

    testEmail = emailRegExp.test(inputEmail.value);
    console.log(emailRegExp);

    let small5 = document.querySelector("#emailsmall");
    small5 = inputEmail.nextElementSibling;

    if (testEmail == true) {
        small5.innerHTML = "Valide";
        document.querySelector("#small_email").style.color = '#00561B';
    } else {
        small5.innerHTML = "Invalide, veuillez un mail correct.";
        document.querySelector("#small_email").style.color = '#f00020';
    }
}

//Récupération des éléments du formulaire
const btnSendForm = document.querySelector("#sendto");

btnSendForm.addEventListener("click", (e) => {
    e.preventDefault;
    console.log('firstname:' + firstname, 'lastname:' + lastname, 'adress:' + adress, 'city:' + city, 'email:' + email)

    if (testFirstname != true || testLaststname != true || testAdress != true || testCity != true || testEmail != true) {
        return;
    }

    //Charger les différentes valeurs
    const contact = {
        firstName: document.querySelector("#firstname").value,
        lastName: document.querySelector("#lastname").value,
        address: document.querySelector("#adress").value,
        city: document.querySelector("#city").value,
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

    //Voir le résultat du serveur dans le console
    finalSend.then(async(response) => {
        try {
            console.log("response");
            console.log(response);
            const contenu = await response.json();
            console.log("contenu");
            console.log(contenu);
            let contain = JSON.stringify(contenu);
            localStorage.setItem("contenu", contain);
        } catch (e) {
            console.log(e);
        }
    })
})