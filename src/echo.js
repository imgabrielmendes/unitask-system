import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    wsHost: import.meta.env.VITE_PUSHER_HOST,
    wsPort: import.meta.env.VITE_PUSHER_PORT,
    forceTLS: false, // Obrigatório para HTTP (Soketi local)
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    cluster: 'mt1', // ADICIONE ISSO AQUI (pode ser qualquer string)
});