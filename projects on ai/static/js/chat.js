/*=========================================
        CrazyPT - chat.js
=========================================*/

const chatBody = document.getElementById("chatBody");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const typing = document.getElementById("typing");

let currentConversationId = null;

/*=========================================
        SCROLL
=========================================*/

function scrollBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

/*=========================================
        REMOVE WELCOME
=========================================*/

function removeWelcome() {
    const welcome = document.querySelector(".welcome");

    if (welcome) {
        welcome.remove();
    }
}

/*=========================================
        USER MESSAGE
=========================================*/

function addUserMessage(text) {

    const html = `
    <div class="message user-message fade-in">

        <div class="message-content">

            <div class="user-name">
                You
            </div>

            <div class="user-bubble">
                ${text}
            </div>

        </div>

        <div class="avatar user-avatar">
            👤
        </div>

    </div>
    `;

    chatBody.insertAdjacentHTML("beforeend", html);

    scrollBottom();
}

/*=========================================
        BOT MESSAGE
=========================================*/

function addBotMessage(text) {

    const html = `
    <div class="message bot-message fade-in">

        <div class="avatar bot-avatar">
            🤖
        </div>

        <div class="message-content">

            <div class="bot-name">
                CrazyPT
            </div>

            <div class="bot-bubble">
                ${text}
            </div>

        </div>

    </div>
    `;

    chatBody.insertAdjacentHTML("beforeend", html);

    scrollBottom();
}

/*=========================================
        TYPING
=========================================*/

function showTyping() {
    typing.style.display = "flex";
    scrollBottom();
}

function hideTyping() {
    typing.style.display = "none";
}

/*=========================================
        NEW CHAT
=========================================*/

async function createConversation() {

    try {

        const response = await fetch("/new_chat", {
            method: "POST"
        });

        const data = await response.json();

        currentConversationId = data.conversation_id;

    }

    catch (err) {

        console.error(err);

    }

}

/*=========================================
        SEND MESSAGE
=========================================*/

async function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") return;

    removeWelcome();

    addUserMessage(message);

    messageInput.value = "";

    messageInput.style.height = "auto";

    if (!currentConversationId) {

        await createConversation();

    }

    showTyping();

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: message,

                conversation_id: currentConversationId

            })

        });

        const data = await response.json();

        hideTyping();

        addBotMessage(data.reply);

    }

    catch (err) {

        hideTyping();

        console.error(err);

        addBotMessage("⚠️ Server Error");

    }

}

/*=========================================
        EVENTS
=========================================*/

chatForm.addEventListener("submit", (e) => {

    e.preventDefault();

    sendMessage();

});

messageInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        sendMessage();

    }

});

/*=========================================
        EXPORT
=========================================*/

window.createConversation = createConversation;
window.sendMessage = sendMessage;