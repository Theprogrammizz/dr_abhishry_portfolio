import { motion } from "motion/react";
import { 
  Stethoscope, 
  BookOpen, 
  Award, 
  FileText, 
  ChevronRight, 
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  ExternalLink,
  Quote
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "glass-navy py-4 shadow-2xl" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className={`text-2xl font-serif tracking-tight transition-colors duration-300 ${isScrolled ? "text-white" : "text-navy"}`}>
            Dr. Abhishry Raj
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
            Gastroenterologist
          </span>
        </motion.div>

        <div className="hidden md:flex items-center space-x-10">
          {[
            { label: "About", id: "about" },
            { label: "Services", id: "services" },
            { label: "Academics", id: "academics" },
            { label: "Publications", id: "publications" },
            { label: "Reviews", id: "reviews" }
          ].map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className={`text-xs uppercase tracking-widest font-medium hover:text-gold transition-colors ${isScrolled ? "text-gray-300" : "text-navy"}`}
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" className="bg-gold text-navy px-6 py-2.5 text-xs uppercase tracking-widest font-bold hover:bg-white transition-all duration-300 shadow-lg">
            Contact
          </a>
        </div>

        <button 
          className="md:hidden text-gold"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-navy border-t border-gold/20 p-8 flex flex-col space-y-6 md:hidden"
        >
          {[
            { label: "About", id: "about" },
            { label: "Services", id: "services" },
            { label: "Academics", id: "academics" },
            { label: "Publications", id: "publications" },
            { label: "Reviews", id: "reviews" }
          ].map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className="text-white text-sm uppercase tracking-widest font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-gold text-navy px-6 py-4 text-sm uppercase tracking-widest font-bold text-center">
            Contact Me
          </a>
        </motion.div>
      )}
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
          alt="Dr. Abhishry Raj"
          className="w-full h-full object-cover object-center opacity-70 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 pt-16 pb-16 md:py-24 relative bg-white flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-xl w-full"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-[1px] w-8 bg-gold/50"></div>
            <span className="text-gold uppercase tracking-[0.4em] text-[9px] md:text-xs font-bold block">
              Bespoke Clinical Care
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-navy mb-6 md:mb-8 leading-[1.2] tracking-tight font-serif">
            The Intersection of <br />
            <span className="italic text-gold/80">Academic Rigor</span> <br />
            and Clinical Mastery.
          </h1>
          
          <p className="text-slate/70 text-xs sm:text-sm md:text-lg mb-8 md:mb-12 leading-relaxed max-w-md">
            Pioneering advanced therapeutic endoscopy and evidence-based gastroenterology at SGPGI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-6">
            <a href="#contact" className="bg-navy text-white px-6 md:px-10 py-3 md:py-5 text-[10px] md:text-sm uppercase tracking-widest font-bold hover:bg-gold hover:text-navy transition-all duration-500 shadow-xl flex items-center justify-center group">
              Contact Me
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </a>
            <button className="border border-navy/10 text-navy px-6 md:px-10 py-3 md:py-5 text-[10px] md:text-sm uppercase tracking-widest font-bold hover:bg-navy/5 transition-all duration-300">
              Academic Portfolio
            </button>
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
            {[
              { label: "Specialist Year", value: "2nd" },
              { label: "Endoscopies", value: "2k+" },
              { label: "Publications", value: "12+" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-3xl font-serif text-navy mb-1">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{stat.label}</span>
              </div>
            ))}
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
          <h2 className="text-4xl md:text-6xl text-navy mb-6">Qualifications & Credentials</h2>
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

const Testimonials = () => {
  const reviews = [
    {
      name: "Senior Partner, National Law Firm",
      text: "Dr. Raj's approach is clinical mastery combined with an executive level of communication. He treats the patient, not just the diagnosis.",
    },
    {
      name: "Office of the DGP, Uttar Pradesh",
      text: "The precision of his intervention saved months of recovery. A true asset to the medical fraternity at SGPGI.",
    },
    {
      name: "Director, Quaternary Care Center",
      text: "His academic contributions to hepatology are matched only by his surgical dexterity. A leader in the field.",
    }
  ];

  return (
    <section id="reviews" className="py-32 bg-navy text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
            Social Proof
          </span>
          <h2 className="text-4xl md:text-6xl mb-6">Trusted by Leaders</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Discreet, definitive care for those who demand excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-12 bg-white/5 border border-white/10"
            >
              <Quote className="text-gold/20 absolute top-8 left-8" size={60} />
              <p className="text-lg text-gray-300 italic mb-10 leading-relaxed relative z-10">
                "{rev.text}"
              </p>
              <div className="border-t border-gold/30 pt-6">
                <span className="text-gold text-[10px] uppercase tracking-widest font-bold">
                  {rev.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-navy font-bold">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-gray-50 border-b border-navy/10 py-3 px-4 focus:border-gold outline-none transition-colors"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-navy font-bold">Email Address</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-gray-50 border-b border-navy/10 py-3 px-4 focus:border-gold outline-none transition-colors"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-navy font-bold">Subject</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-gray-50 border-b border-navy/10 py-3 px-4 focus:border-gold outline-none transition-colors"
                    value={formState.subject}
                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-navy font-bold">Message</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-gray-50 border-b border-navy/10 py-3 px-4 focus:border-gold outline-none transition-colors resize-none"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  ></textarea>
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
          Dr. Abhishry Raj serves as a Specialist member at the Sanjay Gandhi Post Graduate Institute of Medical Sciences (SGPGI), Lucknow. As a premier quaternary care center, SGPGI represents the pinnacle of medical research and clinical excellence in India. Consultations are conducted with the exclusivity and rigor inherent to this institution.
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
            <span className="text-2xl font-serif text-gold block mb-4">Dr. Abhishry Raj</span>
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
          <span>&copy; 2026 Dr. Abhishry Raj. All Rights Reserved.</span>
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

export default function App() {
  return (
    <div className="selection:bg-gold selection:text-navy">
      <Navbar />
      <main>
        <Hero />
        <PrestigeStrip />
        <ClinicalPhilosophy />
        <ClinicalExcellence />
        <AcademicCredentials />
        <AcademicLedger />
        <Testimonials />
        <ContactSection />
        <Affiliation />
      </main>
      <Footer />
      <ConciergeButton />
    </div>
  );
}
