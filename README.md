# 🚀 Apollo Panel - Insurance System Management

<div align="center">

![Apollo Logo](src/assets/images/logo/logo.webp)

**We are Apollo, we help you to have a better insurance system management.**

[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![HeroUI](https://img.shields.io/badge/HeroUI-2.7.8-000000?style=for-the-badge)](https://heroui.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.16-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)

</div>

---

## 📋 Table of Contents

- [🚀 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔧 Development](#-development)
- [🏗️ Architecture](#️-architecture)
- [🌐 Internationalization](#-internationalization)
- [🎨 UI/UX Features](#-uiux-features)
- [📱 Responsive Design](#-responsive-design)
- [🔒 Authentication & Security](#-authentication--security)
- [📊 Expert Requests Management](#-expert-requests-management)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Overview

Apollo Panel is a modern, comprehensive insurance system management platform built with cutting-edge web technologies. It provides a robust solution for managing expert requests, vehicle inspections, and insurance workflows with a focus on user experience and system efficiency.

### 🎯 Key Objectives

- **Streamlined Insurance Management**: Centralized platform for all insurance-related operations
- **Expert Request Processing**: Efficient handling of inspection requests and expert evaluations
- **Multi-language Support**: Full RTL support for Persian/Farsi with internationalization
- **Modern UI/UX**: Beautiful, responsive interface built with HeroUI and Tailwind CSS
- **Real-time Updates**: Dynamic content updates and real-time notifications
- **Scalable Architecture**: Built for growth and enterprise-level usage

---

## ✨ Features

### 🔐 Authentication & User Management
- **Multi-step Authentication**: Login, signup, password reset, and email confirmation
- **Role-based Access Control**: Different access levels for users and administrators
- **Session Management**: Secure cookie-based authentication with automatic session handling
- **Social Login Integration**: Google OAuth support (ready for implementation)

### 📋 Expert Requests Management
- **Request Lifecycle**: Complete workflow from draft to completion
- **Status Tracking**: Real-time status updates with visual indicators
- **File Management**: Upload and manage inspection documents and images
- **Template System**: Dynamic form templates for different inspection types
- **Vehicle Information**: Comprehensive vehicle data management (VIN, license plates, etc.)

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with HeroUI components
- **Dark/Light Theme**: Theme switching capability (light theme by default)
- **RTL Support**: Full right-to-left layout support for Persian language
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Loading States**: Smooth loading animations and skeleton screens

### 🌐 Internationalization
- **Multi-language**: Persian (Farsi) and English support
- **Localized Content**: Date formats, numbers, and text direction
- **Dynamic Translations**: Context-aware translation system

### 📊 Data Management
- **State Management**: Zustand for global state management
- **API Integration**: Axios-based HTTP client with interceptors
- **Data Caching**: React Query for efficient data fetching and caching
- **Form Handling**: React Hook Form with Yup validation

---

## 🛠️ Tech Stack

### Frontend Framework
- **[React 18.3.1](https://reactjs.org/)** - Modern React with hooks and concurrent features
- **[TypeScript 5.6.3](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[Vite 5.4.19](https://vitejs.dev/)** - Lightning-fast build tool and dev server

### UI Components & Styling
- **[HeroUI 2.7.8](https://heroui.com/)** - Modern React component library
- **[Tailwind CSS 3.4.16](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 11.15.0](https://www.framer.com/motion/)** - Animation library
- **[Tailwind Variants 0.3.0](https://tailwind-variants.org/)** - Type-safe component variants

### State Management & Data
- **[Zustand 5.0.3](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[TanStack React Query 5.67.2](https://tanstack.com/query)** - Data fetching and caching
- **[React Hook Form 7.54.2](https://react-hook-form.com/)** - Performant forms with validation
- **[Yup 1.6.1](https://github.com/jquense/yup)** - Schema validation

### Routing & Navigation
- **[React Router 6.23.0](https://reactrouter.com/)** - Declarative routing for React
- **[React Router DOM 6.23.0](https://reactrouter.com/)** - DOM bindings for React Router

### Internationalization
- **[i18next 24.2.2](https://www.i18next.com/)** - Internationalization framework
- **[React i18next 15.4.1](https://react.i18next.com/)** - React bindings for i18next

### Utilities & Helpers
- **[Axios 1.8.2](https://axios-http.com/)** - HTTP client
- **[React Cookie 7.2.2](https://github.com/reactivestack/cookies)** - Cookie management
- **[UUID 11.1.0](https://github.com/uuidjs/uuid)** - Unique identifier generation
- **[XLSX 0.18.5](https://github.com/SheetJS/sheetjs)** - Excel file handling
- **[Jalaali JS 1.2.8](https://github.com/jalaali/jalaali-js)** - Persian calendar support

### Development Tools
- **[ESLint 8.57.0](https://eslint.org/)** - Code linting and formatting
- **[Prettier 3.3.3](https://prettier.io/)** - Code formatter
- **[TypeScript ESLint 8.11.0](https://typescript-eslint.io/)** - TypeScript-specific linting

---

## 📁 Project Structure

```
apollo-panel-1/
├── 📁 src/
│   ├── 📁 apis/                    # API service layer
│   │   ├── auth.ts                 # Authentication API
│   │   ├── core.tsx                # Core API utilities
│   │   ├── expert-requests.ts      # Expert requests API
│   │   ├── files.ts                # File upload API
│   │   └── ...                     # Other API modules
│   │
│   ├── 📁 components/              # Reusable UI components
│   │   ├── 📁 auth/                # Authentication components
│   │   ├── 📁 expert-requests/     # Expert request components
│   │   ├── 📁 layouts/             # Layout components
│   │   └── 📁 shared/              # Shared/common components
│   │
│   ├── 📁 config/                  # Configuration files
│   │   └── app-config.ts           # App configuration
│   │
│   ├── 📁 contexts/                # React contexts
│   │   └── breadcrumbContext.tsx   # Breadcrumb context
│   │
│   ├── 📁 hooks/                   # Custom React hooks
│   │   ├── useBreakpoint.tsx       # Responsive breakpoint hook
│   │   ├── useLocalizedDigits.tsx  # Localized digits hook
│   │   └── use-template-fields.tsx # Template fields hook
│   │
│   ├── 📁 layouts/                 # Page layouts
│   │   ├── auth.tsx                # Authentication layout
│   │   ├── default.tsx             # Default layout
│   │   └── empty.tsx               # Empty layout
│   │
│   ├── 📁 pages/                   # Page components
│   │   ├── dashboard.tsx           # Dashboard page
│   │   ├── expert-requests.tsx     # Expert requests page
│   │   ├── login.tsx               # Login page
│   │   └── ...                     # Other pages
│   │
│   ├── 📁 routes/                  # Routing configuration
│   │   ├── config.tsx              # Route definitions
│   │   └── RouterProvider.tsx      # Router provider
│   │
│   ├── 📁 stores/                  # State management
│   │   └── auth-store.tsx          # Authentication store
│   │
│   ├── 📁 styles/                  # Global styles
│   │   ├── globals.css             # Global CSS
│   │   └── slider.css              # Slider styles
│   │
│   ├── 📁 translations/            # Internationalization
│   │   ├── 📁 en/                  # English translations
│   │   └── 📁 fa/                  # Persian translations
│   │
│   ├── 📁 types/                   # TypeScript type definitions
│   │   ├── api.ts                  # API types
│   │   ├── auth.ts                 # Authentication types
│   │   ├── expert-requests.ts      # Expert request types
│   │   └── ...                     # Other type definitions
│   │
│   ├── 📁 utils/                   # Utility functions
│   │   ├── base.ts                 # Base utilities
│   │   ├── excel.ts                # Excel utilities
│   │   ├── toast.tsx               # Toast notifications
│   │   └── validations.ts          # Validation utilities
│   │
│   ├── 📁 assets/                  # Static assets
│   │   ├── 📁 fonts/               # Custom fonts
│   │   └── 📁 images/              # Images and icons
│   │
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # App entry point
│   └── provider.tsx                # App providers
│
├── 📁 public/                      # Public assets
├── 📁 .github/                     # GitHub workflows
├── 📄 package.json                 # Dependencies and scripts
├── 📄 vite.config.ts               # Vite configuration
├── 📄 tailwind.config.js           # Tailwind CSS configuration
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 docker-compose.yml           # Docker configuration
└── 📄 README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (Recommended: Latest LTS version)
- **npm** 8+ or **yarn** 1.22+ or **pnpm** 8+
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/apollo-panel-1.git
   cd apollo-panel-1
   ```

2. **Install dependencies**
   ```bash
   # Using npm (recommended)
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   VITE_APP_API_SERVER=localhost:8000
   VITE_APP_AUTHENTICATION_API_SERVER=localhost:8080
   VITE_APP_FILE_SERVER=localhost:8080
   VITE_APP_STATIC_SERVER=localhost:8080
   
   # SSL Configuration
   VITE_APP_SSL=false
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint with auto-fix |

---

## 🔧 Development

### Code Style & Linting

The project uses ESLint and Prettier for code quality:

```bash
# Run linting
npm run lint

# Format code with Prettier
npx prettier --write src/
```

### TypeScript

The project is fully typed with TypeScript. Key type definitions:

- **API Types**: `src/types/api.ts`
- **Authentication**: `src/types/auth.ts`
- **Expert Requests**: `src/types/expert-requests.ts`
- **Common Types**: `src/types/common.ts`

### Component Development

Follow these guidelines for component development:

1. **Use TypeScript** for all components
2. **Follow naming conventions**: PascalCase for components, camelCase for functions
3. **Implement proper prop types** with TypeScript interfaces
4. **Use HeroUI components** when possible for consistency
5. **Add proper JSDoc comments** for complex components

### State Management

The project uses **Zustand** for global state management:

```typescript
// Example store usage
import useAuthStore from '@/stores/auth-store';

const { auth, setAuth } = useAuthStore();
```

---

## 🏗️ Architecture

### Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
├─────────────────────────────────────────────────────────────┤
│  Components (React) │ Pages │ Layouts │ Shared Components   │
├─────────────────────────────────────────────────────────────┤
│                    Business Logic Layer                     │
├─────────────────────────────────────────────────────────────┤
│  Hooks │ Contexts │ Stores (Zustand) │ Custom Logic        │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer                               │
├─────────────────────────────────────────────────────────────┤
│  API Services │ React Query │ HTTP Client (Axios)          │
├─────────────────────────────────────────────────────────────┤
│                    External Services                        │
├─────────────────────────────────────────────────────────────┤
│  Authentication API │ File Server │ Static Server          │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Patterns

1. **Component-Based Architecture**: Modular, reusable components
2. **Separation of Concerns**: Clear separation between UI, logic, and data
3. **Type Safety**: Full TypeScript implementation
4. **State Management**: Centralized state with Zustand
5. **API Abstraction**: Clean API service layer
6. **Routing**: Declarative routing with React Router

---

## 🌐 Internationalization

The application supports multiple languages with full RTL support:

### Supported Languages
- **Persian (Farsi)** - Primary language with RTL support
- **English** - Secondary language

### Translation Structure
```
src/translations/
├── fa/                    # Persian translations
│   ├── auth.ts           # Authentication texts
│   ├── expert-requests.ts # Expert request texts
│   ├── shared.ts         # Shared/common texts
│   └── index.ts          # Main translation file
└── en/                    # English translations
    ├── auth.ts
    ├── expert-requests.ts
    ├── shared.ts
    └── index.ts
```

### Usage Example
```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
const title = t('title.dashboard');
```

---

## 🎨 UI/UX Features

### Design System
- **HeroUI Components**: Modern, accessible component library
- **Tailwind CSS**: Utility-first styling approach
- **Custom Theme**: Branded color scheme and typography
- **Responsive Design**: Mobile-first responsive approach

### Key UI Components
- **Navigation**: Sidebar navigation with breadcrumbs
- **Tables**: Sortable, filterable data tables
- **Forms**: Validated forms with error handling
- **Modals**: Overlay dialogs and confirmations
- **Loading States**: Skeleton screens and spinners
- **Notifications**: Toast messages and alerts

### Accessibility
- **ARIA Labels**: Proper accessibility attributes
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Screen reader friendly
- **Color Contrast**: WCAG compliant color contrast

---

## 📱 Responsive Design

The application is built with a mobile-first approach:

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Responsive Features
- **Adaptive Layouts**: Different layouts for different screen sizes
- **Touch-Friendly**: Optimized for touch interactions
- **Flexible Grids**: Responsive grid systems
- **Mobile Navigation**: Collapsible sidebar for mobile

---

## 🔒 Authentication & Security

### Authentication Flow
1. **Login/Signup**: Multi-step authentication process
2. **Session Management**: Secure cookie-based sessions
3. **Route Protection**: Guarded routes for authenticated users
4. **Token Management**: Automatic token refresh and validation

### Security Features
- **HTTPS Support**: Configurable SSL/TLS
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Cross-site request forgery protection

---

## 📊 Expert Requests Management

### Request Lifecycle
```
DRAFT → PENDING → OPENED → IN_PROGRESS → COMPLETED → REVIEWED → ACCEPTED/REJECTED
```

### Key Features
- **Request Creation**: Multi-step request creation wizard
- **Status Tracking**: Real-time status updates
- **File Management**: Document and image uploads
- **Template System**: Dynamic form templates
- **Vehicle Data**: Comprehensive vehicle information management
- **Notifications**: Email and SMS notifications

### Request Types
- **Vehicle Inspection**: Pre-insurance body inspections
- **Property Inspection**: Property damage assessments
- **Personal Inspection**: Personal injury evaluations
- **Commercial Inspection**: Commercial property assessments

---

## 🚀 Deployment

### Production Build
```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

### Docker Deployment
```bash
# Build Docker image
docker build -t apollo-panel .

# Run with Docker Compose
docker-compose up -d
```

### Environment Variables
Configure the following environment variables for production:

```env
# Production API endpoints
VITE_APP_API_SERVER=api.yourdomain.com
VITE_APP_AUTHENTICATION_API_SERVER=auth.yourdomain.com
VITE_APP_FILE_SERVER=files.yourdomain.com
VITE_APP_STATIC_SERVER=static.yourdomain.com

# Enable SSL
VITE_APP_SSL=true
```

### Deployment Platforms
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **AWS S3 + CloudFront**: Scalable static hosting
- **Docker**: Containerized deployment

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

### Pull Request Guidelines
- Provide a clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update relevant documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **HeroUI Team** for the amazing component library
- **Vite Team** for the lightning-fast build tool
- **React Team** for the incredible framework
- **Tailwind CSS Team** for the utility-first CSS framework

---

<div align="center">

**Made with ❤️ by the Apollo Team**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)

</div>
