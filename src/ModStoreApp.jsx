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
  Music,
  Video,
  Layout,
  BookOpen,
  ExternalLink,
  ArrowUpRight,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

// --- DATOS DE EJEMPLO (MOCK DATA) ---
const INITIAL_APPS = [
  
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
    size: "27,34 MB",
    version: "v1.0.91-release-00",
    image: "/icons/grok_ai.webp",
    description: "Accede a la inteligencia artificial más audaz y sin censura. Respuestas en tiempo real con datos actualizados y modo sarcástico desbloqueado.",
    warning: "Nota: Debes iniciar sesión con tu cuenta de X (antes Twitter).",
    modFeatures: ["Premium Desbloqueado", "Imagine", "Sin Censura", ],
    downloadUrl: "https://cuty.io/GrokAI"
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
    description: "La mejor experiencia de YouTube sin anuncios. Incluye reproducción en segundo plano, SponsorBlock para saltar segmentos de relleno y personalización completa de la interfaz.",
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
    size: "201,60 MB",
    version: "v5.12.8",
    image: "/icons/powerdirector.png",
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

const AppIcon = ({ type, size = "md" }) => {
  // Ajuste de tamaño responsive
  const sizeClass = size === "lg" 
    ? "w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl" 
    : "w-10 h-10 sm:w-16 sm:h-16 text-xl sm:text-2xl";

  // --- LÓGICA NUEVA: DETECTAR IMAGEN ---
  // Si el "type" empieza con "/", asumimos que es una imagen (ej: "/icons/grok_ai.webp")
  if (type.startsWith('/')) {
    return (
      <div className={`${sizeClass} rounded-2xl shadow-lg transform transition-transform group-hover:scale-110 duration-300 overflow-hidden bg-slate-800 border border-white/10 p-0.5 flex items-center justify-center`}>
        <img 
          src={type} 
          alt="App Icon" 
          className="w-full h-full object-cover rounded-[14px]"
        />
      </div>
    );
  }

  // --- LÓGICA ANTIGUA: COLORES ---
  // Si no es una imagen, usamos el sistema viejo de gradientes
  let gradient = "from-purple-500 to-indigo-600";
  let icon = <Box className="text-white/80" />;

  if (type === "mint") {
    gradient = "from-teal-400 to-emerald-600";
    icon = <Layout className="text-white/80" />;
  }
  if (type === "red") {
    gradient = "from-red-500 to-rose-600";
    icon = <Video className="text-white/80" />;
  }
  if (type === "orange") {
    gradient = "from-orange-400 to-amber-500";
    icon = <BookOpen className="text-white/80" />;
  }
  if (type === "blue") {
    gradient = "from-blue-400 to-cyan-500";
    icon = <Smartphone className="text-white/80" />;
  }
  if (type === "purple") {
    icon = <Music className="text-white/80" />;
  }
  if (type === "green") {
     gradient = "from-green-500 to-emerald-700";
     icon = <Video className="text-white/80" />;
  }
  
  return (
    <div className={`${sizeClass} rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-lg transform transition-transform group-hover:scale-110 duration-300`}>
      {icon}
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

  const renderAppGrid = (apps, title) => (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      <div className="flex items-center gap-2 mb-6 text-slate-300">
         <TrendingUp className="text-purple-400" size={20} />
         <h2 className="text-xl font-bold">{title}</h2>
      </div>

      {apps.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg">No se encontraron resultados para "{searchTerm}"</p>
          <button onClick={() => {setSearchTerm(""); setActiveCategory("Todos")}} className="mt-4 text-teal-400 hover:underline">
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {apps.map((app) => (
           <div 
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className="group relative bg-[#13131f] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/5 
              transition-all duration-200 
              active:scale-95 md:active:scale-100
              md:hover:border-purple-500/30 md:hover:-translate-y-1 md:hover:shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] 
              cursor-pointer overflow-hidden"
            >
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-2 sm:gap-4 mb-2 sm:mb-4">
                
                {/* Aquí controlamos que el icono solo haga zoom en PC (md) */}
                <div className="md:group-hover:scale-110 transition-transform duration-300">
                   <AppIcon type={app.image} />
                </div>
                
                <div className="w-full min-w-0">
                  {/* El texto solo cambia de color en PC (md) */}
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
                {app.modFeatures.slice(0, 2).map((feature, idx) => (
                  <span key={idx} className="text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 bg-slate-800 text-slate-400 rounded-md group-hover:bg-purple-900/30 group-hover:text-purple-300 transition-colors">
                    {feature}
                  </span>
                ))}
                {app.modFeatures.length > 2 && (
                   <span className="text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-1 bg-slate-800 text-slate-400 rounded-md">+1</span>
                )}
              </div>

              <div className="flex items-center justify-between mt-auto pt-2 sm:pt-4 border-t border-white/5">
                <div className="text-[10px] sm:text-xs text-slate-500 text-left">
                  <span className="block text-slate-400 font-medium">{app.size}</span>
                  <span className="hidden sm:inline">{app.downloads} descargas</span>
                  <span className="sm:hidden">{app.downloads}</span>
                </div>
               {/* BOTÓN CAMBIADO: Abre detalles (Modal) en vez de descargar */}
                {/* BOTÓN FLECHA (Versión Profesional & Táctil) */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el clic active la tarjeta entera
                    setSelectedApp(app); // Abre el modal de detalles
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-white/5 transition-all duration-200
                  
                  /* MÓVIL (Active): Se encoge y se pone verde AL TOCAR (Feedback instantáneo) */
                  active:scale-90 active:bg-teal-500 active:text-white
                  
                  /* PC (Hover): Solo reacciona al pasar el mouse (md: evita errores en móvil) */
                  md:hover:bg-teal-500 md:hover:text-white md:group-hover:scale-110"
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

        <div className="flex overflow-x-auto pb-4 gap-3 mb-8 no-scrollbar animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-gradient-to-r from-teal-400 to-purple-600 text-white shadow-[0_0_20px_rgba(45,212,191,0.3)] border-transparent" 
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {renderAppGrid(getFilteredApps(false), "Mods Populares")}
      </>
    );
  };

  const renderTopMods = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Top Mods Mejor Valorados</h2>
        <p className="text-slate-400">Los favoritos de la comunidad esta semana</p>
      </div>
      {renderAppGrid(getFilteredApps(true), "Ranking Global")}
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
    <div className="min-h-screen bg-[#0a0a12] text-slate-200 font-sans selection:bg-teal-500/30">
      
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
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />
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
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-purple-400">
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

      {/* MODAL DE DETALLE DE LA APP */}
    {/* MODAL DE DETALLE DE LA APP */}
      {/* MODAL DE DETALLE (Implementación Expert UI) */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* 1. EL FONDO: Animación independiente (Fade suave) */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-overlay"
            onClick={() => setSelectedApp(null)} // Cerrar al hacer clic fuera (UX Pro)
          />
          
          {/* 2. LA TARJETA: Animación de "Pop" físico */}
          <div className="relative w-full max-w-lg bg-[#161622] rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-content will-change-transform">
            
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-900/40 to-transparent" />
            
            {/* ... Resto de tu contenido (Botón cerrar, textos, etc.) ... */}
            <button 
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white/90 hover:text-white transition-all z-50 border border-white/10 shadow-lg"
            >
              <X size={24} />
            </button>

            <div className="relative p-6 pt-12 text-center max-h-[85vh] overflow-y-auto overscroll-contain">
               {/* ... Aquí sigue todo tu código de iconos, descripción, botón, etc ... */}
               <div className="mx-auto mb-4 w-fit shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-3xl">
                <AppIcon type={selectedApp.image} size="lg" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{selectedApp.name}</h2>
              <p className="text-purple-400 text-sm font-medium mb-4">{selectedApp.developer}</p>
              
              <div className="flex justify-center gap-6 text-sm text-slate-400 mb-8 border-y border-white/5 py-4">
                 <div className="flex flex-col items-center"><span className="font-bold text-white text-base">{selectedApp.rating}</span><span className="text-xs">Valoración</span></div>
                 <div className="flex flex-col items-center border-l border-white/10 pl-6"><span className="font-bold text-white text-base">{selectedApp.size}</span><span className="text-xs">Tamaño</span></div>
                 <div className="flex flex-col items-center border-l border-white/10 pl-6"><span className="font-bold text-white text-base">{selectedApp.version}</span><span className="text-xs">Versión</span></div>
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
            {/* ... FIN del contenido ... */}

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