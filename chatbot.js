// Respuestas predefinidas del chatbot
const responses = {
    saludo: "¡Hola! ¿En qué puedo ayudarte hoy?",
    menu: "Aquí está nuestro menú. ¿Qué te gustaría ver? Comida, Bebidas o Postres.",
    ubicacion: "Estamos ubicados en Avenida Principal, 123.",
    horario: "Nuestro horario es de lunes a domingo, de 9 AM a 10 PM.",
    ayuda: "Puedo ayudarte con información sobre el menú, ubicación y horario. ¿Cómo te puedo asistir?",

    // Información adicional que se muestra cuando se presiona un botón específico
    menuComida: "Nuestro menú de comida incluye: 🍕 Pizzas, 🍔 Hamburguesas, 🍝 Pastas.",
    menuBebidas: "Las bebidas disponibles son: 🥤 Jugos, 🍻 Cerveza, ☕ Café.",
    menuPostres: "Postres disponibles: 🍰 Pastel de chocolate, 🍮 Flan, 🍨 Helado.",
    mapa: "Aquí está el mapa para que llegues a nuestra ubicación. [Enlace al mapa].",
    horarioCompleto: "El horario es de lunes a domingo, 9 AM - 10 PM. Los días festivos abrimos a las 12 PM."
};

// Mostrar la respuesta del bot y los botones interactivos
function showResponse(userMessage) {
    const chatHistory = document.getElementById("chat-history");
    chatHistory.innerHTML += `<div class="message user-message">${userMessage}</div>`; // Mostrar mensaje del usuario
    
    let responseMessage = "Lo siento, no entendí eso."; // Respuesta predeterminada
    let buttons = []; // Opciones de botones

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

    chatHistory.innerHTML += `<div class="message bot-response">${responseMessage}</div>`; // Mostrar respuesta del bot

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

// Función que carga la respuesta cuando se presiona un botón
function loadButtonResponse(option) {
    const chatHistory = document.getElementById("chat-history");

    // Mostrar la respuesta correspondiente según el botón que se presionó
    let responseMessage = "";
    let buttons = [];

    if (option === "Comida") {
        responseMessage = responses.menuComida;
    } else if (option === "Bebidas") {
        responseMessage = responses.menuBebidas;
    } else if (option === "Postres") {
        responseMessage = responses.menuPostres;
    } else if (option === "Ver mapa") {
        responseMessage = responses.mapa;
    } else if (option === "Ver horario completo") {
        responseMessage = responses.horarioCompleto;
    } else {
        responseMessage = "Opción no válida.";
    }

    // Mostrar la nueva respuesta
    chatHistory.innerHTML += `<div class="message bot-response">${responseMessage}</div>`;
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

