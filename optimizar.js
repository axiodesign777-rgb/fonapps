import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// --- 🕵️‍♂️ MODO DIAGNÓSTICO (VERSIÓN MODERNA) ---
// En proyectos modernos (ESM), usamos process.cwd() para saber dónde estamos
const CWD = process.cwd(); 
console.log(`📍 Estoy trabajando en: ${CWD}`);

// Rutas absolutas para evitar confusiones
const INPUT_FOLDER = path.join(CWD, 'capturas_raw');
const OUTPUT_FULL = path.join(CWD, 'public', 'screenshots');
const OUTPUT_THUMBS = path.join(CWD, 'public', 'screenshots', 'gallery_thumbs');

console.log(`🔎 Buscando imágenes en: ${INPUT_FOLDER}`);

// 1. Verificar y crear carpetas de destino si no existen
if (!fs.existsSync(OUTPUT_FULL)) {
    console.log('🔨 Creando carpeta de destino: public/screenshots');
    fs.mkdirSync(OUTPUT_FULL, { recursive: true });
}
if (!fs.existsSync(OUTPUT_THUMBS)) {
    console.log('🔨 Creando carpeta de destino: gallery_thumbs');
    fs.mkdirSync(OUTPUT_THUMBS, { recursive: true });
}

async function procesarImagenes() {
  try {
    // 2. Verificar si existe la carpeta de origen
    if (!fs.existsSync(INPUT_FOLDER)) {
      console.error('\n❌ ERROR CRÍTICO: No encuentro la carpeta "capturas_raw"');
      console.error(`👉 Por favor, crea una carpeta llamada "capturas_raw" junto al archivo package.json`);
      return;
    }

    const files = fs.readdirSync(INPUT_FOLDER);
    
    // 3. Verificar si la carpeta está vacía
    if (files.length === 0) {
      console.error('\n⚠️ LA CARPETA ESTÁ VACÍA.');
      console.error('👉 Mete tus fotos (.png, .jpg) dentro de "capturas_raw" y vuelve a intentar.');
      return;
    }

    let count = 0;
    console.log(`\n🚀 Encontré ${files.length} archivos. Iniciando optimización...`);

    for (const file of files) {
      // Filtro para aceptar solo imágenes
      if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
        const inputPath = path.join(INPUT_FOLDER, file);
        const nameWithoutExt = path.parse(file).name;
        const outputName = nameWithoutExt + '.webp';

        console.log(`   📸 Procesando: ${file}...`);

        // A. Generar FULL (HD Ligera - 720px)
        await sharp(inputPath)
          .resize({ width: 720, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(path.join(OUTPUT_FULL, outputName));

        // B. Generar THUMB (Miniatura Cuadrada - 250px)
        await sharp(inputPath)
          .resize({ width: 250, height: 250, fit: 'cover' })
          .webp({ quality: 75 })
          .toFile(path.join(OUTPUT_THUMBS, outputName));

        count++;
      }
    }

    console.log(`\n✅ ¡ÉXITO TOTAL! Se crearon ${count} pares de imágenes.`);
    console.log(`📂 Imágenes HD en: public/screenshots`);
    console.log(`📂 Miniaturas en: public/screenshots/gallery_thumbs`);

  } catch (error) {
    console.error('\n❌ OCURRIÓ UN ERROR TÉCNICO:', error);
  }
}

procesarImagenes();