function createDialog(text, location, backgroundPosition, root, direction){
    const blurscreen = document.createElement("div")
    blurscreen.classList.add("blurscreen")
    const dialog = document.createElement("DIALOG")
    dialog.open = open
    dialog.classList.add("dialog")
    dialog.style.backgroundPosition = backgroundPosition
    const textNode = document.createTextNode(text + " " + root)
    const dialogDescription = document.createElement("div")
    dialogDescription.classList.add("dialogDescription")
    const form = document.createElement("form")
    form.id = "dialogForm"
    form.setAttribute("method", "POST")
    form.setAttribute("action", location)
    const hidden = document.createElement("input")
    hidden.setAttribute("type", "hidden")
    hidden.setAttribute("form", "dialogForm")
    hidden.setAttribute("name", "root")
    hidden.setAttribute("value", root)
    const directionInput = document.createElement("input")
    directionInput.setAttribute("type", "hidden")
    directionInput.setAttribute("form", "dialogForm")
    directionInput.setAttribute("name", "direction")
    directionInput.setAttribute("value", direction)
    const input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("form", "dialogForm")
    input.setAttribute("name", "input")
    input.required = true
    input.classList.add("dialogInput")
    dialogDescription.append(textNode, hidden, directionInput, input)

    const buttonsHolder = document.createElement("div")
    buttonsHolder.classList.add("buttonsHolder")

    const acceptBtn = document.createElement("button")
    acceptBtn.setAttribute("type", "submit")
    acceptBtn.setAttribute("form", "dialogForm")
    acceptBtn.innerText = "OK"
    acceptBtn.classList.add("button")

    const denyBtn = document.createElement("button")
    denyBtn.innerText = "cancel"
    denyBtn.classList.add("button")

    buttonsHolder.append(acceptBtn, denyBtn)

    dialog.append(form, dialogDescription, buttonsHolder)
    document.body.append(blurscreen, dialog)

    
    // #1 - Zakmnięcie poprzez kliknięcie w tło
    blurscreen.onclick = () => { 
        document.body.removeChild(blurscreen)
        document.body.removeChild(dialog)
        return false
    }

    // #2 - Zamnknięce poprzez klinięcie w przycisk cancel
    denyBtn.onclick = () => {
        document.body.removeChild(blurscreen)
        document.body.removeChild(dialog)
        return false
    }
}