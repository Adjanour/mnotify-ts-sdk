# Changelog

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