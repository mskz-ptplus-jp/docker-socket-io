const socket = io();

document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.querySelector('form');
  const input = document.querySelector('#m');
  const messages = document.querySelector('#messages');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', { text: input.value, source: 'server' });
      input.value = '';
    }
  });

  socket.on('chat message', (message) => {
    const item = document.createElement('li');
    console.log('client.js socket.on chat message:', message);
    item.textContent = message.text;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
});
