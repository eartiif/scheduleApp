const menu = document.querySelector(".menu");
const content = document.querySelector(".container");
const menuIcon = document.querySelector(".menuIcon");
let startingX;
let isOpen = false;

function menuOpen() {
    menuIcon.style.display = "none";
    content.style.filter = "blur(8px)";
}
function menuClose() {
    menuIcon.style.display = "block";
    content.style.filter = "none";
}
//Кнопки
function openMenu() {
    menu.style.left = 0 + '%';
    menuOpen();
}

function closeMenu() {
    menu.style.left = -100 + '%';
    menuClose();
}

//Свайпы
function contentHandleTouchStart(evt) {
    startingX = evt.touches[0].clientX;
    console.log("startingPoint = " + startingX);
}

function contentHandleTouchMove(evt) {
    var touch = evt.touches[0];
    var alpha = 0.2;
    var change = (startingX - touch.clientX) * alpha;

    if (change > 0) {
        return;
    }
    var maxLeft = 0;
    if ((-100 - change) > maxLeft) {
        menu.style.left = maxLeft + '%';
        menuOpen();
    } else {
        menu.style.left = (-100 - change) + '%';
        menuClose();
    }
    evt.preventDefault();
}

function contentHandleTouchEnd(evt) {
    var change = startingX - evt.changedTouches[0].clientX;
    var treshold = screen.width / 2;

    if (-change < treshold) {
        menu.style.left = -100 + '%';
        menuClose();
    } else {
        menu.style.left = 0 + '%';
        menuOpen();
        isOpen = true;
        console.log(isOpen);
    }
}

function menuConteinerHandleTouchStart(evt) {
    startingX = evt.touches[0].clientX;
}

function menuConteinerHandleTouchMove(evt) {
    var touch = evt.touches[0];
    var alpha = 0.2;
    var change = (touch.clientX - startingX) * alpha;

    if (change > 0) {
        menuClose();
        return;
    }

    var minLeft = -100;

    if (change < minLeft) {
        menu.style.left = minLeft + '%';
        menuClose();
    } else {
        menu.style.left = (change) + '%';
        menuOpen();
    }
}

function menuConteinerTouchEnd(evt) {
    var change = evt.changedTouches[0].clientX - startingX;
    var treshold = screen.width / 4;

    if (-change < treshold) {
        menu.style.left = 0 + '%';
        menuOpen();

    } else {
        menu.style.left = -100 + '%';
        menuClose();
        isOpen = false;
        console.log(isOpen);
    }
}