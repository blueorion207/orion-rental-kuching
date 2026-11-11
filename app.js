const vehicles = {
  cars: [
    ["Perodua Axia Gen 1",120,"🚗"],["Perodua Bezza 1.3",140,"🚙"],
    ["Perodua Alza Gen 2",230,"🚐"],["Toyota Innova",250,"🚐"],
    ["Toyota Hilux",350,"🛻"],["Toyota Vellfire",800,"🚘"]
  ],
  motorcycles: [
    ["Honda Wave Alpha",50,"🏍️"],["Yamaha EZ115",50,"🛵"],
    ["Yamaha Ego Gear",60,"🛵"],["Yamaha Y15",80,"🏍️"],
    ["Yamaha NMAX V3",90,"🛵"],["Yamaha NVX V3",100,"🛵"],
    ["Aveta Nova 250",300,"🏍️"],["Aveta Vanguard 250",300,"🏍️"]
  ]
};
const translations = {
  en: {
    navHome:"Home",navFleet:"Our Fleet",navAbout:"About Us",navContact:"Contact",bookNow:"Book Now",
    heroEyebrow:"CAR & MOTORCYCLE RENTAL IN KUCHING",heroDescription:"Explore Kuching with the right ride. Choose a car or motorcycle that fits your journey.",
    rentCar:"Rent a Car",rentMotorcycle:"Rent a Motorcycle",since:"Serving Kuching since 2016",
    fleetEyebrow:"FIND YOUR RIDE",fleetTitle:"Explore Our Fleet",fleetIntro:"Choose from our car and motorcycle rental options in Kuching.",
    cars:"Cars",motorcycles:"Motorcycles",whyEyebrow:"WHY ORION",whyTitle:"A smoother way to explore Kuching",
    feature1Title:"Experience since 2016",feature1Text:"Local rental experience serving visitors and the Kuching community.",
    feature2Title:"Wide vehicle choices",feature2Text:"Cars and motorcycles for different travel needs.",
    feature3Title:"Convenient pickup",feature3Text:"Pickup options at Kuching Town and Kuching Airport.",
    feature4Title:"WhatsApp support",feature4Text:"Contact our team for booking enquiries and assistance.",
    aboutEyebrow:"ABOUT ORION",aboutTitle:"Your local mobility partner in Kuching",
    aboutText:"Orion Rental Kuching has provided car rental services since 2016 and expanded into motorcycle rental in 2022. Our goal is to help you move around Kuching with greater freedom and convenience.",
    contactEyebrow:"LET'S GET YOU MOVING",contactTitle:"Ready to plan your journey?",
    contactText:"Send us your rental enquiry. Our team will check availability and get back to you.",whatsappUs:"Chat on WhatsApp"
  },
  bm: {
    navHome:"Utama",navFleet:"Kenderaan",navAbout:"Tentang Kami",navContact:"Hubungi",bookNow:"Tempah Sekarang",
    heroEyebrow:"SEWA KERETA & MOTOSIKAL DI KUCHING",heroDescription:"Terokai Kuching dengan kenderaan yang sesuai. Pilih kereta atau motosikal mengikut perjalanan anda.",
    rentCar:"Sewa Kereta",rentMotorcycle:"Sewa Motosikal",since:"Berkhidmat di Kuching sejak 2016",
    fleetEyebrow:"PILIH KENDERAAN",fleetTitle:"Pilihan Kenderaan Kami",fleetIntro:"Pilih kereta atau motosikal untuk perjalanan anda di Kuching.",
    cars:"Kereta",motorcycles:"Motosikal",whyEyebrow:"KENAPA ORION",whyTitle:"Lebih mudah menerokai Kuching",
    feature1Title:"Pengalaman sejak 2016",feature1Text:"Pengalaman sewaan tempatan untuk pelawat dan komuniti Kuching.",
    feature2Title:"Pilihan kenderaan luas",feature2Text:"Kereta dan motosikal untuk pelbagai keperluan perjalanan.",
    feature3Title:"Lokasi pickup mudah",feature3Text:"Pilihan pickup di Bandar Kuching dan Lapangan Terbang Kuching.",
    feature4Title:"Sokongan WhatsApp",feature4Text:"Hubungi pasukan kami untuk pertanyaan dan bantuan tempahan.",
    aboutEyebrow:"TENTANG ORION",aboutTitle:"Rakan mobiliti tempatan anda di Kuching",
    aboutText:"Orion Rental Kuching menyediakan perkhidmatan sewa kereta sejak 2016 dan mengembangkan perkhidmatan sewa motosikal pada 2022. Matlamat kami ialah memudahkan perjalanan anda di sekitar Kuching.",
    contactEyebrow:"JOM MULAKAN PERJALANAN",contactTitle:"Dah bersedia untuk merancang perjalanan?",
    contactText:"Hantar pertanyaan sewaan kepada kami. Pasukan kami akan semak kekosongan dan hubungi anda semula.",whatsappUs:"Chat melalui WhatsApp"
  }
};
function renderVehicles(targetId, list) {
  const target = document.getElementById(targetId);
  target.innerHTML = list.map(([name, price, emoji]) => `
    <article class="vehicle-card">
      <div class="vehicle-art" role="img" aria-label="Illustrative image for ${name}">${emoji}</div>
      <div class="vehicle-info">
        <h4>${name}</h4><div class="vehicle-meta">Daily rental</div>
        <div class="vehicle-bottom"><div class="price">RM${price}<small> / day</small></div><a class="card-link" href="https://wa.me/601114299290?text=${encodeURIComponent("Hi Orion Rental Kuching, I would like to enquire about " + name + ".")}">Enquire →</a></div>
      </div>
    </article>`).join("");
}
renderVehicles("carGrid", vehicles.cars);
renderVehicles("motorcycleGrid", vehicles.motorcycles);
let language = localStorage.getItem("orion-language") || "en";
function setLanguage(next) {
  language = next;
  localStorage.setItem("orion-language", language);
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[language][key]) el.textContent = translations[language][key];
  });
  document.getElementById("languageToggle").textContent = language === "en" ? "BM" : "EN";
}
setLanguage(language);
document.getElementById("languageToggle").addEventListener("click", () => setLanguage(language === "en" ? "bm" : "en"));
const savedTheme = localStorage.getItem("orion-theme") || "auto";
function applyTheme(theme) {
  const dark = theme === "dark" || (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.body.classList.toggle("dark", dark);
  localStorage.setItem("orion-theme", theme);
}
applyTheme(savedTheme);
document.getElementById("themeToggle").addEventListener("click", () => {
  const currentlyDark = document.body.classList.contains("dark");
  applyTheme(currentlyDark ? "light" : "dark");
});
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.querySelector(".desktop-nav");
  const open = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".desktop-nav a").forEach(a => a.addEventListener("click", () => {
  document.querySelector(".desktop-nav").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
