var config = {
    apiKey: "AIzaSyAtAs9F1_ZtLAncupO78KY8v6dukIfdV5s",
    authDomain: "trimbleauctionhouse.firebaseapp.com",
    databaseURL: "https://trimbleauctionhouse.firebaseio.com",
    projectId: "trimbleauctionhouse",
    storageBucket: "trimbleauctionhouse.appspot.com",
    messagingSenderId: "924102986004"
  };
  firebase.initializeApp(config);

 function writeClaimPost() {
    var db = firebase.database();
    var itemId = JSON.parse(sessionStorage.thisItem).id
    var userName = JSON.parse(sessionStorage.user).user_name
    var userRealName = JSON.parse(sessionStorage.user).name
    var userLevel = JSON.parse(sessionStorage.user).family_level

    db.ref('claims/'+itemId+'/'+userName).set({
        claimer : userRealName,
        comments : document.getElementById('inpFld').value,
        weight : userLevel
    });
 }