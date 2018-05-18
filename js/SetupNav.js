var dropdownLinks = document.getElementsByClassName('dropdownLnk');
var dropdownLinksArray = Array.from(dropdownLinks);

dropdownLinksArray.forEach(function(elem){
    var content = document.getElementById(elem.id+"-cont");

    elem.onmouseover = function(){
        content.style.display = "block";
        elem.style.backgroundColor = "#eac784";
    }

    elem.onmouseleave = function(){
        content.style.display = "none";
        elem.style.backgroundColor = "initial";
    }

    content.onmouseover = function(){
        elem.style.backgroundColor = "#eac784";
        content.style.display = "block";
    }

    content.onmouseleave = function(){
        content.style.display = "none";
        elem.style.backgroundColor = "initial";
    }
});