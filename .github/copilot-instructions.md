This project is the frontend that offers the UI for all the endspoints and resources of the api :

this is the api :
# Library Print API

Book print-ordering platform — RESTful API + real-time notifications.

**Stack:** Node.js ≥ 22.12 · Express 5 · TypeScript 7 (strict) · PostgreSQL · Prisma ORM 7 (driver adapter `@prisma/adapter-pg`) · Zod 4 · JWT (access) + opaque refresh tokens · PostgreSQL full-text search (`tsvector`)

## Quick start

```bash
cp .env.example .env          # then edit DATABASE_URL and JWT_SECRET
npm install                   # also runs `prisma generate` (postinstall)
npm run prisma:migrate -- --name init
# Full-text search columns (one-time, see prisma/sql/001_search_vectors.sql for the exact flow):
#   npx prisma migrate dev --create-only --name search_vectors
#   → paste prisma/sql/001_search_vectors.sql into the generated migration, then:
#   npx prisma migrate dev
npm run db:seed               # first admin + default plans
npm run dev
```

Health check: `GET http://localhost:3000/health`

> **Prisma version note:** the project is pinned to Prisma ORM **7** (`^7.10.0`).
> Prisma ORM 8 uses a different tool that does not read `schema.prisma`, so do **not** run
> `npm i prisma@latest` here. Use `npx prisma@7 …` for one-off commands outside npm scripts.

## Architecture — vertical slices

Each feature is a self-contained slice with its own layers. Slices only depend on `shared/`,
never on each other, and are mounted independently in `src/routes/v1.router.ts`.

```
src/
├── app.ts / server.ts          # Express app + HTTP server (Socket.io attaches here)
├── config/env.ts               # Zod-validated environment
├── types/                      # Express Request augmentation, API envelope types
├── routes/v1.router.ts         # feature registry → /api/v1
├── generated/prisma/           # Prisma client (generated, git-ignored)
├── shared/                     # cross-cutting core
│   ├── auth/                   # JWT → DB-verified AuthContext (HTTP + sockets)
│   ├── rbac/permissions.ts     # roles → permissions
│   ├── middlewares/            # authenticate, authorize, error handler
│   ├── errors/                 # AppError + NotFound/Unauthorized/Validation/...
│   ├── pagination/             # cursor pagination + sorting helpers
│   ├── domain/                 # shared business rules (active subscription)
│   ├── security/               # jwt, password hashing
│   └── validation/             # parseInput (Zod)
└── features/<feature>/
    ├── <feature>.entity.ts     # domain types
    ├── <feature>.dto.ts        # input schemas + output presenters
    ├── <feature>.repository.ts # ALL Prisma queries (interface + implementation)
    ├── <feature>.service.ts    # business logic / state transitions
    ├── <feature>.controller.ts # HTTP only
    ├── <feature>.routes.ts     # routes + middleware
    └── index.ts                # composition root → FeatureModule
```

## Response format

```jsonc
// success
{ "success": true, "data": { ... } }
// list
{ "success": true, "data": [ ... ], "pageInfo": { "limit": 20, "hasNextPage": true, "nextCursor": 42 } }
// error
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [{ "path": "username", "message": "..." }] } }
```

List endpoints accept `?cursor=<id>&limit=<1-100>&sortBy=<field>&sortOrder=asc|desc` plus feature-specific filters.

## Design decisions

- **Coordinates:** `Library.coords Float[]` was replaced by `latitude` + `longitude` columns with a composite index.
  Prisma cannot range-filter elements of a scalar list, so the bounding-box query would otherwise need raw SQL and could not use an index.
- **Inactive libraries:** a library signs up with a `planId`; a pending subscription is created. It can log in
  and call `/auth/me`, `GET /plans` and subscription-request routes, but every other route returns
  `403 LIBRARY_SUBSCRIPTION_INACTIVE` and it is hidden from all user-facing lists until an admin activates it.
- **JWT payload** `{ id, accountId, role, status }` is never trusted alone: every request reloads the account and
  rejects banned/suspended/deleted accounts immediately, even with a valid token.

## Security model (applies to every slice)

Two independent layers. Both must pass.

**1. Route layer — strict RBAC (`shared/middlewares/guard.ts`).** Every protected route is declared with
`guard({ roles, permissions | anyOf, allowInactiveLibrary? })`. `roles` is a *required, non-empty tuple*,
so a route cannot compile without saying who may call it. The chain is:
`authenticate (JWT + DB reload) → requireRoles → authorize (permissions)`.

**2. Service layer — context / ownership (IDOR prevention).**
- Services receive the full `AuthContext` (a discriminated union) and the actual record. Admin-only methods
  are typed `AdminAuthContext`, library-only `LibraryAuthContext`, so the compiler rejects the wrong caller.
- Owner ids (`libraryId`, `userId`, …) are **always taken from the token**, never from body/params.
  DTOs for "my" resources do not even contain an owner field (`z.strictObject` rejects unknown keys).
- List queries are **scoped** by a policy: a library's `libraryId` filter is forced to its own id;
  asking for another library's id returns `403 RESOURCE_FORBIDDEN`.
- Reading or mutating someone else's record by id returns **`404`** (not 403), so ids cannot be probed.
- State changes use **conditional writes** (`updateMany where status = …`) or SERIALIZABLE transactions,
  so two concurrent requests cannot both succeed.

## Progress

| Slice | Status |
|---|---|
| Foundation (config, errors, RBAC, pagination, schema) | ✅ |
| Auth (`/auth/*`) | ✅ |
| Plans (`/plans`) | ✅ |
| Subscriptions (`/subscriptions`) | ✅ |
| Accounts / banning (`/accounts`) | ✅ |
| Libraries (`/libraries/*`) | ✅ |
| Schema evolution (print options, price snapshot, rating cache, search) | ✅ |
| Access + refresh tokens (`/auth/refresh`, `/auth/logout`) | ✅ |
| Audit log (`/audit-logs`) | ✅ |
| Files (Supabase upload URL + verify lifecycle) | ✅ |
| Books (admin CRUD, public reads, role-based signed URLs) | ✅ |
| Orders (state machine + price snapshot) | ✅ |
| Ratings (RECEIVED-gated, derived averages) | ✅ |
| Tests (Jest + Supertest) | ✅ |
| Code-isolation verification (no cross-feature imports) | ✅ |

> **Direction change (Step 5):** storage moved to **Supabase Storage** (`@supabase/supabase-js`); Prisma
> still owns the relational layer, now pointing at Supabase Postgres. Per-book **print options were
> removed** — pricing is a **flat per-library rate** (`pagePrice`/`extraFees` on `Library`). Files are
> isolated in a `files` table with a PENDING→CHECKED lifecycle.

## Auth endpoints

| Method | Path | Body |
|---|---|---|
| POST | `/api/v1/auth/signup/user` | `username, password, firstname?, lastname?` |
| POST | `/api/v1/auth/signup/library` | `+ title, location, latitude, longitude, pagePrice, extraFees, planId` |
| POST | `/api/v1/auth/login/user` · `/login/library` · `/login/admin` | `username, password` |
| GET | `/api/v1/auth/me` | — (Bearer token) |

## Plans — `/api/v1/plans`

| Method | Path | Roles | Notes |
|---|---|---|---|
| GET | `/` | ADMIN, LIBRARY* | Filters `isActive` (admin only), `name`, `minPrice`, `maxPrice`; sort `id,name,price,durationDays,createdAt`. Libraries only ever get active plans. |
| GET | `/:planId` | ADMIN, LIBRARY* | Inactive plan → 404 for libraries |
| POST | `/` | ADMIN | `name, description?, durationDays, price, isActive?` |
| PATCH | `/:planId` | ADMIN | Partial; existing subscriptions keep their duration snapshot |
| DELETE | `/:planId` | ADMIN | `409 PLAN_IN_USE` if subscriptions reference it → deactivate instead |

## Subscriptions — `/api/v1/subscriptions`

Derived status: `PENDING` → `SCHEDULED` (renewal waiting for current period to end) → `ACTIVE` → `EXPIRED`.

| Method | Path | Roles | Notes |
|---|---|---|---|
| GET | `/` | ADMIN, LIBRARY* | Filters `status, planId, libraryId` (libraryId: admin only); sort `id,requestedAt,activatedAt,expiresAt` |
| GET | `/:subscriptionId` | ADMIN, LIBRARY* | Library: own only, otherwise 404 |
| POST | `/` | LIBRARY* | `{ planId }` — for the caller's own library; one pending request at a time |
| DELETE | `/:subscriptionId` | LIBRARY* | Withdraw own **pending** request |
| PATCH | `/:subscriptionId/activate` | ADMIN | Starts now, or when the current active period ends (stacking) |
| PATCH | `/:subscriptionId/reject` | ADMIN | Removes a pending request |

## Accounts — `/api/v1/accounts` (ADMIN only)

| Method | Path | Notes |
|---|---|---|
| GET | `/` | Filters `role, status, username`; sort `id,createdAt,username` |
| GET | `/:accountId` | |
| PATCH | `/:accountId/ban` | USER / LIBRARY only; never admins or yourself. Effective immediately on the next request. |
| PATCH | `/:accountId/unban` | Only from `BANNED` |

\* `LIBRARY*` = allowed even before the library's subscription is active.

## Libraries — `/api/v1/libraries`

Visibility rule (enforced in `libraries.policy.ts` + `shared/domain/subscription.rules.ts`):
a library is **visible** only when its account is `ACTIVE` **and** it has an active subscription.
USERs only ever see visible libraries; a LIBRARY always sees/edits its own; ADMIN sees all.

| Method | Path | Roles | Notes |
|---|---|---|---|
| GET | `/me` | LIBRARY* | Own profile |
| PATCH | `/me` | LIBRARY* | `title?, location?, latitude?, longitude?, pagePrice?, extraFees?` — own only |
| GET | `/list` | USER, ADMIN, LIBRARY | Paginated active libraries. Filters `title`, `maxPagePrice`; sort `id,title,pagePrice,extraFees`. `includeHidden=true` honoured for ADMIN only |
| GET | `/map` | USER, ADMIN, LIBRARY | Bounding-box markers — see below |
| GET | `/:libraryId` | USER, ADMIN, LIBRARY | Non-visible/other id → 404 (no probing) |

### `GET /libraries/map`

Query: `minLat, maxLat, minLng, maxLng` (degrees; each `min <= max`).

- **No rejection for big boxes.** If a span exceeds `MAP_MAX_LAT_SPAN` / `MAP_MAX_LNG_SPAN`, it is
  **clamped** to that maximum, centred on the requested box (and shifted inside world bounds). The
  response echoes `effectiveBoundingBox` and `boundingBoxClamped: true`.
- **Count cap.** At most `MAP_MAX_RESULTS` markers are ever materialised (`take` at the DB level).
  `truncated: true` signals that more libraries exist in the box — the client should zoom in.
- Only visible libraries are returned; markers are minimal (`id, title, latitude, longitude`).

```jsonc
{ "success": true, "data": {
  "markers": [{ "id": 12, "title": "...", "latitude": 33.5, "longitude": 36.3 }],
  "count": 1, "truncated": false, "boundingBoxClamped": false,
  "effectiveBoundingBox": { "minLat": 33.4, "maxLat": 33.6, "minLng": 36.2, "maxLng": 36.4 }
} }
```

\* `LIBRARY*` = allowed even before the library's subscription is active.

## Tokens (two-token auth)

- **Access token** — JWT, `ACCESS_TOKEN_TTL_SECONDS` (default **15 min**). Sent as `Authorization: Bearer`.
  Every request still reloads the account from the DB, so a ban/suspend takes effect within one access-token lifetime.
- **Refresh token** — opaque random string, `REFRESH_TOKEN_TTL_SECONDS` (default **14 days**). Only its SHA-256
  hash is stored (`RefreshToken` table = single source of truth for session validity).

| Method | Path | Body | Notes |
|---|---|---|---|
| POST | `/auth/refresh` | `{ refreshToken }` | **Rotates**: old token revoked, new access+refresh returned |
| POST | `/auth/logout` | `{ refreshToken, allSessions? }` | Revokes this token (or every session). Idempotent |

Login/signup responses now include `accessToken, expiresIn, refreshToken, refreshExpiresIn, account`.
**Reuse detection:** presenting an already-rotated/revoked refresh token revokes every session of that account.

## Audit log — `/api/v1/audit-logs` (ADMIN only)

Append-only trail written by an event subscriber: slices emit domain facts, the subscriber records them —
slices stay decoupled from auditing. Covered actions: `auth.signup/login/login_failed/refresh/logout/refresh_reuse_detected`,
`account.banned/unbanned`, `plan.created/updated/deleted`, `subscription.requested/activated/rejected/cancelled`.

| Method | Path | Query |
|---|---|---|
| GET | `/` | `action, actorAccountId, targetType, targetId, from, to` + cursor pagination, `sortOrder` |

`AuditLog` has no foreign keys by design — entries must outlive the actor/target and never change.

## Printing options & price snapshot (schema)

- A `Book` can be posted with several `PrintOption` rows (color/sided/binding + price surcharges) —
  "the same book with different options". The color/sided/binding attributes are plain `String`
  columns; their allowed values live in `shared/domain/print-option.values.ts` and are enforced in
  the Zod validation layer (no DB enums), so the option vocabulary can grow without a migration.
- When an order is placed, the price is **frozen** onto the order:
  `totalPrice = pageCount × (unitPagePrice + perPageSurcharge) + flatSurcharge + libraryExtraFees`.
  Later edits to the library price or the option never change a placed order (the live values remain the
  single source of truth; the order keeps an immutable historical snapshot).
- `Book.ratingAvg/ratingCount` and `Library.ratingAvg/ratingCount` are a **derived cache** of the ratings
  rows (the single source of truth), to be recomputed inside the same transaction as each rating write.

## Files — `/api/v1/files` (ADMIN only) + Supabase Storage

Files live in a dedicated `files` table (`id, path, status[PENDING|CHECKED], mime_type, size, created_at`)
and the bytes live in a **private** Supabase Storage bucket. Lifecycle:

1. `POST /files/upload-url` → server creates a **PENDING** `files` row and returns a **pre-signed upload
   URL** (+ `fileId`, `path`, `token`).
2. Client uploads the PDF directly to Supabase Storage with that URL.
3. `POST /files/:id/verify` → server reads the object's real size + mime from storage, enforces
   **size ≤ MAX_UPLOAD_BYTES**, **mime = application/pdf**, runs a **virus scan** (mock port,
   `shared/security/virus-scan.ts`), then flips status to **CHECKED**. Any failure removes the object +
   PENDING row, so an unverified file can never be linked.

Storage is behind a port (`shared/storage/storage.port.ts`) with a Supabase adapter — feature code never
imports the SDK directly. Bucket + RLS setup: `prisma/sql/002_storage_bucket_policies.sql` (bucket is
private; all access flows through short-lived server-issued signed URLs).

## Books — `/api/v1/books`

| Method | Path | Access | Notes |
|---|---|---|---|
| GET | `/` | **Public** (optional auth) | Cursor pagination; filters `title`, `categoryId`; sort `id,title,pages,avgRating` |
| GET | `/:bookId` | **Public** (optional auth) | |
| POST | `/` | ADMIN | Body includes `fileId` (must be CHECKED, PDF, unlinked) |
| PUT | `/:bookId` | ADMIN | Edit details; optional `fileId` to **replace** the file (old file row + object removed) |
| DELETE | `/:bookId` | ADMIN | Deletes book **and** file row in one transaction, then removes the bucket object |

**CRITICAL file-URL exposure (`books.policy.ts`):** anonymous callers and normal **USERs never receive
the file path, file id, or signed URL** — they get `BookPublicView` (only `hasFile: boolean`). **ADMIN and
LIBRARY** callers get `BookPrivilegedView` with a **temporary Supabase signed URL** (TTL
`SIGNED_URL_TTL_SECONDS`). Public routes use `authenticateOptional` so the role (if any) decides exposure.

## Orders — `/api/v1`

Creation is nested under a library; commands act on `/orders/:id`.

| Method | Path | Role | Notes |
|---|---|---|---|
| POST | `/libraries/:libraryId/orders` | USER | `{ bookId }`. Library must be **active/visible**, else 404. Freezes the price snapshot |
| GET | `/orders` | USER / LIBRARY / ADMIN | Scoped: USER→own, LIBRARY→its own, ADMIN→all. Filters `status,bookId` (+`libraryId,senderId` for admin) |
| GET | `/orders/:orderId` | any (scoped) | Another party's order → 404 |
| PATCH | `/orders/:orderId/cancel` | USER | PENDING/ACCEPTED → CANCELLED |
| PATCH | `/orders/:orderId/accept` | LIBRARY | PENDING → ACCEPTED |
| PATCH | `/orders/:orderId/reject` | LIBRARY | PENDING → REJECTED |
| PATCH | `/orders/:orderId/fulfill` | LIBRARY | ACCEPTED → FULFILLED |
| PATCH | `/orders/:orderId/receive` | USER | FULFILLED → RECEIVED |

- **Price snapshot** (flat per-library rate), frozen at creation:
  `totalPrice = pageCount × snapshotPagePrice + snapshotExtraFees`. The state machine + pricing live as
  **pure functions** in `orders.entity.ts` (easy to unit-test). Illegal transitions → `409
  INVALID_STATE_TRANSITION`; concurrent transitions are guarded by conditional `updateMany`.
- Ownership is checked in `orders.policy.ts`; acting on another party's order returns **404**.
- Every command emits a domain event → recorded in the audit log.

## Ratings — `/api/v1`

| Method | Path | Role | Notes |
|---|---|---|---|
| GET | `/books/:bookId/ratings` | any (authed) | Cursor = last `userId` |
| POST | `/books/:bookId/ratings` | USER | `{ rating: 1..5 }`. Upsert |
| GET | `/libraries/:libraryId/ratings` | any (authed) | |
| POST | `/libraries/:libraryId/ratings` | USER | `{ rating: 1..5 }`. Upsert |

- **Guardrail (`ratings.policy.ts`):** a user may rate a **book** only with a `RECEIVED` order containing it,
  and a **library** only with a `RECEIVED` order from it — else `403 RATING_NOT_ALLOWED`.
- **Derived averages (SSOT):** `avg_rating`/`rating_count` on `books`/`libraries` are recomputed from the
  rating rows **inside the same transaction** as every upsert, so they can never drift.

## Testing — `npm test`

Jest (ESM) via `@swc/jest` (transpile-only, so it's independent of the TypeScript version and needs no
build step). Run after `npm install`:

```bash
npm test          # all suites
npm run test:unit # pure unit + service suites only (no app bootstrap)
```

- **`tests/unit/`** — pure domain logic, no mocks: order state machine + pricing, bounding-box clamp,
  cursor pagination, RBAC map, JWT sign/verify, password hashing, subscription-status derivation.
- **`tests/service/`** — the flagged edge cases against in-memory fake repositories/storage:
  - book file exposure (anon/USER get **no** path/id/signed URL; ADMIN gets a signed URL),
  - linking an **unverified / non-PDF / already-linked** file is refused,
  - deleting a book removes the bucket object; missing book → 404,
  - **rating without a RECEIVED order → 403**; rating recomputes the average,
  - order **IDOR → 404**, illegal state transition → 409, concurrent transition → 409, price snapshot frozen.
- **`tests/integration/`** — Supertest against the **real** Express app (auth guard, RBAC, routing, error
  handler run end-to-end; data/storage mocked via ESM module mocking): signed-URL exposure by role over
  HTTP, `401` without a token, `403` for a USER on an admin route, `404` on unknown routes.

### Code-isolation rule (verified)
Features never import another feature's internal directories — confirmed by scan. Shared logic lives in
`shared/`; simple queries (e.g. books reading the `files` table) are duplicated rather than cross-imported.

## Final enhancements (round 2)

**Realtime + notifications.** `shared/realtime/` runs Socket.io: the JWT is verified during the
**handshake**, each socket joins room `account:<accountId>`, and presence is tracked in an in-memory
`Map` keyed by account — multiple devices count as **one online account with a device count**
(`connectionCount`). `shared/notifications/` is cross-cutting (used by several features, so it lives in
`shared/`, not a feature): it persists a row in `notifications` **and** pushes it over realtime. Orders
notify the counterparty on every status change (library ↔ user). `GET /notifications`,
`/notifications/unread-count`, `POST /notifications/read-all`, `PATCH /notifications/:id/read` read/ack
the caller's own notifications.
> Rooms are keyed by `accountId` (the universal identity) so a **library** — which is not a `User` — can
> also receive order notifications. `Notification` now references `UserAccount`, not `User`.

**Book pricing on detail.** `GET /books/:bookId?libraryId=<id>` returns a `price` object
`{ libraryId, pageCount, pagePrice, extraFees, total }` (flat per-library rate). Without `libraryId`,
no price is returned (a book is priced only in the context of a library).

**Full-text search (tsvector, parameterized).** `GET /books?search=` ranks by book title;
`GET /libraries?search=` ranks visible libraries by title + location (ignores coordinates). Both use
`$queryRaw` with **bound parameters** (`websearch_to_tsquery('simple', ${term})`) — never string
interpolation. Search results are rank-ordered and offset-paginated (the `cursor` acts as an offset).

**Books list params.** `GET /books` now takes `?category=<id>` (a **single** category), `?orderBy=±field`
(`-createdAt` desc / `createdAt` asc; fields `id,title,pages,avgRating,createdAt`), plus `?search=`. The
`±field` string is parsed in `shared/pagination/order-by.ts` into a validated `{ field, direction }`, which
the repository turns into the Prisma `orderBy` object (parsing and the Prisma object kept separate).

**Categories** `/api/v1/categories` — `GET /` (any authed role), `POST /` and `DELETE /:categoryId`
(ADMIN only, `CATEGORY_MANAGE`). Fixes the earlier gap where books referenced categories that couldn't be created.

**Current user's orders & received books.** `GET /orders` already returns the caller's own orders (USER
scope); `GET /orders/received-books` lists the distinct books the user has a `RECEIVED` order for.

**Book audit.** `book.created / book.updated / book.deleted` are emitted and recorded in the audit log.

**Security / ops.**
- **Rate limiting:** `rate-limiter-flexible` (in-memory) via a reusable `rateLimit({...})` middleware;
  `authRateLimit` (10/min/IP) is applied to every `/auth/*` route.
- **`trust proxy` = false** (no Nginx) so the rate limiter keys on the **real** client IP (no X-Forwarded-For spoofing).
- **Magic-bytes validation:** file verify now checks the real `%PDF-` header, not just the reported mime.
- **Supabase RLS** stays in `prisma/sql/002_storage_bucket_policies.sql` (bucket config only; table access
  is guarded by app authz, as designed).
- **No manual subscription deactivation** — subscriptions expire automatically; documented in `TERMS.md`.
- No payment/webhook and no reports feature (out of scope by request).

### Library listings priced for a book
`GET /libraries/list?bookId=<id>` and `GET /libraries/map?bookId=<id>` include, per library, a `price`
object `{ bookId, pageCount, pagePrice, extraFees, total }` — the cost of printing that book at that
library (`total = pageCount × pagePrice + extraFees`). The book's page count is resolved once per request;
an unknown `bookId` simply omits `price`. (On the map, the rate fields are added to each marker so the
price is computable.)

completion steps : 