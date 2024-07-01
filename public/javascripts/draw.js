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
                const clientX = event.clientX-l.x;
                const clientY = event.clientY - l.y;
             //   console.log(clientX)
            //    console.log(clientY)
             //   console.log(l.y)
                var ctx = canv.getContext('2d')
                ctx.fillStyle = test.color
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

    fill2(data, direction, maxWidth, maxHeight, x, y, r, g, b, first = false, color) {
        this.color
        console.log(`r: ${r} g: ${g} b: ${b}`)
        const getColorIndexesForCoord = (x, y, width) => {
            const red = y * (width * 4) + x*4;
            return[red, red + 1, red + 2, red + 3]
        }
        const [indexR, indexG, indexB] = getColorIndexesForCoord(x, y, maxWidth)
        
        
        if (r!== data[indexR] || g!== data[indexG]||b !== data[indexB] || (x < 0 || y <0 || x >= maxWidth || y >= maxHeight)) {
            console.log('base??')

       //     data[indexR] = 0
       //     data[indexG] = 255
        //    data[indexB] = 0
       //     data[indexB + 1] = 255
          //  console.log('base')
            console.log(direction)
            console.log(`r: ${data[indexR]} g: ${data[indexG]} b: ${data[indexB]}`)
            console.log(`r: ${r} g: ${g} b: ${b}`)
         //   const [uR,uGreen,uBlue] = [data[getColorIndexesForCoord(x,y-1,maxWidth)[0]], data[getColorIndexesForCoord(x,y-1,maxWidth)[1]],data[getColorIndexesForCoord(x,y-1,maxWidth)[2]]]
      ///     const [dR,dG,dB] = [data[getColorIndexesForCoord(x,y+1,maxWidth)[0]], data[getColorIndexesForCoord(x,y+1,maxWidth)[1]], data[getColorIndexesForCoord(x,y+1,maxWidth)[2]]]
         //   const [rR, rG, rB] = [data[getColorIndexesForCoord(x+1,y,maxWidth)[0]],data[getColorIndexesForCoord(x+1,y,maxWidth)[1]],data[getColorIndexesForCoord(x+1,y,maxWidth)[2]]]
          //  const [lR, lG, lB] = [data[getColorIndexesForCoord(x-1,y,maxWidth)[0]],data[getColorIndexesForCoord(x-1,y,maxWidth)[1]],data[getColorIndexesForCoord(x-1,y,maxWidth)[2]]]
        
            switch(direction) {
                case 'l':
                    if(y - 1 >= 0) {
                        const a = getColorIndexesForCoord(x+1,y+1,maxWidth)
                        const c = getColorIndexesForCoord(x+1,y-1,maxWidth)
                        const [uR,uG,uB] = [data[c[0]],data[c[1]],data[c[2]]]
                        const [dR,dG,dB] = [data[a[0]],data[a[1]],data[a[2]]]
                        
                     //   if(uR==data[indexR]&&uGreen==data[indexG]&&uBlue==data[indexB]) return data;
                     if((dR == color[0] && dG == color[1] && dB == color[2] )||( uR == color[0] && uG == color[1] && uB == color[2])) { console.log('stop' + "left");return data;}
                   //  console.log("up")
                        data = this.fill2(data, "u", maxWidth, maxHeight, x+1, y - 1, r, g, b, false, color)
                        data = this.fill2(data, "d", maxWidth, maxHeight, x+1, y + 1, r, g, b, false, color)
                    }
                    break;
               /* case 'u':
                    console.log("up")
                    if(x + 1 < maxWidth) {
                        const a = getColorIndexesForCoord(x+1,y+1,maxWidth)
                        const [rR, rG, rB] = [data[a[0]],data[a[1]],data[a[2]]]
                        if(rG === 255) { console.log('stop' + "up");return data;}

                    //    if(rR==data[indexR]&&rG==data[indexG]&&rB==data[indexB]) return data;
                     //   console.log("right")
                        data = this.fill2(data, "r", maxWidth, maxHeight, x+1, y+1, r, g, b)
                    }
                    break;*/
                case 'r': 
                console.log('switch r   ')
                console.log(`r: ${data[indexR]} g: ${data[indexG]} b: ${data[indexB]}`)
                    if(y + 1 <= maxHeight ) {
                        console.log('hiii')
                        const a = getColorIndexesForCoord(x-1,y+1,maxWidth)
                        const c = getColorIndexesForCoord(x-1,y-1,maxWidth)
                        const [dR,dG,dB] = [data[a[0]],data[a[1]],data[a[2]]]
                        const [uR,uG,uB] = [data[c[0]],data[c[1]],data[c[2]]]
                       // if(dR==data[indexR]&&dG==data[indexG]&&dB==data[indexB]) return data;
                       if((dR == color[0] && dG == color[1] && dB == color[2]) ||( uR == color[0] && uG == color[1] && uB == color[2])) { console.log('stop' + "left");return data;}
                     //   console.log("down")
                         data = this.fill2(data, "d", maxWidth, maxHeight, x-1, y+1, r, g, b, false, color)
                        data = this.fill2(data, "u", maxWidth, maxHeight, x-1, y-1, r, g, b, false, color)
                    }
                    break;
            /*   case 'd':
                    console.log("down")
                    if(x - 1 >= 0) {
                        const a = getColorIndexesForCoord(x-1,y-1,maxWidth)
                        const [lR, lG, lB] = [data[a[0]],data[a[1]],data[a[2]]]
                       // if(lR==data[indexR]&&lG==data[indexG]&&lB==data[indexB]) return data;
                        if(lG === 255){ 
                            console.log('stop' + 'd');return data;}
                      //  console.log("right")
                        data = this.fill2(data, "l", maxWidth, maxHeight, x-1, y-1, r, g, b)
                    }
                break;*/
            }





            return data;
        }   
      //  console.log('not base')
      if(!first){
            data[indexR] = color[0]
            data[indexG] = color[1]
            data[indexB] = color[2]
            data[indexB + 1] =255
      }
       // console.log(direction)

        switch(direction) {
            
            case 'l':
                //console.log("not base")
                if(x >= 0) {
                    const a = getColorIndexesForCoord(x-1,y+1,maxWidth)
                        const c = getColorIndexesForCoord(x-1,y-1,maxWidth)
                        const [dR,dG,dB] = [data[a[0]],data[a[1]],data[a[2]]]
                        const [uR,uG,uB] = [data[c[0]],data[c[1]],data[c[2]]]
                        if((dR == color[0] && dG == color[1] && dB == color[2] )|| (uR == color[0] && uG == color[1] && uB == color[2])) {data = this.fill2(data, 'l', maxWidth, maxHeight, x - 1, y, r, g, b, false, color)}
                        else {
                            data = this.fill2(data, "u", maxWidth,maxHeight, x - 1, y, r, g, b, true, color)
                            data = this.fill2(data, "d", maxWidth,maxHeight, x - 1, y, r, g, b, true, color)
                            data = this.fill2(data, "l", maxWidth,maxHeight, x - 1, y, r, g, b, false, color)
                    }
                    
                    
                }
                
                break;
            case "r":

               // console.log("test")
                if(x< maxWidth) {
                    const a = getColorIndexesForCoord(x+1,y+1,maxWidth)
                        const c = getColorIndexesForCoord(x+1,y-1,maxWidth)
                        const [dR,dG,dB] = [data[a[0]],data[a[1]],data[a[2]]]
                        const [uR,uG,uB] = [data[c[0]],data[c[1]],data[c[2]]]
                        if((dR == color[0] && dG == color[1] && dB == color[2] )|| (uR == color[0] && uG == color[1] && uB == color[2])) {data = this.fill2(data, 'r', maxWidth, maxHeight, x + 1, y, r, g, b, false, color)}
                        else {
                            data = this.fill2(data, "u", maxWidth,maxHeight, x + 1, y, r, g, b, true, color)
                            data = this.fill2(data, "d", maxWidth,maxHeight, x + 1, y, r, g, b, true, color)
                            data = this.fill2(data, "r", maxWidth, maxHeight, x +1, y, r, g, b, false, color)
                        }
                    }
                break;
            case "u":
                console.log("not base")
              //  console.log("not base")
                if(y  >= 0) {
                    
                    data = this.fill2(data, "u", maxWidth,maxHeight, x, y-1, r, g, b, false, color)
                }
                break;
            case 'd':
                if(y < maxHeight) {
                    
                //    console.log("not base")
                    data = this.fill2(data, "d", maxWidth,maxHeight, x, y+1, r, g, b, false, color)
                }
            

        }
      //  console.log("test")
        
        return data;
    }
    fill(event) {

        this.r = (blue1) => {
            console.log(blue1)
        }

        
       // console.log('filling....')
        console.log(this)
        const boundingRect = this.displayCanvas.getBoundingClientRect()
        console.log(boundingRect.width)
        const context = this.displayCanvas.getContext('2d')
    
      //  context.fillStyle= 'red'
     //       context.fillRect(0, 0, boundingRect.width, boundingRect.height)


        console.log(boundingRect.height)
        var data = context.getImageData(0, 0, boundingRect.width, boundingRect.height).data
     //   console.log(data)
        const getColorIndexesForCoord = (x, y, width) => {
            const red = y * (width * 4) + x*4;
            return[red, red + 1, red + 2, red + 3]
        }
        var finished = true
        var left = 4;
        var right = 4;
        const [red1, green1, blue1, alpha1] = getColorIndexesForCoord(event.offsetX, event.offsetY, boundingRect.width)
        var b = 0;
        var [lastRed, lastGreen, lastBlue] = getColorIndexesForCoord(event.offsetX, event.offsetY, boundingRect.width)
        const [redVal, greenVal, blueVal] = [data[red1], data[green1], data[blue1]]
        console.log(redVal)
        const regEx = /\d{1,3}/g
        console.log(this.color)
        const thisColor = this.color.match(regEx)
        console.log(thisColor)
     //   `rgba(${redValue}, ${greenValue}, ${blueValue}, ${alphaValue})`
        data = this.fill2(data, 'l', boundingRect.width, boundingRect.height, event.offsetX, event.offsetY, redVal, greenVal, blueVal, true, thisColor)
        data = this.fill2(data, 'r', boundingRect.width,boundingRect.height,event.offsetX, event.offsetY, redVal, greenVal, blueVal, false, thisColor)
        var x = 1;
        var y = 1;
        
       /* while(left >= 0 || right >= 0) {
            b++;
            
            if (b > 10000000000) {
                console.log('too big')
                break;
            }
            console.log('i')*/
            
         /*   if (event.offsetX - y >= 0 && left >= 0){
                const [lRed, lGreen, lBlue, lAlpha] = getColorIndexesForCoord(event.offsetX - y, event.offsetY, boundingRect.width)
                const [red, blue, green] = [data[lRed], data[lBlue], data[lGreen]]
                const isFullyRight = event.offsetX - y
                if(red === redVal && green === greenVal && blue === blueVal && isFullyRight >= 0){
                    y++;
                //    console.log('working left ..')
                 //   console.log("is fully left " + isFullyRight)
                  // console.log(`red: ${red}, green: ${green}, blue: ${blue}`)
                  //  console.log(`red: ${redVal}, green: ${greenVal}, blue: ${blueVal}`)
          //        console.log(`left: ${lastRed - left}`)
                    data[lRed] = 255
                    data[lGreen] = 255
                    data[lBlue] = 255
                    data[lAlpha] = 255
                    left+=4
                } else {
                    
                //    console.log("is fully left " + isFullyRight)
         //           console.log('done left + 1  ')
                    left = -1
                } 
            } else {
          //      console.log('done left + 2')
                left = -1
            }
            if(event.offsetX + x < boundingRect.width && right >= 0){
                const [rRed, rGreen, rBlue, rAlpha] = getColorIndexesForCoord(event.offsetX + x, event.offsetY, boundingRect.width)
                const [red, blue, green] = [data[rRed], data[rBlue], data[rGreen]]
            //   console.log(`red: ${red}, green: ${green}, blue: ${blue}`)
                const isFullyRight = event.offsetX + x
                if(redVal === red && greenVal === green && blueVal === blue && isFullyRight <= boundingRect.width) {
                    x++;
                 //   console.log("workign right")
                   // console.log("is fully right: " + isFullyRight)
          //         console.log(`right:  ${lastRed +  right}`)
                    data[rRed] = 255
                    data[rGreen] = 255
                    data[rBlue] = 255
                    data[rAlpha] = 255
                    right +=4
                }
                
                else {
                   // console.log(boundRect.width)
                  //  console.log("is fully right: " + isFullyRight)
                //    console.log('right done')

                 //  console.log(`red: ${red}, green: ${green}, blue: ${blue}`)
                  // console.log(`red: ${redVal}, green: ${greenVal}, blue: ${blueVal}`)
                 //   console.log(`red: ${red}, green: ${green}, blue: ${blue}`)
                   // console.log(` expected red: ${redVal}, green: ${greenVal}, blue: ${blueVal}`)
                    right = -1
                }
            } else {
              //  console.log('right done')
                right = -1
            }
            

        }
        data[red1] = 255;
        data[green1] = 255;
        data[blue1] = 255;*/
        console.log(data + "tesrt")
        
        const newImg = new ImageData(data, boundingRect.width, boundingRect.height)
   //     console.log(data)
        this.displayCanvas.getContext("2d").putImageData(newImg, 0, 0);
    }

     

    
}



