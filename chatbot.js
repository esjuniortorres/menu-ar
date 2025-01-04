// Token de acceso de Wit.ai
const WIT_API_TOKEN = "UNV6QFWEWENONOVTPU4RHWXGKOJZZM2F";

// Función para enviar el mensaje a Wit.ai y obtener la respuesta
async function getWitResponse(userMessage) {
    const apiUrl = `https://api.wit.ai/message?v=20230101&q=${encodeURIComponent(userMessage)}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${WIT_API_TOKEN}`,
            },
        });

        const entities = response.data.entities || {};
        const intent = response.data.intents[0]?.name || "default";

        // Procesar respuesta según el intent
        switch (intent) {
            case "menu":
                return "Aquí está nuestro menú: [enlace al menú]";
            case "ubicacion":
                return "Estamos ubicados en Avenida Principal, 123.";
            case "horario":
                return "Nuestro horario es de lunes a domingo, 9:00 AM a 10:00 PM.";
            default:
                return "Lo siento, no entendí eso. ¿Puedes reformular tu pregunta?";
        }
    } catch (error) {
        console.error("Error al conectarse con Wit.ai:", error);
        return "Hubo un problema al procesar tu solicitud. Intenta de nuevo más tarde.";
    }
}

// Función para manejar el input del usuario
async function handleUserInput(input) {
    const response = await getWitResponse(input);
    console.log("Bot:", response);
    return response;
}

// Ejemplo de uso
handleUserInput("¿Dónde están ubicados?").then(console.log);
