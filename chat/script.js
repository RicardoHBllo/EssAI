bars = document.querySelector(".bars");
bars.onclick = function () {
  navBar = document.querySelector(".nav-bar");
  navBar.classList.toggle("active");
  logo = document.querySelector(".logo");
  logo.classList.toggle("active2");
}

document.addEventListener("DOMContentLoaded", function () {
  var imagenEnlace = document.getElementById("logo");

  imagenEnlace.addEventListener("click", function (event) {
    event.preventDefault();
    // Redirigir al índice
    window.location.href = "../index/index.html"; // Reemplaza con la ruta correcta del índice
  });
});



