import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "motion/react";
import { 
  Stethoscope, 
  BookOpen, 
  Award, 
  FileText, 
  ChevronRight, 
  ChevronDown,
  ChevronLeft,
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  ExternalLink,
  Quote,
  Plus,
  Minus,
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  Star
} from "lucide-react";
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems = [
    { label: "About", id: "about", type: "section" },
    { label: "Expertise", id: "services", type: "section" },
    { label: "Gallery", id: "gallery", type: "section" },
    { label: "Academics", id: "academics", type: "section" },
    { label: "Testimonials", path: "/testimonials", type: "link" },
    { label: "Publications", id: "publications", type: "section" }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || location.pathname !== "/" ? "bg-[#0a192f]/95 backdrop-blur-md py-4 shadow-2xl" : "bg-transparent md:bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className={`text-xl md:text-2xl font-serif tracking-tight transition-colors duration-300 ${isScrolled || location.pathname !== "/" ? "text-white" : "text-white md:text-navy"}`}>
            Dr. Abhishrey Raj
          </span>
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
            Gastroenterologist
          </span>
        </motion.div>

        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            item.type === "section" ? (
              <button 
                key={item.id} 
                onClick={() => handleNavClick(item.id!)}
                className={`text-xs uppercase tracking-widest font-medium hover:text-gold transition-colors cursor-pointer ${isScrolled || location.pathname !== "/" ? "text-gray-300" : "text-navy"}`}
              >
                {item.label}
              </button>
            ) : (
              <Link 
                key={item.path} 
                to={item.path!}
                className={`text-xs uppercase tracking-widest font-medium hover:text-gold transition-colors cursor-pointer ${isScrolled || location.pathname !== "/" ? "text-gray-300" : "text-navy"}`}
              >
                {item.label}
              </Link>
            )
          ))}
          <motion.a 
            href="#contact" 
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              setIsHovered(true);
            }}
            onMouseLeave={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              setIsHovered(false);
            }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 2 }}
            className="relative bg-gold text-navy px-6 py-2.5 text-xs uppercase tracking-widest font-bold rounded-xl overflow-hidden cursor-pointer shadow-[0_4px_0_0_#9A7B2C] hover:shadow-[0_6px_0_0_#9A7B2C] active:shadow-none transition-all duration-150"
          >
            <motion.div
              initial={false}
              animate={{
                clipPath: isHovered 
                  ? `circle(150% at ${hoverPos.x}px ${hoverPos.y}px)` 
                  : `circle(0% at ${hoverPos.x}px ${hoverPos.y}px)`
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-white/40 pointer-events-none"
            />
            <span className="relative z-10">Contact</span>
          </motion.a>
        </div>

        <button 
          className="md:hidden text-gold cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-navy border-t border-gold/20 p-8 flex flex-col space-y-6 md:hidden overflow-hidden"
          >
            {navItems.map((item) => (
              item.type === "section" ? (
                <button 
                  key={item.id} 
                  onClick={() => handleNavClick(item.id!)}
                  className="text-white text-sm uppercase tracking-widest font-medium text-left cursor-pointer"
                >
                  {item.label}
                </button>
              ) : (
                <Link 
                  key={item.path} 
                  to={item.path!}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-sm uppercase tracking-widest font-medium cursor-pointer"
                >
                  {item.label}
                </Link>
              )
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="bg-gold text-navy px-6 py-4 text-sm uppercase tracking-widest font-bold text-center rounded-xl cursor-pointer shadow-[0_4px_0_0_#9A7B2C] active:shadow-none active:translate-y-[4px] transition-all duration-150"
            >
              Contact Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Visual Side */}
      <div className="w-full md:w-1/2 h-[35vh] md:h-screen relative overflow-hidden bg-navy shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" 
          alt="Dr. Abhishrey Raj"
          className="w-full h-full object-cover object-center opacity-70 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 pt-12 pb-20 md:py-24 relative bg-white flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-xl w-full"
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-6">
            <div className="h-[1px] w-6 md:w-8 bg-gold/50"></div>
            <span className="text-gold uppercase tracking-[0.4em] text-[8px] md:text-xs font-bold block">
              Bespoke Clinical Care
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-navy mb-4 md:mb-8 leading-[1.2] tracking-tight font-serif">
            The Intersection of <br />
            <span className="italic text-gold/80">Academic Rigor</span> <br />
            and Clinical Mastery.
          </h1>
          
          <p className="text-slate/70 text-sm md:text-lg mb-6 md:mb-12 leading-relaxed max-w-md">
            Pioneering advanced therapeutic endoscopy and evidence-based gastroenterology at SGPGI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-6">
            <a 
              href="#contact" 
              className="bg-navy text-white px-6 md:px-10 py-3 md:py-5 text-[10px] md:text-sm uppercase tracking-widest font-bold hover:bg-gold hover:text-navy transition-all duration-500 shadow-[0_4px_0_0_#050C16] hover:shadow-[0_6px_0_0_#050C16] active:shadow-none active:translate-y-[4px] flex items-center justify-center group rounded-xl cursor-pointer"
            >
              Contact Me
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PrestigeStrip = () => {
  return (
    <div className="w-full bg-navy py-6 md:py-8 px-6 md:px-16 lg:px-24 border-t border-gold/20">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3 sm:space-x-8 opacity-70 grayscale brightness-200">
          <div className="h-6 w-6 md:h-10 md:w-10 border border-gold/40 rounded-full flex items-center justify-center text-[5px] md:text-[8px] text-gold text-center leading-tight shrink-0">
            SGPGI<br/>CREST
          </div>
          <span className="text-gold text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">
            MBBS, MD, DM (Gastro)
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-gold text-[7px] md:text-[10px] uppercase tracking-widest mb-0.5">Affiliation</span>
          <span className="text-white text-[8px] md:text-xs font-medium tracking-wide text-right">SGPGI, Lucknow</span>
        </div>
      </div>
    </div>
  );
};

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [rounded]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const ClinicalPhilosophy = () => {
  return (
    <section id="about" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] bg-navy overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
              alt="Medical Tech"
              className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-gold p-12 hidden md:block">
            <Quote className="text-navy mb-4" size={40} />
            <p className="text-navy font-serif text-xl italic leading-relaxed">
              "Precision is not just a technique; it is a moral imperative in the pursuit of patient outcomes."
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
            Clinical Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl text-navy mb-10 leading-tight">
            Precision Intervention. <br />
            Evidence-Based Outcomes.
          </h2>
          <div className="space-y-6 text-slate/80 leading-relaxed text-lg">
            <p>
              In the complex landscape of quaternary care, my approach is defined by a commitment to academic rigor. Every intervention is calibrated against the latest global clinical trials, ensuring that patients at SGPGI receive care that is not just advanced, but definitive.
            </p>
            <p>
              We move beyond symptomatic relief toward structural resolution. By integrating high-definition imaging with micro-surgical precision, we redefine the boundaries of what is possible in non-invasive gastroenterology.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-navy mb-1">
                <Counter value={2} suffix="nd" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Specialist Year</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-navy mb-1">
                <Counter value={2} suffix="k+" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Endoscopies</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-navy mb-1">
                <Counter value={12} suffix="+" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Publications</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ClinicalExcellence = () => {
  const specializations = [
    {
      title: "Advanced Therapeutic Endoscopy",
      desc: "ERCP, EUS-guided interventions, and complex stricture management using state-of-the-art platforms.",
      icon: <Stethoscope className="text-gold" size={32} />
    },
    {
      title: "Hepatology & Liver Transplant",
      desc: "Comprehensive management of chronic liver disease, portal hypertension, and pre-transplant optimization.",
      icon: <Award className="text-gold" size={32} />
    },
    {
      title: "Inflammatory Bowel Disease",
      desc: "Precision biological therapy and multidisciplinary management of Crohn's and Ulcerative Colitis.",
      icon: <FileText className="text-gold" size={32} />
    },
    {
      title: "Pancreatico-Biliary Disorders",
      desc: "Specialized care for acute and chronic pancreatitis, and biliary malignancies with minimally invasive focus.",
      icon: <BookOpen className="text-gold" size={32} />
    }
  ];

  return (
    <section id="services" className="py-32 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
            Specializations
          </span>
          <h2 className="text-4xl md:text-6xl mb-6">Areas of Clinical Excellence</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 border border-gold/10">
          {specializations.map((spec, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-navy p-12 hover:bg-white/5 transition-colors group"
            >
              <div className="mb-8 group-hover:scale-110 transition-transform duration-500">
                {spec.icon}
              </div>
              <h3 className="text-xl mb-4 font-serif">{spec.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {spec.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClinicalGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<null | number>(null);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
      title: "Advanced Endoscopy",
      category: "Clinical"
    },
    {
      url: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop",
      title: "Patient Consultation",
      category: "Practice"
    },
    {
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
      title: "SGPGI Medical Wing",
      category: "Institution"
    },
    {
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
      title: "Diagnostic Precision",
      category: "Technology"
    },
    {
      url: "https://images.unsplash.com/photo-1532187863486-abf9d39d99c5?q=80&w=2070&auto=format&fit=crop",
      title: "Clinical Research",
      category: "Academic"
    },
    {
      url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      title: "Collaborative Care",
      category: "Team"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-32 bg-slate/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block"
          >
            Visual Portfolio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl text-navy font-serif"
          >
            Clinical Gallery
          </motion.h2>
          <div className="h-1 w-20 bg-gold mx-auto mt-8"></div>
        </div>

        <div className="relative group">
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-4xl aspect-[16/9] relative cursor-pointer overflow-hidden shadow-2xl"
                onClick={() => setSelectedImage(currentIndex)}
              >
                <img 
                  src={images[currentIndex].url} 
                  alt={images[currentIndex].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                  <span className="text-gold text-xs uppercase tracking-widest mb-2 block font-bold">
                    {images[currentIndex].category}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-serif">
                    {images[currentIndex].title}
                  </h3>
                </div>
                <div className="absolute top-4 right-4 bg-navy/50 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={20} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white text-navy p-4 rounded-full shadow-xl hover:bg-gold transition-colors z-20 group"
          >
            <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white text-navy p-4 rounded-full shadow-xl hover:bg-gold transition-colors z-20 group"
          >
            <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 transition-all duration-500 ${currentIndex === idx ? "w-12 bg-gold" : "w-4 bg-navy/20"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-gold transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl w-full max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={images[selectedImage].url} 
                alt={images[selectedImage].title}
                className="w-full h-full object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="mt-8 text-center">
                <span className="text-gold text-sm uppercase tracking-widest mb-2 block font-bold">
                  {images[selectedImage].category}
                </span>
                <h3 className="text-white text-3xl font-serif">
                  {images[selectedImage].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const AcademicCredentials = () => {
  const credentials = [
    {
      degree: "DM in Gastroenterology",
      institution: "Sanjay Gandhi Post Graduate Institute of Medical Sciences (SGPGI)",
      year: "2024",
      description: "Specialized in advanced therapeutic endoscopy and hepatology."
    },
    {
      degree: "MD in Internal Medicine",
      institution: "King George's Medical University (KGMU)",
      year: "2021",
      description: "Distinction in clinical diagnostic procedures."
    },
    {
      degree: "MBBS",
      institution: "Armed Forces Medical College (AFMC)",
      year: "2018",
      description: "Gold medalist in Physiology and Clinical Medicine."
    }
  ];

  return (
    <section id="academics" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
            Academic Foundation
          </span>
          <h2 className="text-3xl md:text-5xl text-navy mb-6">Qualifications</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {credentials.map((cred, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-10 shadow-xl border-t-4 border-gold group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="mb-6">
                <Award className="text-gold group-hover:scale-110 transition-transform" size={40} />
              </div>
              <span className="text-gold text-[10px] uppercase tracking-widest font-bold block mb-2">
                {cred.year}
              </span>
              <h3 className="text-2xl text-navy font-serif mb-4 leading-tight">
                {cred.degree}
              </h3>
              <p className="text-navy/60 font-medium text-sm mb-4">
                {cred.institution}
              </p>
              <p className="text-slate/70 text-sm leading-relaxed">
                {cred.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-navy p-12 text-white"
          >
            <h3 className="text-2xl font-serif mb-8 text-gold">Certifications</h3>
            <ul className="space-y-6">
              {[
                "Board Certified in Advanced Endoscopy",
                "Fellow of the American College of Gastroenterology",
                "Certification in Liver Transplant Medicine",
                "Advanced Life Support (ALS) Certified"
              ].map((cert, i) => (
                <li key={i} className="flex items-start">
                  <ChevronRight className="text-gold mr-3 mt-1 shrink-0" size={16} />
                  <span className="text-gray-300 text-sm tracking-wide">{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-2 border-dashed border-gold/30 p-12 flex flex-col justify-center items-center text-center"
          >
            <FileText className="text-gold mb-6" size={48} />
            <h3 className="text-2xl font-serif mb-4 text-navy">Verified Credentials</h3>
            <p className="text-slate/60 text-sm mb-8 max-w-xs">
              All academic qualifications and clinical certifications are verified by the SGPGI Medical Board.
            </p>
            <button className="text-gold text-xs font-bold uppercase tracking-widest border-b border-gold pb-1 hover:text-navy hover:border-navy transition-all">
              Request Verification Dossier
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AcademicLedger = () => {
  const papers = [
    {
      journal: "The Lancet Gastroenterology",
      title: "Novel Endoscopic Approaches to Biliary Strictures: A 10-Year Retrospective Study at SGPGI",
      year: "2024"
    },
    {
      journal: "Journal of Hepatology",
      title: "Optimizing Biological Therapy in Refractory IBD: Precision Medicine in Quaternary Care",
      year: "2023"
    },
    {
      journal: "Gastrointestinal Endoscopy",
      title: "EUS-Guided Biliary Drainage: Technical Success and Long-term Outcomes in 500 Patients",
      year: "2022"
    }
  ];

  return (
    <section id="publications" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
              Advancing Science
            </span>
            <h2 className="text-4xl md:text-5xl text-navy leading-tight">
              The Academic Ledger: <br />
              Peer-Reviewed Contributions
            </h2>
          </div>
          <button className="text-navy uppercase tracking-widest text-xs font-bold border-b-2 border-gold pb-2 hover:text-gold transition-colors">
            View Full Bibliography
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {papers.map((paper, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-10 border-l-4 border-gold flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <span className="text-gold text-[10px] uppercase tracking-widest font-bold block mb-4">
                  {paper.journal} • {paper.year}
                </span>
                <h3 className="text-xl text-navy font-serif leading-snug">
                  {paper.title}
                </h3>
              </div>
              <div className="flex items-center text-navy/40 text-xs font-bold uppercase tracking-widest mt-8">
                Read Publication <ExternalLink className="ml-2" size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What are your primary areas of specialization?",
      answer: "I specialize in advanced therapeutic endoscopy, inflammatory bowel disease (IBD), and complex hepatobiliary disorders. My practice at SGPGI focuses on evidence-based gastroenterology with a focus on precision diagnostics."
    },
    {
      question: "How can I schedule a consultation at SGPGI?",
      answer: "Consultations are primarily handled through the SGPGI appointment system. For academic inquiries or specific clinical guidance, you may use the contact portal on this website to reach my executive team."
    },
    {
      question: "Do you offer second opinions for complex cases?",
      answer: "Yes, I frequently provide expert second opinions for complex gastrointestinal and liver conditions. Please ensure all previous medical records and diagnostic reports are available for a comprehensive review."
    },
    {
      question: "What is your approach to patient care?",
      answer: "My philosophy is rooted in 'Bespoke Clinical Care'—treating each patient as a unique case requiring a tailored, evidence-based strategy that integrates the latest academic research with clinical mastery."
    }
  ];

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block"
          >
            Common Inquiries
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl text-navy font-serif"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="h-1 w-20 bg-gold mx-auto mt-8"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-navy/5 rounded-lg overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-slate/5 hover:bg-slate/10 transition-colors"
              >
                <span className="text-navy font-medium md:text-lg pr-8">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="text-gold shrink-0" size={20} />
                ) : (
                  <Plus className="text-gold shrink-0" size={20} />
                )}
              </button>
              {openIndex === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="p-6 bg-white border-t border-navy/5"
                >
                  <p className="text-slate/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formState.subject.trim()) newErrors.subject = "Subject is required";
    if (!formState.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-6xl text-navy mb-8 leading-tight">
              Executive <br />
              Contact Portal
            </h2>
            <p className="text-slate/70 text-lg mb-12 leading-relaxed">
              For professional inquiries, academic collaborations, or private clinical consultations, please utilize the secure portal below.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-navy p-4 text-gold mr-6">
                  <Mail size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">Email</span>
                  <span className="text-navy font-medium">contact@drabhishryraj.com</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-navy p-4 text-gold mr-6">
                  <Phone size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">Direct Line</span>
                  <span className="text-navy font-medium">+91 (522) 266-8000</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-navy p-4 text-gold mr-6">
                  <MapPin size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold block mb-1">Clinical Location</span>
                  <span className="text-navy font-medium">Department of Gastroenterology, SGPGI, Lucknow</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 shadow-2xl border-t-8 border-gold"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col justify-center items-center text-center py-20">
                <div className="bg-gold/10 p-6 rounded-full mb-6">
                  <ChevronRight className="text-gold rotate-90" size={48} />
                </div>
                <h3 className="text-2xl text-navy font-serif mb-4">Message Received</h3>
                <p className="text-slate/60">Your inquiry has been logged. Our office will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-navy font-bold">Full Name</label>
                    <input 
                      type="text" 
                      className={`w-full bg-gray-50 border-b ${errors.name ? 'border-red-500' : 'border-navy/10'} py-3 px-4 focus:border-gold outline-none transition-colors`}
                      value={formState.name}
                      onChange={(e) => {
                        setFormState({...formState, name: e.target.value});
                        if (errors.name) setErrors({...errors, name: ""});
                      }}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] uppercase tracking-wider">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-navy font-bold">Email Address</label>
                    <input 
                      type="email" 
                      className={`w-full bg-gray-50 border-b ${errors.email ? 'border-red-500' : 'border-navy/10'} py-3 px-4 focus:border-gold outline-none transition-colors`}
                      value={formState.email}
                      onChange={(e) => {
                        setFormState({...formState, email: e.target.value});
                        if (errors.email) setErrors({...errors, email: ""});
                      }}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] uppercase tracking-wider">{errors.email}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-navy font-bold">Subject</label>
                  <input 
                    type="text" 
                    className={`w-full bg-gray-50 border-b ${errors.subject ? 'border-red-500' : 'border-navy/10'} py-3 px-4 focus:border-gold outline-none transition-colors`}
                    value={formState.subject}
                    onChange={(e) => {
                      setFormState({...formState, subject: e.target.value});
                      if (errors.subject) setErrors({...errors, subject: ""});
                    }}
                  />
                  {errors.subject && <p className="text-red-500 text-[10px] uppercase tracking-wider">{errors.subject}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-navy font-bold">Message</label>
                  <textarea 
                    rows={4}
                    className={`w-full bg-gray-50 border-b ${errors.message ? 'border-red-500' : 'border-navy/10'} py-3 px-4 focus:border-gold outline-none transition-colors resize-none`}
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({...formState, message: e.target.value});
                      if (errors.message) setErrors({...errors, message: ""});
                    }}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-[10px] uppercase tracking-wider">{errors.message}</p>}
                </div>
                <button type="submit" className="w-full bg-navy text-white py-5 text-sm uppercase tracking-widest font-bold hover:bg-gold hover:text-navy transition-all duration-500 shadow-xl">
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Affiliation = () => {
  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-10 opacity-40 grayscale inline-block">
          {/* Placeholder for SGPGI Crest */}
          <div className="h-20 w-20 border-2 border-navy rounded-full flex items-center justify-center text-xs text-navy font-bold">
            SGPGI
          </div>
        </div>
        <h2 className="text-2xl text-navy font-serif mb-6 italic">Statement of Affiliation</h2>
        <p className="text-slate/60 leading-relaxed">
          Dr. Abhishrey Raj serves as a Specialist member at the Sanjay Gandhi Post Graduate Institute of Medical Sciences (SGPGI), Lucknow. As a premier quaternary care center, SGPGI represents the pinnacle of medical research and clinical excellence in India. Consultations are conducted with the exclusivity and rigor inherent to this institution.
        </p>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <span className="text-2xl font-serif text-gold block mb-4">Dr. Abhishrey Raj</span>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed mb-8">
              Redefining gastroenterology through academic excellence and precision intervention at SGPGI.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gold hover:text-white transition-colors"><Mail size={20} /></a>
              <a href="#" className="text-gold hover:text-white transition-colors"><Phone size={20} /></a>
              <a href="#" className="text-gold hover:text-white transition-colors"><MapPin size={20} /></a>
            </div>
          </div>
          
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-gold block mb-8">Navigation</span>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-gold transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Services</a></li>
              <li><a href="#academics" className="hover:text-gold transition-colors">Academics</a></li>
              <li><a href="#publications" className="hover:text-gold transition-colors">Publications</a></li>
              <li><a href="#reviews" className="hover:text-gold transition-colors">Reviews</a></li>
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-gold block mb-8">Location</span>
            <p className="text-sm text-gray-400 leading-relaxed">
              Department of Gastroenterology,<br />
              SGPGI, Raebareli Road,<br />
              Lucknow, UP 226014
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              className="text-gold text-xs font-bold uppercase tracking-widest mt-4 inline-block border-b border-gold"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          <span>&copy; 2026 Dr. Abhishrey Raj. All Rights Reserved.</span>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ConciergeButton = () => {
  return (
    <motion.a
      href="#contact"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50 bg-gold text-navy p-5 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <MessageSquare size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 text-xs uppercase tracking-widest font-bold whitespace-nowrap">
        Contact
      </span>
    </motion.a>
  );
};

const CustomVideoPlayer = ({ src, thumbnail }: { src: string; thumbnail: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(Number(e.target.value));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      className="relative aspect-video bg-navy group overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video 
        ref={videoRef}
        src={src} 
        poster={thumbnail}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
      />
      
      <AnimatePresence>
        {(showControls || !isPlaying) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 flex flex-col justify-between p-4"
          >
            <div className="flex-grow flex items-center justify-center">
              <button 
                onClick={togglePlay}
                className="bg-gold text-navy p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
              >
                {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} />}
              </button>
            </div>

            <div className="space-y-3">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={progress} 
                onChange={handleProgressChange}
                className="w-full h-1 bg-white/30 accent-gold cursor-pointer appearance-none rounded-full"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button onClick={togglePlay} className="text-white hover:text-gold transition-colors">
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button onClick={toggleMute} className="text-white hover:text-gold transition-colors">
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>
                <div className="text-[10px] text-white font-mono uppercase tracking-widest">
                  {videoRef.current ? 
                    `${Math.floor(videoRef.current.currentTime / 60)}:${Math.floor(videoRef.current.currentTime % 60).toString().padStart(2, '0')} / ${Math.floor(videoRef.current.duration / 60)}:${Math.floor(videoRef.current.duration % 60).toString().padStart(2, '0')}` 
                    : '0:00 / 0:00'}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TestimonialForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
    type: "text"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formState.message.trim()) newErrors.message = "Message is required";
    if (formState.message.length < 20) newErrors.message = "Message must be at least 20 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormState({ name: "", email: "", rating: 5, message: "", type: "text" });
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-navy p-12 text-center rounded-2xl border border-gold/20"
      >
        <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ChevronRight className="text-gold rotate-90" size={40} />
        </div>
        <h3 className="text-2xl text-white font-serif mb-4">Thank You for Sharing</h3>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Your testimonial has been submitted for review. We appreciate your feedback and trust in our care.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-gold uppercase tracking-widest text-xs font-bold hover:text-white transition-colors"
        >
          Submit Another Story
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate/5 p-8 md:p-12 rounded-2xl border border-navy/5">
      <div className="mb-10">
        <h3 className="text-3xl text-navy font-serif mb-2">Share Your Story</h3>
        <p className="text-slate/50">Your experience helps others find the care they need.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-navy font-bold">Full Name</label>
            <input 
              type="text" 
              className={`w-full bg-white border-b ${errors.name ? 'border-red-500' : 'border-navy/10'} py-3 px-4 focus:border-gold outline-none transition-colors`}
              value={formState.name}
              onChange={(e) => setFormState({...formState, name: e.target.value})}
            />
            {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-navy font-bold">Email Address</label>
            <input 
              type="email" 
              className={`w-full bg-white border-b ${errors.email ? 'border-red-500' : 'border-navy/10'} py-3 px-4 focus:border-gold outline-none transition-colors`}
              value={formState.email}
              onChange={(e) => setFormState({...formState, email: e.target.value})}
            />
            {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-navy font-bold block mb-4">Overall Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormState({...formState, rating: star})}
                className="transition-transform hover:scale-110"
              >
                <Star 
                  size={24} 
                  className={star <= formState.rating ? "text-gold fill-gold" : "text-gray-300"} 
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-navy font-bold">Your Experience</label>
          <textarea 
            rows={4}
            className={`w-full bg-white border-b ${errors.message ? 'border-red-500' : 'border-navy/10'} py-3 px-4 focus:border-gold outline-none transition-colors resize-none`}
            placeholder="Tell us about your recovery journey..."
            value={formState.message}
            onChange={(e) => setFormState({...formState, message: e.target.value})}
          ></textarea>
          {errors.message && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-navy text-white py-5 text-sm uppercase tracking-widest font-bold hover:bg-gold hover:text-navy transition-all duration-500 shadow-xl disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Submit Testimonial"}
        </button>
      </form>
    </div>
  );
};

const FloatingPatient = ({ patient, quote, role, image, position }: { patient: string; quote: string; role: string; image: string; position: { top: string; left: string }; key?: number }) => {
  const isLeft = parseInt(position.left) < 30;
  const isRight = parseInt(position.left) > 70;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: Math.random() * 1.5,
        ease: "easeOut"
      }}
      className="absolute group hidden lg:block pointer-events-auto"
      style={{ 
        top: position.top, 
        left: position.left,
        zIndex: 20
      }}
      whileHover={{ zIndex: 50 }}
    >
      <div className="relative">
        {/* Profile Pic */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 rounded-full border-4 border-white shadow-2xl overflow-hidden cursor-pointer hover:scale-110 transition-transform duration-500 ring-1 ring-gold/20"
        >
          <img src={image} alt={patient} className="w-full h-full object-cover" />
        </motion.div>

        {/* Popup Testimonial */}
        <div className={`absolute bottom-full mb-6 w-72 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-50
          ${isLeft ? 'left-0' : isRight ? 'right-0' : 'left-1/2 -translate-x-1/2'}`}
        >
          <div className="bg-white p-6 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.25)] border border-gold/10 relative">
            <Quote className="text-gold/20 absolute top-4 right-4" size={24} />
            <p className="text-navy text-sm italic leading-relaxed mb-4 relative z-10">"{quote}"</p>
            <div className="flex flex-col border-t border-gold/10 pt-3">
              <span className="text-navy font-bold text-xs">{patient}</span>
              <span className="text-gold text-[10px] uppercase tracking-widest font-medium">{role}</span>
            </div>
            {/* Arrow */}
            <div className={`absolute top-full w-4 h-4 bg-white border-r border-b border-gold/10 rotate-45 -mt-2
              ${isLeft ? 'left-6' : isRight ? 'right-6' : 'left-1/2 -translate-x-1/2'}`}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const floatingPatients = [
    {
      patient: "Dr. Priya Singh",
      role: "Resident Colleague",
      quote: "A brilliant mind and a great team player. His contribution to our department's research projects has been invaluable.",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop",
      position: { top: "0%", left: "10%" }
    },
    {
      patient: "Amit Khanna",
      role: "Patient",
      quote: "The care I received was exceptional. Dr. Raj explained everything so clearly and the recovery was faster than expected.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
      position: { top: "5%", left: "85%" }
    },
    {
      patient: "Suman Lata",
      role: "Patient",
      quote: "Highly recommended for any gastric issues. Very professional and empathetic approach throughout the treatment.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
      position: { top: "40%", left: "5%" }
    },
    {
      patient: "Vikram Seth",
      role: "Patient",
      quote: "Best doctor in Lucknow. Very patient and knowledgeable. He really takes the time to listen to your concerns.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      position: { top: "45%", left: "88%" }
    },
    {
      patient: "Anjali Rao",
      role: "Patient",
      quote: "The recovery was smooth thanks to the precise diagnosis and the follow-up care provided by Dr. Raj.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
      position: { top: "80%", left: "15%" }
    },
    {
      patient: "Rajesh Mehra",
      role: "Patient",
      quote: "Dr. Raj's expertise in endoscopy is unmatched. I felt completely at ease during the entire procedure.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      position: { top: "85%", left: "80%" }
    }
  ];

  const reviews = [
    {
      type: "video",
      title: "Life-Changing Procedure",
      patient: "Rajesh Kumar",
      date: "March 2024",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-doctor-checking-a-patient-in-a-hospital-41224-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
      desc: "Dr. Raj's expertise in endoscopy saved me from a major surgery. The recovery was incredibly fast."
    },
    {
      type: "text",
      title: "Exceptional Care",
      patient: "Suman Sharma",
      date: "February 2024",
      content: "I was struggling with chronic IBD for years. Dr. Raj's evidence-based approach and personalized care plan have finally given me my life back. His attention to detail is unmatched.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
    },
    {
      type: "image",
      title: "Recovery Journey",
      patient: "Amit Singh",
      date: "January 2024",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop",
      desc: "The diagnostic precision at SGPGI under Dr. Raj's guidance was the turning point in my treatment."
    },
    {
      type: "video",
      title: "Professional & Compassionate",
      patient: "Priya Verma",
      date: "December 2023",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-medical-professional-talking-to-a-patient-41221-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      desc: "He explains everything so clearly. I felt completely safe and informed throughout my treatment."
    },
    {
      type: "text",
      title: "Highly Recommended",
      patient: "Vikram Malhotra",
      date: "November 2023",
      content: "The best gastroenterologist in Lucknow. His academic background really shows in his diagnostic accuracy.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      type: "image",
      title: "Grateful Patient",
      patient: "Anjali Gupta",
      date: "October 2023",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
      desc: "The care I received for my liver condition was outstanding. Truly bespoke clinical care."
    }
  ];

  return (
    <div className="pt-32 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 relative">
          {/* Floating Patients - Limited to Header Area */}
          <div className="absolute inset-0 -mx-6 pointer-events-none overflow-visible">
            {floatingPatients.map((p, i) => (
              <FloatingPatient 
                key={i} 
                patient={p.patient}
                quote={p.quote}
                role={p.role}
                image={p.image}
                position={p.position}
              />
            ))}
          </div>

          <div className="relative z-10 pointer-events-auto">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block"
            >
              Patient Voices
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl text-navy font-serif mb-8"
            >
              Testimonials
            </motion.h1>
            <p className="text-slate/60 max-w-2xl mx-auto text-lg leading-relaxed">
              Real stories of recovery and clinical excellence from patients who have experienced Dr. Abhishrey Raj's bespoke care.
            </p>
            <div className="h-1 w-20 bg-gold mx-auto mt-12"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate/5 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-navy/5 flex flex-col"
            >
              {review.type === "video" ? (
                <CustomVideoPlayer src={review.videoUrl!} thumbnail={review.thumbnail!} />
              ) : review.image ? (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={review.image} 
                    alt={review.patient}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ) : null}

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-gold text-[8px] uppercase tracking-widest font-bold mb-1 block">
                      {review.date}
                    </span>
                    <h3 className="text-lg text-navy font-serif leading-tight">{review.title}</h3>
                  </div>
                  <Quote className="text-gold/20" size={24} />
                </div>
                
                <p className="text-slate/70 text-sm leading-relaxed mb-6 italic flex-grow">
                  "{review.content || review.desc}"
                </p>
                
                <div className="flex items-center space-x-3 pt-6 border-t border-navy/10">
                  <div className="h-8 w-8 bg-navy rounded-full flex items-center justify-center text-gold font-bold text-sm">
                    {review.patient[0]}
                  </div>
                  <div>
                    <p className="text-navy font-bold tracking-wide text-xs">{review.patient}</p>
                    <p className="text-slate/50 text-[8px] uppercase tracking-widest">Verified Patient</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <TestimonialForm />
        </div>
      </div>
    </div>
  );
};

const TrustedByLeaders = () => {
  const navigate = useNavigate();
  
  const featuredReviews = [
    {
      quote: "Dr. Raj's approach is clinical mastery combined with an executive level of communication. He treats the patient, not just the diagnosis.",
      role: "SENIOR PARTNER, NATIONAL LAW FIRM"
    },
    {
      quote: "The precision of his intervention saved months of recovery. A true asset to the medical fraternity at SGPGI.",
      role: "OFFICE OF THE DGP, UTTAR PRADESH"
    },
    {
      quote: "His academic contributions to hepatology are matched only by his surgical dexterity. A leader in the field.",
      role: "DIRECTOR, QUATERNARY CARE CENTER"
    }
  ];

  return (
    <section id="reviews" className="py-32 bg-navy relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl text-white font-serif mb-6"
          >
            Trusted by Leaders
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gold/60 text-lg md:text-xl tracking-widest uppercase font-light"
          >
            Discreet, definitive care for those who demand excellence.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {featuredReviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 p-10 backdrop-blur-sm flex flex-col justify-between group hover:border-gold/30 transition-all duration-500"
            >
              <div>
                <Quote className="text-gold/20 mb-8 group-hover:text-gold/40 transition-colors duration-500" size={48} />
                <p className="text-white/80 text-lg leading-relaxed italic mb-12">
                  "{review.quote}"
                </p>
              </div>
              <div>
                <div className="h-px w-12 bg-gold/30 mb-6"></div>
                <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold leading-tight">
                  {review.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate("/testimonials")}
            className="inline-flex items-center space-x-4 text-gold group"
          >
            <span className="text-xs uppercase tracking-[0.4em] font-bold border-b border-gold/30 pb-1 group-hover:border-gold transition-all duration-500">
              View All Patient Stories
            </span>
            <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const id = (location.state as any).scrollTo;
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <PrestigeStrip />
      <ClinicalPhilosophy />
      <ClinicalExcellence />
      <ClinicalGallery />
      <AcademicCredentials />
      <AcademicLedger />
      <TrustedByLeaders />
      <FAQSection />
      <ContactSection />
      <Affiliation />
    </main>
  );
};

export default function App() {
  return (
    <Router>
      <div className="selection:bg-gold selection:text-navy">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>
        <Footer />
        <ConciergeButton />
      </div>
    </Router>
  );
}
