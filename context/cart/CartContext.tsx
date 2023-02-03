import { ICartProduct } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
    cart: ICartProduct [];
    //metodos
    addProductToCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);