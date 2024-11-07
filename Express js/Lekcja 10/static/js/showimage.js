let isShown = false;
const panel = document.getElementById("panel")
function showFiltersPanel() {
    let panelWidth = ((!isShown) ? "175px" : "0px")
    panel.style.width = panelWidth;
    isShown = ! isShown
}

const mainImageDiv = document.getElementById("mainImageDiv")

function changeFilter(filterName){
    mainImageDiv.style.filter = filterName + "(100%)"
}

function clearFilter(){
    mainImageDiv.style.filter = "none"
}

function updateImageChanges(imageName){
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    let image = new Image()
    image.src = mainImageDiv.style.backgroundImage.slice(4,-1).replace(/"/g, "")
    image.onload = function(){
        canvas.width = this.width
        canvas.height = this.height
        context.filter = mainImageDiv.style.filter
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        let dataUrl = canvas.toDataURL("image/jpeg")
        let fd = new FormData()
        fd.append("file", dataUrl.split(",")[1])
        fd.append("name", imageName)
        const body = fd
        fetch("/saveImage", {method: "post", body})
            .then(response => response.json())
            .then(
                data => {
                    console.log(data)
                }
            )
    }
}
