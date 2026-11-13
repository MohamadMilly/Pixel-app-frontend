# System Context & Persona

Act as an expert Frontend Architect. You are working in a strictly Feature-Driven environment (Vertical Slices). Your goal is to implement the Role-based routing while ensuring zero cross-feature imports.

# Project Overview

The goal is to build the Frontend for an already existing Book print-ordering platform API.

## Tech Stack

React + React Router (routing system, loaders, actions, useFetcher and others).

## Current State

There is an existing starting project with the following pages:

- The books list page
- The book details page
- Library selection page
- Current user's orders page

## The Goal

Complete all pages to cover all different API endpoints for different roles (ADMIN, LIBRARY, USER).

- Create pages for GET requests and lists.
- Create <Form> or Form.fetcher for POST requests that do not cause navigation.
- For every GET API endpoint, create a page consistent with the role of the current user.

---

## Rules

### 1. Auth & Routing

- Create a ProtectedRoute component to guard protected routes. It takes allowedRoles and uses loader data.
- Protected routes will be children to this component. The loader is imported from features/auth to get the current user account data on app load. It will be attached to the protected route and its children block.
- The account data will be passed via Outlet and used by useOutletContext.

### 2. Code Standards

- Follow React instructions in .github/instructions/reactjs.instructions.md
- Keep components single-responsibility and clean with consistent naming.
- Use hooks to share stateful logic, or useReducer when the state logic becomes complex.

### 3. Pages

- Create two sign-up pages (for normal users or libraries).
- Create 3 different login pages for each role.

### 4. Real-time & Notifications

- Use the socket.io client library to connect to the socket.io server.
- Listen/emit all defined events in the API (e.g., when an order is fulfilled or when an order is sent to a library).
- Create a notifications page where the user can see notifications with read capability using an intersection observer.

### 5. Interceptors

- Use request/response interceptors to handle token refresh or expiry.

### 6. Testing

- Use Vitest, React Testing Library, and Jest to test components and hooks.
- Mock API connections to return mock data.
- When creating the app, make it easy to test.
- For components with no changing parts, you can use snapshot testing.
- Keep test files near their components.

### 7. Error Handling

- In actions and loaders, use the to function in utils instead of try/catch.
- Format the error globally in the interceptor using the formatAxiosError function.
- for router error use the getRouteErrorMessagefunction in react router error boundaries
- Check for the error in the action/loader and throw it to the components/error boundaries (like validation errors).

### 8. Pagination

- Create a custom hook called useInfiniteScroll.
- It will deal with the state of the cursor and limit in the URL.
- It will use useFetcher to load the next content.
- The hook should return a ref and an event handler which will be used in a component to be observed.
- Keep them reusable because it will be used for all lists in the app.

### 9. Static Pages

- Create a privacy policy page (take the policy from the API repo).
- Create an about page. At the end of the about page, write that this app is created by engineers: مروان نويلاتي ومحمد كشول مللي.

---

## Work Validation

To validate your work, ensure the following:

- You haven't missed an endpoint with no corresponding page (if they are GET endpoints) or controls (if they are actions).
- Every slice is 100% decoupled from other features.
- All components/hooks are tested.
- The overall performance of the app is good by killing unnecessary rerenders (by using memo for components and using useMemo or useCallback).

---

## Work Plan

1. First, refactor the current app structure to features-based (it is small at the moment so it will be easy), 
   stick with server resposne types , and change the existing types if there is a conflict.
   Don't use fakeapi.ts , delete it and use real connections .
2. Read the attached folder structure diagram.
3. Read the API endpoints and analyze all endpoints with request/response types and interfaces with validation rules and role access from the link [repo]().
4. Start by the auth feature with the protected route and account loader.
5. Create all feature folders just like they are in the API repository.
6. Create all related pages based on ROLE.
   - Meaning: create all feature components that relate to a specific role, then move to the next role, and so on.
   - If the role requires pages that use different components from multiple features, only create the stuff related to the role, then move on.
   - We do this because each role experience feels like a different application when dealing with the frontend.
   - For shared pages, allow access to them by adding the allowed roles in the array of the protected route.
7. Use React Hook Form library only for form validation.
   - If you find that we need a validation library, ask me and DO NOT complete. Explain exactly what needs validation.
