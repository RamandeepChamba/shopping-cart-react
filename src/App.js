import monitor from "./imgs/monitor.jpg";
import headphone from "./imgs/headphones.jpg";
import microwave from "./imgs/microwave.jpg";
import shoes from "./imgs/shoes.jpg";

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
  return (
    <div className="App">
      <Nav />
      <ProductList />
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <h3>Amyzon</h3>
      <div className="cart__container">
        <span className="cart__toggler">
          Cart <span>(2)</span>
        </span>
        <Cart />
      </div>
    </nav>
  );
}

function Cart() {
  const cartItems = [
    {
      id: 1,
      title: "Monitor",
      price: 10000,
      image: monitor,
      quantity: 1,
    },
    {
      id: 2,
      title: "Headphones",
      price: 2000,
      image: headphone,
      quantity: 2,
    },
  ];

  return (
    <div className="cart">
      {/* Cart items */}
      <ul className="list cart__list">
        {cartItems.map((item) => (
          <CartItem key={`cart-item-${item.id}`} item={item} />
        ))}
      </ul>
      <div className="cart__total">SubTotal(2 items): Rs. 20000</div>
    </div>
  );
}

function CartItem({ item }) {
  return (
    <li className="item">
      <img src={item.image} alt={item.title} />
      <div className="item__data">
        <h4>{item.title}</h4>
        <div className="item__actions">
          <label>Qty</label>
          <select defaultValue={item.quantity}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          <button>Delete</button>
        </div>
      </div>
      <div className="item__price">
        <span>Rs. {item.price}</span>
      </div>
    </li>
  );
}

function ProductList() {
  const productsList = products;
  return (
    <ul className="list product__list">
      {productsList.map((product) => (
        <Product product={product} key={`product-item-${product.id}`} />
      ))}
    </ul>
  );
}

function Product({ product }) {
  return (
    <li className="product">
      <img src={product.image} alt={product.title} />
      <div className="product__info">
        <h3 className="product__name">{product.title}</h3>
        <div className="product__price">Rs. {product.price}</div>
        <button className="product__add-to-cart">Add to cart</button>
      </div>
    </li>
  );
}

export default App;
