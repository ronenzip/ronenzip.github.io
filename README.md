# Puppeteer Autofill Fix

This repository contains the implementation for fixing [Puppeteer issue #14694](https://github.com/puppeteer/puppeteer/issues/14694).

## Overview

The `triggerAutofill` method enables programmatic triggering of browser autofill functionality for forms, supporting both address and credit card autofill.

## Implementation

The implementation is located in `src/index.ts` and includes:

- **triggerAutofill method**: Triggers autofill on a form field
- **Type definitions**: TypeScript interfaces for options and protocol types
- **Error handling**: Validates inputs and provides clear error messages

### Method Signature

```typescript
async triggerAutofill(
  selector: string, 
  options: TriggerAutofillOptions, 
  selectorOptions?: SelectorOptions
): Promise<void>
```

### Parameters

- `selector`: CSS selector for the form field to autofill
- `options`: Object containing either `address` or `card` data (exactly one must be provided)
- `selectorOptions`: Optional settings including frame selector

### Features

1. **Validation**: Ensures exactly one of address or card is provided
2. **Element Resolution**: Resolves the target field's backend node ID
3. **Frame Support**: Works with iframes using frame selectors
4. **Protocol Integration**: Uses Chrome DevTools Protocol Autofill.trigger command

### Error Handling

The method throws errors in the following cases:
- Both or neither address and card are provided
- Backend node ID cannot be resolved for the selected field
- Frame ID cannot be resolved

## Usage Example

```typescript
import { AutofillHelper } from './src/index';

const helper = new AutofillHelper(browser);

// Trigger address autofill
await helper.triggerAutofill('#address-field', {
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001'
  }
});

// Trigger card autofill
await helper.triggerAutofill('#card-field', {
  card: {
    number: '4111111111111111',
    name: 'John Doe',
    expiry: '12/25',
    cvv: '123'
  }
});
```

## Building

```bash
npm install
npm run build
```

## Related Issue

This implementation addresses [Puppeteer issue #14694](https://github.com/puppeteer/puppeteer/issues/14694).
