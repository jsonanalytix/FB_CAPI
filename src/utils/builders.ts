import type { Config } from '../types';

export function buildWebContainerJSON(config: Config): Record<string, any> {
  // TODO: Replace with real builder.
  // Must return a valid GTM Web container export JSON object that includes:
  // - Variables (event_id generator, cookies, DLVs)
  // - GA4 config with transport_url
  // - 5 GA4 (server transport) event tags
  // - 5 GA4 (reporting) event tags
  // - 5 Facebook Pixel (facebookarchive OR custom HTML) tags using Event ID + advanced matching
  // - Custom HTML tag that binds to provided selectors and pushes lead_submit with user_data, fbp, fbc
  // - Triggers for each of the 5 events

  return {
    exportFormatVersion: 2,
    exportTime: new Date().toISOString(),
    containerVersion: {
      container: {
        publicId: 'GTM-XXXXXXX',
        name: 'Web Container - CAPI Setup',
      },
      tag: [],
      trigger: [],
      variable: [],
    },
    note: `Generated config for Pixel ID: ${config.pixelId}`,
  };
}

export function buildServerContainerJSON(config: Config): Record<string, any> {
  // TODO: Replace with real builder.
  // Must return a valid GTM Server container export JSON object that includes:
  // - GA4 client
  // - Event Data variables for event_id, fbp/fbc (with cookie fallbacks), user data (flat or parsed)
  // - Facebook Conversions API tag (Pixel ID, Access Token, Test Event Code)
  // - Event Name lookup mapping (config.events -> FB names)
  // - Trigger that fires only for the chosen 5 events

  return {
    exportFormatVersion: 2,
    exportTime: new Date().toISOString(),
    containerVersion: {
      container: {
        publicId: 'GTM-XXXXXXX',
        name: 'Server Container - CAPI Setup',
      },
      client: [],
      tag: [],
      trigger: [],
      variable: [],
    },
    note: `Generated config for Pixel ID: ${config.pixelId}`,
  };
}

export function mapEventNameToFB(eventName: string): string {
  const mapping: Record<string, string> = {
    page_view: 'PageView',
    lead_submit: 'Lead',
    contact_click: 'Contact',
    form_start: 'InitiateCheckout',
    form_submit: 'CompleteRegistration',
  };

  return mapping[eventName] || eventName;
}
