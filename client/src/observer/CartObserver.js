import Observer from "./Observer";

class CartObserver extends Observer {
  constructor(setStateFunction) {
    super();
    this.setState = setStateFunction;
  }

  update(cart) {
    this.setState(cart);
  }
}

export default CartObserver;
