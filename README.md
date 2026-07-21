# VetClinic Frontend

Aplicación web para la gestión de una clínica veterinaria: administración de clientes, sus mascotas y los veterinarios del centro. Proyecto final de bootcamp.

Este repositorio contiene únicamente el **frontend**. El backend (API REST) vive en un repositorio independiente, con su propia documentación: [VetClinic-Backend](https://github.com/Fer-Lia/VetClinic-Backend).

## Tecnologías

- [React](https://react.dev) 18 — librería para construir la interfaz de usuario
- [Vite](https://vite.dev) 5 — entorno de desarrollo y build tool

## Backend consumido

API REST en FastAPI + PostgreSQL, desplegada de forma independiente:

- Producción: https://vetclinic-backend-9xrw.onrender.com
- Documentación interactiva (Swagger): https://vetclinic-backend-9xrw.onrender.com/docs

## Estructura del proyecto

```
VetClinic-Frontend/
├── src/
│   ├── main.jsx                  # Punto de entrada, monta React en el DOM
│   ├── App.jsx                   # Componente raíz, define las rutas
│   ├── index.css                 # Variables globales y estilos compartidos
│   ├── components/               # Componentes reutilizables (modales, aviso, navegación)
│   ├── pages/                    # Una pantalla por ruta (Dashboard, Clientes, Mascotas, Veterinarios)
│   └── services/                 # Llamadas a la API (fetch), sin lógica de negocio en las vistas
├── index.html                    # HTML base servido por Vite
├── vite.config.js                # Configuración de Vite y sus plugins
├── package.json                  # Dependencias y scripts del proyecto
├── .env                          # Variables de entorno (no versionado)
└── .gitignore
```

## Requisitos previos

- [Node.js](https://nodejs.org) (versión 18 o superior)
- npm (incluido con Node.js)

## Instalación

```bash
git clone https://github.com/Fer-Lia/VetClinic-Frontend.git
cd VetClinic-Frontend
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con la URL del backend:

```
VITE_API_URL=https://vetclinic-backend-9xrw.onrender.com
```

## Comandos disponibles

| Comando           | Descripción                                      |
|-------------------|---------------------------------------------------|
| `npm run dev`     | Arranca el servidor de desarrollo en `localhost:5173` |
| `npm run build`   | Genera la build de producción en `dist/`          |
| `npm run preview` | Sirve localmente la build de producción           |
| `npm run lint`    | Ejecuta ESLint sobre el proyecto                  |

## Despliegue

Pendiente de definir. Candidatas habituales para un proyecto Vite + React: [Vercel](https://vercel.com) o [Netlify](https://www.netlify.com), ambas con integración directa a GitHub.

## Autora

Fer-Lia
