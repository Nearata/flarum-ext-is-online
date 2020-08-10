import app from 'flarum/app';

app.initializers.add('nearata/flarum-ext-is-online', () => {
    window.addEventListener('load', () => {
        const isOnlineElement = document.createElement('div');

        isOnlineElement.id = 'is-online-alert';
        isOnlineElement.innerText = app.translator.trans('nearata-is-online.forum.offline_text');

        document.body.appendChild(isOnlineElement);

        let ws;
        let spawned = false;
        function connect() {
            ws = new WebSocket('wss://echo.websocket.org/');

            ws.onopen = () => {
                isOnlineElement.classList.remove('offline');
            };

            ws.onerror = () => {
                if (ws) {
                    ws.close();
                    ws = null;
                }

                if (!spawned) {
                    spawned = true;
                    isOnlineElement.classList.add('offline');
                }

                setTimeout(() => {
                    spawned = false;
                    connect();
                }, 5000);
            };
        }

        connect();
    });
});
