/*====================================================
                CrazyPT Script.js
                    PART 1
====================================================*/

/*==========================
        VARIABLES
==========================*/

let chats = [];
let currentChat = [];

/*==========================
        DOM ELEMENTS
==========================*/

const chatBody = document.getElementById("chatBody");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("messageInput");
const typing = document.getElementById("typing");
const newChatBtn = document.getElementById("newChat");

/*==========================
        UTILITIES
==========================*/

function scrollBottom(){

    if(!chatBody) return;

    chatBody.scrollTo({

        top:chatBody.scrollHeight,

        behavior:"smooth"

    });

}

/*==========================
        AUTO SCROLL
==========================*/

const observer = new MutationObserver(()=>{

    scrollBottom();

});

observer.observe(chatBody,{

    childList:true

});

/*==========================
        CURSOR GLOW
==========================*/

const cursor=document.querySelector(".cursor-glow");

if(cursor){

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});

}

/*==========================
        PROGRESS BAR
==========================*/

const progress=document.querySelector(".progress-bar");

if(progress){

window.addEventListener("scroll",()=>{

const total=document.documentElement.scrollHeight-window.innerHeight;

const current=window.scrollY;

progress.style.width=(current/total)*100+"%";

});

}

/*==========================
        AUTO RESIZE INPUT
==========================*/

if(userInput){

userInput.addEventListener("input",()=>{

userInput.style.height="auto";

userInput.style.height=userInput.scrollHeight+"px";

});

}
/*====================================================
                PART 2
        MESSAGE + TYPING FUNCTIONS
====================================================*/

/*==========================
        USER MESSAGE
==========================*/

function addUserMessage(message){

    const html = `

    <div class="message user-message fade-in">

        <div class="message-content">

            <div class="user-name">
                You
            </div>

            <div class="user-bubble">

                ${message}

            </div>

        </div>

        <div class="avatar user-avatar">

            👤

        </div>

    </div>

    `;

    chatBody.insertAdjacentHTML("beforeend",html);

    currentChat.push({

        sender:"user",

        text:message

    });

    scrollBottom();

}

/*==========================
        BOT MESSAGE
==========================*/

function addBotMessage(message){

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

                ${message}

            </div>

        </div>

    </div>

    `;

    chatBody.insertAdjacentHTML("beforeend",html);

    currentChat.push({

        sender:"bot",

        text:message

    });

    scrollBottom();

}

/*==========================
        SHOW TYPING
==========================*/

function showTyping(){

    if(typing){

        typing.style.display="flex";

        scrollBottom();

    }

}

/*==========================
        HIDE TYPING
==========================*/

function hideTyping(){

    if(typing){

        typing.style.display="none";

    }

}

/*==========================
        CLEAR INPUT
==========================*/

function clearInput(){

    userInput.value="";

    userInput.style.height="auto";

}

/*==========================
        WELCOME REMOVER
==========================*/

function removeWelcome(){

    const welcome=document.querySelector(".welcome");

    if(welcome){

        welcome.remove();

    }

}
/*====================================================
                PART 3
        FLASK API + SEND MESSAGE
====================================================*/

/*==========================
        SEND MESSAGE
==========================*/

async function sendMessage(){

    const message = userInput.value.trim();

    if(message==="") return;

    removeWelcome();

    addUserMessage(message);

    clearInput();

    showTyping();

    try{

        const response = await fetch("/chat",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                message:message

            })

        });

        if(!response.ok){

            throw new Error("Server Error");

        }

        const data = await response.json();

        hideTyping();

        addBotMessage(data.reply);

    }

    catch(error){

        hideTyping();

        console.error(error);

        addBotMessage(
            "💀 CrazyPT tripped over its own wires. Try again."
        );

    }

}

/*==========================
        FORM SUBMIT
==========================*/

if(chatForm){

    chatForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        sendMessage();

    });

}

/*==========================
        ENTER TO SEND
==========================*/

if(userInput){

    userInput.addEventListener("keydown",(e)=>{

        if(e.key==="Enter" && !e.shiftKey){

            e.preventDefault();

            sendMessage();

        }

    });

}

/*==========================
        SEND BUTTON
==========================*/

const sendBtn=document.getElementById("sendBtn");

if(sendBtn){

    sendBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        sendMessage();

    });

}
/*====================================================
                PART 4
      CHAT HISTORY + LOCAL STORAGE
====================================================*/

/*==========================
        SAVE CHATS
==========================*/

function saveChats(){

    localStorage.setItem(

        "crazyptChats",

        JSON.stringify(chats)

    );

}

/*==========================
        LOAD CHATS
==========================*/

function loadChats(){

    const data = localStorage.getItem("crazyptChats");

    if(data){

        chats = JSON.parse(data);

    }

}

/*==========================
      START NEW CHAT
==========================*/

function startNewChat(){

    if(currentChat.length>0){

        chats.push({

            id:Date.now(),

            title:currentChat[0].text.substring(0,30),

            messages:[...currentChat]

        });

        saveChats();

    }

    currentChat=[];

    chatBody.innerHTML=`

        <div class="welcome">

            <i class="fa-solid fa-brain"></i>

            <h2>Welcome to CrazyPT</h2>

            <h3 style="color:#8b5cf6;font-size:30px;">
                By - Rudra Deepak
            </h3>

            <br>

            <p>

            ☠️ Don't think this is your regular AI chatbot.<br>

            Smart enough to solve problems...<br>

            Sarcastic enough to roast your mistakes.<br><br>

            <span style="color:red;">
            BE ALERT!
            </span>

            </p>

        </div>

    `;

}

/*==========================
      NEW CHAT BUTTON
==========================*/

if(newChatBtn){

    newChatBtn.addEventListener("click",()=>{

        startNewChat();

    });

}

/*==========================
      RENDER CHAT
==========================*/

function renderChat(messages){

    chatBody.innerHTML="";

    messages.forEach(msg=>{

        if(msg.sender==="user"){

            addUserMessage(msg.text);

        }

        else{

            addBotMessage(msg.text);

        }

    });

}

/*==========================
      AUTO SAVE
==========================*/

window.addEventListener("beforeunload",()=>{

    if(currentChat.length>0){

        chats.push({

            id:Date.now(),

            title:currentChat[0].text.substring(0,30),

            messages:[...currentChat]

        });

        saveChats();

    }

});

/*==========================
      INITIALIZE
==========================*/

loadChats();



/*====================================================
                PART 5
        SIDEBAR + CHAT HISTORY
====================================================*/

/*==========================
        DOM
==========================*/

const chatList = document.getElementById("chatList");

/*==========================
        RENDER SIDEBAR
==========================*/

function renderSidebar(){

    if(!chatList) return;

    chatList.innerHTML="";

    chats.forEach((chat,index)=>{

        const item=document.createElement("div");

        item.className="chat-item";

        item.innerHTML=`

            <div class="chat-title">

                ${chat.title || "New Chat"}

            </div>

            <button class="delete-chat">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        /*=====================
            OPEN CHAT
        =====================*/

        item.querySelector(".chat-title").addEventListener("click",()=>{

            currentChat=[...chat.messages];

            renderSavedChat(currentChat);

        });

        /*=====================
            DELETE CHAT
        =====================*/

        item.querySelector(".delete-chat").addEventListener("click",(e)=>{

            e.stopPropagation();

            chats.splice(index,1);

            saveChats();

            renderSidebar();

        });

        chatList.appendChild(item);

    });

}

/*==========================
      RENDER SAVED CHAT
==========================*/

function renderSavedChat(messages){

    chatBody.innerHTML="";

    messages.forEach(msg=>{

        if(msg.sender==="user"){

            const html=`

            <div class="message user-message fade-in">

                <div class="message-content">

                    <div class="user-name">

                        You

                    </div>

                    <div class="user-bubble">

                        ${msg.text}

                    </div>

                </div>

                <div class="avatar user-avatar">

                    👤

                </div>

            </div>

            `;

            chatBody.insertAdjacentHTML("beforeend",html);

        }

        else{

            const html=`

            <div class="message bot-message fade-in">

                <div class="avatar bot-avatar">

                    🤖

                </div>

                <div class="message-content">

                    <div class="bot-name">

                        CrazyPT

                    </div>

                    <div class="bot-bubble">

                        ${msg.text}

                    </div>

                </div>

            </div>

            `;

            chatBody.insertAdjacentHTML("beforeend",html);

        }

    });

    scrollBottom();

}

/*==========================
      UPDATE SIDEBAR
==========================*/

renderSidebar();





















// gemni


document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chatForm");
    const messageInput = document.getElementById("messageInput");
    const chatBody = document.getElementById("chatBody");
    const typingIndicator = document.getElementById("typing");

    // Dynamic Textarea Auto-Resize Behavior
    messageInput.addEventListener("input", function() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });

    // Handle Messages
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const messageText = messageInput.value.trim();
        if (!messageText) return;

        // 1. Render User Bubble element
        appendMessage(messageText, "user");
        messageInput.value = "";
        messageInput.style.height = "auto"; // Reset box size height

        // 2. Trigger active animation state indicator elements
        typingIndicator.style.display = "block";
        chatBody.scrollTop = chatBody.scrollHeight;

        // Mock simulation targeting backend routing operations
        setTimeout(() => {
            typingIndicator.style.display = "none";
            appendMessage("Is that the best code layout anomaly your brain could generate today? Fascinating.", "bot");
        }, 1500);
    });

    function appendMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender, "fade-in");

        const avatar = sender === "bot" ? "🤖" : "👤";
        
        messageDiv.innerHTML = `
            <div class="user-avatar">${avatar}</div>
            <div class="${sender === 'bot' ? 'bot-bubble' : 'user-bubble'}">
                <p>${text}</p>
            </div>
        `;

        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto scroll downstream
    }
});