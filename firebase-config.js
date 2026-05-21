// ============================================================
// KGS IT Management System — Firebase Configuration
// ============================================================
//
// ສະຖານະປະຈຸບັນ: ✅ Config ສຳເລັດແລ້ວ — ພ້ອມໃຊ້ Firebase mode
//
// Project: it-kgs (asia-southeast1)
// Database: https://it-kgs-default-rtdb.asia-southeast1.firebasedatabase.app
//
// ກ່ອນເຂົ້າໃຊ້ ໃຫ້ກວດສອບ 2 ສິ່ງໃນ Firebase Console:
//
//   1. Authentication → Sign-in method → Email/Password → Enable
//      https://console.firebase.google.com/project/it-kgs/authentication/providers
//
//   2. Realtime Database → Rules → ໃຊ້ rules ໃນ README.md
//      https://console.firebase.google.com/project/it-kgs/database/it-kgs-default-rtdb/rules
//
// ⚠️ ຄຳເຕືອນ: apiKey ສາມາດເປີດເຜີຍໃນ client code ໄດ້ (ນີ້ແມ່ນມາດຕະຖານ
//    Firebase) — ຄວາມປອດໄພມາຈາກ Security Rules, ບໍ່ແມ່ນຈາກການເຊື່ອງ key
//
// ============================================================

window.firebaseConfig = {
  apiKey: "AIzaSyAFQtWhrSK_Wrds38U7YnulCICIgOP4y8Y",
  authDomain: "it-kgs.firebaseapp.com",
  databaseURL: "https://it-kgs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "it-kgs",
  storageBucket: "it-kgs.firebasestorage.app",
  messagingSenderId: "426642057611",
  appId: "1:426642057611:web:7016afe78845054618678e"
};

// ============================================================
// ຄຳເຕືອນ:
// - ຕາບໃດທີ່ໄຟລນີ້ຍັງມີຄ່າ "YOUR_..." ລະບົບຈະໃຊ້ "ໂໝດທົດລອງ"
//   (localStorage) ໂດຍອັດຕະໂນມັດ
// - ເມື່ອໃສ່ config ຈິງແລ້ວ, ລະບົບຈະປ່ຽນເປັນ Firebase ອັດຕະໂນມັດ
// ============================================================
