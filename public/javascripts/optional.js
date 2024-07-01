   

    const drawing_data = document.getElementById('drawing_data').value
    const test = drawing_data.substring(1, drawing_data.length)
    const b = test.split(',')
    var v = Uint8ClampedArray.from(b)
    Array.isArray()
    if(drawing_data.length>0) {
        console.log(drawing_data)
        const bo = document.getElementById('main_canvas');
        const r = bo.getBoundingClientRect();
        const  t = new ImageData(v, r.width);
        bo.getContext("2d").putImageData(t, 0, 0);
    }
function loadDrawing(drawingData) {
    const test = drawingData.substring(1, drawingData.length)
    const newArray = test.split(',')
    var finArray = Uint8ClampedArray.from(newArray)
    if(drawing_data !== null) {
        const bo = document.getElementById('main_canvas');
        const r = bo.getBoundingClientRect();
        const  t = new ImageData(finArray, r.width);
        bo.getContext("2d").putImageData(t, 0, 0);
    }
}