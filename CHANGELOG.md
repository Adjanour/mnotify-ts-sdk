# Changelog

## 2.2.0 (2026-02-13)

### Features
- **mNotify v2 Endpoint Alignment**
  - Updated Sender ID operations to use `/senderid/register` and `/senderid/status`
  - Updated Group routes to singular `/group` endpoints
  - Updated Contact routes to use `/contact` and group-scoped contact creation
  - Updated Template routes to use `/template` with v2 payload mapping (`title`/`body`)
- **Improved Error Debugging**
  - Added structured `MNotifyError.context` metadata (service, operation, method, path, URL, stage, retry count)
  - Added contextual error wrapping across service layers and HTTP request flow
  - Added safer response validation paths to preserve Result-based error handling

### Fixes
- Fixed URL joining so custom base URLs with path segments (e.g. `/api`) are preserved
- Fixed examples to use environment variables instead of hardcoded API keys/senders/base URLs
- Fixed `examples/sendSMS.ts` route/config mismatch that caused `The route sms/quick could not be found`

### Improvements
- Added/updated tests for:
  - base URL path preservation (`/api`)
  - sender ID v2 routes and payloads
  - contact v2 route behavior and validation
  - Result error context surfacing for safe-mode failures

## 2.1.0 (2024-02-07)

### Features
- **Railway-Oriented Programming**
  - Added `Result<T, E>` type for functional error handling (inspired by Rust)
  - All services now have "Safe" method variants that return `Result` instead of throwing
  - Example: `sendQuickBulkSMSSafe()`, `getBalanceSafe()`, etc.
  - Full backward compatibility - legacy throwing methods still available
  - Pattern matching support with `.match()`, `.map()`, `.andThen()`, etc.
  - 20 comprehensive tests for Result type
- **CI/CD Pipeline**
  - GitHub Actions workflows for automated testing
  - Multi-version Node.js testing (18.x, 20.x, 22.x)
  - CodeQL security scanning on schedule
  - Automated NPM publishing on releases
  - Codecov integration for test coverage

### Improvements
- Updated HttpClient with `requestSafe()` method returning Result
- All services refactored to support both error handling patterns
- Enhanced documentation with railway-oriented programming examples
- Zero breaking changes - fully backward compatible

### Migration Guide (Optional)

```typescript
// Legacy API (still works)
try {
  const response = await mnotify.sms.sendQuickBulkSMS({...});
} catch (error) {
  console.error(error);
}

// New Railway-Oriented API (recommended)
const result = await mnotify.sms.sendQuickBulkSMSSafe({...});
if (result.isOk()) {
  console.log(result.value);
} else {
  console.error(result.error);
}
```

## 2.0.0 (2024-02-07)

### Breaking Changes
- **Zero Dependencies**: Removed all runtime dependencies (axios, zod, dotenv)
  - Replaced axios with native fetch API
  - Replaced zod with lightweight custom validation
  - Removed dotenv dependency (document env var usage instead)
- **API Changes**: Renamed `sendQuickSMS` to `sendQuickBulkSMS` for clarity
- **Client Refactor**: Replaced `MNotifyClient` with `HttpClient`

### Features
- **Complete API Coverage**
  - SMS Service: Bulk sending, delivery reports, scheduled SMS
  - Contact Service: CRUD operations for contacts
  - Account Service: Balance checks, sender ID management  
  - Template Service: Create, list, get, delete templates
  - Group Service: Group management and contact assignment
- **Modern Functional Programming Style**
  - Added utility functions: `toArray`, `chunk`, `compact`, `pick`, `omit`
  - Phone number utilities: `normalizePhone`, `isValidPhone`
  - Retry mechanism with exponential backoff
  - Pure functions throughout
- **Developer Experience**
  - Full TypeScript support with comprehensive types
  - Detailed JSDoc documentation
  - Intuitive, consistent API across all services
  - Better error handling with `MNotifyError` class
  - Updated examples showing all features

### Improvements
- Reduced bundle size to 172KB (from ~1MB with dependencies)
- Faster installation (no dependency tree)
- Better security (fewer attack vectors)
- Future-proof (no dependency breaking changes)
- Removed console.log from production code
- 18 comprehensive tests with full utility coverage
- Zero security vulnerabilities (CodeQL verified)

### Migration Guide

#### Install v2
```bash
npm install mnotify-ts-sdk@latest
```

#### Update imports (if you were importing internal types)
```typescript
// Before
import { MNotifyClient } from 'mnotify-ts-sdk/client/MNotifyClient';

// After  
import { MNotify } from 'mnotify-ts-sdk';
```

#### API method rename
```typescript
// Before
await mnotify.sms.sendQuickSMS({...});

// After
await mnotify.sms.sendQuickBulkSMS({...});
```

#### New features available
```typescript
// Check balance
const balance = await mnotify.account.getBalance();

// Manage templates
const template = await mnotify.templates.createTemplate({...});

// Manage groups
const group = await mnotify.groups.createGroup({...});
```

## 1.0.1 (2023-08-20)

### Bug Fixes
- Minor fixes and improvements

## 1.0.0 (2023-08-20)

### Features
- Initial release of Third-Party mNotify TypeScript SDK
- Support for SMS
