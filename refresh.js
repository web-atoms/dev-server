const w = new WebSocket(`ws://${location.host}/listen`);

w.onmessage = (evt) => {
    var msg = JSON.parse(evt.data);
    if (msg.type === "refresh") {
        location.reload(true);
    }
};

function invokeReady(f) {
    if (document.readyState === "complete") {
        f();
        return;
    }
    document.addEventListener("readystatechange", function() {
        invokeReady(f);
    });
}

invokeReady(function() {
    w.send(JSON.stringify({
        type: "watch"
    }))
});