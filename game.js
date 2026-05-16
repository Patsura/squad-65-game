const boxes = [
  { id: "bronze", name: "Бронзовый ящик", price: 2, min: 60, max: 70, note: "Надежный стартовый диапазон." },
  { id: "silver", name: "Серебряный ящик", price: 4, min: 71, max: 82, note: "Хороший шанс усилить основу." },
  { id: "gold", name: "Золотой ящик", price: 5, min: 80, max: 90, note: "Сильные игроки для турниров." },
  { id: "icon", name: "Легендарный ящик", price: 6, min: 88, max: 99, note: "Лучший шанс получить звезду." },
];

const tournaments = [
  { name: "Чемпионат мира", required: 280, reward: 5, rp: 18, trophy: "Кубок мира", opponent: 278 },
  { name: "Лига чемпионов", required: 300, reward: 7, rp: 24, trophy: "Кубок чемпионов", opponent: 302 },
  { name: "Кубок континентов", required: 325, reward: 10, rp: 32, trophy: "Кубок континентов", opponent: 326 },
];

const ranks = [
  { name: "Новичок I", rp: 0 },
  { name: "Новичок II", rp: 20 },
  { name: "Новичок III", rp: 45 },
  { name: "Бронза I", rp: 75 },
  { name: "Бронза II", rp: 110 },
  { name: "Серебро I", rp: 150 },
  { name: "Серебро II", rp: 195 },
  { name: "Золото I", rp: 245 },
  { name: "Золото II", rp: 300 },
  { name: "Платина", rp: 360 },
  { name: "Алмаз", rp: 430 },
  { name: "Мастер", rp: 510 },
  { name: "Грандмастер", rp: 600 },
  { name: "Легенда", rp: 700 },
  { name: "Чемпион 99", rp: 820 },
];

const moments = [
  {
    minute: 18,
    title: "Первый шанс",
    text: "Соперник открыл фланг. Как сыграет отряд?",
    options: [
      { label: "Быстрая атака", risk: 14, energy: -14, goalsFor: 1, goalsAgainst: 0, note: "Команда резко ускорилась." },
      { label: "Контроль мяча", risk: 4, energy: -6, goalsFor: 0, goalsAgainst: 0, note: "Вы забрали темп себе." },
      { label: "Удар издали", risk: 20, energy: -10, goalsFor: 1, goalsAgainst: 0, note: "Дальний удар проверяет вратаря." },
    ],
  },
  {
    minute: 39,
    title: "Давление соперника",
    text: "Противник прижал отряд к воротам.",
    options: [
      { label: "Глухая защита", risk: 3, energy: -8, goalsFor: 0, goalsAgainst: 0, note: "Отряд терпит и закрывает зоны." },
      { label: "Контратака", risk: 18, energy: -15, goalsFor: 1, goalsAgainst: 1, note: "Есть шанс наказать за давление." },
      { label: "Высокий прессинг", risk: 12, energy: -18, goalsFor: 1, goalsAgainst: 0, note: "Игроки встречают соперника высоко." },
    ],
  },
  {
    minute: 63,
    title: "Ключевой момент",
    text: "Нужно решить, как играть середину второго тайма.",
    options: [
      { label: "Сохранить силы", risk: 2, energy: 8, goalsFor: 0, goalsAgainst: 0, note: "Команда переводит дыхание." },
      { label: "Всё в атаку", risk: 24, energy: -22, goalsFor: 2, goalsAgainst: 1, note: "Очень рискованный рывок." },
      { label: "Баланс", risk: 8, energy: -9, goalsFor: 1, goalsAgainst: 0, note: "Спокойное, но опасное продвижение." },
    ],
  },
  {
    minute: 82,
    title: "Финиш",
    text: "Последние минуты. Одно решение может решить матч.",
    options: [
      { label: "Удержать счёт", risk: 5, energy: -8, goalsFor: 0, goalsAgainst: 0, note: "Отряд играет аккуратно." },
      { label: "Решающий штурм", risk: 22, energy: -18, goalsFor: 1, goalsAgainst: 1, note: "Финальная атака на максимуме." },
      { label: "Индивидуальный проход", risk: 16, energy: -12, goalsFor: 1, goalsAgainst: 0, note: "Лидер берет игру на себя." },
    ],
  },
];

const firstNames = ["Алекс", "Никита", "Марк", "Даниил", "Леон", "Илья", "Роман", "Тимур", "Матвей", "Кирилл"];
const lastNames = ["Волков", "Орлов", "Соколов", "Морозов", "Белов", "Громов", "Егоров", "Фомин", "Лукин", "Титов"];

const state = {
  coins: 12,
  rankPoints: 0,
  players: [],
  squad: [null, null, null, null],
  log: [],
  match: null,
};

const coinEl = document.querySelector("#coins");
const boxesEl = document.querySelector("#boxes");
const collectionEl = document.querySelector("#collection");
const tournamentsEl = document.querySelector("#tournaments");
const logEl = document.querySelector("#log");
const squadPowerEl = document.querySelector("#squadPower");
const rankNameEl = document.querySelector("#rankName");
const rankProgressEl = document.querySelector("#rankProgress");
const currentRankEl = document.querySelector("#currentRank");
const nextRankEl = document.querySelector("#nextRank");
const rankFillEl = document.querySelector("#rankFill");
const matchTournamentEl = document.querySelector("#matchTournament");
const matchScoreEl = document.querySelector("#matchScore");
const matchMinuteEl = document.querySelector("#matchMinute");
const matchEnergyEl = document.querySelector("#matchEnergy");
const matchHintEl = document.querySelector("#matchHint");
const momentTitleEl = document.querySelector("#momentTitle");
const momentTextEl = document.querySelector("#momentText");
const decisionButtonsEl = document.querySelector("#decisionButtons");
const playerTemplate = document.querySelector("#playerTemplate");

document.querySelector("#autoSquad").addEventListener("click", selectBestSquad);
document.querySelector("#resetGame").addEventListener("click", resetGame);

function ratingClass(rating) {
  if (rating >= 92) return "legend";
  if (rating >= 84) return "elite";
  if (rating >= 72) return "rare";
  return "common";
}

function rarityName(rating) {
  if (rating >= 92) return "Легенда";
  if (rating >= 84) return "Элита";
  if (rating >= 72) return "Редкий";
  return "Обычный";
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `player-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getRank() {
  let index = 0;
  ranks.forEach((rank, rankIndex) => {
    if (state.rankPoints >= rank.rp) index = rankIndex;
  });
  return { current: ranks[index], next: ranks[index + 1], index };
}

function addRankPoints(amount) {
  const before = getRank().current.name;
  state.rankPoints += amount;
  const after = getRank().current.name;
  if (before !== after) {
    addLog(`Повышение ранга: ${after}!`);
  }
}

function createPlayer(box) {
  const rating = randomInt(box.min, box.max);
  const name = `${firstNames[randomInt(0, firstNames.length - 1)]} ${lastNames[randomInt(0, lastNames.length - 1)]}`;
  return {
    id: makeId(),
    name,
    rating,
    source: box.name,
  };
}

function squadPower() {
  return state.squad.reduce((sum, id) => {
    const player = state.players.find((item) => item.id === id);
    return sum + (player ? player.rating : 0);
  }, 0);
}

function fullSquad() {
  return state.squad.every(Boolean);
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 9);
}

function openBox(box) {
  if (state.match) {
    addLog("Сначала закончи текущий матч.");
    render();
    return;
  }

  if (state.coins < box.price) {
    addLog(`Не хватает монет для "${box.name}".`);
    render();
    return;
  }

  state.coins -= box.price;
  const player = createPlayer(box);
  state.players.push(player);
  addLog(`Из "${box.name}" выпал ${player.name} с рейтингом ${player.rating}.`);

  const emptySlot = state.squad.findIndex((id) => id === null);
  if (emptySlot !== -1) {
    state.squad[emptySlot] = player.id;
    addLog(`${player.name} автоматически добавлен в отряд.`);
  }

  render();
}

function selectPlayer(playerId) {
  if (state.match) return;

  const currentIndex = state.squad.indexOf(playerId);
  if (currentIndex !== -1) {
    state.squad[currentIndex] = null;
    render();
    return;
  }

  const emptyIndex = state.squad.findIndex((id) => id === null);
  if (emptyIndex !== -1) {
    state.squad[emptyIndex] = playerId;
  } else {
    const weakestIndex = state.squad.reduce((weakest, id, index) => {
      const player = state.players.find((item) => item.id === id);
      const weakestPlayer = state.players.find((item) => item.id === state.squad[weakest]);
      return player.rating < weakestPlayer.rating ? index : weakest;
    }, 0);
    state.squad[weakestIndex] = playerId;
  }

  render();
}

function selectBestSquad() {
  if (state.match) {
    addLog("Состав нельзя менять во время матча.");
    render();
    return;
  }

  state.squad = state.players
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
    .map((player) => player.id);

  while (state.squad.length < 4) {
    state.squad.push(null);
  }

  addLog("Выбран лучший доступный состав.");
  render();
}

function startTournament(tournament) {
  if (state.match) {
    addLog("Матч уже идёт. Прими следующее решение.");
    render();
    return;
  }

  if (!fullSquad()) {
    addLog(`Для турнира "${tournament.name}" нужен отряд из 4 персонажей.`);
    render();
    return;
  }

  state.match = {
    tournament,
    step: 0,
    playerGoals: 0,
    rivalGoals: 0,
    energy: 100,
    finished: false,
  };

  addLog(`Начался матч: ${tournament.name}.`);
  render();
}

function chooseDecision(option) {
  const match = state.match;
  if (!match || match.finished) return;

  const powerGap = squadPower() - match.tournament.opponent;
  const energyBonus = Math.round((match.energy - 70) / 5);
  const chance = Math.max(16, Math.min(88, 55 + powerGap / 3 + energyBonus - option.risk));
  const success = randomInt(1, 100) <= chance;

  match.energy = Math.max(0, Math.min(100, match.energy + option.energy));
  if (success) {
    match.playerGoals += option.goalsFor;
    addLog(`${option.note} Решение сработало.`);
  } else {
    match.rivalGoals += option.goalsAgainst || 1;
    addLog(`${option.note} Соперник воспользовался ошибкой.`);
  }

  if (match.energy < 25 && randomInt(1, 100) <= 35) {
    match.rivalGoals += 1;
    addLog("Команда устала, и соперник забил на свежести.");
  }

  match.step += 1;
  if (match.step >= moments.length) {
    finishMatch();
  }
  render();
}

function finishMatch() {
  const match = state.match;
  match.finished = true;

  if (match.playerGoals === match.rivalGoals) {
    const powerRoll = squadPower() + randomInt(-15, 15);
    if (powerRoll >= match.tournament.required) {
      match.playerGoals += 1;
      addLog("В дополнительное время отряд дожал соперника.");
    } else {
      match.rivalGoals += 1;
      addLog("Дополнительное время осталось за соперником.");
    }
  }

  if (match.playerGoals > match.rivalGoals) {
    state.coins += match.tournament.reward;
    addRankPoints(match.tournament.rp);
    addLog(`Победа: ${match.tournament.trophy}! +${match.tournament.reward} монет, +${match.tournament.rp} RP.`);
  } else {
    state.coins += 1;
    addRankPoints(5);
    addLog(`Поражение в "${match.tournament.name}". +1 монета, +5 RP за опыт.`);
  }
}

function closeFinishedMatch() {
  state.match = null;
  render();
}

function resetGame() {
  state.coins = 12;
  state.rankPoints = 0;
  state.players = [];
  state.squad = [null, null, null, null];
  state.match = null;
  state.log = ["Новая игра началась. Открой ящики и собери отряд."];
  render();
}

function playerCard(player) {
  const node = playerTemplate.content.firstElementChild.cloneNode(true);
  node.classList.add(ratingClass(player.rating));
  node.querySelector(".rating").textContent = player.rating;
  node.querySelector(".name").textContent = player.name;
  node.querySelector(".rarity").textContent = `${rarityName(player.rating)} · ${player.source}`;
  node.addEventListener("click", () => selectPlayer(player.id));
  if (state.squad.includes(player.id)) {
    node.classList.add("in-squad");
  }
  return node;
}

function renderRanks() {
  const rank = getRank();
  const start = rank.current.rp;
  const end = rank.next ? rank.next.rp : rank.current.rp;
  const progress = rank.next ? Math.round(((state.rankPoints - start) / (end - start)) * 100) : 100;

  rankNameEl.textContent = rank.current.name;
  currentRankEl.textContent = rank.current.name;
  rankProgressEl.textContent = rank.next ? `${state.rankPoints - start} / ${end - start} RP` : `${state.rankPoints} RP`;
  nextRankEl.textContent = rank.next ? `Следующий ранг: ${rank.next.name}` : "Максимальный ранг";
  rankFillEl.style.width = `${progress}%`;
}

function renderBoxes() {
  boxesEl.replaceChildren();
  boxes.forEach((box) => {
    const article = document.createElement("article");
    article.className = "box-card";
    article.innerHTML = `
      <strong>${box.name}</strong>
      <p>${box.note}</p>
      <span>Рейтинг: ${box.min}-${box.max}</span>
      <span class="price">Цена: ${box.price} монеты</span>
    `;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Открыть";
    button.disabled = state.coins < box.price || Boolean(state.match);
    button.addEventListener("click", () => openBox(box));
    article.append(button);
    boxesEl.append(article);
  });
}

function renderSquad() {
  document.querySelectorAll(".slot").forEach((slot, index) => {
    slot.replaceChildren();
    const player = state.players.find((item) => item.id === state.squad[index]);
    if (player) {
      slot.append(playerCard(player));
    }
  });
  squadPowerEl.textContent = squadPower();
}

function renderCollection() {
  collectionEl.replaceChildren();
  if (state.players.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Коллекция пока пустая.";
    empty.className = "muted";
    collectionEl.append(empty);
    return;
  }

  state.players
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .forEach((player) => collectionEl.append(playerCard(player)));
}

function renderTournaments() {
  tournamentsEl.replaceChildren();
  tournaments.forEach((tournament) => {
    const article = document.createElement("article");
    article.className = "tournament";
    article.innerHTML = `
      <strong>${tournament.name}</strong>
      <p>Нужно силы: ${tournament.required}. Награда: ${tournament.reward} монет и ${tournament.rp} RP.</p>
    `;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Начать матч";
    button.disabled = !fullSquad() || Boolean(state.match);
    button.addEventListener("click", () => startTournament(tournament));
    article.append(button);
    tournamentsEl.append(article);
  });
}

function renderMatch() {
  decisionButtonsEl.replaceChildren();

  if (!state.match) {
    matchHintEl.textContent = "Выбери турнир, потом принимай решения в ключевых моментах игры.";
    matchTournamentEl.textContent = "Нет матча";
    matchScoreEl.textContent = "0 : 0";
    matchMinuteEl.textContent = "0'";
    matchEnergyEl.textContent = "100";
    momentTitleEl.textContent = "Матч ещё не начался";
    momentTextEl.textContent = "Собери полный отряд и нажми “Начать матч” в турнирах.";
    return;
  }

  const match = state.match;
  const moment = moments[match.step];
  matchTournamentEl.textContent = match.tournament.name;
  matchScoreEl.textContent = `${match.playerGoals} : ${match.rivalGoals}`;
  matchMinuteEl.textContent = match.finished ? "90'" : `${moment.minute}'`;
  matchEnergyEl.textContent = match.energy;

  if (match.finished) {
    matchHintEl.textContent = "Матч завершён. Можно забрать результат и выбрать следующий турнир.";
    momentTitleEl.textContent = match.playerGoals > match.rivalGoals ? "Победа!" : "Матч проигран";
    momentTextEl.textContent = `Итоговый счёт: ${match.playerGoals} : ${match.rivalGoals}.`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Завершить матч";
    button.addEventListener("click", closeFinishedMatch);
    decisionButtonsEl.append(button);
    return;
  }

  matchHintEl.textContent = "Выбери действие. Рискованные решения могут дать гол, но могут открыть сопернику шанс.";
  momentTitleEl.textContent = moment.title;
  momentTextEl.textContent = moment.text;
  moment.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<strong>${option.label}</strong><span>Энергия ${option.energy > 0 ? "+" : ""}${option.energy}, риск ${option.risk}</span>`;
    button.addEventListener("click", () => chooseDecision(option));
    decisionButtonsEl.append(button);
  });
}

function renderLog() {
  logEl.replaceChildren();
  state.log.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    logEl.append(li);
  });
}

function render() {
  coinEl.textContent = state.coins;
  renderRanks();
  renderBoxes();
  renderSquad();
  renderCollection();
  renderTournaments();
  renderMatch();
  renderLog();
}

resetGame();
