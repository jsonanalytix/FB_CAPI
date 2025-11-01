# Facebook CAPI Setup Generator

A React-based tool for generating Google Tag Manager (GTM) containers that implement Facebook Conversions API (CAPI) with GA4 integration and proper event deduplication.

## Features

- 🚀 **One-Click Generation**: Generate both Web and Server GTM containers instantly
- 🔄 **Event Deduplication**: Properly implements shared event IDs for browser + server deduplication
- 📊 **GA4 Integration**: Routes events through server-side GTM using transport_url
- 🎯 **Smart Form Capture**: Auto-detects and captures form submissions with user data
- 🔧 **Configurable Selectors**: Supports both standard and Unbounce form field selectors
- 💾 **Local Storage**: Automatically persists your configuration
- 📥 **Import/Export**: Save and share configurations as JSON files

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Google Tag Manager (Web + Server containers)
- Facebook Pixel ID and Access Token

### Installation

```bash
# Clone the repository
git clone https://github.com/jsonanalytix/FB_CAPI.git
cd FB_CAPI

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Usage

### 1. Configure Project IDs

Fill in the required fields:

- **Pixel ID**: Your Facebook Pixel ID (15-16 digits)
- **Access Token**: Your Facebook Access Token for Conversions API
- **Test Event Code** (optional): For testing events in Facebook Events Manager
- **GA4 Measurement ID**: Your Google Analytics 4 Measurement ID (format: G-XXXXXXXXXX)
- **Transport URL**: Your server-side GTM URL (format: https://server.example.com/g/collect)

### 2. Configure Events

Select up to 5 events to track. Common events include:
- `page_view`
- `lead_submit`
- `contact_click`
- `form_start`
- `form_submit`

### 3. Configure Form Selectors

Customize CSS selectors for form fields if needed. Two selector sets are supported:
- **Main Selectors**: For standard forms
- **Unbounce Selectors**: For Unbounce landing pages

### 4. Generate Containers

Click **"Generate & Download"** to:
1. Generate Web GTM container JSON
2. Generate Server GTM container JSON
3. Automatically download both files

### 5. Import into GTM

#### Web Container
1. Go to your GTM Web Container
2. Navigate to **Admin → Import Container**
3. Upload `web-gtm-container.json`
4. Choose merge or overwrite option
5. Confirm and submit

#### Server Container
1. Go to your GTM Server Container
2. Navigate to **Admin → Import Container**
3. Upload `server-gtm-container.json`
4. Choose merge or overwrite option
5. Confirm and submit
6. **Important**: Open Templates → Tag Templates and add "Facebook Conversions API" from the Template Gallery
7. The FB CAPI tag will automatically connect to this template

## What Gets Generated

### Web Container Includes:

**Variables:**
- Event ID generator (persists across page)
- Cookie readers for _fbp and _fbc
- Data Layer Variables for user data
- Constant variables for Pixel ID, GA4 ID, and Transport URL

**Tags (per event):**
- GA4 Event tag (server transport)
- GA4 Event tag (reporting)
- Facebook Pixel tag (browser-side)

**Additional Tags:**
- GA4 Configuration tag with transport_url
- Form Capture tag (captures user data and manages FB cookies)

**Triggers:**
- Custom Event trigger for each configured event

### Server Container Includes:

**Client:**
- GA4 Client (receives GA4 hits)

**Variables:**
- Event Data variables for event_id, fbp, fbc, and user fields
- Cookie variables with fallback logic
- Event Name lookup (maps GA4 → FB event names)

**Tags:**
- Facebook Conversions API tag with complete user data mapping

**Triggers:**
- Regex trigger matching only configured events

## Event Flow

```
User Action → Form Submit
    ↓
Form Capture Tag
    ↓
dataLayer.push({
  event: 'lead_submit',
  event_id: 'xxx',
  user_data: {...},
  fbp: '...',
  fbc: '...'
})
    ↓
Web Container
    ├─→ GA4 Tag (to server via transport_url)
    └─→ FB Pixel Tag (browser-side)
    ↓
Server Container (receives GA4 hit)
    ↓
FB CAPI Tag (server-side)
    ↓
Facebook receives:
    - Browser event (from Pixel)
    - Server event (from CAPI)
    - Same event_id = Deduplication ✓
```

## Configuration Options

### Events Validation
- Minimum: 1 event
- Maximum: 5 events
- Format: lowercase with underscores only (e.g., `page_view`)

### URL Validation
- Transport URL must be a valid HTTPS URL
- Should end with `/g/collect` for GA4 compatibility

### GA4 Measurement ID
- Must start with `G-`
- Followed by alphanumeric characters

## Form Capture Behavior

The generated form capture tag:

1. **Attaches to forms** containing at least one configured selector
2. **Detects form type** (Main vs Unbounce) automatically
3. **Captures data** on form submission
4. **Manages cookies**:
   - Creates `_fbp` if missing (90-day expiration)
   - Creates `_fbc` from `fbclid` URL parameter if present
5. **Pushes to dataLayer** with:
   - Event name: `lead_submit`
   - User data object
   - Facebook cookies
   - Shared event ID

## Event Name Mapping

GA4 event names are automatically mapped to Facebook event names:

| GA4 Event | Facebook Event |
|-----------|----------------|
| page_view | PageView |
| lead_submit | Lead |
| contact_click | Contact |
| form_start | InitiateCheckout |
| form_submit | CompleteRegistration |
| (others) | Pass through unchanged |

## Testing

### Using Facebook Test Events

1. Go to Facebook Events Manager
2. Select your Pixel
3. Click **Test Events**
4. Enable **"Test events from browser"** or enter Test Event Code
5. Trigger events on your website
6. Verify both browser and server events appear
7. Confirm deduplication (same event_id shows 1 event, not 2)

### Using GTM Preview Mode

**Web Container:**
1. Enter Preview mode
2. Navigate to your website
3. Trigger configured events
4. Check **Tags Fired** - should see GA4 + FB Pixel tags
5. Check Network tab - GA4 hits should go to transport_url

**Server Container:**
1. Enter Preview mode
2. Trigger events from website
3. Verify GA4 Client receives hits
4. Confirm FB CAPI tag fires with correct parameters

## Development

### Project Structure

```
src/
├── components/        # React components
│   ├── ActionButtons.tsx
│   ├── EventsSection.tsx
│   ├── FormSelectors.tsx
│   ├── ProjectIDs.tsx
│   └── ...
├── utils/
│   ├── builders.ts    # GTM container builders
│   └── helpers.ts     # Validation & download utilities
├── hooks/
│   └── useLocalStorage.ts
├── types.ts           # TypeScript type definitions
└── App.tsx            # Main application
```

### Key Files

- **builders.ts**: Contains all GTM container generation logic
- **types.ts**: TypeScript interfaces for Config and SelectorSet
- **helpers.ts**: Validation functions and JSON download utility

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Technical Notes

### GTM Export Format
- Uses `exportFormatVersion: 2`
- Compatible with current GTM containers
- All parameters follow GTM's type/key/value structure

### Facebook CAPI Template
The server container uses `cvt_temp_public_id` as a placeholder for the FB CAPI tag type. After import, install the "Facebook Conversions API" template from GTM's Template Gallery, and the tag will automatically connect.

### User Data Flattening
User data is flattened into GA4 event parameters (prefixed with `ud_`) so the server container doesn't need custom parsing or template permissions. This approach is more portable and easier to maintain.

## Troubleshooting

### Import Errors

**"Invalid container format"**
- Ensure you're importing into the correct container type (Web vs Server)
- Verify the JSON file wasn't corrupted during download

**"Template not found" error for FB CAPI tag**
- Install "Facebook Conversions API" from Template Gallery
- The tag should auto-connect after template installation

### Tags Not Firing

**Events not triggering**
- Check trigger configuration matches your event names
- Verify dataLayer.push uses correct event name
- Check GTM Preview mode for errors

**GA4 not routing to server**
- Verify transport_url in GA4 Config tag
- Confirm server container URL is correct and accessible
- Check browser Network tab for failed requests

### Deduplication Issues

**Seeing duplicate events in Facebook**
- Verify same event_id is used in both browser and server events
- Check that Event ID variable is persisting correctly
- Confirm both web and server containers are firing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this tool for your projects.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

## Credits

Built with:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

---

**Note**: This tool generates configuration files for GTM. Always test thoroughly in a development environment before deploying to production. Ensure you have proper consent mechanisms in place for collecting and processing user data in compliance with privacy regulations (GDPR, CCPA, etc.).

