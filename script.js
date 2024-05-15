// Cargar la imagen desde el input de archivo
document.getElementById("fileInput").addEventListener("change", (event) =>  {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = (e) => {
        var img = new Image();
        img.onload = () => {
            // Mostrar la imagen en un canvas
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            // Procesamiento de imagen con TensorFlow.js
            var tensor = tf.browser.fromPixels(canvas); // Convertir la imagen del canvas a un tensor de TensorFlow
            // Aquí puedes aplicar cualquier operación de procesamiento de imagen con TensorFlow.js
            // Por ejemplo, puedes cambiar el tamaño de la imagen, aplicar filtros, etc.
            // tensor = tf.image.resizeBilinear(tensor, [newWidth, newHeight]); // Ejemplo de cambio de tamaño

            // Mostrar la imagen procesada en el canvas
            tensor.data().then((data) => {
                var imgData = new ImageData(new Uint8ClampedArray(data), tensor.shape[1], tensor.shape[0]);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.putImageData(imgData, 0, 0);
            });
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
});
