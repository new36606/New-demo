import React, { useMemo, useState } from "react";

const LOGO_ASSET = "/globelink-logo.png";
const WORLD_MAP_ASSET = "/world-map-with-labels.svg";

type Lang = "en" | "th";
type LocalText = { en: string; th: string };
type FeatureItem = LocalText & { icon: string; enText: string; thText: string };
type Copy = Record<string, string> & {
  nav: string[];
  operationCards: Array<[string, string]>;
};

const copy: Record<Lang, Copy> = {
  en: {
    nav: ["About", "Services", "Warehouse", "Network", "News", "Contact"],
    language: "Language",
    quote: "Get a Quote",
    heroBadge: "Thailand Logistics & Freight Solutions",
    heroTitle: "A sharper digital presence for a global freight and logistics brand.",
    heroText:
      "A modern bilingual website concept for Globelink Thailand with stronger hierarchy, cleaner calls-to-action, and a professional B2B logistics feel.",
    explore: "Explore Services",
    contactSales: "Contact Sales",
    operationsLabel: "Operations Snapshot",
    operationsTitle: "Built for speed, trust, and global coordination",
    aboutEyebrow: "About",
    aboutTitle: "From static company profile to a confident, modern logistics website",
    aboutDescription:
      "The redesign keeps the NVOCC positioning, freight strength, global coverage, and total logistics message while improving readability and conversion flow.",
    whyEyebrow: "Why choose us",
    whyTitle: "Trust signals built for B2B logistics",
    whyText: "A cleaner way to communicate network reach, operating capability, and customer confidence.",
    servicesEyebrow: "Services",
    servicesTitle: "Service architecture that feels clearer and more credible",
    servicesDescription:
      "Each offer is turned into a structured, persuasive card with room for future service-detail pages.",
    viewAll: "View all solutions",
    learnMore: "Learn more",
    warehouseEyebrow: "Warehouse & CFS",
    warehouseTitle: "Operational support that deserves its own spotlight",
    warehouseDescription:
      "Container haulage, stuffing and unstuffing, cargo photo records, clearance, repacking, and labeling are presented with stronger visual weight.",
    warehousePanelTitle: "Warehouse capability, presented with more confidence",
    warehousePanelText: "This dedicated operations block gives warehouse and CFS support more visual weight.",
    networkEyebrow: "Network",
    networkTitle: "A cleaner global network section",
    networkDescription:
      "This section displays a labeled SVG world map visual with precise country pins and a concise global network message.",
    networkMapInstruction: "Global office network map",
    networkMapFooter: "More than 100 offices in 30 countries",
    networkMapNote: "Hover a pin to view the country name. Thailand is highlighted as the local hub.",
    newsEyebrow: "News & Updates",
    newsTitle: "A modern newsroom area for newsletters, updates, and media",
    newsDescription: "News, gallery, and portal cards can scale into a CMS-driven section later.",
    eservices: "eServices",
    ctaBadge: "Careers & Enquiries",
    ctaTitle: "Make key actions impossible to miss",
    ctaText:
      "Careers, quote requests, and contact actions are brought forward with stronger hierarchy and better conversion placement.",
    applyCareer: "Apply for Career",
    requestQuote: "Request Quote",
    contactEyebrow: "Contact",
    contactTitle: "A better contact experience for real business inquiries",
    contactDescription:
      "A polished inquiry section for shipping lanes, consolidation options, warehouse support, and partnerships.",
    sendInquiry: "Send an inquiry",
    contactIntro:
      "A modern B2B logistics site should make it easy to ask about shipping lanes, consolidation options, warehouse support, and partnerships.",
    submitInquiry: "Submit Inquiry",
    namePlaceholder: "Your name",
    companyPlaceholder: "Company",
    emailPlaceholder: "Email address",
    phonePlaceholder: "Phone number",
    subjectPlaceholder: "Subject",
    messagePlaceholder: "Tell us about your shipment or service requirement",
    formNote: "This form is a design prototype and does not submit data yet.",
    footerText:
      "Modern logistics website concept for a more premium, responsive, and conversion-aware digital experience.",
    quickLinks: "Quick links",
    businessActions: "Business actions",
    latestNewsletter: "Latest newsletter",
    globalNetwork: "Global network",
    careers: "Careers",
    operationCards: [
      ["Door-to-door support", "Coordinated shipment flows with clearer user paths."],
      ["LCL / FCL expertise", "Dedicated service blocks that explain the offer better."],
      ["Warehouse capability", "Operational support presented in a cleaner checklist style."],
      ["Global network access", "A cleaner global footprint presentation for office network coverage."],
    ],
  },
  th: {
    nav: ["เกี่ยวกับเรา", "บริการ", "คลังสินค้า", "เครือข่าย", "ข่าวสาร", "ติดต่อเรา"],
    language: "ภาษา",
    quote: "ขอใบเสนอราคา",
    heroBadge: "บริการโลจิสติกส์และขนส่งระหว่างประเทศในไทย",
    heroTitle: "เว็บไซต์โลจิสติกส์ที่ดูทันสมัย น่าเชื่อถือ และใช้งานง่ายกว่าเดิม",
    heroText:
      "ต้นแบบเว็บไซต์สองภาษาเพื่อ Globelink Thailand ที่จัดลำดับเนื้อหาชัดเจน ปุ่มติดต่อเด่นขึ้น และให้ภาพลักษณ์แบบ B2B ที่มืออาชีพ",
    explore: "ดูบริการของเรา",
    contactSales: "ติดต่อฝ่ายขาย",
    operationsLabel: "ภาพรวมการดำเนินงาน",
    operationsTitle: "ออกแบบเพื่อความรวดเร็ว ความน่าเชื่อถือ และการประสานงานระดับโลก",
    aboutEyebrow: "เกี่ยวกับเรา",
    aboutTitle: "จากเว็บไซต์ข้อมูลบริษัทแบบเดิม สู่เว็บไซต์โลจิสติกส์ที่มั่นใจและทันสมัย",
    aboutDescription:
      "ยังคงจุดแข็งด้าน NVOCC การขนส่ง เครือข่ายทั่วโลก และบริการโลจิสติกส์ครบวงจร แต่ปรับให้อ่านง่ายและนำไปสู่การติดต่อได้ชัดเจนขึ้น",
    whyEyebrow: "เหตุผลที่เลือกเรา",
    whyTitle: "ความน่าเชื่อถือที่เหมาะกับงานโลจิสติกส์ B2B",
    whyText: "นำเสนอจุดแข็งของเครือข่าย การปฏิบัติงาน และการสื่อสารกับลูกค้าในรูปแบบมืออาชีพ",
    servicesEyebrow: "บริการ",
    servicesTitle: "โครงสร้างบริการที่ชัดเจนและน่าเชื่อถือมากขึ้น",
    servicesDescription: "แต่ละบริการถูกจัดเป็นการ์ดที่อ่านง่ายและพร้อมต่อยอดเป็นหน้ารายละเอียดในอนาคต",
    viewAll: "ดูบริการทั้งหมด",
    learnMore: "ดูเพิ่มเติม",
    warehouseEyebrow: "คลังสินค้าและ CFS",
    warehouseTitle: "งานปฏิบัติการที่ควรมีพื้นที่นำเสนออย่างชัดเจน",
    warehouseDescription:
      "งานรถหัวลาก การบรรจุและนำสินค้าออกจากตู้ การถ่ายภาพสินค้า งานเอกสาร การบรรจุใหม่ และติดฉลากถูกนำเสนอให้ชัดเจนขึ้น",
    warehousePanelTitle: "ศักยภาพคลังสินค้าที่นำเสนอได้มั่นใจมากขึ้น",
    warehousePanelText: "บล็อกงานปฏิบัติการนี้ทำให้บริการคลังสินค้าและ CFS ดูมีน้ำหนักมากขึ้น",
    networkEyebrow: "เครือข่าย",
    networkTitle: "ส่วนเครือข่ายทั่วโลกที่ดูสะอาดและชัดเจนขึ้น",
    networkDescription:
      "ส่วนนี้แสดงแผนที่โลกแบบ SVG ที่มีชื่อกำกับ พร้อมหมุดประเทศและข้อความสรุปเครือข่ายทั่วโลก",
    networkMapInstruction: "แผนที่เครือข่ายสำนักงานทั่วโลก",
    networkMapFooter: "สำนักงานมากกว่า 100 แห่งใน 30 ประเทศ",
    networkMapNote: "เลื่อนเมาส์บนหมุดเพื่อดูชื่อประเทศ โดยประเทศไทยถูกไฮไลต์เป็นศูนย์กลางท้องถิ่น",
    newsEyebrow: "ข่าวสารและอัปเดต",
    newsTitle: "พื้นที่ข่าวสารที่ทันสมัยสำหรับจดหมายข่าว อัปเดต และสื่อประชาสัมพันธ์",
    newsDescription: "ข่าวสาร แกลเลอรี และพอร์ทัลถูกจัดเป็นการ์ดที่พร้อมต่อยอดเป็นระบบจัดการเนื้อหาในอนาคต",
    eservices: "eServices",
    ctaBadge: "สมัครงานและสอบถามข้อมูล",
    ctaTitle: "ทำให้ปุ่มสำคัญมองเห็นได้ชัดเจน",
    ctaText: "การสมัครงาน การขอใบเสนอราคา และการติดต่อถูกดึงขึ้นมาให้เห็นชัดและใช้งานง่ายขึ้น",
    applyCareer: "สมัครงาน",
    requestQuote: "ขอใบเสนอราคา",
    contactEyebrow: "ติดต่อเรา",
    contactTitle: "ประสบการณ์การติดต่อที่เหมาะกับลูกค้าธุรกิจมากขึ้น",
    contactDescription: "ส่วนติดต่อสำหรับสอบถามเส้นทางขนส่ง การรวมสินค้า งานคลังสินค้า และความร่วมมือทางธุรกิจ",
    sendInquiry: "ส่งคำถามถึงเรา",
    contactIntro:
      "เว็บไซต์โลจิสติกส์สำหรับธุรกิจควรทำให้ลูกค้าสอบถามเส้นทางขนส่ง การรวมสินค้า งานคลังสินค้า และความร่วมมือได้ง่าย",
    submitInquiry: "ส่งข้อมูล",
    namePlaceholder: "ชื่อของคุณ",
    companyPlaceholder: "บริษัท",
    emailPlaceholder: "อีเมล",
    phonePlaceholder: "เบอร์โทรศัพท์",
    subjectPlaceholder: "หัวข้อ",
    messagePlaceholder: "แจ้งรายละเอียดสินค้า เส้นทาง หรือบริการที่ต้องการ",
    formNote: "แบบฟอร์มนี้เป็นต้นแบบการออกแบบ ยังไม่ส่งข้อมูลจริง",
    footerText: "ต้นแบบเว็บไซต์โลจิสติกส์ที่ดูพรีเมียม รองรับมือถือ และนำไปสู่การติดต่อได้ดีขึ้น",
    quickLinks: "ลิงก์ด่วน",
    businessActions: "การดำเนินการหลัก",
    latestNewsletter: "จดหมายข่าวล่าสุด",
    globalNetwork: "เครือข่ายทั่วโลก",
    careers: "สมัครงาน",
    operationCards: [
      ["บริการรับส่งถึงปลายทาง", "ประสานงานการขนส่งให้ชัดเจนและใช้งานง่ายขึ้น"],
      ["ความเชี่ยวชาญ LCL / FCL", "จัดหมวดบริการให้เข้าใจง่ายและเห็นคุณค่าชัดเจน"],
      ["ศักยภาพคลังสินค้า", "นำเสนอการสนับสนุนด้านปฏิบัติการในรูปแบบเช็กลิสต์"],
      ["เครือข่ายทั่วโลก", "นำเสนอเครือข่ายสำนักงานด้วยภาพรวมที่สะอาดตา"],
    ],
  },
};

const stats: Array<LocalText & { value: string }> = [
  { value: "100+", en: "Global offices", th: "สำนักงานทั่วโลก" },
  { value: "30", en: "Countries covered", th: "ประเทศที่ให้บริการ" },
  { value: "PAT Gateway", en: "Bangkok HQ", th: "สำนักงานใหญ่กรุงเทพฯ" },
  { value: "LCL / FCL", en: "Core focus", th: "บริการหลัก" },
];

const trustStripItems: LocalText[] = [
  { en: "NVOCC Network", th: "เครือข่าย NVOCC" },
  { en: "LCL / FCL Coverage", th: "รองรับ LCL / FCL" },
  { en: "Bangkok CFS Support", th: "บริการ CFS กรุงเทพฯ" },
  { en: "100+ Offices", th: "สำนักงาน 100+ แห่ง" },
];

const aboutCards: FeatureItem[] = [
  { icon: "building", en: "Company overview", th: "ภาพรวมบริษัท", enText: "Clear positioning with supporting metrics above the fold.", thText: "วางตำแหน่งธุรกิจชัดเจนพร้อมตัวเลขสนับสนุน" },
  { icon: "globe", en: "Global reach", th: "เครือข่ายทั่วโลก", enText: "Cleaner international footprint and network presentation.", thText: "นำเสนอเครือข่ายระหว่างประเทศให้สะอาดตาขึ้น" },
  { icon: "package", en: "Core capabilities", th: "ความสามารถหลัก", enText: "LCL, FCL, transshipment, and NVOCC services in readable cards.", thText: "แยกบริการหลักให้อ่านง่ายในรูปแบบการ์ด" },
  { icon: "mail", en: "Stronger conversion", th: "เพิ่มโอกาสในการติดต่อ", enText: "Quote, contact, newsletter, and career actions are easier to find.", thText: "ปุ่มขอราคา ติดต่อ จดหมายข่าว และสมัครงานชัดเจนขึ้น" },
];

const serviceItems: FeatureItem[] = [
  { icon: "ship", en: "NVOCC Solutions", th: "บริการ NVOCC", enText: "Neutral support for consolidation, routing, and shipment coordination.", thText: "รองรับการรวมตู้ การวางเส้นทาง และประสานงานขนส่ง" },
  { icon: "package", en: "LCL Import & Export", th: "นำเข้าและส่งออกแบบ LCL", enText: "Flexible less-than-container-load handling with dependable schedules.", thText: "บริการสินค้าไม่เต็มตู้พร้อมตารางเดินเรือที่เชื่อถือได้" },
  { icon: "anchor", en: "FCL Freight Forwarding", th: "ขนส่งสินค้าเต็มตู้แบบ FCL", enText: "Full-container solutions for port-to-port and door-to-door shipments.", thText: "โซลูชันขนส่งสินค้าเต็มตู้ทั้งแบบท่าเรือและถึงปลายทาง" },
  { icon: "building", en: "Cargo Transshipment", th: "บริการถ่ายลำสินค้า", enText: "Regional cargo movement planned for speed and compliance.", thText: "วางแผนเคลื่อนย้ายสินค้าเพื่อความรวดเร็วและถูกต้อง" },
];

const serviceDetailItems: FeatureItem[] = [
  { icon: "package", en: "LCL Export / Import", th: "ส่งออก / นำเข้า LCL", enText: "Structured consolidation support for smaller cargo volumes.", thText: "รองรับการรวมสินค้าสำหรับงานที่ไม่ต้องใช้ตู้เต็มใบ" },
  { icon: "anchor", en: "FCL Export / Import", th: "ส่งออก / นำเข้า FCL", enText: "Full-container coordination for major freight lanes.", thText: "ประสานงานขนส่งสินค้าเต็มตู้ในเส้นทางหลัก" },
  { icon: "mail", en: "Customs Documentation", th: "เอกสารศุลกากร", enText: "Documentation support to reduce delays and handoff friction.", thText: "สนับสนุนเอกสารเพื่อลดความล่าช้า" },
  { icon: "warehouse", en: "CFS / Warehouse Handling", th: "งาน CFS / คลังสินค้า", enText: "Stuffing, unstuffing, repacking, and labeling support.", thText: "รองรับการบรรจุ นำออกจากตู้ บรรจุใหม่ และติดฉลาก" },
  { icon: "ship", en: "Inland Trucking", th: "ขนส่งทางบก", enText: "Container haulage and inland distribution across Thailand.", thText: "บริการรถหัวลากและกระจายสินค้าทางบก" },
  { icon: "building", en: "Cargo Photo Records", th: "บันทึกภาพสินค้า", enText: "Photo records for cargo condition and operational proof.", thText: "บันทึกภาพสภาพสินค้าและหลักฐานปฏิบัติงาน" },
];

const whyChooseItems: FeatureItem[] = [
  { icon: "globe", en: "Global network", th: "เครือข่ายทั่วโลก", enText: "Reliable international coordination across offices and partners.", thText: "ประสานงานระหว่างประเทศได้มั่นใจ" },
  { icon: "ship", en: "Neutral NVOCC expertise", th: "ความเชี่ยวชาญ NVOCC", enText: "A service model built around consolidation and flexible routing.", thText: "ออกแบบเพื่อการรวมสินค้าและวางเส้นทางที่ยืดหยุ่น" },
  { icon: "anchor", en: "Reliable schedules", th: "ตารางเดินเรือที่เชื่อถือได้", enText: "Clear service structure for planning shipments.", thText: "โครงสร้างบริการช่วยวางแผนขนส่งได้ชัดเจน" },
  { icon: "building", en: "Local operations", th: "ทีมปฏิบัติการท้องถิ่น", enText: "Bangkok support for documentation, warehouse, and customers.", thText: "ทีมกรุงเทพฯ ดูแลงานเอกสาร คลังสินค้า และลูกค้า" },
];

const warehouseFeatureItems: LocalText[] = [
  { en: "Container haulage / trucking", th: "ขนส่งตู้คอนเทนเนอร์ / รถบรรทุก" },
  { en: "Stuffing and unstuffing of containers", th: "บรรจุและนำสินค้าออกจากตู้คอนเทนเนอร์" },
  { en: "Cargo and container photo documentation", th: "ถ่ายภาพสินค้าและตู้คอนเทนเนอร์" },
  { en: "Documentation clearance", th: "ดำเนินการด้านเอกสารและการเคลียร์สินค้า" },
  { en: "Re-palletizing, re-packing, and labeling", th: "จัดพาเลทใหม่ บรรจุใหม่ และติดฉลาก" },
];

const newsItems: FeatureItem[] = [
  { icon: "news", en: "Latest eNewsletter", th: "จดหมายข่าวล่าสุด", enText: "A clean place for company updates and logistics insights.", thText: "พื้นที่สำหรับข่าวบริษัทและข้อมูลโลจิสติกส์" },
  { icon: "building", en: "Photo Gallery", th: "แกลเลอรีรูปภาพ", enText: "Showcase warehouse operations and team activities.", thText: "นำเสนอภาพงานคลังสินค้าและกิจกรรมทีม" },
  { icon: "globe", en: "eServices Portal", th: "พอร์ทัล eServices", enText: "Highlight online access through a clear call-to-action.", thText: "เน้นช่องทางออนไลน์ด้วยปุ่มเรียกใช้งานที่ชัดเจน" },
];

const contactCards: FeatureItem[] = [
  { icon: "ship", en: "Sales inquiry", th: "สอบถามฝ่ายขาย", enText: "For rates, sailing options, and service proposals.", thText: "สำหรับราคา ตัวเลือกเที่ยวเรือ และข้อเสนอบริการ" },
  { icon: "mail", en: "Documentation support", th: "สนับสนุนเอกสาร", enText: "For shipping documents and clearance details.", thText: "สำหรับเอกสารขนส่งและการเคลียร์สินค้า" },
  { icon: "warehouse", en: "Warehouse / CFS", th: "คลังสินค้า / CFS", enText: "For stuffing, unstuffing, repacking, and labeling.", thText: "สำหรับบรรจุ นำออกจากตู้ บรรจุใหม่ และติดฉลาก" },
  { icon: "phone", en: "General contact", th: "ติดต่อทั่วไป", enText: "For office contact and follow-up requests.", thText: "สำหรับติดต่อสำนักงานและติดตามงานทั่วไป" },
];

const officeCards: Array<LocalText & { icon: string; text: string }> = [
  { icon: "mapPin", en: "Bangkok Office", th: "สำนักงานกรุงเทพฯ", text: "1011 Supalai Grand Tower, Unit 1403, 14th Floor, Rama III Road, Chongnonsri, Yannawa, Bangkok 10120, Thailand" },
  { icon: "phone", en: "Telephone", th: "โทรศัพท์", text: "+66 2 229 9888" },
  { icon: "mail", en: "General enquiries", th: "อีเมลสำหรับสอบถาม", text: "hello@globelink-thailand.com" },
];

const mapPins = [
  { name: "Thailand", left: "71.6%", top: "56.7%", active: true },
  { name: "Singapore", left: "70.9%", top: "63.2%", active: false },
  { name: "Malaysia", left: "70.0%", top: "61.0%", active: false },
  { name: "Indonesia", left: "73.2%", top: "68.7%", active: false },
  { name: "China", left: "73.2%", top: "43.4%", active: false },
  { name: "Japan", left: "82.7%", top: "41.2%", active: false },
  { name: "India", left: "64.8%", top: "53.3%", active: false },
  { name: "United Arab Emirates", left: "58.4%", top: "53.0%", active: false },
  { name: "United Kingdom", left: "47.3%", top: "36.8%", active: false },
  { name: "United States", left: "20.0%", top: "42.5%", active: false },
  { name: "Australia", left: "80.7%", top: "78.5%", active: false },
];

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    menu: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>,
    arrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    ship: <><path d="M2 20a2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 4 0 2.4 2.4 0 0 0 4 0 2.4 2.4 0 0 1 4 0 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1" /><path d="M4 18 2 10h20l-2 8" /><path d="M12 10V4" /></>,
    package: <><path d="m21 8-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></>,
    anchor: <><circle cx="12" cy="5" r="3" /><path d="M12 8v13" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /></>,
    warehouse: <><path d="M3 21V8l9-5 9 5v13" /><path d="M7 21V11h10v10" /><path d="M9 15h6" /></>,
    building: <><path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" /><path d="M3 21h18" /><path d="M8 7h1" /><path d="M12 7h1" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />,
    mapPin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    news: <><path d="M4 19.5A2.5 2.5 0 0 1 1.5 17V5H19v14.5" /><path d="M5 9h8" /><path d="M5 13h8" /></>,
    external: <><path d="M15 3h6v6" /><path d="M10 14 21 3" /></>,
    check: <><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-5" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 0 20" /></>,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconMap[name] ?? iconMap.globe}
    </svg>
  );
}

function Button({ children, variant = "solid", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "outline" }) {
  const variantClass = variant === "outline" ? "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50" : "bg-[#24207b] text-white hover:bg-[#1c1867]";
  return <button className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${variantClass} ${className}`} {...props}>{children}</button>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`font-semibold text-slate-900 ${className}`}>{children}</h3>;
}

function CardDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`mt-2 text-sm text-slate-600 ${className}`}>{children}</p>;
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} />;
}

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <img src={LOGO_ASSET} alt="Globelink Thailand logo" className={compact ? "h-10 w-auto object-contain" : "h-14 w-auto object-contain"} draggable={false} />
      {!compact && <div className="leading-tight"><p className="text-sm font-bold tracking-tight text-[#24207b]">Globelink Thailand</p><p className="text-xs font-medium text-slate-500">In Unity, We Link The Globe</p></div>}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="max-w-3xl space-y-3"><Badge className="border border-slate-200 bg-white text-slate-500 uppercase tracking-[0.2em]">{eyebrow}</Badge><h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">{title}</h2><p className="text-sm leading-7 text-slate-600 md:text-base">{description}</p></div>;
}

function LanguageSelector({ language, setLanguage, label }: { language: Lang; setLanguage: (value: Lang) => void; label: string }) {
  return <select aria-label={label} value={language} onChange={(event) => setLanguage(event.target.value as Lang)} className="h-10 rounded-full border border-slate-200 bg-white px-3 text-sm"><option value="en">English</option><option value="th">ไทย</option></select>;
}

function FeatureCard({ item, language, compact = false }: { item: FeatureItem; language: Lang; compact?: boolean }) {
  return <Card><CardContent className={compact ? "p-4" : "p-5"}><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#24207b] text-[#d8f500]"><Icon name={item.icon} /></div><h3 className="font-semibold text-slate-900">{item[language]}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{language === "th" ? item.thText : item.enText}</p></CardContent></Card>;
}

function WorldMap({ t }: { t: Copy }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 md:p-6">
      <div className="mb-4 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"><p className="text-xs font-medium text-red-600">{t.networkMapInstruction}</p><p className="text-xs text-slate-400">SVG world map with labels</p></div>
      <div className="relative mx-auto aspect-[1009.6727/665.96301] w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner">
        <img src={WORLD_MAP_ASSET} alt="World map with labels" className="h-full w-full object-contain opacity-90" draggable={false} />
        <div className="pointer-events-none absolute inset-0">
          {mapPins.map((pin) => <div key={pin.name} className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pin.left, top: pin.top }}><div className={pin.active ? "h-4 w-4 rounded-full bg-[#d8f500] shadow-[0_0_0_5px_rgba(216,245,0,0.28)] ring-2 ring-[#24207b]" : "h-3 w-3 rounded-full bg-[#24207b] shadow-[0_0_0_4px_rgba(36,32,123,0.14)] ring-2 ring-white"} /><div className="absolute left-1/2 top-[-2.15rem] hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-lg group-hover:block">{pin.name}</div></div>)}
        </div>
      </div>
      <p className="mt-4 text-2xl font-medium tracking-tight text-slate-950">{t.networkMapFooter}</p><p className="mt-3 text-xs text-slate-500">{t.networkMapNote}</p>
    </div>
  );
}

function runSmokeTests() {
  console.assert(LOGO_ASSET === "/globelink-logo.png", "Logo should use the public PNG asset path.");
  console.assert(WORLD_MAP_ASSET === "/world-map-with-labels.svg", "World map should use the public SVG asset path.");
  console.assert(copy.en.nav.length === 6 && copy.th.nav.length === 6, "Both languages should define six nav items.");
  console.assert(mapPins.some((pin) => pin.name === "Thailand" && pin.active), "Thailand should be highlighted on the network map.");
  console.assert(serviceDetailItems.length === 6, "There should be six detailed service blocks.");
  console.assert(contactCards.every((item) => item.en && item.th), "Every contact action should support both languages.");
  console.assert(officeCards.length === 3, "Office contact section should include three cards.");
}

runSmokeTests();

export default function GlobelinkModernWebsitePrototype() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState<Lang>("en");
  const t = copy[language];
  const navItems = useMemo(() => {
    const hrefs = ["#about", "#services", "#warehouse", "#network", "#news", "#contact"];
    return t.nav.map((label, index) => [label, hrefs[index]] as const);
  }, [t.nav]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-gradient-to-br from-[#f7f9ff] via-white to-[#f4ffd6]" />
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8"><BrandLogo /><nav className="hidden items-center gap-8 md:flex">{navItems.map(([label, href]) => <a key={label} href={href} className="text-sm text-slate-600 transition hover:text-slate-900">{label}</a>)}</nav><div className="hidden items-center gap-3 md:flex"><LanguageSelector language={language} setLanguage={setLanguage} label={t.language} /><a href="#contact"><Button>{t.quote}</Button></a></div><button className="rounded-xl border border-slate-200 p-2 md:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle menu"><Icon name="menu" /></button></div>
        {mobileOpen && <div className="border-t border-slate-200 bg-white md:hidden"><div className="mx-auto flex max-w-7xl flex-col px-4 py-3">{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)} className="py-3 text-sm text-slate-700">{label}</a>)}<div className="mt-2 flex gap-2"><LanguageSelector language={language} setLanguage={setLanguage} label={t.language} /><a href="#contact" onClick={() => setMobileOpen(false)}><Button>{t.quote}</Button></a></div></div></div>}
      </header>
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
          <div className="space-y-8"><Badge className="bg-[#d8f500] text-[#24207b]">{t.heroBadge}</Badge><div className="space-y-5"><h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">{t.heroTitle}</h1><p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{t.heroText}</p></div><div className="flex flex-col gap-4 sm:flex-row"><a href="#services"><Button>{t.explore}<Icon name="arrowRight" className="h-4 w-4" /></Button></a><a href="#contact"><Button variant="outline">{t.contactSales}</Button></a></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((item) => <Card key={item.en}><CardContent className="p-5"><p className="text-2xl font-semibold text-slate-900">{item.value}</p><p className="mt-1 text-sm text-slate-500">{item[language]}</p></CardContent></Card>)}</div><div className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-4">{trustStripItems.map((item) => <div key={item.en} className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2"><span className="h-2 w-2 rounded-full bg-[#d8f500] ring-4 ring-[#eef9a8]" /><p className="text-xs font-semibold text-[#24207b]">{item[language]}</p></div>)}</div></div>
          <Card className="overflow-hidden shadow-2xl shadow-slate-200/70"><CardContent className="p-0"><div className="bg-[#24207b] p-8 text-white"><div className="flex items-center justify-between"><div><p className="text-sm text-slate-300">{t.operationsLabel}</p><h3 className="mt-2 text-2xl font-semibold">{t.operationsTitle}</h3></div><Icon name="ship" className="h-10 w-10 text-[#d8f500]" /></div></div><div className="grid gap-4 p-6 sm:grid-cols-2">{t.operationCards.map(([title, desc]) => <div key={title} className="rounded-2xl bg-slate-50 p-4"><p className="font-medium text-slate-900">{title}</p><p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p></div>)}</div></CardContent></Card>
        </section>
        <section id="about" className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"><SectionHeading eyebrow={t.aboutEyebrow} title={t.aboutTitle} description={t.aboutDescription} /><div className="grid gap-5 sm:grid-cols-2">{aboutCards.map((item) => <FeatureCard key={item.en} item={item} language={language} />)}</div></div></section>
        <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8"><div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-white to-[#f7fbe6] p-6 shadow-sm md:p-8"><div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><Badge className="border border-slate-200 bg-white text-slate-500 uppercase tracking-[0.2em]">{t.whyEyebrow}</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{t.whyTitle}</h2></div><p className="max-w-xl text-sm leading-7 text-slate-600">{t.whyText}</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{whyChooseItems.map((item) => <FeatureCard key={item.en} item={item} language={language} />)}</div></div></section>
        <section id="services" className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8"><div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesTitle} description={t.servicesDescription} /><a href="#contact"><Button variant="outline">{t.viewAll}</Button></a></div><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{serviceItems.map((service) => <Card key={service.en} className="h-full"><CardHeader><div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#24207b] text-[#d8f500]"><Icon name={service.icon} /></div><CardTitle className="text-xl">{service[language]}</CardTitle><CardDescription className="leading-7">{language === "th" ? service.thText : service.enText}</CardDescription></CardHeader><CardContent className="px-6 pb-6"><a href="#contact" className="text-sm font-medium text-slate-900">{t.learnMore}</a></CardContent></Card>)}</div><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{serviceDetailItems.map((item) => <FeatureCard key={item.en} item={item} language={language} compact />)}</div></section>
        <section id="warehouse" className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"><Card className="bg-[#24207b] text-white"><CardContent className="p-8 md:p-10"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10"><Icon name="warehouse" className="h-7 w-7 text-[#d8f500]" /></div><h3 className="text-3xl font-semibold tracking-tight">{t.warehousePanelTitle}</h3><p className="mt-4 text-sm leading-7 text-slate-200">{t.warehousePanelText}</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{warehouseFeatureItems.map((feature) => <div key={feature.en} className="flex gap-3 rounded-2xl bg-white/5 p-4"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#d8f500]" /><p className="text-sm text-slate-100">{feature[language]}</p></div>)}</div></CardContent></Card><SectionHeading eyebrow={t.warehouseEyebrow} title={t.warehouseTitle} description={t.warehouseDescription} /></div></section>
        <section id="network" className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8"><div className="mb-8"><SectionHeading eyebrow={t.networkEyebrow} title={t.networkTitle} description={t.networkDescription} /></div><Card><CardContent className="p-6 md:p-8"><WorldMap t={t} /></CardContent></Card></section>
        <section id="news" className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8"><div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow={t.newsEyebrow} title={t.newsTitle} description={t.newsDescription} /><a href="#contact"><Button variant="outline">{t.eservices}<Icon name="external" className="h-4 w-4" /></Button></a></div><div className="grid gap-6 md:grid-cols-3">{newsItems.map((item) => <FeatureCard key={item.en} item={item} language={language} />)}</div></section>
        <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8"><Card className="overflow-hidden border-0 bg-gradient-to-r from-[#211d75] via-[#24207b] to-[#10123f] text-white shadow-2xl shadow-slate-200"><CardContent className="grid gap-8 p-8 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><Badge className="bg-white/10 text-white">{t.ctaBadge}</Badge><h3 className="mt-4 text-3xl font-semibold tracking-tight">{t.ctaTitle}</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">{t.ctaText}</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><a href="#contact"><Button className="bg-white text-[#24207b] hover:bg-white/90">{t.applyCareer}</Button></a><a href="#contact"><Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">{t.requestQuote}</Button></a></div></CardContent></Card></section>
        <section id="contact" className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"><div className="space-y-6"><SectionHeading eyebrow={t.contactEyebrow} title={t.contactTitle} description={t.contactDescription} /><div className="grid gap-3 sm:grid-cols-2">{contactCards.map((item) => <FeatureCard key={item.en} item={item} language={language} compact />)}</div><div className="grid gap-4">{officeCards.map((item) => <Card key={item.en}><CardContent className="flex gap-4 p-5"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#24207b] text-[#d8f500]"><Icon name={item.icon} /></div><div><p className="font-medium text-slate-900">{item[language]}</p><p className="mt-1 text-sm leading-7 text-slate-600">{item.text}</p></div></CardContent></Card>)}</div></div><Card className="self-start overflow-hidden"><div className="h-2 bg-gradient-to-r from-[#24207b] via-[#24207b] to-[#d8f500]" /><CardContent className="p-6 md:p-8"><div className="mb-6 flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#24207b] text-[#d8f500]"><Icon name="mail" /></div><div><h3 className="text-2xl font-semibold tracking-tight text-slate-900">{t.sendInquiry}</h3><p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">{t.contactIntro}</p></div></div><div className="grid gap-3 sm:grid-cols-2"><Input className="h-11 rounded-xl border border-slate-200 bg-slate-50/70 px-3" placeholder={t.namePlaceholder} /><Input className="h-11 rounded-xl border border-slate-200 bg-slate-50/70 px-3" placeholder={t.companyPlaceholder} /><Input className="h-11 rounded-xl border border-slate-200 bg-slate-50/70 px-3" placeholder={t.emailPlaceholder} /><Input className="h-11 rounded-xl border border-slate-200 bg-slate-50/70 px-3" placeholder={t.phonePlaceholder} /></div><Input className="mt-3 h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3" placeholder={t.subjectPlaceholder} /><Textarea className="mt-3 min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3" placeholder={t.messagePlaceholder} /><div className="mt-5 rounded-2xl bg-slate-50 p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-md text-xs leading-6 text-slate-500">{t.formNote}</p><Button>{t.submitInquiry}</Button></div></div></CardContent></Card></div></section>
      </main>
      <footer className="border-t border-slate-200 bg-slate-50"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8"><div><BrandLogo /><p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">{t.footerText}</p></div><div><p className="text-sm font-semibold text-slate-900">{t.quickLinks}</p><div className="mt-4 grid gap-3 text-sm text-slate-600">{navItems.map(([label, href]) => <a key={label} href={href} className="transition hover:text-slate-900">{label}</a>)}</div></div><div><p className="text-sm font-semibold text-slate-900">{t.businessActions}</p><div className="mt-4 grid gap-3 text-sm text-slate-600"><a href="#contact">{t.quote}</a><a href="#news">{t.latestNewsletter}</a><a href="#network">{t.globalNetwork}</a><a href="#contact">{t.careers}</a></div></div></div></footer>
    </div>
  );
}
