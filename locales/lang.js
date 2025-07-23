// lang.js

export const strings = {
  tr: {
    online: "ÇEVRİMİÇİ",
    offline: "ÇEVRİMDIŞI",
  },
  en: {
    online: "ONLINE",
    offline: "OFFLINE",
  },
};

// Şu anki dil, buradan kontrol edilir
export let currentLang = "tr"; // veya 'en'

export const setLanguage = (lang) => {
  currentLang = lang;
};

export const t = (key) => {
  return strings[currentLang][key] || key;
};
