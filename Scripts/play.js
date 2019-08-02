var params = new URLSearchParams(window.location.search)
var gameFrame = document.getElementById("gameFrame")

gameFrame.setAttribute("src", "game.html?" + params)
