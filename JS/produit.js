/**
 * Représentation du format d'un produit ainsi que du format du prix
 */

class Produit {
    constructor(jsonProduit) {
        jsonProduit && Object.assign(this, jsonProduit);
    }
}