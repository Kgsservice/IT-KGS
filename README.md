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
    },
    "notifications": {
      ".indexOn": ["to","created_at"],
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "comments": {
      ".indexOn": ["node","item_id","created_at"],
      ".read": "auth != null",
      ".write": "auth != null"
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

## ສະຖານະການພັດທະນາ (Roadmap)

| Phase | ຄຸນສົມບັດ | ສະຖານະ |
|---|---|---|
| 1 | Core CRUD · QR code · Excel import/export · Role-based tabs · Public QR report | ✅ ສຳເລັດ |
| 2 | A4 print documents (KGS header + 3 signature blocks + QR) | ✅ ສຳເລັດ |
| 3 | In-app notifications + bell badge + per-role sidebar badges | ✅ ສຳເລັດ |
| 5 | Incident workflow (new → assigned → in_progress → resolved → closed) | ✅ ສຳເລັດ |
| 7 | Comments thread · Profile editing · Auto-expiry notifications | ✅ ສຳເລັດ |
| 8 | Maintenance scheduling · Dashboard charts · In-app QR scanner | ✅ ສຳເລັດ |
| 4 | Google Drive integration ສຳລັບໄຟລໃຫຍ່ (>2MB) | 🔜 Phase 4 |
| 6 | Cloud Functions ສຳລັບ scheduled tasks (daily backup) | 🔜 Phase 6 |

### ການແຈ້ງເຕືອນ (Phase 3 + 7 + 8)

- **🔔 Bell icon** ໃນ topbar — ກົດເພື່ອເບິ່ງລາຍການການແຈ້ງເຕືອນຫຼ້າສຸດ
- ການແຈ້ງເຕືອນຈະຖືກສ້າງອັດຕະໂນມັດເມື່ອ:
  - ມີຄຳສະເໜີໃໝ່ → ແຈ້ງ IT Manager / Admin
  - ອະນຸມັດ ຫຼື ປະຕິເສດ → ແຈ້ງຜູ້ສະເໜີ
  - ເລີ່ມວຽກ → ແຈ້ງຜູ້ສະເໜີ
  - ໝາຍສຳເລັດ → ແຈ້ງຜູ້ສະເໜີໃຫ້ຢືນຢັນ
  - ປິດເລື່ອງ → ແຈ້ງຜູ້ດຳເນີນການ
  - ມອບໝາຍ Incident → ແຈ້ງ Technician
  - **ມີຄຳເຫັນໃໝ່ໃນ Request/Incident** → ແຈ້ງຜູ້ມີສ່ວນກ່ຽວຂ້ອງທັງໝົດ
  - **License/Warranty ໃກ້ໝົດອາຍຸ ≤30 ວັນ** → ແຈ້ງ Manager/Admin ອັດຕະໂນມັດ
  - **ບຳລຸງຮັກສາໃກ້ກຳນົດ ≤7 ວັນ ຫຼື ກາຍກຳນົດ** → ແຈ້ງ IT Staff/Manager/Admin
- Refresh ອັດຕະໂນມັດທຸກ 30 ວິນາທີ
- Sidebar badges ປັບປຸງຕາມ role: ສະແດງສະເພາະວຽກທີ່ກ່ຽວຂ້ອງກັບເຮົາ

### ການສະນະວາ ໃນ Request/Incident (Phase 7)

- ກົດເບິ່ງລາຍລະອຽດຂອງ Request ຫຼື Incident → ມີສ່ວນ "💬 ການສະນະວາ" ຢູ່ດ້ານລຸ່ມ
- ທຸກຄົນທີ່ມີສ່ວນກ່ຽວຂ້ອງ (ຜູ້ສະເໜີ / ຜູ້ອະນຸມັດ / ຜູ້ດຳເນີນການ) ສາມາດເພີ່ມຄຳເຫັນໄດ້
- ເມື່ອມີຄຳເຫັນໃໝ່ — ສ່ວນຮ່ວມຄົນອື່ນຈະໄດ້ຮັບການແຈ້ງເຕືອນ
- Audit trail ສຳລັບ IMS ISO 9001 — ບັນທຶກປະຫວັດການເຮັດວຽກຮ່ວມກັນ
- ກົດ **Ctrl+Enter** (ຫຼື Cmd+Enter ໃນ Mac) ເພື່ອສົ່ງຄຳເຫັນຢ່າງໄວ

### ການແກ້ໄຂໂປຣໄຟລ (Phase 7)

- ກົດ "ຊື່ຜູ້ໃຊ້" ຢູ່ດ້ານລຸ່ມຂອງ sidebar ເພື່ອເປີດໂປຣໄຟລ
- ສາມາດແກ້ໄຂ: ຊື່, ພະແນກ, ຕຳແໜ່ງ, ເບີໂທ
- ບໍ່ສາມາດແກ້ໄຂເອງໄດ້: ອີເມວ ແລະ ບົດບາດ (Role) — ຕ້ອງຕິດຕໍ່ Administrator

### ການບຳລຸງຮັກສາແບບກຳນົດເວລາ (Phase 8)

- ໃນ Asset form: ໃສ່ "ໄລຍະບຳລຸງຮັກສາ (ວັນ)" ເຊັ່ນ 90 = ທຸກ 3 ເດືອນ
- ລະບົບຈະຄຳນວນ "ບຳລຸງຮັກສາຄັ້ງຕໍ່ໄປ" ໂດຍອັດຕະໂນມັດ
- ເມື່ອບັນທຶກ maintenance ດ້ວຍ status=ສຳເລັດ → ປ່ຽນວັນບຳລຸງຮັກສາຄັ້ງຕໍ່ໄປໂດຍອັດຕະໂນມັດ
- Dashboard ສະແດງ panel "🔧 ບຳລຸງຮັກສາທີ່ໃກ້ກຳນົດ" ສະແດງ 5 ລາຍການ
- ແຈ້ງເຕືອນອັດຕະໂນມັດເມື່ອໃກ້ກຳນົດ ≤7 ວັນ ຫຼື ກາຍກຳນົດແລ້ວ

### Dashboard Analytics (Phase 8)

- **Stats cards** 4 ກ່ອງ: ຊັບສິນ · ເຫດການ · ຄຳສະເໜີ · ບຳລຸງຮັກສາ
- **Charts** SVG ບໍ່ຕ້ອງໃຊ້ library ນອກ:
  - Bar chart: ເຫດການ 6 ເດືອນຫຼ້າສຸດ
  - Donut chart: ປະເພດເຫດການ (Hardware/Software/Network/...)
  - Horizontal bar: ສະຖານະຄຳສະເໜີ (Pending/In Progress/Completed/Closed/Rejected)
- ປຸ່ມການແຈ້ງເຕືອນສຳລັບ overdue maintenance

### QR Scanner ໃນແອັບ (Phase 8)

- ກົດ "📷" ໃນ topbar ເພື່ອເປີດກ້ອງມືຖື (ຫຼື webcam)
- ສະແກນ QR code → ນຳໄປສູ່ asset detail ໂດຍອັດຕະໂນມັດ
- ຮອງຮັບ:
  - QR ຂອງ asset (`?asset=IT-H001`)
  - QR ຂອງເອກະສານ A4 ທີ່ພິມອອກ (`?doc=incidents:abc123`)
  - QR ດ້ວຍ asset code ໂດດໆ (ບໍ່ມີ URL)
- ໃຊ້ກ້ອງຫຼັງໃນມືຖື (back camera)

### Workflow ຂອງ Incident (Phase 5)

```
ໃໝ່ (new) → ມອບໝາຍ (assigned) → ກຳລັງດຳເນີນ (in_progress)
            ↓
       ແກ້ໄຂແລ້ວ (resolved) → ປິດເລື່ອງ (closed)
            ↑
       ↺ ເປີດໃໝ່ (ກັບໄປ assigned)
```

| ສະຖານະ | ໃຜເຮັດໄດ້ |
|---|---|
| **ໃໝ່** | ທຸກຄົນລາຍງານ (ຜ່ານ QR ບໍ່ Login ໄດ້) |
| **ມອບໝາຍ** | IT Manager / IT Staff ເລືອກ Technician |
| **ກຳລັງດຳເນີນ** | Technician ກົດເລີ່ມວຽກ |
| **ແກ້ໄຂແລ້ວ** | Technician ໃສ່ Resolution + Root Cause |
| **ປິດເລື່ອງ** | ຜູ້ລາຍງານ ຫຼື Admin ຢືນຢັນ |
| **ເປີດໃໝ່** | ຖ້າບັນຫາຍັງເກີດ → ກັບໄປສະຖານະ "ມອບໝາຍ" |

### ການພິມເອກະສານ A4 (Phase 2)

- ກົດ "🖨 ພິມເອກະສານ" ໃນ detail view ຂອງ Request/Incident
- ເອກະສານປະຕິບັດຕາມ IMS template:
  - KGS letterhead + IMS code (IT-FORM-001 ຫາ IT-FORM-005)
  - 3 ຊ່ອງເຊັນ: ຜູ້ສະເໜີ / ຜູ້ອະນຸມັດ / ຜູ້ດຳເນີນການ
  - QR code → ສະແກນເບິ່ງສະຖານະອອນລາຍ
  - Status stamp (APPROVED / REJECTED / DRAFT / etc.)
  - Footer: ISO certifications

---

**Khammany General Service** · Strong systems · Ready people · Standard service · Sustainable growth
