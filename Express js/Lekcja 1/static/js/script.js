let container = document.getElementById('container');
for(let i = 0; i < 50; i++){
    let link = document.createElement('a');
    link.setAttribute('href', "/product/" + i );
    link.innerText = "product id = " + i;
    container.appendChild(link);
}