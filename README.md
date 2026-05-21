# KGS IT Management System

ລະບົບຄຸ້ມຄອງ IT ສຳລັບ Khammany General Service — Single-page webapp, ສອດຄ່ອງກັບ IMS (ISO 9001 / 14001 / 45001).

---

## ໂຄງສ້າງໄຟລ

```
kgs-it-system/
├── index.html              ← ໄຟລຫຼັກ (ເປີດດ້ວຍ browser ໄດ້ເລີຍ)
├── firebase-config.js      ← ຕັ້ງຄ່າ Firebase
└── README.md               ← ໄຟລນີ້
```

---

## ວິທີໃຊ້ງານ

### 🚀 ໃຊ້ທັນທີ (ໂໝດທົດລອງ)

**ບໍ່ຕ້ອງຕັ້ງຄ່າຫຍັງເລີຍ** — ດັບເບິລຄລິກໃສ່ `index.html` ເພື່ອເປີດໃນ browser

1. ກົດ "ສ້າງບັນຊີໃໝ່" — ບັນຊີທຳອິດຈະເປັນ **Administrator** ໂດຍອັດຕະໂນມັດ
2. ເຂົ້າສູ່ລະບົບ
3. ໃຊ້ງານ 13 ໂມດູນ: Dashboard, Asset, Maintenance, License, Incident, Access Request, Change Request, IT Request, E-waste, Documents, Audit, Users, Backup

⚠️ ໂໝດທົດລອງເກັບຂໍ້ມູນໄວ້ໃນ browser ນີ້ເທົ່ານັ້ນ — ສຳລັບໃຊ້ງານຫຼາຍຄົນ ໃຫ້ໃຊ້ Firebase mode

---

### 🔥 ໂໝດ Firebase (ສຳລັບໃຊ້ງານຈິງ — ຫຼາຍຄົນ)

**Project URL:** `https://it-kgs-default-rtdb.asia-southeast1.firebasedatabase.app/`

#### ຂັ້ນຕອນ:

**1. ເພີ່ມ Web App ໃນ Firebase Console**

- ໄປທີ່ https://console.firebase.google.com/project/it-kgs
- ⚙ Project Settings → General → Your apps → "Add app" → ເລືອກ `</>` (Web)
- ຕັ້ງຊື່ app: `KGS IT Webapp`
- **ບໍ່ຕ້ອງເລືອກ** Firebase Hosting setup ໃນຂັ້ນຕອນນີ້ (ເຮັດໃນພາຍຫຼັງ)
- ກົດ "Register app" → ສຳເນົາ config

**2. ໃສ່ config ໃນ `firebase-config.js`**

ແທນທີ່ 3 ຄ່າ `YOUR_...` ດ້ວຍຄ່າຈິງຈາກ Firebase:

```javascript
window.firebaseConfig = {
  apiKey: "AIzaSy...",                    // ← ໃສ່ຈິງ
  authDomain: "it-kgs.firebaseapp.com",
  databaseURL: "https://it-kgs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "it-kgs",
  storageBucket: "it-kgs.appspot.com",
  messagingSenderId: "123456789",         // ← ໃສ່ຈິງ
  appId: "1:123:web:abc..."               // ← ໃສ່ຈິງ
};
```

**3. ເປີດໃຊ້ Authentication**

- Build → Authentication → Get started
- Sign-in method → Email/Password → **Enable**

**4. ຕັ້ງ Realtime Database Security Rules**

ໄປທີ່ Realtime Database → Rules → ໃສ່ rules ນີ້ ແລະ ກົດ Publish:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "users": {
      "$uid": {
        ".write": "auth.uid === $uid || root.child('users').child(auth.uid).child('role').val() === 'admin'"
      }
    },
    "audit_log": {
      ".write": "auth != null",
      "$id": { ".write": "!data.exists()" }
    }
  }
}
```

> ⚠️ ຫ້າມໃຊ້ rules `.read: true, .write: true` ໃນ production — ໃຜກໍ່ໄດ້ສາມາດເຂົ້າເຖິງຂໍ້ມູນ

**5. ເປີດໄຟລ `index.html` — ລະບົບຈະປ່ຽນເປັນ Firebase mode ອັດຕະໂນມັດ**

---

## Deploy ໄປ Firebase Hosting (ຟຣີ)

ເພື່ອໃຫ້ທີມງານທຸກຄົນເຂົ້າເຖິງລະບົບໄດ້ຜ່ານ URL:

```bash
# ຕິດຕັ້ງ Firebase CLI (ຄັ້ງດຽວ)
npm install -g firebase-tools

# Login
firebase login

# ໃນໂຟນເດີ kgs-it-system/
firebase init hosting
# ເລືອກ project "it-kgs"
# Public directory: . (ຈຸດ ໝາຍເຖິງໂຟນເດີປະຈຸບັນ)
# Single-page app: Yes
# ບໍ່ overwrite index.html

# Deploy
firebase deploy --only hosting
```

ຈະໄດ້ URL: `https://it-kgs.web.app` (ໃຊ້ໄດ້ທົ່ວໂລກ, HTTPS, ຟຣີ)

---

## ໂມດູນທັງໝົດ (13)

| # | ໂມດູນ | ການອ້າງອີງ IMS | ການເຮັດໜ້າທີ່ |
|---|---|---|---|
| 1 | **Dashboard** | — | ສະຫຼຸບ KPI, ກິດຈະກຳຫຼ້າສຸດ |
| 2 | **Asset Management** | IT-TEMPLATE-001 | CRUD ຊັບສິນ IT (Hardware/Software/Network/Peripheral/Mobile) |
| 3 | **Maintenance Log** | IT-TEMPLATE-002 | ບັນທຶກບຳລຸງຮັກສາ ເຊື່ອມກັບ asset |
| 4 | **Software License** | IT-TEMPLATE-003 | License + ແຈ້ງເຕືອນໃກ້ໝົດອາຍຸ |
| 5 | **Incidents** | IT-FORM-001 | ລາຍງານເຫດການ — auto ID (INC-YYYY-XXXX) |
| 6 | **Access Requests** | IT-FORM-002 | ຂໍສິດເຂົ້າໃຊ້ລະບົບ |
| 7 | **Change Requests** | IT-FORM-003 | ຂໍປ່ຽນແປງ (ມີ Rollback Plan) |
| 8 | **IT Requests** | IT-FORM-004 | ຂໍບໍລິການ IT ທົ່ວໄປ |
| 9 | **E-waste** | IT-FORM-005 | ກຳຈັດອຸປະກອນ (ISO 14001) |
| 10 | **Documents** | All 17 IMS docs | Library + file upload (≤2MB) |
| 11 | **Audit Log** | IT-PROC-004 | ບັນທຶກທຸກກິດຈະກຳ (read-only) |
| 12 | **Users & Roles** | IT-POL-002 | 4 ບົດບາດ (admin/it_manager/it_staff/employee) |
| 13 | **Backup & Restore** | IT-POL-003 | Export/Import JSON, CSV asset export |

---

## ບົດບາດຜູ້ໃຊ້

| ບົດບາດ | ສິດ |
|---|---|
| **Administrator** | ທຸກຢ່າງ + ຄຸ້ມຄອງຜູ້ໃຊ້ |
| **IT Manager** | ອະນຸມັດ Access/Change Request |
| **IT Staff** | ປະຕິບັດງານ Asset/Maintenance/Incident |
| **Employee** | ສ້າງ Request (Access/IT/E-waste) |

---

## ໝາຍເຫດທີ່ສຳຄັນ

- **ໄຟລແນບ:** ໃນ Phase 1 ໄຟລເກັບເປັນ base64 ໃນ database (ຈຳກັດ 2MB/ໄຟລ). ສຳລັບໄຟລໃຫຍ່ ແນະນຳ Phase 2: ເຊື່ອມຕໍ່ Google Drive API
- **Backup ອັດຕະໂນມັດ:** ໃນ Phase 2 ໃຊ້ Firebase Cloud Functions + Cloud Storage (ຫຼື Google Drive)
- **ພາສາ:** ພາສາລາວເປັນຫຼັກ + ຮັກສາສັບເທັກນິກ EN (ISO, KPI, IMS, etc.)
- **ຄ່າໃຊ້ຈ່າຍ:** Firebase Spark plan (ຟຣີ) — ສຳລັບ ≤100 users + 1GB storage ພຽງພໍ

---

**Khammany General Service** · Strong systems · Ready people · Standard service · Sustainable growth
