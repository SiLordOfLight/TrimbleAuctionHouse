var scripts = document.getElementsByTagName("script"),
    src = scripts[scripts.length-1].src;

var locPieces;
locPieces = src.split('/');
locPieces.pop();
locPieces.pop();

locPieces.push("data/images/itemImages/");
var imagesLoc = locPieces.join("/");
locPieces.pop();

locPieces.push("data/items/");
var dataLoc = locPieces.join("/");



class ScrollSession {
    constructor(category,catData) {
        this.category = category;
        this.current_index = 1;
        this.max_index = catData;
        this.current_image = imagesLoc+category+"_"+1;
    }

    next(){
        if (this.current_index < this.max_index) {
            this.current_index += 1;
            this.current_image = this.current_image.substring(0, this.current_image.length-1) + this.current_index;
        } else {
            this.current_index = 1;
            this.current_image = this.current_image.substring(0, this.current_image.length-1) + 1;
        }
    }
    prev(){
        if (this.current_index > 1) {
            this.current_index -= 1;
            this.current_image = this.current_image.substring(0, this.current_image.length-1) + this.current_index;
        } else {
            this.current_index = this.max_index;
            this.current_image = this.current_image.substring(0, this.current_image.length-1) + 1;
        }
    }

    save(){
        var myData = {"category":this.category, "current_index":this.current_index, "max_index":this.max_index, "current_image":this.current_image};
        sessionStorage.setItem('scrollSession',JSON.stringify(myData));
    }

    static read(src){
        var obj = JSON.parse(src);
        var ret = new ScrollSession(obj.category);
        ret.current_index = obj.current_index;
        ret.max_index = obj.max_index;
        ret.current_image = obj.current_image;

        return ret;
    }
}

function init(category) {
    var request = new XMLHttpRequest();
    request.open('GET', dataLoc+"categorySummary.json");
    request.responseType = 'json';
    request.send();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            beginScrollSession(category,request.response[category].item_count);
            sessionStorage.setItem('categoryData',JSON.stringify(request.response));
        }
    }
}

function beginScrollSession(category,catData) {
    var session = new ScrollSession(category,catData);
    session.save();
}

function sessionNext() {
    var session = ScrollSession.read(sessionStorage.scrollSession);

    session.next();

    session.save();

    setItemData(session);

    document.getElementById('sbmtBtn').disabled = false;
}

function sessionBack() {
    var session = ScrollSession.read(sessionStorage.scrollSession);

    session.prev();

    session.save();

    setItemData(session);

    document.getElementById('sbmtBtn').disabled = false;
}

function setupPage(data,imgid) {
    document.getElementById('dataBox').innerHTML = data;
    document.getElementById('imgBox').src = imagesLoc+imgid+".jpg";
}

function fetchItemData(){
    var session = ScrollSession.read(sessionStorage.scrollSession)

    var request = new XMLHttpRequest();
    request.open('GET', dataLoc+session.category+"/item-"+session.current_index+".json");
    request.responseType = 'json';
    request.send();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            sessionStorage.setItem('thisItem',JSON.stringify(request.response))
            setupPage(request.response.data,request.response.id);
        }
    }
}

function setItemData(session) {
    var request = new XMLHttpRequest();
    request.open('GET', dataLoc+session.category+"/"+session.current_index+".json");
    request.responseType = 'json';
    request.send();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            sessionStorage.setItem('thisItem',JSON.stringify(request.response))
            setupPage(request.response.data,request.response.id);
        }
    }
}

function handlePostMade() {
    document.getElementById('inpFld').value = "";
    document.getElementById('sbmtBtn').disabled = true;
}

