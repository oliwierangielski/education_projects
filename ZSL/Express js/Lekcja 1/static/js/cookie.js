let cookie = document.cookie;
cookie = cookie.split('; ')
let lastDate = cookie[0].split('=').pop();
let firstDate = cookie[1].split('=').pop();

function writeInscription() {


let nowTime = Date.now();
lastDateOffset = nowTime - lastDate
firstDateOffset = nowTime - firstDate


    firstDateOffset = new Date(firstDateOffset)
    lastDateOffset = new Date(lastDateOffset)


    let text = "Witaj, pierwszy raz byłeś na naszej stronie " + firstDateOffset.getMinutes() + " minut, "+ firstDateOffset.getSeconds() + " sekund temu\nostatni raz na sronie byłeś " + lastDateOffset.getMinutes() + " minut, "+ lastDateOffset.getSeconds() + " sekund temu"
    document.getElementById('inscription').innerText = text
}
writeInscription()
setInterval(writeInscription, 1000)