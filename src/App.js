import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [carIsShown, setcarIsShown] = useState(false);

  const showCartHandler = () => {
    setcarIsShown(true);
  };

  const hideCartHandler = () => {
    setcarIsShown(false);
  };

  return (
    <CartProvider>
      {carIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
