function handleLogin(){
    var unm = document.getElementById('txtFldA').value;
    var uid = document.getElementById('txtFldB').value;

    var user;

    var ulst = getUserList();

    if (ulst[unm] != null){
        user = ulst[unm];
    }else {
        user = "ERROR";
    }

    //Test theory

    if (user != "ERROR" && user.user_id == parseInt(uid)) {
        loadPage("HomePage_LoggedIn");
        sessionStorage.setItem("user",JSON.stringify(user));
    } else if (user == "ERROR") {
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

    return request.response;


}

