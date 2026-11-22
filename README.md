# Mini Report · Salary Thailand Review Guide 2026/27 — เว็บแอป

เว็บแบบไฟล์คงที่ (HTML/CSS/JS) ไม่ต้องมีเซิร์ฟเวอร์หรือฐานข้อมูล วางบน GitHub Pages ได้ทันที

## โครงสร้างไฟล์

| ไฟล์ / โฟลเดอร์ | หน้าที่ |
|---|---|
| `index.html` | หน้าหลักของเว็บ (ทุกหน้าใช้ไฟล์นี้ไฟล์เดียว) |
| `config.js` | **ไฟล์ตั้งค่า**: ลิงก์ เบอร์โทร อีเมลรับฟอร์ม ราคา วันปิดโปรโมชัน Google Analytics |
| `data/data.js` | ตัวเลขจากเล่ม: Part B (ค่าจ้างเริ่มต้น 24 สาขา), Part C (312 ตำแหน่ง), Part E (Benchmark), Part F (ขึ้นเงินเดือน/โบนัส) |
| `data/content.js` | ข้อความจากเล่ม (ไทย/อังกฤษ): บทสรุป, HR Trends, 10 Red Issues, คำศัพท์ ฯลฯ |
| `assets/css/style.css` | หน้าตาและธีมสี |
| `assets/js/app.js` | การทำงานของเว็บ |
| `assets/img/` | รูปจากเล่ม (ปก, Part D, G, H, ตารางภาพ) และ QR Code |

## หน้าในเว็บ (URL)

- `#/` หน้าแรก · `#/starting` ค่าจ้างเริ่มต้น (Part B) · `#/experience` ตามประสบการณ์ (Part C)
- `#/merit` ขึ้นเงินเดือน & โบนัส (Part F) · `#/welfare` สวัสดิการ (Part D) · `#/overview` ภาพรวม (Part A)
- `#/benchmark` HR Trends & Benchmark (Part E) · `#/research` ผลวิจัย (Part G) · `#/summary` บทสรุป (Part H)
- `#/order` สั่งซื้อเล่มเต็ม · `#/about` เกี่ยวกับ & ติดต่อ

ผลการค้นหาแชร์ได้ด้วยลิงก์ เช่น `#/experience?c=9&p=8` (Programmer) หรือ `#/starting?m=7&b=Automotive`

## วิธีขึ้น GitHub Pages (บัญชี thaiskillplus)

1. สร้าง repository ใหม่ เช่น `salary-mini-report-2026`
2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ (รวม `.nojekyll`) ไว้ที่ราก (root) ของ repository
3. ไปที่ **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save
4. รอ 1–2 นาที เว็บจะอยู่ที่ `https://thaiskillplus.github.io/salary-mini-report-2026/`
5. ถ้ามีโดเมนของตัวเอง ใส่ที่ Settings → Pages → Custom domain

## สิ่งที่ต้องใส่เพิ่มใน `config.js`

- `contactEmail` — อีเมลรับข้อความ "ให้เราติดต่อกลับ" (ตอนนี้ใช้ salarysurvey.thailand@gmail.com ชั่วคราว)
- `formEndpoint` — (ไม่บังคับ) ถ้าต้องการให้ฟอร์มส่งอัตโนมัติ ให้สมัคร Formspree หรือ FormSubmit แล้วใส่ URL; ถ้าว่างไว้ เว็บจะเปิดโปรแกรมอีเมลของผู้ใช้พร้อมข้อความให้กดส่ง
- `gaId` — รหัส Google Analytics 4 (เช่น `G-XXXXXXX`) · `fbPixelId` — ถ้าใช้ Facebook Pixel
- `social` — ลิงก์ Facebook / YouTube / Blockdit (ถ้าว่าง ปุ่มจะพาไปหน้าค้นหาชื่อเพจ)
- `bookDeadline`, `bookPrice` — เมื่อหมดโปรโมชัน เว็บจะซ่อนตัวนับถอยหลังและแสดงข้อความ "สอบถามราคา" ให้อัตโนมัติ

## หมายเหตุข้อมูล

- Part C ถอดตัวเลขจากภาพตารางในเล่ม และสุ่มตรวจเทียบกับภาพแล้ว หากพบตัวเลขไม่ตรง แก้ได้ใน `data/data.js` (ค้นชื่อตำแหน่ง)
- Part D, G, H และกราฟบางส่วนของ Part A/E แสดงเป็นภาพตามเล่ม (คลิกเพื่อขยาย)
- โลโก้ STI ในเว็บเป็นแบบวาดใหม่ชั่วคราว (`assets/img/logo-sti.svg`) — เมื่อได้ไฟล์โลโก้จริง วางทับชื่อเดิมได้เลย เช่นเดียวกับ `logo-hrmonday.png`
- รูปอาจารย์ดึงจาก thaiskillplusconsultant.com ถ้าโหลดไม่ได้จะใช้ `assets/img/director.jpg` แทน
