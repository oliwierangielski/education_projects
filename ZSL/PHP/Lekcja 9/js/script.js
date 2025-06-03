let interval
function sliderDown(elem, multiplier=1) {
    interval = setInterval(( )=> {
        let transform = elem.parentElement.childNodes[3].style.transform
   transform = transform.substring(transform.indexOf("(")+1, transform.lastIndexOf("px)"))
   if(transform == "") transform = 0
   elem.parentElement.childNodes[3].style.transform = "translateX(" + (parseInt(transform) + 5*multiplier) +"px)"
    }, 20)
}

function sliderRelease(){
    clearInterval(interval)
}


// Get Dialog Images
function get() {
    let sliderInner = document.getElementById("sliderInner")
    sliderInner.innerHTML = ""
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "moviesimages.php");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            console.log(json);
            for (let i = 0; i < json.length; i++) {
                let a = document.createElement("a")
                a.href = "movies.php?id=" + json[i][1]
                let img = document.createElement("img")
                img.src = "images/" + json[i][0]
                img.classList.add("sliderImg")
                a.appendChild(img)
                sliderInner.appendChild(a)
            }
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("moviesimages=get");
}

function loadSeats(showing_id){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "moviesimages.php");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let table = document.createElement("table")
            let json = JSON.parse(this.responseText);
            // console.log(json);
            for (let i = 1; i <= 15; i++){
                let tr = document.createElement("tr")
                for(let y = 1; y <= 20; y++){
                    let td = document.createElement("td")
                    let checkBox = document.createElement("input")
                    checkBox.type = "checkbox"
                    checkBox.name = "seats[]"
                    checkBox.id = "seatrow"+i+"col"+y
                    checkBox.value = i + "," + y
                    td.appendChild(checkBox)
                    tr.appendChild(td)
                }
                table.appendChild(tr)
                document.getElementById("seatsChoice").appendChild(table)
            }
            for (index in json){
                document.getElementById("seatrow"+json[index][0] + "col" + json[index][1]).disabled = true
            }
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("seats=get&showing_id="+showing_id);
}

function loadShowings(movie_id){

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "moviesimages.php");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            console.log(json)
            for(index in json){
                let showingButton = document.createElement("button")
                showingButton.classList.add("showingBtn")
                showingButton.onclick = function(){
                    document.getElementById("choseShowingWindow").style.display = "none"
                    document.getElementById("choseSeatWindow").style.display = "block"
                    let inputHidden = document.createElement("input")
                    inputHidden.type="hidden"
                    inputHidden.name = "showing_id"
                    // inputHidden.form = document.getElementById("seatForm")
                    inputHidden.value = json[index][2]
                    document.getElementById("seatForm").appendChild(inputHidden)
                    loadSeats(json[index][2])
                }
                showingButton.innerText = json[index][0] + " - " + json[index][1]
                document.getElementById("showingsChoice").appendChild(showingButton)
            }
            
        }
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("showings=get&movie_id=" + movie_id);
}