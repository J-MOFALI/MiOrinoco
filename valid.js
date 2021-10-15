//Récupérer la réponse du Back
let data = localStorage.getItem("contenu");
console.log(data);

let dataGet = JSON.parse(data);
console.log(dataGet);

let total = localStorage.getItem("total");
let totalGet = JSON.parse(total);
console.log(total);

//Définition de la taille du main
let main = document.querySelector(".main_valid");
main.style.height = "100vh";

main.innerHTML += `<div class="dataBack">
                        <div class="message">
                            Bienvenue Monsieur ${dataGet.contact.firstName} ${dataGet.contact.lastName} Votre commande à bien été pris en compte
                        </div>
                        <div class="message">
                            Le montant total est de ${totalGet} €
                        </div>
                        <div class="message">
                            Votre numéro de commande est ${dataGet.orderId}
                        </div>
                    </div>`