// /*=========================================
//         CrazyPT - script.js
// =========================================*/

// // Show welcome screen when page loads
// // showWelcome();

// // Load previous conversations
// loadHistory();

// // Create a new conversation immediately
// createConversation();

// // New Chat button
// // const newChatBtn = document.getElementById("newChat");

// if (newChatBtn) {

//     newChatBtn.addEventListener("click", async () => {

//         // Show welcome screen
//         // showWelcome();

//         // Create a fresh conversation
//         await createConversation();

//         // Reload sidebar
//         loadHistory();

//         // Focus input
//         document.getElementById("messageInput").focus();

//     });

// }




/*=========================================
        CrazyPT - script.js
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    // Focus the input box
    const input = document.getElementById("messageInput");

    if (input) {
        input.focus();
    }

});