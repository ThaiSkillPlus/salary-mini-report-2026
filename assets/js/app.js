/* Salary Thailand Review Guide 2026/27 — Mini Report web app
   Static single-page app (hash routing). No build step. */
(function () {
  'use strict';
  const CFG = window.SITE_CONFIG, D = window.STR_DATA, K = window.STR_CONTENT;
  const BIZ = D.BIZ;
  let LANG = 'th';
  try { LANG = localStorage.getItem('str_lang') || 'th'; } catch (e) {}

  /* ---------------- i18n ---------------- */
  const T = {
    nav_home: ['หน้าแรก', 'Home'], nav_start: ['ค่าจ้างเริ่มต้น', 'Starting salary'], nav_exp: ['ตามประสบการณ์', 'By experience'],
    nav_merit: ['ขึ้นเงินเดือน & โบนัส', 'Merit & bonus'], nav_welfare: ['สวัสดิการ', 'Benefits'], nav_overview: ['ภาพรวมการสำรวจ', 'Survey overview'],
    nav_bench: ['HR Benchmark', 'HR benchmark'], nav_research: ['ผลวิจัย HR', 'HR research'], nav_summary: ['บทสรุป', 'Summary'],
    nav_order: ['สั่งซื้อเล่มเต็ม', 'Order full report'], nav_about: ['เกี่ยวกับ & ติดต่อ', 'About & contact'],
    fab_contact: ['ให้เราติดต่อกลับ', 'Request a call back'],
    hero_badge: ['Mini Report · ผลสำรวจปี 2026/27', 'Mini Report · 2026/27 survey'],
    hero_lead: ['ผลสำรวจค่าตอบแทน โบนัส สวัสดิการ และตำแหน่งงาน จาก 217 องค์กรทั่วประเทศ ค้นหาตัวเลขที่ตรงกับคุณได้ในไม่กี่คลิก โดย ดร.รุ่งโรจน์ อรรถานิทธิ์', 'Pay, bonus, benefits and job data from 217 organizations across Thailand. Find the numbers that match you in a few clicks. By Dr. Rungroj Attanit.'],
    cta_find: ['ค้นหาเงินเดือน', 'Find a salary'], cta_order: ['สั่งซื้อเล่มเต็ม', 'Order the full report'],
    st_org: ['องค์กรที่ร่วมสำรวจ', 'organizations'], st_biz: ['กลุ่มธุรกิจ', 'business sectors'], st_grade: ['Job Grade', 'job grades'], st_prof: ['สายวิชาชีพ', 'professions'], st_pos: ['ตำแหน่งงานในเว็บนี้', 'positions on this site'],
    ask_k: ['เริ่มจากคำถามของคุณ', 'Start with your question'], ask_h: ['คุณอยากรู้เรื่องไหน?', 'What would you like to know?'],
    ask1: ['เพิ่งเรียนจบ / จะรับคนใหม่', 'New graduate / hiring fresh grads'], ask1s: ['ค่าจ้างเริ่มต้นตามวุฒิ สาขา และกลุ่มธุรกิจ', 'Starting pay by degree, major and sector'],
    ask2: ['ทำงานมาแล้ว 1–5 ปี', 'Working 1–5 years'], ask2s: ['เงินเดือน 312 ตำแหน่ง ใน 27 สายวิชาชีพ', 'Pay for 312 positions in 27 professions'],
    ask3: ['ฉันเป็น HR / ผู้บริหาร', "I'm in HR / management"], ask3s: ['ขึ้นเงินเดือน โบนัส สวัสดิการ และ HR Benchmark', 'Merit, bonus, benefits and HR benchmarks'],
    go: ['เริ่มเลย', 'Start'], search_ph: ['พิมพ์ชื่อตำแหน่ง หรือสาขาที่เรียน เช่น Programmer, บัญชี, พยาบาล', 'Search a position or major, e.g. Programmer, accounting, nurse'],
    hl_k: ['ไฮไลต์ปี 2026/27', '2026/27 highlights'], hl_h: ['ตัวเลขที่ต้องรู้', 'Numbers to know'],
    hl_merit: ['ขึ้นค่าจ้างเฉลี่ย', 'average salary increase'], hl_bonus: ['โบนัสเฉลี่ย', 'average bonus'], months: ['เดือน', 'months'],
    hl_ratio: ['HR 1 คน ดูแลพนักงาน', 'employees per HR staff'], hl_rare: ['ตำแหน่งหายากอันดับ 1', 'hardest-to-fill job'],
    parts_k: ['เนื้อหาทั้งเล่ม', 'Everything in the report'], parts_h: ['เลือกอ่านตามหัวข้อ', 'Browse by topic'],
    exec_h: ['บทสรุปผู้บริหาร', 'Executive summary'],
    band_h: ['ข้อมูลเต็มอยู่ในเล่ม 600 หน้า', 'The full data is in the 600-page report'], band_p: ['ครบ 10 Part รวม Salary by Job Grade, Salary by Sizing of Business และ Salary by Vocation ที่ไม่มีใน Mini Report', 'All 10 parts, including salary by job grade, by business size and by vocation — not in the Mini Report'],
    unit_month: ['บาท/เดือน', 'THB/month'], baht: ['บาท', 'THB'],
    s1: ['เลือกระดับการศึกษา', 'Choose education level'], s2: ['เลือกสาขา', 'Choose a major'], s3: ['เลือกกลุ่มธุรกิจ', 'Choose a business sector'],
    market: ['ภาพรวมตลาด (ทุกธุรกิจ)', 'Whole market (all sectors)'],
    avg: ['ค่าเฉลี่ย', 'Average'], p50: ['ค่ากลาง (P50)', 'Median (P50)'], mode: ['ฐานนิยม (Mode)', 'Mode'],
    check_h: ['เช็กเงินเดือนของคุณ', 'Check your salary'], check_p: ['ใส่เงินเดือน (บาท/เดือน) เพื่อดูว่าอยู่ Zone ไหนของกระบอกค่าจ้าง', 'Enter a monthly salary (THB) to see which zone of the pay range it falls in'],
    check_btn: ['เช็ก', 'Check'], check_err: ['กรุณาใส่ตัวเลขเงินเดือนที่ถูกต้อง', 'Please enter a valid salary'],
    you: ['คุณ', 'You'], cmp_h: ['เทียบ 20 กลุ่มธุรกิจ', 'Compare 20 sectors'], cmp_p: ['แท่งสีส้ม = P50 · เส้นจาง = ช่วง Min–Max · คลิกเพื่อเลือกธุรกิจ', 'Orange bar = P50 · light line = Min–Max range · click to select'],
    sort: ['เรียงจากมากไปน้อย', 'Sort high to low'], sort0: ['เรียงตามรายชื่อ', 'Sort by name'], tbl: ['ตารางข้อมูล', 'Data table'],
    biz: ['กลุ่มธุรกิจ', 'Business sector'], share: ['แชร์ผลลัพธ์', 'Share'], print: ['พิมพ์ / PDF', 'Print / PDF'], copied: ['คัดลอกลิงก์แล้ว', 'Link copied'],
    src: ['ที่มา: Mini Report หน้า', 'Source: Mini Report p.'], na_note: ['n/a = ไม่มีข้อมูลสำรวจหรือข้อมูลไม่เพียงพอ', 'n/a = no or insufficient survey data'],
    e_s1: ['เลือกสายวิชาชีพ', 'Choose a profession'], e_s2: ['เลือกตำแหน่ง', 'Choose a position'], e_search: ['ค้นหาตำแหน่งจากทุกสายวิชาชีพ', 'Search positions across all professions'],
    y1: ['ประสบการณ์ 1–3 ปี', '1–3 years experience'], y3: ['ประสบการณ์ 3–5 ปี', '3–5 years experience'], jg: ['Job Grade', 'Job grade'],
    e_check_p: ['ใส่เงินเดือน แล้วเลือกช่วงประสบการณ์ เพื่อเทียบกับตลาด', 'Enter a salary and pick an experience band to compare with the market'],
    under_min: ['ต่ำกว่าค่าต่ำสุดของตลาด', 'Below the market minimum'], min_avg: ['อยู่ระหว่างค่าต่ำสุดถึงค่าเฉลี่ยตลาด', 'Between market minimum and average'], avg_max: ['สูงกว่าค่าเฉลี่ย แต่ไม่เกินค่าสูงสุดตลาด', 'Above average, within market maximum'], over_max: ['สูงกว่าค่าสูงสุดของตลาด', 'Above the market maximum'],
    pos_note: ['ชื่อตำแหน่งแสดงตามที่ตีพิมพ์ในเล่ม', 'Position names shown as published (Thai/English)'],
    all_pos: ['ตำแหน่งทั้งหมดในสายนี้', 'All positions in this profession'], nores: ['ไม่พบผลลัพธ์', 'No results'],
    m_tab_merit: ['การขึ้นค่าจ้าง', 'Salary increase'], m_tab_bonus: ['การจ่ายโบนัส', 'Bonus'],
    lv_all: ['เฉลี่ยทั้งองค์กร', 'All staff'], lv_exec: ['ผู้บริหาร', 'Executive'], lv_manager: ['Manager', 'Manager'], lv_supervisor: ['Supervisor', 'Supervisor'], lv_operator: ['Operator', 'Operator'],
    by_size: ['แยกตามขนาดธุรกิจ', 'By business size'], by_biz: ['แยกตามกลุ่มธุรกิจ', 'By business sector'], pick_biz: ['เลือกธุรกิจของคุณเพื่อไฮไลต์', 'Pick your sector to highlight'],
    up: ['ขึ้น', 'Raised'], noup: ['ไม่ขึ้น', 'No raise'], pay: ['จ่าย', 'Paid'], nopay: ['ไม่จ่าย', 'Not paid'], orgs: ['องค์กร', 'orgs'], pct_up: ['ขึ้นค่าจ้าง', 'gave raises'], pct_pay: ['จ่ายโบนัส', 'paid bonus'],
    w_lead: ['สวัสดิการและเงินช่วยเหลือ (HR Welfare Allowance) ทั้ง 20 กลุ่มธุรกิจ', 'Allowances and benefits across all 20 business sectors'], w_inbook: ['หัวข้อที่สำรวจในเล่มเต็ม', 'Topics covered in the full report'], w_mini: ['ตารางใน Mini Report (คลิกเพื่อขยาย)', 'Tables in the Mini Report (click to enlarge)'],
    o_size: ['ขนาดองค์กรที่ร่วมสำรวจ', 'Participating organizations by size'], o_emp: ['สัดส่วนตามจำนวนพนักงาน', 'Share by headcount'], o_prov: ['จังหวัดที่ตั้งองค์กร', 'Location of organizations'], o_biz: ['20 กลุ่มธุรกิจ', '20 business sectors'],
    o_calc: ['คำนวณขนาดองค์กรของคุณ', 'Calculate your organization size'], o_calc_p: ['ใช้สูตรเดียวกับผลสำรวจ: ค่าคำนวณพนักงาน + ค่าคำนวณยอดขาย', 'Same formula as the survey: headcount score + sales score'],
    emp_n: ['จำนวนพนักงาน (คน)', 'Employees'], sales_n: ['ยอดขายต่อปี (ล้านบาท)', 'Annual sales (THB million)'], calc_btn: ['คำนวณ', 'Calculate'], score: ['ค่าคำนวณรวม', 'Total score'], your_size: ['ขนาดองค์กรของคุณ', 'Your organization size'],
    o_gloss: ['คำศัพท์และคำนิยาม', 'Glossary'], o_zone: ['การแบ่ง Zone ในกระบอกค่าจ้าง', 'Pay-range zones'], o_tools: ['ผลสำรวจ HR Tool Trends 2026/27', 'HR tool trends 2026/27'],
    tool_full: ['ใช้เต็มรูปแบบ', 'Fully in use'], tool_part: ['ใช้แล้วบางส่วน', 'Partly in use'], tool_plan: ['คาดว่าจะนำมาใช้', 'Planning to use'], tool_no: ['ไม่สนใจทำ', 'Not interested'],
    b_trends: ['HR Trends 2026/27', 'HR trends 2026/27'], b_kpi: ['HR Benchmark สำคัญ', 'Key HR benchmarks'], b_cmp: ['เทียบธุรกิจของคุณกับค่าเฉลี่ยตลาด', 'Compare your sector with the market'],
    b_ratio: ['HR 1 คน : พนักงาน', 'HR : employees'], b_sales: ['ยอดขายต่อพนักงาน', 'Sales per employee'], b_trs: ['งบพัฒนาพนักงานต่อยอดขาย', 'Training budget / sales'], b_trh: ['งบพัฒนาพนักงานต่อคน', 'Training budget per head'],
    b_tin: ['Turnover เข้า', 'Turnover in'], b_tout: ['Turnover ออก', 'Turnover out'], b_night: ['ค่ากะดึกเฉลี่ย', 'Avg night-shift pay'],
    b_metric: ['ตัวชี้วัด', 'Metric'], b_yours: ['ธุรกิจที่เลือก', 'Selected sector'], b_mkt: ['ค่าเฉลี่ยตลาด', 'Market average'], b_chg: ['เปลี่ยนจากปีก่อน', 'vs last year'],
    b_hours: ['ชั่วโมงทำงานต่อสัปดาห์', 'Weekly working hours'], b_office: ['สำนักงาน', 'Office'], b_factory: ['โรงงาน', 'Factory'], b_shift: ['ค่ากะ (บาท/วัน)', 'Shift pay (THB/day)'],
    b_hrm: ['ปัญหาด้าน HRM 10 อันดับ', 'Top 10 HRM problems'], b_hrd: ['ปัญหาด้าน HRD 10 อันดับ', 'Top 10 HRD problems'], b_rare: ['ตำแหน่งงานหายาก 10 อันดับ', 'Top 10 hard-to-fill jobs'],
    r_lead: ['ผลวิจัยและผลสำรวจเชิงลึก 7 หัวข้อ จากองค์กรที่ร่วมสำรวจ (คลิกภาพเพื่อขยาย)', '7 in-depth research topics from participating organizations (click to enlarge)'],
    sum_issues: ['10 ประเด็นร้อน (Red Issues)', '10 red issues'], sum_concl: ['บทสรุป', 'Conclusion'], sum_info: ['อินโฟกราฟิกสรุปผล', 'Summary infographics'], paymix: ['Paymix ค่าจ้าง : โบนัส : สวัสดิการ', 'Pay mix — salary : bonus : benefits'],
    ord_h: ['หนังสือรายงานผลสำรวจค่าตอบแทน ฉบับเต็ม', 'Full compensation survey report'], ord_price: ['ราคาพิเศษ', 'Special price'], ord_vat: ['ไม่รวม VAT 7%', 'excl. 7% VAT'],
    ord_until: ['สั่งจองภายใน 30 พ.ย. 69', 'Order by 30 Nov 2026'], ord_left: ['เหลือเวลาอีก', 'Time left'], d: ['วัน', 'days'], h: ['ชม.', 'hrs'], mi: ['นาที', 'min'], s: ['วิ', 'sec'],
    ord_btn: ['สั่งจองหนังสือ (Pre-order)', 'Pre-order the book'], ord_parts: ['ประกอบด้วย 10 Part', '10 parts inside'], ord_cmp: ['Mini Report vs ฉบับเต็ม', 'Mini Report vs full report'],
    ord_ended: ['ช่วงราคาพิเศษสิ้นสุดแล้ว กรุณาสอบถามราคาปัจจุบัน', 'The special price period has ended — please ask for the current price'],
    ord_ask: ['สอบถามเพิ่มเติม', 'Questions?'], ord_pages: ['หนังสือหนา 600 หน้า ปกแข็งอาบมัน · ผลสำรวจจาก 300 ตำแหน่งงาน และ 20 กลุ่มธุรกิจ', '600 pages, glossy hardcover · data on 300 positions and 20 business sectors'],
    promo_k: ['NEW BOOK', 'NEW BOOK'], promo_h: ['Salary Thailand Review Guide 2026/27 ฉบับเต็ม', 'Salary Thailand Review Guide 2026/27 — full edition'],
    promo_p: ['เว็บนี้คือ Mini Report ฉบับย่อ ดูข้อมูลได้ฟรี — ถ้าต้องการข้อมูลครบ 10 Part สั่งจองเล่มเต็มได้เลย', 'This site is the free Mini Report. For all 10 parts, pre-order the full report.'],
    promo_skip: ['ดูข้อมูลฟรีก่อน', 'Browse the free data first'],
    cb_h: ['ให้เราติดต่อกลับ', 'Request a call back'], cb_p: ['ฝากข้อมูลไว้ ทีมงานจะติดต่อกลับโดยเร็ว', 'Leave your details and our team will get back to you'],
    f_name: ['ชื่อ–นามสกุล *', 'Full name *'], f_org: ['บริษัท / หน่วยงาน', 'Company'], f_phone: ['เบอร์โทร', 'Phone'], f_email: ['อีเมล', 'Email'], f_topic: ['สนใจเรื่อง', 'Interested in'], f_msg: ['ข้อความ', 'Message'],
    f_t1: ['สั่งซื้อหนังสือเล่มเต็ม', 'Ordering the full report'], f_t2: ['เข้าร่วมโครงการสำรวจปี 2027/28', 'Joining the 2027/28 survey'], f_t3: ['ขอคำปรึกษาด้าน HR / ค่าตอบแทน', 'HR / compensation consulting'], f_t4: ['อื่น ๆ', 'Other'],
    f_send: ['ส่งข้อมูล', 'Send'], f_err_name: ['กรุณากรอกชื่อ', 'Please enter your name'], f_err_ct: ['กรุณากรอกเบอร์โทรหรืออีเมลอย่างน้อย 1 ช่องทาง', 'Please enter a phone number or email'], f_err_mail: ['รูปแบบอีเมลไม่ถูกต้อง', 'Invalid email'],
    f_ok: ['ขอบคุณครับ ได้รับข้อมูลแล้ว ทีมงานจะติดต่อกลับโดยเร็ว', 'Thank you — we have your details and will be in touch soon'], f_mail: ['ระบบจะเปิดโปรแกรมอีเมลของคุณพร้อมข้อความ กรุณากดส่ง', 'Your email app will open with the message — please press send'],
    a_proj: ['เกี่ยวกับโครงการ', 'About the project'], a_dir: ['ผู้อำนวยการโครงการ', 'Project director'], a_dir_role: ['กรรมการผู้จัดการ บริษัท ไทยสกิลล์พลัส จำกัด', 'Managing Director, Thai Skill Plus Co., Ltd.'],
    a_dir_exp: ['ผู้เชี่ยวชาญด้านสำรวจค่าตอบแทนมากกว่า 20 ปี และที่ปรึกษาค่าตอบแทนภาครัฐ รัฐวิสาหกิจ และเอกชน 30 ปี', 'Over 20 years in compensation surveys and 30 years advising government, state enterprises and private companies on pay'],
    a_sg: ['Skill Group', 'Skill Group'], a_exp1: ['ก่อตั้ง', 'Founded'], a_exp2: ['องค์กรที่ให้คำปรึกษา', 'client organizations'], a_exp3: ['โครงการที่ส่งมอบ', 'projects delivered'],
    a_act1: ['ถาม–ตอบปัญหา', 'Ask questions'], a_act1p: ['พูดคุยกับอาจารย์และชุมชน HR ผ่าน LINE Open Chat', 'Talk with the director and HR community on LINE Open Chat'],
    a_act2: ['เข้าร่วมโครงการปีหน้า', 'Join next year'], a_act2p: ['ร่วมส่งข้อมูล Salary Survey Thailand Review 2027/28', 'Take part in Salary Survey Thailand Review 2027/28'],
    a_act3: ['สั่งซื้อเล่มเต็ม', 'Order the full report'], a_act3p: ['Pre-order Salary Survey Thailand Review 2026/27', 'Pre-order Salary Survey Thailand Review 2026/27'],
    open_link: ['เปิดลิงก์', 'Open'], show_qr: ['แสดง QR', 'Show QR'],
    a_contact: ['ช่องทางติดต่อ', 'Contact'], a_follow: ['ติดตามออนไลน์', 'Follow us'], a_web: ['เว็บไซต์', 'Website'], copy: ['คัดลอก', 'Copy'], a_map: ['แผนที่', 'Map'],
    ft_about: ['ผลสำรวจค่าตอบแทน โบนัส สวัสดิการ และตำแหน่งงาน ประจำปี 2026/27 โดย ดร.รุ่งโรจน์ อรรถานิทธิ์ · Salary Thailand Institute × HR Monday', 'Pay, bonus, benefits and job survey 2026/27 by Dr. Rungroj Attanit · Salary Thailand Institute × HR Monday'],
    ft_menu: ['เมนู', 'Menu'], ft_contact: ['ติดต่อ', 'Contact'],
    ft_disc: ['ข้อมูลในเว็บไซต์นี้มาจาก Mini Report ใช้เพื่อการอ้างอิงประกอบการตัดสินใจเท่านั้น ข้อมูลครบถ้วนอยู่ในรายงานฉบับเต็ม', 'Data on this site comes from the Mini Report and is for reference only; complete data is in the full report.'],
    page_src: ['หน้า', 'p.'], back_top: ['กลับขึ้นด้านบน', 'Back to top'], view_all: ['ดูทั้งหมด', 'View all']
  };
  const t = k => (T[k] ? T[k][LANG === 'en' ? 1 : 0] : k);
  const L = (th, en) => (LANG === 'en' && en ? en : th);

  /* ---------------- utils ---------------- */
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nf = (v, d = 0) => v == null || isNaN(v) ? 'n/a' : Number(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const bizSub = b => (LANG === 'th' && K.bizTh[b] ? K.bizTh[b] : '');
  const cls = (c, on) => on ? c : '';
  const qs = () => { const h = location.hash.split('?')[1] || ''; return Object.fromEntries(new URLSearchParams(h)); };
  const setQs = (o) => { const base = location.hash.split('?')[0] || '#/'; const p = new URLSearchParams(o).toString(); history.replaceState(null, '', base + (p ? '?' + p : '')); };
  const img = f => 'assets/img/' + f;

  /* ---------------- routes ---------------- */
  const ROUTES = [
    { p: '', k: 'nav_home', r: Home },
    { p: 'starting', k: 'nav_start', r: Starting, part: 'B' },
    { p: 'experience', k: 'nav_exp', r: Experience, part: 'C' },
    { p: 'merit', k: 'nav_merit', r: Merit, part: 'F' },
    { p: 'welfare', k: 'nav_welfare', r: Welfare, part: 'D' },
    { p: 'overview', k: 'nav_overview', r: Overview, part: 'A' },
    { p: 'benchmark', k: 'nav_bench', r: Bench, part: 'E' },
    { p: 'research', k: 'nav_research', r: Research, part: 'G' },
    { p: 'summary', k: 'nav_summary', r: Summary, part: 'H' },
    { p: 'order', k: 'nav_order', r: Order },
    { p: 'about', k: 'nav_about', r: About }
  ];
  const NAV = ['starting', 'experience', 'merit', 'welfare', 'benchmark', 'summary', 'about', 'order'];
  const curPath = () => (location.hash.replace(/^#\/?/, '').split('?')[0] || '');

  function renderNav() {
    const p = curPath();
    $('#nav').innerHTML = NAV.map(x => { const r = ROUTES.find(y => y.p === x); return `<a href="#/${x}" class="${cls('on', p === x)} ${x === 'order' ? 'cta' : ''}">${t(r.k)}</a>`; }).join('');
    $('#drawerNav').innerHTML = ROUTES.map(r => `<a href="#/${r.p}" class="${cls('on', p === r.p)}">${r.part ? `<b style="width:26px;color:var(--o1);font-family:var(--font)">${r.part}</b>` : '<b style="width:26px"></b>'}${t(r.k)}</a>`).join('');
    $$('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === LANG));
  }

  function route() {
    const p = curPath();
    const r = ROUTES.find(x => x.p === p) || ROUTES[0];
    document.documentElement.lang = LANG;
    renderNav();
    const app = $('#app');
    app.innerHTML = r.r.html();
    if (r.r.bind) r.r.bind(app);
    i18nStatic(); reveal(); counters(app);
    closeDrawer();
    if (!route._first) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    route._first = false;
    document.title = (p ? t(r.k) + ' · ' : '') + 'Salary Thailand Review Guide 2026/27 — Mini Report';
    track(p);
  }
  route._first = true;

  function pageHero(part, title, sub) {
    return `<section class="page-hero"><div class="bg"></div><div class="wrap"><div class="crumb">${part ? 'Part ' + part + ' · ' : ''}Mini Report 2026/27</div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
  }
  const secH = (k, h, extra = '') => `<div class="sec-h rv"><div>${k ? `<div class="k">${k}</div>` : ''}<h2>${h}</h2></div>${extra}</div>`;

  /* ---------------- HOME ---------------- */
  function Home() {}
  Home.html = () => {
    const posCount = D.C.reduce((a, c) => a + c.pos.length, 0);
    const parts = [
      ['B', 'starting', 'nav_start', ['ป.โท ป.ตรี ปวส. 24 สาขา', '24 majors, 3 levels']],
      ['C', 'experience', 'nav_exp', ['27 สายวิชาชีพ ' + posCount + ' ตำแหน่ง', `27 professions, ${posCount} positions`]],
      ['F', 'merit', 'nav_merit', ['ตามธุรกิจ ขนาด และระดับ', 'By sector, size and level']],
      ['D', 'welfare', 'nav_welfare', ['เงินช่วยเหลือ ค่าวิชาชีพ', 'Allowances & licence pay']],
      ['A', 'overview', 'nav_overview', ['217 องค์กร · HR Tools', '217 orgs · HR tools'], 1],
      ['E', 'benchmark', 'nav_bench', ['Trends + 11 ตัวชี้วัด', 'Trends + 11 metrics'], 1],
      ['G', 'research', 'nav_research', ['7 หัวข้อ · AI · ลาออก', '7 topics · AI · turnover'], 1],
      ['H', 'summary', 'nav_summary', ['10 ประเด็นร้อน', '10 red issues'], 1]
    ];
    return `
    <section class="hero"><div class="bg"></div><div class="wrap">
      <div class="rv">
        <div class="badge"><span class="dot"></span>${t('hero_badge')}</div>
        <h1>Salary Thailand<br><span class="g">Review Guide 2026/27</span></h1>
        <p class="lead">${t('hero_lead')}</p>
        <div class="hero-cta"><a class="btn btn-o" href="#/starting">${t('cta_find')} &rarr;</a><a class="btn btn-g" href="#/order">${t('cta_order')}</a></div>
      </div>
      <img class="cover" src="${img('cover.jpg')}" alt="Salary Thailand Review Guide 2026/27 cover">
    </div></section>
    <div class="wrap"><div class="stats">
      ${[[217, 'st_org'], [20, 'st_biz'], [18, 'st_grade'], [27, 'st_prof'], [posCount, 'st_pos']].map(([v, k], i) => `<div class="stat rv" style="transition-delay:${i * 70}ms"><div class="v num" data-count="${v}">0</div><div class="l">${t(k)}</div></div>`).join('')}
    </div></div>

    <section class="sec"><div class="wrap">
      ${secH(t('ask_k'), t('ask_h'))}
      <div class="search rv" style="margin-bottom:18px"><input class="inp" id="gsearch" type="search" placeholder="${t('search_ph')}" aria-label="${t('search_ph')}" autocomplete="off"></div>
      <div id="gres" class="plist" style="max-height:340px;margin-bottom:18px;display:none"></div>
      <div class="ask">
        <a class="rv" href="#/starting"><img src="${img('grad-bachelor.jpg')}" alt=""><div class="in"><b>${t('ask1')}</b><span>${t('ask1s')}</span><span class="go">${t('go')} &rarr;</span></div></a>
        <a class="rv" style="transition-delay:80ms" href="#/experience"><img src="${img('grad-master.jpg')}" alt=""><div class="in"><b>${t('ask2')}</b><span>${t('ask2s')}</span><span class="go">${t('go')} &rarr;</span></div></a>
        <a class="rv" style="transition-delay:160ms" href="#/merit"><img src="${img('hr-network.jpg')}" alt="" style="object-position:center"><div class="in"><b>${t('ask3')}</b><span>${t('ask3s')}</span><span class="go">${t('go')} &rarr;</span></div></a>
      </div>
    </div></section>

    <section class="sec sec-alt"><div class="wrap">
      ${secH(t('hl_k'), t('hl_h'))}
      <div class="grid g4">
        <a href="#/merit" class="kpi rv" style="text-decoration:none"><div class="v"><span data-count="3.9" data-dec="1">0</span><small>%</small></div><div class="l">${t('hl_merit')}</div><div class="s">XL 4.3% · L 3.8% · M 3.9% · S 3.5%</div></a>
        <a href="#/merit?tab=bonus" class="kpi n rv" style="text-decoration:none;transition-delay:80ms"><div class="v"><span data-count="2.1" data-dec="1">0</span><small>${t('months')}</small></div><div class="l">${t('hl_bonus')}</div><div class="s">Automotive 5.7 · Electronic 2.9</div></a>
        <a href="#/benchmark" class="kpi d rv" style="text-decoration:none;transition-delay:160ms"><div class="v">1:<span data-count="75">0</span></div><div class="l">${t('hl_ratio')}</div><div class="s">2025/26 = 1:92</div></a>
        <a href="#/benchmark" class="kpi rv" style="text-decoration:none;transition-delay:240ms;background:linear-gradient(135deg,#FFB65C,#F28C28)"><div class="v" style="font-size:clamp(30px,3.4vw,40px)">${L('วิศวกร', 'Engineer')}</div><div class="l">${t('hl_rare')}</div><div class="s">${L('อันดับ 2 Sales (Chinese Speaking) · อันดับ 3 ผู้บริหาร', '#2 Sales (Chinese speaking) · #3 Executive')}</div></a>
      </div>
    </div></section>

    <section class="sec"><div class="wrap">
      ${secH(t('parts_k'), t('parts_h'))}
      <div class="parts">${parts.map(([pl, p, k, s, tt], i) => `<a class="part rv ${tt ? 't' : ''}" style="transition-delay:${i * 40}ms" href="#/${p}"><span class="pl">${pl}</span><span><b>${t(k)}</b><span>${L(s[0], s[1])}</span></span></a>`).join('')}</div>
    </div></section>

    <section class="sec sec-alt"><div class="wrap" style="max-width:900px">
      ${secH('Executive Summary', t('exec_h'))}
      <div class="rv">${K.execSummary[LANG === 'en' ? 'en' : 'th'].map(p => `<p>${esc(p)}</p>`).join('')}</div>
    </div></section>

    <section class="sec"><div class="wrap">${orderBand()}</div></section>`;
  };
  Home.bind = (app) => {
    const inp = $('#gsearch', app), out = $('#gres', app);
    const idx = [];
    D.C.forEach((c, ci) => c.pos.forEach((p, pi) => idx.push({ s: (p.n + ' ' + c.en + ' ' + c.th).toLowerCase(), h: `#/experience?c=${ci}&p=${pi}`, a: p.n, b: L(c.th, c.en) + ' · JG ' + p.g })));
    D.B.forEach((m, mi) => idx.push({ s: (m.th + ' ' + m.en + ' ' + K.levels[m.level].th).toLowerCase(), h: `#/starting?m=${mi}`, a: L(m.th, m.en), b: t('nav_start') + ' · ' + L(K.levels[m.level].th, K.levels[m.level].en) }));
    inp.addEventListener('input', () => {
      const q = inp.value.trim().toLowerCase();
      if (!q) { out.style.display = 'none'; return; }
      const r = idx.filter(x => x.s.includes(q)).slice(0, 30);
      out.style.display = 'flex';
      out.innerHTML = r.length ? r.map(x => `<a class="pitem" href="${x.h}" style="text-decoration:none"><span>${esc(x.a)}<span class="cr">${esc(x.b)}</span></span><span style="color:var(--o1)">&rarr;</span></a>`).join('') : `<div class="muted">${t('nores')}</div>`;
    });
  };

  function orderBand() {
    return `<div class="cta-band rv"><div class="bg"></div><div class="in"><div><div class="badge" style="margin-bottom:10px"><span class="dot"></span>${t('ord_until')}</div><h2>${t('band_h')}</h2><p style="margin:10px 0 18px">${t('band_p')}</p><div class="hero-cta"><a class="btn btn-o" href="#/order">${t('ord_price')} ${nf(CFG.bookPrice)} ${t('baht')} &rarr;</a><button class="btn btn-g" data-open-contact>${t('fab_contact')}</button></div></div><img src="${img('cover.jpg')}" alt=""></div></div>`;
  }

  /* ---------------- shared salary viz ---------------- */
  function zoneOf(v, s) { // s = {min,p25,p50,p75,max}
    if (v < s.min) return 'under'; if (v <= s.p25) return 'white'; if (v <= s.p50) return 'green'; if (v <= s.p75) return 'yellow'; if (v <= s.max) return 'orange'; return 'red';
  }
  function rangeBar(s, mine) {
    const lo = Math.min(s.min, mine || Infinity) * 0.9, hi = Math.max(s.max, mine || 0) * 1.06, W = hi - lo, P = v => ((v - lo) / W * 100);
    const Z = Object.fromEntries(K.zones.map(z => [z.key, z.color]));
    const segs = [['under', lo, s.min], ['white', s.min, s.p25], ['green', s.p25, s.p50], ['yellow', s.p50, s.p75], ['orange', s.p75, s.max], ['red', s.max, hi]];
    return `<div class="range">
      ${mine ? `<div class="me" style="left:${P(mine)}%"><div class="pin">${t('you')} ${nf(mine)}</div><div class="ln"></div></div>` : ''}
      <div class="track">${segs.map(([k, a, b], i) => `<span style="width:${Math.max(0, P(b) - P(a))}%;background:${Z[k]};opacity:${k === 'under' || k === 'red' ? .35 : 1};animation-delay:${i * 60}ms"></span>`).join('')}</div>
      <div class="ticks">${[['Min', s.min], ['P25', s.p25], ['P50', s.p50], ['P75', s.p75], ['Max', s.max]].map(([l, v], i) => `<div class="tick" style="left:${P(v)}%;${i % 2 ? 'top:24px' : ''}"><b>${nf(v)}</b>${l}</div>`).join('')}</div>
    </div>`;
  }
  function zoneMsg(z) { const o = K.zones.find(x => x.key === z); return `<span class="sw" style="background:${o.color}"></span><div><b>${L(o.th, o.en)}</b><div class="small muted">${L(o.dth, o.den)}</div></div>`; }
  function salaryInput(id) {
    return `<div class="mycheck no-print"><div class="f-head" style="font-size:15px;color:var(--navy)">${t('check_h')}</div><p class="small muted" style="margin:2px 0 10px">${t('check_p')}</p>
      <div class="row"><input class="inp" id="${id}" type="text" inputmode="numeric" placeholder="25,000" aria-label="${t('check_h')}"><button class="btn btn-o" data-check="${id}">${t('check_btn')}</button></div>
      <div class="err" id="${id}-err"></div><div class="zone-out" id="${id}-out"></div></div>`;
  }
  const parseMoney = s => { const v = parseFloat(String(s).replace(/[^\d.]/g, '')); return isFinite(v) && v > 0 && v < 10000000 ? v : null; };
  function shareBar() { return `<div class="no-print" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px"><button class="btn btn-w btn-sm" data-share>&#10150; ${t('share')}</button><button class="btn btn-w btn-sm" onclick="window.print()">&#9113; ${t('print')}</button></div>`; }

  /* ---------------- STARTING (Part B) ---------------- */
  const SS = { m: 7, b: '' };
  function Starting() {}
  Starting.html = () => {
    const q = qs(); if (q.m != null && D.B[+q.m]) SS.m = +q.m; if (q.b != null) SS.b = BIZ.includes(q.b) ? q.b : '';
    return pageHero('B', L('ค่าจ้างเริ่มต้นพนักงานใหม่', 'New employee starting salary'), L('ค่าจ้างเริ่มต้นตามวุฒิการศึกษา 24 สาขา แยกตาม 20 กลุ่มธุรกิจ พร้อม Min, P25, P50, P75 และ Max', 'Starting pay for 24 majors across 20 business sectors, with Min, P25, P50, P75 and Max')) +
      `<section class="sec"><div class="wrap layout"><aside class="card flat no-print" id="sfilters"></aside><div id="sresult"></div></div></section>
      <section class="sec" style="padding-top:0"><div class="wrap"><div class="note rv">${L('ไฮไลต์: ค่าจ้างเริ่มต้นสูงสุด ป.โท และ ป.ตรี คือกลุ่มไอที สาขาวิศวกรรมคอมพิวเตอร์ · ป.ตรี บริหารธุรกิจ (ต่างประเทศ) ก็สูงเช่นกัน · ปวส. สาขาบริหาร/การตลาด และ ปวช. สาขาช่างเทคนิค มีรายละเอียดในเล่มเต็ม', 'Highlight: the highest starting pay for master\'s and bachelor\'s graduates is in IT/computer engineering; international business administration is also high. High-vocational business/marketing and vocational technician data are in the full report.')}</div></div></section>`;
  };
  Starting.bind = (app) => { drawSF(); drawSR(); };
  function drawSF() {
    const m = D.B[SS.m], lv = m.level;
    const groups = {}; D.B.forEach((x, i) => { if (x.level === lv) (groups[x.group] = groups[x.group] || []).push(i); });
    $('#sfilters').innerHTML = `
      <div class="step-lbl" style="margin-top:0"><i>1</i>${t('s1')}</div>
      <div class="lv">${Object.entries(K.levels).map(([k, o]) => `<button data-lv="${k}" class="${cls('on', lv === k)}"><img src="${o.img}" alt=""><span>${L(o.th, o.en)}</span></button>`).join('')}</div>
      <div class="step-lbl"><i>2</i>${t('s2')}</div>
      ${Object.entries(groups).map(([g, ids]) => `<div class="grp-t">${L(K.groups[g].th, K.groups[g].en)}</div><div class="chips">${ids.map(i => `<button class="chip ${cls('on', i === SS.m)}" data-m="${i}">${esc(L(D.B[i].th, D.B[i].en))}</button>`).join('')}</div>`).join('')}
      <div class="step-lbl"><i>3</i>${t('s3')}</div>
      <select class="sel" id="sbiz"><option value="">${t('market')}</option>${BIZ.map(b => `<option value="${esc(b)}" ${SS.b === b ? 'selected' : ''}>${esc(b)}${bizSub(b) ? ' — ' + bizSub(b) : ''}</option>`).join('')}</select>`;
    $$('#sfilters [data-lv]').forEach(b => b.onclick = () => { const i = D.B.findIndex(x => x.level === b.dataset.lv); SS.m = i; drawSF(); drawSR(); });
    $$('#sfilters [data-m]').forEach(b => b.onclick = () => { SS.m = +b.dataset.m; drawSF(); drawSR(); if (innerWidth < 980) $('#sresult').scrollIntoView({ behavior: 'smooth' }); });
    $('#sbiz').onchange = e => { SS.b = e.target.value; drawSR(); };
  }
  let SR_sort = false, SR_mine = null;
  function drawSR() {
    const m = D.B[SS.m]; setQs({ m: SS.m, ...(SS.b ? { b: SS.b } : {}) });
    const row = SS.b ? m.rows[SS.b] : m.rows.Average;
    const has = row && row[0] != null;
    const st = has ? { min: row[0], p25: row[1], p50: row[2], p75: row[3], max: row[4] } : null;
    const head = SS.b ? [[row[2], 'P50'], [row[1], 'P25'], [row[3], 'P75']] : [[m.avg, t('avg')], [m.p50, t('p50')], [m.mode, t('mode')]];
    let list = BIZ.map(b => [b, m.rows[b]]);
    if (SR_sort) list = list.slice().sort((a, b) => (b[1][2] || -1) - (a[1][2] || -1));
    const mx = Math.max(...BIZ.map(b => m.rows[b][4] || 0), m.rows.Average[4]);
    $('#sresult').innerHTML = `<div class="result rv in">
      <div class="rh"><div class="tiny" style="color:#FFD08A">${L(K.levels[m.level].th, K.levels[m.level].en)} · ${L(K.groups[m.group].th, K.groups[m.group].en)}</div><h2>${esc(L(m.th, m.en))}</h2><p>${SS.b ? esc(SS.b) + (bizSub(SS.b) ? ' · ' + bizSub(SS.b) : '') : t('market')} · ${t('unit_month')}</p></div>
      <div class="rb">
        <div class="trio">${head.map(([v, l]) => `<div class="${v == null ? 'na' : ''}"><div class="v num" ${v != null ? `data-count="${v}"` : ''}>${v == null ? 'n/a' : 0}</div><div class="l">${l}</div></div>`).join('')}</div>
        ${has ? rangeBar(st, SR_mine) + salaryInput('sme') : `<div class="note" style="margin-top:16px">${t('na_note')}</div>`}
        ${shareBar()}
        <p class="tiny muted" style="margin-top:12px">${t('src')} ${m.page} · ${t('na_note')}</p>
      </div></div>
      <div class="card" style="margin-top:20px">
        <div class="sec-h" style="margin-bottom:8px"><div><h3>${t('cmp_h')}</h3><p class="small muted" style="margin:0">${t('cmp_p')}</p></div><button class="btn btn-w btn-sm no-print" id="ssort">${SR_sort ? t('sort0') : t('sort')}</button></div>
        <div class="bars">${list.map(([b, r]) => barRow(b, r, mx, SS.b === b)).join('')}${barRow('Average', m.rows.Average, mx, !SS.b, true)}</div>
      </div>
      <details class="acc" style="margin-top:16px"><summary>${t('tbl')}</summary><div class="ab"><div class="tbl-wrap"><table class="t"><thead><tr><th>${t('biz')}</th><th>Min</th><th>P25</th><th>P50</th><th>P75</th><th>Max</th></tr></thead><tbody>${BIZ.concat(['Average']).map(b => `<tr data-b="${b === 'Average' ? '' : esc(b)}" class="${b === 'Average' ? 'sum' : ''} ${cls('hi', SS.b === b)}"><td>${esc(b)}</td>${m.rows[b].map(v => `<td class="${v == null ? 'na' : ''}">${nf(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></details>`;
    counters($('#sresult'));
    $('#ssort').onclick = () => { SR_sort = !SR_sort; drawSR(); };
    $$('#sresult [data-bz], #sresult tr[data-b]').forEach(el => el.onclick = () => { SS.b = el.dataset.bz != null ? el.dataset.bz : el.dataset.b; drawSF(); drawSR(); $('#sresult').scrollIntoView({ behavior: 'smooth' }); });
    bindCheck('sme', v => { SR_mine = v; const z = zoneOf(v, st); const rg = $('#sresult .range'); rg.outerHTML = rangeBar(st, v); const o = $('#sme-out'); o.innerHTML = zoneMsg(z); o.classList.add('show'); });
    if (SR_mine && has) { $('#sme').value = nf(SR_mine); const o = $('#sme-out'); o.innerHTML = zoneMsg(zoneOf(SR_mine, st)); o.classList.add('show'); }
  }
  function barRow(b, r, mx, hi, isAvg) {
    const na = !r || r[2] == null;
    return `<div class="bar ${hi ? 'hi' : ''} ${isAvg ? 'avg' : ''}" data-bz="${isAvg ? '' : esc(b)}" style="cursor:pointer" title="${esc(b)}"><span class="n">${isAvg ? L('ภาพรวมตลาด', 'Market') : esc(b)}</span><span class="t">${na ? '' : `<span class="rg" style="left:${r[0] / mx * 100}%;width:${(r[4] - r[0]) / mx * 100}%"></span><span class="f" style="width:${r[2] / mx * 100}%"></span>`}</span><span class="v ${na ? 'na' : ''}">${na ? 'n/a' : nf(r[2])}</span></div>`;
  }
  function bindCheck(id, fn) {
    const b = document.querySelector(`[data-check="${id}"]`), inp = $('#' + id); if (!b) return;
    const go = () => { const v = parseMoney(inp.value); const e = $('#' + id + '-err'); if (!v) { e.textContent = t('check_err'); return; } e.textContent = ''; inp.value = nf(v); fn(v); };
    b.onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); }; inp.oninput = () => { $('#' + id + '-err').textContent = ''; };
  }

  /* ---------------- EXPERIENCE (Part C) ---------------- */
  const ES = { c: 9, p: 8, y: 'y1', q: '' };
  function Experience() {}
  Experience.html = () => {
    const q = qs(); if (q.c != null && D.C[+q.c]) { ES.c = +q.c; ES.p = q.p != null && D.C[ES.c].pos[+q.p] ? +q.p : 0; }
    return pageHero('C', L('ค่าจ้างตามประสบการณ์', 'Salary by experience'), L(`เงินเดือนของพนักงานประสบการณ์ 1–3 ปี และ 3–5 ปี จาก 27 สายวิชาชีพ รวม ${D.C.reduce((a, c) => a + c.pos.length, 0)} ตำแหน่ง พร้อม Job Grade`, `Pay for 1–3 and 3–5 years of experience across 27 professions and ${D.C.reduce((a, c) => a + c.pos.length, 0)} positions, with job grades`)) +
      `<section class="sec"><div class="wrap layout"><aside class="card flat no-print" id="efilters"></aside><div id="eresult"></div></div></section>
       <section class="sec" style="padding-top:0"><div class="wrap"><div class="note rv">${L('ไฮไลต์ประสบการณ์ 1–3 ปี: ผู้จัดการฝ่ายการตลาด เฉลี่ย 142,340 บาท · ผู้จัดการฝ่ายสารสนเทศ 107,870 บาท · ผู้จัดการฝ่ายผลิต 80,000 บาท · Programmer 37,670 บาท', 'Highlights (1–3 years): Marketing manager avg 142,340 THB · IT manager 107,870 · Production manager 80,000 · Programmer 37,670')}</div></div></section>`;
  };
  Experience.bind = () => { drawEF(); drawER(); };
  function drawEF() {
    const c = D.C[ES.c];
    const q = ES.q.trim().toLowerCase();
    let list;
    if (q) { list = []; D.C.forEach((cc, ci) => cc.pos.forEach((p, pi) => { if ((p.n + ' ' + cc.en + ' ' + cc.th).toLowerCase().includes(q)) list.push([ci, pi]); })); }
    else list = c.pos.map((p, pi) => [ES.c, pi]);
    $('#efilters').innerHTML = `
      <div class="search"><input class="inp" id="eq" type="search" placeholder="${t('e_search')}" value="${esc(ES.q)}" autocomplete="off"></div>
      <div class="step-lbl"><i>1</i>${t('e_s1')}</div>
      <select class="sel" id="ecar">${D.C.map((cc, i) => `<option value="${i}" ${i === ES.c ? 'selected' : ''}>${i + 1}. ${esc(cc.en)} — ${esc(cc.th)} (${cc.pos.length})</option>`).join('')}</select>
      <div class="step-lbl"><i>2</i>${t('e_s2')} <span class="muted" style="font-family:var(--body)">(${list.length})</span></div>
      <div class="plist" id="eplist">${list.length ? list.map(([ci, pi]) => { const p = D.C[ci].pos[pi]; return `<button class="pitem ${cls('on', ci === ES.c && pi === ES.p)}" data-c="${ci}" data-p="${pi}"><span>${esc(p.n)}${q ? `<span class="cr">${esc(L(D.C[ci].th, D.C[ci].en))}</span>` : ''}</span><span class="jg">JG ${esc(p.g)}</span></button>`; }).join('') : `<div class="muted">${t('nores')}</div>`}</div>
      <p class="tiny muted" style="margin-top:8px">${t('pos_note')}</p>`;
    const eq = $('#eq'); eq.oninput = () => { ES.q = eq.value; const pos = eq.selectionStart; drawEF(); const n = $('#eq'); n.focus(); n.setSelectionRange(pos, pos); };
    $('#ecar').onchange = e => { ES.c = +e.target.value; ES.p = 0; ES.q = ''; drawEF(); drawER(); };
    $$('#eplist [data-c]').forEach(b => b.onclick = () => { ES.c = +b.dataset.c; ES.p = +b.dataset.p; drawEF(); drawER(); if (innerWidth < 980) $('#eresult').scrollIntoView({ behavior: 'smooth' }); });
  }
  let ER_mine = null;
  function drawER() {
    const c = D.C[ES.c], p = c.pos[ES.p]; setQs({ c: ES.c, p: ES.p });
    const mx = Math.max(...[p.y1[1], p.y3[1]].filter(x => x != null), 1) * 1.08;
    const card = (k, a) => { if (a[0] == null) return `<div class="expc"><h4>${t(k)}</h4><div class="v num" style="font-size:26px;color:var(--muted)">n/a</div><p class="tiny muted">${t('na_note')}</p></div>`;
      return `<div class="expc"><h4>${t(k)}</h4><div class="num" style="font-size:30px;font-weight:700;color:var(--o1)" data-count="${a[2]}">0</div><div class="tiny muted">${t('avg')} · ${t('unit_month')}</div>
        <div class="gbar"><div class="fill" style="left:${a[0] / mx * 100}%;width:${(a[1] - a[0]) / mx * 100}%"></div><span class="avg" style="left:${a[2] / mx * 100}%">${nf(a[2])}</span>${ER_mine && ES.y === k ? `<span class="me2" style="left:${Math.min(ER_mine / mx * 100, 100)}%"></span>` : ''}</div>
        <div class="mmax"><span>Min ${nf(a[0])}</span><span>Max ${nf(a[1])}</span></div></div>`; };
    const has = p[ES.y][0] != null;
    $('#eresult').innerHTML = `<div class="result rv in">
      <div class="rh"><div class="tiny" style="color:#FFD08A">${ES.c + 1}. ${esc(c.en)} · ${esc(c.th)}</div><h2>${esc(p.n)}</h2><p>${t('jg')} ${esc(p.g)} · ${t('unit_month')}</p></div>
      <div class="rb"><div class="exp2">${card('y1', p.y1)}${card('y3', p.y3)}</div>
        <div class="mycheck no-print"><div class="f-head" style="font-size:15px;color:var(--navy)">${t('check_h')}</div><p class="small muted" style="margin:2px 0 10px">${t('e_check_p')}</p>
          <div class="tabs" style="margin-bottom:10px"><button data-y="y1" class="${cls('on', ES.y === 'y1')}">1–3 ${L('ปี', 'yrs')}</button><button data-y="y3" class="${cls('on', ES.y === 'y3')}">3–5 ${L('ปี', 'yrs')}</button></div>
          <div class="row"><input class="inp" id="eme" type="text" inputmode="numeric" placeholder="30,000" value="${ER_mine ? nf(ER_mine) : ''}"><button class="btn btn-o" data-check="eme">${t('check_btn')}</button></div>
          <div class="err" id="eme-err"></div><div class="zone-out" id="eme-out"></div></div>
        ${shareBar()}<p class="tiny muted" style="margin-top:12px">${t('src')} ${c.page}</p></div></div>
      <div class="card" style="margin-top:20px"><h3 style="margin-bottom:12px">${t('all_pos')} — ${esc(L(c.th, c.en))}</h3>
        <div class="tbl-wrap"><table class="t"><thead><tr><th rowspan="2">Position</th><th rowspan="2">JG</th><th colspan="3" style="text-align:center">1–3 ${L('ปี', 'yrs')}</th><th colspan="3" style="text-align:center">3–5 ${L('ปี', 'yrs')}</th></tr><tr class="th2"><th>Min</th><th>Max</th><th>Avg</th><th>Min</th><th>Max</th><th>Avg</th></tr></thead>
        <tbody>${c.pos.map((x, i) => `<tr data-p="${i}" class="${cls('hi', i === ES.p)}"><td>${esc(x.n)}</td><td>${esc(x.g)}</td>${x.y1.concat(x.y3).map(v => `<td class="${v == null ? 'na' : ''}">${nf(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
    counters($('#eresult'));
    $$('#eresult tr[data-p]').forEach(r => r.onclick = () => { ES.p = +r.dataset.p; drawEF(); drawER(); $('#eresult').scrollIntoView({ behavior: 'smooth' }); });
    $$('#eresult [data-y]').forEach(b => b.onclick = () => { ES.y = b.dataset.y; drawER(); if (ER_mine) showE(); });
    bindCheck('eme', v => { ER_mine = v; drawER(); showE(); });
    if (ER_mine) showE();
    function showE() {
      const a = p[ES.y], o = $('#eme-out'); if (!o) return;
      if (a[0] == null) { o.innerHTML = `<span class="sw" style="background:#ccc"></span><div>${t('na_note')}</div>`; o.classList.add('show'); return; }
      const v = ER_mine; let k, col;
      if (v < a[0]) { k = 'under_min'; col = '#5B6475'; } else if (v <= a[2]) { k = 'min_avg'; col = '#3DBE7A'; } else if (v <= a[1]) { k = 'avg_max'; col = '#F5C542'; } else { k = 'over_max'; col = '#E5484D'; }
      const diff = ((v - a[2]) / a[2] * 100);
      o.innerHTML = `<span class="sw" style="background:${col}"></span><div><b>${t(k)}</b><div class="small muted">${L('ต่างจากค่าเฉลี่ย', 'vs average')} ${diff >= 0 ? '+' : ''}${diff.toFixed(1)}% (${t(ES.y)})</div></div>`; o.classList.add('show');
    }
  }

  /* ---------------- MERIT & BONUS (Part F) ---------------- */
  const MS = { tab: 'merit', lv: 'all', b: '' };
  function Merit() {}
  Merit.html = () => {
    const q = qs(); if (q.tab === 'bonus') MS.tab = 'bonus';
    return pageHero('F', L('การขึ้นค่าจ้างและโบนัส', 'Merit increase & bonus trends'), L('การขึ้นค่าจ้างประจำปีและการจ่ายโบนัส แยกตาม 20 กลุ่มธุรกิจ ขนาดองค์กร และระดับพนักงาน', 'Annual salary increases and bonuses by 20 sectors, organization size and staff level')) +
      `<section class="sec"><div class="wrap"><div id="mwrap"></div></div></section><section class="sec" style="padding-top:0"><div class="wrap">${orderBand()}</div></section>`;
  };
  Merit.bind = () => drawM();
  function drawM() {
    const isM = MS.tab === 'merit', F = D.F, tb = F[MS.tab][MS.lv], st = F[MS.tab + '_stat'], sz = F[MS.tab + '_size'];
    setQs(isM ? {} : { tab: 'bonus' });
    const u = isM ? '%' : ' ' + t('months');
    const mx = Math.max(...BIZ.map(b => tb.rows[b][4]));
    const sorted = BIZ.slice().sort((a, b) => tb.rows[b][4] - tb.rows[a][4]);
    $('#mwrap').innerHTML = `
      <div class="tabs no-print"><button data-tab="merit" class="${cls('on', isM)}">${t('m_tab_merit')}</button><button data-tab="bonus" class="${cls('on', !isM)}">${t('m_tab_bonus')}</button></div>
      <div class="grid g3">
        <div class="kpi ${isM ? '' : 'n'} rv in"><div class="v"><span data-count="${st.avg}" data-dec="1">0</span><small>${isM ? '%' : t('months')}</small></div><div class="l">${isM ? t('hl_merit') : t('hl_bonus')} (Average)</div></div>
        <div class="kpi d rv in"><div class="v"><span data-count="${st.mode}" data-dec="1">0</span><small>${isM ? '%' : t('months')}</small></div><div class="l">Mode</div></div>
        <div class="kpi d rv in"><div class="v"><span data-count="${st.median}" data-dec="1">0</span><small>${isM ? '%' : t('months')}</small></div><div class="l">Median</div></div>
      </div>
      <h3 style="margin:30px 0 14px">${t('by_size')}</h3>
      <div class="grid g4">${sz.slice(0, 4).reverse().map(r => `<div class="card flat rv in" style="display:flex;gap:14px;align-items:center">${donut([[r[2], 'var(--o1)'], [r[3], '#EADBC8']], `${r[0]}<small>${nf(r[1])} ${t('orgs')}</small>`)}<div><div class="num" style="font-size:28px;font-weight:700;color:var(--navy)">${r[6]}${isM ? '%' : ''}</div><div class="small muted">${isM ? '' : t('months') + ' · '}${t('avg')}</div><div class="small" style="margin-top:6px"><b style="color:var(--o1)">${r[2]}%</b> ${isM ? t('pct_up') : t('pct_pay')}</div><div class="tiny muted">Min ${r[4]} · Max ${r[5]}</div></div></div>`).join('')}</div>
      <p class="tiny muted" style="margin-top:8px">${L('ภาพรวม ', 'Overall ')}${sz[4][2]}% ${isM ? t('pct_up') : t('pct_pay')} · ${t('src')} ${isM ? 94 : 98}</p>
      <div class="sec-h" style="margin:30px 0 12px"><h3>${t('by_biz')}</h3>
        <select class="sel" id="mbiz" style="max-width:340px"><option value="">${t('pick_biz')}</option>${BIZ.map(b => `<option ${MS.b === b ? 'selected' : ''}>${esc(b)}</option>`).join('')}</select></div>
      <div class="tabs">${['all', 'exec', 'manager', 'supervisor', 'operator'].map(k => `<button data-lv="${k}" class="${cls('on', MS.lv === k)}">${t('lv_' + k)}</button>`).join('')}</div>
      <div class="grid g2" style="align-items:start">
        <div class="card"><div class="legend"><span><i style="background:var(--o1)"></i>${t('avg')}</span><span><i style="background:var(--o4)"></i>Min–Max</span></div>
          <div class="bars">${sorted.map(b => { const r = tb.rows[b]; return `<div class="bar ${cls('hi', MS.b === b)}" data-bz="${esc(b)}" style="cursor:pointer"><span class="n">${esc(b)}</span><span class="t"><span class="rg" style="left:${r[2] / mx * 100}%;width:${(r[3] - r[2]) / mx * 100}%"></span><span class="f" style="width:${r[4] / mx * 100}%"></span></span><span class="v">${nf(r[4], 1)}${isM ? '%' : ''}</span></div>`; }).join('')}
          <div class="bar avg"><span class="n">${L('ภาพรวมตลาด', 'Market')}</span><span class="t"><span class="f" style="width:${tb.sum[4] / mx * 100}%"></span></span><span class="v">${nf(tb.sum[4], 1)}${isM ? '%' : ''}</span></div></div></div>
        <div class="tbl-wrap"><table class="t"><thead><tr><th>${t('biz')}</th><th>${isM ? t('up') : t('pay')}</th><th>${isM ? t('noup') : t('nopay')}</th><th>Min</th><th>Max</th><th>Avg</th></tr></thead><tbody>
          ${BIZ.map(b => `<tr data-b="${esc(b)}" class="${cls('hi', MS.b === b)}"><td>${esc(b)}</td>${tb.rows[b].map((v, i) => `<td>${i < 2 ? nf(v) : nf(v, 1)}</td>`).join('')}</tr>`).join('')}
          <tr class="sum"><td>Market</td>${tb.sum.map((v, i) => `<td>${i < 2 ? nf(v) : nf(v, 1)}</td>`).join('')}</tr></tbody></table></div>
      </div>
      <p class="tiny muted" style="margin-top:10px">${t('src')} ${isM ? '93–96' : '97–100'} · ${isM ? L('หน่วย: % การขึ้นค่าจ้าง', 'Unit: % increase') : L('หน่วย: จำนวนเดือน', 'Unit: months')}</p>`;
    counters($('#mwrap'));
    $$('#mwrap [data-tab]').forEach(b => b.onclick = () => { MS.tab = b.dataset.tab; drawM(); });
    $$('#mwrap [data-lv]').forEach(b => b.onclick = () => { MS.lv = b.dataset.lv; drawM(); });
    $('#mbiz').onchange = e => { MS.b = e.target.value; drawM(); };
    $$('#mwrap [data-bz], #mwrap tr[data-b]').forEach(el => el.onclick = () => { MS.b = el.dataset.bz || el.dataset.b; drawM(); });
  }
  function donut(parts, label, size = 120) {
    const r = 46, C = 2 * Math.PI * r; let off = 0;
    return `<div class="donut" style="width:${size}px;height:${size}px"><svg viewBox="0 0 120 120" width="${size}" height="${size}"><circle cx="60" cy="60" r="${r}" stroke="#F3E8DA"/>${parts.map(([v, c]) => { const s = `<circle cx="60" cy="60" r="${r}" stroke="${c}" stroke-dasharray="${C * v / 100} ${C}" stroke-dashoffset="${-off}"/>`; off += C * v / 100; return s; }).join('')}</svg><div class="lbl"><div>${label}</div></div></div>`;
  }

  /* ---------------- WELFARE (Part D) ---------------- */
  function Welfare() {}
  Welfare.html = () => pageHero('D', L('สวัสดิการและเงินช่วยเหลือ', 'HR welfare allowance'), t('w_lead')) +
    `<section class="sec"><div class="wrap">
      <div class="grid g2" style="align-items:start;margin-bottom:28px">
        <div class="card rv"><h3>${t('w_inbook')}</h3><ol style="margin:10px 0 0;padding-left:20px">${K.welfareFull[LANG === 'en' ? 'en' : 'th'].map(x => `<li style="margin-bottom:6px">${esc(x)}</li>`).join('')}</ol></div>
        <div class="card rv" style="background:linear-gradient(160deg,#FFF1DE,#fff)"><h3>${L('ไฮไลต์', 'Highlights')}</h3><p>${esc(L(K.redIssues[3].th, K.redIssues[3].en))}</p><div class="note">${L('Mini Report แสดงตัวอย่าง 9 ตาราง ข้อมูลครบทุกหัวข้ออยู่ในเล่มเต็ม', 'The Mini Report shows 9 sample tables; every topic is in the full report.')}</div><a class="btn btn-o" style="margin-top:14px" href="#/order">${t('cta_order')} &rarr;</a></div>
      </div>
      ${secH('', t('w_mini'))}
      <div class="gal" data-lbg>${K.welfare.map(w => `<figure class="rv"><img loading="lazy" src="${img(w.img)}" alt="${esc(L(w.t, w.e))}"><figcaption>${esc(L(w.t, w.e))}</figcaption></figure>`).join('')}</div>
      <p class="tiny muted" style="margin-top:10px">${t('src')} 65–69 · ${L('หน่วย: บาท/เดือน (ยกเว้นค่าอาหาร บาท/มื้อ และ Mileage บาท/กม.)', 'Unit: THB/month (meals THB/meal, mileage THB/km)')}</p>
    </div></section>`;
  Welfare.bind = app => lbBind(app);

  /* ---------------- OVERVIEW (Part A) ---------------- */
  function Overview() {}
  Overview.html = () => {
    const zs = K.zones;
    return pageHero('A', L('ภาพรวมการสำรวจ & HR Tool Trends', 'General & highlights 2026/27'), esc(L(K.foreword.th, K.foreword.en)).slice(0, 260) + '…') +
    `<section class="sec"><div class="wrap">
      <div class="grid g4">${K.orgSize.map(([s, n, p], i) => `<div class="stat rv" style="transition-delay:${i * 60}ms"><div class="v num" data-count="${n}">0</div><div class="l"><b style="font-family:var(--font);color:var(--navy)">${s}</b> · ${p}% ${L('ของ 217 องค์กร', 'of 217 orgs')}</div></div>`).join('')}</div>
      <div class="grid g2" style="margin-top:22px;align-items:start">
        <div class="card rv"><h3>${t('o_prov')}</h3><div class="bars" style="margin-top:12px">${K.provinces.map(([a, b, v]) => `<div class="bar"><span class="n">${L(a, b)}</span><span class="t"><span class="f" style="width:${v / 61 * 100}%"></span></span><span class="v">${v}%</span></div>`).join('')}</div></div>
        <div class="card rv"><h3>${t('o_emp')}</h3><div class="bars" style="margin-top:12px">${K.empShare.map(([a, b, v]) => `<div class="bar"><span class="n">${L(a, b)}</span><span class="t"><span class="f" style="width:${v / 32 * 100}%"></span></span><span class="v">${v}%</span></div>`).join('')}</div></div>
      </div>
    </div></section>
    <section class="sec sec-alt"><div class="wrap">
      ${secH('', t('o_calc'))}
      <div class="grid g2" style="align-items:start">
        <div class="card rv"><p class="small muted">${t('o_calc_p')}</p>
          <div class="calc"><label class="small">${t('emp_n')}<input class="inp" id="cEmp" inputmode="numeric" placeholder="1,350"></label><label class="small">${t('sales_n')}<input class="inp" id="cSales" inputmode="decimal" placeholder="1,200"></label><button class="btn btn-o" id="cGo">${t('calc_btn')}</button></div>
          <div class="err" id="cErr"></div><div id="cOut"></div></div>
        <div class="grid g2 rv">
          <div class="tbl-wrap"><table class="t" style="min-width:0"><thead><tr><th>${L('พนักงาน (คน)', 'Employees')}</th><th>${L('ค่า', 'Score')}</th></tr></thead><tbody>${K.sizeFormula.emp.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div>
          <div class="tbl-wrap"><table class="t" style="min-width:0"><thead><tr><th>${L('ยอดขาย (ลบ.)', 'Sales (THB m)')}</th><th>${L('ค่า', 'Score')}</th></tr></thead><tbody>${K.sizeFormula.sales.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div>
          <div class="tbl-wrap" style="grid-column:1/-1"><table class="t" style="min-width:0"><thead><tr><th>${L('ขนาด', 'Size')}</th><th>${t('score')}</th></tr></thead><tbody>${K.sizeFormula.result.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div>
        </div>
      </div>
    </div></section>
    <section class="sec"><div class="wrap">
      <div class="grid g2" style="align-items:start">
        <div class="rv">${secH('', t('o_zone'))}
          <div class="zone-stack">${zs.map(z => `<div style="background:${z.color};color:${['white', 'yellow'].includes(z.key) ? 'var(--ink)' : '#fff'}"><span>${L(z.th, z.en)}</span><span class="small">${L(z.dth, z.den)}</span></div>`).join('')}</div>
          <p class="small muted" style="margin-top:10px">${L('ใช้ในหน้าค่าจ้างเริ่มต้น: ใส่เงินเดือนของคุณเพื่อดูว่าอยู่ Zone ไหน', 'Used on the starting-salary page: enter your salary to see your zone')}</p>
          <a class="btn btn-o btn-sm" href="#/starting">${t('cta_find')} &rarr;</a></div>
        <div class="rv">${secH('', t('o_gloss'))}
          <div class="tbl-wrap"><table class="t" style="min-width:0"><tbody>${K.glossary.map(g => `<tr style="cursor:default"><td><b>${esc(g[0])}</b></td><td style="text-align:left">${esc(L(g[1], g[2]))}</td></tr>`).join('')}</tbody></table></div></div>
      </div>
    </div></section>
    <section class="sec sec-alt"><div class="wrap">
      ${secH('Highlight', t('o_tools'))}
      <div class="legend">${[['tool_full', '#DF6F13'], ['tool_part', '#FFB65C'], ['tool_plan', '#2C3A7A'], ['tool_no', '#D9D4CC']].map(([k, c]) => `<span><i style="background:${c}"></i>${t(k)}</span>`).join('')}</div>
      <div class="grid g3">${K.hrTools.map(([n, a, b, c, d], i) => `<div class="card flat rv" style="transition-delay:${(i % 3) * 60}ms"><div class="f-head" style="font-size:15.5px;margin-bottom:10px">${esc(n)}</div><div class="tool">${donut([[a, '#DF6F13'], [b, '#FFB65C'], [c, '#2C3A7A'], [d, '#D9D4CC']], `${a + b}%<small>${L('ใช้แล้ว', 'in use')}</small>`, 110)}<ul>${[[a, 'tool_full', '#DF6F13'], [b, 'tool_part', '#FFB65C'], [c, 'tool_plan', '#2C3A7A'], [d, 'tool_no', '#D9D4CC']].map(([v, k, col]) => `<li><i style="background:${col}"></i>${t(k)} <b class="num" style="margin-left:auto">${v}%</b></li>`).join('')}</ul></div></div>`).join('')}</div>
      <p class="tiny muted" style="margin-top:10px">${t('src')} 13–17</p>
    </div></section>
    <section class="sec"><div class="wrap">
      ${secH('', t('o_biz'))}
      <div class="grid g4">${BIZ.map((b, i) => `<div class="card flat rv" style="padding:14px 16px;transition-delay:${(i % 4) * 40}ms"><div class="tiny muted">${String(i + 1).padStart(2, '0')}</div><div class="f-head" style="font-size:15px">${esc(b)}</div>${LANG === 'th' ? `<div class="small muted">${esc(K.bizTh[b])}</div>` : ''}</div>`).join('')}</div>
      <div class="gal" style="margin-top:26px" data-lbg>${[['a-size-1.jpg', L('ขนาดและ % องค์กร', 'Organization size')], ['a-size-2.jpg', L('% จำนวนพนักงาน', 'Headcount share')], ['a-province.jpg', t('o_prov')], ['a-overview.jpg', L('ภาพรวมผลสำรวจ', 'Survey overview')], ['a-glossary.jpg', t('o_gloss')], ['a-keyword.jpg', L('ทบทวน Keyword การบริหารค่าตอบแทน', 'Compensation keywords')], ['a-zone.jpg', t('o_zone')]].map(([f, c]) => `<figure class="rv"><img loading="lazy" src="${img(f)}" alt="${esc(c)}"><figcaption>${esc(c)}</figcaption></figure>`).join('')}</div>
    </div></section>`;
  };
  Overview.bind = app => {
    lbBind(app);
    const go = () => {
      const e = parseMoney($('#cEmp').value), s = parseFloat(String($('#cSales').value).replace(/[^\d.]/g, ''));
      if (!e || !isFinite(s) || s < 0) { $('#cErr').textContent = L('กรุณากรอกจำนวนพนักงานและยอดขายให้ถูกต้อง', 'Please enter valid headcount and sales'); return; }
      $('#cErr').textContent = '';
      const se = e <= 50 ? .5 : e <= 300 ? 1 : e <= 1000 ? 1.5 : 2, ss = s < 100 ? .5 : s <= 1000 ? 1 : s <= 10000 ? 1.5 : 2, tot = se + ss;
      const size = tot > 3 ? 'XL' : tot >= 2.4 ? 'L' : tot >= 1.7 ? 'M' : 'S';
      $('#cOut').innerHTML = `<div class="calc-out"><div class="sz">${size}</div><div><div class="f-head" style="font-size:16px">${t('your_size')}: ${size}</div><div class="small muted">${L('พนักงาน', 'Headcount')} ${se} + ${L('ยอดขาย', 'Sales')} ${ss} = <b>${tot}</b></div><a class="small" href="#/merit">${L('ดูการขึ้นเงินเดือนขององค์กรขนาดนี้', 'See merit increases for this size')} &rarr;</a></div></div>`;
    };
    $('#cGo').onclick = go; ['cEmp', 'cSales'].forEach(id => $('#' + id).onkeydown = e => { if (e.key === 'Enter') go(); });
  };

  /* ---------------- BENCHMARK (Part E) ---------------- */
  const BS = { b: '', m: 'sales_head' };
  function Bench() {}
  const METRICS = [
    ['sales_head', 'b_sales', 2, L('ล้านบาท/คน/ปี', 'THB m / head / yr')], ['train_sales', 'b_trs', 2, '%'], ['train_head', 'b_trh', 0, L('บาท/คน/ปี', 'THB / head / yr')],
    ['turnover', 'Turnover', 1, '%'], ['shift_day', L('ค่ากะเช้า', 'Day shift'), 0, L('บาท/วัน', 'THB/day')], ['shift_2nd', L('ค่ากะบ่าย', '2nd shift'), 0, L('บาท/วัน', 'THB/day')], ['shift_night', L('ค่ากะดึก', 'Night shift'), 0, L('บาท/วัน', 'THB/day')]
  ];
  Bench.html = () => pageHero('E', 'HR Trends & HR Benchmark 2026/27', L('แนวโน้มการบริหารและพัฒนาทรัพยากรมนุษย์ และข้อมูลเปรียบเทียบด้าน HR สำหรับใช้เทียบมาตรฐานองค์กรของคุณ', 'HR management and development trends, plus HR benchmarks to compare your organization')) +
    `<section class="sec"><div class="wrap">
      ${secH('Benchmark', t('b_kpi'))}
      <div class="grid g4">
        <div class="kpi rv"><div class="v">1:<span data-count="75">0</span></div><div class="l">${t('b_ratio')}</div><div class="s">2025/26 = 1:92</div></div>
        <div class="kpi n rv"><div class="v"><span data-count="5.25" data-dec="2">0</span></div><div class="l">${t('b_sales')}</div><div class="s">${L('ล้านบาท/คน/ปี · +7.1%', 'THB m / head / yr · +7.1%')}</div></div>
        <div class="kpi d rv"><div class="v"><span data-count="0.12" data-dec="2">0</span><small>%</small></div><div class="l">${t('b_trs')}</div><div class="s">${L('ลดลง 12.0% จากปีก่อน', '−12.0% vs last year')}</div></div>
        <div class="kpi rv" style="background:linear-gradient(135deg,#FFB65C,#F28C28)"><div class="v"><span data-count="4707">0</span></div><div class="l">${t('b_trh')}</div><div class="s">${L('บาท/คน/ปี · +1.8%', 'THB / head / yr · +1.8%')}</div></div>
      </div>
      <div class="grid g3" style="margin-top:16px">
        <div class="stat rv"><div class="v num"><span data-count="9.3" data-dec="1">0</span>%</div><div class="l">${t('b_tin')} (+33.1%)</div></div>
        <div class="stat rv"><div class="v num"><span data-count="12.3" data-dec="1">0</span>%</div><div class="l">${t('b_tout')} (−8.0%)</div></div>
        <div class="stat rv"><div class="v num"><span data-count="49">0</span></div><div class="l">${t('b_night')} ${L('บาท/วัน', 'THB/day')}</div></div>
      </div>
    </div></section>
    <section class="sec sec-alt"><div class="wrap">
      ${secH('Compare', t('b_cmp'), `<select class="sel" id="bbiz" style="max-width:340px">${BIZ.map(b => `<option ${BS.b === b ? 'selected' : ''}>${esc(b)}</option>`).join('')}</select>`)}
      <div id="bcmp"></div>
      <div class="tabs" style="margin-top:22px" id="btabs"></div>
      <div class="card" id="bchart"></div>
    </div></section>
    <section class="sec"><div class="wrap">
      ${secH('Working hours', t('b_hours'))}
      <div class="grid g2" id="bhours"></div>
    </div></section>
    <section class="sec sec-alt"><div class="wrap">
      <div class="grid g3" style="align-items:start">
        ${[['b_hrm', K.hrm], ['b_hrd', K.hrd], ['b_rare', K.rare]].map(([k, arr]) => `<div class="card rv"><h3 style="margin-bottom:14px">${t(k)}</h3><ol class="rank">${arr.map(r => `<li><span class="small">${esc(L(r[0], r[1]))}</span><span class="pc">${r[2]}%</span><span class="pb"><i style="width:${r[2] / arr[0][2] * 100}%"></i></span></li>`).join('')}</ol></div>`).join('')}
      </div>
    </div></section>
    <section class="sec"><div class="wrap">
      ${secH('HR Trends', t('b_trends'))}
      <div class="grid g3" style="align-items:start">${K.trends.map((g, gi) => `<div class="rv"><div class="card flat" style="background:linear-gradient(160deg,#2A1708,#1A0E05);color:#FBE7CF;border:0;margin-bottom:12px"><div class="num" style="font-size:40px;font-weight:700;color:#FFB65C;line-height:1">0${gi + 1}</div><h3 style="color:#fff;margin-top:6px">${esc(L(g.th, g.en))}</h3></div>${g.items.map((it, ii) => `<details class="acc" ${ii === 0 ? 'open' : ''}><summary>${esc(L(it.th, it.en))}</summary><div class="ab">${esc(L(it.bth, it.ben))}</div></details>`).join('')}</div>`).join('')}</div>
      <div class="gal" style="margin-top:26px" data-lbg>${[['e-hr-ratio-1.jpg', t('b_ratio')], ['e-hr-ratio-2.jpg', L('อัตราส่วน HR : พนักงาน แยกตามธุรกิจ', 'HR ratio by sector')], ['e-sales-head.jpg', t('b_sales')], ['e-train-sales.jpg', t('b_trs')], ['e-hours-office.jpg', t('b_hours') + ' · ' + t('b_office')], ['e-hours-factory.jpg', t('b_hours') + ' · ' + t('b_factory')]].map(([f, c]) => `<figure class="rv"><img loading="lazy" src="${img(f)}" alt="${esc(c)}"><figcaption>${esc(c)}</figcaption></figure>`).join('')}</div>
      <p class="tiny muted" style="margin-top:10px">${t('src')} 72–90</p>
    </div></section>`;
  Bench.bind = app => {
    if (!BS.b) BS.b = BIZ[0];
    lbBind(app);
    $('#bbiz').onchange = e => { BS.b = e.target.value; drawB(); };
    drawB(); drawHours();
  };
  function drawB() {
    const E = D.E, b = BS.b;
    const rows = [
      [t('b_sales'), E.sales_head.rows[b][2], E.sales_head.sum[2], 2, L('ล้านบาท', 'THB m')],
      [t('b_trs'), E.train_sales.rows[b][2], E.train_sales.sum[2], 2, '%'],
      [t('b_trh'), E.train_head.rows[b][2], E.train_head.sum[2], 0, t('baht')],
      [t('b_tin'), E.turnover.rows[b][0], E.turnover.sum[0], 1, '%'],
      [t('b_tout'), E.turnover.rows[b][1], E.turnover.sum[1], 1, '%'],
      [L('ค่ากะเช้าเฉลี่ย', 'Avg day-shift pay'), E.shift_day.rows[b][2], E.shift_day.sum[2], 0, L('บาท/วัน', 'THB/day')],
      [L('ค่ากะบ่ายเฉลี่ย', 'Avg 2nd-shift pay'), E.shift_2nd.rows[b][2], E.shift_2nd.sum[2], 0, L('บาท/วัน', 'THB/day')],
      [t('b_night'), E.shift_night.rows[b][2], E.shift_night.sum[2], 0, L('บาท/วัน', 'THB/day')],
      [t('m_tab_merit'), D.F.merit.all.rows[b][4], D.F.merit.all.sum[4], 1, '%'],
      [t('m_tab_bonus'), D.F.bonus.all.rows[b][4], D.F.bonus.all.sum[4], 1, t('months')]
    ];
    $('#bcmp').innerHTML = `<div class="tbl-wrap"><table class="t"><thead><tr><th>${t('b_metric')}</th><th>${esc(b)}</th><th>${t('b_mkt')}</th><th></th></tr></thead><tbody>${rows.map(([n, v, m, d, u]) => { const diff = v != null && m ? (v - m) / m * 100 : null; return `<tr style="cursor:default"><td>${n}</td><td><b>${nf(v, d)}</b> <span class="tiny muted">${u}</span></td><td>${nf(m, d)}</td><td style="color:${diff == null ? 'var(--muted)' : diff >= 0 ? 'var(--green)' : 'var(--red)'}">${diff == null ? '' : (diff >= 0 ? '▲ +' : '▼ ') + diff.toFixed(0) + '%'}</td></tr>`; }).join('')}</tbody></table></div><p class="tiny muted" style="margin-top:6px">${L('ค่าเฉลี่ยของกลุ่มธุรกิจที่เลือก เทียบกับค่าเฉลี่ยตลาด', 'Sector average compared with the market average')}</p>`;
    $('#btabs').innerHTML = METRICS.map(([k, lk]) => `<button data-m="${k}" class="${cls('on', BS.m === k)}">${T[lk] ? t(lk) : lk}</button>`).join('');
    $$('#btabs [data-m]').forEach(x => x.onclick = () => { BS.m = x.dataset.m; drawB(); });
    const M = METRICS.find(x => x[0] === BS.m), tb = E[BS.m], dec = M[2];
    let body;
    if (BS.m === 'turnover') {
      const mx = Math.max(...BIZ.map(x => Math.max(tb.rows[x][0] || 0, tb.rows[x][1] || 0)));
      body = `<div class="legend"><span><i style="background:var(--o1)"></i>In</span><span><i style="background:var(--navy)"></i>Out</span></div><div class="bars">${BIZ.map(x => `<div class="bar ${cls('hi', x === BS.b)}"><span class="n">${esc(x)}</span><span class="t" style="height:18px"><span class="f" style="height:8px;width:${tb.rows[x][0] / mx * 100}%"></span><span class="f" style="top:9px;height:8px;width:${tb.rows[x][1] / mx * 100}%;background:var(--navy)"></span></span><span class="v">${nf(tb.rows[x][0], 1)} / ${nf(tb.rows[x][1], 1)}</span></div>`).join('')}</div><p class="small" style="margin-top:10px">${L('ค่าเฉลี่ยตลาด', 'Market avg')}: In ${tb.sum[0]}% · Out ${tb.sum[1]}% · ${L('สูตร: (จำนวนพนักงานเข้า หรือ พ้นสภาพทั้งปี / จำนวนพนักงานทั้งหมด) × 100 ไม่รวมกรณีปลดออกหรือ Early Retire', 'Formula: (annual joiners or leavers / total employees) × 100, excluding dismissals and early retirement')}</p>`;
    } else {
      const mx = Math.max(...BIZ.map(x => tb.rows[x][1] || 0), tb.sum[1] || 0) || 1;
      body = `<div class="legend"><span><i style="background:var(--o1)"></i>Avg</span><span><i style="background:var(--o4)"></i>Min–Max</span></div><div class="bars">${BIZ.slice().sort((a, c) => (tb.rows[c][2] || 0) - (tb.rows[a][2] || 0)).map(x => { const r = tb.rows[x]; return `<div class="bar ${cls('hi', x === BS.b)}"><span class="n">${esc(x)}</span><span class="t"><span class="rg" style="left:${r[0] / mx * 100}%;width:${(r[1] - r[0]) / mx * 100}%"></span><span class="f" style="width:${r[2] / mx * 100}%"></span></span><span class="v">${nf(r[2], dec)}</span></div>`; }).join('')}<div class="bar avg"><span class="n">Average / Market</span><span class="t"><span class="f" style="width:${tb.sum[2] / mx * 100}%"></span></span><span class="v">${nf(tb.sum[2], dec)}</span></div></div>`;
    }
    $('#bchart').innerHTML = `<div class="sec-h" style="margin-bottom:6px"><h3>${T[M[1]] ? t(M[1]) : M[1]}</h3><span class="small muted">${M[3]}${tb.change ? ' · ' + t('b_chg') + ' ' + tb.change.join(' / ') : ''}</span></div>${body}`;
  }
  function drawHours() {
    const E = D.E;
    const blk = (title, keys, labels) => {
      const tot = keys.map(k => E[k].sum[0]);
      return `<div class="card rv"><h3>${title}</h3><div class="bars" style="margin:14px 0">${keys.map((k, i) => `<div class="bar"><span class="n">${labels[i]}</span><span class="t"><span class="f" style="width:${tot[i]}%"></span></span><span class="v">${tot[i]}%</span></div>`).join('')}</div>
        <details class="acc"><summary>${L('แยกตามกลุ่มธุรกิจ (% ขององค์กร)', 'By sector (% of organizations)')}</summary><div class="ab"><div class="tbl-wrap"><table class="t" style="min-width:420px"><thead><tr><th>${t('biz')}</th>${labels.map(l => `<th>${l}</th>`).join('')}</tr></thead><tbody>${BIZ.map(b => `<tr style="cursor:default"><td>${esc(b)}</td>${keys.map(k => `<td>${nf(E[k].rows[b][0])}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></details></div>`;
    };
    $('#bhours').innerHTML = blk(t('b_office'), ['office_40', 'office_41'], [L('40 ชม.', '40 h'), L('41–47 ชม.', '41–47 h')]) + blk(t('b_factory'), ['factory_40', 'factory_41', 'factory_48', 'factory_375'], [L('40 ชม.', '40 h'), L('41–47 ชม.', '41–47 h'), L('48 ชม.', '48 h'), L('อื่น ๆ (37.5 ชม.)', 'Other (37.5 h)')]);
    reveal();
  }

  /* ---------------- RESEARCH (Part G) ---------------- */
  let RS = 0;
  function Research() {}
  Research.html = () => pageHero('G', L('ผลวิจัย ปัญหาด้านทรัพยากรบุคคล และทางออก', 'HR research: problems and solutions'), t('r_lead')) +
    `<section class="sec" style="background:var(--dark)"><div class="wrap"><div class="tabs" id="rtabs"></div><div id="rbody"></div></div></section>`;
  Research.bind = () => drawR();
  function drawR() {
    const files = p => ['a', 'b'].map(s => `g-${p}${s}.jpg`);
    const EXIST = { 110: 1, 115: 1, 119: 1, 122: 1 };
    $('#rtabs').innerHTML = K.research.map((r, i) => `<button data-i="${i}" class="${cls('on', RS === i)}">${i + 1}. ${esc(L(r.th, r.en))}</button>`).join('');
    const r = K.research[RS];
    const imgs = []; r.pages.forEach(p => files(p).slice(0, EXIST[p] ? 1 : 2).forEach(f => imgs.push([f, p])));
    $('#rbody').innerHTML = `<h2 style="color:#FFD08A;margin:6px 0 18px">${RS + 1}. ${esc(L(r.th, r.en))}</h2><div class="gal dark" data-lbg>${imgs.map(([f, p], i) => `<figure class="rv in" style="animation:pop .4s ${i * 60}ms both"><img loading="lazy" src="${img(f)}" alt="${esc(L(r.th, r.en))}"><figcaption>${t('page_src')} ${p}</figcaption></figure>`).join('')}</div>`;
    $$('#rtabs [data-i]').forEach(b => b.onclick = () => { RS = +b.dataset.i; drawR(); });
    lbBind($('#rbody'));
  }

  /* ---------------- SUMMARY (Part H) ---------------- */
  function Summary() {}
  Summary.html = () => pageHero('H', 'Conclusion & Analysis Result 2026/27', L('สรุปผลสำรวจค่าจ้างและสวัสดิการ และ 10 ประเด็นร้อนที่ผู้บริหารและ HR ต้องรู้', 'Survey conclusions and 10 red issues every leader and HR team should know')) +
    `<section class="sec"><div class="wrap">
      ${secH('Red Issues', t('sum_issues'))}
      <div class="grid g2">${K.redIssues.map((x, i) => `<div class="issue rv" style="transition-delay:${(i % 2) * 60}ms"><div class="no">${i + 1}</div><div><b>${esc(x.t)}</b><p>${esc(L(x.th, x.en))}</p></div></div>`).join('')}</div>
    </div></section>
    <section class="sec sec-alt"><div class="wrap"><div class="grid g2" style="align-items:center">
      <div class="rv">${secH('', t('sum_concl'))}<p>${esc(L(K.conclusion.th, K.conclusion.en))}</p></div>
      <div class="card rv" style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">${donut([[80, '#DF6F13'], [5, '#2C3A7A'], [15, '#FFB65C']], `80:5:15<small>Paymix</small>`, 150)}<div><div class="f-head" style="font-size:16px;margin-bottom:8px">${t('paymix')}</div><div class="legend" style="flex-direction:column;gap:6px"><span><i style="background:#DF6F13"></i>${L('ค่าจ้าง', 'Salary')} 80%</span><span><i style="background:#2C3A7A"></i>${L('โบนัส', 'Bonus')} 5%</span><span><i style="background:#FFB65C"></i>${L('สวัสดิการ', 'Benefits')} 15%</span></div></div></div>
    </div></div></section>
    <section class="sec"><div class="wrap">
      ${secH('', t('exec_h'))}<div class="rv" style="max-width:900px">${K.execSummary[LANG === 'en' ? 'en' : 'th'].map(p => `<p>${esc(p)}</p>`).join('')}</div>
      ${secH('', t('sum_info'))}
      <div class="gal" data-lbg>${[['h-summary-1.jpg', L('สรุปผลสำรวจค่าจ้างและสวัสดิการ (1/2)', 'Summary (1/2)')], ['h-summary-2.jpg', L('10 ประเด็นร้อน (2/2)', '10 red issues (2/2)')]].map(([f, c]) => `<figure class="rv"><img loading="lazy" src="${img(f)}" alt="${esc(c)}"><figcaption>${esc(c)}</figcaption></figure>`).join('')}</div>
      <p class="tiny muted" style="margin-top:10px">${t('src')} I, 127–128</p>
    </div></section>
    <section class="sec" style="padding-top:0"><div class="wrap">${orderBand()}</div></section>`;
  Summary.bind = app => lbBind(app);

  /* ---------------- ORDER ---------------- */
  function Order() {}
  Order.html = () => pageHero('', t('ord_h'), 'Salary Thailand Review Guide 2026/27 — Full Text') +
    `<section class="sec"><div class="wrap"><div class="grid g2" style="align-items:start">
      <div class="rv"><img src="${img('book-promo.jpg')}" alt="Salary Thailand Review Guide 2026/27" style="border-radius:22px;box-shadow:var(--sh2);width:100%"></div>
      <div class="rv">${orderBox()}
        <div class="card flat" style="margin-top:18px"><h3>${t('ord_parts')}</h3><ol style="columns:2;column-gap:24px;padding-left:20px;margin:10px 0 0">${K.bookParts.map(p => `<li>${esc(p)}</li>`).join('')}</ol></div>
        <div class="card flat" style="margin-top:18px"><h3>${t('ord_cmp')}</h3>
          <div class="tbl-wrap" style="margin-top:10px"><table class="t" style="min-width:0"><thead><tr><th></th><th style="text-align:center">Mini</th><th style="text-align:center">${L('ฉบับเต็ม', 'Full')}</th></tr></thead><tbody>
          ${[[L('ค่าจ้างเริ่มต้น', 'Starting salary'), '24 ' + L('สาขา', 'majors'), '✓'], [L('ค่าจ้างตามประสบการณ์', 'Salary by experience'), '✓', '✓'], ['Salary by Job Grade', '—', '✓'], ['Salary by Sizing of Business', '—', '✓'], ['Salary by Vocation', '—', '✓'], [L('สวัสดิการ', 'Welfare allowance'), L('ตัวอย่าง 9 ตาราง', '9 samples'), '✓'], ['HR Trends & Benchmark', '✓', '✓'], ['Merit & Bonus', '✓', '✓']].map(r => `<tr style="cursor:default"><td>${r[0]}</td><td style="text-align:center">${r[1]}</td><td style="text-align:center;color:var(--green);font-weight:700">${r[2]}</td></tr>`).join('')}
          </tbody></table></div></div>
      </div>
    </div></div></section>`;
  Order.bind = app => startCountdown(app);
  function orderBox() {
    const ended = Date.now() > Date.parse(CFG.bookDeadline);
    return `<div class="card" style="border:2px solid var(--o3)"><div class="badge" style="background:var(--o5);color:var(--o1);border-color:var(--o3)"><span class="dot"></span>${t('ord_until')}</div>
      <div class="f-head" style="font-size:20px">${t('ord_price')}</div>
      <div style="font-family:var(--font);font-weight:700;font-size:48px;color:var(--o1);line-height:1.1">${nf(CFG.bookPrice)} <small style="font-size:15px;color:var(--muted);font-weight:400">${t('baht')} (${t('ord_vat')})</small></div>
      <p class="small muted" style="margin:6px 0 0">${t('ord_pages')}</p>
      ${ended ? `<div class="note" style="margin-top:12px">${t('ord_ended')}</div>` : `<div class="small" style="margin-top:12px">${t('ord_left')}</div><div class="count" data-countdown></div>`}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px"><a class="btn btn-o" href="${CFG.preOrder}" target="_blank" rel="noopener" data-track="preorder">${t('ord_btn')} &rarr;</a><a class="btn btn-w" href="tel:${CFG.phones[1].num.replace(/-/g, '')}">&#9742; ${CFG.phones[1].num}</a></div>
      <p class="tiny muted" style="margin-top:10px">${t('ord_ask')} ${CFG.phones.slice(1).map(p => `${p.num} (${L(p.th, p.en)})`).join(' · ')}</p></div>`;
  }
  function startCountdown(root) {
    const els = $$('[data-countdown]', root); if (!els.length) return;
    const end = Date.parse(CFG.bookDeadline);
    const tick = () => { let s = Math.max(0, (end - Date.now()) / 1000) | 0; const d = s / 86400 | 0; s -= d * 86400; const h = s / 3600 | 0; s -= h * 3600; const m = s / 60 | 0; s -= m * 60;
      els.forEach(e => e.innerHTML = [[d, 'd'], [h, 'h'], [m, 'mi'], [s, 's']].map(([v, k]) => `<div><b>${String(v).padStart(2, '0')}</b><span>${t(k)}</span></div>`).join('')); };
    tick(); clearInterval(startCountdown._i); startCountdown._i = setInterval(() => { if (!document.body.contains(els[0])) { clearInterval(startCountdown._i); return; } tick(); }, 1000);
  }

  /* ---------------- ABOUT ---------------- */
  function About() {}
  const socLink = (k, q) => CFG.social[k] || q;
  About.html = () => {
    const sg = K.skillGroup;
    return pageHero('', L('เกี่ยวกับ & ติดต่อ', 'About & contact'), 'Salary Thailand Institute × HR Monday × Skill Group') +
    `<section class="sec"><div class="wrap"><div class="grid g2" style="align-items:start">
      <div class="rv">${secH('Salary Thailand Review Guide 2026/27', t('a_proj'))}<p>${esc(L(K.foreword.th, K.foreword.en))}</p><p class="muted">${esc(L(K.thanks.th, K.thanks.en))}</p></div>
      <div class="grid g2 rv">${[[217, 'st_org'], [20, 'st_biz'], [18, 'st_grade'], [27, 'st_prof']].map(([v, k]) => `<div class="stat"><div class="v num" data-count="${v}">0</div><div class="l">${t(k)}</div></div>`).join('')}<div class="stat" style="grid-column:1/-1"><div class="l">${L('ช่วงเวลาสำรวจ', 'Survey period')}</div><div class="f-head" style="font-size:20px;color:var(--o1)">${L('พฤษภาคม – ตุลาคม 2569', 'May – October 2026')}</div></div></div>
    </div></div></section>
    <section class="sec sec-alt"><div class="wrap"><div class="dir rv">
      <div class="ph"><img src="${CFG.directorPhoto}" alt="ดร.รุ่งโรจน์ อรรถานิทธิ์" onerror="this.onerror=null;this.src='assets/img/director.jpg'"></div>
      <div><div class="crumb" style="color:var(--o1)">${t('a_dir')}</div><h2>${L('ดร.รุ่งโรจน์ อรรถานิทธิ์', 'Dr. Rungroj Attanit')}</h2><p class="f-head" style="color:var(--ink2);font-weight:400;margin:6px 0 12px">${t('a_dir_role')}</p><p>${t('a_dir_exp')}</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-o" href="tel:${CFG.directorPhone.replace(/-/g, '')}">&#9742; ${CFG.directorPhone}</a><a class="btn btn-line" href="${CFG.lineOpenChat}" target="_blank" rel="noopener">LINE Open Chat</a><a class="btn btn-w" href="${socLink('fbDirector', 'https://www.facebook.com/search/top?q=Rungroj%20Attanit')}" target="_blank" rel="noopener">Facebook</a></div></div>
    </div></div></section>
    <section class="sec"><div class="wrap">
      ${secH('Skill Group · Thai Skill Plus Co., Ltd.', t('a_sg'))}
      <p class="rv" style="max-width:900px">${esc(L(sg.vision.th, sg.vision.en))}</p>
      <div class="grid g3" style="margin:20px 0">${[[2008, 'a_exp1'], [120, 'a_exp2'], [200, 'a_exp3']].map(([v, k], i) => `<div class="kpi ${['', 'n', 'd'][i]} rv"><div class="v"><span data-count="${v}" ${i === 0 ? 'data-nofmt="1"' : ''}>0</span>${i === 2 ? '+' : ''}</div><div class="l">${t(k)}</div></div>`).join('')}</div>
      <div class="grid g2" style="align-items:start">
        <div class="grid g2">${sg.services.map(s => `<div class="card flat rv"><h4 style="margin-bottom:6px">${esc(L(s.th, s.en))}</h4><p class="small muted" style="margin:0">${esc(L(s.dth, s.den))}</p></div>`).join('')}</div>
        <div class="timeline">${sg.milestones.map(m => `<div class="tl rv"><b>${LANG === 'en' ? m[1] : m[0]}</b> · ${esc(L(m[2], m[3]))}</div>`).join('')}</div>
      </div>
      <p style="margin-top:16px"><a class="btn btn-w btn-sm" href="${CFG.mainSite}" target="_blank" rel="noopener">thaiskillplusconsultant.com &rarr;</a></p>
    </div></section>
    <section class="sec sec-alt"><div class="wrap"><div class="act">
      ${[['a_act1', 'a_act1p', CFG.lineOpenChat, 'line'], ['a_act2', 'a_act2p', CFG.joinSurvey, 'join'], ['a_act3', 'a_act3p', CFG.preOrder, 'preorder']].map(([h, p, u, k]) => `<div class="card rv"><h3>${t(h)}</h3><p style="margin:0">${t(p)}</p><div class="qr" data-qr="assets/img/qr-${k}.png" hidden></div><div class="btns"><a class="btn btn-o btn-sm" href="${u}" target="_blank" rel="noopener" data-track="${k}">${t('open_link')} &rarr;</a><button class="btn btn-g btn-sm" data-showqr>${t('show_qr')}</button></div></div>`).join('')}
    </div></div></section>
    <section class="sec"><div class="wrap"><div class="grid g2" style="align-items:start">
      <div class="rv">${secH('', t('a_contact'))}
        <ul class="contact-l">
          <li><span class="ic">&#8962;</span><div>${esc(L(CFG.address.th, CFG.address.en))}</div></li>
          ${CFG.phones.map(p => `<li><span class="ic">&#9742;</span><div><a href="tel:${p.num.replace(/-/g, '')}">${p.num}</a><div class="small muted">${L(p.th, p.en)}</div></div></li>`).join('')}
          <li><span class="ic">&#9993;</span><div><a href="mailto:${CFG.email}">${CFG.email}</a> <button class="btn btn-w btn-sm" data-copy="${CFG.email}" style="margin-left:6px">${t('copy')}</button></div></li>
          <li><span class="ic">&#127760;</span><div><a href="${CFG.salarySite}" target="_blank" rel="noopener">www.salarythailand.com</a><br><a href="${CFG.mainSite}" target="_blank" rel="noopener">www.thaiskillplusconsultant.com</a></div></li>
        </ul>
        <h3 style="margin:26px 0 12px">${t('a_follow')}</h3>
        <div class="soc">
          <a href="${socLink('fbHrMonday', 'https://www.facebook.com/search/top?q=HR%20Monday')}" target="_blank" rel="noopener">Facebook · HR Monday</a>
          <a href="${socLink('fbSalaryThailand', 'https://www.facebook.com/search/top?q=Salary%20Thailand%20Review')}" target="_blank" rel="noopener">Facebook · Salary Thailand Review</a>
          <a href="${socLink('youtube', 'https://www.youtube.com/results?search_query=365+HR+Monday')}" target="_blank" rel="noopener">YouTube · 365 HR Monday</a>
          <a href="${socLink('blockdit', 'https://www.blockdit.com/search?q=HR%20Monday')}" target="_blank" rel="noopener">Blockdit · HR Monday</a>
        </div>
        <button class="btn btn-n" style="margin-top:22px" data-open-contact>&#9742; ${t('fab_contact')}</button>
      </div>
      <div class="rv"><h3 style="margin-bottom:12px">${t('a_map')}</h3><iframe class="map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map" src="https://www.google.com/maps?q=${encodeURIComponent(CFG.mapQuery)}&output=embed"></iframe></div>
    </div></div></section>`;
  };
  About.bind = app => {
    $$('[data-showqr]', app).forEach(b => b.onclick = () => {
      const box = b.closest('.card').querySelector('[data-qr]');
      openQR(box.dataset.qr, b.closest('.card').querySelector('h3').textContent);
    });
  };
  function openQR(src, title) { lbOpen([{ src, cap: title }], 0); }

  /* ---------------- common UI ---------------- */
  function reveal() {
    const els = $$('.rv:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => io.observe(e));
  }
  function counters(root) {
    $$('[data-count]', root).forEach(el => {
      const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), raw = el.dataset.nofmt;
      const run = () => { const t0 = performance.now(), dur = 1100; const step = now => { const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3), v = end * e; el.textContent = raw ? Math.round(v) : nf(v, dec); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); };
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = raw ? end : nf(end, dec); return; }
      if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); run(); } }); io.observe(el); } else run();
    });
  }
  let LB = { list: [], i: 0 };
  function lbBind(root) {
    $$('[data-lbg]', root).forEach(g => { const figs = $$('figure', g); figs.forEach((f, i) => f.onclick = () => lbOpen(figs.map(x => ({ src: $('img', x).src, cap: ($('figcaption', x) || {}).textContent || '' })), i)); });
  }
  function lbOpen(list, i) { LB = { list, i }; lbShow(); $('#lb').classList.add('open'); document.body.style.overflow = 'hidden'; $('#lb .pv').style.display = $('#lb .nx').style.display = list.length > 1 ? '' : 'none'; }
  function lbShow() { const x = LB.list[LB.i]; const im = $('#lb img'); im.src = x.src; im.alt = x.cap; $('#lb .cap').textContent = x.cap + (LB.list.length > 1 ? ` (${LB.i + 1}/${LB.list.length})` : ''); }
  function lbClose() { $('#lb').classList.remove('open'); document.body.style.overflow = ''; }
  $('#lb .x').onclick = lbClose; $('#lb').onclick = e => { if (e.target.id === 'lb') lbClose(); };
  $('#lb .pv').onclick = e => { e.stopPropagation(); LB.i = (LB.i - 1 + LB.list.length) % LB.list.length; lbShow(); };
  $('#lb .nx').onclick = e => { e.stopPropagation(); LB.i = (LB.i + 1) % LB.list.length; lbShow(); };

  function openModal(id) { const m = $('#' + id); m.classList.add('open'); document.body.style.overflow = 'hidden'; setTimeout(() => { const f = m.querySelector('input,button.mx'); f && f.focus(); }, 50); }
  function closeModal(m) { m.classList.remove('open'); document.body.style.overflow = ''; }
  $$('.modal').forEach(m => { m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) closeModal(m); }); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { $$('.modal.open').forEach(closeModal); lbClose(); closeDrawer(); }
    if ($('#lb').classList.contains('open')) { if (e.key === 'ArrowRight') $('#lb .nx').click(); if (e.key === 'ArrowLeft') $('#lb .pv').click(); }
  });

  function promoHtml() {
    const ended = Date.now() > Date.parse(CFG.bookDeadline);
    return `<div class="badge" style="background:var(--o5);color:var(--o1);border-color:var(--o3)"><span class="dot"></span>${t('promo_k')}</div>
      <h2 id="promoTitle" style="font-size:24px">${t('promo_h')}</h2><p class="muted" style="margin:10px 0 14px">${t('promo_p')}</p>
      <div class="price">${nf(CFG.bookPrice)} <small>${t('baht')} · ${t('ord_vat')}</small></div>
      ${ended ? `<div class="note" style="margin-top:12px">${t('ord_ended')}</div>` : `<div class="small" style="margin-top:12px;color:var(--o1);font-family:var(--font)">${t('ord_until')}</div><div class="count" data-countdown></div>`}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px"><a class="btn btn-o" href="${CFG.preOrder}" target="_blank" rel="noopener" data-track="preorder_popup">${t('ord_btn')}</a><button class="btn btn-w" data-close>${t('promo_skip')}</button></div>`;
  }
  function contactHtml() {
    return `<h2 id="cbTitle" style="font-size:24px">${t('cb_h')}</h2><p class="muted">${t('cb_p')}</p>
      <form class="form" id="cbForm" novalidate>
        <label>${t('f_name')}<input class="inp" name="name" autocomplete="name"></label>
        <label>${t('f_org')}<input class="inp" name="org" autocomplete="organization"></label>
        <div class="grid g2" style="gap:10px"><label>${t('f_phone')}<input class="inp" name="phone" type="tel" autocomplete="tel"></label><label>${t('f_email')}<input class="inp" name="email" type="email" autocomplete="email"></label></div>
        <label>${t('f_topic')}<select class="sel" name="topic">${['f_t1', 'f_t2', 'f_t3', 'f_t4'].map(k => `<option>${t(k)}</option>`).join('')}</select></label>
        <label>${t('f_msg')}<textarea class="inp" name="msg" rows="3"></textarea></label>
        <div class="err" id="cbErr"></div>
        <button class="btn btn-o" type="submit">${t('f_send')}</button>
      </form><div id="cbDone"></div>`;
  }
  function bindContactForm() {
    const f = $('#cbForm'); if (!f) return;
    f.addEventListener('input', () => $('#cbErr').textContent = '');
    f.onsubmit = async e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(f));
      const err = $('#cbErr');
      if (!d.name.trim()) { err.textContent = t('f_err_name'); return; }
      if (!d.phone.trim() && !d.email.trim()) { err.textContent = t('f_err_ct'); return; }
      if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) { err.textContent = t('f_err_mail'); return; }
      const body = `ชื่อ: ${d.name}\nบริษัท: ${d.org}\nโทร: ${d.phone}\nอีเมล: ${d.email}\nสนใจ: ${d.topic}\nข้อความ: ${d.msg}\n\n(ส่งจากเว็บ Mini Report Salary Thailand 2026/27)`;
      track('contact_submit');
      if (CFG.formEndpoint) {
        try {
          const r = await fetch(CFG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...d, _subject: 'ขอให้ติดต่อกลับ — Mini Report Salary Thailand 2026/27' }) });
          if (!r.ok) throw 0;
          f.remove(); $('#cbDone').innerHTML = `<p class="ok">&#10003; ${t('f_ok')}</p>`; return;
        } catch (x) { /* fall through to mailto */ }
      }
      location.href = `mailto:${CFG.contactEmail}?subject=${encodeURIComponent('ขอให้ติดต่อกลับ — Mini Report Salary Thailand 2026/27')}&body=${encodeURIComponent(body)}`;
      f.remove(); $('#cbDone').innerHTML = `<p class="ok">&#10003; ${t('f_mail')}</p><p class="small muted">${CFG.contactEmail}</p>`;
    };
  }
  function openContact() { $('#contactBody').innerHTML = contactHtml(); bindContactForm(); openModal('mContact'); }
  function openPromo() { $('#promoBody').innerHTML = promoHtml(); startCountdown($('#mPromo')); openModal('mPromo'); }

  document.addEventListener('click', e => {
    const oc = e.target.closest('[data-open-contact]'); if (oc) { e.preventDefault(); openContact(); }
    const sh = e.target.closest('[data-share]'); if (sh) share();
    const cp = e.target.closest('[data-copy]'); if (cp) { copyText(cp.dataset.copy); toast(t('copied').replace(L('ลิงก์', 'Link'), '').trim() || 'Copied'); }
    const tr = e.target.closest('[data-track]'); if (tr) track('click_' + tr.dataset.track);
  });
  $('#fabContact').onclick = openContact;
  const tt = $('#toTop'); tt.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  addEventListener('scroll', () => tt.classList.toggle('show', scrollY > 600), { passive: true });

  function copyText(s) { if (navigator.clipboard) navigator.clipboard.writeText(s).catch(() => {}); else { const a = document.createElement('textarea'); a.value = s; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (e) {} a.remove(); } }
  function share() { const url = location.href; if (navigator.share) navigator.share({ title: document.title, url }).catch(() => {}); else { copyText(url); toast(t('copied')); } }
  function toast(msg) { const d = document.createElement('div'); d.textContent = msg; d.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:var(--navy);color:#fff;padding:10px 18px;border-radius:999px;z-index:200;font-family:var(--font);font-size:14px;animation:pop .3s both'; document.body.appendChild(d); setTimeout(() => d.remove(), 2000); }

  // drawer
  function closeDrawer() { $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden', 'true'); }
  $('#burger').onclick = () => { $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false'); };
  $('#drawer').onclick = e => { if (e.target.id === 'drawer' || e.target.closest('[data-close-drawer]') || e.target.closest('a')) closeDrawer(); };

  // language
  $$('.lang button').forEach(b => b.onclick = () => { LANG = b.dataset.lang; try { localStorage.setItem('str_lang', LANG); } catch (e) {} footer(); route(); });
  function i18nStatic() { $$('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n)); }

  function footer() {
    $('#footer').innerHTML = `<div><div class="brand" style="color:#fff;margin-bottom:12px"><img src="assets/img/logo-hrmonday.png" alt="HR Monday" style="background:#fff;border-radius:50%"><img src="assets/img/logo-sti.svg" alt="STI"><span class="bt" style="color:#fff">Salary Thailand<small>REVIEW GUIDE 2026/27</small></span></div><p>${t('ft_about')}</p><p class="small" style="color:#A89482">${t('ft_disc')}</p></div>
      <div><h4>${t('ft_menu')}</h4><ul>${ROUTES.map(r => `<li><a href="#/${r.p}">${r.part ? 'Part ' + r.part + ' · ' : ''}${t(r.k)}</a></li>`).join('')}</ul></div>
      <div><h4>${t('ft_contact')}</h4><ul>${CFG.phones.map(p => `<li><a href="tel:${p.num.replace(/-/g, '')}">${p.num}</a> <span class="small" style="color:#A89482">${L(p.th, p.en)}</span></li>`).join('')}<li><a href="mailto:${CFG.email}">${CFG.email}</a></li><li><a href="${CFG.lineOpenChat}" target="_blank" rel="noopener">LINE Open Chat</a></li><li><a href="${CFG.salarySite}" target="_blank" rel="noopener">salarythailand.com</a> · <a href="${CFG.mainSite}" target="_blank" rel="noopener">thaiskillplusconsultant.com</a></li></ul></div>`;
    $('#copy').innerHTML = `© 2026 Salary Thailand Institute · HR Monday · Thai Skill Plus Co., Ltd. ${L('สงวนลิขสิทธิ์', 'All rights reserved')}`;
  }

  /* ---------------- analytics ---------------- */
  function initAnalytics() {
    if (CFG.gaId) { const s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + CFG.gaId; document.head.appendChild(s); window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag('js', new Date()); gtag('config', CFG.gaId, { send_page_view: false }); }
    if (CFG.fbPixelId) { !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js'); fbq('init', CFG.fbPixelId); }
  }
  function track(ev) {
    try {
      if (window.gtag) { if (ev.startsWith('click_') || ev === 'contact_submit') gtag('event', ev); else gtag('event', 'page_view', { page_path: '/' + ev, page_title: document.title }); }
      if (window.fbq) { if (ev.startsWith('click_preorder') || ev === 'contact_submit') fbq('track', 'Lead'); else if (!ev.startsWith('click_')) fbq('track', 'PageView'); }
    } catch (e) {}
  }

  /* ---------------- boot ---------------- */
  initAnalytics(); footer();
  addEventListener('hashchange', route);
  route();
  try {
    if (!sessionStorage.getItem('str_promo') && curPath() !== 'order') { setTimeout(() => { openPromo(); sessionStorage.setItem('str_promo', '1'); }, 1200); }
  } catch (e) { setTimeout(openPromo, 1200); }
})();
