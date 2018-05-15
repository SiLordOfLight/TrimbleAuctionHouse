function handleLogin(ulst){
    var unm = document.getElementById('txtFldA').value;
    var uid = document.getElementById('txtFldB').value;

    var user;

    console.log(ulst);
    var userList = JSON.parse(ulst);

    user = userList[unm];

    if (typeof(user) != 'undefined' && user.user_id == parseInt(uid)) {
        loadPage("HomePage_LoggedIn");
        sessionStorage.setItem("user",JSON.stringify(user));
    } else if (typeof(user) == 'undefined') {
        document.getElementById('txtFldA').value = "Invalid Username";
    } else if (user.user_id != parseInt(uid)) {
        document.getElementById('txtFldB').value = "Invalid User ID";
    }

}

function getUserList() {
    var locPieces, jsonLoc;
    locPieces = document.location.href.split('/');
    locPieces.pop();
    locPieces.pop();
    locPieces.push("data/users/userList.json");
    jsonLoc = locPieces.join("/");

    var request = new XMLHttpRequest();
    request.open('GET', jsonLoc);
    request.responseType = 'json';
    request.send();

    var retVal = "Fish";

    request.onload = function() {
      handleLogin(JSON.stringify(request.response));
    }
}

