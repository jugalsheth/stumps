# 🏏 Stumps

> **A production-grade, real-time cricket tracking platform built with cutting-edge web technologies and enterprise-level architecture patterns.**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)

A high-performance, scalable cricket tracking application featuring real-time score updates, comprehensive analytics, push notifications, and a beautiful, responsive UI. Built with production-ready architecture, optimized for performance, and designed for scale.

---

## 🎯 Key Features

### Real-Time Data Processing
- **Live Score Updates**: Sub-10 second polling with intelligent caching strategies
- **WebSocket-Ready Architecture**: Prepared for real-time bidirectional communication
- **Smart Caching Layer**: Multi-tier caching (Redis → Memory → API) with automatic invalidation
- **Edge-Optimized API Routes**: Leveraging Next.js Edge Runtime for sub-100ms response times

### Advanced User Experience
- **Progressive Web App (PWA)**: Offline-first architecture with service worker implementation
- **Push Notifications**: Web Push API with VAPID key management for match alerts
- **Dark/Light Theme**: System-aware theme switching with persistent user preferences
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support

### Data Architecture
- **Type-Safe API Layer**: End-to-end TypeScript with Zod validation schemas
- **Optimistic UI Updates**: Instant feedback with background synchronization
- **Virtualized Lists**: Efficient rendering of large datasets using `@tanstack/react-virtual`
- **Intelligent Data Fetching**: React Server Components with strategic revalidation

### Performance Optimizations
- **Code Splitting**: Route-based and component-level dynamic imports
- **Image Optimization**: Next.js Image component with automatic format conversion (AVIF/WebP)
- **Bundle Analysis**: Optimized package imports for `lucide-react` and `recharts`
- **Edge Caching**: Strategic HTTP headers with stale-while-revalidate patterns

---

## 🏗️ Architecture Overview

### System Design Philosophy

This application follows **Domain-Driven Design (DDD)** principles with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  (Next.js App Router, React Server Components, UI)          │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    Application Layer                        │
│  (API Routes, Custom Hooks, State Management)              │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    Domain Layer                             │
│  (Business Logic, Type Definitions, Validation)             │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    Infrastructure Layer                     │
│  (Database, Cache, External APIs, File System)              │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Framework** | Next.js | 16.0.5 | App Router, Server Components, Edge Runtime |
| **Language** | TypeScript | 5.0 | Type safety, developer experience |
| **UI Library** | React | 19.2 | Latest concurrent features, Server Components |
| **Styling** | Tailwind CSS | 4.0 | Utility-first, JIT compilation |
| **Component Library** | shadcn/ui + Radix UI | Latest | Accessible, customizable primitives |
| **State Management** | Zustand | 5.0.8 | Lightweight, performant, TypeScript-first |
| **Database ORM** | Prisma | 7.0.1 | Type-safe queries, migrations, introspection |
| **Database** | PostgreSQL | Latest | ACID compliance, JSON support, scalability |
| **Caching** | Upstash Redis | 1.35.7 | Serverless Redis, edge-optimized |
| **Rate Limiting** | Upstash Rate Limit | 2.0.7 | Distributed rate limiting |
| **Validation** | Zod | 4.1.13 | Runtime type validation, schema inference |
| **Animations** | Framer Motion | 12.23.24 | Production-ready animations |
| **Charts** | Recharts | 3.5.0 | Composable, responsive charts |
| **Date Handling** | date-fns | 4.1.0 | Immutable, tree-shakeable |

### Project Structure

```
stumps/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication route group
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/             # Protected dashboard routes
│   │   ├── layout.tsx           # Dashboard layout with navigation
│   │   ├── page.tsx             # Dashboard home
│   │   ├── matches/             # Match-related pages
│   │   ├── teams/               # Team pages
│   │   ├── players/             # Player pages
│   │   ├── news/                # News feed
│   │   └── settings/            # User settings
│   ├── api/                      # API routes (Edge Runtime)
│   │   ├── matches/             # Match endpoints
│   │   ├── teams/               # Team endpoints
│   │   ├── players/             # Player endpoints
│   │   ├── news/                # News endpoints
│   │   └── notifications/       # Push notification endpoints
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                    # React components
│   ├── ui/                      # shadcn/ui primitives
│   ├── matches/                 # Match-specific components
│   ├── teams/                   # Team components
│   ├── players/                 # Player components
│   ├── news/                    # News components
│   └── shared/                  # Shared components
│       ├── Header.tsx           # Navigation header
│       ├── ThemeProvider.tsx   # Theme context
│       ├── ErrorBoundary.tsx   # Error handling
│       └── LoadingState.tsx    # Loading states
├── lib/                          # Core libraries
│   ├── api/                     # API clients
│   │   ├── cricket-client.ts   # Cricket API wrapper
│   │   ├── cache.ts             # Caching layer
│   │   └── types.ts            # TypeScript types
│   ├── db/                      # Database
│   │   └── prisma.ts           # Prisma client singleton
│   ├── hooks/                   # Custom React hooks
│   │   ├── useLiveScore.ts     # Live score polling
│   │   ├── useMatches.ts       # Match data fetching
│   │   ├── useNotifications.ts # Push notifications
│   │   └── useTheme.ts         # Theme management
│   ├── store/                   # Zustand stores
│   │   └── userStore.ts        # User state management
│   ├── utils/                   # Utility functions
│   │   ├── calculations.ts     # Statistical calculations
│   │   ├── constants.ts        # App constants
│   │   └── format.ts           # Data formatting
│   └── validations/             # Zod schemas
│       └── schemas.ts           # Validation schemas
├── prisma/                       # Database schema
│   └── schema.prisma           # Prisma schema definition
└── public/                       # Static assets
    └── sw.js                    # Service worker
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **PostgreSQL** 14+ (or Supabase/Neon for serverless)
- **Redis/Upstash** (optional, falls back to in-memory cache)
- **Cricket API Key** (CricAPI, RapidAPI, or custom)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/jugalsheth/stumps.git
   cd stumps
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

   Required variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/cricket_tracker"
   
   # Cricket API
   CRICKET_API_KEY="your-api-key"
   CRICKET_API_URL="https://api.cricapi.com/v1"
   
   # Redis (Optional - for production caching)
   UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="your-token"
   
   # Push Notifications
   NEXT_PUBLIC_VAPID_PUBLIC_KEY="your-public-key"
   VAPID_PRIVATE_KEY="your-private-key"
   
   # App Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
```bash
   # Generate Prisma Client
npx prisma generate
   
   # Run migrations
npx prisma migrate dev
   
   # (Optional) Seed database
   npx prisma db seed
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 95+

### Optimization Strategies

1. **Server-Side Rendering (SSR)**
   - Strategic use of React Server Components
   - Data fetching at the edge for reduced latency
   - Incremental Static Regeneration (ISR) for predictable content

2. **Caching Strategy**
   ```typescript
   // Multi-tier caching with intelligent invalidation
   Redis Cache (TTL: 60s) → Memory Cache (TTL: 30s) → API
   ```

3. **Code Splitting**
   - Route-based code splitting (automatic)
   - Component-level dynamic imports for heavy libraries
   - Lazy loading for below-the-fold content

4. **Bundle Optimization**
   - Tree shaking for unused code elimination
   - Package import optimization (`optimizePackageImports`)
   - Compression (gzip/brotli) via CDN

---

## 🔒 Security Considerations

- **Input Validation**: Zod schemas for all user inputs
- **SQL Injection Prevention**: Prisma parameterized queries
- **XSS Protection**: React's built-in escaping + Content Security Policy
- **Rate Limiting**: Upstash Rate Limit for API protection
- **Environment Variables**: Secure handling via Next.js built-in support
- **HTTPS Enforcement**: Production-ready SSL/TLS configuration

---

## 🧪 Testing Strategy

```bash
# Run type checking
npm run type-check

# Run linter
npm run lint

# Run tests (when implemented)
npm run test

# Run E2E tests (when implemented)
npm run test:e2e
```

### Testing Philosophy
- **Unit Tests**: Core business logic and utilities
- **Integration Tests**: API routes and database interactions
- **E2E Tests**: Critical user flows (Playwright)
- **Visual Regression**: Component snapshot testing

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect Repository**
```bash
   vercel init
   vercel
   ```

2. **Configure Environment Variables**
   - Add all required variables in Vercel dashboard
   - Enable automatic deployments from `main` branch

3. **Database Setup**
   - Use Vercel Postgres or external provider (Supabase, Neon)
   - Run migrations: `npx prisma migrate deploy`

### Docker Deployment

```dockerfile
# Example Dockerfile (not included, but recommended)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms
- **AWS**: Amplify, EC2 with Docker, ECS
- **DigitalOcean**: App Platform
- **Railway**: One-click deployment
- **Render**: Automatic deployments

---

## 📈 Scalability Considerations

### Current Architecture Supports:
- **Horizontal Scaling**: Stateless API routes, edge deployment
- **Database Scaling**: Connection pooling, read replicas ready
- **Cache Scaling**: Distributed Redis with Upstash
- **CDN Integration**: Static asset optimization

### Future Enhancements:
- **WebSocket Integration**: Real-time bidirectional communication
- **GraphQL API**: For complex data fetching requirements
- **Microservices Migration**: Service extraction for independent scaling
- **Event-Driven Architecture**: Message queues for async processing

---

## 🛠️ Development Guidelines

### Code Style
- **TypeScript Strict Mode**: Enabled for maximum type safety
- **ESLint**: Next.js recommended configuration
- **Prettier**: Consistent code formatting (recommended)
- **Conventional Commits**: Semantic commit messages

### Git Workflow
```bash
# Feature branch workflow
git checkout -b feature/your-feature-name
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

### Pull Request Process
1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation
4. Submit PR with clear description
5. Address review feedback
6. Merge after approval

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and patterns
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** for the incredible framework
- **Vercel** for hosting and deployment platform
- **shadcn** for the beautiful UI component library
- **Prisma** for the excellent ORM
- **Cricket API Providers** for data access

---

## 📧 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/jugalsheth/stumps/issues)
- **Discussions**: [Join the conversation](https://github.com/jugalsheth/stumps/discussions)

---

<div align="center">

**Built with ❤️ using Next.js 15, TypeScript, and modern web technologies**

[⭐ Star this repo](https://github.com/jugalsheth/stumps) if you find it helpful!

</div>
