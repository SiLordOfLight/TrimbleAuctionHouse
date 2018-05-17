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

var request = new XMLHttpRequest();
request.open('GET', dataLoc+"categorySummary.json");
request.responseType = 'json';
request.send();

var catData;

request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        catData = request.response;
    }
}

class ScrollSession {
    constructor(category) {
        this.category = category;
        this.current_index = 1;
        this.max_index = catData[category].item_count;
        this.current_image = imagesLoc+category+"_"+1;
    }

    next(){
        if (this.current_index <= this.max_index) {
            this.current_index += 1;
            this.current_image = this.current_image.substring(0, this.current_image.length-1) + this.current_index;
        } else {
            this.current_index = 1;
            this.current_image = this.current_image.substring(0, this.current_image.length-1) + 1;
        }
    }

    save(){
        var myData = {"category":this.category, "current_index":this.current_index, "max_index":this.max_index, "current_image":this.current_image};
        sessionStorage.write('scrollSession',JSON.stringify(myData));
    }

    static read(){
        var obj = JSON.parse(sessionStorage.scrollSession);
        var ret = new ScrollSession(obj.category);
        ret.current_index = obj.current_index;
        ret.max_index = obj.max_index;
        ret.current_image = obj.current_image;

        return ret;
    }
}

function beginScrollSession(category) {
    var session = new ScrollSession(category);
    session.save();
}

function next() {
    var session = ScrollSession.read();

    session.next();

    session.save();
}

function setupPage(data,imgid) {
    document.getElementById('dataBox').innerHTML = data;
    document.getElementById('imgBox').src = imagesLoc+imgid+".jpg";
}

function fetchItemData(){
    var session = ScrollSession.read()

    var request = new XMLHttpRequest();
    request.open('GET', dataLoc+session.category+"item-"+session.current_index);
    request.responseType = 'json';
    request.send();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            setupPage(request.response.data,request.response.id);
        }
    }
}

