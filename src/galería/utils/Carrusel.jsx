import { useContext } from "react"
import { Context } from "./ElementContext"

const Carrusel = () => {
    const { onClickLabel, images, selectedElement, pages, navPrev, navNext } = useContext(Context)
    return (
        <div className="carrusel">
            <button className="prevButton" onClick={() => navPrev()}>{`${"<"}`}</button>
            <ul className="carruselList">
                {pages.map((image, index) => {
                    return (image === selectedElement)
                        ? <img className="selected" key={index} alt="" src={image} onClick={(e) => onClickLabel(e, images.indexOf(image))}></img>
                        : <img className="labelImage" key={index} alt="" src={image} onClick={(e) => onClickLabel(e, images.indexOf(image))}></img>
                })}
            </ul>
            <button className="nextButton" onClick={() => navNext()}>{`${">"}`}</button>
        </div>)
}

export default Carrusel;