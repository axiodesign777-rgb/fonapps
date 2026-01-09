import React, { useState, useEffect, useRef } from 'react';
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
  ChevronRight,
  ChevronLeft,
  Heart,
  ImageIcon,
  Maximize2,
  Globe 
} from 'lucide-react';

// ✅ HELPER SIMPLIFICADO
const getBadge = (app) => {
  if (!app || !app.name) return null;
  const keywords = ["Premium", "Pro", "Prime", "VIP", "Max", "Plus", "Ultra", "Gold"];
  return keywords.find(word => app.name.includes(word));
};

// ⚠️ CONFIGURACIÓN DE MONETIZACIÓN (API LOOTLABS)
const MONETIZATION_API_TOKEN = "2d803576a9614950be0b4a776e603e452dec39fcd12f38df675ce96c2d8a8fdb"; 

const INITIAL_APPS = [
  {
    id: 27,
    name: "Dynamic Island Pro",
    developer: "FonApps",
    category: "Personalización",
    rating: 4.7,
    downloads: "1M+",
    size: "58,94 MB",
    version: "v5.1",
    image: "/icons/dynamic_island.webp",
    thumbnail: "/Thumb/dynamic_island_thumb.webp",
    screenshots: [
      "/screenshots/dynamic_island_1.webp",
      "/screenshots/dynamic_island_2.webp",
      "/screenshots/dynamic_island_3.webp",
      "/screenshots/dynamic_island_4.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/dynamic_island_1.webp",
      "/screenshots/gallery_thumbs/dynamic_island_2.webp",
      "/screenshots/gallery_thumbs/dynamic_island_3.webp",
      "/screenshots/gallery_thumbs/dynamic_island_4.webp"
    ],
    description: "Lleva la interactividad de la 'Isla Dinámica' a tu Android. Transforma el notch de tu cámara en un centro de control elegante para notificaciones y música.\n\nVersión Pro totalmente desbloqueada: accede a todas las animaciones visuales, personalización de tamaño, colores, interacción multitarea y una experiencia libre de publicidad.",
    modFeatures: ["Pro Desbloqueado", "Sin Anuncios","Personalización completa de la isla", "Animaciones Premium","Rendimiento general mejorado"],
    
    description_en: "Bring the 'Dynamic Island' interactivity to your Android. Fully unlocked Pro version: access all visual animations, size customization, multitasking interaction, and an ad-free experience.",
    modFeatures_en: ["Pro Unlocked", "No Ads", "Full Island Customization", "Premium Animations", "Improved Performance"],

    updateDate: "2026-1-7",
    isNew: true,
    downloadUrl: "https://www.mediafire.com/file/9vt3w9ouzbdtmra/DynamicNotch_5.1_PREMIUM.apk/file"
  },
  {
    id: 26,
    name: "YouTube Pro",
    developer: "Prateek Chaubey",
    category: "Entretenimiento",
    rating: 4.8,
    downloads: "10M+",
    size: "61,13 KB",
    version: "v3.95",
    image: "/icons/youtube_pro.webp",
    thumbnail: "/Thumb/youtube_pro_thumb.webp",
    screenshots: [
      "/screenshots/youtube_pro_1.webp",
      "/screenshots/youtube_pro_2.webp",
      "/screenshots/youtube_pro_3.webp",
      "/screenshots/youtube_pro_4.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/youtube_pro_1.webp",
      "/screenshots/gallery_thumbs/youtube_pro_2.webp",
      "/screenshots/gallery_thumbs/youtube_pro_3.webp",
      "/screenshots/gallery_thumbs/youtube_pro_4.webp"
    ],
    description: "Una alternativa ligera y potente para el streaming de video. Integra controles de deslizamiento para brillo y volumen, modo oscuro AMOLED real y descargas directas.\n\nDisfruta de reproducción en segundo plano, ventana flotante (PiP) y bloqueo total de anuncios. Ideal si buscas una experiencia más personalizable que la app estándar, no necesita los servicios de MicroG.",
    modFeatures: ["Descargas de video y audio", "Controles de Gesto", "Bloqueo de Anuncios", "Gemini AI integrado", "Ultra ligero","Rendimiento general mejorado"],
    
    description_en: "A lightweight and powerful alternative for video streaming. Enjoy background playback, Picture-in-Picture (PiP), total ad blocking, and direct downloads. No MicroG needed.",
    modFeatures_en: ["Video/Audio Downloads", "Gesture Controls", "Ad Block", "Gemini AI", "Ultra Light"],

    updateDate: "2026-1-7",
    isNew: true,
    downloadUrl: "https://www.mediafire.com/file/j9d22zf4f0hnt20/YouTube_pro.apk/file"
  },
  {
    id: 25,
    name: "Nomad Music Premium",
    developer: "FonApps",
    category: "Entretenimiento",
    rating: 4.7,
    downloads: "5M+",
    size: "22,58 MB",
    version: "v25.3.3",
    image: "/icons/nomad_music.webp",
    thumbnail: "/Thumb/nomad_music_thumb.webp",
    screenshots: [
      "/screenshots/nomad_music_1.webp",
      "/screenshots/nomad_music_2.webp",
      "/screenshots/nomad_music_3.webp",
      "/screenshots/nomad_music_4.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/nomad_music_1.webp",
      "/screenshots/gallery_thumbs/nomad_music_2.webp",
      "/screenshots/gallery_thumbs/nomad_music_3.webp",
      "/screenshots/gallery_thumbs/nomad_music_4.webp"
    ],
    description: "Un reproductor de música offline elegante y ligero, ideal para quienes buscan simplicidad. Versión Premium desbloqueada: elimina totalmente la publicidad y accede a todos los temas visuales (Skins) exclusivos. Incluye herramientas útiles como cortador de tonos y un ecualizador de 5 bandas con refuerzo de graves.",
    modFeatures: ["Premium Desbloqueado", "Sin Anuncios", "Todos los Temas","Rendimiento general mejorado"],
    
    description_en: "An elegant and lightweight offline music player, ideal for those seeking simplicity. Fully unlocked Premium version: completely removes ads and grants access to all exclusive visual themes (Skins). Includes useful tools like ringtone cutter and a 5-band equalizer with bass boost.",
    modFeatures_en: ["Premium Unlocked", "No Ads", "All Themes", "Improved Performance"],

    isNew: false,
    downloadUrl: "https://www.mediafire.com/file/wy8gqlqr4adbibj/Nomad_Music_25.3.3_PREMIUM.apk/file"
  },
  {
    id: 24,
    name: "ReLens Camera Pro",
    developer: "FonApps",
    category: "Fotografía",
    rating: 4.6,
    downloads: "10M+",
    size: "145,48 MB",
    version: "v4.1.3",
    image: "/icons/relens.webp",
    thumbnail: "/Thumb/relens_thumb.webp",
    screenshots: [
      "/screenshots/relens_1.webp",
      "/screenshots/relens_2.webp",
      "/screenshots/relens_3.webp",
      "/screenshots/relens_4.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/relens_1.webp",
      "/screenshots/gallery_thumbs/relens_2.webp",
      "/screenshots/gallery_thumbs/relens_3.webp",
      "/screenshots/gallery_thumbs/relens_4.webp"
    ],
    description: "Convierte tu dispositivo en una cámara DSLR profesional con grandes aperturas ópticas. Versión VIP totalmente desbloqueada: accede al sistema de fotografía computacional avanzado para lograr un efecto bokeh profundo y realista (f/1.4). Disfruta de todos los lentes clásicos, controles manuales de exposición completos y grabación en 4K UHD sin restricciones.",
    modFeatures: ["VIP Desbloqueado", "Efecto Bokeh DSLR", "Todos los Lentes", "Todos los Filtros VIP"],
    
    description_en: "Turn your device into a professional DSLR camera with large optical apertures. Fully unlocked VIP version: access the advanced computational photography system to achieve a deep and realistic bokeh effect (f/1.4). Enjoy all classic lenses, full manual exposure controls, and unrestricted 4K UHD recording.",
    modFeatures_en: ["VIP Unlocked", "DSLR Bokeh Effect", "All Lenses", "All VIP Filters"],

    updateDate: "2025-12-30",
    isUpdated: false,
    isNew: false,
    downloadUrl: "https://www.mediafire.com/file/sgvx1dlfriul4hu/ReLens_4.1.3_VIP.apk/file"
  },
  {
    id: 23,
    name: "Spring Editor Pro",
    developer: "FonApps",
    category: "Herramientas",
    rating: 4.5,
    downloads: "1+",
    size: "122,73 MB",
    version: "v2.0.9",
    image: "/icons/spring_editor.webp",
    thumbnail: "/Thumb/spring_editor_thumb.webp",
    screenshots: [
      "/screenshots/spring_1.webp",
      "/screenshots/spring_2.webp",
      "/screenshots/spring_3.webp",
      "/screenshots/spring_4.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/spring_1.webp",
      "/screenshots/gallery_thumbs/spring_2.webp",
      "/screenshots/gallery_thumbs/spring_3.webp",
      "/screenshots/gallery_thumbs/spring_4.webp"
    ],
    description: "Transforma tus ideas en videos virales con la potencia de la Inteligencia Artificial. Versión Pro totalmente desbloqueada: accede a herramientas avanzadas como subtitulado automático, eliminación mágica de fondos y mejora de resolución por IA. Exporta tus clips en calidad cinematográfica 4K a 60FPS sin marcas de agua y disfruta de la biblioteca completa de música y efectos premium.",
    modFeatures: ["Pro Desbloqueado", "Sin anuncios", "Sin Marca de Agua","Rendimiento general mejorado"],
    
    description_en: "Transform your ideas into viral videos with the power of Artificial Intelligence. Fully unlocked Pro version: access advanced tools like auto-captioning, magic background removal, and AI resolution enhancement. Export your clips in cinematic 4K at 60FPS without watermarks and enjoy the full premium music and effects library.",
    modFeatures_en: ["Pro Unlocked", "No Ads", "No Watermark", "Improved Performance"],

    updateDate: "2025-12-30",
    isUpdated: false,
    isNew: false,
    downloadUrl: "https://www.mediafire.com/file/1dxkg77nj0t13kc/Spring_2.0.9.35926_PREMIUM.apk/file"
  },
  {
    id: 21,
    name: "Alpha Launcher Prime",
    developer: "FonApps",
    category: "Personalización",
    rating: 4.7,
    downloads: "5M+",
    size: "18,47 MB",
    version: "v15.5",
    image: "/icons/alpha_launcher.webp",
    thumbnail: "/Thumb/alpha_launcher_thumb.webp",
    screenshots: [
      "/screenshots/alpha_launcher_1.webp",
      "/screenshots/alpha_launcher_2.webp",
      "/screenshots/alpha_launcher_3.webp",
      "/screenshots/alpha_launcher_4.webp",
      "/screenshots/alpha_launcher_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/alpha_launcher_1.webp",
      "/screenshots/gallery_thumbs/alpha_launcher_2.webp",
      "/screenshots/gallery_thumbs/alpha_launcher_3.webp",
      "/screenshots/gallery_thumbs/alpha_launcher_4.webp",
      "/screenshots/gallery_thumbs/alpha_launcher_5.webp"
    ],
    description: "Transforma tu teléfono en una interfaz futurista de ciencia ficción. Versión Prime totalmente desbloqueada: acceso a todos los temas 4D Premium, widgets de sistema avanzados, personalización de colores estilo 'hacker' y eliminación completa de publicidad.",
    modFeatures: ["Prime Desbloqueado", "Temas 4D", "Estilo Hacker","Rendimiento general mejorado"],
    
    description_en: "Transform your phone into a futuristic sci-fi interface. Fully unlocked Prime version: access all Premium 4D themes, advanced system widgets, 'hacker' style color customization, and complete ad removal.",
    modFeatures_en: ["Prime Unlocked", "4D Themes", "Hacker Style", "Improved Performance"],

    isUpdated: false,
    isNew: false,
    downloadUrl: "https://www.mediafire.com/file/zyockx66vqixrco/Alpha_Hybrid_Launcher_15.5_PREMIUM.apk/file"
  },
  {
    id: 20,
    name: "SpellCheck Premium",
    developer: "FonApps",
    category: "Herramientas",
    rating: 4.5,
    downloads: "5M+",
    size: "33,27 MB",
    version: "v1.0.12",
    image: "/icons/spellcheck.webp",
    thumbnail: "/Thumb/spellcheck_thumb.webp",
    screenshots: [
      "/screenshots/grok_1.webp",
      "/screenshots/grok_2.webp",
      "/screenshots/grok_3.webp",
      "/screenshots/grok_4.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/grok_1.webp",
      "/screenshots/gallery_thumbs/grok_2.webp",
      "/screenshots/gallery_thumbs/grok_3.webp",
      "/screenshots/gallery_thumbs/grok_4.webp"
    ],
    description: "Escribe sin errores en cualquier idioma. Hemos desbloqueado la versión Premium completa: corrección gramatical profunda basada en IA, sin límite de caracteres, escáner de texto por cámara (OCR) habilitado y experiencia totalmente libre de publicidad.",
    modFeatures: ["Premium Desbloqueado", "Límite Texto 3000", "Escáner OCR","Rendimiento general mejorado"],
    
    description_en: "Write mistake-free in any language. Fully unlocked Premium version: deep AI-based grammar correction, no character limits, camera text scanner (OCR) enabled, and a completely ad-free experience.",
    modFeatures_en: ["Premium Unlocked", "Text Limit 3000", "OCR Scanner", "Improved Performance"],

    isUpdated: false,
    isNew: false,
    downloadUrl: "https://www.mediafire.com/file/6ebxohqa23vk9jr/Spellcheck_1.0.12_PREMIUM.apk/file"
  },
  {
    id: 19,
    name: "Exo Player Pro",
    developer: "FonApps",
    category: "Entretenimiento",
    rating: 4.2,
    downloads: "100K+",
    size: "9,49 MB",
    version: "v2.1.3",
    image: "/icons/exo_player.webp",
    thumbnail: "/Thumb/exo_player_thumb.webp",
    screenshots: [
      "/screenshots/exo_player_1.webp",
      "/screenshots/exo_player_2.webp",
      "/screenshots/exo_player_3.webp",
      "/screenshots/exo_player_4.webp",
      "/screenshots/exo_player_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/exo_player_1.webp",
      "/screenshots/gallery_thumbs/exo_player_2.webp",
      "/screenshots/gallery_thumbs/exo_player_3.webp",
      "/screenshots/gallery_thumbs/exo_player_4.webp",
      "/screenshots/gallery_thumbs/exo_player_5.webp"
    ],
    description: "El reproductor de vídeo minimalista basado en la tecnología Exo de Google. Versión Pro desbloqueada: disfruta de tus películas y series sin interrupciones publicitarias. Soporte nativo para 4K, aceleración por hardware optimizada, subtítulos multi-idioma y compatibilidad total con formatos MKV, MP4 y AVI.",
    modFeatures: ["Pro Desbloqueado", "Sin Anuncios", "Soporte 4K","Rendimiento general mejorado"],
    
    description_en: "The minimalist video player based on Google's Exo technology. Unlocked Pro version: enjoy your movies and series without ad interruptions. Native 4K support, optimized hardware acceleration, multi-language subtitles, and full compatibility with MKV, MP4, and AVI formats.",
    modFeatures_en: ["Pro Unlocked", "No Ads", "4K Support", "Improved Performance"],

    isUpdated: false,
    isNew: false,
    downloadUrl: "https://www.mediafire.com/file/aj0chvuams6sxi6/Exo_Player_2.1.3_PRO.apk/file"
  },
  {
    id: 18,
    name: "Superb VPN Premium",
    developer: "FonApps",
    category: "Herramientas",
    rating: 4.8,
    downloads: "5M+",
    size: "55,65 MB",
    version: "v3.2.0",
    image: "/icons/superb_vpn.webp",
    thumbnail: "/Thumb/superb_vpn_thumb.webp",
    screenshots: [
      "/screenshots/grok_1.webp",
      "/screenshots/grok_2.webp",
      "/screenshots/grok_3.webp",
      "/screenshots/grok_4.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/grok_1.webp",
      "/screenshots/gallery_thumbs/grok_2.webp",
      "/screenshots/gallery_thumbs/grok_3.webp",
      "/screenshots/gallery_thumbs/grok_4.webp"
    ],
    description: "Navegación ultra rápida y segura sin límites. Hemos desbloqueado el acceso VIP total: conéctate a servidores premium de todo el mundo sin ver un solo anuncio. Protege tu privacidad, oculta tu IP y accede a contenido bloqueado en tu región con un solo toque.",
    modFeatures: ["VIP Desbloqueado", "Sin Anuncios", "Servidores Globales","Rendimiento general mejorado"],
    
    description_en: "Ultra-fast and secure browsing without limits. Full VIP access unlocked: connect to premium servers worldwide without seeing a single ad. Protect your privacy, hide your IP, and access region-blocked content with a single tap.",
    modFeatures_en: ["VIP Unlocked", "No Ads", "Global Servers", "Improved Performance"],

    isUpdated: false,
    isNew: false,
    downloadUrl: "https://www.mediafire.com/file/4egupw0g6nx3j2i/Super_VPN_3.2.0_Premium.apk/file"
  },
  {
    id: 17,
    name: "Microsoft Copilot Pro",
    developer: "FonApps",
    category: "IA",
    rating: 4.8,
    downloads: "50M+",
    size: "55,43 MB",
    version: "v30.0.43",
    image: "/icons/copilot.webp",
    thumbnail: "/Thumb/copilot_thumb.webp",
    screenshots: [
      "/screenshots/copilot_1.webp",
      "/screenshots/copilot_2.webp",
      "/screenshots/copilot_3.webp",
      "/screenshots/copilot_4.webp",
      "/screenshots/copilot_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/copilot_1.webp",
      "/screenshots/gallery_thumbs/copilot_2.webp",
      "/screenshots/gallery_thumbs/copilot_3.webp",
      "/screenshots/gallery_thumbs/copilot_4.webp",
      "/screenshots/gallery_thumbs/copilot_5.webp"
    ],
    description: "Desbloqueamos el potencial completo de la IA. Disfruta de acceso ilimitado al modelo GPT-5.1 y al generador de imágenes Ultra-HD sin pagar suscripción. Hemos eliminado todos los límites de uso, la censura en las respuestas y las colas de espera. Tienes la herramienta más potente de Microsoft totalmente liberada y a máxima velocidad en tu bolsillo.",
    modFeatures: ["GPT-5.1 Desbloqueado", "DALL-E Ilimitado", "Velocidad Máxima","Rendimiento general mejorado"],
    
    description_en: "Unlock the full potential of AI. Enjoy unlimited access to GPT-5.1 and the Ultra-HD image generator without subscription. We removed all usage limits, response censorship, and wait queues. Microsoft's most powerful tool fully unleashed in your pocket.",
    modFeatures_en: ["GPT-5.1 Unlocked", "Unlimited DALL-E", "Max Speed", "Improved Performance"],

    warning: "Requisito: Inicia sesión con Microsoft para guardar tus chats.",
    warning_en: "Requirement: Sign in with Microsoft to save your chats.",

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/mtc9n6nhjujpt43/Copilot_30.0.431217002_PRO.apk/file"
  },
  {
    id: 16,
    name: "Tiempo & Radar Pro",
    developer: "FonApps",
    category: "Herramientas",
    rating: 4.8,
    downloads: "100M+",
    size: "36,77 MB",
    version: "v2026.1",
    image: "/icons/weather_radar.webp",
    thumbnail: "/Thumb/weather_radar_thumb.webp",
    screenshots: [
      "/screenshots/weather_radar_1.webp",
      "/screenshots/weather_radar_2.webp",
      "/screenshots/weather_radar_3.webp",
      "/screenshots/weather_radar_4.webp",
      "/screenshots/weather_radar_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/weather_radar_1.webp",
      "/screenshots/gallery_thumbs/weather_radar_2.webp",
      "/screenshots/gallery_thumbs/weather_radar_3.webp",
      "/screenshots/gallery_thumbs/weather_radar_4.webp",
      "/screenshots/gallery_thumbs/weather_radar_5.webp"
    ],
    description: "La aplicación meteorológica líder en precisión. Versión Pro desbloqueada que ofrece radar de lluvia en tiempo real, alertas de clima severo, zoom ilimitado en mapas y pronósticos detallados a 14 días sin publicidad intrusiva.",
    modFeatures: ["Pro Desbloqueado", "Sin Anuncios", "Radar Premium","Rendimiento general mejorado"],
    
    description_en: "The leading weather application in accuracy. Unlocked Pro version offering real-time rain radar, severe weather alerts, unlimited map zoom, and detailed 14-day forecasts without intrusive advertising.",
    modFeatures_en: ["Pro Unlocked", "No Ads", "Premium Radar", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/adgmz4v0m5lywqm/Tiempo%26Radar_2026.1_PRO.apk/file"
  },
  {
    id: 15,
    name: "Grok AI Premium",
    developer: "FonApps",
    category: "IA",
    rating: 4.9,
    downloads: "50M+",
    size: "27,86 MB",
    version: "v1.1.02-00",
    image: "/icons/grok_ai.webp",
    thumbnail: "/Thumb/grok_ai_thumb.webp",
    screenshots: [
      "/screenshots/grok_1.webp",
      "/screenshots/grok_2.webp",
      "/screenshots/grok_3.webp",
      "/screenshots/grok_4.webp",
      "/screenshots/grok_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/grok_1.webp",
      "/screenshots/gallery_thumbs/grok_2.webp",
      "/screenshots/gallery_thumbs/grok_3.webp",
      "/screenshots/gallery_thumbs/grok_4.webp",
      "/screenshots/gallery_thumbs/grok_5.webp"
    ],
    description: "Accede a la inteligencia artificial más audaz y sin censura. Respuestas en tiempo real con datos actualizados y modo sarcástico desbloqueado.",
    
    description_en: "Access the boldest and most uncensored artificial intelligence. Real-time responses with updated data and sarcastic mode unlocked.",
    modFeatures: ["Premium Desbloqueado", "Imagine", "Sin Censura","Rendimiento general mejorado"],
    modFeatures_en: ["Premium Unlocked", "Imagine", "Uncensored", "Improved Performance"],

    warning: "Nota: Debes iniciar sesión con tu cuenta de X (antes Twitter).",
    warning_en: "Note: You must log in with your X (formerly Twitter) account.",

    updateDate: "2026-1-9",
    isUpdated: true,
    downloadUrl: "https://www.mediafire.com/file/mqyk98wae6l34tj/Grok_1.1.02-release.00_PREMIUM.apk/file"
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
    image: "/icons/nova_launcher.webp",
    thumbnail: "/Thumb/nova_launcher_thumb.webp",
    screenshots: [
      "/screenshots/nova_launcher_1.webp",
      "/screenshots/nova_launcher_2.webp",
      "/screenshots/nova_launcher_3.webp",
      "/screenshots/nova_launcher_4.webp",
      "/screenshots/nova_launcher_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/nova_launcher_1.webp",
      "/screenshots/gallery_thumbs/nova_launcher_2.webp",
      "/screenshots/gallery_thumbs/nova_launcher_3.webp",
      "/screenshots/gallery_thumbs/nova_launcher_4.webp",
      "/screenshots/gallery_thumbs/nova_launcher_5.webp"
    ],
    description: "El launcher más potente y personalizable. Versión Prime totalmente desbloqueada: gestos, grupos en el cajón, ocultar aplicaciones y efectos de desplazamiento exclusivos.",
    modFeatures: ["Prime Desbloqueado", "Gestos", "Ocultar Apps","Rendimiento general mejorado"],
    
    description_en: "The most powerful and customizable launcher. Fully unlocked Prime version: gestures, drawer groups, hide apps, and exclusive scroll effects.",
    modFeatures_en: ["Prime Unlocked", "Gestures", "Hide Apps", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/pr18hq9ayo6l7oj/Nova_Launcher_8.1.6_PRIME.apk/file"
  },
  {
    id: 13,
    name: "Niagara Launcher Pro",
    developer: "FonApps",
    category: "Personalización",
    rating: 4.7,
    downloads: "10M+",
    size: "13,78 MB",
    version: "v1.15.7",
    image: "/icons/niagara_launcher.webp",
    thumbnail: "/Thumb/niagara_launcher_thumb.webp",
    screenshots: [
      "/screenshots/niagara_launcher_1.webp",
      "/screenshots/niagara_launcher_2.webp",
      "/screenshots/niagara_launcher_3.webp",
      "/screenshots/niagara_launcher_4.webp",
      "/screenshots/niagara_launcher_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/niagara_launcher_1.webp",
      "/screenshots/gallery_thumbs/niagara_launcher_2.webp",
      "/screenshots/gallery_thumbs/niagara_launcher_3.webp",
      "/screenshots/gallery_thumbs/niagara_launcher_4.webp",
      "/screenshots/gallery_thumbs/niagara_launcher_5.webp"
    ],
    description: "La pantalla de inicio más limpia para Android. Versión Pro desbloqueada con acceso a todos los widgets,temas, iconos adaptativos y personalización avanzada de fuentes y colores.",
    modFeatures: ["Pro Desbloqueado", "Widgets y temas Premium", "Iconos Adaptativos","Rendimiento general mejorado"],
    
    description_en: "The cleanest home screen for Android. Unlocked Pro version with access to all widgets, themes, adaptive icons, and advanced font and color customization.",
    modFeatures_en: ["Pro Unlocked", "Premium Widgets/Themes", "Adaptive Icons", "Improved Performance"],

    updateDate: "2026-1-9",

    isUpdated: true,
    downloadUrl: "https://www.mediafire.com/file/r5bnwbaprc9c20y/Niagara_Launcher_v1.15.7_PRO.apk/file"
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
    image: "/icons/perplexity.webp",
    thumbnail: "/Thumb/perplexity_thumb.webp",
    screenshots: [
      "/screenshots/grok_1.webp",
      "/screenshots/grok_2.webp",
      "/screenshots/grok_3.webp",
      "/screenshots/grok_4.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/grok_1.webp",
      "/screenshots/gallery_thumbs/grok_2.webp",
      "/screenshots/gallery_thumbs/grok_3.webp",
      "/screenshots/gallery_thumbs/grok_4.webp"
    ],
    description: "Tu asistente de respuestas con IA. Acceso Pro desbloqueado: búsquedas Pro ilimitadas, carga de archivos PDF/Imágenes sin límites y selección de modelos avanzados como GPT-5 y Claude 3.5 Sonnet.",
    modFeatures: ["Max Desbloqueado", "Búsquedas Max Ilimitadas", "Modelos Premium","Rendimiento general mejorado"],
    
    description_en: "Your AI answer assistant. Pro access unlocked: unlimited Pro searches, PDF/Image file upload without limits, and selection of advanced models like GPT-5 and Claude 3.5 Sonnet.",
    modFeatures_en: ["Max Unlocked", "Unlimited Max Searches", "Premium Models", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/03m3eolcwqxbu5y/Perplexity_2.65.1_MAX.apk/file"
  },
  {
    id: 11,
    name: "YouTube Premium",
    developer: "ReVance Mod",
    category: "Entretenimiento",
    rating: 4.9,
    downloads: "100M",
    size: "82,47 MB",
    version: "v20.14.43",
    image: "/icons/youtube.webp",
    thumbnail: "/Thumb/youtube_thumb.webp",
    screenshots: [
      "/screenshots/youtube_1.webp",
      "/screenshots/youtube_2.webp",
      "/screenshots/youtube_3.webp",
      "/screenshots/youtube_4.webp",
      "/screenshots/youtube_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/grok_1.webp",
      "/screenshots/gallery_thumbs/grok_2.webp",
      "/screenshots/gallery_thumbs/grok_3.webp",
      "/screenshots/gallery_thumbs/grok_4.webp"
    ],
    description: "La mejor experiencia de YouTube sin anuncios. Incluye reproducción en segundo plano, SponsorBlock para saltar segmentos de relleno y personalización completa de la interfaz.",
    warning: "Requisito: Es necesario instalar MicroG para iniciar sesión con Google.",
    warning_en: "Requirement: MicroG installation is required to sign in with Google.",
    modFeatures: ["Sin Anuncios", "Segundo Plano", "SponsorBlock","Rendimiento general mejorado"],
    
    description_en: "The best YouTube experience without ads. Includes background playback, SponsorBlock to skip filler segments, and full interface customization.",
    modFeatures_en: ["No Ads", "Background Play", "SponsorBlock", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/7436kvm1w1wzgr3/YouTube_ReVanced_20.14.43_PREMIUM.apk/file"
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
    image: "/icons/web_video_caster.webp",
    thumbnail: "/Thumb/web_video_caster_thumb.webp",
    screenshots: [
      "/screenshots/web_caster_1.webp",
      "/screenshots/web_caster_2.webp",
      "/screenshots/web_caster_3.webp",
      "/screenshots/web_caster_4.webp",
      "/screenshots/web_caster_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/web_caster_1.webp",
      "/screenshots/gallery_thumbs/web_caster_2.webp",
      "/screenshots/gallery_thumbs/web_caster_3.webp",
      "/screenshots/gallery_thumbs/web_caster_4.webp",
      "/screenshots/gallery_thumbs/web_caster_5.webp"
    ],
    description: "Transmite videos web, películas y series a tu TV, Chromecast o Roku sin restricciones. Versión Premium desbloqueada: sin anuncios, marcadores ilimitados y pantalla de inicio personalizada.",
    modFeatures: ["Premium Desbloqueado", "Sin Anuncios", "Cola de Reproducción","Rendimiento general mejorado"],
    
    description_en: "Cast web videos, movies, and TV shows to your TV, Chromecast, or Roku without restrictions. Premium version unlocked: no ads, unlimited bookmarks, and custom home screen.",
    modFeatures_en: ["Premium Unlocked", "No Ads", "Play Queue", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/13ar2t8nivpg4p4/Web_Video_Caster_5.12.8_PREMIUM.apk/file"
  },
  {
    id: 9,
    name: "Telegram Premium",
    developer: "FonApps",
    category: "Social",
    rating: 3.9,
    downloads: "1B+",
    size: "38,91 MB",
    version: "v12.3.0",
    image: "/icons/telegram.webp",
    thumbnail: "/Thumb/telegram_thumb.webp",
    screenshots: [
      "/screenshots/telegram_1.webp",
      "/screenshots/telegram_2.webp",
      "/screenshots/telegram_3.webp",
      "/screenshots/telegram_4.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/grok_1.webp",
      "/screenshots/gallery_thumbs/grok_2.webp",
      "/screenshots/gallery_thumbs/grok_3.webp",
      "/screenshots/gallery_thumbs/grok_4.webp"
    ],
    description: "Mensajería instantánea: simple, rápida y segura.\n\nDisfruta de una sincronización perfecta entre todos tus dispositivos con almacenamiento ilimitado en la nube.\n\nUtiliza una infraestructura global distribuida para ofrecer la máxima velocidad de conexión, cifrado avanzado para tu privacidad y herramientas poderosas para gestionar comunidades y compartir archivos de gran tamaño sin restricciones.",
    modFeatures: ["Premium Desbloqueado", "Gestión avanzada de chats", "Traducir chats enteros", "Copiar y guardar en canales privados", "Velocidad de descarga y subida+","Más","Rendimiento general mejorado"],
    
    description_en: "Instant messaging: simple, fast, and secure. Enjoy seamless sync across all your devices with unlimited cloud storage. Uses a distributed global infrastructure for max speed, advanced encryption, and powerful tools to share large files without restrictions.",
    modFeatures_en: ["Premium Unlocked", "Advanced Chat Management", "Translate Chats", "Save Private Channels", "Faster DL/Upload", "More...", "Improved Performance"],

    updateDate: "2026-1-3",
    isUpdated: true,
    downloadUrl: "https://www.mediafire.com/file/ph38j27ihwuooa9/Telegram_12.3.0_PREMIUM.apk/file"
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
    image: "/icons/powerdirector.webp",
    thumbnail: "/Thumb/powerdirector_thumb.webp",
    screenshots: [
      "/screenshots/powerdirector_1.webp",
      "/screenshots/powerdirector_2.webp",
      "/screenshots/powerdirector_3.webp",
      "/screenshots/powerdirector_4.webp",
      "/screenshots/powerdirector_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/powerdirector_1.webp",
      "/screenshots/gallery_thumbs/powerdirector_2.webp",
      "/screenshots/gallery_thumbs/powerdirector_3.webp",
      "/screenshots/gallery_thumbs/powerdirector_4.webp",
      "/screenshots/gallery_thumbs/powerdirector_5.webp"
    ],
    description: "El editor de video más profesional. Versión Premium desbloqueada: exportación en 4K Ultra HD, sin marca de agua, estabilizador de video y acceso ilimitado a todo el stock de música y efectos.",
    modFeatures: ["Sin Marca de Agua", "Exportación 4K", "Todo Desbloqueado","Rendimiento general mejorado"],
    
    description_en: "The most professional video editor. Premium version unlocked: 4K Ultra HD export, no watermark, video stabilizer, and unlimited access to the entire stock of music and effects.",
    modFeatures_en: ["No Watermark", "4K Export", "All Unlocked", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/o9poinbem468mvn/PowerDirector_15.9.2_PRO.apk/file"
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
    image: "/icons/smart_launcher.webp",
    thumbnail: "/Thumb/smart_launcher_thumb.webp",
    screenshots: [
      "/screenshots/smart_launcher_1.webp",
      "/screenshots/smart_launcher_2.webp",
      "/screenshots/smart_launcher_3.webp",
      "/screenshots/smart_launcher_4.webp",
      "/screenshots/smart_launcher_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/smart_launcher_1.webp",
      "/screenshots/gallery_thumbs/smart_launcher_2.webp",
      "/screenshots/gallery_thumbs/smart_launcher_3.webp",
      "/screenshots/gallery_thumbs/smart_launcher_4.webp",
      "/screenshots/gallery_thumbs/smart_launcher_5.webp"
    ],
    description: "El launcher más inteligente y eficiente. Versión Pro desbloqueada: búsqueda inteligente, categorías automáticas personalizables, widgets adaptativos y gestos avanzados en pantalla de inicio.",
    modFeatures: ["Pro Desbloqueado", "Iconos Adaptativos", "Sin Anuncios","Rendimiento general mejorado"],
    
    description_en: "The smartest and most efficient launcher. Unlocked Pro version: smart search, automatic customizable categories, adaptive widgets, and advanced home screen gestures.",
    modFeatures_en: ["Pro Unlocked", "Adaptive Icons", "No Ads", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/hw5g8bav0krab7q/Smart_Launcher_6.5_build_054_PRO.apk/file"
  },
  {
    id: 6,
    name: "Lark Player Premium",
    developer: "FonApps",
    category: "Entretenimiento",
    rating: 4.6,
    downloads: "500M+",
    size: "25,23 MB",
    version: "v6.34.12",
    image: "/icons/lark_player.webp",
    thumbnail: "/Thumb/lark_player_thumb.webp",
    screenshots: [
      "/screenshots/lark_player_1.webp",
      "/screenshots/lark_player_2.webp",
      "/screenshots/lark_player_3.webp",
      "/screenshots/lark_player_4.webp",
      "/screenshots/lark_player_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/lark_player_1.webp",
      "/screenshots/gallery_thumbs/lark_player_2.webp",
      "/screenshots/gallery_thumbs/lark_player_3.webp",
      "/screenshots/gallery_thumbs/lark_player_4.webp",
      "/screenshots/gallery_thumbs/lark_player_5.webp"
    ],
    description: "Un reproductor multimedia offline versátil que soporta todos los formatos de audio y video populares (MP3, FLAC, MKV). Versión Premium desbloqueada: disfruta de una experiencia fluida sin publicidad intrusiva. Incluye ecualizadores potentes con preajustes para géneros como Reggaetón y Rock, letras sincronizadas en tiempo real y modo de ventana flotante para multitarea.",
    modFeatures: ["Sin Anuncios", "Temas Premium", "Ecualizador Pro","Rendimiento general mejorado"],
    
    description_en: "A versatile offline multimedia player supporting all popular formats (MP3, FLAC, MKV). Premium version unlocked: enjoy a smooth experience without ads. Includes powerful equalizers, real-time synced lyrics, and floating window mode.",
    modFeatures_en: ["No Ads", "Premium Themes", "Pro Equalizer", "Improved Performance"],

    isUpdated: false,
    updateDate: "2026-1-1",
    downloadUrl: "https://www.mediafire.com/file/jp4edo25yrk20fp/Lark_Player_6.34.12_PREMIUM.apk/file"
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
    image: "/icons/samsung_music.webp",
    thumbnail: "/Thumb/samsung_music_thumb.webp",
    screenshots: [
      "/screenshots/samsung_music_1.webp",
      "/screenshots/samsung_music_2.webp",
      "/screenshots/samsung_music_3.webp",
      "/screenshots/samsung_music_4.webp",
      "/screenshots/samsung_music_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/samsung_music_1.webp",
      "/screenshots/gallery_thumbs/samsung_music_2.webp",
      "/screenshots/gallery_thumbs/samsung_music_3.webp",
      "/screenshots/gallery_thumbs/samsung_music_4.webp",
      "/screenshots/gallery_thumbs/samsung_music_5.webp"
    ],
    description: "El reproductor de música oficial de Samsung optimizado para todos los dispositivos. Interfaz One UI elegante, ecualizador avanzado y soporte para todos los formatos de audio con calidad premium.",
    modFeatures: ["Interfaz One UI", "Ecualizador Pro", "Para todos los dispositivos","Rendimiento general mejorado"],
    
    description_en: "The official Samsung music player optimized for all devices. Elegant One UI interface, advanced equalizer, and support for all audio formats with premium quality.",
    modFeatures_en: ["One UI Interface", "Pro Equalizer", "For All Devices", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/eejef07o85k8ydn/SamsungMusic-16.2.41.9-v1.7.2-Spotify.apk/file"
  },
  {
    id: 4,
    name: "Chat Smith AI Premium",
    developer: "FonApps",
    category: "IA",
    rating: 4.2,
    downloads: "10M+",
    size: "117,98 MB",
    version: "v8.251208.1",
    image: "/icons/chat_smith.webp",
    thumbnail: "/Thumb/chat_smith_thumb.webp",
    screenshots: [
      "/screenshots/chat_smith_1.webp",
      "/screenshots/chat_smith_2.webp",
      "/screenshots/chat_smith_3.webp",
      "/screenshots/chat_smith_4.webp",
      "/screenshots/chat_smith_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/chat_smith_1.webp",
      "/screenshots/gallery_thumbs/chat_smith_2.webp",
      "/screenshots/gallery_thumbs/chat_smith_3.webp",
      "/screenshots/gallery_thumbs/chat_smith_4.webp",
      "/screenshots/gallery_thumbs/chat_smith_5.webp"
    ],
    description: "Asistente inteligente avanzado impulsado por GPT-4. Versión Pro desbloqueada: diálogos ilimitados, procesamiento de imágenes, modo experto y sin anuncios de ningún tipo.",
    modFeatures: ["Pro Desbloqueado", "Chat Ilimitado", "GPT-5 & Gemini 3 pro y mas...","Rendimiento general mejorado"],
    
    description_en: "Advanced intelligent assistant powered by GPT-4. Pro version unlocked: unlimited dialogues, image processing, expert mode, and no ads of any kind.",
    modFeatures_en: ["Pro Unlocked", "Unlimited Chat", "GPT-5 & Gemini 3 pro", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/xd9ujn6schel2el/Chat_Smith_8.251208.1_PREMIUM.apk/file"
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
    image: "/icons/microG.webp",
    thumbnail: "/Thumb/microG_thumb.webp",
    screenshots: [
      "/screenshots/grok_1.webp",
      "/screenshots/grok_2.webp",
      "/screenshots/grok_3.webp",
      "/screenshots/grok_4.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/grok_1.webp",
      "/screenshots/gallery_thumbs/grok_2.webp",
      "/screenshots/gallery_thumbs/grok_3.webp",
      "/screenshots/gallery_thumbs/grok_4.webp"
    ],
    description: "El componente esencial para usuarios de mods. Permite iniciar sesión con tu cuenta de Google en aplicaciones modificadas como YouTube ReVanced, garantizando sincronización y notificaciones sin servicios de Google oficiales.",
    modFeatures: ["Login Google habilitado", "Sin rastreo de datos", "Ahorro de batería","Rendimiento general mejorado"],
    
    description_en: "The essential component for mod users. Allows you to sign in with your Google account on modified apps like YouTube ReVanced, ensuring synchronization and notifications without official Google services.",
    modFeatures_en: ["Google Login Enabled", "No Data Tracking", "Battery Saver", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/qjg0kj7dbfuyp3p/microG_0.3.1.4.240913.apk/file"
  },
  {
    id: 2,
    name: "Wallcraft Premium",
    developer: "FonApps",
    category: "Personalización",
    rating: 4.7,
    downloads: "100M+",
    size: "104,5 MB",
    version: "v3.59.01",
    image: "/icons/wallcraft.webp",
    thumbnail: "/Thumb/wallcraft_thumb.webp",
    screenshots: [
      "/screenshots/wallcraft_1.webp",
      "/screenshots/wallcraft_2.webp",
      "/screenshots/wallcraft_3.webp",
      "/screenshots/wallcraft_4.webp",
      "/screenshots/wallcraft_5.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/wallcraft_1.webp",
      "/screenshots/gallery_thumbs/wallcraft_2.webp",
      "/screenshots/gallery_thumbs/wallcraft_3.webp",
      "/screenshots/gallery_thumbs/wallcraft_4.webp",
      "/screenshots/gallery_thumbs/wallcraft_5.webp"
    ],
    description: "La biblioteca más vasta de fondos de pantalla en ultra alta definición. Acceso exclusivo a fondos 4K y 8K adaptados automáticamente al tamaño de tu pantalla, con efectos de paralaje 4D y sin interrupciones publicitarias.",
    modFeatures: ["Premium Desbloqueado", "Fondos 8K y 4D", "Sin Publicidad","Rendimiento general mejorado"],
    
    description_en: "The vastest library of ultra-high definition wallpapers. Exclusive access to 4K and 8K backgrounds automatically adapted to your screen size, with 4D parallax effects and no advertising interruptions.",
    modFeatures_en: ["Premium Unlocked", "8K & 4D Wallpapers", "No Ads", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/w813y93pk1q0jl9/Wallcraft_3.59.01_PRO.apk/file"
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
    image: "/icons/urban_vpn.webp",
    thumbnail: "/Thumb/urban_vpn_thumb.webp",
    screenshots: [
      "/screenshots/grok_1.webp",
      "/screenshots/grok_2.webp",
      "/screenshots/grok_3.webp",
      "/screenshots/grok_4.webp"
    ],
    thumbs: [
      "/screenshots/gallery_thumbs/grok_1.webp",
      "/screenshots/gallery_thumbs/grok_2.webp",
      "/screenshots/gallery_thumbs/grok_3.webp",
      "/screenshots/gallery_thumbs/grok_4.webp"
    ],
    description: "La solución definitiva para navegar sin fronteras. Acceso ilimitado a servidores en más de 80 países con ancho de banda infinito. Ideal para desbloquear streaming y proteger tu privacidad en redes públicas con cifrado de grado militar.",
    modFeatures: ["Premium Desbloqueado", "Ancho de Banda Ilimitado", "Ubicaciones Pro","Rendimiento general mejorado"],
    
    description_en: "The ultimate solution for borderless browsing. Unlimited access to servers in over 80 countries with infinite bandwidth. Ideal for unblocking streaming and protecting your privacy on public networks with military-grade encryption.",
    modFeatures_en: ["Premium Unlocked", "Unlimited Bandwidth", "Pro Locations", "Improved Performance"],

    isUpdated: false,
    downloadUrl: "https://www.mediafire.com/file/kkpmcvmjxwo2soq/Urban_VPN_1.0.97_premium.apk/file"
  }
];

// ✅ SECCIÓN FAVORITOS
const CATEGORIES = ["Todos", "Favoritos", "Personalización", "Herramientas", "IA", "Social", "Entretenimiento"];

// ✅ DICCIONARIO DE IDIOMAS (TEXTOS FIJOS)
const TEXTS = {
  es: {
    nav_home: "Inicio",
    nav_top: "Top Mods",
    header_title_1: "Descarga tus",
    header_title_2: "Apps",
    header_title_3: "favoritas",
    header_desc: "Descarga versiones modificadas seguras. Características premium desbloqueadas, sin anuncios y funcionalidades extendidas.",
    search_placeholder: "Buscar mods (ej. Grok Ai, youtube)...",
    no_results: "No se encontraron resultados para",
    view_all: "Ver todas las apps",
    new_version: "NUEVA VERSIÓN DISPONIBLE",
    section_news: "Novedades",
    section_news_2: "y",
    section_news_3: "Actualizaciones",
    section_favorites: "Tus Guardados",
    section_popular: "Mods Populares",
    section_top: "Ranking Global",
    section_top_subtitle: "Los favoritos de la comunidad esta semana",
    download_btn: "Descargar en MediaFire",
    generating_link: "Generando enlace seguro...",
    link_ready: "¡Enlace listo! Redirigiendo...",
    footer_trends: "Tendencias de Búsqueda",
    footer_community: "Comunidad Oficial",
    footer_join: "Unirme a Telegram",
    desc_label: "Descripción",
    gallery_label: "Galería",
    features_label: "Características del Mod",
    rating_label: "Valoración",
    size_label: "Tamaño",
    version_label: "Versión",
    categories: {
      "Todos": "Todos",
      "Favoritos": "Favoritos",
      "Personalización": "Personalización",
      "Herramientas": "Herramientas",
      "IA": "IA",
      "Social": "Social",
      "Entretenimiento": "Entretenimiento",
      "Fotografía": "Fotografía"
    }
  },
  en: {
    nav_home: "Home",
    nav_top: "Top Mods",
    header_title_1: "Download your",
    header_title_2: "Favorite",
    header_title_3: "Apps",
    header_desc: "Download safe modded versions. Premium features unlocked, no ads, and extended functionalities.",
    search_placeholder: "Search mods (e.g. Grok Ai, youtube)...",
    no_results: "No results found for",
    view_all: "View all apps",
    new_version: "NEW VERSION AVAILABLE",
    section_news: "Latest",
    section_news_2: "&",
    section_news_3: "Updates",
    section_favorites: "Your Saved Apps",
    section_popular: "Popular Mods",
    section_top: "Global Ranking",
    section_top_subtitle: "Community favorites this week",
    download_btn: "Download (MediaFire)",
    generating_link: "Generating secure link...",
    link_ready: "Link ready! Redirecting...",
    footer_trends: "Search Trends",
    footer_community: "Official Community",
    footer_join: "Join Telegram",
    desc_label: "Description",
    gallery_label: "Gallery",
    features_label: "Mod Features",
    rating_label: "Rating",
    size_label: "Size",
    version_label: "Version",
    categories: {
      "Todos": "All",
      "Favoritos": "Favorites",
      "Personalización": "Personalization",
      "Herramientas": "Tools",
      "IA": "AI",
      "Social": "Social",
      "Entretenimiento": "Entertainment",
      "Fotografía": "Photography"
    }
  }
};

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

// Modificado para aceptar texto variable
const DownloadButton = ({ onClick, loading, text }) => (
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
        <span>...</span> 
      </>
    ) : (
      <>
        <Download size={20} />
        <span>{text}</span>
        <ExternalLink size={16} className="opacity-50" />
      </>
    )}
  </button>
);

const AppIcon = ({ type, thumbnail, size = "md" }) => {
  const sizeClass = size === "lg" 
    ? "w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl" 
    : "w-10 h-10 sm:w-16 sm:h-16 text-xl sm:text-2xl";

  const imageSource = (size === "md" && thumbnail) ? thumbnail : type;

  if (imageSource && imageSource.startsWith('/')) {
    return (
      <div className={`${sizeClass} rounded-2xl shadow-lg transform transition-transform group-hover:scale-110 duration-300 overflow-hidden bg-slate-800 border border-white/10 p-0.5 flex items-center justify-center relative`}>
        <img 
          src={imageSource} 
          alt="App Icon"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover rounded-[14px]"
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClass} rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold shadow-lg transform transition-transform group-hover:scale-110 duration-300`}>
      <Box className="text-white/50" />
    </div>
  );
};

// --- COMPONENTE CARRUSEL ---
const UpdatedAppsCarousel = ({ apps, onSelectApp, t }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
   
  const featuredApps = apps
    .filter(app => app.isUpdated || app.isNew)
    .sort((a, b) => {
      const dateA = a.updateDate ? new Date(a.updateDate) : new Date(0);
      const dateB = b.updateDate ? new Date(b.updateDate) : new Date(0);
      return dateB - dateA; 
    });

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [featuredApps]);

  if (featuredApps.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollability, 350); 
    }
  };

  return (
    <section className="mb-6 animate-in fade-in slide-in-from-right-8 duration-700 group relative">
      <div className="flex items-center gap-2 mb-4 px-1">
        <div className="p-1.5 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <Zap className="text-yellow-400" size={18} fill="currentColor" />
        </div>
        <h2 className="text-lg font-bold tracking-tight">
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            {t.section_news}
          </span>
          <span className="text-white mx-1.5">{t.section_news_2}</span>
          <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
            {t.section_news_3}
          </span>
        </h2>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 w-10 h-10 items-center justify-center rounded-full bg-[#0a0a12]/90 border border-teal-500/30 backdrop-blur-md shadow-lg text-white transition-all hover:scale-110 hover:bg-teal-500"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div 
          ref={scrollRef}
          onScroll={checkScrollability}
          className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 no-scrollbar overscroll-x-contain"
        >
          {featuredApps.map((app) => (
            <div 
              key={app.id}
              onClick={() => onSelectApp(app)}
              className="flex-none w-64 relative bg-[#13131f] rounded-2xl p-3 border border-teal-500/20 shadow-sm cursor-pointer transition-all active:scale-95"
            >
              {app.isNew ? (
                <div className="absolute top-0 right-0 px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[9px] font-black uppercase tracking-wider rounded-bl-2xl rounded-tr-xl z-10 shadow-lg">
                  NUEVO
                </div>
              ) : (
                <div className="absolute top-0 right-0 px-2.5 py-1 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-[9px] font-black uppercase tracking-wider rounded-bl-2xl rounded-tr-xl z-10 shadow-lg">
                  UPDATE
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <AppIcon type={app.image} thumbnail={app.thumbnail} size="md" />
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-100 text-sm truncate pr-4">{app.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-teal-500/10 text-teal-300 px-1.5 py-0.5 rounded border border-teal-500/20 font-mono">
                      {app.version}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="w-2 flex-none" />
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 w-10 h-10 items-center justify-center rounded-full bg-[#0a0a12]/90 border border-teal-500/30 backdrop-blur-md shadow-lg text-white transition-all hover:scale-110 hover:bg-teal-500"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </section>
  );
};

export default function ModStoreApp() {
  const [currentView, setCurrentView] = useState('home'); 
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedApp, setSelectedApp] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // ✅ ESTADO DE IDIOMA
  const [lang, setLang] = useState('es');
  const t = TEXTS[lang]; 

  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('myFavorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('myFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (selectedApp || currentScreenshotIndex !== null) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = '';
    };
  }, [selectedApp, currentScreenshotIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentScreenshotIndex === null || !selectedApp) return;
      const screenshots = selectedApp.screenshots || [1, 2, 3]; 
      const totalImages = screenshots.length;

      if (e.key === 'Escape') {
        setCurrentScreenshotIndex(null);
      }
      if (e.key === 'ArrowRight' && currentScreenshotIndex < totalImages - 1) {
         setCurrentScreenshotIndex((prev) => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentScreenshotIndex > 0) {
         setCurrentScreenshotIndex((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreenshotIndex, selectedApp]);

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

  const getMonetizedLink = async (app) => {
    if (!MONETIZATION_API_TOKEN) return app.downloadUrl; 

    const cacheKey = `loot_${app.id}`; 
    const cachedLink = sessionStorage.getItem(cacheKey);

    if (cachedLink) {
      console.log("🚀 Usando enlace de memoria (Cache):", cachedLink);
      return cachedLink;
    }

    try {
      const response = await fetch(`https://creators.lootlabs.gg/api/public/content_locker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MONETIZATION_API_TOKEN}`
        },
        body: JSON.stringify({
          title: app.name.substring(0, 30), 
          url: app.downloadUrl,             
          tier_id: 1,                       
          number_of_tasks: 3,               
          theme: 1                          
        })
      });

      const data = await response.json();
      
      let finalLink = null;
      if (data?.type === "created") {
          if (Array.isArray(data.message) && data.message[0]?.loot_url) {
              finalLink = data.message[0].loot_url;
          } else if (data.message?.loot_url) {
              finalLink = data.message.loot_url;
          }
      }

      if (finalLink) {
        sessionStorage.setItem(cacheKey, finalLink);
        return finalLink;
      }
      
      console.warn("Respuesta API LootLabs no válida:", data);
      return app.downloadUrl; 
      
    } catch (error) {
      console.error("Error conectando con LootLabs:", error);
      return app.downloadUrl; 
    }
  };

  const handleDownload = async (e, id) => {
    e?.stopPropagation();
    if (downloadingId) return;
    
    const appToDownload = INITIAL_APPS.find(app => app.id === id);
    if (!appToDownload) return;

    setDownloadingId(id);
    showNotification(t.generating_link);

    const finalLink = await getMonetizedLink(appToDownload);

    setDownloadingId(null);
    showNotification(t.link_ready);
    
    setTimeout(() => {
        window.open(finalLink, '_blank');
        if(selectedApp) setSelectedApp(null);
    }, 500);
  };

  const renderAppGrid = (title, isTopView = false) => {
    let processedApps = isTopView 
      ? [...INITIAL_APPS].sort((a, b) => b.rating - a.rating) 
      : INITIAL_APPS;

    const visibleApps = processedApps.filter(app => {
       const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
       
       let matchesCategory = true;
       if (!isTopView) {
         if (activeCategory === "Todos") matchesCategory = true;
         else if (activeCategory === "Favoritos") matchesCategory = favorites.includes(app.id); 
         else matchesCategory = app.category === activeCategory;
       }
       
       return matchesSearch && matchesCategory;
    });

    const hasResults = visibleApps.length > 0;

    return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      <div className="flex items-center gap-2 mb-6 text-slate-300">
         {activeCategory === "Favoritos" ? (
            <Heart className="text-pink-500" size={20} fill="currentColor" />
         ) : (
            <TrendingUp className="text-purple-400" size={20} />
         )}
         <h2 className="text-xl font-bold">
            {activeCategory === "Favoritos" ? t.section_favorites : title}
         </h2>
      </div>

      {!hasResults ? (
        <div className="text-center py-20 text-slate-500">
          {activeCategory === "Favoritos" ? (
             <>
               <p className="text-lg mb-2">Aún no tienes favoritos ❤️</p>
               <p className="text-sm">Dale al corazón en las apps que te gusten.</p>
             </>
          ) : (
             <p className="text-lg">{t.no_results} "{searchTerm}"</p>
          )}
          
          <button onClick={() => {setSearchTerm(""); setActiveCategory("Todos")}} className="mt-4 text-teal-400 hover:underline">
            {t.view_all}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {visibleApps.map((app) => {
            const isFav = favorites.includes(app.id);
            const badgeType = getBadge(app);
            
            // ✅ ELEGIMOS FEATURES SEGÚN IDIOMA
            const featuresToShow = (lang === 'en' && app.modFeatures_en) ? app.modFeatures_en : app.modFeatures;

            return (
            <div 
              key={app.id}
              onClick={() => setSelectedApp(app)}
              onMouseEnter={() => {
                const img = new Image();
                img.src = app.image;
                if (app.thumbnail) { const t = new Image(); t.src = app.thumbnail; }
                if (app.screenshots) { app.screenshots.forEach(s => { const i = new Image(); i.src = s; }); }
              }}
              className={`
                group relative bg-[#13131f] rounded-2xl p-4 border border-white/5 
                flex flex-col items-center text-center
                transition-all duration-300 
                active:scale-95 md:active:scale-100
                md:hover:border-purple-500/30 md:hover:-translate-y-1 md:hover:shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] 
                cursor-pointer overflow-hidden
                animate-in fade-in zoom-in-95 duration-300 fill-mode-both
              `}
            >
              {badgeType && (
                <div className="absolute top-0 left-0 z-20">
                   <div className="px-2 py-0.5 rounded-br-lg bg-yellow-500/10 border-b border-r border-yellow-500/20 text-yellow-200 text-[8px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
                      {badgeType}
                   </div>
                </div>
              )}

              <button
                onClick={(e) => toggleFavorite(e, app.id)}
                className="absolute top-2 right-2 z-20 p-2 rounded-full active:scale-75 transition-transform hover:bg-white/5"
              >
                 <div className={`transition-all duration-300 ${isFav ? "text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" : "text-slate-600 hover:text-slate-400"}`}>
                    <Heart size={18} fill={isFav ? "currentColor" : "none"} strokeWidth={isFav ? 0 : 2} />
                 </div>
              </button>

              <div className="mb-3 w-full flex justify-center transform transition-transform duration-300 group-hover:scale-105 origin-center will-change-transform backface-hidden">
                 <AppIcon type={app.image} thumbnail={app.thumbnail} size="md" />
              </div>
              
              <div className="w-full mb-3">
                <h3 className="font-bold text-sm text-slate-100 truncate w-full text-center leading-tight">
                    {badgeType 
                      ? app.name.replace(badgeType, "").replace("-", "").trim() 
                      : app.name}
                 </h3>
                
                <p className="text-[10px] text-slate-500 mt-1 truncate px-4">
                  {app.developer}
                </p>

                <div className="flex items-center justify-center gap-1 text-amber-400 text-[10px] font-bold mt-1.5">
                    <Star size={10} fill="currentColor" />
                    <span>{app.rating}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-1.5 mb-4 w-full px-1">
                {(featuresToShow || []).slice(0, 2).map((feature, idx) => (
                  <span key={idx} className="text-[8px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-slate-800 text-slate-400 border border-white/5 rounded-md">
                    {feature}
                  </span>
                ))}
                {(featuresToShow || []).length > 2 && (
                   <span className="text-[8px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-slate-800 text-slate-400 border border-white/5 rounded-md">
                      +1
                   </span>
                )}
              </div>

              <div className="w-full flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5">
                   <span>{app.size}</span>
                </div>
                
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-white/5 group-hover:bg-teal-500 group-hover:text-white transition-colors shadow-lg">
                   <ChevronRight size={16} />
                </div>
              </div>
            </div>
          )})}
        </div>
      )}
    </section>
  );
  };

  const renderHome = () => {
    const searchSuggestions = searchTerm.length > 0 
      ? INITIAL_APPS.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 3)
      : [];

    return (
      <>
        <header className="mb-12 text-center md:text-left">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900/50 to-slate-900 border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="absolute inset-0 md:hidden overflow-hidden pointer-events-none select-none">
                <div className="absolute top-5 right-0 text-teal-500/10 animate-bounce duration-[3000ms]">
                  <ShieldCheck size={80} strokeWidth={1} />
                </div>
                <div className="absolute top-5 left-0 text-purple-500/10 animate-bounce duration-[4000ms]">
                  <Zap size={80} strokeWidth={1} />
                </div>
              </div>
              
              <div className={`transition-all duration-300 ease-in-out ${isSearchFocused ? 'hidden md:block opacity-0' : 'block opacity-100'}`}>
                <Badge color="mint">{t.new_version}</Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-3">
                  {t.header_title_1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-500">{t.header_title_2}</span> {t.header_title_3}
                </h1>
                <p className="text-slate-400 text-sm md:text-lg max-w-xl leading-relaxed">
                  {t.header_desc}
                </p>
              </div>
              
              <div className="relative max-w-md mt-6 group z-20">
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
                    placeholder={t.search_placeholder} 
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

        {!searchTerm && (
           <UpdatedAppsCarousel apps={INITIAL_APPS} onSelectApp={setSelectedApp} t={t} />
        )}

        <div className="flex overflow-x-auto p-4 gap-3 mb-8 no-scrollbar animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative px-6 py-2 rounded-full font-medium group transition-transform duration-200 active:scale-95 border border-white/5 whitespace-nowrap"
              >
                <div className="absolute inset-0 rounded-full bg-slate-800/50 transition-colors duration-300 group-hover:bg-slate-700" />
                <div 
                  className={`absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-purple-600 transition-opacity duration-300 ease-out
                    ${isActive ? "opacity-100" : "opacity-0"}
                  `} 
                />
                <div 
                   className={`absolute inset-0 rounded-full transition-opacity duration-300
                   ${isActive ? "opacity-100 shadow-[0_0_20px_rgba(45,212,191,0.5)]" : "opacity-0"}`}
                />
                <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`}>
                  {t.categories[cat] || cat}
                </span>
              </button>
            );
          })}
        </div>

        {renderAppGrid(t.section_popular, false)}
      </>
    );
  };

  const renderTopMods = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{t.section_top}</h2>
        <p className="text-slate-400">{t.section_top_subtitle}</p>
      </div>
      {renderAppGrid("Ranking Global", true)}
    </div>
  );

 const renderFooter = () => (
    <footer className="relative mt-32 border-t border-white/10 bg-gradient-to-b from-[#0a0a12] to-[#05050a] pt-16 pb-12 overflow-hidden text-center">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-900/10 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 z-10">
        <div className="mb-12">
          <h2 className="text-white font-bold mb-6 flex items-center justify-center gap-2">
            <TrendingUp size={18} className="text-teal-400"/> {t.footer_trends}
          </h2>
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

        <div className="mb-16 max-w-sm mx-auto">
          <h2 className="text-white font-bold mb-4 flex items-center justify-center gap-2">
            <Zap size={18} className="text-purple-400"/> {t.footer_community}
          </h2>
          <a 
            href="https://t.me/+HU0V3IL0_E44NmY0" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-teal-500/10 to-purple-500/10 hover:from-teal-500/20 hover:to-purple-500/20 border border-white/10 rounded-2xl transition-all group"
          >
            <span className="font-bold text-teal-400">{t.footer_join}</span>
            <ExternalLink size={18} className="text-purple-400 group-hover:translate-x-1 transition-transform"/>
          </a>
        </div>

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
    <div className="min-h-screen text-slate-200 selection:bg-teal-500/30 overflow-x-hidden w-full relative" style={{ fontFamily: "'Outfit', sans-serif" }}>
      
      <style>{`
        /* 1. IMPORTAR LA FUENTE OUTFIT */
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        /* 2. APLICAR GLOBALMENTE */
        html, body {
          max-width: 100%;
          overflow-x: hidden;
          font-family: 'Outfit', sans-serif !important; /* Forzamos la nueva fuente */
        }

        html { 
          overflow-y: scroll;
          scrollbar-gutter: stable; 
        }
        
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #0a0a12; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
        
        /* Animaciones */
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stagger-enter {
          opacity: 0; 
          animation: slideUpFade 0.5s ease-out forwards;
          will-change: transform, opacity;
        }
        
        .animate-content { animation: contentShow 0.3s ease-out forwards; }
        @keyframes contentShow {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      
{/* FONDO "ZERO-LAG" DEFINITIVO */}
<div className="fixed top-0 left-0 w-full h-[120vh] -z-10 pointer-events-none overflow-hidden bg-[#0a0a12]">
  <img 
    src="/fondo.webp"  
    alt="" 
    className="w-full h-full object-cover"
    style={{ 
      transform: 'translate3d(0, 0, 0)', 
      opacity: 0.7 
    }}
  />
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

          {/* ✅ BARRA CENTRAL Y SWITCH DE IDIOMA (PC) */}
          <div className="hidden md:flex items-center gap-4">
             <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                {[
                  { id: 'home', label: t.nav_home },
                  { id: 'top', label: t.nav_top }
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

             {/* 🇺🇸 SWITCH IDIOMA */}
             <button 
               onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
               className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-white/10 hover:border-teal-500 transition-colors"
             >
               <Globe size={16} className="text-teal-400" />
               <span className="text-xs font-bold text-white">{lang === 'es' ? 'ES' : 'EN'}</span>
             </button>
          </div>

          {/* ✅ MENÚ HAMBURGUESA (MÓVIL) */}
          <button 
            aria-label="Abrir menú de navegación"
            className="md:hidden p-2 text-slate-300 hover:text-white bg-white/5 rounded-lg border border-white/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

    {/* MENÚ MÓVIL DESPLEGABLE */}
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
            
            {/* ✅ BOTÓN DE IDIOMA DENTRO DEL MENÚ */}
            <button 
               onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
               className="w-full text-left px-5 py-3.5 rounded-xl bg-white/5 text-slate-300 border border-transparent font-medium flex items-center gap-3 mb-2"
             >
               <Globe size={18} className="text-teal-400" />
               <span>Cambiar Idioma: <b className="text-white">{lang === 'es' ? 'ESPAÑOL' : 'ENGLISH'}</b></span>
             </button>

            {[
              { id: 'home', label: t.nav_home },
              { id: 'top', label: t.nav_top }
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

      {/* ✅ MODAL SINCRONIZADO (Traducido y con Advertencias Corregidas) */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedApp(null)} 
          />
          
          <div className="relative w-full max-w-lg bg-[#161622] rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-content will-change-transform">
            
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-900/40 to-transparent pointer-events-none" />
            
            <button 
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-red-500/80 rounded-full text-white/90 hover:text-white transition-all z-50 border border-white/10 shadow-lg backdrop-blur-sm"
            >
              <X size={24} />
            </button>

            <div className="relative p-6 pt-12 text-center max-h-[85vh] overflow-y-auto overscroll-contain no-scrollbar">
              
              {getBadge(selectedApp) && (
                <div className="absolute top-0 left-0 z-10">
                   <div className="px-4 py-1.5 rounded-br-2xl bg-yellow-500/10 border-b border-r border-yellow-500/20 text-yellow-200 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
                      {getBadge(selectedApp)}
                   </div>
                </div>
              )}

              <div className="mx-auto mb-4 w-28 h-28 sm:w-32 sm:h-32 relative shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden bg-slate-800 group">
                <img 
                  src={selectedApp.thumbnail || selectedApp.image} 
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-50"
                />
                <img 
                  src={selectedApp.image} 
                  alt={selectedApp.name}
                  className="relative z-10 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0"
                  onLoad={(e) => e.currentTarget.classList.remove('opacity-0')} 
                />
                <div className="absolute inset-0 rounded-3xl border border-white/10 z-20 pointer-events-none" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">
                {getBadge(selectedApp) ? selectedApp.name.replace(getBadge(selectedApp), "").replace("-", "").trim() : selectedApp.name}
              </h2>
              <p className="text-sm font-bold mb-4 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent w-fit mx-auto">
                {selectedApp.developer}
              </p>

              <div className="flex justify-center gap-6 text-sm text-slate-400 mb-8 border-y border-white/5 py-4">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-white text-base">{selectedApp.rating}</span>
                  <span className="text-xs">{t.rating_label}</span>
                </div>
                <div className="flex flex-col items-center border-l border-white/10 pl-6">
                  <span className="font-bold text-white text-base">{selectedApp.size}</span>
                  <span className="text-xs">{t.size_label}</span>
                </div>
                <div className="flex flex-col items-center border-l border-white/10 pl-6">
                  <span className="font-bold text-white text-base">{selectedApp.version}</span>
                  <span className="text-xs">{t.version_label}</span>
                </div>
              </div>

<div className="text-left mb-6 space-y-4">
  <div>
    <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-3 flex items-center gap-2">
      <Star size={14} className="animate-pulse"/> {t.desc_label}
    </h3>
    
    <p className="text-slate-300 text-sm leading-7 whitespace-pre-line font-light">
      {(lang === 'en' && selectedApp.description_en) ? selectedApp.description_en : selectedApp.description}
    </p>

    {/* ✅ ADVERTENCIA (WARNING) CORREGIDA */}
    {selectedApp.warning && (
      <div className="mt-4 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.1)] flex items-center justify-center gap-3">
        <div className="animate-pulse">
          <AlertTriangle className="text-sky-400" size={20} />
        </div>
        <p className="text-sky-300 text-xs font-bold leading-relaxed text-left">
          {(lang === 'en' && selectedApp.warning_en) 
            ? selectedApp.warning_en 
            : selectedApp.warning.replace("⚠️", "").replace("Nota:", "").trim()
          }
        </p>
      </div>
    )}
  </div>

                <div className="mb-6">
                   <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                     <ImageIcon size={14} /> {t.gallery_label}
                   </h3>
                   <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar -mx-4 px-4">
                     {(selectedApp.screenshots || [selectedApp.image, selectedApp.image, selectedApp.image]).map((shot, idx) => (
                       <div 
                         key={idx} 
                         onClick={() => setCurrentScreenshotIndex(idx)}
                         className="flex-none w-28 h-28 aspect-square relative rounded-xl overflow-hidden border border-white/10 bg-slate-900 snap-center shadow-lg group/shot cursor-zoom-in hover:border-teal-500/50 transition-colors stagger-enter"
                         style={{ animationDelay: `${50 + (idx * 100)}ms` }}
                       >
                         <img
                           src={shot} 
                           alt={`Screenshot ${idx + 1}`}
                           loading="lazy"
                           className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/shot:opacity-100 group-hover/shot:scale-110 transition-all duration-500"
                         />
                         <div className="absolute inset-0 bg-black/20 group-hover/shot:bg-transparent transition-colors" />
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/shot:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                            <div className="bg-black/60 p-1.5 rounded-full backdrop-blur-md">
                               <Maximize2 size={14} className="text-white" />
                            </div>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Zap size={14} /> {t.features_label}
                  </h3>
                  <ul className="space-y-2">
                    {((lang === 'en' && selectedApp.modFeatures_en) ? selectedApp.modFeatures_en : selectedApp.modFeatures).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-slate-300 bg-white/5 p-2 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={(e) => toggleFavorite(e, selectedApp.id)}
                    className="p-3 bg-slate-800 rounded-xl border border-white/10 hover:bg-slate-700 transition-colors"
                  >
                    <Heart 
                      size={24} 
                      className={favorites.includes(selectedApp.id) ? "text-pink-500 fill-pink-500" : "text-slate-400"} 
                    />
                  </button>
                  <div className="flex-1">
                    <DownloadButton 
                        onClick={() => handleDownload(null, selectedApp.id)} 
                        loading={downloadingId === selectedApp.id} 
                        text={t.download_btn}
                    />
                  </div>
              </div>

              <p className="mt-4 text-[10px] text-slate-600 flex items-center justify-center gap-1">
                <ShieldCheck size={10} /> Verificado por Play Protect. Libre de virus.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 🖼️ VISOR FULL SCREEN (LIGHTBOX) */}
      {selectedApp && currentScreenshotIndex !== null && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
           
           <button 
             onClick={() => setCurrentScreenshotIndex(null)}
             className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-50"
           >
             <X size={28} />
           </button>

           <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10">
             <img 
               src={(selectedApp.screenshots || [selectedApp.image, selectedApp.image, selectedApp.image])[currentScreenshotIndex]}
               alt="Full Screenshot"
               className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 select-none"
             />
           </div>

           <div className="absolute bottom-8 left-0 w-full flex items-center justify-center gap-8 pointer-events-none">
             
             <button 
               disabled={currentScreenshotIndex === 0}
               onClick={(e) => {
                 e.stopPropagation();
                 setCurrentScreenshotIndex((prev) => (prev > 0 ? prev - 1 : 0)); 
               }}
               className={`pointer-events-auto p-3 bg-white/10 hover:bg-teal-500 rounded-full text-white transition-all duration-300 backdrop-blur-md active:scale-95 ${
                 currentScreenshotIndex > 0 
                   ? "opacity-100 translate-y-0 cursor-pointer" 
                   : "opacity-0 translate-y-4 pointer-events-none cursor-default"
               }`}
             >
               <ChevronLeft size={32} />
             </button>
             
             <span className="text-white/50 text-sm font-mono backdrop-blur-md px-3 py-1 rounded-full bg-black/20">
               {currentScreenshotIndex + 1} / {(selectedApp.screenshots || [1, 2, 3]).length}
             </span>

             <button 
               disabled={currentScreenshotIndex >= (selectedApp.screenshots || [1, 2, 3]).length - 1}
               onClick={(e) => {
                 e.stopPropagation();
                 const totalImages = (selectedApp.screenshots || [1, 2, 3]).length;
                 setCurrentScreenshotIndex((prev) => (prev < totalImages - 1 ? prev + 1 : prev));
               }}
               className={`pointer-events-auto p-3 bg-white/10 hover:bg-teal-500 rounded-full text-white transition-all duration-300 backdrop-blur-md active:scale-95 ${
                 currentScreenshotIndex < (selectedApp.screenshots || [1, 2, 3]).length - 1 
                   ? "opacity-100 translate-y-0 cursor-pointer" 
                   : "opacity-0 translate-y-4 pointer-events-none cursor-default"
               }`}
             >
               <ChevronRight size={32} />
             </button>
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