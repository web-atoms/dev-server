const w = new WebSocket(`ws://${location.host}/listen`);

w.onmessage = (evt) => {
    var msg = JSON.parse(evt.data);
    if (msg.type === "refresh") {
        location.reload(true);
    }
};

