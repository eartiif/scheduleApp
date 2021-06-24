var blurBtn = document.getElementById("blurBtn");
var themeBtn = document.getElementById("themeBtn");
var notificationBtn = document.getElementById("notificationBtn");

function btnActivator() {
    /*Проверка активирована ли кнопка визуала*/
    var blur = localStorage["blurBtnActivated"];
    if (blur == null) {
        blurBtn.checked = false;
    }
    else {
        blurBtn.checked = true;
    }
}

function blurControl() {
    /*Управление фильтром*/
    var blur = localStorage["blurBtnActivated"];
    if (blur == null) {
        localStorage["blurBtnActivated"] = "true";
    }
    else {
        delete localStorage["blurBtnActivated"];
    }
}

function themeControl() {
    //Управление темой
}

function notificationControl() {
    //Упралеие уведомлениями
}


