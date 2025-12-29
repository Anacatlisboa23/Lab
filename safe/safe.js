const input = document.getElementById("message");
const button = document.getElementById("post");
const board = document.getElementById("board");

let messages = JSON.parse(localStorage.getItem("secureMessages")) || [];

function createMessageElement(text) {
  const div = document.createElement("div");
  div.className = "message";


  div.textContent = text;

  return div;
}

function render() {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  messages.forEach(msg => {
    board.appendChild(createMessageElement(msg));
  });
}

button.addEventListener("click", () => {
  const value = input.value.trim();

  // 🔐 Validação básica
  if (value.length === 0 || value.length > 200) {
    alert("Mensagem inválida");
    return;
  }

  messages.push(value);
  localStorage.setItem("secureMessages", JSON.stringify(messages));

  render();
  input.value = "";
});

render();
