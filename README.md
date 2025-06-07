# mNotify TypeScript SDK

[![npm version](https://img.shields.io/npm/v/mnotify-sdk)](https://www.npmjs.com/package/mnotify-sdk)
[![CI/CD](https://github.com/adjanour/mnotify-ts-sdk/actions/workflows/publish.yml/badge.svg)](https://github.com/your-org/mnotify-ts-sdk/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

3rd Party TypeScript SDK for mNotify's Bulk Messaging Solution (BMS) API, providing seamless SMS, Voice, and contact management capabilities.

## Project Purpose

Simplify integration with mNotify's communication APIs by providing:
- **Type-safe** interactions
- **Developer-friendly** abstractions
- **Comprehensive** API coverage
- **Reliable** error handling

## Key Features

| Feature Area       | Capabilities |
|--------------------|--------------|
| **SMS**            | Bulk sending, Delivery reports, Scheduled SMS |
| **Contacts**       | CRUD operations, Group management |
| **Templates**      | Create/list templates, Approval status |
| **Account**        | Balance checks, Sender ID management |
| **Utilities**      | Webhook validation, Phone number validation, Automatic retries |

## Getting Started

### Installation
```bash
pnpm install mnotify-sdk
```

### Basic Usage
```typescript
import { MNotify } from 'mnotify-sdk';

// Initialize client
const mnotify = new MNotify({
  apiKey: process.env.MNOTIFY_API_KEY!
});

// Send SMS
const response = await mnotify.sms.sendQuickSMS({
  recipient: ['233200000000'],
  sender: 'MyApp',
  message: 'Hello from SDK!'
});

// Check delivery status
const status = await mnotify.sms.getSMSStatus(response.summary.message_id);
```

## Project Checklist

### Implemented Features
- [x] Core HTTP client with retry logic
- [x] SMS sending & status tracking


### Upcoming Features
- [] Contact/Group management
- [] Template system
- [] Account operations
- [] Comprehensive TypeScript types
- [] Automated documentation generation
- [ ] USSD API integration
- [ ] Voice message support
- [ ] Advanced webhook processing
- [ ] React/Vue hook helpers

## Contribution Guidelines

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add some feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

### Development Setup
```bash
git clone https://github.com/adjanour/mnotify-ts-sdk.git
cd mnotify-ts-sdk
pnpm install
```

### Testing
```bash
pnpm test
# Watch mode
pnpm run test:watch
```

### Building Documentation
```bash
pnpm run docs
```

## Documentation

Full API reference available at:  
[ mNotify SDK Documentation](https://your-docs-url.com)

## License

MIT © [Bernard](https://adjarnour.tech)

---

> **Need Help?**  
> Open an issue or contact adjanour@icloud.com
