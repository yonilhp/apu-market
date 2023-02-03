import { ICartProduct } from '@/interfaces';
import { CartState } from './CartProvider';




type CartActionType = 

   | { type: '[cart] - LoadCart from cookies | storage',payload: ICartProduct[] }
   | { type: '[cart] - AddProduct',payload: ICartProduct[] }


export const CartReducer = ( state: CartState, action: CartActionType ): CartState => {

   switch (action.type) {
      case '[cart] - LoadCart from cookies | storage':
         return {
            ...state,
        }

        case '[cart] - AddProduct':
         return {
            ...state,
         }

       default:
          return state;
   }

}