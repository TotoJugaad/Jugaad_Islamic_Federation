async function loadTranslations() {
  const response = await fetch("translations.json");
  return await response.json();
}

async function applyTranslations(lang) {
  const translations = await loadTranslations();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key] && translations[key][lang]) {
      el.textContent = translations[key][lang];
    }
  });

  // 言語属性と方向を更新
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";

  // 保存
  localStorage.setItem("lang", lang);
}

function initLanguageSwitcher() {
  const select = document.getElementById("lang-switcher");
  if (!select) return;

  // 保存された言語 or デフォルト ja
  const savedLang = localStorage.getItem("lang") || "ja";
  select.value = savedLang;
  applyTranslations(savedLang);

  // 切り替えイベント
  select.addEventListener("change", () => {
    const lang = select.value;
    applyTranslations(lang);
  });
}

window.addEventListener("DOMContentLoaded", initLanguageSwitcher);
