const { brotliDecompress } = require("zlib");

class artCanvas{
    displayCanvas = null;
    tool = "draw";
    color = 'rgba(0, 0, 0, 255)'
    document = null;
    size = 10
    maxSize = 20
    areaListener = null;
    constructor (canvas, document) {
        this.tool = "draw"
        if(canvas == null || typeof(canvas) == 'undefined'){
            throw new Error('Canvas undefined')
        }
        this.displayCanvas = canvas
        const ctx = this.displayCanvas.getContext('2d')
        ctx.fillStyle = 'red'
        ctx.fillRect(0, 0, this.displayCanvas.getBoundingClientRect().width,this.displayCanvas.getBoundingClientRect().height)
        var self = this;
        var test = 'test'
        this.areaListener = new AbortController()
        
        this.document = document;
       // console.log(document)
       // const colorPickers = document.getElementsByClassName('display_color')
       
       const i = this;

       this.setTool(this.size, this.color, this.tool)
       /* const l = document.getElementById('t')
            const a= document.getElementById('another')
            t.addEventListener('click', () =>{this.test(i.displayCanvas, a)})*/
    }
        
    clear() {
    }
    load(){}
    update(){}
    test(){
    }

    draw(event, test){
        const displayCanvas = event.target
        if(displayCanvas instanceof HTMLCanvasElement){
            const numPointers = 10;
            var scheduled = false;
            const helperFunction = (event) => {

                console.log("mousemoved")
                if(!scheduled) {
                    scheduled = true;
                    setTimeout(() => {
                        scheduled = false;
                        //console.log(event)
                        //console.log(displayCanvas)
                        doStuff(event)
                    }, 0)
                }
            }
            displayCanvas.addEventListener('mousemove', helperFunction)
            displayCanvas.addEventListener('mouseup', () => {
                displayCanvas.removeEventListener('mousemove', helperFunction)
                console.log('removed')
                return;
            })
            displayCanvas.addEventListener('mouseout', () => {
                displayCanvas.removeEventListener('mousemove', helperFunction)
                console.log('removed')
                return;
            })
            const doStuff = (event) => {
                var canv = event.target
                const l = canv.getBoundingClientRect()
                const clientX = event.offsetX;
                const clientY = event.offsetY;
             //   console.log(clientX)
            //    console.log(clientY)
             //   console.log(l.y)
                var ctx = canv.getContext('2d')
                ctx.fillStyle = test.color
                console.log(test.color)
                ctx.fillRect(clientX, clientY, test.size, test.size) 
            }
        } else {
           // console.log('testing')
            throw new Error('canvas not HTML Canvas Element')
        }
    }
    save(event){
        const size = this.displayCanvas.getBoundingClientRect()
        const context = this.displayCanvas.getContext('2d')
        const imgData = context.getImageData(0, 0, size.width, size.height)
    
     //   console.log("saving!!!")
        const ownerDocument = this.displayCanvas.ownerDocument;
        
        const a = ownerDocument.getElementById('drawing_data')
        //a.innerHTML = 'farts'
        a.value = `[${imgData.data}]`
        console.log(`draw: ${a.value}`)
        return imgData;

        
    }
    setTool( size = this.size, color = this.color, tool = this.tool) {
     //   console.log(color)
        this.color = color;
        var self = this;
        this.size = size; 
      //  console.log('balls')

        
        
      //  console.log(this.tool)
        if(tool === "fill"){

            this.tool = "fill"
            
           // console.log(this.tool)
           // console.log(self.tool)
            console.log(this.displayCanvas)
            this.displayCanvas.removeEventListener('mousedown', r)
            this.areaListener.abort()
            this.displayCanvas.addEventListener('click', (event) => {
                self.fill(event)
            })
        } else {
            console.log(this.displayCanvas)
            


            this.displayCanvas.addEventListener('mousedown', r, {signal: this.areaListener.signal})
        }
        function r (event){
            //console.log(self.tool)
            console.log(this.tool)
            console.log('mousedown')
            self.draw(event, self)
        }

        
    }

    test(t, b) {
       // console.log('saving...')
        const r = b.getBoundingClientRect()
        var ctx = t.getContext("2d");
        var l = ctx.getImageData(0, 0, r.width, r.height)
        b.getContext("2d").putImageData(l, 0, 0)
    }

    fill2(data, direction, maxWidth, maxHeight, x, y, r, g, b, first = false, color, borderU = true, borderD = true, prevMax = null, prevMin = null) {
        const getColorIndexesForCoord = (x, y, width) => {
            const red = y * (width * 4) + x*4;
            return[red, red + 1, red + 2, red + 3]
        }
        const [indexR, indexG, indexB] = getColorIndexesForCoord(x, y, maxWidth)
        if (r!== data[indexR] || g!== data[indexG]||b !== data[indexB] || (x < 0 || y <0 || x >= maxWidth || y >= maxHeight)) {
            switch(direction) {
                case 'l':
                    // no need to return previous max and minimum since they won't be used
                    if(y - 1 >= 0) {
                        const a = getColorIndexesForCoord(x+1,y+1,maxWidth)
                        const c = getColorIndexesForCoord(x+1,y-1,maxWidth)
                        const [uR,uG,uB] = [data[c[0]],data[c[1]],data[c[2]]]
                        const [dR,dG,dB] = [data[a[0]],data[a[1]],data[a[2]]]
                        
                     //   if(uR==data[indexR]&&uGreen==data[indexG]&&uBlue==data[indexB]) return data;
                     if((dR == color[0] && dG == color[1] && dB == color[2] )||( uR == color[0] && uG == color[1] && uB == color[2])) {
                         console.log('stop' + "left");
                         return data;
                        }
                    }
                    break;
                case 'r': 
                    // no need to return max and minimum since they won't be used
                    if(y + 1 <= maxHeight ) {
                        console.log('hiii')
                        const a = getColorIndexesForCoord(x-1,y+1,maxWidth)
                        const c = getColorIndexesForCoord(x-1,y-1,maxWidth)
                        const [dR,dG,dB] = [data[a[0]],data[a[1]],data[a[2]]]
                        const [uR,uG,uB] = [data[c[0]],data[c[1]],data[c[2]]]
                       // if(dR==data[indexR]&&dG==data[indexG]&&dB==data[indexB]) return data;
                       const downMatches = (dR == color[0] && dG == color[1] && dB == color[2])
                       const upMatches = ( uR == color[0] && uG == color[1] && uB == color[2])
                       if( downMatches|| upMatches) {
                        console.log('stop' + "left");return data;
                        }
                    }
                    break;
               case 'u':
                    prevMin = y + 1;
                    break;
                case 'd':
                    prevMax = y - 1;
                    break;
            }
            return [data, prevMax, prevMin];
        }   
        if(!first){
            data[indexR] = color[0]
            data[indexG] = color[1]
            data[indexB] = color[2]
            data[indexB + 1] =255
        }
        switch(direction) {
            case 'l':
                if(x >= 0) {
                    const a = getColorIndexesForCoord(x,y+1,maxWidth)
                    const c = getColorIndexesForCoord(x,y-1,maxWidth)
                    const [dR,dG,dB] = [data[a[0]],data[a[1]],data[a[2]]]
                    const [uR,uG,uB] = [data[c[0]],data[c[1]],data[c[2]]]
                    const downMatches = (dR == color[0] && dG == color[1] && dB == color[2])
                    const upMatches = ( uR == color[0] && uG == color[1] && uB == color[2])
                    if(downMatches|| upMatches){
                            data = this.fill2(data, 'l', maxWidth, maxHeight, x - 1, y, r, g, b, false, color, !downMatches, !upMatches)[0]
                            prevMax = data[1]
                    }
                    else {
                        data = this.fill2(data, "d", maxWidth,maxHeight, x, y+1, r, g, b, false, color,false, false, prevMax)[0]
                        prevMax = data[1] // for down
                        data = this.fill2(data, "u", maxWidth,maxHeight, x, y-1, r, g, b, false, color,false, false, y-1, prevMin)[0]
                        prevMin = data[2] // for up
                        data = this.fill2(data, "l", maxWidth,maxHeight, x - 1, y, r, g, b, false, color,false, false, prevMax,prevMin)[0]
                        //  prevMax = data[1]
                    }
                }
                break;
            case "r":
               // console.log("test")
                if(x< maxWidth) {
                        const a = getColorIndexesForCoord(x,y+1,maxWidth)
                        const c = getColorIndexesForCoord(x,y-1,maxWidth)
                        const [dR,dG,dB] = [data[a[0]],data[a[1]],data[a[2]]]
                        const [uR,uG,uB] = [data[c[0]],data[c[1]],data[c[2]]]
                       const downMatches = (dR == color[0] && dG == color[1] && dB == color[2])
                       const upMatches = ( uR == color[0] && uG == color[1] && uB == color[2])
                        if(downMatches || upMatches) { //fill in a straight line
                    // borderU is if the previous pixel is on the fill border above
                    // borderD is if the previous pixel is on the fill bottom border
                            data = this.fill2(data, 'r', maxWidth, maxHeight, x + 1, y, r, g, b, false, color, !downMatches, !upMatches, prevMax, prevMin)
                            console.log('up and down are not valid')
                        }
                        else {
                            var downFill = this.fill2(data, "d", maxWidth,maxHeight, x, y + 1, r, g, b, false, color, false, false, prevMax, prevMin)
                            data = downFill[0]
                            prevMax = downFill[1]
                            var upFill = this.fill2(data, "u", maxWidth,maxHeight, x, y - 1, r, g, b, false, color, false, false, prevMax, prevMin)
                            data = upFill[0]
                            prevMin = upFill[2]
                            data = this.fill2(data, "r", maxWidth, maxHeight, x +1, y, r, g, b, false, color, false, false, prevMax, prevMin)[0]
                        }
                    }
                break;
            case "u": // borderL, borderR
                if(y  >= 0) {
                    if(!borderU) {
                    //pixels on the edge of the fill area
                    // want to try to go left and right
                        val = this.fill2(data, "u", maxWidth,maxHeight, x, y-1, r, g, b, false, color, false, true, prevMax, prevMin)
                        data = val[0]
                        prevMin = val[2] // obviously if you're higher than the border, previous minimum
                        val = this.fill2(data, "r", maxWidth,maxHeight, x+1, y, r, g, b, true, color, false, true)
                        data = val[0] //  tries to go left
                        val = this.fill2(data, "l", maxWidth,maxHeight, x -1, y, r, g, b, false, color, true, true)
                        data = val[0]
                    }
                    else if(borderU && x < prevMax){
                    // pixels in the middle of the fill area, at the highest point
                    // they're treated as if they're a border pixel
                    // try to go left and right
                        const val = this.fill2(data, "u", maxWidth,maxHeight, x, y-1, r, g, b, false, color,false, true, prevMax, prevMin)
                        data = val[0]
                        prevMin = val[2]
                        val = this.fill2(data, "r", maxWidth,maxHeight, x+1, y, r, g, b, true, color, false, true)
                        data = val[0] //  tries to go left
                        val = this.fill2(data, "l", maxWidth,maxHeight, x -1, y, r, g, b, false, color)
                        data = val[0]
                    }
                    else if (borderU && x === prevMax) {
                        console.log('')
                    }
                }
                break;
            case 'd':
                if(y <= prevMax) {
                //    console.log("not base")
                    const val = this.fill2(data, "d", maxWidth,maxHeight, x, y+1, r, g, b, false, color)
                    data = val[0]
                    prevMax = val[1]
                } else if (borderD && borderU) {
    
                    const val = this.fill2(data, "d", maxWidth,maxHeight, x, y+1, r, g, b, false, color)
                    data = val[0]
                    prevMin 
                }
                break;

        }
        return [data, prevMax, prevMin];
    }
    fill(event) {

        const boundingRect = this.displayCanvas.getBoundingClientRect()
        const context = this.displayCanvas.getContext('2d')
        var data = context.getImageData(0, 0, boundingRect.width, boundingRect.height).data
        for (const thing of data) {
           // console.log(typeof(thing))
            if (thing === 255 || thing === 0) {
               // console.log('s')
            } else {
              //      console.log('not s')
                console.log(thing)
            }
        }
        const getColorIndexesForCoord = (x, y, width) => {
            const red = y * (width * 4) + x*4;
            return[red, red + 1, red + 2, red + 3]
        }
        var finished = true
        var left = 4;
        var right = 4;
        const [red1, green1, blue1, alpha1] = getColorIndexesForCoord(event.offsetX, event.offsetY, boundingRect.width)[0]
        var b = 0;
        var [lastRed, lastGreen, lastBlue] = getColorIndexesForCoord(event.offsetX, event.offsetY, boundingRect.width)[0]
        const [redVal, greenVal, blueVal] = [data[red1], data[green1], data[blue1]]
        const regEx = /\d{1,3}/g
        const thisColor = this.color.match(regEx)
        data = this.fill2(data, 'l', boundingRect.width, boundingRect.height, event.offsetX, event.offsetY, redVal, greenVal, blueVal, true, thisColor)
        data = this.fill2(data, 'r', boundingRect.width,boundingRect.height,event.offsetX, event.offsetY, redVal, greenVal, blueVal, false, thisColor)
        var x = 1;
        var y = 1;
        
        const newImg = new ImageData(data, boundingRect.width, boundingRect.height)
        this.displayCanvas.getContext("2d").putImageData(newImg, 0, 0);
    }

     

    
}



