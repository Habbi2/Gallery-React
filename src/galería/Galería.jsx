import Focus from "./utils/Focus";
import Navigation from "./utils/Navigation";
import { Provider } from "./utils/ElementContext";

import "./App.scss";

function Galería() {

  return <div className="fullScreen">
    <Provider>
      <Navigation />
      <Focus />
    </Provider>
  </div>
}

export default Galería;