class ColorPicker {
    gradientList = []
    pickerElement = undefined;
    visualDisplay = undefined;
    document = null;
    previousColor = 'rgb(0, 0, 0)';
    currentColor = ''
    hasDisplay = false;
    numberDisplays = 20;
    currentIndex = 0;
    constructor(colors, parent, hasDisplay = false) {
        if(parent  === null || typeof(parent) === 'undefined') {
            throw new Error('parent void')
            return;
        }
        if(Array.isArray(colors)) {
            this.gradientList = colors
        } else {
            this.gradientList = [{
                isVertical: colors.isVertical,
                colorVals: [colors.colorVals] }]
        }

        this.pickerElement = parent;
        const parentId = this.pickerElement.id
        this.visualDisplay= parentId
        this.document = parent.ownerDocument
        this.hasDisplay = hasDisplay
        if(this.hasDisplay) {this.updateDisplay(this.previousColor)}
        
        
    }



    addListeners(event, draw) {
        const self = this
        test2(event)
        //console.log((typeof(this.pickerElement))
        this.pickerElement.addEventListener('mousemove', test2)
        this.pickerElement.addEventListener('mouseup', () => {
            //console.log((`prev: ${this.previousColor} current: ${this.currentColor}`)
            this.previousColor = this.currentColor
            
            this.pickerElement.removeEventListener('mousemove', test2)
        })
        this.pickerElement.addEventListener('mouseout', () => {
            //console.log((`prev: ${this.previousColor} current: ${this.currentColor}`)
            this.previousColor = this.currentColor
            
            this.pickerElement.removeEventListener('mousemove', test2)
        })
        function test2(event) {
            const col = self.getColor(event)
            //console.log((col)
            draw.setTool(undefined, col, "draw")
            console.log(draw.tool)
            //console.log((col)
            
        }
        const previousColors = this.document.getElementsByClassName('history_view')
            for(var i =0; i< this.document.getElementsByClassName('history_view').length;i++) {
                
                previousColors[i].addEventListener('click', ()  => {
                    draw.setTool(undefined, previousColors[i])
                })
            }

        
    }
     getColor(event) {

        const boundRect = this.pickerElement.getBoundingClientRect()
        //console.log((boundRect.width, boundRect.height)
        const clientX  = event.offsetX;//event.clientX- boundRect.x;
        const clientY = event.offsetY;//event.clientY - boundRect.y;
      //  console.log(`x: ${event.clientX} y: ${event.clientY} boundX: ${boundRect.x} boundY: ${boundRect.y} `)
        
        var ctx = this.pickerElement.getContext("2d");
        
        
        const[x, y] = [0,0]
        
        // Create gradient
    /*  var grd = ctx.createLinearGradient(0, 0, 200, 200);
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "white");
        
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 200, 200); */
        var imgData = ctx.getImageData(x, y, boundRect.width, boundRect.height);
        var pix = imgData.data;
        
        const getColorIndexesForCoord = (x, y, width) => {
            const red = y * (width * 4) + x*4;
            return[red, red + 1, red + 2, red + 3]
        }
        const colorIndices = getColorIndexesForCoord(clientX, clientY, boundRect.width)
        const[redIndex, greenIndex, blueIndex, alphaIndex] = colorIndices
        const redValue = pix[Math.floor(redIndex)]
        const blueValue = pix[Math.floor(blueIndex)]
        const greenValue = pix[Math.floor(greenIndex)]
        
        const alphaValue = pix[Math.floor(alphaIndex)]
        ////console.log((clientX)
        ////console.log((clientY)
        ////console.log((greenValue)
        
     
       
        //d.innerHTML= typeof(l) +  l +' y: ' + m + ' red: ' + redIndex + ' green: ' + greenIndex + ' purple: ' + blueIndex
        const v = `rgba(${redValue}, ${greenValue}, ${blueValue}, ${alphaValue})`;
        this.currentColor = v;
        if(this.hasDisplay) {
            this.updateDisplay(v)
       }
        
        ////console.log((v)
        return v;
    //    ////console.log((v)
       // ////console.log((redIndex + '    ' + pix.length + '   ' + boundRect.width)
    //   d.style.color = v
       /* for(var i = 0, n = pix.length;i<n; i+=4) {
            
            pix[i  ] =  redValue; // red
            pix[i+1] = blueValue; // green
            pix[i+2] =  greenValue; // blue
            pix[i + 3] = alphaValue;
            
        }*/
        
    }
    createPicker() {
        ////console.log((this.pickerElement)
        var ctx = this.pickerElement.getContext("2d");
    
        const boundRect = this.pickerElement.getBoundingClientRect()
        this.gradientList.forEach((colorValue) => {
            var gridH =   colorValue.isVertical? ctx.createLinearGradient(0, 0, 0, boundRect.height):  ctx.createLinearGradient(0, 0, boundRect.width, 0);
            const allVals = colorValue.colorVals
            for (var i = 0; i <allVals.length; i++   ) {
                const val = allVals[i]
                const pos = (1/(allVals.length - 1) ) * i;
                ////console.log((pos + val)
                gridH.addColorStop(pos, val)
            }
            ctx.fillStyle= gridH
            ctx.fillRect(0, 0, boundRect.width, boundRect.height)
            
        })
    }
    updatePicker(gradientList) {
        var ctx = this.pickerElement.getContext("2d");
        const boundRect = this.pickerElement.getBoundingClientRect()
        ////console.log(( `x: ${boundRect.x} y: ${boundRect.y}`)
        gradientList.forEach((colorValue) => {
            var gridH =   colorValue.isVertical? ctx.createLinearGradient(0, 0, 0, boundRect.height):  ctx.createLinearGradient(0, 0, boundRect.width, 0);
            const allVals = colorValue.colorVals
            for (var i = 0; i <allVals.length; i++   ) {
                const val = allVals[i]
                const pos = (1/(allVals.length - 1) ) * i;
                ////console.log((pos + val)
                gridH.addColorStop(pos, val)
            }
            ctx.fillStyle= gridH
            ctx.fillRect(0, 0, boundRect.width, boundRect.height)
        })


        
    }
    updateDisplay(newColor) {
        const displayView = this.document.getElementById('display_view')
        var allPrev = displayView.getElementsByClassName('history_view')
        const[newCol, prev] = [this.document.getElementById('display_color'), this.document.getElementById(this.numberDisplays + '_previous_color')]
        //console.log((allPrev[0])
        const r = typeof(allPrev[0]) !== 'undefined'
        
        const matches = r?allPrev[0].style.backgroundColor.match(/\d{1,3}/g):undefined
        const toRGBA = matches?`rgba(${matches[0]}, ${matches[1]}, ${matches[2]}, 255)`:undefined
        if(newCol !== null && typeof(toRGBA) !== 'undefined' && (toRGBA === this.previousColor)) {
       //     console.log('blimety')
            
            newCol.style.backgroundColor = newColor
        }else if(newCol !== null && allPrev.length> 0) {
           // console.log(allPrev[0].style.backgroundColor.match(/\d{1,3}/g))

          //  console.log(allPrev[0].style.backgroundColor === this.previousColor)
        //    console.log(typeof(allPrev[0].style.backgroundColor) + typeof(this.previousColor))
          //  console.log(`first:${allPrev[0].style.backgroundColor} now: ${this.previousColor}`)
            newCol.style.backgroundColor = newColor
                allPrev[this.numberDisplays - 1].style.backgroundColor = this.previousColor
                displayView.insertBefore(allPrev[this.numberDisplays - 1], allPrev[0])
        } else {
            const newElem = this.document.createElement('div')
            displayView.appendChild(newElem)
            newElem.className = 'display_color'
            newElem.id= 'display_color'
            newElem.style.backgroundColor = newColor
            
            newElem.width = '10'
            newElem.height = '10'
            newElem.style.display= 'inline-block'
            newElem.style.height = '50px'
            newElem.style.width = '50px'
            for(var i = 0; i< this.numberDisplays; i++){
                const newPrevious = this.document.createElement('div')
                displayView.appendChild(newPrevious)
                newPrevious.className = 'history_view'
                newPrevious.id= i + '_previous_color'
                newPrevious.style.backgroundColor = this.previousColor
             //   console.log(newPrevious.style.backgroundColor)
                newPrevious.width = '10'
                newPrevious.height = '10'
                newPrevious.style.display= 'inline-block'
                newPrevious.style.height = '10px'
                newPrevious.style.width = '10px'
            }
            
        }
    }
}