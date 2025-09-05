const characters = [
  { name: "Naruto Uzumaki", village: "Konoha", clan: "Uzumaki" },
  { name: "Sasuke Uchiha", village: "Konoha", clan: "Uchiha" },
  { name: "Sakura Haruno", village: "Konoha" },
  { name: "Kakashi Hatake", village: "Konoha" },
  { name: "Itachi Uchiha", village: "Konoha", clan: "Uchiha" },
  { name: "Hinata Hyuga", village: "Konoha", clan: "Hyuga" },
  // Adicione mais personagens aqui
];

const attemptsDiv = document.getElementById("attempts");
const guessInput = document.getElementById("guess");
const submitBtn = document.getElementById("submitBtn");
const suggestionsList = document.getElementById("suggestions");

let attempts = [];

// Renderiza cards
function renderAttempts() {
  attemptsDiv.innerHTML = "";
  attempts.forEach(char => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2>${char.name}</h2>
      <p>Vila: ${char.village}</p>
      ${char.clan ? `<p>Clã: ${char.clan}</p>` : ""}
    `;
    attemptsDiv.appendChild(card);
  });
}

// Filtra sugestões
function showSuggestions(value) {
  suggestionsList.innerHTML = "";
  if (!value) return;

  const matches = characters.filter(c => 
    c.name.toLowerCase().includes(value.toLowerCase())
  );

  matches.forEach(match => {
    const li = document.createElement("li");
    li.textContent = match.name;
    li.addEventListener("click", () => {
      guessInput.value = match.name;
      suggestionsList.innerHTML = "";
    });
    suggestionsList.appendChild(li);
  });
}

// Função de chute
function handleGuess() {
  const guess = guessInput.value.trim();
  if (!guess) return;

  const character = characters.find(
    c => c.name.toLowerCase() === guess.toLowerCase()
  );

  if (character && !attempts.includes(character)) {
    attempts.push(character);
    renderAttempts();
  }

  guessInput.value = "";
  suggestionsList.innerHTML = "";
}

// Eventos
guessInput.addEventListener("input", (e) => showSuggestions(e.target.value));
submitBtn.addEventListener("click", handleGuess);
guessInput.addEventListener("keydown", e => {
  if (e.key === "Enter") handleGuess();
});
