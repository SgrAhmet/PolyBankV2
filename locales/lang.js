

export const strings = {
  us: {
    online: "ONLINE",
    offline: "OFFLINE",
    invalidRoomId: "Invalid Room ID",
    pleaseEnterValidRoomId: "Please enter a valid Room ID",
    cantFindRoomId: "Room ID not found",
    createRoom: "Create Room",
    enterRoom: "Join Room",
    enterRoomId: "Enter Room ID",
    yourRoomId: "Your Room ID",
    notCreatedYet: "Not created yet",
    resetGame: "Reset Game",
    areYouSureToResetGame: "Are you sure you want to reset the game?",
    yes: "Yes",
    no: "No",
    error: "Error",
    max5Digit: "Numbers can be a maximum of 5 digits",
    enterMoney: "Enter amount",
    enterName: "Enter name...",
    bank: "Bank",
    roomId: "Room ID"
  },
  tr: {
    online: "ÇEVRİMİÇİ",
    offline: "ÇEVRİMDIŞI",
    invalidRoomId: "Geçersiz Oda Numarası",
    pleaseEnterValidRoomId: "Lütfen geçerli bir oda numarası girin",
    cantFindRoomId: "Oda numarası bulunamadı",
    createRoom: "Oda Oluştur",
    enterRoom: "Odaya Katıl",
    enterRoomId: "Oda Numarası Gir",
    yourRoomId: "Oda Numarası",
    notCreatedYet: "Henüz oluşturulmadı",
    resetGame: "Oyunu Sıfırla",
    areYouSureToResetGame: "Oyunu sıfırlamak istediğinizden emin misiniz?",
    yes: "Evet",
    no: "Hayır",
    error: "Hata",
    max5Digit: "Sayılar en fazla 5 haneli olabilir",
    enterMoney: "Para miktarı gir",
    enterName: "İsim gir...",
    bank: "Banka",
    roomId: "Oda Numarası"
  }
};


// Şu anki dil, buradan kontrol edilir
export let currentLang = "tr"; // veya 'us'

export const setLanguage = (lang) => {
  currentLang = lang;
};

export const t = (key) => {
  return strings[currentLang][key] || key;
};
