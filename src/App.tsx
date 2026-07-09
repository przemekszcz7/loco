import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Menu, 
  Check, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  Info
} from "lucide-react";

// Gallery image data (URLs only, no titles or descriptions as requested)
const GALLERY_IMAGES = [
  { url: "https://i.ibb.co/m5SyNgh7/680921337-1628771921547794-4542023606396656710-n.jpg" },
  { url: "https://i.ibb.co/SLm7rsW/680199226-1628771928214460-4113952542909890337-n.jpg" },
  { url: "https://i.ibb.co/yFSLdgmS/681436084-1628771968214456-2398536170406701548-n.jpg" },
  { url: "https://i.ibb.co/BVpRhGNn/680232180-1628771998214453-9097488724176643478-n.jpg" },
  { url: "https://i.ibb.co/hqTzL50/684169121-18575788954025043-4314618335960893093-n.jpg" },
  { url: "https://i.ibb.co/hx6C3Hbd/671780659-18580127053025043-5608125043487804324-n.jpg" },
  { url: "https://i.ibb.co/hRtGnyj4/701019362-18580127068025043-6813503240520383171-n.jpg" },
  { url: "https://i.ibb.co/DPJ7687m/731093931-1679445833147069-6439783286813079839-n.jpg" },
  { url: "https://i.ibb.co/PK9SB16/730570451-1679445893147063-4756106566203939391-n.jpg" }
];

// Reviews data (no personal names, only roles)
const REVIEWS = [
  {
    text: "Stajnia naprawdę godna polecenia. Z córką uczęszczamy już ponad trzy lata, a przygodę zaczęła mając niecałe 6 lat. Naprawdę polecam.",
    role: "Regularne lekcje od 3 lat",
    rating: 5
  },
  {
    text: "Bardzo dobre trenerki, super atmosfera. Polecam",
    role: "Jeździec rekreacyjny",
    rating: 5
  },
  {
    text: "Półkolonie w siodle super 🏇 👌🏽 🐎 Koniki zadbane, miła atmosfera🥰",
    role: "Uczestnik obozu letniego",
    rating: 5
  }
];

export default function App() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Matchmaker interactive Quiz states
  const [quizLevel, setQuizLevel] = useState<string>("basics");
  const [quizAge, setQuizAge] = useState<string>("child");
  const [quizGoal, setQuizGoal] = useState<string>("fun");
  const [quizRecommendation, setQuizRecommendation] = useState<string>("");

  // Scrolled header effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update recommendation based on selections
  useEffect(() => {
    let rec = "";
    if (quizLevel === "basics") {
      if (quizAge === "child") {
        rec = "Sugerujemy indywidualne zajęcia oswajające z koniem i naukę jazdy od podstaw dla najmłodszych. Skupiamy się na nauce odpowiedzialności, równowagi oraz budowaniu pewności siebie przez zabawę i bliski kontakt.";
      } else {
        rec = "Zalecamy indywidualne lekcje dla dorosłych od podstaw na lonży. To bezpieczny i bezstresowy sposób na opanowanie dosiadu i podstawowych sygnałów jeździeckich.";
      }
    } else if (quizLevel === "intermediate") {
      if (quizGoal === "odznaki") {
        rec = "Najlepszym wyborem będą treningi przygotowujące do egzaminów na Brązową lub Srebrną Odznakę Jeździecką PZJ, ze szczególnym naciskiem na teorię i precyzję jazdy.";
      } else {
        rec = "Zalecamy grupowe lub indywidualne treningi doskonalące technikę. Pomożemy Ci uzyskać pełną niezależność dosiadu i płynność w prowadzeniu konia.";
      }
    } else if (quizLevel === "sport") {
      if (quizGoal === "sport_training") {
        rec = "Polecamy nasz autorski program treningowy dla koni oraz jeźdźców, prowadzony przez zawodniczkę z II klasą sportową. Skupiamy się na profesjonalnym przygotowaniu do zawodów.";
      } else {
        rec = "Najlepszy będzie dla Ciebie pensjonat dla konia połączony z regularną opieką trenerską oraz wsparciem w startach krajowych i regionalnych.";
      }
    }
    setQuizRecommendation(rec);
  }, [quizLevel, quizAge, quizGoal]);

  const handleQuizSelection = (type: string, value: string) => {
    if (type === "level") setQuizLevel(value);
    if (type === "age") setQuizAge(value);
    if (type === "goal") setQuizGoal(value);
  };

  const handleApplyRecommendation = () => {
    // Scroll to contact details
    const contactSection = document.getElementById("kontakt");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNextImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % GALLERY_IMAGES.length);
    }
  };

  const handlePrevImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  return (
    <div className="min-h-screen text-stone-900 selection:bg-brand-green-800 selection:text-white bg-[#faf8f5]">
      
      {/* 1. Header (Nawigacja - brak emotki konia) */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-brand-dark/95 backdrop-blur-md py-4 shadow-lg border-b border-brand-green-800/20" 
            : "bg-gradient-to-b from-brand-dark/80 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-3 group">
            <img 
              src="https://i.ibb.co/cSmJ4QcC/304925928-744512283307100-2452900937942488642-n.jpg" 
              alt="Logo Stajnia Loco" 
              className="h-12 w-12 rounded-full border border-brand-gold-500 shadow-md group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-serif-elegant text-xl sm:text-2xl font-bold tracking-wider text-brand-gold-100 block">
                STAJNIA LOCO
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold-500 block">
                Akademia Jeździecka
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#o-nas" className="text-stone-300 hover:text-brand-gold-500 text-sm font-medium transition-colors">O nas</a>
            <a href="#oferta" className="text-stone-300 hover:text-brand-gold-500 text-sm font-medium transition-colors">Oferta</a>
            <a href="#dla-dzieci" className="text-stone-300 hover:text-brand-gold-500 text-sm font-medium transition-colors">Dla dzieci</a>
            <a href="#sport" className="text-stone-300 hover:text-brand-gold-500 text-sm font-medium transition-colors">Sport</a>
            <a href="#galeria" className="text-stone-300 hover:text-brand-gold-500 text-sm font-medium transition-colors">Galeria</a>
            <a href="#kontakt" className="text-stone-300 hover:text-brand-gold-500 text-sm font-medium transition-colors">Kontakt</a>
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <a 
              href="tel:+48518348227" 
              className="flex items-center space-x-2 bg-brand-green-800 text-brand-gold-100 px-5 py-2.5 rounded-full border border-brand-gold-500/30 hover:bg-brand-green-900 transition-all hover:shadow-md text-sm font-semibold group"
            >
              <Phone className="h-4 w-4 text-brand-gold-500 group-hover:scale-110 transition-transform" />
              <span>518 348 227</span>
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-gold-100 hover:text-brand-gold-500 focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-dark border-t border-brand-green-800/30 px-4 py-6 space-y-4 shadow-2xl"
            >
              <a 
                href="#o-nas" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-stone-200 hover:text-brand-gold-500 text-base font-medium py-1"
              >
                O nas
              </a>
              <a 
                href="#oferta" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-stone-200 hover:text-brand-gold-500 text-base font-medium py-1"
              >
                Oferta
              </a>
              <a 
                href="#dla-dzieci" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-stone-200 hover:text-brand-gold-500 text-base font-medium py-1"
              >
                Dla dzieci
              </a>
              <a 
                href="#sport" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-stone-200 hover:text-brand-gold-500 text-base font-medium py-1"
              >
                Sport
              </a>
              <a 
                href="#galeria" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-stone-200 hover:text-brand-gold-500 text-base font-medium py-1"
              >
                Galeria
              </a>
              <a 
                href="#kontakt" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-stone-200 hover:text-brand-gold-500 text-base font-medium py-1"
              >
                Kontakt
              </a>
              <div className="pt-4 border-t border-stone-800 flex flex-col space-y-3">
                <a 
                  href="tel:+48518348227" 
                  className="flex items-center justify-center space-x-2 bg-brand-green-800 text-brand-gold-100 py-3 rounded-xl font-bold border border-brand-gold-500/20"
                >
                  <Phone className="h-4 w-4 text-brand-gold-500" />
                  <span>Zadzwoń: 518 348 227</span>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=100032450062457" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-stone-800 text-stone-200 py-3 rounded-xl font-bold"
                >
                  <Facebook className="h-4 w-4 text-[#1877F2]" />
                  <span>Nasz Facebook</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section (brak emotki konia w tytule) */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-brand-dark pt-24">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/m5SyNgh7/680921337-1628771921547794-4542023606396656710-n.jpg" 
            alt="Stajnia Loco tło" 
            className="w-full h-full object-cover opacity-35 filter brightness-75 select-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            {/* Elegant upper subheader */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-green-900/60 border border-brand-gold-500/30 backdrop-blur-sm text-brand-gold-500 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Nowoczesny Ośrodek Jeździecki</span>
            </div>

            <h1 className="font-serif-elegant text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-brand-gold-100">
              Stajnia Loco
            </h1>

            <p className="font-serif-elegant text-2xl sm:text-3xl lg:text-4xl font-light italic text-brand-gold-500 tracking-wide">
              Pasja. Doświadczenie. Relacja z koniem.
            </p>

            <p className="max-w-2xl mx-auto text-stone-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
              Miejsce stworzone dla osób, które chcą rozpocząć swoją przygodę z jeździectwem, 
              rozwijać swoje umiejętności oraz budować wyjątkową więź z koniem w rodzinnej atmosferze.
            </p>

            {/* CTA Buttons */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a 
                href="#oferta" 
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold-500 text-brand-dark hover:bg-brand-gold-600 font-bold rounded-full transition-all hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] text-center text-base"
              >
                Rozpocznij naukę jazdy
              </a>
              <a 
                href="#kontakt" 
                className="w-full sm:w-auto px-8 py-4 bg-transparent text-brand-gold-100 hover:text-white font-bold rounded-full border-2 border-brand-gold-500/40 hover:border-brand-gold-500 transition-all text-center text-base backdrop-blur-sm"
              >
                Skontaktuj się
              </a>
            </div>
          </motion.div>
        </div>

        {/* Curved Divider Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#faf8f5] to-transparent z-10" />
      </section>

      {/* 3. O Nas Section */}
      <section id="o-nas" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-brand-gold-500/20 shadow-2xl">
                <img 
                  src="https://i.ibb.co/SLm7rsW/680199226-1628771928214460-4113952542909890337-n.jpg" 
                  alt="Relacja z koniem Stajnia Loco" 
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-green-900/10 rounded-full blur-2xl z-0" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-gold-500/10 rounded-full blur-xl z-0" />
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block text-brand-green-800 uppercase tracking-widest text-xs font-bold border-b-2 border-brand-gold-500 pb-1">
                Nasza Pasja i Misja
              </div>
              
              <h2 className="font-serif-elegant text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight">
                Stajnia Loco to miejsce, gdzie doświadczenie spotyka się z pasją.
              </h2>
              
              <p className="text-stone-700 text-lg leading-relaxed font-light">
                Tworzymy przyjazną, pełną ciepła przestrzeń dla początkujących jeźdźców, 
                ambitnych sportowców oraz właścicieli koni poszukujących idealnego schronienia dla swoich zwierząt.
              </p>
              
              <p className="text-stone-700 text-lg leading-relaxed font-light">
                Stawiamy na <strong className="text-brand-green-900 font-semibold">profesjonalizm, bezpieczeństwo</strong> i głębokie, indywidualne podejście do każdego człowieka oraz każdego konia. U nas nie tylko uczysz się techniki, ale przede wszystkim uczysz się partnerskiego dialogu ze zwierzęciem.
              </p>

              {/* USP mini-grid */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-brand-green-100 rounded-lg text-brand-green-900 mt-1">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark text-sm sm:text-base">Bezpieczeństwo</h4>
                    <p className="text-xs text-stone-500">Certyfikowana kadra i spokojne konie.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-brand-green-100 rounded-lg text-brand-green-900 mt-1">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark text-sm sm:text-base">Doświadczenie</h4>
                    <p className="text-xs text-stone-500">Trenerzy startujący od 2007 roku.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Oferta Section */}
      <section id="oferta" className="py-24 bg-brand-green-950 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-green-900/50 via-brand-dark to-brand-dark z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-brand-gold-500 uppercase tracking-widest text-xs font-bold">Dowiedz się co robimy</span>
            <h2 className="font-serif-elegant text-4xl sm:text-5xl font-bold text-brand-gold-100">Nasza Oferta</h2>
            <div className="h-1 w-20 bg-brand-gold-500 mx-auto" />
            <p className="text-stone-300 font-light">
              Zapewniamy wszechstronne usługi jeździeckie na najwyższym poziomie – od pierwszych kroków w siodle po zaawansowane wsparcie sportowe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Riding lessons */}
            <div className="bg-brand-green-900/40 border border-brand-green-800/40 rounded-2xl p-8 space-y-6 flex flex-col justify-between hover:border-brand-gold-500/40 transition-all hover:transform hover:-translate-y-1 shadow-xl">
              <div className="space-y-4">
                <div className="h-16 w-16 bg-brand-green-800/80 rounded-xl flex items-center justify-center border border-brand-gold-500/20">
                  <span className="text-3xl">🐴</span>
                </div>
                <h3 className="font-serif-elegant text-2xl font-bold text-brand-gold-100">Nauka Jazdy Konnej</h3>
                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  Bezpieczna i przyjazna edukacja dla każdego. Uczymy z szacunkiem do konia, kładąc nacisk na poprawny dosiad.
                </p>
                
                <ul className="space-y-2.5 pt-4 text-stone-200 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>Nauka jazdy od podstaw (na lonży)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>Przygotowanie do odznak jeździeckich</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>Przygotowanie do startów w zawodach</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>Zajęcia prowadzone przez instruktorów PZJ</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <a 
                  href="#kontakt" 
                  className="inline-flex items-center space-x-2 text-brand-gold-500 hover:text-brand-gold-100 text-sm font-semibold transition-colors group"
                >
                  <span>Skontaktuj się</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Card 2: Pension */}
            <div className="bg-brand-green-900/40 border border-brand-green-800/40 rounded-2xl p-8 space-y-6 flex flex-col justify-between hover:border-brand-gold-500/40 transition-all hover:transform hover:-translate-y-1 shadow-xl">
              <div className="space-y-4">
                <div className="h-16 w-16 bg-brand-green-800/80 rounded-xl flex items-center justify-center border border-brand-gold-500/20">
                  <span className="text-3xl">🌾</span>
                </div>
                <h3 className="font-serif-elegant text-2xl font-bold text-brand-gold-100">Pensjonat dla Koni</h3>
                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  Zapewniamy profesjonalną opiekę, stałe karmienie najwyższej jakości paszą oraz komfortowe warunki bytowe dla Twojego przyjaciela.
                </p>

                <ul className="space-y-2.5 pt-4 text-stone-200 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>Jasne, codzienne sprzątane boksy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>Wypas na bezpiecznych, zielonych padokach</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>Indywidualne dawkowanie paszy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>Troskliwy i doświadczony personel stajni</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <a 
                  href="#kontakt" 
                  className="inline-flex items-center space-x-2 text-brand-gold-500 hover:text-brand-gold-100 text-sm font-semibold transition-colors group"
                >
                  <span>Zapytaj o wolne boksy</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Card 3: Training */}
            <div className="bg-brand-green-900/40 border border-brand-green-800/40 rounded-2xl p-8 space-y-6 flex flex-col justify-between hover:border-brand-gold-500/40 transition-all hover:transform hover:-translate-y-1 shadow-xl">
              <div className="space-y-4">
                <div className="h-16 w-16 bg-brand-green-800/80 rounded-xl flex items-center justify-center border border-brand-gold-500/20">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="font-serif-elegant text-2xl font-bold text-brand-gold-100">Trening Koni</h3>
                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  Kompleksowe układanie, praca z ziemi oraz treningi pod siodłem dla młodych i trudnych koni z myślą o harmonii i sporcie.
                </p>

                <ul className="space-y-2.5 pt-4 text-stone-200 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>Treningi przez utytułowaną zawodniczkę</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>Aktywny start w zawodach od 2007 roku</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>II klasa sportowa trenera</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                    <span>Praca dostosowana do możliwości fizycznych konia</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <a 
                  href="#kontakt" 
                  className="inline-flex items-center space-x-2 text-brand-gold-500 hover:text-brand-gold-100 text-sm font-semibold transition-colors group"
                >
                  <span>Skonsultuj trening</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Matchmaker Quiz */}
      <section className="py-20 bg-[#f3edd3]/30 border-y border-brand-gold-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-brand-gold-500/20 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-green-800">Interaktywny Przewodnik</span>
              <h3 className="font-serif-elegant text-3xl font-bold text-brand-dark">Dopasuj jazdę do swoich potrzeb</h3>
              <p className="text-stone-500 text-sm max-w-lg mx-auto">
                Wybierz poniższe opcje, aby dowiedzieć się, który program treningowy w Stajni Loco będzie dla Ciebie najlepszy!
              </p>
            </div>

            {/* Quiz selections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {/* Level */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider">Twój Poziom:</label>
                <div className="flex flex-col space-y-1.5">
                  <button 
                    onClick={() => handleQuizSelection("level", "basics")}
                    className={`py-2 px-3 text-left rounded-xl text-sm font-medium border transition-all ${
                      quizLevel === "basics" 
                        ? "bg-brand-green-900 text-white border-brand-green-900 shadow-md" 
                        : "bg-stone-50 hover:bg-stone-100 border-stone-200"
                    }`}
                  >
                    🌱 Początkujący
                  </button>
                  <button 
                    onClick={() => handleQuizSelection("level", "intermediate")}
                    className={`py-2 px-3 text-left rounded-xl text-sm font-medium border transition-all ${
                      quizLevel === "intermediate" 
                        ? "bg-brand-green-900 text-white border-brand-green-900 shadow-md" 
                        : "bg-stone-50 hover:bg-stone-100 border-stone-200"
                    }`}
                  >
                    🐎 Średniozaawansowany
                  </button>
                  <button 
                    onClick={() => handleQuizSelection("level", "sport")}
                    className={`py-2 px-3 text-left rounded-xl text-sm font-medium border transition-all ${
                      quizLevel === "sport" 
                        ? "bg-brand-green-900 text-white border-brand-green-900 shadow-md" 
                        : "bg-stone-50 hover:bg-stone-100 border-stone-200"
                    }`}
                  >
                    🏆 Sportowy / Aspirant
                  </button>
                </div>
              </div>

              {/* Age / Category */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider">Dla kogo:</label>
                <div className="flex flex-col space-y-1.5">
                  <button 
                    onClick={() => handleQuizSelection("age", "child")}
                    className={`py-2 px-3 text-left rounded-xl text-sm font-medium border transition-all ${
                      quizAge === "child" 
                        ? "bg-brand-green-900 text-white border-brand-green-900 shadow-md" 
                        : "bg-stone-50 hover:bg-stone-100 border-stone-200"
                    }`}
                  >
                    🧒 Dziecko / Młodzież
                  </button>
                  <button 
                    onClick={() => handleQuizSelection("age", "adult")}
                    className={`py-2 px-3 text-left rounded-xl text-sm font-medium border transition-all ${
                      quizAge === "adult" 
                        ? "bg-brand-green-900 text-white border-brand-green-900 shadow-md" 
                        : "bg-stone-50 hover:bg-stone-100 border-stone-200"
                    }`}
                  >
                    👩 Dorosły
                  </button>
                </div>
              </div>

              {/* Goal */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider">Twój Cel:</label>
                <div className="flex flex-col space-y-1.5">
                  <button 
                    onClick={() => handleQuizSelection("goal", "fun")}
                    className={`py-2 px-3 text-left rounded-xl text-sm font-medium border transition-all ${
                      quizGoal === "fun" 
                        ? "bg-brand-green-900 text-white border-brand-green-900 shadow-md" 
                        : "bg-stone-50 hover:bg-stone-100 border-stone-200"
                    }`}
                  >
                    ❤️ Rekreacja i Pasja
                  </button>
                  <button 
                    onClick={() => handleQuizSelection("goal", "odznaki")}
                    className={`py-2 px-3 text-left rounded-xl text-sm font-medium border transition-all ${
                      quizGoal === "odznaki" 
                        ? "bg-brand-green-900 text-white border-brand-green-900 shadow-md" 
                        : "bg-stone-50 hover:bg-stone-100 border-stone-200"
                    }`}
                  >
                    📜 Odznaki Jeździeckie
                  </button>
                  <button 
                    onClick={() => handleQuizSelection("goal", "sport_training")}
                    className={`py-2 px-3 text-left rounded-xl text-sm font-medium border transition-all ${
                      quizGoal === "sport_training" 
                        ? "bg-brand-green-900 text-white border-brand-green-900 shadow-md" 
                        : "bg-stone-50 hover:bg-stone-100 border-stone-200"
                    }`}
                  >
                    🏅 Starty w zawodach
                  </button>
                </div>
              </div>
            </div>

            {/* Recommendation Result */}
            <div className="p-6 bg-brand-green-50 rounded-2xl border-l-4 border-brand-gold-500 flex flex-col sm:flex-row items-start justify-between gap-6">
              <div className="space-y-2">
                <h4 className="font-serif-elegant text-xl font-bold text-brand-green-900 flex items-center gap-2">
                  <Award className="h-5 w-5 text-brand-gold-500" />
                  Nasza Rekomendacja dla Ciebie:
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {quizRecommendation}
                </p>
              </div>
              <button 
                onClick={handleApplyRecommendation}
                className="w-full sm:w-auto px-5 py-3 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-dark font-bold rounded-xl text-sm transition-all whitespace-nowrap shadow-md text-center"
              >
                Skontaktuj się
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sekcja dla Dzieci */}
      <section id="dla-dzieci" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text column */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="inline-block text-brand-green-800 uppercase tracking-widest text-xs font-bold border-b-2 border-brand-gold-500 pb-1">
                Najmłodsi w siodle
              </div>
              
              <h2 className="font-serif-elegant text-4xl sm:text-5xl font-bold text-brand-dark">
                Pierwsze kroki w świecie koni
              </h2>
              
              <p className="text-stone-600 text-lg leading-relaxed font-light">
                Dzieci są dla nas wyjątkowymi gośćmi. Tworzymy ciepłą, bezpieczną i niezwykle przyjazną atmosferę, w której najmłodsi mogą poznać fascynujący świat koni bez pośpiechu i stresu.
              </p>

              <p className="text-stone-600 text-lg leading-relaxed font-light">
                Nasze lekcje to nie tylko jazda. Kładziemy ogromny nacisk na obcowanie z końmi z ziemi, czyszczenie i karmienie, dzięki czemu dzieci uczą się:
              </p>

              {/* Children benefits list */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2.5">
                  <span className="h-6 w-6 rounded-full bg-brand-green-100 text-brand-green-900 flex items-center justify-center font-bold text-xs">✔</span>
                  <span className="font-medium text-stone-700 text-sm sm:text-base">Odpowiedzialności</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="h-6 w-6 rounded-full bg-brand-green-100 text-brand-green-900 flex items-center justify-center font-bold text-xs">✔</span>
                  <span className="font-medium text-stone-700 text-sm sm:text-base">Bezpieczeństwa</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="h-6 w-6 rounded-full bg-brand-green-100 text-brand-green-900 flex items-center justify-center font-bold text-xs">✔</span>
                  <span className="font-medium text-stone-700 text-sm sm:text-base">Pracy z koniem</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="h-6 w-6 rounded-full bg-brand-green-100 text-brand-green-900 flex items-center justify-center font-bold text-xs">✔</span>
                  <span className="font-medium text-stone-700 text-sm sm:text-base">Pewności siebie</span>
                </div>
              </div>

              <div className="p-4 bg-[#faf8f5] rounded-xl border-l-4 border-brand-green-800 text-stone-600 text-sm italic">
                „Każdy jeździec rozwija się własnym tempem. Szanujemy to i dbamy o uśmiech na twarzy każdego dziecka.”
              </div>
            </div>

            {/* Visual Column */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-brand-gold-500/20 shadow-2xl">
                <img 
                  src="https://i.ibb.co/BVpRhGNn/680232180-1628771998214453-9097488724176643478-n.jpg" 
                  alt="Dzieci i konie Stajnia Loco" 
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-gold-500/10 rounded-full blur-xl z-0" />
            </div>

          </div>
        </div>
      </section>

      {/* 6. Sekcja Sport */}
      <section id="sport" className="py-24 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-brand-green-950 via-stone-900 to-brand-dark opacity-90 z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden border border-brand-gold-500/30 shadow-2xl">
                <img 
                  src="https://i.ibb.co/PK9SB16/730570451-1679445893147063-4756106566203939391-n.jpg" 
                  alt="Trening sportowy skoki Stajnia Loco" 
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-36 h-36 bg-brand-gold-500/10 rounded-full blur-2xl z-0" />
            </div>

            {/* Text Column */}
            <div className="space-y-6">
              <div className="inline-block text-brand-gold-500 uppercase tracking-widest text-xs font-bold border-b-2 border-brand-gold-500 pb-1">
                Trening Sportowy
              </div>
              
              <h2 className="font-serif-elegant text-4xl sm:text-5xl font-bold text-brand-gold-100">
                Rozwijaj swoje umiejętności
              </h2>
              
              <p className="text-stone-300 text-lg leading-relaxed font-light">
                Dla osób chcących rozwijać się bardziej oferujemy profesjonalne przygotowanie sportowe oraz pełne, merytoryczne wsparcie w drodze do pierwszych i kolejnych zawodów jeździeckich.
              </p>

              <p className="text-stone-300 text-lg leading-relaxed font-light">
                Łączymy rzetelną wiedzę anatomiczną i szkoleniową z doświadczeniem oraz praktyką zdobywaną przez lata startów w dyscyplinie skoków przez przeszkody. Nasz system pracy wyklucza drogę na skróty – dbamy o prawidłowy rozwój fizyczny i psychiczny konia oraz precyzję jeźdźca.
              </p>

              {/* Coach details panel */}
              <div className="bg-brand-green-950/60 border border-brand-gold-500/20 rounded-xl p-5 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-brand-gold-500/20 flex items-center justify-center text-brand-gold-500 font-bold">
                    II
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-gold-100 text-sm sm:text-base">Trener z II klasą sportową</h4>
                    <p className="text-xs text-stone-400">Aktywny start w zawodach od 2007 roku.</p>
                  </div>
                </div>
                <p className="text-stone-300 text-xs sm:text-sm italic pl-13">
                  „Dzięki wieloletnim startom potrafimy przekazać bezcenne wskazówki z parkuru, ucząc opanowania, pewności decyzji i precyzyjnej komunikacji.”
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Opinie Klientów (brak imion) */}
      <section className="py-24 bg-brand-gold-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-brand-green-800 uppercase tracking-widest text-xs font-bold">Zaufanie i Atmosfera</span>
            <h2 className="font-serif-elegant text-4xl sm:text-5xl font-bold text-brand-dark">Co mówią o nas nasi klienci</h2>
            <div className="h-1 w-20 bg-brand-gold-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-brand-gold-500/10 flex flex-col justify-between space-y-6 relative group transition-all"
              >
                <div className="absolute top-6 right-8 text-brand-gold-500/20 text-6xl font-serif select-none pointer-events-none">
                  ”
                </div>
                
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-gold-500 text-brand-gold-500" />
                    ))}
                  </div>
                  <p className="text-stone-700 font-light italic leading-relaxed text-base">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-stone-100">
                  <div className="h-10 w-10 rounded-full bg-brand-green-50 flex items-center justify-center text-brand-green-800 font-bold text-sm">
                    ⭐
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm sm:text-base">{review.role}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Galeria (brak opisów zdjęć) */}
      <section id="galeria" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-brand-green-800 uppercase tracking-widest text-xs font-bold">Życie stajni na zdjęciach</span>
            <h2 className="font-serif-elegant text-4xl sm:text-5xl font-bold text-brand-dark">Nasza Galeria</h2>
            <div className="h-1 w-20 bg-brand-gold-500 mx-auto" />
            <p className="text-stone-500 font-light text-sm sm:text-base">
              Zobacz naszą urokliwą infrastrukturę, naszych podopiecznych koni oraz radosne chwile z treningów i lekcji.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.slice(0, showAllGallery ? GALLERY_IMAGES.length : 6).map((img, index) => (
              <motion.div 
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative h-72 rounded-2xl overflow-hidden cursor-zoom-in border border-brand-gold-500/10 shadow-md"
                onClick={() => setActiveImageIndex(index)}
              >
                <img 
                  src={img.url} 
                  alt="Zdjęcie z galerii Stajnia Loco" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {/* Elegant overlay with no description texts */}
                <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-4">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-gold-500 text-brand-dark shadow-lg">
                      <ChevronRight className="h-6 w-6 transform rotate-45" />
                    </span>
                    <p className="text-xs text-stone-200 mt-2 tracking-wider font-semibold uppercase">Powiększ</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* "Więcej zdjęć" Button */}
          <div className="text-center pt-12">
            <button 
              onClick={() => setShowAllGallery(!showAllGallery)}
              className="px-8 py-3.5 bg-transparent border-2 border-brand-green-800 text-brand-green-800 hover:bg-brand-green-900 hover:text-white font-bold rounded-full transition-all text-sm uppercase tracking-wider"
            >
              {showAllGallery ? "Pokaż mniej" : "Więcej zdjęć"}
            </button>
          </div>
        </div>
      </section>

      {/* 9. Sekcja Kontakt (Brak formularza, w pełni zbalansowana) */}
      <section id="kontakt" className="py-24 bg-[#f3edd3]/25 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white p-8 sm:p-16 rounded-3xl shadow-xl border border-brand-gold-500/10 space-y-12 text-center">
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-brand-green-800 uppercase tracking-widest text-xs font-bold">Dołącz do nas</span>
              <h2 className="font-serif-elegant text-4xl sm:text-5xl font-bold text-brand-dark">Skontaktuj się z nami</h2>
              <p className="text-stone-600 font-light">
                Chętnie odpowiemy na wszystkie Twoje pytania. Zadzwoń, napisz maila lub odwiedź nas osobiście w malowniczym Rasztowie.
              </p>
            </div>

            {/* Information Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              {/* Location */}
              <div className="flex flex-col items-center p-6 bg-[#faf8f5] rounded-2xl border border-brand-gold-500/10 transition-all hover:border-brand-gold-500/30">
                <div className="h-12 w-12 rounded-xl bg-brand-green-900 text-brand-gold-500 flex items-center justify-center shadow-md mb-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-brand-dark text-base mb-1">Adres Stajni</h4>
                <p className="text-stone-600 text-sm font-semibold">Diamentowa, Rasztów</p>
                <p className="text-stone-400 text-xs mt-1">woj. mazowieckie, koło Radzymina</p>
              </div>

              {/* Phone */}
              <a 
                href="tel:+48518348227" 
                className="flex flex-col items-center p-6 bg-[#faf8f5] rounded-2xl border border-brand-gold-500/10 transition-all hover:border-brand-gold-500/30 group"
              >
                <div className="h-12 w-12 rounded-xl bg-brand-green-900 text-brand-gold-500 flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform">
                  <Phone className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-brand-dark text-base mb-1 group-hover:text-brand-green-800 transition-colors">Telefon</h4>
                <p className="text-stone-600 text-sm font-bold">518 348 227</p>
                <p className="text-stone-400 text-xs mt-1">Dzwoń: 8:00 - 20:00</p>
              </a>

              {/* Email */}
              <a 
                href="mailto:adawolas@icloud.com" 
                className="flex flex-col items-center p-6 bg-[#faf8f5] rounded-2xl border border-brand-gold-500/10 transition-all hover:border-brand-gold-500/30 group"
              >
                <div className="h-12 w-12 rounded-xl bg-brand-green-900 text-brand-gold-500 flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform">
                  <Mail className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-brand-dark text-base mb-1 group-hover:text-brand-green-800 transition-colors">Napisz e-mail</h4>
                <p className="text-stone-600 text-sm font-semibold">adawolas@icloud.com</p>
                <p className="text-stone-400 text-xs mt-1">Zazwyczaj odpowiadamy w 24h</p>
              </a>
            </div>

            {/* Facebook Button & Info Box */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t border-stone-100 max-w-2xl mx-auto">
              <a 
                href="https://www.facebook.com/profile.php?id=100032450062457" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-brand-green-900 hover:bg-brand-green-950 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md text-sm w-full sm:w-auto justify-center"
              >
                <Facebook className="h-5 w-5 text-[#1877F2] fill-[#1877F2]" />
                <span>Nasz Profil Facebook</span>
              </a>

              <div className="text-left p-5 bg-[#faf8f5] rounded-2xl border border-brand-gold-500/10 space-y-1 max-w-sm">
                <h5 className="font-bold text-brand-dark text-xs sm:text-sm flex items-center gap-1.5 justify-center sm:justify-start">
                  <Info className="h-4 w-4 text-brand-gold-500" />
                  Dojazd do Stajni Loco
                </h5>
                <p className="text-[11px] text-stone-600 leading-relaxed text-center sm:text-left">
                  Ulica Diamentowa w Rasztowie (niedaleko Radzymina). Szybki dojazd trasą S8 z Warszawy (ok. 25-30 min). Prosimy o wcześniejszy kontakt telefoniczny!
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Elegant Footer with Logo */}
      <footer className="bg-brand-dark text-stone-300 py-16 border-t border-brand-green-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-stone-800">
            
            {/* Column 1: Brand & Logo */}
            <div className="md:col-span-5 space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://i.ibb.co/cSmJ4QcC/304925928-744512283307100-2452900937942488642-n.jpg" 
                  alt="Stajnia Loco Logo Stopka" 
                  className="h-16 w-16 rounded-full border border-brand-gold-500 shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-serif-elegant text-2xl font-bold tracking-wider text-brand-gold-100">
                    STAJNIA LOCO
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-brand-gold-500">
                    Akademia Jeździecka
                  </p>
                </div>
              </div>
              <p className="text-sm text-stone-400 max-w-sm leading-relaxed font-light">
                Z miłości do koni i profesjonalizmu w jeździectwie. Tworzymy zgraną społeczność pasjonatów w Rasztowie.
              </p>
            </div>

            {/* Column 2: Direct links */}
            <div className="md:col-span-3 text-center md:text-left space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-brand-gold-500">
                Menu nawigacji
              </h4>
              <ul className="space-y-1.5 text-sm text-stone-400">
                <li><a href="#o-nas" className="hover:text-brand-gold-500 transition-colors">O nas i nasza misja</a></li>
                <li><a href="#oferta" className="hover:text-brand-gold-500 transition-colors">Oferta i pakiety</a></li>
                <li><a href="#dla-dzieci" className="hover:text-brand-gold-500 transition-colors">Jazdy dla najmłodszych</a></li>
                <li><a href="#sport" className="hover:text-brand-gold-500 transition-colors">Szkolenia sportowe</a></li>
                <li><a href="#galeria" className="hover:text-brand-gold-500 transition-colors">Nasza galeria zdjęć</a></li>
              </ul>
            </div>

            {/* Column 3: Quick contact summary */}
            <div className="md:col-span-4 text-center md:text-left space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-brand-gold-500">
                Kontakt bezpośredni
              </h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li className="flex items-center justify-center md:justify-start space-x-2.5">
                  <MapPin className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                  <span>Diamentowa, Rasztów</span>
                </li>
                <li className="flex items-center justify-center md:justify-start space-x-2.5">
                  <Phone className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                  <a href="tel:+48518348227" className="hover:text-brand-gold-500 transition-colors font-semibold">518 348 227</a>
                </li>
                <li className="flex items-center justify-center md:justify-start space-x-2.5">
                  <Mail className="h-4 w-4 text-brand-gold-500 flex-shrink-0" />
                  <a href="mailto:adawolas@icloud.com" className="hover:text-brand-gold-500 transition-colors">adawolas@icloud.com</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 text-center sm:text-left gap-4">
            <p>© {new Date().getFullYear()} Stajnia Loco. Wszystkie prawa zastrzeżone.</p>
            <div className="flex space-x-6">
              <a href="https://www.facebook.com/profile.php?id=100032450062457" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold-500 transition-colors flex items-center space-x-1">
                <Facebook className="h-3.5 w-3.5 text-[#1877F2]" />
                <span>Facebook</span>
              </a>
              <span className="text-stone-700">|</span>
              <span className="text-stone-500">Projekt Premium dla Stajnia Loco</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Fullscreen Lightbox Modal for Gallery (no descriptions) */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Close button */}
            <button 
              className="absolute top-6 right-6 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all focus:outline-none"
              onClick={() => setActiveImageIndex(null)}
              aria-label="Zamknij galerię"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous Image button */}
            <button 
              className="absolute left-4 sm:left-6 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all focus:outline-none"
              onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image display panel */}
            <div 
              className="max-w-4xl max-h-[80vh] flex flex-col items-center space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                key={activeImageIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={GALLERY_IMAGES[activeImageIndex].url} 
                alt="Zdjęcie powiększone" 
                className="max-w-full max-h-[75vh] object-contain rounded-xl border border-white/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="text-center text-white">
                <div className="text-xs text-stone-400 pt-1 uppercase tracking-wider font-medium">
                  Zdjęcie {activeImageIndex + 1} z {GALLERY_IMAGES.length}
                </div>
              </div>
            </div>

            {/* Next Image button */}
            <button 
              className="absolute right-4 sm:right-6 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all focus:outline-none"
              onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
              aria-label="Następne zdjęcie"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
