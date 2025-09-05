async function loadTranslations(lang) {
  const res = await fetch(`i18n/${lang}.json`);
  const dict = await res.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";

  localStorage.setItem("lang", lang);
}

function setLanguage(lang) {
  loadTranslations(lang);
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang") || "ja";
  loadTranslations(saved);
});



// i18n対応スクリプト
async function loadTranslations(lang = "en") {
  const response = await fetch("translations.json");
  const translations = await response.json();
  return translations[lang];
}

async function translatePage(lang = "en") {
  const dict = await loadTranslations(lang);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}
