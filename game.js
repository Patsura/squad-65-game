const boxes = [
  { id: "bronze", name: "Бронзовый сундук", price: 2, min: 60, max: 70, note: "Кованый сундук для первых героев гарнизона." },
  { id: "silver", name: "Серебряный ларец", price: 4, min: 71, max: 82, note: "Зачарованный ларец с редкими рекрутами." },
  { id: "gold", name: "Золотой сундук", price: 5, min: 80, max: 90, note: "Королевская добыча для сильного отряда." },
  { id: "icon", name: "Легендарный реликварий", price: 6, min: 88, max: 99, note: "Арканный реликварий с шансом на героя эпохи." },
];

const tournaments = [
  { name: "Испытание Короны", required: 280, reward: 5, rp: 18, trophy: "Корона победителя", opponent: 278 },
  { name: "Лига Архонтов", required: 300, reward: 7, rp: 24, trophy: "Печать архонтов", opponent: 302 },
  { name: "Знамя похода", required: 325, reward: 10, rp: 32, trophy: "Знамя похода", opponent: 326 },
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
    title: "Первый манёвр",
    text: "Вражеская линия дрогнула. Какой приказ отдаст командир?",
    options: [
      { label: "Стремительный рейд", risk: 14, energy: -14, goalsFor: 1, goalsAgainst: 0, note: "Отряд резко ускорился." },
      { label: "Удержать строй", risk: 4, energy: -6, goalsFor: 0, goalsAgainst: 0, note: "Отряд перехватил инициативу." },
      { label: "Арканный залп", risk: 20, energy: -10, goalsFor: 1, goalsAgainst: 0, note: "Дальний залп пробивает оборону." },
    ],
  },
  {
    minute: 39,
    title: "Натиск врага",
    text: "Противник прижал отряд к каменным вратам.",
    options: [
      { label: "Каменный щит", risk: 3, energy: -8, goalsFor: 0, goalsAgainst: 0, note: "Отряд держит строй и закрывает проходы." },
      { label: "Ответный выпад", risk: 18, energy: -15, goalsFor: 1, goalsAgainst: 1, note: "Есть шанс наказать врага за дерзкий натиск." },
      { label: "Боевой нажим", risk: 12, energy: -18, goalsFor: 1, goalsAgainst: 0, note: "Герои встречают врага у передней линии." },
    ],
  },
  {
    minute: 63,
    title: "Перелом битвы",
    text: "Нужно решить, как пройти середину сражения.",
    options: [
      { label: "Сберечь ману", risk: 2, energy: 8, goalsFor: 0, goalsAgainst: 0, note: "Отряд переводит дыхание." },
      { label: "Общий штурм", risk: 24, energy: -22, goalsFor: 2, goalsAgainst: 1, note: "Очень рискованный штурм." },
      { label: "Выверенный строй", risk: 8, energy: -9, goalsFor: 1, goalsAgainst: 0, note: "Спокойное, но опасное продвижение." },
    ],
  },
  {
    minute: 82,
    title: "Последний натиск",
    text: "Последний отрезок битвы. Один приказ может решить исход.",
    options: [
      { label: "Удержать врата", risk: 5, energy: -8, goalsFor: 0, goalsAgainst: 0, note: "Отряд бережёт преимущество." },
      { label: "Решающий штурм", risk: 22, energy: -18, goalsFor: 1, goalsAgainst: 1, note: "Финальный штурм на пределе сил." },
      { label: "Подвиг героя", risk: 16, energy: -12, goalsFor: 1, goalsAgainst: 0, note: "Лидер берёт исход на себя." },
    ],
  },
];

const firstNames = ["Алекс", "Никита", "Марк", "Даниил", "Леон", "Илья", "Роман", "Тимур", "Матвей", "Кирилл"];
const lastNames = ["Волков", "Орлов", "Соколов", "Морозов", "Белов", "Громов", "Егоров", "Фомин", "Лукин", "Титов"];
const positions = ["ВР", "ЗЩ", "ПЗ", "НП"];
const saveKey = "squad65-save-v1";
const screenButtons = document.querySelectorAll(".nav-button");
const screens = document.querySelectorAll(".screen");
let activeScreen = "home";

const state = {
  coins: 12,
  rankPoints: 0,
  players: [],
  squad: [null, null, null, null],
  trophies: {},
  log: [],
  lastDailyBonusDate: null,
  economyHint: "Сначала собери 4 героев, потом усиливай отряд.",
  lastOpenedPlayer: null,
  match: null,
  highlightPlayerId: null,
  dailyBonusPulse: false,
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
const latestSectionEl = document.querySelector("#latestSection");
const matchPanelEl = document.querySelector("#matchPanel");
const mainCtaEl = document.querySelector("#mainCta");
const playerTemplate = document.querySelector("#playerTemplate");
const packOpeningEl = document.querySelector("#packOpening");
const packRevealStageEl = document.querySelector("#packRevealStage");
const closePackOpeningEl = document.querySelector("#closePackOpening");
const claimPackPlayerEl = document.querySelector("#claimPackPlayer");

document.querySelector("#autoSquad").addEventListener("click", selectBestSquad);
document.querySelector("#resetGame").addEventListener("click", resetGame);
dailyBonusEl.addEventListener("click", claimDailyBonus);
mainCtaEl.addEventListener("click", handleMainCta);
screenButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveScreen(button.dataset.target));
});
closePackOpeningEl.addEventListener("click", closePackOpening);
claimPackPlayerEl.addEventListener("click", closePackOpening);
packOpeningEl.addEventListener("click", (event) => {
  if (event.target === packOpeningEl) closePackOpening();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && packOpeningEl.classList.contains("active")) {
    closePackOpening();
  }
});


function setActiveScreen(screenName) {
  activeScreen = screenName;
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === screenName);
  });
  screenButtons.forEach((button) => {
    const isActive = button.dataset.target === screenName;
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function firstAvailableTournament() {
  const currentPower = effectiveSquadPower();
  return tournaments.find((tournament) => fullSquad() && currentPower >= tournament.required);
}

function recommendedAction() {
  if (state.match) {
    return { label: "Продолжить битву", screen: "home" };
  }

  if (squadPlayers().length < 4) {
    return { label: "Открыть сундук", screen: "boxes" };
  }

  if (firstAvailableTournament()) {
    return { label: "Начать испытание", screen: "tournaments" };
  }

  return { label: "Усилить отряд", screen: "boxes" };
}

function handleMainCta() {
  const action = recommendedAction();
  setActiveScreen(action.screen);
}

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


const skinTones = ["#f1c59f", "#d79a69", "#b97852", "#8f553e", "#f5d4b5"];
const hairColors = ["#1e2430", "#51321f", "#8a5a31", "#d7b16a", "#27384b"];
const kitAccents = ["stripe", "chevron", "halo", "slash"];

function hashString(value) {
  return String(value).split("").reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);
}

function seededPick(seed, list, offset = 0) {
  return Math.abs(seed + offset) % list.length;
}

function ensurePlayerIdentity(player) {
  const seedSource = player.portraitSeed || `${player.id || player.name}-${player.rating}-${player.position}`;
  const seed = hashString(seedSource);
  return {
    ...player,
    portraitSeed: player.portraitSeed || `p-${Math.abs(seed)}`,
    faceType: player.faceType || `face-${seededPick(seed, [0, 1, 2], 3) + 1}`,
    hairType: player.hairType || `hair-${seededPick(seed, [0, 1, 2, 3], 7) + 1}`,
    skinTone: player.skinTone || skinTones[seededPick(seed, skinTones, 11)],
    hairColor: player.hairColor || hairColors[seededPick(seed, hairColors, 17)],
    accentStyle: player.accentStyle || kitAccents[seededPick(seed, kitAccents, 23)],
  };
}

function createPortrait(player) {
  const portrait = document.createElement("span");
  portrait.className = `portrait ${player.faceType} ${player.hairType} ${player.accentStyle}`;
  portrait.style.setProperty("--skin", player.skinTone);
  portrait.style.setProperty("--hair", player.hairColor);
  portrait.innerHTML = `
    <span class="portrait-glow"></span>
    <span class="portrait-kit"><span></span></span>
    <span class="portrait-neck"></span>
    <span class="portrait-head">
      <span class="portrait-hair"></span>
      <span class="portrait-eyes"></span>
      <span class="portrait-mouth"></span>
      <span class="portrait-shine"></span>
    </span>
    <span class="portrait-badge">${positionIcon(player.position)}</span>
  `;
  return portrait;
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
  const player = {
    id: makeId(),
    name,
    rating,
    position: positions[randomInt(0, positions.length - 1)],
    source: box.name,
  };
  return ensurePlayerIdentity(player);
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
    lastOpenedPlayerId: state.lastOpenedPlayer?.id || null,
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
      ? data.players.map((player) => ensurePlayerIdentity({
          ...player,
          position: player.position || positions[randomInt(0, positions.length - 1)],
        }))
      : [];
    state.squad = normalizeSquad(data.squad);
    state.trophies = data.trophies && typeof data.trophies === "object" ? data.trophies : {};
    state.log = Array.isArray(data.log) ? data.log.slice(0, 9) : [];
    state.lastDailyBonusDate = data.lastDailyBonusDate || null;
    state.lastOpenedPlayer = state.players.find((player) => player.id === data.lastOpenedPlayerId) || null;
    addLog("Хроники отряда восстановлены.");
    if (state.lastDailyBonusDate === todayKey()) {
      addLog("Ежедневный дар уже получен сегодня.");
    }
    return true;
  } catch {
    localStorage.removeItem(saveKey);
    return false;
  }
}

function claimDailyBonus() {
  if (state.lastDailyBonusDate === todayKey()) {
    addLog("Ежедневный дар уже получен сегодня.");
    render();
    return;
  }

  state.coins += 3;
  state.lastDailyBonusDate = todayKey();
  state.dailyBonusPulse = true;
  addLog("Ежедневный дар получен: +3 золота.");
  render();
}

function openBox(box) {
  if (state.match) {
    addLog("Сначала заверши текущую битву.");
    render();
    return;
  }

  if (state.coins < box.price) {
    addLog(`Не хватает золота для "${box.name}".`);
    render();
    return;
  }

  if (state.players.length < 4 && box.price > boxes[0].price && state.coins - box.price < boxes[0].price) {
    state.economyHint = "Сначала собери 4 героев, потом усиливай отряд.";
    addLog(state.economyHint);
  }

  state.coins -= box.price;
  const player = createPlayer(box);
  state.players.push(player);
  state.lastOpenedPlayer = player;
  state.highlightPlayerId = player.id;
  addLog(`Из "${box.name}" выпал ${player.name} с рейтингом ${player.rating}.`);

  const emptySlot = state.squad.findIndex((id) => id === null);
  if (emptySlot !== -1) {
    state.squad[emptySlot] = player.id;
    addLog(`${player.name} призван в отряд автоматически.`);
  }

  render();
  showPackOpening(box, player);
}


function closePackOpening() {
  packOpeningEl.classList.remove("active");
  packOpeningEl.setAttribute("aria-hidden", "true");
  packRevealStageEl.replaceChildren();
  state.highlightPlayerId = null;
  render();
}

function createPackBack(box) {
  const pack = document.createElement("div");
  pack.className = `pack-back ${box.id}`;
  pack.innerHTML = `
    <span class="pack-back__shine"></span>
    <span class="pack-back__mark">65</span>
    <strong>${box.name}</strong>
    <small>Ранг силы ${box.min}-${box.max}</small>
  `;
  return pack;
}

function showPackOpening(box, player) {
  packRevealStageEl.replaceChildren();
  const stage = document.createElement("div");
  stage.className = `pack-reveal ${ratingClass(player.rating)}`;
  const pack = createPackBack(box);
  const revealedCard = playerCard(player);
  revealedCard.classList.add("revealed-card");
  revealedCard.tabIndex = -1;
  const summary = document.createElement("div");
  summary.className = "pack-result-copy";
  summary.innerHTML = `
    <span>${rarityName(player.rating)} · ${positionIcon(player.position)} ${player.position}</span>
    <strong>${player.rating} ${player.name}</strong>
    <small>Герой уже добавлен в архив. Нажми “Забрать героя”, чтобы закрыть показ.</small>
  `;
  stage.append(pack, revealedCard, summary);
  packRevealStageEl.append(stage);
  packOpeningEl.classList.add("active");
  packOpeningEl.setAttribute("aria-hidden", "false");
  claimPackPlayerEl.focus({ preventScroll: true });
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
    addLog("Отряд нельзя менять во время битвы.");
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
  addLog(`Лучший отряд выбран: базовая сила ${basePower}, строй ${balance}, итог ${basePower + balance}.`);
  render();
}

function startTournament(tournament) {
  if (state.match) {
    addLog("Битва уже идёт. Отдай следующий приказ.");
    render();
    return;
  }

  if (!fullSquad()) {
    addLog(`Для испытания "${tournament.name}" нужен отряд из 4 героев.`);
    render();
    return;
  }

  if (effectiveSquadPower() < tournament.required) {
    addLog(`Для испытания "${tournament.name}" нужно ${tournament.required} мощи с учётом строя отряда.`);
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

  activeScreen = "home";
  addLog(`Началась битва: ${tournament.name}.`);
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
    addLog(`${option.note} Приказ сработал.`);
  } else {
    match.rivalGoals += option.goalsAgainst || 1;
    addLog(`${option.note} Враг воспользовался ошибкой.`);
  }

  if (match.energy < 25 && randomInt(1, 100) <= 35) {
    match.rivalGoals += 1;
    addLog("Отряд устал, и враг прорвал защиту.");
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
      addLog("В последнем рывке отряд дожал врага.");
    } else {
      match.rivalGoals += 1;
      addLog("Последний рывок остался за врагом.");
    }
  }

  if (match.playerGoals > match.rivalGoals) {
    state.coins += match.tournament.reward;
    state.trophies[match.tournament.trophy] = (state.trophies[match.tournament.trophy] || 0) + 1;
    addRankPoints(match.tournament.rp);
    addLog(`Победа: ${match.tournament.trophy}! +${match.tournament.reward} золота, +${match.tournament.rp} RP.`);
  } else {
    state.coins += 1;
    addRankPoints(5);
    addLog(`Поражение в "${match.tournament.name}". +1 золотаа, +5 RP за опыт.`);
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
  state.economyHint = "Сначала собери 4 героев, потом усиливай отряд.";
  state.lastOpenedPlayer = null;
  state.match = null;
  state.log = ["Новая хроника началась. Открывай сундуки и собирай отряд."];
  render();
}

function resetGame() {
  startCleanGame({ clearStorage: true });
}

function positionIcon(position) {
  return { ВР: "◆", ЗЩ: "🛡️", ПЗ: "✦", НП: "⚔️" }[position] || "◆";
}

function positionLabel(position) {
  return { ВР: "страж", ЗЩ: "защитник", ПЗ: "тактик", НП: "авангард" }[position] || "герой";
}

function playerCard(player) {
  const node = playerTemplate.content.firstElementChild.cloneNode(true);
  node.classList.add(ratingClass(player.rating));
  node.dataset.position = player.position;
  node.querySelector(".rating").textContent = player.rating;
  node.querySelector(".name").textContent = player.name;
  node.querySelector(".position").textContent = `${positionIcon(player.position)} ${player.position}`;
  node.querySelector(".avatar").append(createPortrait(ensurePlayerIdentity(player)));
  node.querySelector(".rarity").textContent = `${rarityName(player.rating)} · ${positionLabel(player.position)}`;
  node.querySelector(".source").textContent = player.source;
  node.addEventListener("click", () => selectPlayer(player.id));
  if (state.squad.includes(player.id)) {
    node.classList.add("in-squad");
  }
  if (state.highlightPlayerId === player.id) {
    node.classList.add("just-added");
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
    article.className = `box-card ${box.id}`;
    article.innerHTML = `
      <div class="box-visual" aria-hidden="true">
        <span class="box-visual__card">65</span>
        <span class="box-visual__glow"></span>
      </div>
      <div class="box-copy">
        <strong>${box.name}</strong>
        <p>${box.note}</p>
        <div class="box-meta">
          <span>Ранг силы ${box.min}-${box.max}</span>
          <span class="price">🪙 ${box.price}</span>
        </div>
      </div>
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
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "slot-placeholder";
      placeholder.innerHTML = `<strong>${positionIcon(positions[index])} ${positions[index]}</strong><small>Пустой слот</small>`;
      slot.append(placeholder);
    }
  });
  const basePower = squadPower();
  const bonus = squadBalanceBonus();
  squadPowerEl.textContent = basePower;
  balanceBonusEl.textContent = `${bonus > 0 ? "+" : ""}${bonus}`;
  effectivePowerEl.textContent = basePower + bonus;
}

function renderCollection() {
  collectionEl.replaceChildren();
  if (state.players.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Архив героев пока пуст.";
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
    const isCurrentMatch = state.match?.tournament.name === tournament.name;
    const availabilityText = isCurrentMatch
      ? "Битва идёт"
      : state.match
        ? "Битва идёт"
        : !hasFullSquad
          ? "Нужен полный отряд"
          : isAvailable
            ? "Доступно"
            : `Не хватает ${shortage} мощи`;
    const statusClass = isCurrentMatch ? "live" : isAvailable ? "ok" : "warn";
    article.className = `tournament ${isCurrentMatch ? "matching" : isAvailable ? "available" : "unavailable"}`;
    article.innerHTML = `
      <div class="tournament-title">
        <strong>${tournament.name}</strong>
        <span class="trophy-mark" aria-label="Трофей">🏆</span>
      </div>
      <p>Короткое испытание с тактическими приказами.</p>
      <div class="tournament-hints">
        <span><small>Нужно</small><strong>${tournament.required}</strong></span>
        <span><small>Сейчас</small><strong>${currentPower}</strong></span>
        <span><small>Награда</small><strong>${tournament.reward} 🪙 · ${tournament.rp} RP</strong></span>
        <span><small>Трофей</small><strong>${tournament.trophy}</strong></span>
        <span class="availability ${statusClass}">${availabilityText}</span>
      </div>
    `;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = state.match ? "Битва идёт" : "Начать битву";
    button.disabled = !hasFullSquad || currentPower < tournament.required || Boolean(state.match);
    button.addEventListener("click", () => startTournament(tournament));
    article.append(button);
    tournamentsEl.append(article);
  });
}

function renderDailyBonus() {
  const claimed = state.lastDailyBonusDate === todayKey();
  dailyBonusEl.disabled = claimed;
  dailyBonusEl.textContent = claimed ? "✓ Получен" : "✦ Дар +3";
  dailyBonusEl.classList.toggle("bonus-pulse", state.dailyBonusPulse);
  if (state.dailyBonusPulse) {
    window.setTimeout(() => {
      state.dailyBonusPulse = false;
      dailyBonusEl.classList.remove("bonus-pulse");
    }, 900);
  }
}

function renderEconomyHint() {
  economyHintEl.textContent = state.players.length < 4 ? state.economyHint : "Отряд собран. Теперь можно искать редкие усиления.";
}

function renderLastOpening() {
  const player = state.lastOpenedPlayer;
  if (!player) {
    latestSectionEl.hidden = true;
    lastOpeningEl.replaceChildren();
    lastOpeningEl.className = "last-opening";
    return;
  }

  latestSectionEl.hidden = false;

  const rarity = rarityName(player.rating);
  lastOpeningEl.className = `last-opening ${ratingClass(player.rating)}`;
  const featuredCard = playerCard(player);
  featuredCard.tabIndex = -1;
  const meta = document.createElement("div");
  meta.className = "last-opening-meta";
  meta.innerHTML = `
    <span class="last-opening__label">Последний призыв</span>
    <strong>${player.rating} · ${player.name}</strong>
    <small>${positionIcon(player.position)} ${player.position} · ${rarity}</small>
  `;
  const wrapper = document.createElement("div");
  wrapper.className = "last-opening-card";
  wrapper.append(featuredCard, meta);
  lastOpeningEl.replaceChildren(wrapper);
}

function renderTrophies() {
  trophiesEl.replaceChildren();
  const trophyNames = Object.keys(state.trophies);
  if (trophyNames.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Реликвий и почестей пока нет.";
    trophiesEl.append(empty);
    return;
  }

  trophyNames.sort().forEach((name) => {
    const item = document.createElement("div");
    item.className = "trophy-item";
    item.innerHTML = `<strong>${name}</strong><span>×${state.trophies[name]}</span>`;
    trophiesEl.append(item);
  });
}

function renderMatch() {
  decisionButtonsEl.replaceChildren();
  matchPanelEl.classList.toggle("is-live", Boolean(state.match));

  if (!state.match) {
    matchHintEl.textContent = "Выбери испытание, потом отдавай приказы в ключевых моментах битвы.";
    matchTournamentEl.textContent = "Нет битвы";
    matchScoreEl.textContent = "0 : 0";
    matchMinuteEl.textContent = "0'";
    matchEnergyEl.textContent = "100";
    momentTitleEl.textContent = "Битва ещё не началась";
    momentTextEl.textContent = "Собери полный отряд и нажми “Начать битву” в испытаниях.";
    return;
  }

  const match = state.match;
  const moment = moments[match.step];
  matchTournamentEl.textContent = match.tournament.name;
  matchScoreEl.textContent = `${match.playerGoals} : ${match.rivalGoals}`;
  matchMinuteEl.textContent = match.finished ? "90'" : `${moment.minute}'`;
  matchEnergyEl.textContent = match.energy;

  if (match.finished) {
    matchHintEl.textContent = "Битва завершена. Забери исход и выбери следующее испытание.";
    momentTitleEl.textContent = match.playerGoals > match.rivalGoals ? "Победа!" : "Битва проиграна";
    momentTextEl.textContent = `Итоговый счёт: ${match.playerGoals} : ${match.rivalGoals}.`;
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "<strong>Завершить битву</strong><span>Забрать итог</span>";
    button.addEventListener("click", closeFinishedMatch);
    decisionButtonsEl.append(button);
    return;
  }

  matchHintEl.textContent = "Выбери приказ. Рискованные манёвры могут дать преимущество, но открыть врагу шанс.";
  momentTitleEl.textContent = moment.title;
  momentTextEl.textContent = moment.text;
  moment.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `
      <strong>${option.label}</strong>
      <span class="decision-badges">
        <em>⚡ ${option.energy > 0 ? "+" : ""}${option.energy}</em>
        <em>🎲 риск ${option.risk}</em>
      </span>
    `;
    button.addEventListener("click", () => chooseDecision(option));
    decisionButtonsEl.append(button);
  });
}

function renderLog() {
  logEl.replaceChildren();
  state.log.slice(0, 3).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    logEl.append(li);
  });
}

function renderMainCta() {
  const action = recommendedAction();
  mainCtaEl.textContent = action.label;
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
  renderMainCta();
  setActiveScreen(activeScreen);
  saveGame();
}

if (!loadGame()) {
  startCleanGame({ clearStorage: false });
} else {
  render();
}
