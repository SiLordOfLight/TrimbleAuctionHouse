function loadPage(pageName) {
  var locPieces, newPath;

  locPieces = document.location.href.split('/');

  locPieces.pop();

  locPieces.push(pageName+".html");

  newPath = locPieces.join("/");

  document.location.href = newPath;

}