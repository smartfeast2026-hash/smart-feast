const flavorTags = [
  { name: "甜度", type: "味覺", score: 48, description: "控制療癒感與負擔感，過高可能降低低負擔情境的適配度。", tags: ["甜點", "低甜", "犒賞"] },
  { name: "酸度", type: "味覺", score: 42, description: "提供清爽、提神與尾韻明亮感，適合午後或低負擔需求。", tags: ["清爽", "提神", "果香"] },
  { name: "濃郁度", type: "口感", score: 56, description: "影響飽足、溫暖與儀式感，適合犒賞或放鬆情境。", tags: ["濃厚", "奶香", "儀式感"] },
  { name: "清爽度", type: "口感", score: 68, description: "降低厚重感，支援低負擔、壓力後放鬆與夏季飲食情境。", tags: ["低負擔", "氣泡", "茶香"] },
  { name: "茶香", type: "香氣", score: 78, description: "作為 Smart Feast 初期資料庫的高辨識風味，可連結療癒、提神與成熟感。", tags: ["烏龍", "紅茶", "療癒"] },
  { name: "奶香", type: "香氣", score: 52, description: "增加圓潤與安定感，但需與清爽尾韻平衡。", tags: ["拿鐵", "甜點", "放鬆"] },
  { name: "果香", type: "香氣", score: 46, description: "適合約會、提神與季節新品，可提升記憶點。", tags: ["酸甜", "約會", "季節"] },
  { name: "儀式感", type: "情境", score: 64, description: "不只是味道，也包含搭配完整度、外觀層次與推薦說明。", tags: ["犒賞", "約會", "套餐"] }
];

const lexicon = [
  { name: "療癒", keywords: ["累", "壓力", "療癒", "安慰", "放鬆", "倒楣", "心情不好", "需要休息", "溫暖"], flavor: "低甜、茶香、奶香中等", description: "適合壓力、疲憊或需要安定感的情境。" },
  { name: "提神", keywords: ["提神", "下午", "醒腦", "開會", "精神", "熬夜", "沒睡飽", "想清醒", "疲倦"], flavor: "茶香高、酸度中、清爽度高", description: "適合午後、工作或需要精神切換的情境。" },
  { name: "約會", keywords: ["約會", "氣氛", "漂亮", "浪漫", "聊天", "紀念日", "拍照", "兩個人", "告白"], flavor: "果香、儀式感、甜度中", description: "適合社交與拍照分享，強調外觀與風味記憶點。" },
  { name: "低負擔", keywords: ["低負擔", "不要太甜", "清爽", "輕", "健康", "少糖", "控制熱量", "無負擔", "不膩"], flavor: "甜度低、清爽度高、濃郁度低", description: "適合想控制甜度、熱量或口感厚重度的需求。" },
  { name: "犒賞", keywords: ["犒賞", "獎勵", "儀式感", "想吃好的", "開心", "慶祝", "完成任務", "值得", "週末"], flavor: "濃郁度高、甜度中高、奶香高", description: "適合自我獎勵與特殊時刻，重視滿足感。" },
  { name: "專注", keywords: ["讀書", "專注", "工作", "趕報告", "效率", "考試", "加班", "寫作業", "動腦"], flavor: "茶香高、甜度低、清爽度中", description: "適合長時間工作或讀書，避免過甜造成疲乏。" }
];

const pairings = [
  {
    context: "療癒",
    drink: "桂花烏龍拿鐵",
    food: "蜂蜜檸檬磅蛋糕",
    note: "茶香柔和，酸甜收尾，適合壓力後放鬆。",
    tags: ["茶香", "低甜", "療癒"],
    scores: { sweet: 46, acid: 38, rich: 52, fresh: 64, tea: 76 },
    rank: 92
  },
  {
    context: "提神",
    drink: "青檸冷萃紅茶",
    food: "海鹽起司貝果",
    note: "酸度與茶感提高醒腦感，鹹香餐食平衡空腹負擔。",
    tags: ["清爽", "酸甜", "提神"],
    scores: { sweet: 32, acid: 72, rich: 34, fresh: 86, tea: 82 },
    rank: 88
  },
  {
    context: "約會",
    drink: "莓果玫瑰氣泡飲",
    food: "白巧覆盆子塔",
    note: "果香與外觀記憶點強，適合社交與分享。",
    tags: ["果香", "儀式感", "約會"],
    scores: { sweet: 62, acid: 58, rich: 48, fresh: 78, tea: 20 },
    rank: 84
  },
  {
    context: "低負擔",
    drink: "炭焙烏龍氣泡茶",
    food: "番茄羅勒佛卡夏",
    note: "茶韻乾淨、油脂感低，適合清爽正餐搭配。",
    tags: ["低負擔", "茶香", "餐食"],
    scores: { sweet: 22, acid: 44, rich: 28, fresh: 90, tea: 86 },
    rank: 81
  },
  {
    context: "犒賞",
    drink: "焦糖海鹽厚奶茶",
    food: "可可榛果布朗尼",
    note: "濃郁與甜香帶來滿足感，適合獎勵型消費。",
    tags: ["濃郁", "奶香", "犒賞"],
    scores: { sweet: 78, acid: 18, rich: 88, fresh: 24, tea: 54 },
    rank: 79
  },
  {
    context: "專注",
    drink: "無糖茉莉綠茶",
    food: "雞肉藜麥沙拉",
    note: "低甜、清爽且有飽足感，適合工作與讀書時段。",
    tags: ["專注", "低甜", "清爽"],
    scores: { sweet: 10, acid: 36, rich: 26, fresh: 84, tea: 74 },
    rank: 76
  }
];

const pairingMediaByContext = {
  "療癒": { image: "./fig/healing-alone-matcha-tiramisu.jpg", label: "療癒安靜獨處推薦" },
  "提神": { image: "./fig/fresh-recovery-white-tea-lemon-tart.jpg", label: "清爽恢復提神推薦" },
  "約會": { image: "./fig/date-floral-oolong-peach-tart-macaron.jpg", label: "精緻花果約會推薦" },
  "低負擔": { image: "./fig/fresh-recovery-white-tea-lemon-tart.jpg", label: "清爽低負擔推薦" },
  "犒賞": { image: "./fig/rich-roasted-oolong-chocolate-tart.jpg", label: "濃厚犒賞推薦" },
  "專注": { image: "./fig/healing-me-time-matcha-tea-dessert.jpg", label: "專注安靜獨處推薦" }
};

const dashboardSets = {
  today: [
    ["療癒", 34],
    ["提神", 24],
    ["低負擔", 18],
    ["約會", 14],
    ["犒賞", 10]
  ],
  week: [
    ["療癒", 29],
    ["提神", 22],
    ["低負擔", 21],
    ["犒賞", 16],
    ["約會", 12]
  ],
  mvp: [
    ["低負擔", 31],
    ["療癒", 27],
    ["提神", 20],
    ["約會", 13],
    ["犒賞", 9]
  ]
};

const ideaTemplates = {
  "療癒-低甜茶香": {
    title: "桂花青檸烏龍氣泡飲 × 蜂蜜米香塔",
    summary: "針對「療癒但低負擔」需求，設計茶香明確、甜度較低、尾韻清爽的飲品與輕甜點組合。",
    points: ["飲品以烏龍茶香作為主軸，加入桂花提升療癒感。", "甜點以米香與蜂蜜建立溫暖感，避免奶油厚重。", "適合發展成午後舒壓套餐或低甜系列主打。"]
  },
  "提神-酸甜提神": {
    title: "柚香冷萃紅茶 × 海鹽檸檬司康",
    summary: "以酸甜與茶感拉高醒腦感，搭配鹹甜點心降低午後疲乏。",
    points: ["主打下午茶與工作族群，文案可聚焦「醒腦但不刺激」。", "可測試無糖與微糖兩種版本，觀察購買意願差異。", "後台追蹤酸度接受度與重複點選率。"]
  },
  "約會-高儀式感甜點": {
    title: "莓果玫瑰烏龍 × 小山園白巧塔",
    summary: "以外觀層次、果香與茶香創造約會情境的記憶點。",
    points: ["適合作為雙人套餐或限定情境推薦。", "甜點需保留拍照辨識度，但避免過度甜膩。", "可觀察社群分享意願與情境按鈕點擊。"]
  },
  "低負擔-清爽乳香": {
    title: "燕麥茉莉輕拿鐵 × 香草優格杯",
    summary: "回應清爽但仍想要圓潤口感的需求，降低傳統奶類飲品的厚重感。",
    points: ["適合無負擔早餐與下午輕食時段。", "風味標籤應標註奶香、清爽、低甜。", "可作為健康感與舒適感兼具的常態商品線。"]
  },
  "犒賞-高儀式感甜點": {
    title: "焙茶焦糖厚奶 × 榛果可可千層",
    summary: "為獎勵型消費設計濃郁、有層次且具儀式感的搭配。",
    points: ["適合節慶、週末與完成任務後的情境推薦。", "可搭配限量標籤提高嘗鮮動機。", "後台需追蹤甜度過高與回購意願之間的關係。"]
  }
};

let currentTab = "flavor";
let latestPairing = pairings[0];
const storageKey = "smartFeastMvpState";
const defaultState = {
  interactions: 128,
  buyIntent: 63,
  contextCounts: {},
  lastContext: "療癒",
  lastGap: "低甜茶香",
  feedback: []
};

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
  } catch {
    return { ...defaultState };
  }
}

const appState = loadState();
let interactions = appState.interactions;
let buyIntent = appState.buyIntent;

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(appState));
  } catch {
    // The prototype still works when storage is blocked.
  }
}

const moodInput = document.querySelector("#mood-input");
const analyzeButton = document.querySelector("#analyze-button");
const tagOutput = document.querySelector("#tag-output");
const recommendationTitle = document.querySelector("#recommendation-title");
const confidencePill = document.querySelector("#confidence-pill");
const drinkName = document.querySelector("#drink-name");
const drinkNote = document.querySelector("#drink-note");
const foodName = document.querySelector("#food-name");
const foodNote = document.querySelector("#food-note");
const recommendationReason = document.querySelector("#recommendation-reason");
const recommendationGrid = document.querySelector(".recommendation-grid");
const databaseOutput = document.querySelector("#database-output");
const databaseSearch = document.querySelector("#database-search");

function detectContext(text) {
  const normalized = text.trim();
  const priorityRules = [
    { context: "約會", pattern: /約會|聚會|分享|朋友|拍照|漂亮|浪漫|社交|見面|聊天|告白|紀念日/ },
    { context: "犒賞", pattern: /犒賞|獎勵|甜點|下午茶|午後甜點|儀式感|想吃好的|慶祝|完成任務|週末|開心/ },
    { context: "提神", pattern: /提神|上班|醒腦|精神|開會|熬夜|沒睡飽|疲倦|工作提神/ },
    { context: "專注", pattern: /專注|讀書|趕報告|考試|加班|寫作業|動腦|效率/ },
    { context: "低負擔", pattern: /低負擔|無負擔|清爽|野餐|戶外|少糖|低甜|不要太甜|不膩|低油|健康|輕食|方便攜帶/ },
    { context: "療癒", pattern: /療癒|放鬆|壓力|累|安慰|休息|溫暖|心情不好/ }
  ];
  const directMatch = priorityRules.find((rule) => rule.pattern.test(normalized));
  if (directMatch) return directMatch.context;

  const scored = lexicon.map((item) => {
    const score = item.keywords.reduce((total, keyword) => total + (normalized.includes(keyword) ? 1 : 0), 0);
    return { ...item, score };
  });
  const match = scored.sort((a, b) => b.score - a.score)[0];
  return match.score > 0 ? match.name : "療癒";
}

function pickPairing(context) {
  return pairings.find((pairing) => pairing.context === context) || pairings[0];
}

function renderTags(tags) {
  if (!tagOutput) return;
  tagOutput.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
}

function ensureRecommendationImages() {
  if (!recommendationGrid) return {};
  let pairingFrame = document.querySelector("#pairing-image-frame");
  if (!pairingFrame) {
    pairingFrame = document.createElement("figure");
    pairingFrame.id = "pairing-image-frame";
    pairingFrame.className = "pairing-image-frame";
    pairingFrame.innerHTML = `<img id="pairing-image" src="" alt="" loading="lazy"><figcaption id="pairing-image-caption">依據食物與情境自動切換搭配圖片</figcaption>`;
    recommendationGrid.insertAdjacentElement("beforebegin", pairingFrame);
  }

  return {
    pairingImage: document.querySelector("#pairing-image"),
    pairingCaption: document.querySelector("#pairing-image-caption")
  };
}

function resolvePairingMedia(pairing) {
  return pairingMediaByContext[pairing.context] || pairingMediaByContext["療癒"];
}

function setMeters(scores) {
  const meters = {
    sweet: document.querySelector("#sweet-meter"),
    acid: document.querySelector("#acid-meter"),
    rich: document.querySelector("#rich-meter"),
    fresh: document.querySelector("#fresh-meter"),
    tea: document.querySelector("#tea-meter")
  };
  Object.entries(meters).forEach(([key, meter]) => {
    if (meter) meter.value = scores[key];
  });
  const wheel = document.querySelector("#flavor-wheel-visual");
  if (wheel) {
    const values = [scores.sweet, scores.acid, scores.rich, scores.fresh, scores.tea];
    const total = values.reduce((sum, value) => sum + value, 0) || 1;
    const cumulative = values.reduce((list, value, index) => {
      const previous = index === 0 ? 0 : list[index - 1];
      list.push(previous + (value / total) * 100);
      return list;
    }, []);
    wheel.style.setProperty("--p1", `${cumulative[0]}%`);
    wheel.style.setProperty("--p2", `${cumulative[1]}%`);
    wheel.style.setProperty("--p3", `${cumulative[2]}%`);
    wheel.style.setProperty("--p4", `${cumulative[3]}%`);
  }
}

function renderRecommendation(pairing) {
  if (!recommendationTitle) return;
  const media = resolvePairingMedia(pairing);
  const images = ensureRecommendationImages();
  latestPairing = pairing;
  recommendationTitle.textContent = `${pairing.context}情境搭配`;
  confidencePill.textContent = `匹配度 ${pairing.rank}%`;
  drinkName.textContent = pairing.drink;
  drinkNote.textContent = pairing.note;
  foodName.textContent = pairing.food;
  foodNote.textContent = pairing.tags.includes("餐食") ? "作為正餐輕食搭配，降低選擇負擔。" : "作為甜點搭配，補足情境記憶點。";
  if (images.pairingImage) {
    images.pairingImage.src = media.image;
    images.pairingImage.alt = `${pairing.drink} 與 ${pairing.food} 的推薦搭配圖片`;
  }
  if (images.pairingCaption) {
    images.pairingCaption.textContent = `${media.label}｜${pairing.drink} × ${pairing.food}`;
  }
  renderTags(pairing.tags);
  setMeters(pairing.scores);
  recommendationReason.textContent = `系統判斷語句接近「${pairing.context}」情境，因此依據風味輪選擇 ${pairing.tags.join("、")} 的組合：${pairing.note}`;
}

function setAnalysisLoading(isLoading) {
  const loading = document.querySelector("#analysis-loading");
  const panel = document.querySelector("#analysis-panel");
  if (loading) loading.hidden = !isLoading;
  if (panel) panel.setAttribute("aria-busy", String(isLoading));
  if (analyzeButton) {
    analyzeButton.disabled = isLoading;
    if (analyzeButton.classList.contains("front-cta")) {
      analyzeButton.innerHTML = isLoading ? "AI 分析中…" : `開始推薦 <span aria-hidden="true">&rarr;</span>`;
    } else {
      analyzeButton.textContent = isLoading ? "AI 分析中…" : "AI 風味轉譯與推薦";
    }
  }
}

async function runAnalysis() {
  if (!moodInput) return;
  await analyzeContext(detectContext(moodInput.value));
}

async function analyzeContext(context) {
  setAnalysisLoading(true);
  const stages = ["解析語意與情境標籤…", "轉換風味輪參數…", "計算最佳餐飲搭配…"];
  const stage = document.querySelector("#analysis-stage");
  for (const message of stages) {
    if (stage) stage.textContent = message;
    await new Promise((resolve) => setTimeout(resolve, 260));
  }
  renderRecommendation(pickPairing(context));
  interactions += 1;
  appState.interactions = interactions;
  appState.lastContext = context;
  updateMetrics();
  bumpContext(context);
  saveState();
  setAnalysisLoading(false);
}

function bumpContext(context) {
  const today = dashboardSets.today;
  const row = today.find((item) => item[0] === context);
  if (row) row[1] += 1;
  appState.contextCounts[context] = (appState.contextCounts[context] || 0) + 1;
  renderBars(today);
}

function updateMetrics() {
  const values = {
    "#metric-interactions": String(interactions),
    "#metric-intent": `${buyIntent}%`,
    "#metric-context": appState.lastContext || latestPairing.context,
    "#metric-gap": appState.lastGap || (latestPairing.tags.includes("低甜") ? "低甜茶香" : latestPairing.tags[0])
  };
  Object.entries(values).forEach(([selector, value]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  });
}

function renderBars(rows) {
  const chart = document.querySelector("#context-bars");
  if (!chart) return;
  const max = Math.max(...rows.map((row) => row[1]));
  chart.innerHTML = rows
    .map(([label, value]) => {
      const width = Math.round((value / max) * 100);
      return `<div class="bar-row"><strong>${label}</strong><div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div><span>${value}%</span></div>`;
    })
    .join("");
}

function renderRanking() {
  const ranking = document.querySelector("#pairing-ranking");
  if (!ranking) return;
  const adminLayout = document.body.classList.contains("admin-console");
  ranking.innerHTML = [...pairings]
    .sort((a, b) => b.rank - a.rank)
    .slice(0, 5)
    .map((item) => adminLayout
      ? `<li>
          <div class="pairing-score"><strong>${item.context}推薦組合</strong><em>${item.rank}%</em></div>
          <div class="pairing-visual"><span>☕</span><b>＋</b><span>${item.tags.includes("餐食") ? "🥪" : "🍰"}</span></div>
          <strong>${item.drink} × ${item.food}</strong>
          <small>${item.note}</small>
          <span>${item.tags.join(" · ")}</span>
        </li>`
      : `<li><strong>${item.drink} × ${item.food}</strong><small>${item.note}</small><br><span>${item.context}</span></li>`)
    .join("");
}

function renderDatabase() {
  if (!databaseOutput || !databaseSearch) return;
  const query = databaseSearch.value.trim().toLowerCase();
  let rows = [];
  if (currentTab === "flavor") {
    rows = flavorTags.map((item) => ({
      title: item.name,
      body: `${item.type}｜${item.description}`,
      tags: item.tags
    }));
  }
  if (currentTab === "lexicon") {
    rows = lexicon.map((item) => ({
      title: item.name,
      body: `${item.description} 對應風味：${item.flavor}`,
      tags: item.keywords
    }));
  }
  if (currentTab === "pairings") {
    rows = pairings.map((item) => ({
      title: `${item.drink} × ${item.food}`,
      body: item.note,
      tags: item.tags
    }));
  }

  const filtered = rows.filter((item) => {
    const haystack = `${item.title} ${item.body} ${item.tags.join(" ")}`.toLowerCase();
    return haystack.includes(query);
  });

  const symbols = { flavor: "◉", lexicon: "⌁", pairings: "☕＋🍰" };
  databaseOutput.innerHTML = filtered.length
    ? filtered.map((item) => `<article class="database-card"><div class="card-symbol">${symbols[currentTab]}</div><h3>${item.title}</h3><p>${item.body}</p><div class="card-tags">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div></article>`).join("")
    : `<article class="database-card"><h3>查無資料</h3><p>請嘗試搜尋其他情境、風味或品項名稱。</p></article>`;
  const count = document.querySelector("#database-count");
  if (count) {
    const phraseCount = lexicon.reduce((total, item) => total + item.keywords.length, 0);
    count.textContent = currentTab === "lexicon"
      ? `共 ${phraseCount} 組語意關鍵詞，顯示 ${filtered.length} 個情境分類`
      : `顯示 ${filtered.length} 筆資料`;
  }
}

function renderIdea() {
  const contextSelect = document.querySelector("#innovation-context");
  const gapSelect = document.querySelector("#innovation-gap");
  if (!contextSelect || !gapSelect) return;
  const context = contextSelect.value;
  const gap = gapSelect.value;
  const idea = ideaTemplates[`${context}-${gap}`] || ideaTemplates[`${context}-高儀式感甜點`] || ideaTemplates["療癒-低甜茶香"];
  document.querySelector("#idea-title").textContent = idea.title;
  document.querySelector("#idea-summary").textContent = idea.summary;
  document.querySelector("#idea-points").innerHTML = idea.points.map((point) => `<li>${point}</li>`).join("");
}

function renderActivity() {
  const output = document.querySelector("#activity-list");
  if (!output) return;
  const labels = {
    like: "喜歡推薦",
    dislike: "不喜歡",
    "less-sweet": "希望降低甜度",
    "less-rich": "希望降低濃郁度",
    lighter: "希望更清爽",
    buy: "有購買意願"
  };
  const rows = appState.feedback.slice(-5).reverse();
  output.innerHTML = rows.length
    ? rows.map((item) => `<div class="activity-item"><span>${labels[item.type] || item.type}</span><strong>${item.context}</strong><small>${item.time}</small></div>`).join("")
    : `<p class="empty-state">尚無本機前台回饋。前往前端操作後，資料會顯示在這裡。</p>`;
}

function showScreen(screen) {
  const validScreens = ["frontdesk", "dashboard", "databases", "innovation"];
  const target = validScreens.includes(screen) ? screen : "home";
  document.body.classList.toggle("screen-mode", target !== "home");

  document.querySelectorAll(".screen-section").forEach((section) => {
    section.classList.toggle("is-active", section.dataset.screen === target);
  });

  document.querySelectorAll("[data-screen-link]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.screenLink === target);
  });

  if (target === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function syncScreenFromHash() {
  const screen = window.location.hash.replace("#", "") || document.body.dataset.defaultScreen || "home";
  showScreen(screen === "top" ? "home" : screen);
}

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    moodInput.value = button.dataset.prompt;
    analyzeContext(button.dataset.context || detectContext(button.dataset.prompt || ""));
  });
});

document.querySelectorAll("[data-feedback]").forEach((button) => {
  button.addEventListener("click", () => {
    const feedback = button.dataset.feedback;
    interactions += 1;
    if (feedback === "buy") buyIntent = Math.min(99, buyIntent + 2);
    if (feedback === "less-sweet") latestPairing.scores.sweet = Math.max(0, latestPairing.scores.sweet - 8);
    if (feedback === "less-rich") latestPairing.scores.rich = Math.max(0, latestPairing.scores.rich - 8);
    if (feedback === "lighter") latestPairing.scores.fresh = Math.min(100, latestPairing.scores.fresh + 8);
    appState.interactions = interactions;
    appState.buyIntent = buyIntent;
    appState.lastContext = latestPairing.context;
    appState.lastGap = feedback === "less-sweet" ? "低甜茶香" : feedback === "less-rich" ? "清爽乳香" : appState.lastGap;
    appState.feedback.push({
      type: feedback,
      context: latestPairing.context,
      time: new Intl.DateTimeFormat("zh-TW", { hour: "2-digit", minute: "2-digit" }).format(new Date())
    });
    appState.feedback = appState.feedback.slice(-20);
    saveState();
    setMeters(latestPairing.scores);
    updateMetrics();
    const status = document.querySelector("#feedback-status");
    if (status) status.textContent = feedback === "buy" ? "已記錄購買意願，後台指標已更新。" : "已記錄偏好，推薦風味已同步微調。";
    button.classList.add("is-recorded");
  });
});

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    currentTab = button.dataset.tab;
    document.querySelectorAll("[data-tab]").forEach((tab) => tab.setAttribute("aria-selected", String(tab === button)));
    renderDatabase();
  });
});

analyzeButton?.addEventListener("click", runAnalysis);
databaseSearch?.addEventListener("input", renderDatabase);
document.querySelector("#dashboard-filter")?.addEventListener("change", (event) => renderBars(dashboardSets[event.target.value]));
document.querySelector("#generate-idea")?.addEventListener("click", renderIdea);
window.addEventListener("hashchange", syncScreenFromHash);

renderRecommendation(pairings[0]);
const todayRows = dashboardSets.today.map(([label, value]) => [label, value + (appState.contextCounts[label] || 0)]);
renderBars(todayRows);
renderRanking();
renderDatabase();
renderIdea();
renderActivity();
updateMetrics();
syncScreenFromHash();
