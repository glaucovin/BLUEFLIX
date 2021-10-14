var modal = document.getElementById('formulario');

var btn = document.getElementsByClassName('plus')[0];

var close = document.getElementsByClassName("close")[0];

var edit = document.getElementsByClassName('btn btn-primary')[0];

var input = document.getElementsByTagName("input");

var option = document.getElementsByTagName("option");

function clearContents(){
    modal.style.top = "-200%";
    modal.style.background = "rgba(0,0,0,0.0)";
    modal.style.zIndex = -1;
    document.getElementById('title-form').innerHTML = "Adicionar filme";
    document.getElementsByName("action")[0].value = "create";
    for(x=0;x<input.length-1;x++){
        input[x].value = "";
    }
    for(x=0;x<option.length;x++){
    	option[x].selected = false;
    }
 }

btn.onclick = function() {
    modal.style.zIndex = 3000;modal.style.top = 0;
    modal.style.background = "#2500fa60";
    modal.style.alignContent = "center";modal.style.padding = "3rem";
}

// edit.getAttribute = function() {
//     modal.style.zIndex = 3000;modal.style.top = 0;
//     modal.style.background = "#2500fa60";
//     modal.style.alignContent = "center";modal.style.padding = "3rem";

// }

window.onclick = function(event) {
    if (event.target == modal) {
        clearContents();
    }

}