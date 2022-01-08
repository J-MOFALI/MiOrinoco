/**
 * Représentation du format d'un produit
 */

class Produit {
    constructor(jsonProduit) {
        jsonProduit && Object.assign(this, jsonProduit);
    }
}