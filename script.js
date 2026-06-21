function timerefresh() {
    var timeElement = document.querySelector("#timecheck");
    if (timeElement) {
        timeElement.innerHTML = new Date().toLocaleString();
    }
}
setInterval(timerefresh, 1000);
timerefresh(); 

var welcomescreen = document.querySelector("#welcome");
var windowcontent = document.querySelector("#welcome .window-content");
var welcomeScreenClose = document.querySelector("#welcome .dot.close");
var welcomeScreenMinimize = document.querySelector("#welcome .dot.minimize");
var welcomeScreenMaximize = document.querySelector("#welcome .dot.maximize");
var app1 = document.querySelector("#app1");

var trackStatus = document.querySelector(".audio-track-info span:last-child");
var osAudio = document.getElementById("os-audio");
var audioBtn = document.getElementById("audio-control-btn");


function Closewindow(element) {
    element.style.display = "none";
}

function Openwindow(element) {
    element.style.display = "block"; 
    if (windowcontent) {
        windowcontent.style.display = ""; 
    }
}

if (welcomeScreenClose) {
    welcomeScreenClose.addEventListener("click", function() {
        Closewindow(welcomescreen);
    });
}

if (welcomeScreenMinimize && windowcontent) {
    welcomeScreenMinimize.addEventListener("click", function() {
        windowcontent.style.display = "none";
    });
}

if (welcomeScreenMaximize && windowcontent) {
    welcomeScreenMaximize.addEventListener("click", function() {
        windowcontent.style.display = "";
    });
}

// App Launcher Toggle
if (app1 && welcomescreen) {
    app1.addEventListener("click", function() {
        if (welcomescreen.style.display === "none") {
            welcomescreen.style.display = "block"; 
        } else {
            welcomescreen.style.display = "none";
        }
    });
}     

function dragElement(element) {
    var initialX = 0, initialY = 0, currentX = 0, currentY = 0;
    element.onmousedown = startDragging;
    
    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();

        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = elementDrag; 
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

if (welcomescreen) {
    dragElement(welcomescreen);
}

if (audioBtn && osAudio) {
    audioBtn.addEventListener("click", function() {
        if (osAudio.paused) {
            osAudio.play();
            audioBtn.innerText = "\u23F8"; // ⏸
            if (trackStatus) {
                trackStatus.innerHTML = "Music playing ( lovely )";
                trackStatus.style.color = "#888888";
            }
        } else {
            osAudio.pause();
            audioBtn.innerText = "\u25B6"; // ▶
            if (trackStatus) {
                trackStatus.innerHTML = "Music Paused";
                trackStatus.style.color = "#ff5f56";
            }
        }
    });
}