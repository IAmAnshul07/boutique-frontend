# SessionLens SDK Setup and Usage

This document explains how to use the SessionLens SDK in the boutique frontend application.

## Configuration

The SessionLens SDK is configured through environment variables. The configuration is managed in `src/config/sessionLens.config.ts`.

### Environment Variables

The following environment variables should be set in your datashop configuration:

- `SESSIONLENS_SDK_KEY`: Your SessionLens SDK key
- `SESSIONLENS_ORG_ID`: Your SessionLens organization ID
- `SESSIONLENS_PROJECT_ID`: Your SessionLens project ID (optional)
- `SESSIONLENS_API_BASE_URL`: SessionLens API base URL (optional)
- `SESSIONLENS_ENABLED`: Set to 'true' to enable SessionLens (default: true)

## Initialization

SessionLens is automatically initialized when the app loads. The initialization happens in multiple layers:

1. **Early Initialization**: `src/lib/sessionLensInit.ts` starts initialization immediately when imported
2. **Provider Initialization**: `SessionLensProvider` ensures initialization in the React component tree
3. **Hook Access**: `useSessionLens` hook provides access to the initialized instance

### Automatic Initialization

The app automatically initializes SessionLens in the root layout:

```tsx
// src/app/layout.tsx
import "@/lib/sessionLensInit"; // Early initialization
import { SessionLensProvider } from "@/components/SessionLensProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <StoreProvider>
          <SessionLensProvider>{/* Your app content */}</SessionLensProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
```

## Usage

### 1. Using the Hook (Recommended)

The easiest way to use SessionLens is through the `useSessionLens` hook:

```tsx
import { useSessionLens } from "@/hooks/useSessionLens";

function MyComponent() {
  const { initialized, trackEvent, identifyUser, resetSession, initializeSessionLens } = useSessionLens();

  // Track an event
  const handleButtonClick = () => {
    trackEvent("button_clicked", {
      button_name: "submit",
      page: "checkout",
    });
  };

  // Identify a user
  const handleUserLogin = (userId: string) => {
    identifyUser(userId, {
      email: "user@example.com",
      plan: "premium",
    });
  };

  // Reset session (e.g., on logout)
  const handleLogout = () => {
    resetSession();
  };

  return <div>{initialized ? <button onClick={handleButtonClick}>Click me</button> : <p>SessionLens initializing...</p>}</div>;
}
```

### 2. Manual Initialization (if needed)

If you need to manually initialize SessionLens in a specific component:

```tsx
import { SessionLensInitializer } from "@/components/SessionLensInitializer";

function MyComponent() {
  return (
    <SessionLensInitializer onInitialized={() => console.log("SessionLens ready!")} onError={(error) => console.error("SessionLens error:", error)}>
      <div>Your component content</div>
    </SessionLensInitializer>
  );
}
```

### 3. Direct Import

You can also import functions directly from the sessionlens library:

```tsx
import { initSessionLens, trackEvent, identifyUser, resetSession } from "@/lib/sessionlens";

// Initialize with a specific user ID
await initSessionLens("user123");

// Track events
trackEvent("product_viewed", {
  product_id: "123",
  category: "shoes",
});

// Identify user
identifyUser("user123", {
  email: "user@example.com",
  name: "John Doe",
});

// Reset session
resetSession();
```

### 3. API Routes

The application includes API routes for SessionLens operations:

- `POST /api/sessionlens/events` - Track events
- `POST /api/sessionlens/identify` - Identify users
- `POST /api/sessionlens/reset` - Reset session
- `GET /api/sessionlens/validate` - Validate configuration

## Event Tracking Examples

### Page Views

```tsx
trackEvent("page_viewed", {
  page: "/products",
  referrer: document.referrer,
});
```

### User Actions

```tsx
trackEvent("product_added_to_cart", {
  product_id: "123",
  product_name: "Nike Shoes",
  price: 99.99,
  category: "footwear",
});
```

### Form Submissions

```tsx
trackEvent("form_submitted", {
  form_name: "contact_form",
  fields_filled: ["name", "email", "message"],
});
```

### User Identification

```tsx
identifyUser("user123", {
  email: "user@example.com",
  name: "John Doe",
  subscription_plan: "premium",
  signup_date: "2024-01-15",
});
```

## Configuration Validation

The SDK automatically validates configuration on initialization. You can check the status:

```tsx
import { validateSessionLensConfig } from "@/config/sessionLens.config";

const isValid = validateSessionLensConfig();
console.log("SessionLens config valid:", isValid);
```

## Error Handling

The SDK includes comprehensive error handling:

- Configuration validation
- Initialization error handling
- Event tracking error handling
- User identification error handling

All errors are logged to the console for debugging.

## Legacy Functions

For backward compatibility, the following legacy function names are available:

- `startSession(userId, sessionData)` - Alias for `identifyUser`
- `stopSession()` - Alias for `resetSession`
- `addEvent(eventName, eventData)` - Alias for `trackEvent`
- `setUserProperties(properties)` - Warning: requires user ID
- `setSessionProperties(properties)` - Tracks as event

## Best Practices

1. **Initialize Early**: Use the `useSessionLens` hook in your root layout to ensure early initialization.

2. **Check Initialization**: Always check if SessionLens is initialized before tracking events.

3. **Consistent Event Names**: Use consistent, descriptive event names across your application.

4. **Include Context**: Always include relevant context in event properties.

5. **User Privacy**: Be mindful of user privacy and only track necessary data.

6. **Error Handling**: Handle cases where SessionLens might not be available.

## Troubleshooting

### SessionLens not initializing

- Check environment variables are set correctly
- Verify SDK key and organization ID are valid
- Check browser console for error messages

### Events not being tracked

- Ensure SessionLens is initialized before tracking events
- Check that the event name is not empty
- Verify network connectivity

### Configuration issues

- Use the `/api/sessionlens/validate` endpoint to check configuration
- Review environment variable setup
- Check datashop configuration access
