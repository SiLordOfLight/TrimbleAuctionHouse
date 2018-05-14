function handleLogin(){
    var unm = document.getElementById('txtFldA').value;
    var uid = document.getElementById('txtFldB').value;

    var ulst = getUserList();
    var user;

    if (! typeof(ulst) == 'undefined'){
        user = ulst[unm];
    }else {
        user = "ERROR";
    }

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
    var retVal;

    $.ajax({
      url : "../data/users/userList.json",
      dataType: "text",
      success : function (data) {
          retVal = JSON.parse(data);
      }
    });

    return retVal;
}

