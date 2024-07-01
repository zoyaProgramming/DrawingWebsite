
    var mainColorPickerCanvas = document.getElementById("myCanvas");
    var secondCanvas = document.getElementById("t");
    const slide = document.getElementById('slider_child')
    const slideParent = document.getElementById('slider_parent')
    const slideBoundBox = slide.getBoundingClientRect()
    const boundRect = mainColorPickerCanvas.getBoundingClientRect();
    const defaultGradient = 
    [{isVertical: false,
    colorVals: ['white', 'red']},
    {isVertical: true,
        colorVals: ['transparent', 'black']
    }]


    const mainColorPicker = new ColorPicker(defaultGradient, mainColorPickerCanvas, true)
    mainColorPicker.createPicker()
    var hueColorPickerCanvas = document.getElementById("myRainbow");
    const rainbowGradient = [
        {isVertical: true,
            colorVals: ['red','orange', 'yellow','green', 'blue', 'purple']
        }
    ]
    const hueColorPicker = new ColorPicker(rainbowGradient, hueColorPickerCanvas)
    hueColorPicker.createPicker()
    
    const canvas = document.getElementById('main_canvas')
    const draw = new artCanvas(canvas, document)
    mainColorPickerCanvas.addEventListener('mousedown', (ev) => {mainColorPicker.addListeners(ev, draw)})
    hueColorPickerCanvas.addEventListener('mousedown', () => {
        hueColorPickerCanvas.addEventListener('mousemove', updateMain)
        hueColorPickerCanvas.addEventListener('mouseup', () => {
            hueColorPickerCanvas.removeEventListener('mousemove', updateMain)
        })
        function updateMain(event){
            const newColor = hueColorPicker.getColor(event)
            //////console.log(newColor)
            defaultGradient[0].colorVals[1] = newColor;
            mainColorPicker.updatePicker(defaultGradient)
        }
    })
var j = "clicky clicky"