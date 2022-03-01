import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [carIsShown, setcarIsShown] = useState(false);

  const showCartHandler = () => {
    setcarIsShown(true);
  };

  const hideCartHandler = () => {
    setcarIsShown(false);
  };

  return (
    <Fragment>
      {carIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
