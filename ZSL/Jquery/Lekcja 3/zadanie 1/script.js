let topic = $("<h3>").text("T:tablice")
let button = $("<button>").text("UTWÓRZ TABELĘ")




$("body").append(topic).append(button)

button.on("click", function(){
    createTable()
    button.off("click")
})

function createTable(){
    let lps = ["lp", "cena", "produkt"]
    let ceny = ["5,60", "3,23", "7,45", "10,00", "3,20"]
    let produkty = ["chleb", "mąka", "masło","kefir", "dżem"]
    let tabela = $("<table>")
    let suma = 0
    let isFirst = true
    $("body").append(tabela)

    // Część górna tabeli - nagłówki
    let trHead = $("<tr>")
    let thLpHead = $("<th>").text(lps[0])
    let thCenyHead = $("<th>").text(lps[1])
    let thProduktyHead = $("<th>").text(lps[2])
    trHead.append(thLpHead)
    trHead.append(thCenyHead)
    trHead.append(thProduktyHead)
    tabela.append(trHead)

    // Część środkowa tabeli - contenet
    $.each(produkty, function(i){
            let trMiddle = $("<tr>")
            let tdLp = $("<td>")
            let tdCeny = $("<td>")
            let tdProdukty = $("<td>")

            
            tdLp.text(i+1)
            tdCeny.text(ceny[i])
            tdProdukty.text(produkty[i])
            trMiddle.append(tdLp)
            trMiddle.append(tdCeny)
            trMiddle.append(tdProdukty)
            tabela.append(trMiddle)

            suma += parseFloat(ceny[i].replace(",", "."))
    })

    // Część dolna tabeli - suma
    let trDown = $("<tr>")
    let tdSumaNapis = $("<td>").text("suma")
    let tdSumaWynik = $("<td>").text(suma.toString().replace(".", ","))
    tdSumaWynik.attr("colspan", "2")
    trDown.append(tdSumaNapis)
    trDown.append(tdSumaWynik)
    tabela.append(trDown)

}




