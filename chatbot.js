        // JavaScript aquí
        const responses = {
            "pollo": "Te recomiendo nuestro pollo a la brasa. ¡Es delicioso!",
            "carne": "La parrilla mixta es nuestra especialidad. ¿Te gustaría probarla?",
            "pasta": "Nuestra pasta al pesto es muy popular. ¿Qué opinas?",
            "hola": "¡Hola! ¿En qué te puedo ayudar hoy?",
            "default": "Lo siento, no entendí eso. ¿Puedes intentarlo de nuevo?"
        };
        document.getElementById('send-btn').addEventListener('click', () => {
            const userInput = document.getElementById('user-input').value.toLowerCase();
            const chatHistory = document.getElementById('chat-history');

            // Mostrar el mensaje del usuario
            chatHistory.innerHTML += `<p><strong>Tú:</strong> ${userInput}</p>`;

            // Obtener respuesta
            const response = responses[userInput] || responses['default'];
            chatHistory.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;

            // Limpiar el input
            document.getElementById('user-input').value = "";

            // Scroll automático hacia abajo
            chatHistory.scrollTop = chatHistory.scrollHeight;
        });
