// Respuestas predefinidas del bot
const responses = {
    saludo: "¡Hola! ¿En qué puedo ayudarte?",
    menu: "Aquí está nuestro menú: Pizza, Hamburguesa, Pasta.",
    ubicacion: "Estamos ubicados en la calle principal, cerca del parque central.",
    horario: "Nuestro horario es de lunes a viernes de 10 AM a 6 PM.",
    ayuda: "Por favor, selecciona una de las opciones: Menú, Ubicación, Horario.",
    menuComida: "Aquí están nuestras opciones de comida: Pizza, Hamburguesa, Pasta.",
    pizzaDetalles: "Tenemos pizza de pepperoni, margarita y vegetariana. Precios: $10 - $15.",
    menuBebidas: "Ofrecemos refrescos, jugos naturales y agua. Precios: $2 - $5.",
    menuPostres: "Tenemos helado, torta de chocolate y flan. Precios: $3 - $6.",
    mapa: "Puedes ver nuestro mapa en el siguiente enlace: [enlace].",
    horarioCompleto: "Nuestro horario completo es de lunes a viernes de 10 AM a 6 PM, sábados de 12 PM a 4 PM.",
};

// Función para mostrar la respuesta del bot y los botones
function showResponse(userMessage) {
    const chatHistory = document.getElementById("chat-history");
    chatHistory.innerHTML += `<div class="message user-message">${userMessage}</div>`; // Mostrar mensaje del usuario
    
    let responseMessage = "Lo siento, no entendí eso."; // Respuesta predeterminada
    let buttons = []; // Opciones de botones

    // Verificar si el mensaje del usuario es uno de los saludos esperados
    if (userMessage.includes("hola") || userMessage.includes("hi") || userMessage.includes("buenos días")) {
        responseMessage = responses.saludo;
        buttons = ["Menú", "Ubicación", "Horario"];
    } else if (userMessage.includes("menú")) {
        responseMessage = responses.menu;
        buttons = ["Comida", "Bebidas", "Postres"];
    } else if (userMessage.includes("ubicación")) {
        responseMessage = responses.ubicacion;
        buttons = ["Ver mapa", "Cómo llegar"];
    } else if (userMessage.includes("horario")) {
        responseMessage = responses.horario;
        buttons = ["Ver horario completo", "Preguntar sobre días festivos"];
    } else {
        responseMessage = responses.ayuda;
        buttons = ["Menú", "Ubicación", "Horario"];
    }

    // Mostrar la respuesta del bot
    chatHistory.innerHTML += `<div class="message bot-response">${responseMessage}</div>`;

    // Crear botones interactivos
    const buttonsContainer = document.createElement("div");
    buttons.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("response-button");
        buttonsContainer.appendChild(button);

        // Añadir evento al hacer clic en los botones
        button.addEventListener("click", () => {
            loadButtonResponse(option); // Llamar a la función para cargar la respuesta al presionar el botón
        });
    });

    chatHistory.appendChild(buttonsContainer);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Desplazarse al final del chat
}

// Función para cargar la respuesta de cada opción cuando se presiona un botón
function loadButtonResponse(option) {
    const chatHistory = document.getElementById("chat-history");

    // Mostrar la respuesta correspondiente según el botón que se presionó
    let responseMessage = "";
    let buttons = [];

    // Verificar la opción seleccionada y asignar las respuestas correspondientes
    if (option === "Comida") {
        responseMessage = responses.menuComida;
        buttons = ["Pizza", "Hamburguesa", "Pasta"];
    } else if (option === "Pizza") {
        responseMessage = responses.pizzaDetalles;
        buttons = []; // No más botones, mostrar detalles
    } else if (option === "Bebidas") {
        responseMessage = responses.menuBebidas;
    } else if (option === "Postres") {
        responseMessage = responses.menuPostres;
    } else if (option === "Ver mapa") {
        responseMessage = responses.mapa;
    } else if (option === "Ver horario completo") {
        responseMessage = responses.horarioCompleto;
    } else if (option === "Preguntar sobre días festivos") {
        responseMessage = "Estamos cerrados solo los domingos y días festivos oficiales.";
    } else {
        responseMessage = "Opción no válida.";
    }

    // Mostrar la nueva respuesta
    chatHistory.innerHTML += `<div class="message bot-response">${responseMessage}</div>`;
    
    // Si se presionó un botón como "Pizza", muestra más detalles o botones adicionales
    if (buttons.length > 0) {
        const buttonsContainer = document.createElement("div");
        buttons.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("response-button");
            buttonsContainer.appendChild(button);

            button.addEventListener("click", () => {
                loadButtonResponse(option);
            });
        });
        chatHistory.appendChild(buttonsContainer);
    }

    chatHistory.scrollTop = chatHistory.scrollHeight; // Desplazarse al final del chat
}

// Evento para enviar el mensaje
document.getElementById("send-btn").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput) {
        showResponse(userInput);
        document.getElementById("user-input").value = ""; // Limpiar campo de entrada
    }
});
