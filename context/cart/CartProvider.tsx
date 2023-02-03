import { ICartProduct } from '@/interfaces';
import {FC, useReducer} from 'react';
import {CartContext, CartReducer} from './';

export interface CartState {
    cart: ICartProduct [];
}

const CART_INITIAL_STATE: CartState = {
    cart:  []
}

export function CartProvider(children: { children: any; }) {
    const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);
    const addProductToCart = (product: ICartProduct) => {}
    return (
        <CartContext.Provider value={{
            ...state,
            //metodos
            addProductToCart,
        }}>
            {children.children}
        </CartContext.Provider>
    );
}