const input = document.getElementById("message");
const button = document.getElementById("post");
const board = document.getElementById("board");

// FLAGS 
const flag1 = document.getElementById("flag1");
const flag2 = document.getElementById("flag2");
const flag3 = document.getElementById("flag3");

// Estado inseguro
let isAdmin = localStorage.getItem("isAdmin") || "false";

// Mensagens guardadas (Stored XSS)
let messages = JSON.parse(localStorage.getItem("messages")) || [];

// Renderização VULNERÁVEL (usa html)
function render() {
  board.innerHTML = "";

  messages.forEach(msg => {
    board.innerHTML += `
      <div class="message">
        ${msg}
      </div>
    `;
  });

  // FLAG 3 — confiança no cliente
  if (isAdmin === "true") {
    flag3.innerText = "🏁 Flag 3: CLIENT_SIDE_TRUST_BROKEN";
  }
}

// Adicionar mensagem
button.addEventListener("click", () => {
  const value = input.value;

  // Sem validação
  messages.push(value);

  localStorage.setItem("messages", JSON.stringify(messages));
  render();

  input.value = "";
});

// FLAG 2 — Stored XSS
if (messages.length > 0) {
  flag2.innerText = "🏁 Flag 2: STORED_XSS_TRIGGERED";
}

// FLAG 1 — DOM XSS (será ativada via payload)
window.activateFlag1 = function () {
  flag1.innerText = "🏁 Flag 1: DOM_XSS_EXECUTED";
};

document.getElementById("clear").addEventListener("click", () => {
  localStorage.removeItem("messages");
  location.reload();
});


render();
