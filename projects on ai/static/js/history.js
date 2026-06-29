/*=========================================
        CrazyPT - history.js
=========================================*/

const chatList = document.getElementById("chatList");
const newChatBtn = document.getElementById("newChat");

/*=========================================
        LOAD HISTORY
=========================================*/

async function loadHistory() {

    try {

        const response = await fetch("/history");

        const chats = await response.json();

        renderHistory(chats);

    }

    catch (err) {

        console.error(err);

    }

}

/*=========================================
        RENDER SIDEBAR
=========================================*/

function renderHistory(chats) {

    chatList.innerHTML = "";

    chats.forEach(chat => {

        const item = document.createElement("div");

        item.className = "chat-item";

        item.innerHTML = `

            <div class="chat-title">

                💬 ${chat.title}

            </div>

            <button class="delete-chat">

                🗑️

            </button>

        `;

        item.querySelector(".chat-title")
            .addEventListener("click", () => {

                loadConversation(chat._id);

            });

        item.querySelector(".delete-chat")
            .addEventListener("click", (e) => {

                e.stopPropagation();

                deleteConversation(chat._id);

            });

        chatList.appendChild(item);

    });

}

/*=========================================
        LOAD CONVERSATION
=========================================*/

async function loadConversation(id) {

    try {

        currentConversationId = id;

        const response =
        await fetch(`/conversation/${id}`);

        const messages =
        await response.json();

        chatBody.innerHTML = "";

        messages.forEach(msg => {

            addUserMessage(msg.question);

            addBotMessage(msg.answer);

        });

    }

    catch (err) {

        console.error(err);

    }

}

/*=========================================
        NEW CHAT
=========================================*/

async function newChat() {

    chatBody.innerHTML = welcomeScreen;

    await createConversation();

    loadHistory();

}

/*=========================================
        DELETE CHAT
=========================================*/

async function deleteConversation(id) {

    if (!confirm("Delete this conversation?"))
        return;

    try {

        await fetch(`/conversation/${id}`, {

            method: "DELETE"

        });

        loadHistory();

    }

    catch (err) {

        console.error(err);

    }

}

/*=========================================
        BUTTON
=========================================*/

newChatBtn.addEventListener("click", () => {

    newChat();

});

/*=========================================
        INITIALIZE
=========================================*/

loadHistory();