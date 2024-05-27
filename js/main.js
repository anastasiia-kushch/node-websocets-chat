document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('nameModal');
  const saveNameButton = document.getElementById('saveName');
  const usernameInput = document.getElementById('username');
  const chatApp = document.getElementById('chatApp');
  const formElement = document.getElementById('form');
  const messagesElement = document.getElementById('messages');

  modal.style.display = 'block';

  saveNameButton.addEventListener('click', (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
      localStorage.setItem('chatUsername', username);
      modal.style.display = 'none';
      chatApp.style.display = 'block';
    }
  });

  const savedUsername = localStorage.getItem('chatUsername');
  if (savedUsername) {
    usernameInput.value = savedUsername;
    modal.style.display = 'none';
    chatApp.style.display = 'block';
  }

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = savedUsername;
    const message = formElement.elements.message.value.trim();

    if (message === '') {
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
});

const socket = io();

// const socket = io();

// const formElement = document.getElementById('form');
// const messagesElement = document.getElementById('messages');

// formElement.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const name = event.target.name.value.trim();
//   const message = event.target.message.value.trim();

//   if (name === '' || message === '') {
//     return;
//   }

//   socket.emit('chatMessage', JSON.stringify({ name, message }));

//   formElement.reset();
// });

// function writeLine(text) {
//   const line = document.createElement('p');
//   line.innerText = text;
//   messagesElement.appendChild(line);
// }

// socket.on('chatMessage', (message) => {
//   writeLine(message);
// });
