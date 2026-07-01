function setTheme(theme){

    if(theme=="purple"){
        document.documentElement.style.setProperty("--primary","#8b5cf6");
        document.documentElement.style.setProperty("--primary-dark","#7c3aed");
    }

    if(theme=="blue"){
        document.documentElement.style.setProperty("--primary","#2563eb");
        document.documentElement.style.setProperty("--primary-dark","#1d4ed8");
    }

    if(theme=="green"){
        document.documentElement.style.setProperty("--primary","#16a34a");
        document.documentElement.style.setProperty("--primary-dark","#15803d");
    }

    if(theme=="black"){
        document.documentElement.style.setProperty("--primary","#111111");
        document.documentElement.style.setProperty("--primary-dark","#000000");
    }

    localStorage.setItem("theme", theme);
}

/* ---------- PASTE STEP 4 BELOW HERE ---------- */

const savedTheme = localStorage.getItem("theme");

if(savedTheme){
    setTheme(savedTheme);
}