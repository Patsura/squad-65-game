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
const positions = ["ВР", "ЗЩ", "ПЗ", "НП"];
const saveKey = "squad65-save-v1";

const state = {
  coins: 12,
  rankPoints: 0,
  players: [],
  squad: [null, null, null, null],
  trophies: {},
  log: [],
  lastDailyBonusDate: null,
  economyHint: "Сначала собери 4 игроков, потом усиливай состав.",
  lastOpenedPlayer: null,
  match: null,
};

const coinEl = document.querySelector("#coins");
const boxesEl = document.querySelector("#boxes");
const collectionEl = document.querySelector("#collection");
const tournamentsEl = document.querySelector("#tournaments");
const logEl = document.querySelector("#log");
const squadPowerEl = document.querySelector("#squadPower");
const balanceBonusEl = document.querySelector("#balanceBonus");
const effectivePowerEl = document.querySelector("#effectivePower");
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
const dailyBonusEl = document.querySelector("#dailyBonus");
const economyHintEl = document.querySelector("#economyHint");
const trophiesEl = document.querySelector("#trophies");
const lastOpeningEl = document.querySelector("#lastOpening");
const playerTemplate = document.querySelector("#playerTemplate");

document.querySelector("#autoSquad").addEventListener("click", selectBestSquad);
document.querySelector("#resetGame").addEventListener("click", resetGame);
dailyBonusEl.addEventListener("click", claimDailyBonus);

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
    position: positions[randomInt(0, positions.length - 1)],
    source: box.name,
  };
}

function squadPlayers() {
  return state.squad.map((id) => state.players.find((item) => item.id === id)).filter(Boolean);
}

function squadPower() {
  return squadPlayers().reduce((sum, player) => sum + player.rating, 0);
}

function balanceBonusFor(players) {
  const uniquePositions = new Set(players.map((player) => player.position));
  return uniquePositions.size === 4 ? 10 : 0;
}

function squadBalanceBonus() {
  return balanceBonusFor(squadPlayers());
}

function effectiveSquadPower() {
  return squadPower() + squadBalanceBonus();
}

function fullSquad() {
  return state.squad.every(Boolean);
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 9);
}

function todayKey() {
  return new Date().toLocaleDateString("sv-SE");
}

function normalizeSquad(squad) {
  const ids = Array.isArray(squad) ? squad.slice(0, 4) : [];
  while (ids.length < 4) ids.push(null);
  return ids.map((id) => (state.players.some((player) => player.id === id) ? id : null));
}

function saveGame() {
  const data = {
    coins: state.coins,
    rankPoints: state.rankPoints,
    players: state.players,
    squad: state.squad,
    trophies: state.trophies,
    log: state.log,
    lastDailyBonusDate: state.lastDailyBonusDate,
  };
  localStorage.setItem(saveKey, JSON.stringify(data));
}

function loadGame() {
  const raw = localStorage.getItem(saveKey);
  if (!raw) return false;

  try {
    const data = JSON.parse(raw);
    state.coins = Number.isFinite(data.coins) ? data.coins : 12;
    state.rankPoints = Number.isFinite(data.rankPoints) ? data.rankPoints : 0;
    state.players = Array.isArray(data.players)
      ? data.players.map((player) => ({ ...player, position: player.position || positions[randomInt(0, positions.length - 1)] }))
      : [];
    state.squad = normalizeSquad(data.squad);
    state.trophies = data.trophies && typeof data.trophies === "object" ? data.trophies : {};
    state.log = Array.isArray(data.log) ? data.log.slice(0, 9) : [];
    state.lastDailyBonusDate = data.lastDailyBonusDate || null;
    addLog("Сохранённый прогресс загружен.");
    if (state.lastDailyBonusDate === todayKey()) {
      addLog("Ежедневный бонус уже получен сегодня.");
    }
    return true;
  } catch {
    localStorage.removeItem(saveKey);
    return false;
  }
}

function claimDailyBonus() {
  if (state.lastDailyBonusDate === todayKey()) {
    addLog("Ежедневный бонус уже получен сегодня.");
    render();
    return;
  }

  state.coins += 3;
  state.lastDailyBonusDate = todayKey();
  addLog("Ежедневный бонус получен: +3 монеты.");
  render();
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

  if (state.players.length < 4 && box.price > boxes[0].price && state.coins - box.price < boxes[0].price) {
    state.economyHint = "Сначала собери 4 игроков, потом усиливай состав.";
    addLog(state.economyHint);
  }

  state.coins -= box.price;
  const player = createPlayer(box);
  state.players.push(player);
  state.lastOpenedPlayer = player;
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

  let bestPlayers = state.players.slice().sort((a, b) => b.rating - a.rating).slice(0, 4);
  let bestPower = bestPlayers.reduce((sum, player) => sum + player.rating, 0) + balanceBonusFor(bestPlayers);

  for (let a = 0; a < state.players.length; a += 1) {
    for (let b = a + 1; b < state.players.length; b += 1) {
      for (let c = b + 1; c < state.players.length; c += 1) {
        for (let d = c + 1; d < state.players.length; d += 1) {
          const candidate = [state.players[a], state.players[b], state.players[c], state.players[d]];
          const candidatePower = candidate.reduce((sum, player) => sum + player.rating, 0) + balanceBonusFor(candidate);
          if (candidatePower > bestPower) {
            bestPlayers = candidate;
            bestPower = candidatePower;
          }
        }
      }
    }
  }

  state.squad = bestPlayers.map((player) => player.id);
  while (state.squad.length < 4) {
    state.squad.push(null);
  }

  const selectedPlayers = squadPlayers();
  const basePower = selectedPlayers.reduce((sum, player) => sum + player.rating, 0);
  const balance = balanceBonusFor(selectedPlayers);
  addLog(`Лучший состав выбран: базовая сила ${basePower}, баланс ${balance}, итог ${basePower + balance}.`);
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

  if (effectiveSquadPower() < tournament.required) {
    addLog(`Для турнира "${tournament.name}" нужно ${tournament.required} силы с учётом баланса состава.`);
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

  const powerGap = effectiveSquadPower() - match.tournament.opponent;
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
    const powerRoll = effectiveSquadPower() + randomInt(-15, 15);
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
    state.trophies[match.tournament.trophy] = (state.trophies[match.tournament.trophy] || 0) + 1;
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

function startCleanGame({ clearStorage = true } = {}) {
  if (clearStorage) {
    localStorage.clear();
  }
  state.coins = 12;
  state.rankPoints = 0;
  state.players = [];
  state.squad = [null, null, null, null];
  state.trophies = {};
  state.lastDailyBonusDate = null;
  state.economyHint = "Сначала собери 4 игроков, потом усиливай состав.";
  state.lastOpenedPlayer = null;
  state.match = null;
  state.log = ["Новая игра началась. Открой ящики и собери отряд."];
  render();
}

function resetGame() {
  startCleanGame({ clearStorage: true });
}

function playerCard(player) {
  const node = playerTemplate.content.firstElementChild.cloneNode(true);
  node.classList.add(ratingClass(player.rating));
  node.querySelector(".rating").textContent = player.rating;
  node.querySelector(".name").textContent = player.name;
  node.querySelector(".position").textContent = `Позиция: ${player.position}`;
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
  const basePower = squadPower();
  const bonus = squadBalanceBonus();
  squadPowerEl.textContent = basePower;
  balanceBonusEl.textContent = `Баланс состава: ${bonus > 0 ? "+" : ""}${bonus}`;
  effectivePowerEl.textContent = `Итоговая сила: ${basePower + bonus}`;
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
  const currentPower = effectiveSquadPower();
  const hasFullSquad = fullSquad();

  tournaments.forEach((tournament) => {
    const article = document.createElement("article");
    const isAvailable = hasFullSquad && currentPower >= tournament.required && !state.match;
    const shortage = Math.max(0, tournament.required - currentPower);
    const availabilityText = isAvailable
      ? "Турнир доступен"
      : `Не хватает ${shortage} силы${hasFullSquad ? "" : " · нужен полный отряд"}`;
    article.className = `tournament ${isAvailable ? "available" : "unavailable"}`;
    article.innerHTML = `
      <strong>${tournament.name}</strong>
      <p>Награда: ${tournament.reward} монет и ${tournament.rp} RP. Трофей: ${tournament.trophy}.</p>
      <div class="tournament-hints">
        <span>Нужно силы: <strong>${tournament.required}</strong></span>
        <span>Текущая итоговая сила: <strong>${currentPower}</strong></span>
        <span class="availability ${isAvailable ? "ok" : "warn"}">${availabilityText}</span>
      </div>
    `;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = state.match ? "Матч уже идёт" : "Начать матч";
    button.disabled = !hasFullSquad || currentPower < tournament.required || Boolean(state.match);
    button.addEventListener("click", () => startTournament(tournament));
    article.append(button);
    tournamentsEl.append(article);
  });
}

function renderDailyBonus() {
  const claimed = state.lastDailyBonusDate === todayKey();
  dailyBonusEl.disabled = claimed;
  dailyBonusEl.textContent = claimed ? "Бонус получен сегодня" : "Ежедневный бонус +3";
}

function renderEconomyHint() {
  economyHintEl.textContent = state.players.length < 4 ? state.economyHint : "Отряд собран. Теперь можно охотиться за усилениями.";
}

function renderLastOpening() {
  const player = state.lastOpenedPlayer;
  if (!player) {
    lastOpeningEl.className = "last-opening";
    lastOpeningEl.innerHTML = `
      <span class="last-opening__label">Последнее открытие</span>
      <strong>Пока нет открытий</strong>
      <small>Открой ящик, чтобы увидеть нового игрока здесь.</small>
    `;
    return;
  }

  const rarity = rarityName(player.rating);
  lastOpeningEl.className = `last-opening ${ratingClass(player.rating)}`;
  lastOpeningEl.innerHTML = `
    <span class="last-opening__label">Последнее открытие</span>
    <strong>${player.rating} · ${player.name}</strong>
    <small>${player.position} · ${rarity} · ${player.source}</small>
  `;
}

function renderTrophies() {
  trophiesEl.replaceChildren();
  const trophyNames = Object.keys(state.trophies);
  if (trophyNames.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Трофеев пока нет. Победи в турнире, чтобы открыть коллекцию кубков.";
    trophiesEl.append(empty);
    return;
  }

  trophyNames.sort().forEach((name) => {
    const item = document.createElement("div");
    item.className = "trophy-item";
    item.innerHTML = `<strong>${name}</strong><span>Побед: ${state.trophies[name]}</span>`;
    trophiesEl.append(item);
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
  renderDailyBonus();
  renderEconomyHint();
  renderBoxes();
  renderLastOpening();
  renderSquad();
  renderCollection();
  renderTournaments();
  renderTrophies();
  renderMatch();
  renderLog();
  saveGame();
}

if (!loadGame()) {
  startCleanGame({ clearStorage: false });
} else {
  render();
}
