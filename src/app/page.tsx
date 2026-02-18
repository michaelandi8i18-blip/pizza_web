'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Pizza, 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle,
  ChevronDown,
  Leaf,
  Award,
  Heart
} from 'lucide-react'

// Single Pizza Menu
const pizzaMenu = {
  name: "Pizza Royale Spéciale",
  description: "Saus tomat premium san marzano, mozzarella berkualitas tinggi, pepperoni pilihan, paprika, jamur segar, dan taburan herbs provence. Dipanggang dengan sempurna dalam oven tradisional.",
  price: 70000,
  image: "c:\Users\Hype AMD\Downloads\WhatsApp Image 2026-02-18 at 13.58.38.jpeg",
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

const whatsappNumber = "6281380782229"

const handleOrder = () => {
  const message = `Bonjour! 🇫🇷%0A%0ASaya ingin memesan:%0A🍕 ${pizzaMenu.name}%0AHarga: ${formatPrice(pizzaMenu.price)}%0A%0ATerima kasih!`
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

// Animated Section Component
function AnimatedSection({ 
  children, 
  className = "",
  variant = "fadeInUp"
}: { 
  children: React.ReactNode
  className?: string
  variant?: "fadeInUp" | "fadeIn" | "scaleIn"
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const variants = {
    fadeInUp,
    fadeIn,
    scaleIn
  }
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Parallax Background Component
function ParallaxBackground() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  return (
    <motion.div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&h=1080&fit=crop)',
        y,
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        style={{ opacity }}
      />
    </motion.div>
  )
}

// Scroll Progress Indicator
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 origin-left z-[100]"
      style={{ scaleX }}
    />
  )
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  // Smooth scroll value for nav
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  )
  
  const navShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 rgba(0,0,0,0)', '0 10px 30px rgba(0,0,0,0.1)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ scrollBehavior: 'smooth' }}>
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 py-5"
        style={{ 
          backgroundColor: navBackground,
          boxShadow: navShadow,
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg">
                <Pizza className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`font-playfair text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  Bell Bakery
                </h1>
                <p className={`text-xs font-cormorant tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isScrolled ? 'text-muted-foreground' : 'text-white/80'
                }`}>
                  Royale
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="hidden md:flex items-center gap-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button 
                onClick={() => scrollToSection('menu')}
                className={`font-cormorant text-lg transition-colors hover:text-amber-600 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`font-cormorant text-lg transition-colors hover:text-amber-600 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                Tentang Kami
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`font-cormorant text-lg transition-colors hover:text-amber-600 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                Kontak
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button 
                onClick={handleOrder}
                className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-amber-500/30 transition-all duration-300 btn-shine"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Order
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <ParallaxBackground />

        {/* Decorative Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 border border-amber-500/30 rounded-full opacity-50"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-24 h-24 border border-amber-500/20 rounded-full opacity-50"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* French Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-2xl">🇫🇷</span>
            <span className="text-white/90 font-cormorant text-lg tracking-wide">
              Authentic Bakery Culinary Art
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
           Bella Bakery
            <motion.span 
              className="block text-gold-gradient mt-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Royale
            </motion.span>
          </motion.h1>

          {/* Decorative Line */}
          <motion.div 
            className="flex items-center justify-center gap-4 my-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <Pizza className="w-6 h-6 text-amber-500" />
            <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="font-cormorant text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            "L'art de la Bakery française"
          </motion.p>
          
          <motion.p 
            className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Rasakan kelezatan pizza artisan dengan sentuhan elegan masakan Perancis. 
            Dibuat dengan cinta dan bahan-bahan premium pilihan.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button 
              size="lg"
              onClick={() => scrollToSection('menu')}
              className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white font-bold px-10 py-6 text-lg rounded-full shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 btn-shine animate-pulse-gold"
            >
              <Pizza className="w-5 h-5 mr-2" />
              Lihat Menu
            </Button>
            <Button 
              size="lg"
              onClick={handleOrder}
              className="bg-white/10 backdrop-blur-sm border-2 border-amber-500 text-white hover:bg-amber-500 hover:border-amber-500 font-bold px-10 py-6 text-lg rounded-full shadow-2xl transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Order via WhatsApp
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* Features Bar */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 py-8 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { icon: Clock, title: "Pengiriman Cepat", subtitle: "30-45 menit" },
              { icon: Leaf, title: "Bahan Segar", subtitle: "Premium Quality" },
              { icon: Award, title: "Chef Berpengalaman", subtitle: "10+ Tahun" },
              { icon: Heart, title: "Dibuat dengan Cinta", subtitle: "Handcrafted" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-center gap-3 text-white"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="font-semibold">{feature.title}</p>
                  <p className="text-sm text-white/70">{feature.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu Section - Single Pizza */}
      <section id="menu" className="py-24 px-4 bg-gradient-to-b from-background to-muted/30 relative">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block font-cormorant text-amber-600 text-lg tracking-[0.3em] uppercase mb-4">
              Notre Spécialité
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Menu <span className="text-gold-gradient">Spesial</span> Kami
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-amber-500" />
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Setiap Hidangan dibuat dengan penuh dedikasi menggunakan bahan-bahan pilihan berkualitas tinggi
            </p>
          </AnimatedSection>

          {/* Single Pizza Card */}
          <AnimatedSection variant="scaleIn">
            <Card className="border-2 border-amber-500/20 hover:border-amber-500/40 overflow-hidden bg-card group max-w-2xl mx-auto elegant-card">
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <motion.img 
                  src={pizzaMenu.image} 
                  alt={pizzaMenu.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badge */}
                <motion.div 
                  className="absolute top-4 left-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 px-4 py-1.5 text-sm shadow-lg">
                    ⭐ Menu Favorit
                  </Badge>
                </motion.div>

                {/* Vegetarian Tag */}
                <motion.div 
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                </motion.div>

                {/* Price Tag */}
                <motion.div 
                  className="absolute bottom-4 right-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl">
                    <p className="font-bold text-2xl text-amber-700">{formatPrice(pizzaMenu.price)}</p>
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <CardContent className="p-8">
                <motion.h3 
                  className="font-playfair text-3xl font-bold text-foreground mb-3 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {pizzaMenu.name}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground text-center mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {pizzaMenu.description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Button 
                    onClick={handleOrder}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 btn-shine animate-pulse-gold"
                  >
                    <MessageCircle className="w-6 h-6 mr-2" />
                    Order Sekarang via WhatsApp
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <AnimatedSection>
            <span className="inline-block font-cormorant text-amber-300 text-lg tracking-[0.3em] uppercase mb-4">
              Notre Histoire
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-6">
              Kisah <span className="text-gold-gradient">Kami</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto mb-8" />
          </AnimatedSection>
          
          <AnimatedSection>
            <p className="text-white/90 text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
              Bella Bakery Royale lahir dari passion kami terhadap seni kuliner Perancis dan Italia. 
              Berawal dari dapur kecil di tahun 2025, kini kami telah melayani banyak pelanggan setia.
            </p>
          </AnimatedSection>
          
          <AnimatedSection>
            <p className="text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
              Setiap hidangan dibuat dengan tangan oleh chef berpengalaman kami, menggunakan resep rahasia 
              yang telah diwariskan turun-temurun dengan bahan-bahan premium pilihan.
            </p>
          </AnimatedSection>

          <AnimatedSection variant="scaleIn">
            <Button 
              onClick={handleOrder}
              className="bg-white text-amber-900 hover:bg-amber-100 font-bold px-10 py-6 text-lg rounded-full shadow-xl transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Hubungi Kami
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-muted/30 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block font-cormorant text-amber-600 text-lg tracking-[0.3em] uppercase mb-4">
              Contactez-Nous
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Hubungi <span className="text-gold-gradient">Kami</span>
            </h2>
          </AnimatedSection>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { icon: MapPin, title: "Lokasi", content: "BHPE G1 \Kotawaringin Timur" },
              { icon: Phone, title: "Telepon", content: "+62 813-8078-2229\n10:00 - 22:00" },
              { icon: MessageCircle, title: "WhatsApp", content: "", isAction: true }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-2 border-amber-500/10 hover:border-amber-500/30 bg-card text-center p-6 transition-all duration-300 h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold mb-2">{item.title}</h3>
                  {item.isAction ? (
                    <Button 
                      onClick={handleOrder}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full mt-2"
                    >
                      Chat Sekarang
                    </Button>
                  ) : (
                    <p className="text-muted-foreground text-sm whitespace-pre-line">
                      {item.content}
                    </p>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)'
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <AnimatedSection>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
              Pesan Pizza Royale Spéciale
            </h2>
            <p className="text-white/90 text-lg mb-4">
              Hanya <span className="font-bold text-2xl">{formatPrice(pizzaMenu.price)}</span>
            </p>
            <p className="text-white/80 mb-8">
              Pesan sekarang dan rasakan pengalaman kuliner yang tak terlupakan!
            </p>
          </AnimatedSection>
          
          <AnimatedSection variant="scaleIn">
            <Button 
              onClick={handleOrder}
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-100 font-bold px-12 py-7 text-xl rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 animate-pulse-gold"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Order Sekarang
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center">
                <Pizza className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold">Bella Bakery Royale</h3>
                <p className="text-xs font-cormorant tracking-[0.2em] uppercase text-white/60">
                  Authentic French Bakery
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-6 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                +62 813-8078-2229
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                10:00 - 22:00
              </span>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-white/10 mt-6 pt-6 text-center">
            <p className="text-white/50 text-sm">
              © 2024 Bella Bakery Royale. All rights reserved. | &ldquo;L&apos;art de la Bakery française&rdquo;
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
