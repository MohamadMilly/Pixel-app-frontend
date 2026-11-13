---
applyTo: "**"
---

# Project Guidelines

## Project and architecture

- This is a React 19, TypeScript, and Vite application using React Router 7 data routers. Follow the existing `createBrowserRouter` and `RouteObject` patterns; use `react-router` imports as the project does.
- Organize API clients in `src/api/modules/<domain>/`, with request/response DTOs close to their module. Keep shared API types in `src/api/types/`.
- Expose domain clients through one typed API facade (for example, `api.authApi` and `api.libraryApi`). Keep endpoint and HTTP details inside API modules; loaders, actions, and components should use the facade rather than calling Axios directly.
- Keep route loaders in `src/loaders/` and form mutations in `src/actions/`. Compose loader dependencies in `src/loaders/index.ts` and wire loaders/actions and route error elements in `src/routes.tsx`.
- Keep route-level screens in `src/pages/`, reusable domain UI in `src/components/`, and shared primitives in `src/components/ui/`.
- Replace fake API usage with real API clients consistently; do not leave a page or action silently using mock data when its feature is wired to the backend.

## API and data handling

- Treat the supplied API specification as the source of truth for endpoint paths, HTTP methods, payloads, response envelopes, and role capabilities. Do not guess missing endpoints or DTO fields; identify the gap before implementing dependent features.
- Model API requests and responses with explicit TypeScript types. Preserve the API’s response envelope and convert data only at a clearly defined boundary.
- Configure the shared Axios instance and cross-cutting interceptors centrally. Read the API base URL from the existing Vite environment configuration; never hard-code credentials or tokens.
- Store the access token in `localStorage` under the agreed auth key and attach it as a bearer token through the centralized API client/interceptor. Never hard-code token values.
- Use loaders for route data and actions for mutations. Validate route params and submitted `FormData`, handle API failures explicitly, and return or throw meaningful results for the route UI.
- Keep authentication and authorization checks consistent across routes. Do not treat client-side role checks as a substitute for server-side authorization.
- Keep environment configuration centralized; use the existing Vite environment setup unless the project adds a dedicated typed environment module.

## Routing, authentication, and errors

- Implement sign-in, sign-up, and session operations only for flows and account types supported by the API specification.
- Use the existing account role types (`USER`, `LIBRARY`, `ADMIN`) as the basis for role checks; do not introduce alternate role strings without an API contract change.
- After login, keep the server-returned account in shared in-memory auth state. Use `account.role` from that state to decide which menus and routes to show.
- Do not cache the profile or role in `localStorage` or `sessionStorage`; the access token is stored separately as described above.
- On page reload, restore the session using the current-account endpoint or refresh flow supported by the API, then repopulate shared auth state from the server response. Do not assume an endpoint that is absent from the API specification.
- Protected routes should wait for session restoration, redirect unauthenticated users to sign-in, and redirect authenticated users without an allowed role to a forbidden page. Protect loader data as well as route elements.
- Frontend role checks control navigation and presentation only. The backend must enforce authorization on every protected API request.
- Add an appropriate `errorElement` to route branches and preserve the existing route error handling conventions. Show useful loading, empty, validation, and error states rather than hiding failures or substituting success-shaped defaults.
- After mutations, use React Router redirects or revalidation where appropriate so the UI reflects the server’s result.

## UI and conventions

- Follow existing TypeScript, component, styling, and naming patterns. Prefer focused components and typed props; avoid unnecessary casts and duplicated API or permission logic.
- Preserve the app’s existing Arabic/RTL presentation where applicable. Use semantic HTML, accessible labels, keyboard-operable controls, and responsive layouts.
- Keep secrets out of source control and browser-visible configuration. Do not expose server-only credentials through `VITE_` variables.

## Validation

- Run `npm run build` and `npm run lint` after changes when applicable.
- Add or update tests if a test setup exists; do not assume a testing framework that is not configured.
