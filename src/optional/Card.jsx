function saveFileAs() {
    let promptFilename = prompt("Save file as", "");
    if (promptFilename && promptFilename !== "") {
        let textBlob = new Blob([document.getElementById("canvas-textarea").value], { type: 'text/plain' });
        let downloadLink = document.createElement("a");
        downloadLink.download = promptFilename;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = window.URL.createObjectURL(textBlob);
        downloadLink.click();
    }
}

const Card = ({selectedElement, onClickClose, toggleCard}) => {
    return (<div className="App"><button className='close' onClick={(e) => onClickClose(e)}></button><div className="cardImgContainer">
        {toggleCard ? < img className='imagenCard' src={selectedElement.url} alt="" ></img > : < img className='imagenCard' src={selectedElement.url} alt="" ></img >}
        <div className='textareaHolder' id="noter-save-form">
            <textarea id="canvas-textarea" style={{ overflow: "hidden", wordWrap: "break-word", resize: "none" }}>
            </textarea>
            <label className="textareaLabel">
            </label>
            <button id="save-button" className="submitEvent" onClick={() => saveFileAs()}>S</button>
        </div>
    </div></div >)
}

export default Card;