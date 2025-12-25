import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Menu, 
  X, 
  Star, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  TrendingUp,
  Box,
  Cpu,
  ExternalLink,
  ArrowUpRight,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

// --- DATOS DE EJEMPLO (MOCK DATA) ---
const INITIAL_APPS = [
  {
    id: 17,
    name: "Microsoft Copilot Pro",
    developer: "FonApps",
    category: "IA",
    rating: 4.8,
    downloads: "50M+",
    size: "55,43 MB",
    version: "v30.0.43",
    image: "/icons/copilot.png",
    thumbnail: "/Thumb/copilot_thumb.webp",
description: "Desbloqueamos el potencial completo de la IA. Disfruta de acceso ilimitado al modelo GPT-5.1 y al generador de imágenes Ultra-HD sin pagar suscripción. Hemos eliminado todos los límites de uso, la censura en las respuestas y las colas de espera. Tienes la herramienta más potente de Microsoft totalmente liberada y a máxima velocidad en tu bolsillo.",
modFeatures: ["GPT-5.1 Desbloqueado", "DALL-E Ilimitado", "Velocidad Máxima"],
warning: "Requisito: Inicia sesión con Microsoft para guardar tus chats.",
    downloadUrl: "https://cuty.io/MCopilotPRO"
  },
  {
    id: 16,
    name: "Weather & Radar Pro",
    developer: "FonApps",
    category: "Herramientas",
    rating: 4.8,
    downloads: "100M+",
    size: "36,77 MB",
    version: "v2025.25",
    image: "/icons/weather_radar.png",
    thumbnail: "/Thumb/weather_radar_thumb.webp",
    description: "La aplicación meteorológica líder en precisión. Versión Pro desbloqueada que ofrece radar de lluvia en tiempo real, alertas de clima severo, zoom ilimitado en mapas y pronósticos detallados a 14 días sin publicidad intrusiva.",
    modFeatures: ["Pro Desbloqueado", "Sin Anuncios", "Radar Premium"],
    downloadUrl: "https://cuty.io/TiempoyRadar"
  },
  {
    id: 15,
    name: "Grok AI Premium",
    developer: "FonApps",
    category: "IA",
    rating: 4.9,
    downloads: "50M+",
    size: "25,35 MB",
    version: "v1.0.94-release-03",
    image: "/icons/grok_ai.webp",
    thumbnail: "/Thumb/grok_ai_thumb.webp",
    description: "Accede a la inteligencia artificial más audaz y sin censura. Respuestas en tiempo real con datos actualizados y modo sarcástico desbloqueado.",
    warning: "Nota: Debes iniciar sesión con tu cuenta de X (antes Twitter).",
    modFeatures: ["Premium Desbloqueado", "Imagine", "Sin Censura", ],
    downloadUrl: "https://cuty.io/GrokAIX"
  },
  {
    id: 14,
    name: "Nova Launcher Prime",
    developer: "FonApps",
    category: "Personalización",
    rating: 3.9,
    downloads: "100M+",
    size: "15,71 MB",
    version: "v8.1.6",
    image: "/icons/nova_launcher.png",
    thumbnail: "/Thumb/nova_launcher_thumb.webp",
    description: "El launcher más potente y personalizable. Versión Prime totalmente desbloqueada: gestos, grupos en el cajón, ocultar aplicaciones y efectos de desplazamiento exclusivos.",
    modFeatures: ["Prime Desbloqueado", "Gestos", "Ocultar Apps"],
    downloadUrl: "https://cuty.io/NovaLauncher"
  },
  {
    id: 13,
    name: "Niagara Launcher Pro",
    developer: "FonApps",
    category: "Personalización",
    rating: 4.7,
    downloads: "10M+",
    size: "13,79 MB",
    version: "v1.15.6",
    image: "/icons/niagara_launcher.png",
    thumbnail: "/Thumb/niagara_launcher_thumb.webp",
    description: "La pantalla de inicio más limpia para Android. Versión Pro desbloqueada con acceso a todos los widgets,temas, iconos adaptativos y personalización avanzada de fuentes y colores.",
    modFeatures: ["Pro Desbloqueado", "Widgets y temas Premium", "Iconos Adaptativos"],
    downloadUrl: "https://cuty.io/NiagaraLaunc"
  },
  {
    id: 12,
    name: "Perplexity AI Max",
    developer: "FonApps",
    category: "IA",
    rating: 4.7,
    downloads: "50M+",
    size: "48,64 MB",
    version: "v2.65.1",
    image: "/icons/perplexity.png",
    thumbnail: "/Thumb/perplexity_thumb.webp",
    description: "Tu asistente de respuestas con IA. Acceso Pro desbloqueado: búsquedas Pro ilimitadas, carga de archivos PDF/Imágenes sin límites y selección de modelos avanzados como GPT-5 y Claude 3.5 Sonnet.",
    modFeatures: ["Max Desbloqueado", "Búsquedas Max Ilimitadas", "Modelos Premium"],
    downloadUrl: "https://cuty.io/Perplexity"
  },
  {
    id: 11,
    name: "YouTube ReVanced",
    developer: "ReVance Mod",
    category: "Entretenimiento",
    rating: 4.9,
    downloads: "100M",
    size: "82,47 MB",
    version: "v20.14.43",
    image: "/icons/youtube.png",
    thumbnail: "/Thumb/youtube_thumb.webp",
    description: "La mejor experiencia de YouTube sin anuncios. Incluye reproducción en segundo plano, SponsorBlock para saltar segmentos de relleno y personalización completa de la interfaz.",
    warning: "Requisito: Es necesario instalar MicroG para iniciar sesión con Google.",
    modFeatures: ["Sin Anuncios", "Segundo Plano", "SponsorBlock"],
    downloadUrl: "https://cuty.io/YouTubeVIP"
  },
  {
    id: 10,
    name: "Web Video Caster Premium",
    developer: "FonApps",
    category: "Entretenimiento",
    rating: 4.6,
    downloads: "2M",
    size: "30,49 MB",
    version: "v5.12.8",
    image: "/icons/web_video_caster.png",
    thumbnail: "/Thumb/web_video_caster_thumb.webp",
    description: "Transmite videos web, películas y series a tu TV, Chromecast o Roku sin restricciones. Versión Premium desbloqueada: sin anuncios, marcadores ilimitados y pantalla de inicio personalizada.",
    modFeatures: ["Premium Desbloqueado", "Sin Anuncios", "Cola de Reproducción"],
    downloadUrl: "https://cuty.io/VideoCaster"
  },
  {
    id: 9,
    name: "Telegram Premium",
    developer: "FonApps",
    category: "Social",
    rating: 3.9,
    downloads: "1B+",
    size: "38,79 MB",
    version: "v12.2.10",
    image: "/icons/telegram.png",
    thumbnail: "/Thumb/telegram_thumb.webp",
    description: "La mensajería más rápida y segura. Versión Premium desbloqueada: descargas ultra rápidas, iconos premium exclusivos, traducción en tiempo real y sin anuncios..",
    modFeatures: ["Premium Desbloqueado", "Descarga Rápida", "Traducir chats enteros"],
    downloadUrl: "https://cuty.io/TelegramVIP"
  },
  {
    id: 8,
    name: "PowerDirector Pro",
    developer: "FonApps",
    category: "Herramientas",
    rating: 4.4,
    downloads: "100M+",
    size: "202,88 MB",
    version: "v15.9.2",
    image: "/icons/powerdirector.png",
    thumbnail: "/Thumb/powerdirector_thumb.webp",
    description: "El editor de video más profesional. Versión Premium desbloqueada: exportación en 4K Ultra HD, sin marca de agua, estabilizador de video y acceso ilimitado a todo el stock de música y efectos.",
    modFeatures: ["Sin Marca de Agua", "Exportación 4K", "Todo Desbloqueado"],
    downloadUrl: "https://cuty.io/PowerDirecto"
  },
  {
    id: 7,
    name: "Smart Launcher 6 Pro",
    developer: "FonApps",
    category: "Personalización",
    rating: 4.4,
    downloads: "20M+",
    size: "20,44 MB",
    version: "v6.5.054",
    image: "/icons/smart_launcher.png",
    thumbnail: "/Thumb/smart_launcher_thumb.webp",
    description: "El launcher más inteligente y eficiente. Versión Pro desbloqueada: búsqueda inteligente, categorías automáticas personalizables, widgets adaptativos y gestos avanzados en pantalla de inicio.",
    modFeatures: ["Pro Desbloqueado", "Iconos Adaptativos", "Sin Anuncios"],
    downloadUrl: "https://cuty.io/SmartLaunche"
  },
  {
    id: 6,
    name: "Lark Player Premium",
    developer: "FonApps",
    category: "Entretenimiento",
    rating: 4.7,
    downloads: "100M+",
    size: "24,34 MB",
    version: "v6.33.5",
    image: "/icons/lark_player.png",
    thumbnail: "/Thumb/lark_player_thumb.webp",
    description: "Reproductor de música Versión Premium desbloqueada: sin anuncios, ecualizador avanzado, temas exclusivos y soporte para letras flotantes en todas tus canciones.",
    modFeatures: ["Sin Anuncios", "Temas Premium", "Ecualizador Pro"],
    downloadUrl: "https://cuty.io/LarkPlayer"
  },
  {
    id: 5,
    name: "Samsung Music Port",
    developer: "FonApps",
    category: "Entretenimiento",
    rating: 4.1,
    downloads: "10M+",
    size: "26,63 MB",
    version: "v16.2.41",
    image: "/icons/samsung_music.png",
    thumbnail: "/Thumb/samsung_music_thumb.webp",
    description: "El reproductor de música oficial de Samsung optimizado para todos los dispositivos. Interfaz One UI elegante, ecualizador avanzado y soporte para todos los formatos de audio con calidad premium.",
    modFeatures: ["Interfaz One UI", "Ecualizador Pro", "Para todos los dispositivos"],
    downloadUrl: "https://cuty.io/SamsungMusic"
  },
  {
    id: 4,
    name: "Chat Smith AI Pro",
    developer: "FonApps",
    category: "IA",
    rating: 4.2,
    downloads: "10M+",
    size: "117,98 MB",
    version: "v8.251208.1",
    image: "/icons/chat_smith.png",
    thumbnail: "/Thumb/chat_smith_thumb.webp",
    description: "Asistente inteligente avanzado impulsado por GPT-4. Versión Pro desbloqueada: diálogos ilimitados, procesamiento de imágenes, modo experto y sin anuncios de ningún tipo.",
    modFeatures: ["Pro Desbloqueado", "Chat Ilimitado", "GPT-5 & Gemini 3 pro y mas..."],
    downloadUrl: "https://cuty.io/ChatSmithPro"
  },
  {
    id: 3,
    name: "Micro G",
    developer: "FonApps",
    category: "Herramientas",
    rating: 4.1,
    downloads: "10M+",
    size: "37,87 MB",
    version: "v0.3.1.4.240913",
    image: "/icons/microG.svg",
    thumbnail: "/Thumb/microG_thumb.webp",
    description: "El componente esencial para usuarios de mods. Permite iniciar sesión con tu cuenta de Google en aplicaciones modificadas como YouTube ReVanced, garantizando sincronización y notificaciones sin servicios de Google oficiales.",
    modFeatures: ["Login Google habilitado", "Sin rastreo de datos", "Ahorro de batería"],
    downloadUrl: "https://ouo.io/D8wwCp"
  },
  {
    id: 2,
    name: "Wallcraft Premium 4K",
    developer: "FonApps",
    category: "Personalización",
    rating: 4.7,
    downloads: "100M+",
    size: "104,5 MB",
    version: "v3.59.01",
    image: "/icons/wallcraft.png",
    thumbnail: "/Thumb/wallcraft_thumb.webp",
    description: "La biblioteca más vasta de fondos de pantalla en ultra alta definición. Acceso exclusivo a fondos 4K y 8K adaptados automáticamente al tamaño de tu pantalla, con efectos de paralaje 4D y sin interrupciones publicitarias.",
    modFeatures: ["Premium Desbloqueado", "Fondos 8K y 4D", "Sin Publicidad"],
    downloadUrl: "https://cuty.io/WallcraftPro"
  },
  {
    id: 1,
    name: "Urban VPN Premium",
    developer: "FonApps",
    category: "Herramientas",
    rating: 4.6,
    downloads: "10M+",
    size: "12,1 MB",
    version: "v1.0.97",
    image: "/icons/urban_vpn.png",
    thumbnail: "/Thumb/urban_vpn_thumb.webp",
    description: "La solución definitiva para navegar sin fronteras. Acceso ilimitado a servidores en más de 80 países con ancho de banda infinito. Ideal para desbloquear streaming y proteger tu privacidad en redes públicas con cifrado de grado militar.",
    modFeatures: ["Premium Desbloqueado", "Ancho de Banda Ilimitado", "Ubicaciones Pro"],
    downloadUrl: "https://cuty.io/Urbanvpn"
  },
];

const CATEGORIES = ["Todos", "Personalización","Herramientas","IA", "Social", "Entretenimiento"];

// --- COMPONENTES UI AUXILIARES ---

const Badge = ({ children, color = "purple" }) => {
  const styles = color === "mint" 
    ? "bg-teal-400/10 text-teal-300 border-teal-400/20" 
    : "bg-purple-500/10 text-purple-300 border-purple-500/20";
  
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${styles} backdrop-blur-sm`}>
      {children}
    </span>
  );
};

const DownloadButton = ({ onClick, loading }) => (
  <button 
    onClick={onClick}
    disabled={loading}
    className={`
      w-full py-3 rounded-xl font-bold text-slate-900 transition-all duration-300
      flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(45,212,191,0.3)]
      ${loading 
        ? "bg-slate-700 cursor-not-allowed text-slate-400" 
        : "bg-gradient-to-r from-teal-400 to-teal-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(45,212,191,0.5)]"
      }
    `}
  >
    {loading ? (
      <>
        <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
        <span>Preparando enlace...</span>
      </>
    ) : (
      <>
        <Download size={20} />
        <span>Descargar en MediaFire</span>
        <ExternalLink size={16} className="opacity-50" />
      </>
    )}
  </button>
);

const AppIcon = ({ type, thumbnail, size = "md" }) => {
  // Configuración de tamaños
  const sizeClass = size === "lg" 
    ? "w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl" 
    : "w-10 h-10 sm:w-16 sm:h-16 text-xl sm:text-2xl";

  // --- LÓGICA DE OPTIMIZACIÓN DE RAM ---
  // 1. Si el tamaño es "md" (estamos en la lista) Y existe un thumbnail, úsalo.
  // 2. Si no, usa la imagen original ("type").
  // Esto previene errores si alguna app no tiene thumbnail todavía.
  const imageSource = (size === "md" && thumbnail) ? thumbnail : type;

  // Verificamos si hay imagen válida
  if (imageSource && imageSource.startsWith('/')) {
    return (
      <div className={`${sizeClass} rounded-2xl shadow-lg transform transition-transform group-hover:scale-110 duration-300 overflow-hidden bg-slate-800 border border-white/10 p-0.5 flex items-center justify-center`}>
        <img 
          src={imageSource} 
          alt="App Icon"
          loading="lazy"      // Carga perezosa
          decoding="async"    // No congela el scroll
          className="w-full h-full object-cover rounded-[14px]"
        />
      </div>
    );
  }

  // Fallback (Icono genérico)
  return (
    <div className={`${sizeClass} rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold shadow-lg transform transition-transform group-hover:scale-110 duration-300`}>
      <Box className="text-white/50" />
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

export default function ModStoreApp() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'top'
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedApp, setSelectedApp] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Descarga iniciada...");

  // Efecto MEJORADO para bloquear el scroll del body y html
  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedApp]);

  // Navegación
  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
    if (view === 'home') {
      setActiveCategory("Todos");
      setSearchTerm("");
    }
  };

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDownload = (e, id) => {
    e?.stopPropagation();
    if (downloadingId) return;
    
    const appToDownload = INITIAL_APPS.find(app => app.id === id);
    if (!appToDownload) return;

    setDownloadingId(id);
    
    setTimeout(() => {
      setDownloadingId(null);
      showNotification("Redirigiendo a MediaFire...");
      window.open(appToDownload.downloadUrl, '_blank');
      if(selectedApp) setSelectedApp(null);
    }, 1500);
  };

  const getFilteredApps = (isTopView = false) => {
    let apps = INITIAL_APPS.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "Todos" || app.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    if (isTopView) {
      apps = [...apps].sort((a, b) => b.rating - a.rating);
    }
    return apps;
  };

 // --- FUNCIÓN OPTIMIZADA (VERSIÓN FINAL) ---
  const renderAppGrid = (title, isTopView = false) => {
    
    // 1. PREPARACIÓN: Ordenar si es necesario
    let processedApps = isTopView 
      ? [...INITIAL_APPS].sort((a, b) => b.rating - a.rating) 
      : INITIAL_APPS;

    // 2. FILTRADO REAL (Esto ahorra RAM: Solo procesamos lo que se ve)
    const visibleApps = processedApps.filter(app => {
       const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
       // En TopView mostramos todo el ranking, en Home respetamos categorías
       const matchesCategory = isTopView ? true : (activeCategory === "Todos" || app.category === activeCategory);
       return matchesSearch && matchesCategory;
    });

    const hasResults = visibleApps.length > 0;

    return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      <div className="flex items-center gap-2 mb-6 text-slate-300">
         <TrendingUp className="text-purple-400" size={20} />
         <h2 className="text-xl font-bold">{title}</h2>
      </div>

      {!hasResults ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg">No se encontraron resultados para "{searchTerm}"</p>
          <button onClick={() => {setSearchTerm(""); setActiveCategory("Todos")}} className="mt-4 text-teal-400 hover:underline">
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          
          {/* 3. RENDERIZADO: Mapeamos solo las apps visibles */}
          {visibleApps.map((app) => (
            <div 
              key={app.id}
              onClick={() => setSelectedApp(app)}
              // SIN CLASE HIDDEN: Esta tarjeta solo existe si es visible
              className={`
                group relative bg-[#13131f] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/5 
                transition-all duration-200 
                active:scale-95 md:active:scale-100
                md:hover:border-purple-500/30 md:hover:-translate-y-1 md:hover:shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] 
                cursor-pointer overflow-hidden
                /* Animación suave al aparecer */
                animate-in fade-in zoom-in-95 duration-300 fill-mode-both
              `}
            >
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-2 sm:gap-4 mb-2 sm:mb-4">
                
                <div className="md:group-hover:scale-110 transition-transform duration-300">
                   {/* IMAGEN OPTIMIZADA: Pasamos el thumbnail aquí */}
                   <AppIcon 
                     type={app.image} 
                     thumbnail={app.thumbnail} 
                     size="md" 
                   />
                </div>
                
                <div className="w-full min-w-0">
                  <h3 className="font-bold text-sm sm:text-lg text-slate-100 md:group-hover:text-teal-300 transition-colors truncate">
                    {app.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 mb-1 truncate">{app.developer}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 text-[10px] sm:text-xs font-bold">
                      <Star size={10} className="sm:w-3 sm:h-3" fill="currentColor" />
                      <span>{app.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 mb-2 sm:mb-4">
                {(app.modFeatures || []).slice(0, 2).map((feature, idx) => (
                  <span key={idx} className="text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 bg-slate-800 text-slate-400 rounded-md group-hover:bg-purple-900/30 group-hover:text-purple-300 transition-colors">
                    {feature}
                  </span>
                ))}
                {(app.modFeatures || []).length > 2 && (
                   <span className="text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-1 bg-slate-800 text-slate-400 rounded-md">+1</span>
                )}
              </div>

              <div className="flex items-center justify-between mt-auto pt-2 sm:pt-4 border-t border-white/5">
                <div className="text-[10px] sm:text-xs text-slate-500 text-left">
                  <span className="block text-slate-400 font-medium">{app.size}</span>
                  <span className="hidden sm:inline">{app.downloads} descargas</span>
                  <span className="sm:hidden">{app.downloads}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedApp(app);
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-white/5 transition-all duration-200 active:scale-90 active:bg-teal-500 active:text-white md:hover:bg-teal-500 md:hover:text-white md:group-hover:scale-110"
                >
                   <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
  };

  const renderHome = () => {
    // 1. Lógica para filtrar las burbujas (Sugerencias)
    const searchSuggestions = searchTerm.length > 0 
      ? INITIAL_APPS.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 3)
      : [];

    // 2. Retorno de la interfaz
    return (

      
      <>
        <header className="mb-12 text-center md:text-left">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900/50 to-slate-900 border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">

            {/* --- ANIMACIÓN DE FONDO SOLO PARA MÓVIL (AJUSTADA) --- */}
            <div className="absolute inset-0 md:hidden overflow-hidden pointer-events-none select-none">
               {/* Escudo: Bajado a top-12 para dar espacio al salto */}
               <div className="absolute top-5 right-0 text-teal-500/10 animate-bounce duration-[3000ms]">
                  <ShieldCheck size={80} strokeWidth={1} />
               </div>
               {/* Rayo: Ajustado ligeramente para equilibrar */}
               <div className="absolute top-5 left-0 text-purple-500/10 animate-bounce duration-[4000ms]">
                  <Zap size={80} strokeWidth={1} />
               </div>
            </div>
            {/* ----------------------------------------------------- */}
              
              {/* Contenedor de texto que se oculta en móvil al buscar */}
              <div className={`transition-all duration-300 ease-in-out ${isSearchFocused ? 'hidden md:block opacity-0' : 'block opacity-100'}`}>
                <Badge color="mint">NUEVA VERSIÓN DISPONIBLE</Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-3">
  Descarga tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-500">Apps</span> favoritas
</h1>
                <p className="text-slate-400 text-sm md:text-lg max-w-xl leading-relaxed">
  Descarga versiones modificadas seguras. Características premium desbloqueadas, sin anuncios y funcionalidades extendidas.
</p>
              </div>
              
              <div className="relative max-w-md mt-6 group z-20">
                {/* BURBUJAS DE SUGERENCIA */}
                {searchSuggestions.length > 0 && (
                  <div className="absolute bottom-full left-0 mb-3 w-full flex flex-wrap gap-2 px-1 z-30">
                    {searchSuggestions.map(app => (
                      <button
                        key={app.id}
                        onClick={() => {
                          setSelectedApp(app);
                          setSearchTerm("");
                        }}
                        className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-xl hover:bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 transition-all shadow-lg animate-in slide-in-from-bottom-2 zoom-in-95 group-hover:-translate-y-1"
                      >
                        <Search size={10} />
                        {app.name}
                        <ArrowUpRight size={10} className="opacity-50" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-slate-900/90 rounded-xl flex items-center px-4 py-3 border border-white/10 focus-within:border-teal-500/50 transition-colors">
                  <Search className="text-slate-500 mr-3" size={20} />
                  <input 
                    type="text" 
                    placeholder="Buscar mods (ej. Grok Ai, youtube)..." 
                    className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div className="hidden md:flex relative w-64 h-64 items-center justify-center">
                <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
                <Smartphone size={200} className="text-slate-800 drop-shadow-2xl relative z-10" strokeWidth={1} />
                <div className="absolute top-10 right-10 z-20 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-xl animate-bounce duration-[3000ms]">
                  <ShieldCheck className="text-teal-400" size={32} />
                </div>
                <div className="absolute bottom-10 left-10 z-20 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-xl animate-bounce duration-[4000ms]">
                  <Zap className="text-purple-400" size={32} />
                </div>
            </div>
          </div>
        </header>

       <div className="flex overflow-x-auto p-4 gap-3 mb-8 no-scrollbar animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
         {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                // CAMBIO 1: Quitamos 'overflow-hidden' de aquí para que la sombra respire
                className="relative px-6 py-2 rounded-full font-medium group transition-transform duration-200 active:scale-95 border border-white/5 whitespace-nowrap"
              >
                {/* 1. CAPA DE FONDO INACTIVA */}
                {/* CAMBIO 2: Añadimos 'rounded-full' aquí para contener el color */}
                <div className="absolute inset-0 rounded-full bg-slate-800/50 transition-colors duration-300 group-hover:bg-slate-700" />

                {/* 2. CAPA DE DEGRADADO ACTIVA */}
                {/* CAMBIO 3: Añadimos 'rounded-full' aquí también */}
                <div 
                  className={`absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-purple-600 transition-opacity duration-300 ease-out
                    ${isActive ? "opacity-100" : "opacity-0"}
                  `} 
                />
                
                {/* 3. BRILLO EXTRA (Sombra externa) */}
                {/* Al no haber overflow-hidden arriba, esta sombra ahora sí se verá por fuera */}
                <div 
                   className={`absolute inset-0 rounded-full transition-opacity duration-300
                   ${isActive ? "opacity-100 shadow-[0_0_20px_rgba(45,212,191,0.5)]" : "opacity-0"}`}
                />

                {/* 4. TEXTO */}
                <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`}>
                  {cat}
                </span>
              </button>
            );
          })}
        </div>
{renderAppGrid("Mods Populares", false)}
      </>
    );
  };

  const renderTopMods = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Top Mods Mejor Valorados</h2>
        <p className="text-slate-400">Los favoritos de la comunidad esta semana</p>
      </div>
      // CORRECCIÓN: Primero el título, luego true
{renderAppGrid("Ranking Global", true)}
    </div>
  );

 const renderFooter = () => (
    <footer className="relative mt-32 border-t border-white/10 bg-gradient-to-b from-[#0a0a12] to-[#05050a] pt-16 pb-12 overflow-hidden text-center">
      
      {/* Luces de fondo ambientales */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-900/10 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 z-10">
        {/* Sección de Tags / SEO */}
        <div className="mb-12">
          <h4 className="text-white font-bold mb-6 flex items-center justify-center gap-2">
            <TrendingUp size={18} className="text-teal-400"/> Tendencias de Búsqueda
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "APK Mod Premium 2025", "IA Sin Censura Android", "Spotify Mod", 
              "Sin Anuncios", "YouTube ReVanced", "Streaming 4K Gratis",
              "Productividad Pro", "Launchers Personalizados"
            ].map((tag, idx) => (
              <span key={idx} className="px-3 py-1.5 text-[11px] font-medium bg-white/5 border border-white/5 rounded-full text-slate-400 hover:text-teal-300 transition-all">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sección de Comunidad */}
        <div className="mb-16 max-w-sm mx-auto">
          <h4 className="text-white font-bold mb-4 flex items-center justify-center gap-2">
            <Zap size={18} className="text-purple-400"/> Comunidad Oficial
          </h4>
          <a 
            href="https://t.me/+HU0V3IL0_E44NmY0" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-teal-500/10 to-purple-500/10 hover:from-teal-500/20 hover:to-purple-500/20 border border-white/10 rounded-2xl transition-all group"
          >
            <span className="font-bold text-teal-400">Unirme a Telegram</span>
            <ExternalLink size={18} className="text-purple-400 group-hover:translate-x-1 transition-transform"/>
          </a>
        </div>

        {/* Barra Final: Créditos y Badges */}
        <div className="flex flex-col items-center gap-6 border-t border-white/5 pt-10">
          <div className="flex flex-wrap justify-center gap-4">
            <span className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-[10px] text-slate-400">
                <ShieldCheck size={14} className="text-teal-400" /> SSL Seguro Vercel
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-[10px] text-slate-400">
                <Cpu size={14} className="text-purple-400" /> Powered by Next.js
            </span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-md font-medium">
  © 2025 FonApps Store. Todos los derechos reservados. 
  <span className="block mt-1 text-slate-600 font-normal">
    Desarrollado con alto rendimiento para la comunidad Android global.
  </span>
</p>
        </div>
      </div>
    </footer>
  );
  

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-teal-500/30">
      
      {/* SOLUCIÓN AL PROBLEMA DE SALTO DE LAYOUT */}
      <style>{`
        html { overflow-y: scroll; }
        
        /* Estilizado opcional de la barra de scroll para que combine */
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a12; 
        }
        ::-webkit-scrollbar-thumb {
          background: #334155; 
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #475569; 
        }
      `}</style>
      
 {/* FONDO "ZERO-LAG" DEFINITIVO */}
<div className="fixed top-0 left-0 w-full h-[120vh] -z-10 pointer-events-none overflow-hidden bg-[#0a0a12]">
  
  {/* 1. Imagen física (Optimizada para GPU) */}
  <img 
    src="/fondo.webp"  
    alt="" 
    className="w-full h-full object-cover"
    style={{ 
      transform: 'translate3d(0, 0, 0)', 
      opacity: 0.7 // <--- AJUSTE FINAL: 0.7 es ideal para que se vea pero no moleste al texto
    }}
  />

  {/* 2. Sombra suave para integración (Opcional, puedes quitarla si quieres más brillo) */}
  <div className="absolute inset-0 bg-black/20" />
</div>

      <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0a0a12]/80 border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button className="flex items-center gap-2 cursor-pointer outline-none" onClick={() => navigateTo('home')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 overflow-hidden">
  <img 
    src="/logo.png" 
    alt="Logo" 
    className="w-full h-full object-contain p-1" 
  />
</div>
           <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
  FonApps
</span>
          </button>

          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
            {[
              { id: 'home', label: 'Inicio' },
              { id: 'top', label: 'Top Mods' }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => navigateTo(item.id)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                  ${currentView === item.id 
                    ? "bg-slate-800 text-teal-300 shadow-sm" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white bg-white/5 rounded-lg border border-white/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

    {/* MENÚ MÓVIL (Versión Simetría Perfecta) */}
        <div 
          className={`
            absolute top-16 left-0 w-full z-50 md:hidden
            bg-[#0a0a12]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]
            transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top
            ${isMenuOpen 
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
              : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}
          `}
        >
          <div className="p-4 flex flex-col gap-2">
            {[
              { id: 'home', label: 'Inicio' },
              { id: 'top', label: 'Top Mods' }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => navigateTo(item.id)}
                className={`
                  w-full text-left px-5 py-3.5 rounded-xl transition-all duration-200 font-medium
                  flex items-center justify-between group
                  active:scale-[0.98]
                  ${currentView === item.id 
                    ? "bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-inner" 
                    : "text-slate-300 border border-transparent active:bg-white/5 active:text-white"}
                `}
              >
                {item.label}
                
                {/* Flecha indicadora */}
                {currentView !== item.id && (
                   <ChevronRight 
                     size={18} 
                     className="text-slate-500 transition-all duration-300 
                     group-active:text-teal-400 group-active:translate-x-1" 
                   />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-80px)]">
        {currentView === 'home' && renderHome()}
        {currentView === 'top' && renderTopMods()}
      </main>

      {renderFooter()}

    {/* MODAL DE DETALLE (Fusión Perfecta) */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* 1. EL FONDO (Overlay):
              - animate-in fade-in duration-300: Aparece suavemente (arregla el golpe).
              - bg-[#05050a]/95: El color negro premium.
          */}
          <div 
            className="absolute inset-0 bg-[#05050a]/95 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setSelectedApp(null)} 
          />
          
          {/* 2. LA TARJETA (Window):
              - animate-content: ¡AQUÍ ESTÁ! Recuperamos tu animación personalizada de rebote.
              - will-change-transform: Optimiza el rendimiento del rebote.
          */}
          <div className="relative w-full max-w-lg bg-[#161622] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-content will-change-transform">
            
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-900/40 to-transparent" />
            
            <button 
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-red-500/80 rounded-full text-white/90 hover:text-white transition-all z-50 border border-white/10 shadow-lg backdrop-blur-sm"
            >
              <X size={24} />
            </button>

            <div className="relative p-6 pt-12 text-center max-h-[85vh] overflow-y-auto overscroll-contain no-scrollbar">
              {/* --- IMAGEN HERO "BLUR-UP" (Carga Progresiva) --- */}
<div className="mx-auto mb-4 w-28 h-28 sm:w-32 sm:h-32 relative shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden bg-slate-800">
  
  {/* 1. FONDO INSTANTÁNEO (Thumbnail)
      Se muestra YA, borroso, mientras carga la grande. 
      Como ya la descargaste en la lista, aparece en 0ms. */}
  <img 
    src={selectedApp.thumbnail || selectedApp.image} 
    alt="Preview"
    className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-50"
  />

  {/* 2. LA IMAGEN HD (Se desvanece suavemente al cargar) */}
  <img 
    src={selectedApp.image} 
    alt={selectedApp.name}
    className="relative z-10 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0"
    onLoad={(e) => e.currentTarget.classList.remove('opacity-0')} 
    /* ^^^ TRUCO DE MAGIA: Empieza invisible (opacity-0) y se revela sola al terminar de cargar */
  />
  
  {/* Borde sutil encima de todo */}
  <div className="absolute inset-0 rounded-3xl border border-white/10 z-20 pointer-events-none" />
</div>

{/* --- TÍTULO Y DESARROLLADOR (RESTAURADO) --- */}
<h2 className="text-2xl font-bold text-white mb-1">{selectedApp.name}</h2>
<p className="text-sm font-bold mb-4 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent w-fit mx-auto">
  {selectedApp.developer}
</p>
{/* --- BARRA DE INFO: PESO, VERSIÓN, RATING (RESTAURADO) --- */}
<div className="flex justify-center gap-6 text-sm text-slate-400 mb-8 border-y border-white/5 py-4">
  <div className="flex flex-col items-center">
    <span className="font-bold text-white text-base">{selectedApp.rating}</span>
    <span className="text-xs">Valoración</span>
  </div>
  <div className="flex flex-col items-center border-l border-white/10 pl-6">
    <span className="font-bold text-white text-base">{selectedApp.size}</span>
    <span className="text-xs">Tamaño</span>
  </div>
  <div className="flex flex-col items-center border-l border-white/10 pl-6">
    <span className="font-bold text-white text-base">{selectedApp.version}</span>
    <span className="text-xs">Versión</span>
  </div>
</div>

              <div className="text-left mb-6 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Descripción</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{selectedApp.description}</p>

                  {selectedApp.warning && (
                    <div className="mt-4 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.1)] flex items-center justify-center gap-3">
                      <div className="animate-pulse">
                        <AlertTriangle className="text-sky-400" size={20} />
                      </div>
                      <p className="text-sky-300 text-xs font-bold leading-relaxed text-left">
                        {selectedApp.warning.replace("⚠️", "").replace("Nota:", "").trim()}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Zap size={14} /> Características del Mod
                  </h3>
                  <ul className="space-y-2">
                    {selectedApp.modFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-slate-300 bg-white/5 p-2 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <DownloadButton onClick={() => handleDownload(null, selectedApp.id)} loading={downloadingId === selectedApp.id} />
              <p className="mt-4 text-[10px] text-slate-600 flex items-center justify-center gap-1">
                <ShieldCheck size={10} /> Verificado por Play Protect. Libre de virus.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notificación Toast */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${showToast ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-teal-500/30">
          <div className="bg-teal-500 rounded-full p-1">
            <Download size={14} className="text-slate-900" strokeWidth={3} />
          </div>
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      </div>

    </div>
  );
}