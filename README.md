# Frontend Workspace (`client/`)

โปรเจกต์ React พัฒนาด้วย Vite และกำหนดค่าใช้งานร่วมกับ Tailwind CSS v4 ผ่าน `@tailwindcss/vite`

## โครงสร้างโปรเจกต์ (Folder Structure)

```text
client/
├── public/                 # Static assets (Favicon, Logo)
│   └── vite.svg
├── src/                    # Source code
│   ├── assets/             # รูปภาพและไฟล์ assets
│   ├── components/         # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── FolderStructure.jsx
│   │   ├── TechStack.jsx
│   │   └── Footer.jsx
│   ├── App.jsx             # คอมโพเนนต์หลักที่ประกอบหน้าเว็บ
│   ├── index.css           # นำเข้า Tailwind CSS v4 (@import "tailwindcss";)
│   └── main.jsx            # Entry point ของ React
├── index.html              # Template HTML หลัก
├── package.json            # กำหนด Dependencies และ Scripts
└── vite.config.js          # คอนฟิก Vite พร้อม @tailwindcss/vite plugin
```

## วิธีติดตั้งและรันโปรเจกต์ (Getting Started)

1. เปิด Terminal และเข้าไปที่โฟลเดอร์ `client`:
   ```bash
   cd client
   ```

2. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

3. รัน Dev Server:
   ```bash
   npm run dev
   ```

4. บิลด์สำหรับ Production:
   ```bash
   npm run build
   ```
