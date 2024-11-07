function fetchData(url, data = null) {
    const options = {
        method: "POST",
        body: data
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            alert(data);
            addNewAnimal(data)
        })
        .catch(error => console.log(error));
}

function addNewAnimal(data){
    data = JSON.parse(data)
    let resultsSelect = document.getElementById("resultsSelect")
    resultsSelect.innerHTML = ""
    data.arr.forEach(element => {
        let animalOption = document.createElement("option")
        animalOption.value = element.id
        animalOption.classList.add("optionInput")
        // animalOption["data-id"] = element.id 
        animalOption.innerText = element.name
        resultsSelect.appendChild(animalOption)
    });
}


document.getElementById("addOneBtn").onclick = function () {
    const data = JSON.stringify({
        animal: document.getElementById("animalSelect").value,
        color: document.getElementById("colorSelect").value

    })
    fetchData("/add", data)
}

document.getElementById("getAllBtn").onclick = function () {
    fetchData("/getall")
}

document.getElementById("delSelBtn").onclick = function () {
    const data = document.getElementById("resultsSelect").value
    if (data)
        fetchData("/delete", data)
}

document.getElementById("updSelBtn").onclick = function () {
    const data = document.getElementById("resultsSelect").value
    if (data)
        fetchData("/update", data)
}