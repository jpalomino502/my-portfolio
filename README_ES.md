# Portafolio de Joseph

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

Una aplicación de portafolio moderna y de doble trayectoria construida con las últimas tecnologías web. Este proyecto muestra una dicotomía única entre una persona **Creativa/Artística** y un perfil **Profesional/Corporativo**, permitiendo a los usuarios explorar diferentes facetas de mi trabajo y habilidades.

## 🌟 Características

- **Experiencia Dual**: Una página de inicio que se divide en dos caminos distintos:
  - **Experimental y Artístico**: Una muestra creativa con interacciones únicas y estilo visual.
  - **Formal y Corporativo**: Una presentación limpia y profesional de habilidades, experiencia y proyectos.
- **Internacionalización (i18n)**: Soporte totalmente localizado para múltiples idiomas (Inglés/Español) usando `next-intl`.
- **UI/UX Moderna**:
  - **Desplazamiento Suave**: Integración de `lenis` para experiencias de desplazamiento fluidas.
  - **Animaciones**: Impulsadas por transiciones CSS y React.
  - **Diseño Responsivo**: Enfoque mobile-first usando Tailwind CSS v4.
- **Stack Tecnológico**: Construido a la vanguardia con Next.js 16 (App Router) y React 19.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Librería**: [React 19](https://react.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Internacionalización**: [next-intl](https://next-intl-docs.vercel.app/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Desplazamiento Suave**: [Lenis](https://github.com/darkroomengineering/lenis)

## 📂 Estructura del Proyecto

El proyecto sigue una estructura estándar de Next.js App Router, organizada para separar los aspectos "Creativos" y "Profesionales":

```
joseph/
├── app/
│   ├── [locale]/            # Rutas localizadas (ej., /en, /es)
│   │   ├── page.tsx         # 🎨 Página de Inicio Creativa (Entrada Principal)
│   │   ├── hr/
│   │   │   └── page.tsx     # 💼 Página Profesional/Corporativa
│   │   ├── layout.tsx       # Layout raíz con proveedor i18n
│   │   └── ...
│   ├── api/                 # Rutas API
│   └── not-found.tsx        # Página 404
├── src/
│   ├── components/          # Componentes UI reutilizables
│   │   ├── home/            # 🎨 Componentes para la Página Creativa
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   └── ...
│   │   ├── hr/              # 💼 Componentes para la Página Profesional
│   │   │   ├── Hero.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── ...
│   │   ├── layout/          # Componentes de layout compartidos (Header, Footer)
│   │   └── ui/              # Elementos UI genéricos (Botones, Tarjetas, etc.)
│   ├── i18n/                # Configuración de i18n
│   ├── messages/            # 🌍 Archivos JSON de traducción
│   │   ├── en.json          # Traducciones en Inglés
│   │   └── es.json          # Traducciones en Español
│   └── navigation.ts        # Configuración de navegación
├── public/                  # Activos estáticos (imágenes, fuentes)
└── ...
```

## 📝 Cómo Modificar

### 1. Editando Contenido (Texto y Traducciones)
Todo el contenido de texto se gestiona a través de `next-intl` en el directorio `src/messages/`.
- **Para cambiar texto**: Abre `src/messages/en.json` (para Inglés) o `src/messages/es.json` (para Español) y busca la clave relevante.
- **Estructura**: Las claves están anidadas por componente o página (ej., `Home.Hero.title`, `HR.Experience.role`).

### 2. Estilos
El proyecto utiliza **Tailwind CSS v4**.
- **Estilos Globales**: Definidos en `app/globals.css`.
- **Estilos de Componentes**: Aplicados directamente a través de props `className` en los archivos de componentes.
- **Configuración del Tema**: Tailwind v4 usa variables CSS para la configuración, que se encuentran en `app/globals.css`.

### 3. Agregando/Modificando Páginas
- **Página Creativa**: Edita `app/[locale]/page.tsx` y sus componentes en `src/components/home/`.
- **Página Profesional**: Edita `app/[locale]/hr/page.tsx` y sus componentes en `src/components/hr/`.
- **Nueva Página**: Crea una nueva carpeta en `app/[locale]/` (ej., `app/[locale]/blog/page.tsx`).

### 4. Componentes
- **Nuevos Componentes**: Agrégalos a `src/components/`. Si es específico de una funcionalidad, ponlo en una subcarpeta (ej., `src/components/blog/`).
- **UI Reutilizable**: Revisa `src/components/ui/` para ver componentes base existentes antes de crear nuevos.

## 🚀 Empezando

Para obtener una copia local y ponerla en funcionamiento, sigue estos sencillos pasos.

### Prerrequisitos

- Node.js 18.17 o superior
- npm, yarn, o pnpm

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jpalomino502/my-portfolio.git
   cd joseph
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

4. **Abrir tu navegador**
   Navega a [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---

Construido con ❤️ por Joseph Palomino
