// Respuestas predefinidas del chatbot
const responses = {
    saludo: "¡Hola! ¿En qué puedo ayudarte hoy?",
    Menu: "Aquí está nuestro menú. ¿Qué te gustaría ver? Comida, Bebidas o Postres.",
    Ubicacion: "Estamos ubicados en Avenida Principal, 123.",
    Horario: "Nuestro horario es de lunes a domingo, de 9 AM a 10 PM.",
    ayuda: "Puedo ayudarte con información sobre el menú, ubicación y horario. ¿Cómo te puedo asistir?"
};

// Mostrar la respuesta del bot y los botones interactivos
function showResponse(userMessage) {
    const chatHistory = document.getElementById("chat-history");
    chatHistory.innerHTML += `<div class="message user-message">${userMessage}</div>`; // Mostrar mensaje del usuario
    
    let responseMessage = "Lo siento, no entendí eso."; // Respuesta predeterminada
    let buttons = []; // Opciones de botones

    if (userMessage.includes("hola") || userMessage.includes("hi") || userMessage.includes("buenos días")) {
        responseMessage = responses.saludo;
        buttons = ["Menu", "Ubicacion", "Horario"];
    } else if (userMessage.includes("Menu")) {
        responseMessage = responses.Menu;
        buttons = ["Comida", "Bebidas", "Postres"];
    } else if (userMessage.includes("Ubicacion")) {
        responseMessage = responses.Ubicacion;
        buttons = ["Ver mapa", "Cómo llegar"];
    } else if (userMessage.includes("Horario")) {
        responseMessage = responses.Horario;
        buttons = ["Ver horario completo", "Preguntar sobre días festivos"];
    } else {
        responseMessage = responses.ayuda;
        buttons = ["Menu", "Ubicacion", "Horario"];
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
            showResponse(option); // Responder según opción seleccionada
        });
    });

    chatHistory.appendChild(buttonsContainer);
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
