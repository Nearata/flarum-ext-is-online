import app from 'flarum/app';
const isOnline = require('is-online');

app.initializers.add('nearata/flarum-ext-is-online', () => {
    const isOnlineElement = document.createElement('div');

    isOnlineElement.id = 'is-online-alert';
    isOnlineElement.innerText = app.translator.trans('nearata-is-online.forum.offline_text');

    document.body.appendChild(isOnlineElement);

    setInterval(() => {
        (async () => {
            const ok = await isOnline();
            if(ok) {
                isOnlineElement.classList.remove('offline');
            } else {
                isOnlineElement.classList.add('offline');
            }
        })();
    }, 1000);
});
