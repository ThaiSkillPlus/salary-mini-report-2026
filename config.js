/* =========================================================
   ตั้งค่าเว็บไซต์ (แก้ไขได้ที่ไฟล์นี้ไฟล์เดียว)
   Site settings — edit this file only
   ========================================================= */
window.SITE_CONFIG = {
  // ลิงก์หลัก
  mainSite: "https://thaiskillplusconsultant.com/",
  salarySite: "https://www.salarythailand.com",

  // ลิงก์ปุ่มต่าง ๆ
  lineOpenChat: "https://line.me/ti/g2/2FEy_ygGRR7eiBKKvWiLaw?utm_source=invitation&utm_medium=QR_code&utm_campaign=default",
  joinSurvey: "https://docs.google.com/forms/d/e/1FAIpQLSePixYO94ER5lDuX1XVMnBQXsPp_W9WWusa3oy1uZA7Yc0daA/viewform",
  preOrder: "https://docs.google.com/forms/d/e/1FAIpQLSdIeE80qHmAZS0DoCEWNKStrvDbUmyWwN7aAdFR0BCmX6iWXg/viewform",

  // รูปอาจารย์ (ถ้าโหลดไม่ได้ จะใช้รูปสำรองในโฟลเดอร์ assets/img)
  directorPhoto: "https://thaiskillplusconsultant.com/wp-content/uploads/2022/08/CEO.png",

  // อีเมลรับข้อความ "ให้เราติดต่อกลับ"  >>> ใส่อีเมลจริงตรงนี้ <<<
  // (ชั่วคราวใช้อีเมลโครงการตามที่พิมพ์ในเล่ม)
  contactEmail: "salarysurvey.thailand@gmail.com",
  // ถ้าต้องการให้ส่งอัตโนมัติโดยไม่เปิดโปรแกรมอีเมล ให้ใส่ endpoint ของ Formspree / FormSubmit
  // เช่น "https://formsubmit.co/ajax/you@example.com"  (เว้นว่าง = เปิดโปรแกรมอีเมลของผู้ใช้)
  formEndpoint: "",

  // Google Analytics 4  เช่น "G-XXXXXXX"  (เว้นว่าง = ไม่เก็บสถิติ)
  gaId: "",
  // Facebook Pixel ID (เว้นว่าง = ไม่ใช้)
  fbPixelId: "",

  // โปรโมชันเล่มเต็ม
  bookPrice: 7900,
  bookDeadline: "2026-11-30T23:59:59+07:00",
  bookPages: 600,

  // ช่องทางติดต่อ
  phones: [
    { num: "0-2587-4458", th: "สำนักงาน", en: "Office" },
    { num: "083-184-1512", th: "คุณน้ำผึ้ง (สั่งซื้อหนังสือ)", en: "Khun Nampueng (book orders)" },
    { num: "087-395-0089", th: "คุณหมิว (ผู้ประสานงาน)", en: "Khun Mew (coordinator)" }
  ],
  directorPhone: "081-842-4194",
  email: "salarysurvey.thailand@gmail.com",
  address: {
    th: "บริษัท ไทยสกิลล์พลัส จำกัด เลขที่ 1339 ชั้น 6 อาคารอรรณ ถนนประชาราษฎร์ สาย 1 แขวงวงศ์สว่าง เขตบางซื่อ กรุงเทพมหานคร 10800",
    en: "Thai Skill Plus Co., Ltd. 1339, 6th Floor, Aunn Building, Pracharat Sai 1 Rd., Wong Sawang, Bang Sue, Bangkok 10800"
  },
  mapQuery: "1339 ถนนประชาราษฎร์ สาย 1 แขวงวงศ์สว่าง เขตบางซื่อ กรุงเทพมหานคร 10800",

  // โซเชียล (ใส่ลิงก์จริงเมื่อได้รับ — ถ้าเว้นว่างจะค้นหาชื่อเพจใน Facebook/YouTube ให้)
  social: {
    fbHrMonday: "",
    fbSalaryThailand: "",
    fbDirector: "",
    youtube: "",
    blockdit: ""
  }
};
