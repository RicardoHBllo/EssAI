document.addEventListener("DOMContentLoaded", function() {
    var imagenEnlace = document.getElementById("logo");
  
    imagenEnlace.addEventListener("click", function(event) {
      event.preventDefault(); 
      // Redirigir al índice
      window.location.href = "index.html"; // Reemplaza con la ruta correcta del índice
    });
  });

  
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("entrada").scrollIntoView();
  var video = document.querySelector('video');
    video.load();
    video.play();
});