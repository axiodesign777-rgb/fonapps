/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // --- ANIMACIONES PREMIUM (Modal + Menú) ---
      keyframes: {
        // A. Para el Modal (Sube desde abajo)
        'overlay-show': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'content-show': {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        
        // B. NUEVO: Para el Menú Hamburguesa (Baja desde arriba)
        'menu-slide-down': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(-20px)' // Empieza un poco arriba
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' // Termina en su sitio
          },
        },
      },
      animation: {
        // Todos unificados a 0.3s para consistencia profesional
        'overlay': 'overlay-show 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'content': 'content-show 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'menu-down': 'menu-slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1)', // <--- La nueva
      },
    },
  },
  plugins: [],
}