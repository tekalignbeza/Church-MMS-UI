# Church MMS Frontend

## Build & Run

```bash
# Install dependencies
npm install

# Dev server (http://localhost:4200)
npm start

# Production build
npm run build:prod

# Run all unit tests
npm test

# Run tests in CI mode (headless, no watch)
npm run test:ci

# Lint
npm run lint

# Lint with auto-fix
npm run lint:fix
```

## Architecture

Angular 16 SPA using Angular Material for UI. Communicates with a Spring Boot backend REST API.

### Module Structure (`src/app/`)

- **`dashboard/`** — Home/landing page after login
- **`member/`** — Member and family management (list, details, ID cards)
- **`meeting/`** — Meeting scheduling, details, live attendance tracking (QR/barcode scanner via `@zxing/ngx-scanner`)
- **`payment/`** — Payment listing and management
- **`miscellaneous/`** — Settings, payment uploads, vendor management, type management
- **`auth/`** — Login component
- **`guards/`** — `AuthGuard` protects all routes except `/login`
- **`interceptors/`** — `JwtInterceptor` attaches JWT token to all API requests
- **`back-service/`** — All HTTP services and data models
  - `member-service.service.ts`, `meeting-service.service.ts`, `payment-service.service.ts`, `setting-service.service.ts`
  - `model/` — TypeScript interfaces mirroring backend DTOs

### Key Conventions

- **API base URL** configured in `src/environments/environment.ts` (dev) and `environment.prod.ts` (prod). Currently points to `https://tekesoft.azurewebsites.net`.
- **All routes** are eagerly loaded (no lazy loading). Routes defined in `app-routing.module.ts`.
- **Angular Material** is the UI component library — all material modules imported via `material.module.ts`.
- **Service pattern**: one service per backend domain (member, meeting, payment, setting). Services live in `back-service/`.
- **Models** in `back-service/model/` are TypeScript interfaces matching the backend DTOs exactly.
- **Auth flow**: JWT token stored client-side, attached via `JwtInterceptor`, routes guarded by `AuthGuard`.
- **PWA support** configured via `ngsw-config.json` and `@angular/service-worker`.
- Component prefix: `app` (configured in `angular.json`).

### Deployment

Frontend is deployed as an Azure Static Web App (`src/staticwebapp.config.json` for routing config).
