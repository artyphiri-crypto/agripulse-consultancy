// ==========================================
// 1. COMMODITY & SPECULATION DATA
// ==========================================
const commodityData = [
  {
    id: "maize",
    name: "White Maize (Grade A)",
    category: "Grains",
    localPrice: "MWK 850 / kg",
    localHub: "Lilongwe / Blantyre Wholesale",
    intlBenchmark: "US / Regional Maize Futures & SADC Cross-Border Flows",
    intlSignal: "Global maize supply remains comfortable in major exporters, but regional trade flows and weather shifts keep local lean-season pricing sensitive.",
    change: "+4.2%",
    trend: "up",
    speculationLevel: "High",
    forecast: "MWK 920 - 960 / kg",
    bullCase: "Speculative stocking ahead of peak lean months, rising transport/fuel costs, and tight local storage in deficit pockets.",
    bearCase: "Competitive cross-border inflows from neighbouring surplus markets capping sharp spikes.",
    action: "Stagger sales in 2–3 tranches; lock mill/processor off-take agreements before peak supply arrives."
  },
  {
    id: "soya",
    name: "Soya Beans (Non-GMO)",
    category: "Legumes",
    localPrice: "MWK 1,450 / kg",
    localHub: "Central & Southern Aggregation Hubs",
    intlBenchmark: "CBOT Soybeans & Global Vegetable Oil / Feed Complex",
    intlSignal: "Strong global oilseed and vegetable oil demand alongside South American/US weather watch supports firm international pricing.",
    change: "+6.8%",
    trend: "up",
    speculationLevel: "High",
    forecast: "MWK 1,550 - 1,620 / kg",
    bullCase: "Domestic poultry/feed millers competing for clean non-GMO stock while global oilseed sentiment stays firm.",
    bearCase: "Imported feed substitutes or sudden trader unloading if cash liquidity tightens.",
    action: "Grade and clean to moisture standards first; negotiate forward volume pricing with feed processors."
  },
  {
    id: "groundnuts",
    name: "Groundnuts (CG7 Shelled)",
    category: "Legumes",
    localPrice: "MWK 2,100 / kg",
    localHub: "Mchinji / Lilongwe / Regional Traders",
    intlBenchmark: "Global Edible Nut & Confectionery / Export Demand",
    intlSignal: "Export buyers pay steep premiums for low-aflatoxin, uniform confectionery grades over ungraded spot lots.",
    change: "-1.5%",
    trend: "down",
    speculationLevel: "Moderate",
    forecast: "MWK 2,050 - 2,180 / kg",
    bullCase: "Aflatoxin-tested, well-dried export lots attract quality premiums from regional and overseas buyers.",
    bearCase: "Short-term local market flooding from distress sales lowers average ungraded spot prices.",
    action: "Avoid selling damp or mixed-size nuts at a discount; invest in proper drying, sorting, and quality testing."
  },
  {
    id: "tobacco",
    name: "Burley Tobacco (Leaf)",
    category: "Cash Crops",
    localPrice: "USD 2.45 / kg (Equiv.)",
    localHub: "Auction & Contracted Leaf Floors",
    intlBenchmark: "Global Burley Leaf Balance & International Manufacturer Demand",
    intlSignal: "International leaf buyers closely track global burley output and quality ratios as manufacturers manage multi-year blend inventories.",
    change: "+2.1%",
    trend: "up",
    speculationLevel: "Moderate",
    forecast: "USD 2.50 - 2.60 / kg",
    bullCase: "Clean leaf grading, proper bale presentation, and firm export contract demand support upper-tier prices.",
    bearCase: "Global shifts in tobacco regulation or oversupply in lower leaf grades.",
    action: "Prioritise grading accuracy and leaf conditioning to protect unit realisations."
  },
  {
    id: "coffee",
    name: "Arabica Coffee (Washed)",
    category: "Cash Crops",
    localPrice: "USD 4.10 / kg (Parchment/Green Eq.)",
    localHub: "Northern Highlands / Specialty Exporters",
    intlBenchmark: "ICE Arabica Futures & Specialty Roaster Differentials",
    intlSignal: "Global coffee markets react sharply to origin weather speculation, roaster restocking, and specialty traceability premiums.",
    change: "+5.0%",
    trend: "up",
    speculationLevel: "High",
    forecast: "USD 4.25 - 4.45 / kg",
    bullCase: "Tight specialty supply and strong roaster differentials reward wet-milled, traceable lots.",
    bearCase: "Speculative profit-taking on international futures exchanges or currency shifts.",
    action: "Document farm origin and cupping/processing quality to capture specialty export differentials."
  },
  {
    id: "potatoes",
    name: "Irish Potatoes (Ware)",
    category: "Horticulture",
    localPrice: "MWK 700 / kg",
    localHub: "Dedza / Ntcheu / Urban Wholesale Markets",
    intlBenchmark: "Local Urban Foodservice & Regional Perishable Trade",
    intlSignal: "Driven less by global futures and more by seasonal harvest waves, post-harvest spoilage, and urban hotel/retail demand.",
    change: "0.0%",
    trend: "neutral",
    speculationLevel: "Moderate",
    forecast: "MWK 750 - 820 / kg",
    bullCase: "High post-harvest losses in uncooled storage tighten marketable supply between harvest peaks.",
    bearCase: "Simultaneous harvests across highland pockets creating short-lived oversupply.",
    action: "Cure tubers properly, grade by size, and split sales between wholesale and institutional buyers."
  }
];

const presets = {
  maize: { crop: "White Maize", area: 2, yieldPerHa: 2800, costPerHa: 950000, pricePerKg: 850, logistics: 180000 },
  soya: { crop: "Soya Beans", area: 3, yieldPerHa: 1650, costPerHa: 880000, pricePerKg: 1450, logistics: 150000 },
  groundnuts: { crop: "Groundnuts (CG7)", area: 1.5, yieldPerHa: 1400, costPerHa: 1100000, pricePerKg: 2100, logistics: 120000 }
};

// ==========================================
// 2. GLOBAL BUTTON HANDLERS (WINDOW-BOUND)
// ==========================================
window.selectService = function (serviceName) {
  const select = document.getElementById("serviceSelect");
  const consultSection = document.getElementById("consult");
  if (select) select.value = serviceName;
  if (consultSection) consultSection.scrollIntoView({ behavior: "smooth" });
};

window.openSpecModal = function (id) {
  const item = commodityData.find(c => c.id === id);
  const specModal = document.getElementById("specModal");
  const specModalContent = document.getElementById("specModalContent");
  if (!item || !specModal || !specModalContent) return;

  specModalContent.innerHTML = `
    <div class="mb-4">
      <span class="text-xs font-bold uppercase tracking-wider text-agriOrange">${item.category} &bull; ${item.speculationLevel} Speculation</span>
      <h3 class="text-2xl font-extrabold text-slate-900 mt-1">${item.name}</h3>
      <p class="text-xs text-slate-500 mt-0.5">Local Hub: ${item.localHub}</p>
    </div>

    <div class="grid sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5 text-sm">
      <div>
        <span class="text-xs text-slate-500 block">Local Price</span>
        <span class="font-bold text-slate-900">${item.localPrice}</span>
      </div>
      <div>
        <span class="text-xs text-slate-500 block">7-Day Shift</span>
        <span class="font-bold text-slate-900">${item.change}</span>
      </div>
      <div>
        <span class="text-xs text-slate-500 block">30-Day Forecast</span>
        <span class="font-bold text-agriGreen">${item.forecast}</span>
      </div>
    </div>

    <div class="space-y-4 text-sm">
      <div>
        <h4 class="font-bold text-slate-900 mb-1"><i class="fa-solid fa-globe text-agriGreen mr-1.5"></i> International Market Link</h4>
        <p class="text-slate-600 leading-relaxed"><strong class="text-slate-800">${item.intlBenchmark}:</strong> ${item.intlSignal}</p>
      </div>

      <div class="grid sm:grid-cols-2 gap-4">
        <div class="bg-green-50/70 border border-green-200 rounded-xl p-4">
          <h4 class="font-bold text-agriGreen text-xs uppercase mb-1"><i class="fa-solid fa-arrow-trend-up mr-1"></i> Bullish Speculation (Upside)</h4>
          <p class="text-xs text-slate-700 leading-relaxed">${item.bullCase}</p>
        </div>
        <div class="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
          <h4 class="font-bold text-amber-800 text-xs uppercase mb-1"><i class="fa-solid fa-triangle-exclamation mr-1"></i> Downside &amp; Market Risks</h4>
          <p class="text-xs text-slate-700 leading-relaxed">${item.bearCase}</p>
        </div>
      </div>

      <div class="bg-slate-100 rounded-xl p-4">
        <h4 class="font-bold text-slate-900 text-xs uppercase mb-1">Recommended Commercial Move</h4>
        <p class="text-slate-700 text-xs leading-relaxed">${item.action}</p>
      </div>
    </div>

    <div class="mt-6 flex flex-wrap gap-3 justify-end">
      <button type="button" onclick="closeSpecModal()" class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition">
        Close
      </button>
      <button type="button" onclick="requestCommodityBrief('${item.name.replace(/'/g, "\\'")}')" class="px-5 py-2 text-sm font-bold bg-agriOrange hover:bg-orange-600 text-white rounded-lg transition">
        Request Custom Forecast Brief
      </button>
    </div>
  `;

  specModal.classList.remove("hidden");
};

window.closeSpecModal = function () {
  const specModal = document.getElementById("specModal");
  if (specModal) specModal.classList.add("hidden");
};

window.requestCommodityBrief = function (cropName) {
  window.closeSpecModal();
  const serviceSelect = document.getElementById("serviceSelect");
  const clientBrief = document.getElementById("clientBrief");
  const consultSection = document.getElementById("consult");

  if (serviceSelect) serviceSelect.value = "Custom Market Price Forecast";
  if (clientBrief) {
    clientBrief.value = `Requesting a custom market price forecast, local-to-international price spread analysis, and off-take timing brief for ${cropName}.`;
  }
  if (consultSection) consultSection.scrollIntoView({ behavior: "smooth" });
};

window.calculateMargin = function () {
  const areaEl = document.getElementById("calcArea");
  const yieldEl = document.getElementById("calcYield");
  const costEl = document.getElementById("calcCostPerHa");
  const priceEl = document.getElementById("calcPricePerKg");
  const logEl = document.getElementById("calcLogistics");
  if (!areaEl || !yieldEl || !costEl || !priceEl || !logEl) return;

  const formatMWK = (num) => "MWK " + Math.round(num).toLocaleString("en-GB");

  const area = Math.max(0, parseFloat(areaEl.value) || 0);
  const yieldPerHa = Math.max(0, parseFloat(yieldEl.value) || 0);
  const costPerHa = Math.max(0, parseFloat(costEl.value) || 0);
  const pricePerKg = Math.max(0, parseFloat(priceEl.value) || 0);
  const logistics = Math.max(0, parseFloat(logEl.value) || 0);

  const totalKg = area * yieldPerHa;
  const revenue = totalKg * pricePerKg;
  const totalCost = (area * costPerHa) + logistics;
  const margin = revenue - totalCost;
  const marginRatio = revenue > 0 ? ((margin / revenue) * 100).toFixed(1) : "0.0";
  const breakEvenKg = pricePerKg > 0 ? Math.ceil(totalCost / pricePerKg) : 0;

  const outTotalKg = document.getElementById("outTotalKg");
  const outRevenue = document.getElementById("outRevenue");
  const outTotalCost = document.getElementById("outTotalCost");
  const outBreakEven = document.getElementById("outBreakEven");
  const outMargin = document.getElementById("outMargin");
  const outMarginRate = document.getElementById("outMarginRate");

  if (outTotalKg) outTotalKg.textContent = `${Math.round(totalKg).toLocaleString("en-GB")} kg`;
  if (outRevenue) outRevenue.textContent = formatMWK(revenue);
  if (outTotalCost) outTotalCost.textContent = formatMWK(totalCost);
  if (outBreakEven) outBreakEven.textContent = `${breakEvenKg.toLocaleString("en-GB")} kg`;

  if (outMargin) {
    outMargin.textContent = formatMWK(margin);
    outMargin.className = margin >= 0
      ? "text-2xl sm:text-3xl font-extrabold text-agriGreen tracking-tight"
      : "text-2xl sm:text-3xl font-extrabold text-red-600 tracking-tight";
  }

  if (outMarginRate) outMarginRate.textContent = `Gross Margin Ratio: ${marginRatio}%`;
};

window.loadPreset = function (key) {
  const p = presets[key];
  if (!p) return;
  document.getElementById("calcCrop").value = p.crop;
  document.getElementById("calcArea").value = p.area;
  document.getElementById("calcYield").value = p.yieldPerHa;
  document.getElementById("calcCostPerHa").value = p.costPerHa;
  document.getElementById("calcPricePerKg").value = p.pricePerKg;
  document.getElementById("calcLogistics").value = p.logistics;
  window.calculateMargin();
};

window.attachCalculationToConsult = function () {
  const crop = document.getElementById("calcCrop")?.value || "Crop Enterprise";
  const area = document.getElementById("calcArea")?.value || "0";
  const revenue = document.getElementById("outRevenue")?.textContent || "";
  const totalCost = document.getElementById("outTotalCost")?.textContent || "";
  const margin = document.getElementById("outMargin")?.textContent || "";
  const breakEven = document.getElementById("outBreakEven")?.textContent || "";

  const serviceSelect = document.getElementById("serviceSelect");
  const clientBrief = document.getElementById("clientBrief");
  const consultSection = document.getElementById("consult");

  if (serviceSelect) serviceSelect.value = "Agribusiness Management";
  if (clientBrief) {
    clientBrief.value = `Enterprise review for ${crop} (${area} ha): Projected Revenue ${revenue}, Total Cost ${totalCost}, Net Gross Margin ${margin}, Break-Even Yield ${breakEven}. Looking for advisory on optimising margins and market timing.`;
  }
  if (consultSection) consultSection.scrollIntoView({ behavior: "smooth" });
};

window.sendViaWhatsApp = function () {
  const name = document.getElementById("clientName")?.value.trim() || "";
  const org = document.getElementById("clientOrg")?.value.trim() || "";
  const contact = document.getElementById("clientContact")?.value.trim() || "";
  const service = document.getElementById("serviceSelect")?.value || "Agribusiness Consultancy";
  const brief = document.getElementById("clientBrief")?.value.trim() || "";

  if (!name || !brief) {
    alert("Please enter your Full Name and Project Brief before sending via WhatsApp.");
    return;
  }

  const message =
    `*New AgriPulse Consultancy Request*%0A` +
    `*Name:* ${encodeURIComponent(name)}%0A` +
    `*Organisation:* ${encodeURIComponent(org || "N/A")}%0A` +
    `*Contact:* ${encodeURIComponent(contact || "N/A")}%0A` +
    `*Service:* ${encodeURIComponent(service)}%0A` +
    `*Brief:* ${encodeURIComponent(brief)}`;

  window.open(`https://wa.me/265998717254?text=${message}`, "_blank");
};

window.askPresetAI = function (promptText) {
  const aiUserInput = document.getElementById("aiUserInput");
  const aiChatForm = document.getElementById("aiChatForm");
  if (!aiUserInput || !aiChatForm) return;
  aiUserInput.value = promptText;
  aiChatForm.dispatchEvent(new Event("submit", { cancelable: true }));
};

window.escalateAIToConsult = function (topic) {
  const clientBrief = document.getElementById("clientBrief");
  const consultSection = document.getElementById("consult");
  if (clientBrief) {
    clientBrief.value = `Follow-up from AgriPulse AI consultation regarding: "${topic}"`;
  }
  if (consultSection) consultSection.scrollIntoView({ behavior: "smooth" });
};

// ==========================================
// 3. RENDERING & EVENT INITIALIZATION
// ==========================================
function renderHeroSnapshot() {
  const heroSnapshot = document.getElementById("heroSnapshot");
  if (!heroSnapshot) return;

  heroSnapshot.innerHTML = commodityData.slice(0, 3).map(item => {
    const badgeColor = item.trend === "up"
      ? "text-green-700 bg-green-100"
      : item.trend === "down"
      ? "text-red-700 bg-red-100"
      : "text-slate-700 bg-slate-100";

    return `
      <div onclick="openSpecModal('${item.id}')" class="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 cursor-pointer transition">
        <div>
          <p class="font-bold text-sm text-slate-900">${item.name}</p>
          <p class="text-xs text-slate-500">30d Forecast: <span class="font-semibold text-slate-700">${item.forecast}</span></p>
        </div>
        <div class="text-right">
          <p class="font-bold text-sm text-slate-900">${item.localPrice}</p>
          <span class="inline-block text-xs font-bold px-2 py-0.5 rounded-md ${badgeColor}">${item.change}</span>
        </div>
      </div>
    `;
  }).join("");
}

function renderMarketTable(data) {
  const marketTableBody = document.getElementById("marketTableBody");
  if (!marketTableBody) return;

  if (data.length === 0) {
    marketTableBody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-slate-500">No matching commodities found.</td></tr>`;
    return;
  }

  marketTableBody.innerHTML = data.map(item => {
    const trendBadge = item.trend === "up"
      ? `<span class="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full text-xs font-bold"><i class="fa-solid fa-arrow-trend-up"></i> ${item.change}</span>`
      : item.trend === "down"
      ? `<span class="inline-flex items-center gap-1 text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full text-xs font-bold"><i class="fa-solid fa-arrow-trend-down"></i> ${item.change}</span>`
      : `<span class="inline-flex items-center gap-1 text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full text-xs font-bold"><i class="fa-solid fa-minus"></i> ${item.change}</span>`;

    const specPill = item.speculationLevel === "High"
      ? `<span class="text-[11px] font-bold bg-orange-100 text-agriOrange px-2.5 py-0.5 rounded-full">High Speculation</span>`
      : `<span class="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">Moderate Watch</span>`;

    return `
      <tr onclick="openSpecModal('${item.id}')" class="hover:bg-slate-50 cursor-pointer transition-colors">
        <td class="py-4 px-5">
          <div class="font-bold text-slate-900">${item.name}</div>
          <div class="text-xs text-slate-500 mt-0.5">${item.category} &bull; ${item.localHub}</div>
        </td>
        <td class="py-4 px-5 font-bold text-slate-900">${item.localPrice}</td>
        <td class="py-4 px-5 text-xs text-slate-600 max-w-xs">
          <div class="font-bold text-slate-800 mb-0.5">${item.intlBenchmark}</div>
          <div>${item.intlSignal}</div>
        </td>
        <td class="py-4 px-5">${trendBadge}</td>
        <td class="py-4 px-5 font-bold text-agriGreen">${item.forecast}</td>
        <td class="py-4 px-5 space-y-1.5 max-w-xs">
          <div>${specPill}</div>
          <p class="text-xs text-slate-600">${item.action}</p>
          <span class="inline-block text-xs font-bold text-agriOrange">Inspect speculation &rarr;</span>
        </td>
      </tr>
    `;
  }).join("");
}

function filterMarketData() {
  const query = (document.getElementById("cropSearch")?.value || "").toLowerCase();
  const category = document.getElementById("categoryFilter")?.value || "All";
  const volatility = document.getElementById("volatilityFilter")?.value || "All";

  const filtered = commodityData.filter(item => {
    const searchableText = `${item.name} ${item.category} ${item.intlBenchmark} ${item.intlSignal} ${item.bullCase} ${item.bearCase} ${item.action}`.toLowerCase();
    const matchesSearch = searchableText.includes(query);
    const matchesCategory = category === "All" || item.category === category;
    const matchesVolatility = volatility === "All" || item.speculationLevel === volatility;
    return matchesSearch && matchesCategory && matchesVolatility;
  });

  renderMarketTable(filtered);
}

function generateLocalAgriResponse(question) {
  const q = question.toLowerCase();

  if (q.includes("maize") || q.includes("soya") || q.includes("price") || q.includes("forecast") || q.includes("hold") || q.includes("sell")) {
    const maize = commodityData.find(c => c.id === "maize");
    const soya = commodityData.find(c => c.id === "soya");
    return `
      <p class="font-bold text-white mb-1.5">Commercial Market &amp; Timing Advisory:</p>
      <ul class="list-disc pl-4 space-y-1.5 text-slate-300">
        <li><strong>White Maize (${maize.localPrice} &rarr; 30d Target ${maize.forecast}):</strong> ${maize.action}</li>
        <li><strong>Soya Beans (${soya.localPrice} &rarr; 30d Target ${soya.forecast}):</strong> ${soya.action}</li>
        <li><strong>Risk Management Rule:</strong> Sell 40% to cover immediate working capital and stagger the remaining 60% into verified off-taker contracts.</li>
      </ul>
    `;
  }

  if (q.includes("groundnut") || q.includes("aflatoxin") || q.includes("contract") || q.includes("off-taker") || q.includes("marketing")) {
    return `
      <p class="font-bold text-white mb-1.5">Off-Taker Contracting &amp; Quality Structuring:</p>
      <ul class="list-disc pl-4 space-y-1.5 text-slate-300">
        <li><strong>Moisture &amp; Aflatoxin Control:</strong> Dry groundnuts below <strong>8% moisture</strong> on tarpaulins or raised racks—never directly on bare soil—and hand-sort damaged kernels before aggregation.</li>
        <li><strong>Contract Clauses:</strong> Lock in minimum floor pricing, clear moisture/grade tolerances, transparent weighing at the aggregation point, and a 7-to-14 day payment window.</li>
        <li><strong>Premium Capture:</strong> Certified low-aflatoxin CG7 lots consistently command 15–25% premiums over ungraded spot sales.</li>
      </ul>
    `;
  }

  if (q.includes("bankable") || q.includes("finance") || q.includes("grant") || q.includes("loan") || q.includes("business plan")) {
    return `
      <p class="font-bold text-white mb-1.5">Bankable Agribusiness Readiness Checklist:</p>
      <ul class="list-disc pl-4 space-y-1.5 text-slate-300">
        <li><strong>Unit Economics:</strong> Clear gross margin per hectare showing input costs, expected yield, and break-even price (use our Gross Margin Calculator above).</li>
        <li><strong>Verified Off-Take:</strong> Letters of intent (LOIs) or supply agreements with reputable processors, millers, or exporters.</li>
        <li><strong>Cash-Flow Alignment:</strong> Loan repayment schedules structured around harvest cycles rather than rigid monthly amortisation during crop growth.</li>
      </ul>
    `;
  }

  if (q.includes("supply chain") || q.includes("post-harvest") || q.includes("loss") || q.includes("storage") || q.includes("logistics")) {
    return `
      <p class="font-bold text-white mb-1.5">Supply Chain &amp; Post-Harvest Loss Reduction:</p>
      <ul class="list-disc pl-4 space-y-1.5 text-slate-300">
        <li><strong>Grains &amp; Legumes:</strong> Adopt hermetic storage bags (PICS) to eliminate weevil losses without chemical residue, preserving export grade.</li>
        <li><strong>Horticulture:</strong> Harvest during cool early-morning hours, use ventilated plastic crates instead of sacks to cut bruising by over 30%, and pre-cool before transit.</li>
        <li><strong>Aggregation Hubs:</strong> Consolidate smallholder volumes at village collection points with digital weighing and moisture meters to reduce transport cost per tonne.</li>
      </ul>
    `;
  }

  return `
    <p class="font-bold text-white mb-1.5">AgriPulse Structured Advisory Framework:</p>
    <p class="text-slate-300 mb-2">To optimise this enterprise decision, focus on three commercial pillars:</p>
    <ol class="list-decimal pl-4 space-y-1 text-slate-300">
      <li><strong>Cost-per-Kg Control:</strong> Benchmark input and labour spend against realistic conservative yields.</li>
      <li><strong>Grade &amp; Moisture Discipline:</strong> Meet processor specifications upfront to avoid dockage penalties.</li>
      <li><strong>Forward Off-Take Linkage:</strong> Secure buyer commitments before peak harvest depresses local spot prices.</li>
    </ol>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
  }

  // Market filters
  document.getElementById("cropSearch")?.addEventListener("input", filterMarketData);
  document.getElementById("categoryFilter")?.addEventListener("change", filterMarketData);
  document.getElementById("volatilityFilter")?.addEventListener("change", filterMarketData);

  // Speculation modal backdrop close
  const specModal = document.getElementById("specModal");
  if (specModal) {
    specModal.addEventListener("click", (e) => {
      if (e.target === specModal) window.closeSpecModal();
    });
  }

  // Live calculator inputs
  document.querySelectorAll(".calc-input").forEach(input => {
    input.addEventListener("input", window.calculateMargin);
  });

  // Consultation Email Form
  const consultForm = document.getElementById("consultForm");
  if (consultForm) {
    consultForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("submitBtn");
      const feedback = document.getElementById("formFeedback");
      const formData = new FormData(consultForm);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Sending...`;
      }
      if (feedback) feedback.classList.add("hidden");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        const result = await response.json();

        if (feedback) {
          feedback.classList.remove("hidden");
          if (result.success) {
            feedback.textContent = "Inquiry sent! We have received your brief and will respond within 24 hours.";
            feedback.className = "text-sm text-green-700 font-semibold text-center pt-2";
            consultForm.reset();
          } else {
            feedback.textContent = "Email submission needs your Web3Forms Access Key in index.html, or use the WhatsApp button.";
            feedback.className = "text-sm text-red-600 font-semibold text-center pt-2";
          }
        }
      } catch {
        if (feedback) {
          feedback.classList.remove("hidden");
          feedback.textContent = "Network error. Please try again or send directly via WhatsApp.";
          feedback.className = "text-sm text-red-600 font-semibold text-center pt-2";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fa-solid fa-envelope mr-1.5"></i> Send via Email`;
        }
      }
    });
  }

  // AgriPulse AI Chat Form
  const aiChatForm = document.getElementById("aiChatForm");
  if (aiChatForm) {
    aiChatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const aiUserInput = document.getElementById("aiUserInput");
      const aiChatMessages = document.getElementById("aiChatMessages");
      const aiSendBtn = document.getElementById("aiSendBtn");
      if (!aiUserInput || !aiChatMessages) return;

      const question = aiUserInput.value.trim();
      if (!question) return;

      // Append User Message
      const userBubble = document.createElement("div");
      userBubble.className = "flex justify-end";
      userBubble.innerHTML = `<div class="bg-agriGreen text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-md text-sm leading-relaxed shadow-sm">${question.replace(/</g, "&lt;")}</div>`;
      aiChatMessages.appendChild(userBubble);
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

      aiUserInput.value = "";
      if (aiSendBtn) {
        aiSendBtn.disabled = true;
        aiSendBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
      }

      const renderAIReply = (htmlReply) => {
        const safePrompt = encodeURIComponent(question);
        const aiBubble = document.createElement("div");
        aiBubble.className = "flex gap-3";
        aiBubble.innerHTML = `
          <div class="w-8 h-8 rounded-xl bg-agriGreen text-white flex items-center justify-center shrink-0 mt-0.5">
            <i class="fa-solid fa-seedling text-agriOrange text-xs"></i>
          </div>
          <div class="bg-slate-900/90 border border-slate-700 rounded-2xl rounded-tl-none p-4 text-slate-200 leading-relaxed max-w-xl space-y-3">
            <div>${htmlReply}</div>
            <div class="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <span class="text-slate-400">Want tailored human advisory on this?</span>
              <button type="button" onclick="escalateAIToConsult(decodeURIComponent('${safePrompt}'))" class="text-agriOrange hover:underline font-bold">
                Send to Consultant &rarr;
              </button>
            </div>
          </div>
        `;
        aiChatMessages.appendChild(aiBubble);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
      };

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: question, marketContext: commodityData })
        });
        if (res.ok) {
          const data = await res.json();
          renderAIReply(data.reply);
        } else {
          throw new Error("Fallback to built-in advisory engine");
        }
      } catch {
        renderAIReply(generateLocalAgriResponse(question));
      } finally {
        if (aiSendBtn) {
          aiSendBtn.disabled = false;
          aiSendBtn.innerHTML = `<span>Ask AI</span><i class="fa-solid fa-paper-plane text-xs"></i>`;
        }
      }
    });
  }

  // Initial Renders
  renderHeroSnapshot();
  renderMarketTable(commodityData);
  window.calculateMargin();
});