let button = document.getElementById("changeStyle")
let allDivs = document.querySelectorAll(".product")
// if (!Array.isArray(allDivs))
//     allDivs = [allDivs]

console.log(allDivs.length) 
button.addEventListener("click", function(){
        console.log(allDivs.length)
        allDivs.forEach(function(item, index){

            


        })
        for(let i = 0; i < allDivs.length; i++){
            console.log("hej")
            if(allDivs[i].classList.length == 2){
                allDivs[i].classList.remove("product-block")
            } else {
                allDivs[i].classList.add("product-block")
            }
        }
    
})