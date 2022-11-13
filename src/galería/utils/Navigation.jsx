import Carrusel from "./Carrusel";
import { useContext } from "react"
import { Context } from "./ElementContext"

const Navigation = () => {
    const { toggle, setToggle } = useContext(Context);
    return toggle ?
        <div className="labeling">
            <Carrusel />
            <button className="toggleButton" onClick={() => setToggle(prev => !prev)}>▼</button>
        </div>
        :
        <div className="labelingUp">
            <Carrusel />
            <button className="toggleButton" onClick={() => setToggle(prev => !prev)}>▲</button>
        </div>
}

export default Navigation;