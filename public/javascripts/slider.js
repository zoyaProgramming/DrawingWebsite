
try{
    const slide = document.getElementById('slider_child')
    const slideParent = document.getElementById('slider_parent')}
catch(err) {
    //console.log(err)
}

slide.addEventListener('mousedown', (event) => {
    //console.log('sj')
    slideParent.addEventListener('mousemove', move)
    slideParent.addEventListener('mouseup', () => {slideParent.removeEventListener('mousemove', move)})
    slideParent.addEventListener('mouseleave', () => {slideParent.removeEventListener('mousemove', move)})
})

 function move (event){
   const clientX = event.clientX
   const clientY = event.clientY
   var max = (slideBoundBox.height);
   var leftCorner = clientY - slideBoundBox.y;
   switch(leftCorner > slideBoundBox.height) {
        case false: 
            slide.style.height = leftCorner + 'px'
            break;
        case true:
            leftCorner = max;
            slide.style.height = max + 'px';
            break;
   }
    slide.style.height = leftCorner + 'px'
    //console.log(leftCorner + 'px')
    const r = (leftCorner) / (slideBoundBox.height);
    //console.log( /\d+\.?\d{0,2}/.exec(r)[0])
    const finalSize = /\d+\.?\d{0,2}/.exec(r)[0]
    draw.setTool( finalSize * draw.maxSize, ((undefined * 20) + 'px') )
    return /\d+\.?\d{0,2}/.exec(r)[0];
}