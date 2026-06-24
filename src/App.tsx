import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Compass, 
  Crown, 
  Sparkles, 
  ShoppingBag, 
  X, 
  Check, 
  Plus, 
  Minus, 
  Trash2, 
  User, 
  ArrowRight, 
  Flame, 
  Activity, 
  Droplets, 
  Award, 
  Lock, 
  Eye, 
  Smartphone, 
  Clock, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Calendar,
  Sparkle,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Product, CartItem, MemberProfile } from './types';
import { PRODUCTS, CATEGORIES, BENEFITS, TESTIMONIALS, HERO_BG, BRAND_LOGO } from './data';

export default function App() {
  // State
  const [isAgeVerified, setIsAgeVerified] = useState<boolean | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'flower' | 'edible' | 'vape' | 'oil'>('all');
  const [sommelierMood, setSommelierMood] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Membership Form States
  const [memberName, setMemberName] = useState<string>('');
  const [memberEmail, setMemberEmail] = useState<string>('');
  const [memberPhone, setMemberPhone] = useState<string>('');
  const [memberDob, setMemberDob] = useState<string>('');
  const [memberTier, setMemberTier] = useState<'Vanguard' | 'Collector' | 'Private Circle'>('Vanguard');
  const [memberProfile, setMemberProfile] = useState<MemberProfile | null>(null);
  const [isSubmittingMember, setIsSubmittingMember] = useState<boolean>(false);

  // Contact Form States
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactInquiryType, setContactInquiryType] = useState<string>('Private Drop Access');
  const [contactSubject, setContactSubject] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [isSubmittingContact, setIsSubmittingContact] = useState<boolean>(false);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  
  // Checking local storage on initial mount
  useEffect(() => {
    const ageVerified = localStorage.getItem('dada_age_verified');
    if (ageVerified === 'true') {
      setIsAgeVerified(true);
    } else if (ageVerified === 'false') {
      setIsAgeVerified(false);
    }
    
    // Retrieve cart
    const savedCart = localStorage.getItem('dada_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart', e);
      }
    }

    // Retrieve membership
    const savedMember = localStorage.getItem('dada_member_profile');
    if (savedMember) {
      try {
        setMemberProfile(JSON.parse(savedMember));
      } catch (e) {
        console.error('Error loading member', e);
      }
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    localStorage.setItem('dada_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle Age Verification
  const verifyAge = (verified: boolean) => {
    setIsAgeVerified(verified);
    localStorage.setItem('dada_age_verified', verified ? 'true' : 'false');
  };

  // Immediate navigation to specific section / page view
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement> | null, id: string) => {
    if (e) e.preventDefault();
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'auto' // Instant jump to top of the new view
    });
  };

  // Add Item to Cart
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    // Open cart drawer for feedback
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  // Remove Item from Cart
  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // Handle Membership Registration
  const handleRegisterMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName || !memberEmail || !memberDob) return;

    setIsSubmittingMember(true);
    
    setTimeout(() => {
      const randomId = 'DADA-' + Math.floor(100000 + Math.random() * 900000);
      const newProfile: MemberProfile = {
        name: memberName,
        email: memberEmail,
        phone: memberPhone,
        dob: memberDob,
        tier: memberTier,
        memberId: randomId,
        joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };
      setMemberProfile(newProfile);
      localStorage.setItem('dada_member_profile', JSON.stringify(newProfile));
      setIsSubmittingMember(false);
    }, 1500);
  };

  // Handle Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsSubmittingContact(true);

    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSubmitted(true);
      // Reset inputs after delay
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    }, 1500);
  };

  // Reset Member Profile
  const resetMembership = () => {
    setMemberProfile(null);
    localStorage.removeItem('dada_member_profile');
    setMemberName('');
    setMemberEmail('');
    setMemberPhone('');
    setMemberDob('');
  };

  // Calculate cart total
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products by category
  const filteredProducts = categoryFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === categoryFilter);

  // Sommelier recommendations
  const getSommelierRecommendation = () => {
    switch (sommelierMood) {
      case 'creative':
        return PRODUCTS.filter(p => p.effects.some(e => e.includes('Focus') || e.includes('Creativity') || e.includes('Sensory')));
      case 'relax':
        return PRODUCTS.filter(p => p.effects.some(e => e.includes('Ease') || e.includes('Sedation') || e.includes('Tranquility')));
      case 'energize':
        return PRODUCTS.filter(p => p.effects.some(e => e.includes('Uplift') || e.includes('Electric') || e.includes('Clarity')));
      case 'restore':
        return PRODUCTS.filter(p => p.effects.some(e => e.includes('Stillness') || e.includes('Somatic') || e.includes('Anti-Inflammatory')));
      default:
        return [];
    }
  };

  // Help map icons dynamically from benefits array
  const renderBenefitIcon = (name: string) => {
    switch (name) {
      case 'Shield': return <Shield className="w-6 h-6 text-brand-gold-400" id="benefit-icon-shield" />;
      case 'Compass': return <Compass className="w-6 h-6 text-brand-gold-400" id="benefit-icon-compass" />;
      case 'Crown': return <Crown className="w-6 h-6 text-brand-gold-400" id="benefit-icon-crown" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-brand-gold-400" id="benefit-icon-sparkles" />;
      default: return <Sparkle className="w-6 h-6 text-brand-gold-400" id="benefit-icon-default" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-black-950 text-neutral-200 selection:bg-brand-gold-500 selection:text-brand-black-950 font-sans relative antialiased">
      
      {/* 1. AGE GATE OVERLAY */}
      <AnimatePresence>
        {isAgeVerified === null && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            id="age-gate-container"
          >
            <div className="max-w-md w-full bg-brand-black-900 border border-brand-green-500/30 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden shadow-2xl shadow-brand-green-950/40">
              {/* Background elegant dust */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-green-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-green-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Brand Logo inside Age Gate */}
                <div className="relative w-24 h-24 mx-auto mb-6 rounded-full border border-brand-green-500/30 overflow-hidden bg-brand-black-950 p-1 flex items-center justify-center shadow-lg shadow-brand-green-950/50">
                  <img src={BRAND_LOGO} alt="Dada's Dispensary Logo" className="w-full h-full object-cover rounded-full filter brightness-95 contrast-110" referrerPolicy="no-referrer" />
                </div>
                <span className="inline-block text-2xl font-serif tracking-[0.25em] text-brand-green-400 mb-2">DADA’S</span>
                <div className="h-[1px] w-12 bg-brand-green-500/30 mx-auto mb-6" />

                <h2 className="text-3xl font-serif text-white tracking-wide mb-3">VERIFY YOUR AGE</h2>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                  You must be <span className="text-brand-green-400 font-medium font-mono">18 years or older</span> to access the Dada’s Dispensary digital collection, exclusive strain drops, and members-only circles.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    onClick={() => verifyAge(true)}
                    className="flex-1 py-3.5 bg-brand-green-600 hover:bg-brand-green-500 text-white font-serif font-semibold tracking-wider rounded-xl transition duration-300 transform active:scale-[0.98] focus:outline-none focus:ring-1 focus:ring-brand-green-500 cursor-pointer shadow-lg shadow-brand-green-900/10"
                    id="age-gate-yes"
                  >
                    I AM 18 OR OLDER
                  </button>
                  <button
                    onClick={() => verifyAge(false)}
                    className="flex-1 py-3.5 bg-brand-black-800 hover:bg-brand-black-700 text-neutral-300 font-serif tracking-wider rounded-xl border border-neutral-700/50 transition duration-300 focus:outline-none"
                    id="age-gate-no"
                  >
                    NO, I AM UNDER 18
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 tracking-wider">
                  <Lock className="w-3 h-3 text-brand-green-500/70" />
                  <span>SECURE DISPENSARY COMPLIANCE</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BLOCKED AGE SCREEN */}
      {isAgeVerified === false && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black-950 p-4 text-center">
          <div className="max-w-md w-full bg-brand-black-900 border border-red-500/30 rounded-2xl p-8 shadow-2xl">
            <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-white mb-4">ACCESS DENIED</h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Dada’s Dispensary strictly complies with legal regulations governing cannabis. You must be 18+ to access our products, deliveries, and boutique membership space.
            </p>
            <button 
              onClick={() => {
                localStorage.removeItem('dada_age_verified');
                setIsAgeVerified(null);
              }}
              className="text-brand-gold-400 font-serif hover:underline text-sm uppercase tracking-wider"
              id="age-gate-retry"
            >
              Re-verify credentials
            </button>
          </div>
        </div>
      )}

      {/* MAIN APPLICATION (Only visible if age is verified) */}
      {isAgeVerified === true && (
        <>
          {/* BACKGROUND SMOKE DECORATION */}
          <div className="absolute top-0 left-0 right-0 h-[80vh] overflow-hidden pointer-events-none z-0 select-none opacity-40">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-gold-500/5 rounded-full blur-[140px]" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-brand-gold-600/5 rounded-full blur-[160px]" />
          </div>

          {/* LUXURY NAVIGATION BAR */}
          <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-black-950/80 backdrop-blur-md border-b border-brand-gold-500/10" id="main-navigation">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              
              {/* BRAND INITIALS/LOGO */}
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center gap-3 group focus:outline-none">
                <div className="w-10 h-10 border border-brand-gold-500/30 rounded-lg overflow-hidden bg-brand-black-900 flex items-center justify-center group-hover:border-brand-gold-500 transition duration-300 p-0.5 shadow-md">
                  <img src={BRAND_LOGO} alt="Dada's Logo" className="w-full h-full object-cover rounded-md filter brightness-95" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-white font-medium tracking-[0.2em] text-sm group-hover:text-brand-gold-400 transition duration-300">DADA’S</span>
                  <span className="text-[9px] text-neutral-500 tracking-[0.1em] font-mono">DISPENSARY</span>
                </div>
              </a>

              {/* NAV LINKS - Large screens */}
              <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.15em] font-serif">
                <a 
                  href="#home" 
                  onClick={(e) => scrollToSection(e, 'home')}
                  className={`hover:text-brand-green-400 transition duration-300 relative ${activeSection === 'home' ? 'text-brand-green-400 font-semibold' : 'text-neutral-400'}`}
                >
                  HOME
                  {activeSection === 'home' && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brand-green-500 shadow-[0_0_8px_rgba(69,171,77,0.6)]" />}
                </a>
                <a 
                  href="#story" 
                  onClick={(e) => scrollToSection(e, 'story')}
                  className={`hover:text-brand-green-400 transition duration-300 relative ${activeSection === 'story' ? 'text-brand-green-400 font-semibold' : 'text-neutral-400'}`}
                >
                  STORY
                  {activeSection === 'story' && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brand-green-500 shadow-[0_0_8px_rgba(69,171,77,0.6)]" />}
                </a>
                <a 
                  href="#about" 
                  onClick={(e) => scrollToSection(e, 'about')}
                  className={`hover:text-brand-green-400 transition duration-300 relative ${activeSection === 'about' ? 'text-brand-green-400 font-semibold' : 'text-neutral-400'}`}
                >
                  ABOUT US
                  {activeSection === 'about' && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brand-green-500 shadow-[0_0_8px_rgba(69,171,77,0.6)]" />}
                </a>
                <a 
                  href="#categories" 
                  onClick={(e) => scrollToSection(e, 'categories')}
                  className={`hover:text-brand-green-400 transition duration-300 relative ${activeSection === 'categories' ? 'text-brand-green-400 font-semibold' : 'text-neutral-400'}`}
                >
                  CATEGORIES
                  {activeSection === 'categories' && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brand-green-500 shadow-[0_0_8px_rgba(69,171,77,0.6)]" />}
                </a>
                <a 
                  href="#strains" 
                  onClick={(e) => scrollToSection(e, 'strains')}
                  className={`hover:text-brand-green-400 transition duration-300 relative ${activeSection === 'strains' ? 'text-brand-green-400 font-semibold' : 'text-neutral-400'}`}
                >
                  CURATED STRAINS
                  {activeSection === 'strains' && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brand-green-500 shadow-[0_0_8px_rgba(69,171,77,0.6)]" />}
                </a>
                <a 
                  href="#circle" 
                  onClick={(e) => scrollToSection(e, 'circle')}
                  className={`hover:text-brand-green-400 transition duration-300 relative ${activeSection === 'circle' ? 'text-brand-green-400 font-semibold' : 'text-neutral-400'}`}
                >
                  DADA CIRCLE
                  {activeSection === 'circle' && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brand-green-500 shadow-[0_0_8px_rgba(69,171,77,0.6)]" />}
                </a>
                <a 
                  href="#trust" 
                  onClick={(e) => scrollToSection(e, 'trust')}
                  className={`hover:text-brand-green-400 transition duration-300 relative ${activeSection === 'trust' ? 'text-brand-green-400 font-semibold' : 'text-neutral-400'}`}
                >
                  RESPONSIBILITY
                  {activeSection === 'trust' && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brand-green-500 shadow-[0_0_8px_rgba(69,171,77,0.6)]" />}
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className={`hover:text-brand-green-400 transition duration-300 relative ${activeSection === 'contact' ? 'text-brand-green-400 font-semibold' : 'text-neutral-400'}`}
                >
                  CONTACT
                  {activeSection === 'contact' && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brand-green-500 shadow-[0_0_8px_rgba(69,171,77,0.6)]" />}
                </a>
              </div>

              {/* NAV ACTIONS (Cart, Profile Quick Link, Mobile Menu Toggle) */}
              <div className="flex items-center gap-4">
                
                {/* Cart Toggle */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-2.5 relative rounded-lg bg-brand-black-900 border border-neutral-800 hover:border-brand-gold-500/50 transition duration-300 text-neutral-300 hover:text-brand-gold-400 flex items-center justify-center focus:outline-none"
                  aria-label="View Circle Bag"
                  id="nav-cart-toggle"
                >
                  <ShoppingBag className="w-[18px] h-[18px]" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-gold-500 text-brand-black-950 font-mono text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg border border-brand-black-950">
                      {cartItemCount}
                    </span>
                  )}
                </button>

                {/* Membership Quick Button */}
                {memberProfile ? (
                  <a
                    href="#circle"
                    onClick={(e) => scrollToSection(e, 'circle')}
                    className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-brand-gold-500/10 hover:bg-brand-gold-500/20 border border-brand-gold-500/30 hover:border-brand-gold-500/50 text-brand-gold-400 text-xs font-mono tracking-wider transition duration-300"
                    id="nav-member-badge"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>CIRCLE ACTIVE</span>
                  </a>
                ) : (
                  <a
                    href="#circle"
                    onClick={(e) => scrollToSection(e, 'circle')}
                    className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-brand-black-900 hover:bg-brand-gold-500 text-neutral-400 hover:text-brand-black-950 border border-neutral-800 hover:border-brand-gold-500 text-xs font-serif tracking-wider transition duration-300"
                    id="nav-join-btn"
                  >
                    <span>JOIN CIRCLE</span>
                  </a>
                )}

                {/* Mobile Menu Toggle Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2.5 md:hidden rounded-lg bg-brand-black-900 border border-neutral-800 hover:border-brand-gold-500/50 transition duration-300 text-neutral-300 hover:text-brand-gold-400 flex items-center justify-center focus:outline-none"
                  aria-label="Toggle Navigation Menu"
                  id="nav-mobile-toggle"
                >
                  {isMobileMenuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-20 left-0 right-0 z-30 bg-brand-black-950/95 backdrop-blur-lg border-b border-brand-gold-500/20 md:hidden overflow-hidden shadow-2xl shadow-brand-gold-950/10"
                id="mobile-navigation-menu"
              >
                <div className="px-6 py-6 space-y-4 flex flex-col font-serif tracking-[0.2em] text-xs">
                  <a 
                    href="#home" 
                    onClick={(e) => scrollToSection(e, 'home')}
                    className={`py-2 border-b border-neutral-900/60 transition duration-300 ${activeSection === 'home' ? 'text-brand-gold-400' : 'text-neutral-400'}`}
                  >
                    HOME
                  </a>
                  <a 
                    href="#story" 
                    onClick={(e) => scrollToSection(e, 'story')}
                    className={`py-2 border-b border-neutral-900/60 transition duration-300 ${activeSection === 'story' ? 'text-brand-gold-400' : 'text-neutral-400'}`}
                  >
                    STORY
                  </a>
                  <a 
                    href="#about" 
                    onClick={(e) => scrollToSection(e, 'about')}
                    className={`py-2 border-b border-neutral-900/60 transition duration-300 ${activeSection === 'about' ? 'text-brand-gold-400' : 'text-neutral-400'}`}
                  >
                    ABOUT US
                  </a>
                  <a 
                    href="#categories" 
                    onClick={(e) => scrollToSection(e, 'categories')}
                    className={`py-2 border-b border-neutral-900/60 transition duration-300 ${activeSection === 'categories' ? 'text-brand-gold-400' : 'text-neutral-400'}`}
                  >
                    CATEGORIES
                  </a>
                  <a 
                    href="#strains" 
                    onClick={(e) => scrollToSection(e, 'strains')}
                    className={`py-2 border-b border-neutral-900/60 transition duration-300 ${activeSection === 'strains' ? 'text-brand-gold-400' : 'text-neutral-400'}`}
                  >
                    CURATED STRAINS
                  </a>
                  <a 
                    href="#circle" 
                    onClick={(e) => scrollToSection(e, 'circle')}
                    className={`py-2 border-b border-neutral-900/60 transition duration-300 ${activeSection === 'circle' ? 'text-brand-gold-400' : 'text-neutral-400'}`}
                  >
                    DADA CIRCLE
                  </a>
                  <a 
                    href="#trust" 
                    onClick={(e) => scrollToSection(e, 'trust')}
                    className={`py-2 border-b border-neutral-900/60 transition duration-300 ${activeSection === 'trust' ? 'text-brand-gold-400' : 'text-neutral-400'}`}
                  >
                    RESPONSIBILITY
                  </a>
                  <a 
                    href="#contact" 
                    onClick={(e) => scrollToSection(e, 'contact')}
                    className={`py-2 transition duration-300 ${activeSection === 'contact' ? 'text-brand-gold-400' : 'text-neutral-400'}`}
                  >
                    CONTACT
                  </a>

                  {/* Join Circle / Profile mobile quick link */}
                  <div className="pt-4 border-t border-brand-gold-500/10 flex flex-col gap-3">
                    {memberProfile ? (
                      <a
                        href="#circle"
                        onClick={(e) => scrollToSection(e, 'circle')}
                        className="flex items-center justify-center gap-2 py-3 rounded-lg bg-brand-gold-500/10 border border-brand-gold-500/30 text-brand-gold-400 text-xs font-mono tracking-wider"
                      >
                        <User className="w-4 h-4" />
                        <span>CIRCLE ACTIVE</span>
                      </a>
                    ) : (
                      <a
                        href="#circle"
                        onClick={(e) => scrollToSection(e, 'circle')}
                        className="flex items-center justify-center gap-2 py-3 rounded-lg bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-black-950 font-semibold text-xs tracking-wider transition"
                      >
                        <span>JOIN PRIVATE CIRCLE</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="flex-grow relative" id="main-view-router">
            <AnimatePresence mode="wait">
              {activeSection === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* 1. HERO SECTION (Cinema Experience) */}
                  <header id="home" className="relative min-h-[95vh] flex items-center justify-center pt-20 overflow-hidden">
            {/* Visual background image with gold & smoke tone */}
            <div className="absolute inset-0 z-0">
              <img 
                src={HERO_BG} 
                alt="Dada's Luxury Glass Cured Cannabis Bud with Gold Dust" 
                className="w-full h-full object-cover object-center opacity-40 scale-105 filter brightness-90 saturate-50 hover:scale-100 transition-all duration-[8000ms]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black-950 via-brand-black-950/60 to-brand-black-950/80" />
            </div>

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10 py-16">
              
              {/* Premium Subheader with visual flower flourish */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-brand-black-900/60 border border-brand-gold-500/20 backdrop-blur-sm text-brand-gold-400 text-xs tracking-[0.25em] font-serif"
              >
                <Sparkle className="w-3 h-3 text-brand-gold-400" />
                <span>ESTABLISHED 2026 • PRIVATE BOUTIQUE</span>
                <Sparkle className="w-3 h-3 text-brand-gold-400" />
              </motion.div>

              {/* Big Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-[0.1em] uppercase leading-none mb-6 gold-glow"
              >
                ELEVATE <br />
                <span className="text-brand-gold-400">THE SENSES</span>
              </motion.h1>

              {/* Short Brand Promise */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-neutral-300 text-sm sm:text-base md:text-lg tracking-wide font-light max-w-xl mx-auto mb-10 leading-relaxed font-sans"
              >
                Cape Town’s premier luxury cannabis experience. Curated strain selections, handcrafted live rosin infusions, and discreet door-to-door delivery designed for discerning tastes.
              </motion.p>

              {/* Cinematic Call to Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <a 
                  href="#strains" 
                  onClick={(e) => scrollToSection(e, 'strains')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-black-950 text-xs font-serif font-semibold tracking-[0.2em] rounded-xl transition duration-300 transform active:scale-95 shadow-lg shadow-brand-gold-900/20 text-center"
                  id="hero-cta-shop"
                >
                  SHOP PRIVATE DROPS
                </a>
                <a 
                  href="#circle" 
                  onClick={(e) => scrollToSection(e, 'circle')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-black-900 hover:bg-brand-black-800 border border-brand-gold-500/30 hover:border-brand-gold-500 text-brand-gold-400 hover:text-brand-gold-300 text-xs font-serif tracking-[0.2em] rounded-xl transition duration-300 text-center"
                  id="hero-cta-join"
                >
                  JOIN THE CIRCLE
                </a>
              </motion.div>
            </div>

            {/* Bottom visual indicator row */}
            <div 
              onClick={() => scrollToSection(null, 'story')}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 cursor-pointer hover:opacity-100 transition duration-300"
            >
              <span className="text-[10px] tracking-[0.25em] text-neutral-500 font-serif">READ OUR STORY</span>
              <motion.div 
                animate={{ y: [0, 6, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1.5 h-3 rounded-full bg-brand-gold-500/50" 
              />
            </div>
          </header>

          {/* 3. FEATURE BENEFIT STRIP */}
          <section className="bg-brand-black-950 border-y border-brand-gold-500/10 py-10 relative z-10" id="benefits">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {BENEFITS.map((b, idx) => (
                  <div 
                    key={idx} 
                    className="flex gap-4 items-start p-4 hover:bg-brand-black-900/40 rounded-xl transition duration-300"
                    id={`benefit-card-${idx}`}
                  >
                    <div className="p-3 bg-brand-black-900 border border-brand-gold-500/10 rounded-xl shadow-lg">
                      {renderBenefitIcon(b.icon)}
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-serif tracking-wider font-semibold mb-1 uppercase">{b.title}</h4>
                      <p className="text-neutral-400 text-xs leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURED CANNABIS PRODUCTS ON THE HOMEPAGE */}
          <section className="py-24 bg-brand-black-900 border-t border-brand-green-500/10 relative z-10" id="home-featured-drops">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-brand-green-500/5 border border-brand-green-500/15 text-brand-green-400 text-[10px] tracking-[0.25em] font-serif uppercase">
                  <Sparkles className="w-2.5 h-2.5 text-brand-green-400 animate-pulse" />
                  <span>HOT HARVEST FEATURE</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide uppercase">CRAFT DISPENSARY SHIFT</h2>
                <div className="h-[2px] w-16 bg-gradient-to-r from-brand-green-500 to-brand-gold-500 mx-auto mt-4 mb-3" />
                <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                  Discreet door-to-door escort of organic, pesticide-free lineages and pure live rosin edibles. Select a drop to view specs or reserve immediately.
                </p>
              </div>

              {/* Featured Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <div 
                    key={`home-featured-${p.id}`}
                    className="bg-brand-black-950 border border-neutral-900/80 hover:border-brand-green-500/30 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 flex flex-col justify-between group h-full shadow-lg hover:shadow-brand-green-950/5"
                    id={`home-product-card-${p.id}`}
                  >
                    {/* RARE DROP / COLLECTOR badge */}
                    {p.isCollectorDrop && (
                      <span className="absolute top-4 right-4 z-10 px-2 py-0.5 bg-brand-green-500 text-brand-black-950 font-mono text-[9px] font-bold tracking-widest rounded uppercase">
                        RARE HARVEST
                      </span>
                    )}

                    <div>
                      {/* Image container */}
                      <div 
                        onClick={() => setSelectedProduct(p)}
                        className="relative overflow-hidden rounded-xl bg-brand-black-900 border border-neutral-900 cursor-pointer aspect-video mb-5"
                      >
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-full object-cover filter brightness-75 saturate-[0.85] group-hover:scale-105 transition duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black-950/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="text-[10px] font-mono text-brand-green-400 tracking-wider font-semibold">
                            THC: {p.thc}
                          </span>
                          {p.cbd && (
                            <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
                              CBD: {p.cbd}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Type Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
                          {p.category}
                        </span>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-mono ${
                          p.type === 'Sativa' ? 'bg-orange-950/40 text-orange-400 border border-orange-500/20' :
                          p.type === 'Indica' ? 'bg-indigo-950/40 text-indigo-400 border border-indigo-500/20' :
                          p.type === 'Hybrid' ? 'bg-purple-950/40 text-purple-400 border border-purple-500/20' :
                          'bg-brand-green-950/40 text-brand-green-400 border border-brand-green-500/20'
                        }`}>
                          {p.type}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => setSelectedProduct(p)}
                        className="text-lg font-serif text-white tracking-wide mb-2 hover:text-brand-green-400 cursor-pointer transition duration-300 uppercase"
                      >
                        {p.name}
                      </h3>

                      {p.strainLineage && (
                        <div className="text-[10px] text-brand-green-400/85 font-mono tracking-widest uppercase mb-3 flex items-center gap-1">
                          <span>🧬</span> <span>{p.strainLineage}</span>
                        </div>
                      )}

                      <p className="text-neutral-400 text-xs font-light leading-relaxed mb-5 line-clamp-3">
                        {p.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {p.effects.map((eff, i) => (
                          <span key={i} className="text-[9px] px-2 py-0.5 bg-brand-black-900 text-neutral-400 border border-neutral-800/80 rounded">
                            {eff}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom section with pricing & buy */}
                    <div className="pt-4 border-t border-neutral-900/80 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[9px] text-neutral-500 font-mono block uppercase">Price ({p.weight})</span>
                        <span className="text-lg font-mono text-brand-green-400 font-bold">R {p.price * 10}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="px-3 py-2 rounded-lg bg-brand-black-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-brand-green-500/50 text-[10px] tracking-widest font-serif uppercase transition duration-300"
                          id={`home-product-specs-btn-${p.id}`}
                        >
                          SPECS
                        </button>
                        <button
                          onClick={() => addToCart(p)}
                          className="px-3.5 py-2 rounded-lg bg-brand-green-600 hover:bg-brand-green-500 text-white text-[10px] font-serif font-bold tracking-widest uppercase transition duration-300 flex items-center gap-1.5 transform active:scale-95 shadow-md shadow-brand-green-900/10"
                          id={`home-product-add-btn-${p.id}`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>RESERVE</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* View Full Catalog Call to Action */}
              <div className="text-center mt-12">
                <button
                  onClick={() => setActiveSection('strains')}
                  className="inline-flex items-center gap-2.5 px-6 py-3 border border-brand-green-500/30 hover:border-brand-green-500 text-brand-green-400 hover:text-white rounded-xl text-xs font-serif font-semibold tracking-widest uppercase bg-brand-black-950 hover:bg-brand-black-900 transition duration-300 cursor-pointer shadow-lg shadow-brand-green-950/10"
                  id="home-view-all-cta"
                >
                  <span>EXPLORE FULL HARVEST CATALOGUE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {/* 2. ABOUT & LIFESTYLE STORY SECTION */}
      {activeSection === 'story' && (
        <motion.div
          key="story"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-28 pb-4 bg-brand-black-950 text-center border-b border-brand-gold-500/10">
            <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-brand-gold-500/5 border border-brand-gold-500/15 text-brand-gold-400 text-[10px] tracking-[0.25em] font-serif uppercase">
              <Sparkle className="w-2.5 h-2.5" />
              <span>THE HEIRLOOM HERITAGE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-[0.1em] gold-glow">THE BRAND STORY</h1>
            <p className="text-neutral-400 text-xs mt-3 max-w-md mx-auto leading-relaxed">Discover the origins, philosophy, and artisanal cannabis genetics of Cape Town’s premier botanical house.</p>
          </div>
          <section id="story" className="py-24 bg-brand-black-950 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Story Image / Aesthetic Graphic */}
                <div className="lg:col-span-5 relative">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-gold-500 to-brand-gold-800 rounded-2xl blur-md opacity-25 pointer-events-none" />
                  <div className="relative overflow-hidden rounded-2xl border border-brand-gold-500/20 bg-brand-black-900 aspect-square sm:aspect-video lg:aspect-square">
                    <img 
                      src={HERO_BG} 
                      alt="Cannabis culture luxury craftmanship" 
                      className="w-full h-full object-cover filter saturate-75 contrast-125"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black-950 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 p-6 bg-brand-black-950/80 backdrop-blur-md rounded-xl border border-brand-gold-500/10">
                      <span className="font-serif text-brand-gold-400 text-[10px] tracking-[0.2em] block mb-1 uppercase font-bold">LIFESTYLE COMPASS</span>
                      <p className="text-neutral-200 text-xs leading-relaxed">
                        "Cannabis is more than consumption—it is a sensory ritual, a bridge to creative clarity, and a restoration of natural somatic balance."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Story Text */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <span className="text-brand-gold-500 text-xs font-serif tracking-[0.25em] mb-3 block uppercase font-bold">DADA’S STORY</span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide uppercase leading-tight mb-6">
                    A HIGHER STANDARD <br />
                    OF DISCRETION & HERITAGE
                  </h2>
                  
                  <div className="space-y-4 text-neutral-300 text-sm leading-relaxed font-light">
                    <p>
                      Inspired by the boutique culture of Cape Town, Dada’s Dispensary is born out of a desire for exceptional quality. We view cannabis not simply as a product, but as an botanical luxury that deserves premium presentation, absolute transparency, and impeccable service.
                    </p>
                    <p>
                      We work directly with certified legacy cultivators who share our standards of soil-to-cure purity. No artificial chemicals, no rushed drying cycles. Just master-level genetics, hand-trimmed, cold-cured to lock in authentic, deep-reaching terpene profiles that soothe, energize, or inspire.
                    </p>
                    <p>
                      Our membership-only portal ensures a secure, elite tier of service. We handle every interaction with complete legal compliance and meticulous discretion. Your security is as paramount as the purity of our harvests.
                    </p>
                  </div>

                  {/* Benefit list */}
                  <div className="mt-8 pt-8 border-t border-brand-gold-500/10 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                      <span className="text-neutral-300 font-mono">SOIL-TO-CURE ORGANICS</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                      <span className="text-neutral-300 font-mono">SECURE ESCORTED DELIVERY</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                      <span className="text-neutral-300 font-mono">100% SOLVENTLESS ROSINS</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                      <span className="text-neutral-300 font-mono">FULL TERPENE LABORATORY SPECS</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </motion.div>
      )}

      {/* ABOUT US, MISSION & VISION SECTION */}
      {activeSection === 'about' && (
        <motion.div
          key="about"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-28 pb-4 bg-brand-black-950 text-center border-b border-brand-gold-500/10">
            <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-brand-gold-500/5 border border-brand-gold-500/15 text-brand-gold-400 text-[10px] tracking-[0.25em] font-serif uppercase">
              <Sparkle className="w-2.5 h-2.5" />
              <span>CRAFTED ETHOS</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-[0.1em] gold-glow">MISSION, VISION & VALUES</h1>
            <p className="text-neutral-400 text-xs mt-3 max-w-md mx-auto leading-relaxed">A standard of exquisite quality and private compliance guiding our Cape Town collective.</p>
          </div>
          <section id="about" className="py-24 bg-brand-black-900 border-b border-brand-gold-500/10 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-brand-gold-500 text-xs font-serif tracking-[0.25em] mb-3 block uppercase font-bold">HOUSE PHILOSOPHY</span>
                <h2 className="text-3xl font-serif text-white tracking-wide uppercase">ABOUT US, MISSION & VISION</h2>
                <div className="h-[1px] w-12 bg-brand-gold-500/30 mx-auto mt-4 mb-4" />
                <p className="text-neutral-400 text-xs leading-relaxed max-w-xl mx-auto">
                  Dada's Dispensary stands as a beacon of meticulous curation, legacy heritage, and uncompromising standards. We believe cannabis is an exquisite botanical design to be respected and savored.
                </p>
              </div>

              {/* Grid of Mission & Vision cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* MISSION CARD */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-gold-500/10 to-transparent rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition duration-500" />
                  <div className="relative p-8 md:p-10 bg-brand-black-950 border border-neutral-900 rounded-2xl hover:border-brand-gold-500/20 transition duration-300 h-full flex flex-col justify-between">
                    <div>
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-brand-gold-500/5 border border-brand-gold-500/20 flex items-center justify-center text-brand-gold-400 mb-6">
                        <Compass className="w-6 h-6" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-serif text-white font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span>Our Mission</span>
                        <div className="h-[1px] w-6 bg-brand-gold-500/30" />
                      </h3>
                      
                      {/* Body */}
                      <p className="text-neutral-300 text-xs md:text-sm leading-relaxed mb-6 font-light">
                        To curate, refine, and deliver the world's most exceptional organic, legacy-grade cannabis strains and solventless boutique concentrates to discerning connoisseurs. We operate at the perfect frontier of botanical purity, clinical precision, and absolute private luxury, establishing a safe, legal, and deeply educated circle of consumption.
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-3.5 pt-6 border-t border-brand-gold-500/10">
                      <div className="flex gap-3">
                        <Check className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs text-white uppercase font-serif tracking-wider font-semibold">100% Organic Purity</h4>
                          <p className="text-[11px] text-neutral-400 leading-normal mt-0.5">Sourced from pesticide-free, living-soil local micro-farms.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Check className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs text-white uppercase font-serif tracking-wider font-semibold">Absolute Discretion</h4>
                          <p className="text-[11px] text-neutral-400 leading-normal mt-0.5">Unmarked double-sealed packaging delivered by vetted professional escorts.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Check className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs text-white uppercase font-serif tracking-wider font-semibold">Comprehensive Lab Testing</h4>
                          <p className="text-[11px] text-neutral-400 leading-normal mt-0.5">Full transparent terpene profile charts and cannabinoid indexes.</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* VISION CARD */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-l from-brand-gold-500/10 to-transparent rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition duration-500" />
                  <div className="relative p-8 md:p-10 bg-brand-black-950 border border-neutral-900 rounded-2xl hover:border-brand-gold-500/20 transition duration-300 h-full flex flex-col justify-between">
                    <div>
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-brand-gold-500/5 border border-brand-gold-500/20 flex items-center justify-center text-brand-gold-400 mb-6">
                        <Eye className="w-6 h-6" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-serif text-white font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span>Our Vision</span>
                        <div className="h-[1px] w-6 bg-brand-gold-500/30" />
                      </h3>
                      
                      {/* Body */}
                      <p className="text-neutral-300 text-xs md:text-sm leading-relaxed mb-6 font-light">
                        To build the undisputed global icon of botanical luxury, merging ancestral legacy cultivation with high-end modern design, wellness ritual, and private member hospitality. We envision a sophisticated society where clean cannabis is integrated into elegant, conscious living, paving the way for education, safe personal sovereignty, and legal transparency.
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-3.5 pt-6 border-t border-brand-gold-500/10">
                      <div className="flex gap-3">
                        <Check className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs text-white uppercase font-serif tracking-wider font-semibold">Cape Town Flagship Lounge</h4>
                          <p className="text-[11px] text-neutral-400 leading-normal mt-0.5">A physical high-end sanctuary for safe sensory tasting and private circles.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Check className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs text-white uppercase font-serif tracking-wider font-semibold">Pioneering Wellness Science</h4>
                          <p className="text-[11px] text-neutral-400 leading-normal mt-0.5">Custom ratios optimized for somatic restoration, deep sleep, and creative flow.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Check className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs text-white uppercase font-serif tracking-wider font-semibold">Legacy Cultivator Harmony</h4>
                          <p className="text-[11px] text-neutral-400 leading-normal mt-0.5">Empowering and formalizing generations of local heirloom growers.</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </section>
        </motion.div>
      )}

      {/* INTERACTIVE COMPONENT: STRAIN & TERPENE SOMMELIER */}
      {activeSection === 'home' && (
        <motion.div
          key="sommelier"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <section className="py-20 bg-brand-black-900 border-y border-brand-gold-500/10 relative z-10" id="sommelier">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-12">
                <span className="text-brand-gold-500 text-xs font-serif tracking-[0.25em] mb-3 block uppercase font-bold">DIGITAL SOMMELIER</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide uppercase">FIND YOUR ELEVATION</h2>
                <p className="text-neutral-400 text-xs max-w-md mx-auto mt-2 leading-relaxed">
                  Select your desired mental or physical target state. Our interactive sommelier will align your chemistry with the perfect Dada strain.
                </p>
              </div>

              {/* Mood Choices */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { id: 'creative', title: 'CREATIVE FLOW', desc: 'Inspired Focus & Heightened Senses', icon: Flame },
                  { id: 'relax', title: 'DEEP RELAXATION', desc: 'Full-Body Release & Somatic Rest', icon: Clock },
                  { id: 'energize', title: 'ELECTRIC UPLIFT', desc: 'Vibrant Energy & Mind Clarity', icon: Activity },
                  { id: 'restore', title: 'SOMATIC STILLNESS', desc: 'Anti-Inflammation & Calm Focus', icon: Droplets }
                ].map((m) => {
                  const MoodIcon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSommelierMood(m.id === sommelierMood ? null : m.id)}
                      className={`p-6 rounded-xl border text-center transition duration-300 flex flex-col items-center justify-center gap-3 focus:outline-none cursor-pointer ${
                        sommelierMood === m.id 
                          ? 'bg-brand-gold-500/10 border-brand-gold-500 shadow-lg shadow-brand-gold-950/20' 
                          : 'bg-brand-black-950 border-neutral-800 hover:border-brand-gold-500/40'
                      }`}
                      id={`sommelier-mood-${m.id}`}
                    >
                      <div className={`p-3 rounded-lg ${sommelierMood === m.id ? 'bg-brand-gold-500 text-brand-black-950' : 'bg-brand-black-900 text-brand-gold-400'}`}>
                        <MoodIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs font-serif font-semibold tracking-wider text-white uppercase">{m.title}</span>
                        <span className="block text-[10px] text-neutral-400 mt-1">{m.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sommelier Output */}
              <AnimatePresence mode="wait">
                {sommelierMood && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 md:p-8 bg-brand-black-950 border border-brand-gold-500/20 rounded-2xl relative overflow-hidden"
                    id="sommelier-result-box"
                  >
                    <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-brand-gold-500/50 uppercase tracking-widest">
                      Matched Chemistry
                    </div>

                    <h4 className="text-xs font-mono text-brand-gold-400 tracking-widest uppercase mb-4">RECOMMENDED SESSIONS</h4>
                    
                    <div className="space-y-4">
                      {getSommelierRecommendation().length > 0 ? (
                        getSommelierRecommendation().map((product) => (
                          <div 
                            key={product.id} 
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-brand-black-900/60 rounded-xl border border-neutral-800/60 hover:border-brand-gold-500/30 transition duration-300 gap-4"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-black-950 border border-neutral-800 flex-shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover filter brightness-75" referrerPolicy="no-referrer" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-serif text-sm text-white font-medium">{product.name}</span>
                                  <span className={`text-[9px] px-2 py-0.5 rounded font-mono ${
                                    product.type === 'Sativa' ? 'bg-orange-950/40 text-orange-400 border border-orange-500/20' :
                                    product.type === 'Indica' ? 'bg-indigo-950/40 text-indigo-400 border border-indigo-500/20' :
                                    product.type === 'Hybrid' ? 'bg-purple-950/40 text-purple-400 border border-purple-500/20' :
                                    'bg-teal-950/40 text-teal-400 border border-teal-500/20'
                                  }`}>{product.type}</span>
                                </div>
                                <div className="flex gap-3 text-[10px] text-neutral-400 mt-1 font-mono">
                                  <span>THC: {product.thc}</span>
                                  {product.cbd && <span>CBD: {product.cbd}</span>}
                                  {product.weight && <span>Weight: {product.weight}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                              <button
                                onClick={() => setSelectedProduct(product)}
                                className="px-3.5 py-1.5 bg-brand-black-900 text-neutral-300 hover:text-white border border-neutral-800 hover:border-brand-gold-500 text-[10px] tracking-wider uppercase font-serif rounded-lg transition duration-300"
                                id={`sommelier-view-specs-${product.id}`}
                              >
                                View Specs
                              </button>
                              <button
                                onClick={() => addToCart(product)}
                                className="px-4 py-1.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-black-950 text-[10px] font-semibold tracking-wider uppercase font-serif rounded-lg transition duration-300 flex items-center gap-1.5"
                                id={`sommelier-add-to-cart-${product.id}`}
                              >
                                <ShoppingBag className="w-3 h-3" />
                                <span>Reserve</span>
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-neutral-500 text-xs">No current harvest matched this specific mood profile. Try resetting selectors.</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </motion.div>
      )}

      {/* 4. PRODUCT CATEGORIES & CURATED STRAINS CATALOGUE */}
      {(activeSection === 'categories' || activeSection === 'strains') && (
        <motion.div
          key="catalog"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-28 pb-4 bg-brand-black-950 text-center border-b border-brand-gold-500/10">
            <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-brand-gold-500/5 border border-brand-gold-500/15 text-brand-gold-400 text-[10px] tracking-[0.25em] font-serif uppercase">
              <Sparkle className="w-2.5 h-2.5" />
              <span>THE EXCLUSIVES CATALOGUE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-[0.1em] gold-glow">DADA'S DISPENSARY DROPS</h1>
            <p className="text-neutral-400 text-xs mt-3 max-w-md mx-auto leading-relaxed">Pesticide-free organic lineages, handcrafted live rosin extracts, and curated botanical designs.</p>
          </div>
          <section id="categories" className="py-24 bg-brand-black-950 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center mb-16">
                <span className="text-brand-gold-500 text-xs font-serif tracking-[0.25em] mb-3 block uppercase font-bold">THE DISPENSARY</span>
                <h2 className="text-3xl font-serif text-white tracking-wide uppercase">SHOP BY CATEGORY</h2>
                <div className="h-[1px] w-12 bg-brand-gold-500/30 mx-auto mt-4 mb-2" />
                <p className="text-neutral-400 text-xs tracking-wider font-mono">ACCESS TO LIMITED LEGACY HARVESTS</p>
              </div>

              {/* Responsive card layout like The Spot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CATEGORIES.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => {
                      setCategoryFilter(cat.id);
                      const element = document.getElementById('strains');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group cursor-pointer bg-brand-black-900 border border-neutral-900 rounded-2xl overflow-hidden relative aspect-[4/3] sm:aspect-[3/4] hover:border-brand-gold-500/40 transition duration-500 flex flex-col justify-end"
                    id={`category-card-${cat.id}`}
                  >
                    {/* Background Category Image */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black-950 via-brand-black-950/30 to-transparent" />
                    </div>

                    {/* Category Label Overlay */}
                    <div className="p-6 relative z-10">
                      <span className="text-brand-gold-400 font-mono text-[9px] tracking-[0.25em] block mb-1 uppercase font-bold">
                        {cat.tagline}
                      </span>
                      <h3 className="text-xl font-serif text-white tracking-wide uppercase group-hover:text-brand-gold-300 transition duration-300 flex items-center gap-1.5">
                        {cat.name}
                        <ArrowRight className="w-4 h-4 text-brand-gold-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300" />
                      </h3>
                      <p className="text-neutral-400 text-xs mt-2 line-clamp-2 font-light tracking-wide leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    {/* Accent glowing border */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold-500 scale-x-0 group-hover:scale-x-100 transition duration-500 origin-left" />
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* 5. FEATURED PRODUCTS SECTION (Strains & Items Grid) */}
          <section id="strains" className="py-24 bg-brand-black-900 border-y border-brand-gold-500/10 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="text-brand-gold-500 text-xs font-serif tracking-[0.25em] mb-2 block uppercase font-bold">THE PRIVATE SELECTION</span>
                  <h2 className="text-3xl font-serif text-white tracking-wide uppercase">CURATED HARVESTS</h2>
                  <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                    Pure lineages cured with precision, available for secure circle delivery.
                  </p>
                </div>

                {/* Sub-Filter Row */}
                <div className="flex flex-wrap gap-2 text-xs font-serif tracking-wider">
                  {[
                    { id: 'all', label: 'ALL PRODUCTS' },
                    { id: 'flower', label: 'FLOWER' },
                    { id: 'edible', label: 'EDIBLES' },
                    { id: 'vape', label: 'VAPES' },
                    { id: 'oil', label: 'ELIXIRS' }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setCategoryFilter(btn.id as any)}
                      className={`px-4 py-2 rounded-lg border transition duration-300 uppercase cursor-pointer ${
                        categoryFilter === btn.id 
                          ? 'bg-brand-gold-500 text-brand-black-950 border-brand-gold-500 font-semibold' 
                          : 'bg-brand-black-950 text-neutral-400 border-neutral-800 hover:border-brand-gold-500/40 hover:text-white'
                      }`}
                      id={`filter-btn-${btn.id}`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <div 
                    key={p.id}
                    className="bg-brand-black-950 border border-neutral-900 hover:border-brand-gold-500/30 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 flex flex-col justify-between group h-full"
                    id={`product-card-${p.id}`}
                  >
                    {/* Visual tags */}
                    {p.isCollectorDrop && (
                      <span className="absolute top-4 right-4 z-10 px-2 py-0.5 bg-brand-gold-500 text-brand-black-950 font-mono text-[9px] font-bold tracking-widest rounded uppercase">
                        RARE DROP
                      </span>
                    )}

                    <div>
                      {/* Product Media */}
                      <div 
                        onClick={() => setSelectedProduct(p)}
                        className="relative overflow-hidden rounded-xl bg-brand-black-900 border border-neutral-900 cursor-pointer aspect-video mb-5"
                      >
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-full object-cover filter brightness-75 saturate-75 group-hover:scale-105 transition duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black-950/60 to-transparent" />
                        
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="text-[10px] font-mono text-brand-gold-400 tracking-wider font-semibold">
                            THC: {p.thc}
                          </span>
                          {p.cbd && (
                            <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
                              CBD: {p.cbd}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Lineage & Type Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
                          {p.category}
                        </span>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-mono ${
                          p.type === 'Sativa' ? 'bg-orange-950/40 text-orange-400 border border-orange-500/20' :
                          p.type === 'Indica' ? 'bg-indigo-950/40 text-indigo-400 border border-indigo-500/20' :
                          p.type === 'Hybrid' ? 'bg-purple-950/40 text-purple-400 border border-purple-500/20' :
                          'bg-teal-950/40 text-teal-400 border border-teal-500/20'
                        }`}>
                          {p.type}
                        </span>
                      </div>

                      {/* Product Title */}
                      <h3 
                        onClick={() => setSelectedProduct(p)}
                        className="text-lg font-serif text-white tracking-wide mb-2 hover:text-brand-gold-400 cursor-pointer transition duration-300 uppercase"
                      >
                        {p.name}
                      </h3>

                      {/* Strain Lineage */}
                      {p.strainLineage && (
                        <div className="text-[10px] text-brand-gold-500/80 font-mono tracking-widest uppercase mb-3">
                          🧬 {p.strainLineage}
                        </div>
                      )}

                      {/* Short Description */}
                      <p className="text-neutral-400 text-xs font-light leading-relaxed mb-5 line-clamp-3">
                        {p.description}
                      </p>

                      {/* Key Effects list */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {p.effects.map((eff, i) => (
                          <span key={i} className="text-[9px] px-2 py-0.5 bg-brand-black-900 text-neutral-400 border border-neutral-800/80 rounded">
                            {eff}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Cart Call */}
                    <div className="pt-4 border-t border-neutral-900/80 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[9px] text-neutral-500 font-mono block uppercase">price per {p.weight}</span>
                        <span className="text-lg font-mono text-brand-gold-400 font-bold">R {p.price * 10}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="px-3.5 py-2 rounded-lg bg-brand-black-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-brand-gold-500/50 text-[10px] tracking-widest font-serif uppercase transition duration-300"
                          id={`product-specs-btn-${p.id}`}
                        >
                          Specs
                        </button>
                        <button
                          onClick={() => addToCart(p)}
                          className="px-4 py-2 rounded-lg bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-black-950 text-[10px] font-serif font-bold tracking-widest uppercase transition duration-300 flex items-center gap-1.5 transform active:scale-95"
                          id={`product-add-btn-${p.id}`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>RESERVE</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </section>
        </motion.div>
      )}

      {/* LUXURY TESTIMONIAL CAROUSEL */}
      {activeSection === 'home' && (
        <motion.div
          key="testimonials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <section className="py-24 bg-brand-black-950 relative overflow-hidden z-10" id="testimonials">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-16">
                <span className="text-brand-gold-500 text-xs font-serif tracking-[0.25em] mb-2 block uppercase font-bold">VERIFIED CIRCLE REVIEWS</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide uppercase">PATRON TESTIMONIALS</h2>
                <div className="h-[1px] w-12 bg-brand-gold-500/30 mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t) => (
                  <div 
                    key={t.id} 
                    className="p-8 bg-brand-black-900 border border-neutral-900 rounded-2xl relative flex flex-col justify-between"
                    id={`testimonial-card-${t.id}`}
                  >
                    <div className="absolute top-4 right-4 text-brand-gold-500/15 font-serif text-6xl select-none font-bold">“</div>
                    <p className="text-neutral-300 text-xs leading-relaxed italic relative z-10 mb-8">
                      "{t.quote}"
                    </p>
                    <div className="border-t border-neutral-800/80 pt-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-serif font-semibold text-white uppercase">{t.author}</span>
                        {t.verified && (
                          <span className="text-[8px] font-mono text-brand-gold-400 px-1.5 py-0.2 bg-brand-gold-500/10 rounded-full border border-brand-gold-500/20">
                            Verified Member
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono tracking-wider">{t.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {/* 6. MEMBERSHIP SECTION (Interactive Dada Circle Card Generator) */}
      {activeSection === 'circle' && (
        <motion.div
          key="circle"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-28 pb-4 bg-brand-black-950 text-center border-b border-brand-gold-500/10">
            <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-brand-gold-500/5 border border-brand-gold-500/15 text-brand-gold-400 text-[10px] tracking-[0.25em] font-serif uppercase">
              <Sparkle className="w-2.5 h-2.5" />
              <span>THE VETTED NETWORK</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-[0.1em] gold-glow">THE DADA PRIVATE CIRCLE</h1>
            <p className="text-neutral-400 text-xs mt-3 max-w-md mx-auto leading-relaxed">Enroll in our secure verification register to receive personalized consulting and doorstep escort services.</p>
          </div>
          <section id="circle" className="py-24 bg-brand-black-900 border-y border-brand-gold-500/10 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Membership Description */}
                <div className="lg:col-span-5">
                  <span className="text-brand-gold-500 text-xs font-serif tracking-[0.25em] mb-3 block uppercase font-bold">THE EXPERIENCE CLUB</span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide uppercase mb-6 leading-tight">
                    JOIN THE <br />
                    DADA CIRCLE
                  </h2>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
                    Dada’s Dispensary does not cater to mass-market convenience. We maintain strict compliance and private availability. By entering the Dada Circle, you obtain secured privileges, priority strain drops, personalized concierge recommendations, and exclusive pricing on high-potency organics.
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400 flex-shrink-0 border border-brand-gold-500/20">
                        <Award className="w-3 h-3" />
                      </div>
                      <div>
                        <h4 className="text-xs font-serif text-white uppercase tracking-wider">Priority Access Tiers</h4>
                        <p className="text-neutral-400 text-xs leading-normal mt-0.5">Secure first-hand reservations on rare crossbreeds like Dada's Golden Reserve.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400 flex-shrink-0 border border-brand-gold-500/20">
                        <Lock className="w-3 h-3" />
                      </div>
                      <div>
                        <h4 className="text-xs font-serif text-white uppercase tracking-wider">Private Delivery Windows</h4>
                        <p className="text-neutral-400 text-xs leading-normal mt-0.5">Escorted premium transport in insulated black velvet containers to specified addresses.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400 flex-shrink-0 border border-brand-gold-500/20">
                        <Compass className="w-3 h-3" />
                      </div>
                      <div>
                        <h4 className="text-xs font-serif text-white uppercase tracking-wider">Discreet Consultations</h4>
                        <p className="text-neutral-400 text-xs leading-normal mt-0.5">Private Sommelier guidance for custom wellness dosing and chemical profiling.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Membership Interactive Interactive Section */}
                <div className="lg:col-span-7">
                  <div className="bg-brand-black-950 border border-brand-gold-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                    
                    {/* Glowing background circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-500/5 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold-500/5 rounded-full blur-2xl" />

                    <AnimatePresence mode="wait">
                      {!memberProfile ? (
                        /* REGISTRATION FORM */
                        <motion.form 
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleRegisterMember}
                          className="space-y-5"
                          id="member-signup-form"
                        >
                          <h3 className="text-lg font-serif text-white tracking-wide uppercase pb-4 border-b border-neutral-900 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-brand-gold-400" />
                            <span>REQUEST EXCLUSIVE ENROLLMENT</span>
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] text-neutral-400 tracking-wider font-mono uppercase mb-1.5">Full Name *</label>
                              <input 
                                type="text"
                                required
                                value={memberName}
                                onChange={(e) => setMemberName(e.target.value)}
                                placeholder="E.g., Alexander Mercer"
                                className="w-full bg-brand-black-900 border border-neutral-800 focus:border-brand-gold-500 focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 transition"
                                id="input-member-name"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-neutral-400 tracking-wider font-mono uppercase mb-1.5">Email Address *</label>
                              <input 
                                type="email"
                                required
                                value={memberEmail}
                                onChange={(e) => setMemberEmail(e.target.value)}
                                placeholder="alex@mercer.com"
                                className="w-full bg-brand-black-900 border border-neutral-800 focus:border-brand-gold-500 focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 transition"
                                id="input-member-email"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] text-neutral-400 tracking-wider font-mono uppercase mb-1.5">Phone Number</label>
                              <input 
                                type="tel"
                                value={memberPhone}
                                onChange={(e) => setMemberPhone(e.target.value)}
                                placeholder="+27 82 123 4567"
                                className="w-full bg-brand-black-900 border border-neutral-800 focus:border-brand-gold-500 focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 transition"
                                id="input-member-phone"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-neutral-400 tracking-wider font-mono uppercase mb-1.5">Date of Birth (18+) *</label>
                              <input 
                                type="date"
                                required
                                value={memberDob}
                                onChange={(e) => setMemberDob(e.target.value)}
                                className="w-full bg-brand-black-900 border border-neutral-800 focus:border-brand-gold-500 focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 transition"
                                id="input-member-dob"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] text-neutral-400 tracking-wider font-mono uppercase mb-1.5">Select Membership Tier</label>
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                { id: 'Vanguard', label: 'Vanguard', desc: 'Curated Access' },
                                { id: 'Collector', label: 'Collector', desc: 'Rare Strains' },
                                { id: 'Private Circle', label: 'Private Circle', desc: 'VIP Concierge' }
                              ].map((t) => (
                                <button
                                  key={t.id}
                                  type="button"
                                  onClick={() => setMemberTier(t.id as any)}
                                  className={`p-3 rounded-lg border text-left cursor-pointer focus:outline-none transition ${
                                    memberTier === t.id 
                                      ? 'bg-brand-gold-500/15 border-brand-gold-500 text-brand-gold-400' 
                                      : 'bg-brand-black-900 border-neutral-800 hover:border-brand-gold-500/30'
                                  }`}
                                  id={`tier-select-${t.id}`}
                                >
                                  <span className="block text-xs font-serif font-bold uppercase">{t.label}</span>
                                  <span className="block text-[9px] text-neutral-400 mt-1">{t.desc}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4">
                            <button
                              type="submit"
                              disabled={isSubmittingMember}
                              className="w-full py-3 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-black-950 font-serif font-bold tracking-widest text-xs rounded-xl uppercase transition transform active:scale-98 disabled:opacity-50"
                              id="member-submit-btn"
                            >
                              {isSubmittingMember ? 'VERIFYING CREDENTIALS...' : 'GENERATE DADA CIRCLE CARD'}
                            </button>
                          </div>
                        </motion.form>
                      ) : (
                        /* DYNAMIC LUXURY DIGITAL CARD PREVIEW */
                        <motion.div 
                          key="card"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center py-6 text-center"
                          id="member-card-wrapper"
                        >
                          <div className="w-12 h-12 bg-brand-gold-500/10 border border-brand-gold-500 rounded-full flex items-center justify-center text-brand-gold-400 mb-4">
                            <Check className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-serif text-white uppercase mb-1">ENROLLMENT COMPLETE</h3>
                          <p className="text-neutral-400 text-xs mb-8">Your digital Dada's private access key card is ready for use.</p>

                          {/* Interactive Gold/Black Card */}
                          <div className="w-full max-w-sm rounded-2xl p-6 bg-gradient-to-br from-brand-black-900 to-brand-black-950 border-2 border-brand-gold-500 shadow-2xl relative overflow-hidden text-left mb-8">
                            {/* Watermark brand icon */}
                            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-brand-gold-500/5 border border-brand-gold-500/10 rounded-full pointer-events-none flex items-center justify-center font-serif text-9xl text-brand-gold-500/5 select-none">
                              D
                            </div>

                            {/* Card Header */}
                            <div className="flex items-center justify-between border-b border-brand-gold-500/20 pb-4 mb-6">
                              <div>
                                <span className="font-serif text-white tracking-[0.2em] font-bold text-sm block">DADA’S CIRCLE</span>
                                <span className="text-[8px] text-brand-gold-400 tracking-[0.1em] font-mono">PRIVATE DIGITAL HARVEST KEY</span>
                              </div>
                              <div className="w-8 h-8 rounded border border-brand-gold-500/30 flex items-center justify-center font-serif text-xs font-bold text-brand-gold-400">
                                D
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="space-y-4 mb-6 relative z-10">
                              <div>
                                <span className="block text-[8px] text-neutral-500 tracking-wider font-mono uppercase">MEMBER NAME</span>
                                <span className="text-sm font-serif font-semibold text-white uppercase tracking-wide">{memberProfile.name}</span>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="block text-[8px] text-neutral-500 tracking-wider font-mono uppercase">MEMBER ID</span>
                                  <span className="text-xs font-mono text-brand-gold-300 font-bold tracking-widest">{memberProfile.memberId}</span>
                                </div>
                                <div>
                                  <span className="block text-[8px] text-neutral-500 tracking-wider font-mono uppercase">ACCESS TIER</span>
                                  <span className="text-xs font-serif text-brand-gold-400 font-bold uppercase tracking-wider">{memberProfile.tier}</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="block text-[8px] text-neutral-500 tracking-wider font-mono uppercase">JOIN DATE</span>
                                  <span className="text-xs font-mono text-neutral-300">{memberProfile.joinedAt}</span>
                                </div>
                                <div>
                                  <span className="block text-[8px] text-neutral-500 tracking-wider font-mono uppercase">STATUS</span>
                                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                    ACTIVE
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Card Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-brand-gold-500/10">
                              <div className="flex items-center gap-2 text-[8px] text-neutral-400 font-mono">
                                <Lock className="w-3 h-3 text-brand-gold-400" />
                                <span>18+ SECURE COMPLIANCE</span>
                              </div>
                              <div className="flex gap-1.5">
                                <div className="w-1 h-3 bg-brand-gold-500/40" />
                                <div className="w-1.5 h-3 bg-brand-gold-500" />
                                <div className="w-0.5 h-3 bg-brand-gold-500/20" />
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <button
                              onClick={resetMembership}
                              className="px-4 py-2 bg-brand-black-900 hover:bg-brand-black-800 text-neutral-400 hover:text-white border border-neutral-800 text-xs font-serif tracking-wider rounded-lg transition"
                              id="member-reset-btn"
                            >
                              Enroll Another Account
                            </button>
                            <a
                              href="#strains"
                              onClick={(e) => scrollToSection(e, 'strains')}
                              className="px-6 py-2 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-black-950 font-serif font-bold tracking-wider text-xs rounded-lg transition flex items-center gap-1.5"
                              id="member-go-shop"
                            >
                              <span>Unlock Private Strains</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>

              </div>
            </div>
          </section>
        </motion.div>
      )}

      {/* 7. TRUST & RESPONSIBLE USE SECTION */}
      {activeSection === 'trust' && (
        <motion.div
          key="trust"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-28 pb-4 bg-brand-black-950 text-center border-b border-brand-gold-500/10">
            <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-brand-gold-500/5 border border-brand-gold-500/15 text-brand-gold-400 text-[10px] tracking-[0.25em] font-serif uppercase">
              <Sparkle className="w-2.5 h-2.5" />
              <span>LEGAL STATUTES</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-[0.1em] gold-glow">RESPONSIBILITY & COMPLIANCE</h1>
            <p className="text-neutral-400 text-xs mt-3 max-w-md mx-auto leading-relaxed">Our legal charter aligning Dada's private group with the laws of South Africa.</p>
          </div>
          <section id="trust" className="py-24 bg-brand-black-950 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="max-w-3xl mx-auto text-center mb-16">
                <span className="text-brand-gold-500 text-xs font-serif tracking-[0.25em] mb-3 block uppercase font-bold">REGULATORY CHARTER</span>
                <h2 className="text-3xl font-serif text-white tracking-wide uppercase">RESPONSIBILITY & COMPLIANCE</h2>
                <div className="h-[1px] w-12 bg-brand-gold-500/30 mx-auto mt-4 mb-4" />
                <p className="text-neutral-400 text-xs leading-relaxed max-w-xl mx-auto">
                  Dada’s Dispensary is fully aligned with responsible personal cultivation and private consumption laws. We champion meticulous security, exact chemical tracking, and safe adult storage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                <div className="p-6 bg-brand-black-900 border border-neutral-900 rounded-xl hover:border-brand-gold-500/20 transition duration-300" id="trust-card-0">
                  <div className="w-10 h-10 bg-brand-gold-500/5 rounded-xl border border-brand-gold-500/20 flex items-center justify-center text-brand-gold-400 mb-4">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-serif text-white font-semibold uppercase mb-2">18+ Strictly Verified</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    Access is legally gated. Every delivery, register, and consultation requires verified government ID scanning. No exceptions.
                  </p>
                </div>

                <div className="p-6 bg-brand-black-900 border border-neutral-900 rounded-xl hover:border-brand-gold-500/20 transition duration-300" id="trust-card-1">
                  <div className="w-10 h-10 bg-brand-gold-500/5 rounded-xl border border-brand-gold-500/20 flex items-center justify-center text-brand-gold-400 mb-4">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-serif text-white font-semibold uppercase mb-2">Scent-Proof Security</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    Shipped in insulated double-sealed thick glass containers inside unmarked, durable matte black luxury boxes to secure absolute privacy.
                  </p>
                </div>

                <div className="p-6 bg-brand-black-900 border border-neutral-900 rounded-xl hover:border-brand-gold-500/20 transition duration-300" id="trust-card-2">
                  <div className="w-10 h-10 bg-brand-gold-500/5 rounded-xl border border-brand-gold-500/20 flex items-center justify-center text-brand-gold-400 mb-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-serif text-white font-semibold uppercase mb-2">Private Escort Delivery</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    Our direct couriers are professionally vetted private drivers trained in absolute hospitality, executing precise drop times silently.
                  </p>
                </div>

                <div className="p-6 bg-brand-black-900 border border-neutral-900 rounded-xl hover:border-brand-gold-500/20 transition duration-300" id="trust-card-3">
                  <div className="w-10 h-10 bg-brand-gold-500/5 rounded-xl border border-brand-gold-500/20 flex items-center justify-center text-brand-gold-400 mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-serif text-white font-semibold uppercase mb-2">Laboratory Certified</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    Pesticide-free guarantee. Multi-phase gas chromatography reports for cannabinoids and terpene ratios provided with every batch.
                  </p>
                </div>

              </div>

              {/* Responsible Use Banner */}
              <div className="mt-12 p-6 rounded-2xl bg-brand-black-900 border border-brand-gold-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex gap-4 items-center">
                  <Lock className="w-10 h-10 text-brand-gold-500/40 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-serif text-white uppercase font-bold tracking-wider">Keep Out of Reach of Children</h4>
                    <p className="text-neutral-400 text-xs leading-relaxed mt-0.5 max-w-xl">
                      Cannabis must always be stored in locked container drawers away from minors. Consume responsibly. Cannabis may affect fine motor skills and judgment.
                    </p>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-neutral-500 bg-brand-black-950 border border-neutral-800 px-3 py-1.5 rounded uppercase tracking-wider">
                  SOUTH AFRICAN LAW ACT 4 OF 2018 ALIGNED
                </div>
              </div>

            </div>
          </section>
        </motion.div>
      )}

      {/* CONTACT US SECTION */}
      {activeSection === 'contact' && (
        <motion.div
          key="contact"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-28 pb-4 bg-brand-black-950 text-center border-b border-brand-gold-500/10">
            <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-brand-gold-500/5 border border-brand-gold-500/15 text-brand-gold-400 text-[10px] tracking-[0.25em] font-serif uppercase">
              <Sparkle className="w-2.5 h-2.5" />
              <span>SECURED COMMUNICATIONS</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-[0.1em] gold-glow">CONCIERGE HELP DESK</h1>
            <p className="text-neutral-400 text-xs mt-3 max-w-md mx-auto leading-relaxed">Reach our secure local dispatchers and sommelier guides directly.</p>
          </div>
          <section id="contact" className="py-24 bg-brand-black-950 border-t border-brand-gold-500/10 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-brand-gold-500 text-xs font-serif tracking-[0.25em] mb-3 block uppercase font-bold">COMMUNICATION</span>
                <h2 className="text-3xl font-serif text-white tracking-wide uppercase">SECURED CONCIERGE SUPPORT</h2>
                <div className="h-[1px] w-12 bg-brand-gold-500/30 mx-auto mt-4 mb-4" />
                <p className="text-neutral-400 text-xs leading-relaxed max-w-xl mx-auto">
                  Should you require custom drapes, private sommelier consulting, bespoke order requests, or local delivery coordination, transmit your request below.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Side: Contact details */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="p-8 bg-brand-black-900 border border-neutral-900 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <h3 className="text-lg font-serif text-white uppercase tracking-wider mb-4">Concierge Desk</h3>
                    <p className="text-neutral-400 text-xs leading-relaxed mb-8">
                      Dada’s operates with a strict mandate of confidentiality. Your contact information is never logged on public directories, and all communications are processed securely through private channels.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-brand-gold-500/5 border border-brand-gold-500/20 flex items-center justify-center text-brand-gold-400 flex-shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Discreet Telephone</span>
                          <span className="text-xs text-neutral-200 font-mono hover:text-brand-gold-400 transition cursor-pointer">+27 21 555 0192</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-brand-gold-500/5 border border-brand-gold-500/20 flex items-center justify-center text-brand-gold-400 flex-shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Encrypted Correspondence</span>
                          <span className="text-xs text-neutral-200 font-mono hover:text-brand-gold-400 transition cursor-pointer">concierge@dadasdispensary.co.za</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-brand-gold-500/5 border border-brand-gold-500/20 flex items-center justify-center text-brand-gold-400 flex-shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Private Vault Location</span>
                          <span className="text-xs text-neutral-200 font-serif">142 Bree Street, Cape Town, 8001</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-brand-gold-500/5 border border-brand-gold-500/20 flex items-center justify-center text-brand-gold-400 flex-shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Concierge Hours</span>
                          <span className="text-xs text-neutral-200 font-mono">Mon - Sat: 10:00 - 21:00</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-brand-gold-500/10 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider">Secure Server Link Verified</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:col-span-7">
                  <div className="p-8 bg-brand-black-900 border border-neutral-900 rounded-2xl relative overflow-hidden">
                    
                    {contactSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 space-y-6"
                      >
                        <div className="w-16 h-16 mx-auto rounded-full bg-brand-gold-500/10 border border-brand-gold-500 flex items-center justify-center text-brand-gold-400 shadow-lg shadow-brand-gold-500/10">
                          <Check className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-serif text-white uppercase tracking-wider">TRANSMISSION SECURED</h3>
                          <p className="text-neutral-400 text-xs leading-relaxed max-w-md mx-auto">
                            Thank you for your transmission. Your encrypted communication has been received securely. A dedicated private concierge will review your parameters and respond within 120 minutes.
                          </p>
                        </div>
                        <div className="pt-4">
                          <button
                            onClick={() => setContactSubmitted(false)}
                            className="px-6 py-2.5 bg-brand-black-800 hover:bg-brand-black-700 text-neutral-300 hover:text-brand-gold-400 border border-neutral-800 rounded-lg text-xs font-mono tracking-wider transition duration-300"
                            id="btn-new-contact-transmission"
                          >
                            SEND ANOTHER TRANSMISSION
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-6" id="form-contact">
                        
                        {/* Title inside card */}
                        <div>
                          <h3 className="text-sm font-serif text-white font-semibold uppercase tracking-wider mb-1">Secure Inquiry Form</h3>
                          <p className="text-neutral-500 text-[10px]">Provide your parameters below to submit an encrypted inquiry.</p>
                        </div>

                        {/* Inquiry Type Selectors */}
                        <div>
                          <label className="block text-[10px] text-neutral-400 tracking-wider font-mono uppercase mb-2">Inquiry Intent</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {['Private Drop', 'Membership', 'Consultation', 'Logistics'].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setContactInquiryType(type)}
                                className={`py-2 px-3 text-[10px] font-mono rounded-lg border text-center transition focus:outline-none cursor-pointer ${
                                  contactInquiryType === type
                                    ? 'bg-brand-gold-500/15 border-brand-gold-500 text-brand-gold-400 font-bold'
                                    : 'bg-brand-black-950 border-neutral-800 hover:border-brand-gold-500/30 text-neutral-400'
                                }`}
                                id={`contact-intent-${type}`}
                              >
                                {type.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Name and Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] text-neutral-400 tracking-wider font-mono uppercase mb-1.5">Your Name *</label>
                            <input 
                              type="text"
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="Alex Mercer"
                              className="w-full bg-brand-black-950 border border-neutral-800 focus:border-brand-gold-500 focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 transition"
                              id="input-contact-name"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-neutral-400 tracking-wider font-mono uppercase mb-1.5">Secure Email *</label>
                            <input 
                              type="email"
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="alex@mercer.com"
                              className="w-full bg-brand-black-950 border border-neutral-800 focus:border-brand-gold-500 focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 transition"
                              id="input-contact-email"
                            />
                          </div>
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="block text-[10px] text-neutral-400 tracking-wider font-mono uppercase mb-1.5">Subject</label>
                          <input 
                            type="text"
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            placeholder="e.g. Sommelier booking inquiry"
                            className="w-full bg-brand-black-950 border border-neutral-800 focus:border-brand-gold-500 focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 transition"
                            id="input-contact-subject"
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-[10px] text-neutral-400 tracking-wider font-mono uppercase mb-1.5">Message Parameters *</label>
                          <textarea 
                            required
                            rows={4}
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="Write your discrete message parameters..."
                            className="w-full bg-brand-black-950 border border-neutral-800 focus:border-brand-gold-500 focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 transition resize-none"
                            id="input-contact-message"
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmittingContact}
                          className="w-full py-3 bg-brand-gold-500 hover:bg-brand-gold-400 disabled:bg-neutral-800 disabled:text-neutral-600 text-brand-black-950 font-serif font-semibold tracking-wider rounded-xl transition duration-300 transform active:scale-[0.98] focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
                          id="btn-contact-submit"
                        >
                          {isSubmittingContact ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-brand-black-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>TRANSMITTING SECURELY...</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              <span>TRANSMIT SECURE MESSAGE</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}

                  </div>
                </div>

              </div>

            </div>
          </section>
        </motion.div>
      )}

    </AnimatePresence>
  </main>

  {/* 8. MINIMAL LUXURY FOOTER */}
  <footer className="bg-brand-black-950 border-t border-brand-gold-500/10 pt-20 pb-10 relative z-10" id="footer">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
                
                {/* Brand Foot Info */}
                <div className="md:col-span-4 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 border border-brand-gold-500/30 rounded overflow-hidden flex items-center justify-center p-0.5 bg-brand-black-900 shadow-md">
                      <img src={BRAND_LOGO} alt="Dada's Logo" className="w-full h-full object-cover rounded" referrerPolicy="no-referrer" />
                    </div>
                    <span className="font-serif text-white font-medium tracking-[0.25em] text-sm uppercase">Dada’s Dispensary</span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    Sourcing soil-to-cure organic cannabis for discerning medical and recreational circle members. Hand-trimmed genetics curating a higher lifestyle standard.
                  </p>
                  <div className="flex items-center gap-4 text-neutral-500 hover:text-brand-gold-400 transition">
                    <Instagram className="w-4 h-4 cursor-pointer hover:text-brand-gold-400 transition" />
                    <Mail className="w-4 h-4 cursor-pointer hover:text-brand-gold-400 transition" />
                    <span className="text-[10px] font-mono font-medium">@dadasdispensary</span>
                  </div>
                </div>

                {/* Footer Navigation */}
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-xs font-serif text-white tracking-widest uppercase font-semibold">NAVIGATION</h4>
                  <ul className="space-y-2 text-xs font-light text-neutral-400">
                    <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-brand-gold-400 transition">Home Base</a></li>
                    <li><a href="#story" onClick={(e) => scrollToSection(e, 'story')} className="hover:text-brand-gold-400 transition">Brand Story</a></li>
                    <li><a href="#categories" onClick={(e) => scrollToSection(e, 'categories')} className="hover:text-brand-gold-400 transition">Categories</a></li>
                    <li><a href="#strains" onClick={(e) => scrollToSection(e, 'strains')} className="hover:text-brand-gold-400 transition">Curated Strains</a></li>
                    <li><a href="#circle" onClick={(e) => scrollToSection(e, 'circle')} className="hover:text-brand-gold-400 transition">Dada Circle</a></li>
                  </ul>
                </div>

                {/* Opening Hours & Delivery */}
                <div className="md:col-span-3 space-y-4">
                  <h4 className="text-xs font-serif text-white tracking-widest uppercase font-semibold">DISPATCH HOURS</h4>
                  <ul className="space-y-2 text-xs text-neutral-400 font-mono">
                    <li className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-brand-gold-500/50" />
                      <span>Mon - Sat: 10:00 - 21:00</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-brand-gold-500/50" />
                      <span>Sunday: 11:00 - 18:00</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold-500/50" />
                      <span>Cape Town Metro Wide</span>
                    </li>
                    <li className="flex items-center gap-2 text-[10px] text-brand-gold-400 uppercase tracking-wider font-semibold">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Scents-Proof Discreet Drop</span>
                    </li>
                  </ul>
                </div>

                {/* Contact and Join */}
                <div className="md:col-span-3 space-y-4">
                  <h4 className="text-xs font-serif text-white tracking-widest uppercase font-semibold">CONCIERGE INQUIRIES</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    Need custom dosing counsel, or a bespoke strain curated? Write to our concierge desk:
                  </p>
                  <ul className="space-y-1.5 text-xs text-neutral-300 font-mono">
                    <li className="hover:text-brand-gold-400 transition cursor-pointer">📧 concierge@dadasdispensary.co.za</li>
                    <li className="hover:text-brand-gold-400 transition cursor-pointer">📞 +27 21 555 0192</li>
                  </ul>
                </div>

              </div>

              {/* Legal Copyright Disclaimer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[10px] text-neutral-600 font-mono tracking-wider">
                <div>
                  © 2026 DADA’S DISPENSARY PRIVATE BRAND. ALL RIGHTS RESERVED.
                </div>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
                  <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-brand-gold-400 transition">ABOUT US</a>
                  <span>•</span>
                  <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-brand-gold-400 transition">CONTACT US</a>
                  <span>•</span>
                  <span className="cursor-pointer hover:text-neutral-400 transition">PRIVACY CHARTER</span>
                  <span>•</span>
                  <span className="cursor-pointer hover:text-neutral-400 transition">18+ REGISTER</span>
                </div>
              </div>

            </div>
          </footer>

          {/* SIDE DRAWER: INTERACTIVE SHOPPING BAG & RESERVATIONS */}
          <AnimatePresence>
            {isCartOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
                id="cart-drawer-overlay"
              >
                {/* Backdrop Click */}
                <div className="absolute inset-0 cursor-pointer" onClick={() => setIsCartOpen(false)} />

                {/* Drawer */}
                <motion.div 
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-brand-black-950 border-l border-brand-gold-500/15 shadow-2xl flex flex-col justify-between"
                  id="cart-drawer-container"
                >
                  
                  {/* Drawer Header */}
                  <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-brand-gold-400" />
                      <span className="font-serif text-white uppercase tracking-widest font-bold">Circle Bag</span>
                      <span className="text-xs font-mono text-neutral-500">({cartItemCount} items)</span>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 text-neutral-500 hover:text-white rounded-lg focus:outline-none"
                      aria-label="Close Bag"
                      id="cart-drawer-close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Drawer Content */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <ShoppingBag className="w-12 h-12 text-neutral-700" />
                        <div>
                          <p className="text-white font-serif uppercase tracking-wider text-sm">Your Bag is Empty</p>
                          <p className="text-neutral-500 text-xs mt-1">Enroll in Dada's Circle and select from our private curated strains.</p>
                        </div>
                        <button
                          onClick={() => {
                            setIsCartOpen(false);
                            const element = document.getElementById('strains');
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-6 py-2.5 bg-brand-gold-500 text-brand-black-950 font-serif font-bold tracking-wider text-xs rounded-xl uppercase transition hover:bg-brand-gold-400"
                        >
                          SHOP PRIVATE DROPS
                        </button>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div 
                          key={item.product.id}
                          className="p-4 bg-brand-black-900 border border-neutral-900 rounded-xl flex items-center gap-4 justify-between"
                          id={`cart-item-${item.product.id}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded bg-brand-black-950 border border-neutral-800 overflow-hidden flex-shrink-0">
                              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover filter brightness-75" referrerPolicy="no-referrer" />
                            </div>
                            <div>
                              <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider leading-none mb-1">{item.product.name}</h4>
                              <span className="text-[10px] text-neutral-500 font-mono block uppercase mb-1">{item.product.category} • {item.product.weight}</span>
                              <span className="text-xs font-mono text-brand-gold-400 font-bold">R {item.product.price * 10}</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center bg-brand-black-950 border border-neutral-800 rounded-lg overflow-hidden">
                              <button 
                                onClick={() => updateCartQuantity(item.product.id, -1)}
                                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 focus:outline-none"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 font-mono text-xs text-white font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => updateCartQuantity(item.product.id, 1)}
                                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 focus:outline-none"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-neutral-500 hover:text-red-400 p-1 text-[10px] uppercase font-mono flex items-center gap-1 transition"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Drawer Footer */}
                  {cart.length > 0 && (
                    <div className="p-6 bg-brand-black-900 border-t border-neutral-900 space-y-4">
                      
                      {/* Pricing breakdowns */}
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-neutral-400">
                          <span>Strain Subtotal</span>
                          <span className="font-mono font-semibold text-white">R {cartSubtotal * 10}</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                          <span>Discreet Escort Courier</span>
                          <span className="font-mono text-emerald-400 uppercase text-[10px] font-bold tracking-wider">COMPLIMENTARY</span>
                        </div>
                        <div className="h-[1px] bg-neutral-800/80 my-2" />
                        <div className="flex justify-between text-sm">
                          <span className="font-serif text-white uppercase tracking-wider font-bold">Total Reservation</span>
                          <span className="font-mono font-bold text-brand-gold-400 text-base">R {cartSubtotal * 10}</span>
                        </div>
                      </div>

                      {/* Compliance Alert */}
                      <div className="p-3 rounded-lg bg-brand-black-950 border border-brand-gold-500/10 flex items-start gap-2.5">
                        <Shield className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-[9px] text-white font-serif uppercase tracking-wider font-bold">DISCREET SECURE RESERVATION</span>
                          <span className="block text-[9px] text-neutral-500 mt-0.5 leading-normal">
                            All drops are double-scented bag escorted, requiring age-verification ID matching on delivery.
                          </span>
                        </div>
                      </div>

                      {/* Complete Checkout Reservation */}
                      {memberProfile ? (
                        <button
                          onClick={() => {
                            alert(`Thank you, member ${memberProfile.name} (${memberProfile.memberId})! Your curated reservation of R ${cartSubtotal * 10} has been secured. Our private concierge driver will contact you at ${memberProfile.phone || 'your registered email'} shortly to lock in drop coordinates.`);
                            clearCart();
                            setIsCartOpen(false);
                          }}
                          className="w-full py-3.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-black-950 font-serif font-bold text-xs tracking-widest uppercase rounded-xl transition transform active:scale-98"
                          id="cart-checkout-verified"
                        >
                          SECURE DROP RESERVATION
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              setIsCartOpen(false);
                              const element = document.getElementById('circle');
                              if (element) element.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full py-3.5 bg-brand-black-800 hover:bg-brand-black-700 text-brand-gold-400 hover:text-brand-gold-300 border border-brand-gold-500/20 text-xs font-serif tracking-widest uppercase rounded-xl transition text-center flex items-center justify-center gap-1.5"
                            id="cart-checkout-unverified"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>JOIN CIRCLE TO UNLOCK DISPATCH</span>
                          </button>
                          <span className="block text-[8px] text-center text-neutral-500 font-mono tracking-wider">
                            ENROLLMENT REQUIRED FOR PRIVATE ACCESS SHIPPING
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MODAL: INTERACTIVE STRAIN / PRODUCT SPECS */}
          <AnimatePresence>
            {selectedProduct && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                id="product-spec-modal-overlay"
              >
                {/* Backdrop Click */}
                <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedProduct(null)} />

                {/* Modal Container */}
                <motion.div 
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-3xl w-full bg-brand-black-950 border border-brand-gold-500/25 rounded-2xl relative z-10 overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh] md:h-auto"
                  id="product-spec-modal-container"
                >
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-brand-black-900/60 hover:bg-brand-black-850 border border-neutral-800 hover:border-brand-gold-500/20 rounded-lg transition"
                    id="spec-modal-close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Left Column: Media & Quick Indicators */}
                  <div className="w-full md:w-1/2 bg-brand-black-900 relative aspect-video md:aspect-auto">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover filter brightness-75 saturate-75"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black-950 via-transparent to-brand-black-950/20" />
                    
                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-brand-black-950/80 backdrop-blur-sm rounded-xl border border-neutral-800/60">
                      <span className="block text-[8px] text-neutral-500 font-mono uppercase tracking-widest mb-1">CHEMICAL RATIO</span>
                      <div className="flex gap-4 font-mono">
                        <div>
                          <span className="block text-[9px] text-neutral-400">THC POTENCY</span>
                          <span className="text-sm font-bold text-brand-gold-400">{selectedProduct.thc}</span>
                        </div>
                        {selectedProduct.cbd && (
                          <div>
                            <span className="block text-[9px] text-neutral-400">CBD RATIO</span>
                            <span className="text-sm font-bold text-neutral-300">{selectedProduct.cbd}</span>
                          </div>
                        )}
                        <div>
                          <span className="block text-[9px] text-neutral-400">WEIGHT</span>
                          <span className="text-sm font-bold text-neutral-300">{selectedProduct.weight}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Descriptions & Actions */}
                  <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto h-full max-h-[50vh] md:max-h-[85vh]">
                    <div>
                      {/* Product Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-brand-gold-500 font-mono tracking-widest uppercase">{selectedProduct.category}</span>
                        <span className="text-[9px] px-2.5 py-0.5 rounded font-mono bg-brand-black-900 border border-neutral-850 text-white font-medium uppercase">{selectedProduct.type}</span>
                      </div>

                      <h3 className="text-2xl font-serif text-white tracking-wide uppercase mb-2">{selectedProduct.name}</h3>

                      {/* Lineage */}
                      {selectedProduct.strainLineage && (
                        <div className="p-3 bg-brand-black-900/60 border border-neutral-900 rounded-lg text-xs font-mono text-brand-gold-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <span>🧬 GENETIC LINEAGE:</span>
                          <span className="text-white font-semibold">{selectedProduct.strainLineage}</span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-neutral-300 text-xs font-light leading-relaxed mb-6">
                        {selectedProduct.description}
                      </p>

                      {/* Terpene Profile */}
                      {selectedProduct.terpenes && selectedProduct.terpenes.length > 0 && (
                        <div className="mb-6">
                          <span className="block text-[10px] text-neutral-500 font-mono tracking-wider uppercase mb-2">DOMINANT TERPENES</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedProduct.terpenes.map((terp, idx) => (
                              <span key={idx} className="text-[10px] px-3 py-1 bg-brand-gold-500/5 hover:bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/20 rounded-lg font-mono">
                                🧪 {terp}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Curated Sensory Effects */}
                      <div className="mb-6">
                        <span className="block text-[10px] text-neutral-500 font-mono tracking-wider uppercase mb-2">SENSORY OUTCOMES</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProduct.effects.map((eff, i) => (
                            <span key={i} className="text-[10px] px-2.5 py-1 bg-brand-black-900 border border-neutral-800 text-neutral-300 rounded">
                              ✓ {eff}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Reservation controls */}
                    <div className="pt-6 border-t border-neutral-900/80 flex items-center justify-between gap-4 mt-8">
                      <div>
                        <span className="text-[9px] text-neutral-500 font-mono block uppercase">total price</span>
                        <span className="text-xl font-mono text-brand-gold-400 font-bold">R {selectedProduct.price * 10}</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedProduct(null)}
                          className="px-4 py-2.5 bg-brand-black-900 hover:bg-brand-black-800 text-neutral-400 hover:text-white border border-neutral-800 text-xs font-serif uppercase tracking-widest rounded-xl transition"
                        >
                          Go Back
                        </button>
                        <button
                          onClick={() => {
                            addToCart(selectedProduct);
                            setSelectedProduct(null);
                          }}
                          className="px-6 py-2.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-black-950 text-xs font-serif font-bold tracking-widest uppercase rounded-xl transition transform active:scale-95 flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>RESERVE BATCH</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

    </div>
  );
}
