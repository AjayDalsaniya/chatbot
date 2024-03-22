


document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById("chat-icon");
    const chatContainer = document.getElementById("chat-container");

    // Toggle chat container visibility when chat icon is clicked
    chatIcon.addEventListener("click", function () {
        chatContainer.style.display = chatContainer.style.display === "none" ? "block" : "none";
    });

    function addMessage(sender, message) {
        const chatBox = document.getElementById("chat-box");
        const messageElement = document.createElement("div");
        messageElement.classList.add(sender + "-message");
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    }

    function sendMessage() {
        const userInput = document.getElementById("user-input").value.trim();
        if (userInput === "") return;
        addMessage("user", userInput);

        document.getElementById("user-input").value = "";

        axios
            .post("/get_bot_response",{message: userInput})
            .then((response) => {
                const botResponse = response.data.response;
                addMessage("bot", botResponse); // Add bot response to chat box
            })
            .catch((error) => console.error("Error:", error));
        }

        const sendButton = document.getElementById("send-btn");
        sendButton.addEventListener("click", sendMessage);
        const userInput = document.getElementById("user-input");
        userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});



