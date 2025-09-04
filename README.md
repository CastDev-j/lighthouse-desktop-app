# Lighthouse Desktop App

Aplicación de escritorio construida con Vite y Tauri para análisis de rendimiento web con Google Lighthouse.

## Prerrequisitos

- Node.js (v16+)
- Rust
- Git

### Dependencias del sistema

**Windows:** Instalar Visual Studio Build Tools con C++ build tools

## Instalación y ejecución

```bash
# Clonar repositorio
git clone https://github.com/CastDev-j/lighthouse-desktop-app.git
cd lighthouse-desktop-app

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run tauri dev

# Construir para producción
npm run tauri build
```

## Estructura del proyecto

```
├── src/           # Frontend
├── src-tauri/     # Backend Rust
├── public/        # Archivos públicos
└── dist/          # Build
```

Los ejecutables se generan en `src-tauri/target/release/bundle/`
