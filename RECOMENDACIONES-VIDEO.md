# Recomendaciones de Video para Hero Section

## Implementación Actual
✅ El navbar ahora aparece después de que el video termine su primera reproducción
✅ El video se reproduce en loop después de mostrar el navbar
✅ Respaldo: si el video no tiene evento 'ended', el navbar aparece después de 5 segundos

## Dimensiones Recomendadas del Video

Para que el video encaje perfectamente sin espacios a los lados, se recomienda:

### Relación de Aspecto
- **16:9** (estándar para pantallas widescreen)
- Esta es la relación de aspecto más común y funciona bien en todos los dispositivos

### Resoluciones Recomendadas

#### Desktop/Pantallas Grandes:
- **1920x1080** (Full HD) - Ideal para la mayoría de pantallas
- **2560x1440** (2K) - Para pantallas de alta resolución
- **3840x2160** (4K) - Si quieres máxima calidad (archivo más pesado)

#### Móviles:
- **1080x1920** (Vertical) o **1920x1080** (Horizontal)
- La sección hero se adapta automáticamente

### Tamaño de Archivo
- Mantén el video optimizado para web:
  - Formato: **MP4** (H.264 codec)
  - Bitrate recomendado: **2-5 Mbps** para Full HD
  - Duración ideal: **5-15 segundos** para el primer loop

### Herramientas para Optimizar Video

1. **HandBrake** (gratis): https://handbrake.fr/
   - Comprime sin perder calidad visible
   - Permite ajustar bitrate y resolución

2. **FFmpeg** (línea de comandos):
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 128k output.mp4
   ```

3. **Online**: 
   - CloudConvert.com
   - FreeConvert.com

### Notas Importantes

- El video se muestra con `object-fit: cover` para llenar toda la sección
- La sección hero tiene:
  - Desktop: `120vh` de altura (mínimo 800px)
  - Móvil: `100vh` de altura (mínimo 600px)
- El navbar aparece después de la primera reproducción completa del video
- Si el video es muy corto o muy largo, puedes ajustar el timeout en el código (actualmente 5 segundos)

### Cómo Medir el Tamaño Perfecto

Para encontrar la dimensión exacta:
1. Abre la página en el navegador
2. Usa las herramientas de desarrollador (F12)
3. Mide la sección hero (altura visible)
4. Calcula: `ancho_pantalla x altura_hero`
5. Exporta el video a esas dimensiones exactas

Ejemplo: Si la pantalla es 1920px de ancho y la sección hero es 1080px de alto
→ Video ideal: **1920x1080** (16:9)




