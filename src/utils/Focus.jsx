import { useContext } from "react";
import { Context } from "./ElementContext"

function Focus() {
    const { fragment, prev, next } = useContext(Context)
    return (<div className="App">
        <ul className="Container">
            <button className="focusPrevButton" onClick={() => prev()}>{`${"<"}`}</button>
            {fragment}
            <button className="focusNextButton" onClick={() => next()}>{`${">"}`}</button>
        </ul>
    </div>)
}

export default Focus;