import monitor from "./imgs/monitor.jpg";
import headphone from "./imgs/headphones.jpg";
import microwave from "./imgs/microwave.jpg";
import shoes from "./imgs/shoes.jpg";
import { useState } from "react";

const products = [
  {
    id: 1,
    title: "Monitor",
    price: 10000,
    image: monitor,
  },
  {
    id: 2,
    title: "Headphones",
    price: 2000,
    image: headphone,
  },
  {
    id: 3,
    title: "Microwave",
    price: 12000,
    image: microwave,
  },
  {
    id: 4,
    title: "Shoes",
    price: 200,
    image: shoes,
  },
];
function App() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(product) {
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    // Check if product already in cart
    if (itemIndex !== -1) {
      // if already max quantity return
      if (cart[itemIndex].quantity === 4) return;
      // - yes
      // -- update quantity
      setCart((cart) =>
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // - no
      // -- convert product to a cart item
      const item = { ...product, quantity: 1 };
      // -- add to cart
      setCart((cart) => [...cart, item]);
    }
  }

  function handleChangeQuantity(id, quantity) {
    // update quantity
    setCart((cart) =>
      cart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  }

  function handleDeleteFromCart(id) {
    setCart((cart) => cart.filter((item) => item.id !== id));
  }

  return (
    <div className="App">
      <Nav
        cart={cart}
        onChangeQuantity={handleChangeQuantity}
        onDeleteItem={handleDeleteFromCart}
      />
      <ProductList onAddToCart={handleAddToCart} />
    </div>
  );
}

function Nav({ cart, onChangeQuantity, onDeleteItem }) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav className="nav">
      <h3>Amyzon</h3>
      <div className="cart__container">
        <span className="cart__toggler">
          Cart {cart.length > 0 && <span>({totalItems})</span>}
        </span>
        <Cart
          cart={cart}
          totalItems={totalItems}
          onChangeQuantity={onChangeQuantity}
          onDeleteItem={onDeleteItem}
        />
      </div>
    </nav>
  );
}

function Cart({ cart, totalItems, onChangeQuantity, onDeleteItem }) {
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="cart">
      {cart.length ? (
        <>
          <ul className="list cart__list">
            {cart.map((item) => (
              <CartItem
                key={`cart-item-${item.id}`}
                item={item}
                onChangeQuantity={onChangeQuantity}
                onDeleteItem={onDeleteItem}
              />
            ))}
          </ul>
          <div className="cart__total">
            SubTotal({totalItems} items): Rs. {totalPrice}
          </div>
        </>
      ) : (
        <p>No items</p>
      )}
    </div>
  );
}

function CartItem({ item, onChangeQuantity, onDeleteItem }) {
  return (
    <li className="item">
      <img src={item.image} alt={item.title} />
      <div className="item__data">
        <h4>{item.title}</h4>
        <div className="item__actions">
          <label>Qty</label>
          <select
            value={item.quantity}
            onChange={(e) => onChangeQuantity(item.id, Number(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button onClick={() => onDeleteItem(item.id)}>Delete</button>
        </div>
      </div>
      <div className="item__price">
        <span>Rs. {item.price}</span>
      </div>
    </li>
  );
}

function ProductList({ onAddToCart }) {
  const productsList = products;
  return (
    <ul className="list product__list">
      {productsList.map((product) => (
        <Product
          product={product}
          key={`product-item-${product.id}`}
          onAddToCart={onAddToCart}
        />
      ))}
    </ul>
  );
}

function Product({ product, onAddToCart }) {
  return (
    <li className="product">
      <img src={product.image} alt={product.title} />
      <div className="product__info">
        <h3 className="product__name">{product.title}</h3>
        <div className="product__price">Rs. {product.price}</div>
        <button
          className="product__add-to-cart"
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </li>
  );
}

export default App;
