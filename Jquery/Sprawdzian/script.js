const products = [
    {price:"2.22", product:"kurtka"},
    {price:"3.33", product:"szalik"},
    {price:"4.44", product:"rękawiczki"},
    {price:"5.55", product:"buty"},
    {price:"6.66", product:"bluza"},
    {price:"7.77", product:"coś na wieczór"},
    {price:"7.77", product:"coś na wieczór"}
 ]


 let table = $("table")

    let trHead = $("<tr>")
    trHead.append($("<td>").css("background", "orange").text("produkt"))
    trHead.append($("<td>").css("background", "orange").text("cena/szt"))
    trHead.append($("<td>").css("background", "orange").text("liczba"))
    trHead.append($("<td>").css("background", "orange").text("wartość"))


    table.append(trHead)

    let ranges = []
    let rangeSumField = $("<td>").css("background", "orange").text("0")
    let valueSumField = $("<td>").css("background", "orange").text("0")
 for(let i = 0; i < products.length; i++){
    let tr = $("<tr>")
    let td1 = $("<td>")
        .text(products[i].product)
        .css("background", "red")
    let td2 = $("<td>")
        .text(products[i].price)
        .css("background", "purple")
    let td3 = $("<td>")
        .css("background", "palevioletred")

    let range = $("<input>")
        .prop("type", "range")
        .prop("min", "0")
        .prop("max", "5")
        .prop("value", "0")
    td3.append(range)
    ranges[i] = parseInt(range.prop("value"))

    let td4 = $("<td>")
    .css("background", "darkslategray")
    .text(products[i].price * range.prop("value"))

    range.on("change", function(){
        ranges[i] = parseInt(range.prop("value"))
        td4.text((products[i].price * range.prop("value")).toFixed(2))

        let sumRangeValue = 0
        let sumValueValue = 0
        for(let y = 0; y < ranges.length; y++){
            sumRangeValue += ranges[y]
            sumValueValue += ranges[y] * products[y].price
        }
        rangeSumField.text(sumRangeValue)
        valueSumField.text(sumValueValue.toFixed(2))
        console.log("hej")
       
    })

   

    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
    tr.append(td4)
    table.append(tr)
 }
 let trFoot = $("<tr>")
    trFoot.append($("<td>").prop("colspan", "2").css("background", "white"))
    trFoot.append(rangeSumField)
    trFoot.append(valueSumField)
    table.append(trFoot)
    

