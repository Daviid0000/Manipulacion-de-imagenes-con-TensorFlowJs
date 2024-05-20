function previewImage() {
    const img = document.getElementById('img');
    const imgCanvas = document.getElementById('imgCanvas');
    const contextoRenderizador = imgCanvas.getContext('2d');
    const image = new Image();

    //Cuando la imagen se cargue esta función se ejecutará
    image.onload = function() {
      // Vacío el elemento canvas
      contextoRenderizador.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
      
      // Calculo la escala de la imagen para adaptarlo al tamaño del canvas
      const scale = Math.min(imgCanvas.width / image.width, imgCanvas.height / image.height);
      const x = (imgCanvas.width / 2) - (image.width / 2) * scale;
      const y = (imgCanvas.height / 2) - (image.height / 2) * scale;
      
      // Renderizo la imagen en el elemento
      contextoRenderizador.drawImage(image, x, y, image.width * scale, image.height * scale);
    };

    // Obtengo la imagen y la leo 
    const file = img.files[0];
    const reader = new FileReader();
    reader.onload = function() {
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  async function processImage() {
    const img = document.getElementById('img');
    const imgCanvas = document.getElementById('imgCanvas');
    
    const image = new Image();
    image.onload = async function() {

      // Convierto la imagen en un tensor de píxeles
      const tensor = tf.browser.fromPixels(image);

      // Defino las regiones que recortaré
      const regionRecortada = tf.tensor2d([[0.25, 0.25, 0.75, 0.75]]); 
      const imagenElegida = tf.tensor1d([0]).toInt();
      const tamañoRecorte = [150, 150];

      const recortaTensor = tf.image.cropAndResize(tensor.expandDims(0), regionRecortada, imagenElegida, tamañoRecorte);

      // Convierto el tensor recortado en un array de pixeles
      const matrizPixeles = await recortaTensor.squeeze().array();

      // Renderizo la imagen recortada en el elemento canvas
      tf.browser.toPixels(matrizPixeles, imgCanvas);
    };

    // Obtengo la imagen y la leo 
    const file = img.files[0];
    const reader = new FileReader();

    reader.onload = function() {

      // Paso la URL de datos a la propiedad 'src' del objeto 'Image' que está en la variable 'image', esto permite que la imagen se cargue
      image.src = reader.result;
    };
    // proceso la imagen 
    reader.readAsDataURL(file);
  }