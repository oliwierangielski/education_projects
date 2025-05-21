function loadOptions(select, table, checkedOpt){
    select = document.getElementById(select)
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "server/ajax.php");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            for (let i = 0; i < json.length; i++) {
                let option = document.createElement("option")
                option.value = json[i][0]
                option.innerText = json[i][1]
                if(checkedOpt == json[i][0])
                    option.selected = true
                select.appendChild(option)
            }
        }
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=select&table="+table);
}


function deleteData(id){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "server/ajax.php");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            get();
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=delete&id=" + id);
}

function editData(trId, id, country, currency, category, material, year){
    tr = document.getElementById(trId)
    tr.innerHTML = `
    <td><select id="updatedCountry${id}"></select></td>
    <td><input type="text" id="updatedCurrency${id}" value="${currency}"></td>
    <td><input type="text" id="updatedCategory${id}" value="${category}"></td>
    <td><select id="updatedMaterial${id}"></select></td>
    <td><input type="number" id="updatedYear${id}" value="${year}"></td>
    <td><img src="client/images/faja.png" onclick="send('update', 'updatedCountry${id}', 'updatedCurrency${id}', 'updatedCategory${id}', 'updatedMaterial${id}', 'updatedYear${id}', ${id})"></td>`
    loadOptions(`updatedCountry${id}`, 'countries', country); 
    loadOptions(`updatedMaterial${id}`, 'materials', material)
}

function send(
    action,
    countryId = "country",
    currencyId = "currency",
    categoryId = "category",
    materialId = "material",
    yearId = "year",
    id = null,
    ) {
    let country = document.getElementById(countryId).value
    let currency = document.getElementById(currencyId).value 
    let category = document.getElementById(categoryId).value
    let material = document.getElementById(materialId).value
    let year = document.getElementById(yearId).value
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "server/ajax.php");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            get();
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`acc=${action}&country=${encodeURIComponent(country)}&currency=${encodeURIComponent(currency)}&category=${encodeURIComponent(category)}&material=${encodeURIComponent(material)}&year=${encodeURIComponent(year)}&id=${id}`);
}

function get() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "server/ajax.php");
    let tbody = document.getElementById("tbody")
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            let tbodyHelper = document.createElement("tbody")
            for (let i = 0; i < json.length; i++) {
                let tr = document.createElement("tr")
                tr.id = "tr" + json[i][0]
                tr.innerHTML = `<td><img onclick=\"editData('${tr.id}', ${json[i][0]}, ${json[i][6]}, '${json[i][2]}', '${json[i][3]}', ${json[i][7]}, ${json[i][5]});" src="client/images/${json[i][1]}.jpg"></td><td>${json[i][2]}</td><td>${json[i][3]}</td><td>${json[i][4]}</td><td>${json[i][5]}</td><td><img src="client/images/u.gif" onclick="deleteData(${json[i][0]})"></td>`
                tbodyHelper.appendChild(tr)
            }
            tbody.innerHTML = tbodyHelper.innerHTML
        }
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("acc=get");
}