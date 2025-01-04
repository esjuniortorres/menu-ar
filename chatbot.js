const WIT_API_TOKEN = "P6QDZKY6VIC55XENB3OFTP3JZDSF6PG6"; // Sustituye con tu token de Wit.ai

// Función para obtener la respuesta de Wit.ai
async function getWitResponse(userMessage) {
    const apiUrl = `https://api.wit.ai/message?v=20230101&q=${encodeURIComponent(userMessage)}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${WIT_API_TOKEN}`,
            },
        });
        console.log("Respuesta de Wit.ai:", response.data); // Para ver qué se recibe de Wit.ai

        const intent = response.data.intents[0]?.name || "default";
        return intent;
    } catch (error) {
        console.error("Error al conectarse con Wit.ai:", error);
        return "error";
    }
}

// Mostrar la respuesta y las opciones en el chat
async function showResponseWithButtons(userMessage) {
    const intent = await getWitResponse(userMessage);

    const chatHistory = document.getElementById("chat-history");
    chatHistory.innerHTML += `<div class="user-message">${userMessage}</div>`;

    let responseMessage = "Lo siento, no entendí eso.";
    let options = [];

    switch (intent) {
        case "menu":
            responseMessage = "Aquí está nuestro menú. ¿Qué te gustaría ver?";
            options = ["Ver opciones de comida", "Ver bebidas", "Ver postres"];
            break;
        case "ubicacion":
            responseMessage = "Estamos ubicados en Avenida Principal, 123.";
            options = ["Ver mapa", "Cómo llegar"];
            break;
        case "horario":
            responseMessage = "Nuestro horario es de lunes a domingo, 9:00 AM a 10:00 PM.";
            options = ["Ver horario completo", "Preguntar sobre días festivos"];
            break;
        default:
            responseMessage = "Lo siento, no entendí eso.";
            options = ["Ayuda", "Ver menú", "Ubicación"];
            break;
    }

    chatHistory.innerHTML += `<div class="bot-response">${responseMessage}</div>`;

    // Agregar botones para opciones
    const buttonsContainer = document.createElement("div");
    options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("response-button");
        buttonsContainer.appendChild(button);

        button.addEventListener("click", () => {
            showResponseWithButtons(option); // Responder según opción seleccionada
        });
    });

    chatHistory.appendChild(buttonsContainer);
}

// Al presionar el botón de "Enviar"
document.getElementById("send-btn").addEventListener("click", () => {
    const userMessage = document.getElementById("user-input").value.trim();
    if (userMessage) {
        showResponseWithButtons(userMessage);
        document.getElementById("user-input").value = ""; // Limpiar campo de entrada
    }
});
