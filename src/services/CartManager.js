import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import fs from 'fs/promises'

let cid = 1
function generateId(){
    return cid ++
}

export class CartManager{
    #path
    constructor(path){
        this.#path=path
    }


    async getCart(){
        const carts = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        return carts;
    }

    async getCartById(cid){
        const carts = await this.getCart()
        const cart = carts.find(c => c.cid === cid)
        if(!cart) {throw new Error(`Cart with ID ${cid} does not exist`)
        } return cart
    }

    async addCart(dataCart){
        const carts = await this.getCart()
        dataCart.cid = generateId()
        const cart = new Cart(dataCart)
        carts.push(cart);
        await fs.writeFile(this.#path, JSON.stringify(carts, null, 2))
        return cart
    }

    async addProduct(dataProduct){
        const carts = await this.getCart()
        const product = new Product(dataProduct)
        carts.push(product)
        await fs.writeFile(this.#path, JSON.stringify(carts, null, 2))
        return product
        
    }  

    async updateCart(cid, updatedFields) {
        try {
            const carts = await this.getCart();
            const cartIndex = carts.findIndex((c) => c.cid === cid);

            if (cartIndex === -1) {
                throw new Error(`Cart with id ${cid} not found`);
            }

            const existingCart = carts[cartIndex];

            const updatedCart = {
                ...existingCart,
                ...updatedFields,
            };

            carts[cartIndex] = updatedCart;

            await fs.writeFile(this.#path, JSON.stringify(carts, null, 2));

            return updatedCart;
        } catch (error) {
            console.log('Error updating the cart', error);
            throw error;
        }
    }
}

export const cm = new CartManager('./db/carts.json')
