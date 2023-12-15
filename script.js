var list = new Map();
var i = 0;
var textInput = document.getElementById('inpText');
var listEl = document.getElementById('taskList');
var cookieIdentifier = "task_list_cookie";

window.onload = (event)=>{
    load();

    textInput.addEventListener('keypress', (e)=>{
        if(e.key == "Enter"){
            onSubmitItem();
        }
    });
};

function onSubmitItem() {
    createItem(textInput.value);
}

function removeAll() {
    list.clear();
    drawList();
}

function createItem(text) {
    i++;
    list.set(i, text);
    drawList();
}

function removeItem(key) {
    var res = list.delete(key);
    if (res) {
        drawList();
    }
}

function load() {
    var mapString = getCookie(cookieIdentifier);
    if(mapString !== null){
        var mapArray = JSON.parse(mapString);
        list = new Map(mapArray);
        i = mapArray.length;
        drawList();
    }
}

function save() {
    var mapString = JSON.stringify(Array.from(list.entries()));
    setCookie(cookieIdentifier, mapString, 1000);
}

function drawList() {
    listEl.innerHTML = "";
    list.forEach((value, key) => {
        var el = `<li><span>${value}</span><span class="removeBtn" onclick="removeItem(${key})">x</span></li>`;
        var range = document.createRange();
        var fragment = range.createContextualFragment(el);
        listEl.appendChild(fragment);
    });
}

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}

function setCookie(name, value, daysToExpire) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    var cookieString = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;

    document.cookie = cookieString;
}