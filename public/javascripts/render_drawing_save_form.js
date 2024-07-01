const { ValidatorsImpl } = require("express-validator/lib/chain")
const { main } = require("../../controllers/save_controllers")
function resetOptions() {
   console.log('iusdajfoijsdf')
 /*   const thisDiv = document.getElementById("save_load_div")
    console.log(thisDiv + 'sadjfoidsafj')
    while(thisDiv.firstChild) {
        console.log('found')
        thisDiv.firstChild.remove(); 
    }*/
}
function bbbb(event) {
    event.preventDefault()
    console.log('testtesttest')
    const form_method = document.getElementById('123')
    if (form_method.value === 'POST' ){
        try{
            console.log('beannns')
            const mainDocument = event.target.ownerDocument
            const mainForm = mainDocument.getElementById('main_form')
            console.log(mainForm.style.backgroundColor)
            var main_dialog = document.getElementById('test5')
            resetInput()
            main_dialog.style.visibility = 'visible'


        } catch(err){
            console.log("duduusidhiufdjs")
            
            const mainDocument = event.target.ownerDocument
            console.log(mainDocument)
            event.preventDefault()
            console.log('main triggered!')
            const mainCss = mainDocument.styleSheets[0]
            const mainDialog = mainDocument.getElementById('test5')
            const mainDiv = mainDocument.createElement('div')
            const mainForm = mainDocument.createElement('form')
            var nameInput = mainDocument.createElement('input')
            var descriptionInput = mainDocument.createElement('input')
            const submitButton = mainDocument.createElement('button')
            const nameLabel = mainDocument.createElement('label')
            const descriptionLabel = mainDocument.createElement('label')

            mainDialog.append(mainDiv)
            mainDiv.append(mainForm)
            mainForm.append(nameLabel)
            mainForm.append(nameInput)
            
            
            mainForm.append(descriptionLabel)
            mainForm.append(descriptionInput)
            mainForm.append(submitButton)
          //  mainDialog.id = 'main_dialog'
            mainForm.id = 'main_form'
            mainDiv.id= 'main_div'
            nameInput.id = 'name_input'
            descriptionInput.id = 'description_input'
            nameLabel.for = 'name_input'
            descriptionInput.for = 'description_input'
            nameInput.name = 'name'
            descriptionInput.name = 'description'

            nameLabel.innerHTML = 'name: '
            
            descriptionLabel.innerHTML = 'description: '
            mainDiv.style.cssText = mainCss.cssRules
            mainDialog.style.cssText = mainCss.cssRules
            mainForm.style.cssText = mainCss.cssRules
            for(child of mainForm.childNodes) {
                child.style.cssText= mainCss.cssRules
            }
            //nameLabel.style.width = '100px'
            //mainDiv.style.width = '500px'
            //mainDiv.style.height = '500px'
            submitButton.type = 'submit'
            mainDialog.style.visibility = 'visible'
            mainDialog.style.display= 'inline-block'
            submitButton.addEventListener('click', (event) => {
                clickHandler(event)
                event.preventDefault()
            })
            return [nameInput, descriptionInput]
        }
        event.preventDefault()
    }
    else {
        console.log('getting....')
        clickHandler(event)
        event.preventDefault()
    }
    event.preventDefault()
}
function clickHandler(event) {
    
    const formData = new FormData(document.getElementById('save_load_form'))
    
    console.log('click handlers')
    const form_method = formData.get('method')
    console.log('click handlers')
    console.log(form_method)
    const id_input = formData.get('id') 
    console.log(id_input + "lenguiajsdif")
    console.log(formData.get('id'))
    const drawing_data = formData.get('drawing_data')
    if(form_method === 'POST' && id_input.length > 1) {
        console.log('POST')
        console.log(id_input.length)
        update(drawing_data, id_input )
    } else if (form_method === 'POST' && id_input.length === 1) {
        console.log('SAVING')
        save(event, drawing_data)
    } else if(form_method === 'GET') {
        console.log('get')
        load(formData.get('id'))
    }
    console.log('donnnneee')
    document.getElementById('save_load_form').reset()
    resetOptions()
    resetInput()
    
    event.preventDefault()
}

function update(drawing_data, id) {
    const nameInput = document.getElementById('name_input')
    console.log("trying to update")
    console.log(id)
    fetch(`/drawingapp/draw/${id}/update`,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `drawing_data=${drawing_data}&name=${nameInput.value}`
        }
    ).then((response) => {
        response.text().then((res)=>{
            console.log(res)
            console.log(decodeURIComponent(res))
            loadDrawing(decodeURIComponent(res))
            console.log('updated')
        })
        
    }, () => {
        console.log('issue updating')
    })
}
function save(event, drawing_data){
    const nameInput = document.getElementById('name_input')
    
  //  var [n, descriptionInput] = bbbb(event)
    console.log(nameInput.value)
    console.log('save save')
    fetch(`/drawingapp/save`,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `drawing_data=${drawing_data}&name=${nameInput.value}`
        }
    ).then((response) => {
        response.text().then((res)=>{
            console.log(res)
            console.log(decodeURIComponent(res))
            loadDrawing(decodeURIComponent(res))
        })
        
        console.log('isdoifjsdfio')
    })
}
function load(id_input){
    //const form = document.getElementById('main_form')
    console.log('attempting to load ' + id_input)
    fetch(`/drawingapp/draw/${id_input}`, {
        method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
    }).then((response) => {
        response.text().then((res)=>{
            console.log(decodeURIComponent(res))
            loadDrawing(decodeURIComponent(res))
            resetOptions()
        })
        
        console.log('isdoifjsdfio')
    }, (error) => {
        console.log(error);
         console.log(id_input + ' was not fetched properly')})

}


function resetInput() {
  //  const mainForm = document.getElementById('main_form')
   // mainForm.reset()
    var main_dialog = document.getElementById('test5')
    main_dialog.style.visibility = 'hidden'
    var viewDialog = document.getElementById('view_dialog')
    viewDialog.style.visibility = 'hidden'
}