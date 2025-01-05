// Respuestas predefinidas del bot
const responses = {
    horario: "Nuestro horario es de lunes a viernes de 10 AM a 6 PM, sábados de 12 PM a 4 PM.",
    direccion: "Estamos ubicados en La Guaira, Caribe, Caraballeda.",
};

// Función para manejar la respuesta según el botón presionado
function showResponse(option) {
    const chatHistory = document.getElementById("chat-history");

    // Crear el mensaje del bot según la opción seleccionada
    let responseMessage = "";

    if (option === "Ver Menú") {
        // Abrir el enlace de WhatsApp directamente
        window.open("https://wa.me/1234567890?text=Hola!%20Quiero%20ver%20el%20menú", "_blank");
        return;
    } else if (option === "Ver Horario") {
        responseMessage = responses.horario;
    } else if (option === "Nuestra Dirección") {
        responseMessage = responses.direccion;
    } else {
        responseMessage = "Opción no válida.";
    }

    // Verificar si el mensaje ya existe en el historial del chat
    const existingMessages = Array.from(chatHistory.getElementsByClassName("bot-response"));
    const isDuplicate = existingMessages.some(msg => msg.textContent === responseMessage);

    if (!isDuplicate) {
        // Añadir la respuesta del bot al historial del chat solo si no está duplicada
        chatHistory.innerHTML += `<div class="message bot-response">${responseMessage}</div>`;
    }

    // Volver a agregar los botones después de cada interacción
    renderButtons(chatHistory);

    // Asegurar el scroll al final del chat
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Función para mostrar los botones principales
function renderButtons(container) {
    // Limpiar botones existentes para evitar duplicados
    const existingButtons = container.querySelector(".buttons-container");
    if (existingButtons) {
        existingButtons.remove();
    }

    // Crear contenedor para los botones
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    // Opciones de botones
    const options = ["Ver Menú", "Ver Horario", "Nuestra Dirección"];
    options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("response-button");
        buttonsContainer.appendChild(button);

        // Agregar evento de clic para cada botón
        button.addEventListener("click", () => {
            showResponse(option);
        });
    });

    // Añadir los botones al contenedor principal
    container.appendChild(buttonsContainer);
}

// Inicializar el chatbot al cargar la página
window.onload = function () {
    const chatHistory = document.getElementById("chat-history");
    renderButtons(chatHistory);
};
