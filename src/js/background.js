export function addListeners() {    
    document.getElementById("backgroundButton").addEventListener("click", function(){
        changeBackground();
    });
}

function changeBackground() {
    // alert('change background button clicked');
    var hex = Math.floor(Math.random() * 0xFFFFFF);
    let randomColor = "#" + ("000000" + hex.toString(16)).substr(-6);
    document.body.style.background = randomColor;
}

