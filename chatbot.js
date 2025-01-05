// Respuestas predefinidas del bot
const responses = {
    menu: "Haz clic aquí para ver el menú en WhatsApp: <a href='https://wa.me/1234567890?text=Hola!%20Quiero%20ver%20el%20menú' target='_blank'>WhatsApp</a> Para hacer tus pedidos directos",
    horario: "Nuestro horario es de lunes a viernes de 10 AM a 6 PM, sábados de 12 PM a 4 PM.",
    direccion: "Estamos ubicados en La Guaira, Caribe, Caraballeda.",
};

// Función para mostrar respuestas e interactuar con botones
function showResponse(option) {
    const chatHistory = document.getElementById("chat-history");

    // Mostrar el mensaje del bot
    let responseMessage = "";

    if (option === "Menú") {
        responseMessage = responses.menu;
    } else if (option === "Horario") {
        responseMessage = responses.horario;
    } else if (option === "Dirección") {
        responseMessage = responses.direccion;
    } else {
        responseMessage = "Opción no válida.";
    }

    chatHistory.innerHTML += `<div class="message bot-response">${responseMessage}</div>`;
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Mostrar botones principales al cargar
window.onload = function () {
    const chatHistory = document.getElementById("chat-history");

    // Botones principales
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const options = ["Menú", "Horario", "Dirección"];
    options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("response-button");
        buttonsContainer.appendChild(button);

        // Añadir evento al hacer clic
        button.addEventListener("click", () => {
            showResponse(option);
        });
    });

    chatHistory.appendChild(buttonsContainer);
};
