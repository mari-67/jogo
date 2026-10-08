"use strict";

/* =========================================
   ESCOLA DO CAOS — CONTROLE DO JOGO
   ========================================= */

const Game = {
  selectedCharacter: null,
  playerName: "Jogador",
  socket: null,
  connected: false,
  currentScreen: "loading-screen",
  maxPlayers: 30,
  keysPressed: new Set(),
  running: false
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function showScreen(screenId) {
  const target = document.getElementById(screenId);

  if (!target) {
    console.warn("Tela não encontrada:", screenId);
    return;
  }

  $$(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  target.classList.add("active");
  Game.currentScreen = screenId;
}

function setText(selector, value) {
  const element = $(selector);

  if (element) {
    element.textContent = String(value);
  }
}

function showMessage(message) {
  const existing = $("#game-message");

  if (existing) {
    existing.textContent = message;
    existing.classList.remove("hidden");
    return;
  }

  const element = document.createElement("div");
  element.id = "game-message";
  element.className = "game-message";
  element.textContent = message;

  document.body.appendChild(element);

  window.setTimeout(() => {
    element.remove();
  }, 3000);
}

/* =========================================
   NAVEGAÇÃO DOS MENUS
   ========================================= */

function goToMenu() {
  showScreen("menu-screen");
}

function goToCharacters() {
  showScreen("character-screen");
}

function goToInstructions() {
  showScreen("howto-screen");
}

function goToLobby() {
  showScreen("lobby-screen");
}

function returnToMenu() {
  Game.running = false;
  showScreen("menu-screen");
}

/* =========================================
   BOTÕES
   ========================================= */

function bindButton(selector, callback) {
  const element = $(selector);

  if (element) {
    element.addEventListener("click", callback);
  }
}

function initializeNavigation() {
  bindButton("#play-button", goToCharacters);
  bindButton("#howto-button", goToInstructions);
  bindButton("#back-to-menu", goToMenu);
  bindButton("#back-from-characters", goToMenu);
  bindButton("#back-from-lobby", goToCharacters);
  bindButton("#confirm-character", goToLobby);
  bindButton("#leave-lobby", returnToMenu);
  bindButton("#leave-game", returnToMenu);
}

/* =========================================
   INICIALIZAÇÃO
   ========================================= */

function initializeGame() {
  initializeNavigation();

  console.log("Escola do Caos: interface inicializada.");

  const loading = $("#loading-screen");

  if (loading) {
    window.setTimeout(() => {
      showScreen("menu-screen");
    }, 800);
  } else {
    goToMenu();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGame);
} else {
  initializeGame();
}
