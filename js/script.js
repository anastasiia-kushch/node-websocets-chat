const socket = io();

const formElement = document.getElementById('form');
const messagesElement = document.getElementById('messages');

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target.name.value.trim();
  const message = event.target.message.value.trim();

  if (name === '' || message === '') {
    return;
  }

  socket.emit('chatMessage', JSON.stringify({ name, message }));

  formElement.reset();
});

function writeLine(text) {
  const line = document.createElement('p');
  line.innerText = text;
  messagesElement.appendChild(line);
}

socket.on('chatMessage', (message) => {
  writeLine(message);
});
