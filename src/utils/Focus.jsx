import { useContext } from "react";
import { Context } from "./ElementContext"

function Focus() {
    const { selectedElement, prev, next } = useContext(Context)
    return (<div className="App">
        <ul className="Container">
            <button className="focusPrevButton" onClick={() => prev()}>{`${"<"}`}</button>
            <img id="imagen" className='imagen' alt="" src={selectedElement}></img>
            <button className="focusNextButton" onClick={() => next()}>{`${">"}`}</button>
        </ul>
    </div>)
}

export default Focus;