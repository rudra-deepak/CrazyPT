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

        item.className = "history-card";

        item.innerHTML = `

            <div class="history-top">

                <div class="history-title">
                    💬 ${chat.title}
                </div>

                <button class="delete-btn" style="font-size: 35px;">
                    🗑
                </button>

            </div>

            <div class="history-date">
                ${new Date(chat.created_at).toLocaleString()}
            </div>

        `;

        item.querySelector(".history-title")
            .addEventListener("click", () => {

                document.querySelectorAll(".history-card")
                    .forEach(card => card.classList.remove("active-chat"));

                item.classList.add("active-chat");

                loadConversation(chat._id);

            });

        item.querySelector(".delete-btn")
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

    currentConversationId = null;

    chatBody.innerHTML = welcomeScreen;

    await createConversation();

    await loadHistory();

    document.getElementById("messageInput").focus();

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

window.loadHistory = loadHistory;
window.newChat = newChat;
window.loadConversation = loadConversation;
window.deleteConversation = deleteConversation;