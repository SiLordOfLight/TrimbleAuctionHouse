function configBtn(id,func) {
    document.getElementById(id).onclick = function(){
        func();
    }
}
