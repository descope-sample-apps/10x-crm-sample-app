# 10x CRM

Welcome to **10x CRM** — a sample application demonstrating how to use **Descope Inbound Apps** to protect APIs with fine-grained scopes.

## 🔍 What's Inside

### ✅ Full-Stack Demo

- **Frontend UI** (Next.JS): A CRM dashboard showing customers, leads, analytics, etc.
- **Backend APIs**: Return dummy CRM data via RESTful endpoints.
- **Scoped Middleware**: Each API endpoint is protected using Descope-issued JWTs and required scopes.
- **Descope Inbound App Integration**: Enables third-party applications to authenticate using Descope as their identity provider (IdP) via OAuth 2.0, allowing users to:
  - Sign in to the CRM using their Descope credentials
  - Control access to their data through consent flows
  - Enable AI agents, partner applications, and automated workflows to access the CRM's APIs with scoped tokens

> ℹ️ **Frontend Access Note**  
> For simplicity and demonstration purposes, users accessing the frontend are granted **full scopes** automatically. To test the endpoints with different scopes, check out our [Postman Collection](https://www.postman.com/descope-devrel/agentic-auth-hub/collection/sk20i9u/10x-crm?action=share)

---

## 🌐 API Access: External App Integrations

While the frontend UI uses full scopes, you can also test the APIs as an **external agent or app** via proper consent flows using either:

### 🔬 [Postman Collection](https://www.postman.com/descope-devrel/agentic-auth-hub/collection/sk20i9u/10x-crm?action=share)

- Includes pre-configured requests to all API endpoints.
- Tokens must be generated via the **Descope Inbound App consent flow**.
- Scopes control which endpoints are accessible.

The Postman Collection demonstrates how to use OAuth tokens to access the CRM's
APIs. Try different scope combinations to see how the APIs respond.

### 🤖 [ConnectedAgent.app](https://connectedagent.app)

- A sample AI Agent that demonstrates how third-party applications can securely access this CRM's APIs:
  1. Connect to this app using Descope Inbound Apps.
  2. Walk through the consent flow.
  3. Once authorized, the application automatically manages the OAuth tokens.
  4. The AI Agent can then securely access the CRM's APIs using these tokens.

[ConnectedAgent](https://connectedagent.app) demonstrates how **Descope Inbound Apps enable secure, consent-driven access** to your APIs from external applications.

---

## 🔐 API Scopes

Each endpoint requires specific scopes. For example:

| Endpoint            | Required Scope  |
| ------------------- | --------------- |
| `GET /api/contacts` | `contacts:read` |
| `GET /api/deals`    | `deals:read`    |

APIs are protected by middleware like:

```js
// Require contacts:read scope for GET requests
export const GET = withOAuth(handler, ['contacts:read'])
```

The `withOAuth` function validates the reuest token and checks if it contains the required scopes, before returning any data.

```js
// Check required scopes
if (requiredScopes.some(scope => !scopes.includes(scope))) {
  return NextResponse.json(
    {
      error: 'Insufficient permissions',
      requiredScopes: requiredScopes
    },
    { status: 403 }
  )
}
```
