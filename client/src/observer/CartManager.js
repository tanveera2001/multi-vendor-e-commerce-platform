import Subject from "./Subject";
import api from "../api/api";

class CartManager extends Subject {
  constructor() {
    super();
    this.cart = [];
  }

  getCart() {
    return this.cart;
  }

  setCart(cartData) {
    this.cart = cartData;
    this.notify(this.cart);
  }

  // 🔥 Load cart (auth-based)
  async loadCart(userId, token) {
    try {
      const { data } = await api.get(
        `/home/product/get-card-product/${userId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      this.setCart(data.card_products);
    } catch (err) {
      console.log(err);
    }
  }

  // 🔥 Add to cart
  async addToCart(info) {
    try {
      const { data } = await api.post("/home/product/add-to-card", info);

      if (data.cart_products) {
        this.setCart(data.cart_products);

        // ✅ success alert
        alert("Product added to cart successfully");
      }
    } catch (err) {
      // ❌ duplicate error alert
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Something went wrong");
      }
    }
  }
}

const cartManager = new CartManager();
export default cartManager;
