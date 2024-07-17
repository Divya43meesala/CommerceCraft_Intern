const initialState = {
  cart: [], // Initialize cart as an empty array
  total_item: 0,
  total_price: 0,
  // other state properties
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { id, color, amount, product } = action.payload;
      const existingProduct = (state.cart || []).find(
        (curItem) => curItem.id === id + color
      );

      if (existingProduct) {
        const updatedProduct = state.cart.map((curElem) => {
          if (curElem.id === id + color) {
            let newAmount = curElem.amount + amount;
            if (newAmount >= curElem.max) {
              newAmount = curElem.max;
            }
            return { ...curElem, amount: newAmount };
          }
          return curElem;
        });
        return { ...state, cart: updatedProduct };
      }

      const cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };

      return { ...state, cart: [...(state.cart || []), cartProduct] };
    }

    case "SET_DECREMENT": {
      const updatedProduct = (state.cart || []).map((curElem) => {
        if (curElem.id === action.payload) {
          let decAmount = curElem.amount - 1;
          if (decAmount <= 1) {
            decAmount = 1;
          }
          return { ...curElem, amount: decAmount };
        }
        return curElem;
      });
      return { ...state, cart: updatedProduct };
    }

    case "SET_INCREMENT": {
      const updatedProduct = (state.cart || []).map((curElem) => {
        if (curElem.id === action.payload) {
          let incAmount = curElem.amount + 1;
          if (incAmount >= curElem.max) {
            incAmount = curElem.max;
          }
          return { ...curElem, amount: incAmount };
        }
        return curElem;
      });
      return { ...state, cart: updatedProduct };
    }

    case "REMOVE_ITEM": {
      const updatedCart = (state.cart || []).filter(
        (curItem) => curItem.id !== action.payload
      );
      return { ...state, cart: updatedCart };
    }

    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }

    case "CART_ITEM_PRICE_TOTAL": {
      const { total_item, total_price } = (state.cart || []).reduce(
        (accum, curElem) => {
          const { price, amount } = curElem;
          accum.total_item += amount;
          accum.total_price += price * amount;
          return accum;
        },
        { total_item: 0, total_price: 0 }
      );
      return { ...state, total_item, total_price };
    }

    default:
      return state;
  }
};

export default cartReducer;
