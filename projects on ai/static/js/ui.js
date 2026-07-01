/*=========================================
            CrazyPT - ui.js
=========================================*/

const welcomeScreen = `

<div class="welcome-card fade-in float">
    <i class="fa-solid fa-brain glow-text"
       style="font-size:65px;color:#7C3AED;margin-bottom:20px;">
    </i>

    <h1>Welcome to CrazyPT</h1>

    <h3 style="color:#8b5cf6;font-size:30px;">
        By - Rudra Deepak
    </h3>

    <br>

    <p>
        ☠️ Don't think this is your regular AI chatbot.
        This is a chaotic, crazy AI companion that will help you solve
        problems in a highly sarcastic way.<br>

        <strong>
            Smart enough to solve your problems...
            sarcastic enough to roast your mistakes.
        </strong>

        <br><br>

        <span style="color:#ff5555;font-weight:bold;">
            ⚠️ BE ALERT:
        </span>

        This interface is definitely not for the faint-hearted.
        Anyway, that's what makes it fun, right?
    </p>

    <div class="quick-grid">

        <div class="quick-card lift">

            <h3>💻 Fix My Code</h3>

            <p>
                "Review my messy loop architecture and roast it."
            </p>

        </div>

        <div class="quick-card lift">

            <h3>💡 Dumb Idea Check</h3>

            <p>
                "I have a business idea. Tell me why it'll fail miserably."
            </p>

        </div>

    </div>

</div>

`;


/*=========================================
            SHOW WELCOME
=========================================*/

function showWelcome() {

    chatBody.innerHTML = welcomeScreen;

}


/*=========================================
            CLEAR CHAT
=========================================*/

function clearChat() {

    chatBody.innerHTML = "";

}


/*=========================================
            SCROLL
=========================================*/

function scrollToBottom() {

    chatBody.scrollTop = chatBody.scrollHeight;

}


/*=========================================
            LOADING
=========================================*/

function showTyping() {

    typing.style.display = "flex";

    scrollToBottom();

}

function hideTyping() {

    typing.style.display = "none";

}


/*=========================================
            EXPORTS
=========================================*/

window.showWelcome = showWelcome;
window.clearChat = clearChat;
window.scrollToBottom = scrollToBottom;
window.showTyping = showTyping;
window.hideTyping = hideTyping;