function user(){
    return JSON.parse(sessionStorage.user);
}

function cheat(){
    return {'name':"Jake Trimble"};
}

function configUserBubble(){
    document.getElementById('userName').innerHTML = cheat().name;
}