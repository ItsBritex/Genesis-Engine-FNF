// Crear un contenedor para Daddy Dearest
const daddyContainer = document.createElement('div');
daddyContainer.style.position = 'absolute';
daddyContainer.style.left = '6em'; // Posiciona Daddy Dearest a la izquierda
daddyContainer.style.top = '47%'; // Centrado verticalmente
daddyContainer.style.transform = 'translateY(-50%)'; // Ajusta para centrar verticalmente
daddyContainer.style.zIndex = '10'; // Asegura que el personaje esté en la parte superior

// Crear el elemento de imagen para Daddy Dearest
const daddyImage = document.createElement('img');
daddyImage.src = '../../public/gameSprites/characters/opponent/dad/dad.webp'; // Ruta de la imagen de Daddy Dearest
daddyImage.style.width = '300px'; // Ajusta el tamaño según lo necesario
daddyImage.style.height = 'auto'; // Mantiene la proporción de la imagen
daddyImage.alt = 'Daddy Dearest';

// Agregar la imagen de Daddy Dearest al contenedor
daddyContainer.appendChild(daddyImage);

// Agregar el contenedor de Daddy Dearest al cuerpo del documento
document.body.appendChild(daddyContainer);
