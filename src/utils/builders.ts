import type { Config, SelectorSet } from '../types';

// Helper types for GTM JSON structure
type Param = { 
  type: string; 
  key: string; 
  value?: any;
  list?: any[];
  map?: any[];
};
type GTMVar = {
  accountId?: string;
  containerId?: string;
  variableId?: string;
  name: string;
  type: string;
  parameter?: Param[];
};
type GTMTrigger = {
  name: string;
  triggerId?: string;
  type: string;
  filter?: any[];
  customEventFilter?: any[];
};
type GTMTag = {
  name: string;
  type: string;
  parameter?: Param[];
  firingTriggerId?: string[];
  tagFiringOption?: string;
};
type GTMClient = {
  name: string;
  type: string;
  parameter?: Param[];
};

// ID factory
let _id = 1;
const nextId = () => String(_id++);
const p = (key: string, type: string, value: any): Param => {
  if (type === 'LIST') {
    return { key, type, list: value };
  } else if (type === 'MAP') {
    return { key, type, map: value };
  } else {
    return { key, type, value };
  }
};

// ============================================
// VARIABLE BUILDERS (Web)
// ============================================

const varJS_EventId = (): GTMVar => ({
  name: 'JS – Event ID',
  type: 'jsm',
  parameter: [
    p(
      'javascript',
      'TEMPLATE',
      'function(){if(!window.__evtId)window.__evtId=Math.random().toString(36).slice(2)+Date.now();return window.__evtId;}'
    ),
  ],
});

const varCookie = (name: string): GTMVar => ({
  name: `cookie – ${name}`,
  type: 'k',
  parameter: [p('name', 'TEMPLATE', name)],
});

const varDLV = (name: string, path: string): GTMVar => ({
  name,
  type: 'v',
  parameter: [p('name', 'TEMPLATE', path), p('dataLayerVersion', 'INTEGER', '2')],
});

const constVar = (name: string, value: string): GTMVar => ({
  name,
  type: 'c',
  parameter: [p('value', 'TEMPLATE', value)],
});

// ============================================
// TRIGGER BUILDERS (Web)
// ============================================

const trigCustomEvent = (eventName: string): GTMTrigger => ({
  name: `EV – ${eventName}`,
  type: 'CUSTOM_EVENT',
  customEventFilter: [
    {
      type: 'EQUALS',
      parameter: [
        { type: 'TEMPLATE', key: 'arg0', value: '{{_event}}' },
        { type: 'TEMPLATE', key: 'arg1', value: eventName },
      ],
    },
  ],
});

// ============================================
// GA4 TAG BUILDERS (Web)
// ============================================

const ga4ConfigTag = (ga4Id: string, transportUrl: string, triggerId: string): GTMTag => ({
  name: 'GA4 – Config (transport)',
  type: 'googtag',
  parameter: [
    p('tagId', 'TEMPLATE', ga4Id),
    p('configSettingsTable', 'LIST', [
      {
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'parameter', value: 'transport_url' },
          { type: 'TEMPLATE', key: 'parameterValue', value: transportUrl },
        ],
      },
    ]),
  ],
  tagFiringOption: 'ONCE_PER_EVENT',
  firingTriggerId: [triggerId],
});

const ga4EventTag = (name: string, params: Record<string, string>, ga4Id: string): GTMTag => ({
  name: `GA4 – Event – ${name} (server)`,
  type: 'gaawe',
  parameter: [
    p('sendEcommerceData', 'BOOLEAN', 'false'),
    p(
      'eventSettingsTable',
      'LIST',
      Object.entries(params).map(([k, v]) => ({
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'parameter', value: k },
          { type: 'TEMPLATE', key: 'parameterValue', value: v },
        ],
      }))
    ),
    p('eventName', 'TEMPLATE', name),
    p('measurementIdOverride', 'TEMPLATE', ga4Id),
  ],
  firingTriggerId: [],
  tagFiringOption: 'ONCE_PER_EVENT',
});

const ga4EventTagReporting = (name: string, params: Record<string, string>, ga4Id: string): GTMTag => ({
  name: `GA4 – Event – ${name} (reporting)`,
  type: 'gaawe',
  parameter: [
    p('sendEcommerceData', 'BOOLEAN', 'false'),
    p(
      'eventSettingsTable',
      'LIST',
      Object.entries(params).map(([k, v]) => ({
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'parameter', value: k },
          { type: 'TEMPLATE', key: 'parameterValue', value: v },
        ],
      }))
    ),
    p('eventName', 'TEMPLATE', name),
    p('measurementIdOverride', 'TEMPLATE', ga4Id),
  ],
  firingTriggerId: [],
  tagFiringOption: 'ONCE_PER_EVENT',
});

// ============================================
// FACEBOOK PIXEL TAG BUILDERS (Web)
// ============================================

const fbEventHTML = (pixelId: string, event: string, advMatchVars: Record<string, string>) => {
  const adv = Object.entries(advMatchVars)
    .map(([k, v]) => `${k}: ${v || "''"}`)
    .join(', ');
  return `<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}',{${adv}});
fbq('track','${event}',{}, {eventID: {{JS – Event ID}}});
</script>`;
};

const fbPixelTagHTML = (
  event: string,
  pixelId: string,
  advVars: Record<string, string>
): GTMTag => ({
  name: `FB Pixel – ${event}`,
  type: 'html',
  parameter: [
    p('html', 'TEMPLATE', fbEventHTML(pixelId, event, advVars)),
    p('supportDocumentWrite', 'BOOLEAN', 'false'),
  ],
  firingTriggerId: [],
});

// ============================================
// FORM CAPTURE TAG (Web)
// ============================================

const formCaptureHTML = (selMain: SelectorSet, selUB: SelectorSet) => {
  const mainSelectors = JSON.stringify(selMain);
  const ubSelectors = JSON.stringify(selUB);
  
  return `<script>
(function() {
  var mainSel = ${mainSelectors};
  var ubSel = ${ubSelectors};
  
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }
  
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  function getFieldValue(selectors, field) {
    var el = document.querySelector(selectors[field]);
    return el ? el.value : '';
  }
  
  function handleFormSubmit(e) {
    var form = e.target;
    var selectors = mainSel;
    
    // Detect if form contains Unbounce selectors
    var isUnbounce = false;
    for (var key in ubSel) {
      if (form.querySelector(ubSel[key])) {
        selectors = ubSel;
        isUnbounce = true;
        break;
      }
    }
    
    var userData = {
      email: getFieldValue(selectors, 'email'),
      phone: getFieldValue(selectors, 'phone'),
      fn: getFieldValue(selectors, 'fn'),
      ln: getFieldValue(selectors, 'ln'),
      ct: getFieldValue(selectors, 'ct'),
      st: getFieldValue(selectors, 'st'),
      zp: getFieldValue(selectors, 'zp'),
      country: getFieldValue(selectors, 'country')
    };
    
    // Get or create _fbp cookie
    var fbp = getCookie('_fbp');
    if (!fbp) {
      fbp = 'fb.1.' + Date.now() + '.' + Math.random().toString(36).substring(2);
      setCookie('_fbp', fbp, 90);
    }
    
    // Get or create _fbc cookie from fbclid
    var fbc = getCookie('_fbc');
    if (!fbc) {
      var urlParams = new URLSearchParams(window.location.search);
      var fbclid = urlParams.get('fbclid');
      if (fbclid) {
        fbc = 'fb.1.' + Date.now() + '.' + fbclid;
        setCookie('_fbc', fbc, 90);
      }
    }
    
    // Push to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lead_submit',
      user_data: userData,
      fbp: fbp,
      fbc: fbc
    });
  }
  
  // Attach to all forms that contain at least one selector
  function attachToForms() {
    var forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
      var hasMainFields = false;
      var hasUBFields = false;
      
      for (var key in mainSel) {
        if (form.querySelector(mainSel[key])) {
          hasMainFields = true;
          break;
        }
      }
      
      for (var key in ubSel) {
        if (form.querySelector(ubSel[key])) {
          hasUBFields = true;
          break;
        }
      }
      
      if (hasMainFields || hasUBFields) {
        form.addEventListener('submit', handleFormSubmit);
      }
    });
  }
  
  // Run on DOM ready and after any dynamic content loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachToForms);
  } else {
    attachToForms();
  }
  
  // Re-attach after a delay to catch dynamically loaded forms
  setTimeout(attachToForms, 1000);
})();
</script>`;
};

const formCaptureTag = (selMain: SelectorSet, selUB: SelectorSet, triggerId: string): GTMTag => ({
  name: 'HTML – Capture Lead user_data',
  type: 'html',
  parameter: [
    p('html', 'TEMPLATE', formCaptureHTML(selMain, selUB)),
    p('supportDocumentWrite', 'BOOLEAN', 'false'),
  ],
  firingTriggerId: [triggerId],
  tagFiringOption: 'ONCE_PER_EVENT',
});

// ============================================
// WEB CONTAINER BUILDER
// ============================================

export function buildWebContainerJSON(config: Config): any {
  _id = 1;
  const variable: GTMVar[] = [];
  const trigger: GTMTrigger[] = [];
  const tag: GTMTag[] = [];

  // Variables
  variable.push(varJS_EventId());
  variable.push(varCookie('_fbp'), varCookie('_fbc'));
  variable.push(varDLV('DLV – user_data', 'user_data'));
  
  // Add individual user_data field DLVs for easier reference
  ['email', 'phone', 'fn', 'ln', 'ct', 'st', 'zp', 'country'].forEach(field => {
    variable.push(varDLV(`DLV – user_data.${field}`, `user_data.${field}`));
  });
  
  variable.push(constVar('CONST – Pixel ID', config.pixelId));
  variable.push(constVar('CONST – GA4 MID', config.ga4MeasurementId));
  variable.push(constVar('CONST – Transport URL', config.transportUrl));

  // All Pages trigger for GA4 Config
  const allPagesTrigger: GTMTrigger = {
    name: 'All Pages',
    type: 'PAGEVIEW',
  };
  const allPagesId = nextId();
  (allPagesTrigger as any).triggerId = allPagesId;
  trigger.push(allPagesTrigger);

  // DOM Ready trigger for Form Capture
  const domReadyTrigger: GTMTrigger = {
    name: 'DOM Ready',
    type: 'DOM_READY',
  };
  const domReadyId = nextId();
  (domReadyTrigger as any).triggerId = domReadyId;
  trigger.push(domReadyTrigger);

  // Triggers per event
  const trigIdsByEvent: Record<string, string> = {};
  config.events.forEach((ev) => {
    const t = trigCustomEvent(ev);
    const id = nextId();
    (t as any).triggerId = id;
    trigger.push(t);
    trigIdsByEvent[ev] = id;
  });

  // GA4 Config (transport)
  const ga4Cfg = ga4ConfigTag(config.ga4MeasurementId, config.transportUrl, allPagesId);
  tag.push(ga4Cfg);

  // Parameter map common to GA4 events
  const ga4Params = {
    event_id: '{{JS – Event ID}}',
    fbp: '{{cookie – _fbp}}',
    fbc: '{{cookie – _fbc}}',
    ud_email: '{{DLV – user_data.email}}',
    ud_phone: '{{DLV – user_data.phone}}',
    ud_fn: '{{DLV – user_data.fn}}',
    ud_ln: '{{DLV – user_data.ln}}',
    ud_ct: '{{DLV – user_data.ct}}',
    ud_st: '{{DLV – user_data.st}}',
    ud_zp: '{{DLV – user_data.zp}}',
    ud_country: '{{DLV – user_data.country}}',
  };

  // GA4 events (server) + (reporting)
  config.events.forEach((ev) => {
    const tServer = ga4EventTag(ev, ga4Params, config.ga4MeasurementId);
    tServer.firingTriggerId = [trigIdsByEvent[ev]];
    tag.push(tServer);

    const tRpt = ga4EventTagReporting(ev, ga4Params, config.ga4MeasurementId);
    tRpt.firingTriggerId = [trigIdsByEvent[ev]];
    tag.push(tRpt);
  });

  // FB Pixel tags (Custom HTML approach)
  const adv = {
    em: '{{DLV – user_data.email}}',
    ph: '{{DLV – user_data.phone}}',
    fn: '{{DLV – user_data.fn}}',
    ln: '{{DLV – user_data.ln}}',
    ct: '{{DLV – user_data.ct}}',
    st: '{{DLV – user_data.st}}',
    zp: '{{DLV – user_data.zp}}',
    country: '{{DLV – user_data.country}}',
  };
  
  config.events.forEach((ev) => {
    const fbEventName = mapEventNameToFB(ev);
    const fb = fbPixelTagHTML(fbEventName, config.pixelId, adv);
    fb.firingTriggerId = [trigIdsByEvent[ev]];
    tag.push(fb);
  });

  // Form capture tag
  tag.push(formCaptureTag(config.selectors.main, config.selectors.unbounce, domReadyId));

  return {
    exportFormatVersion: 2,
    exportTime: new Date().toISOString(),
    containerVersion: {
      container: {
        name: 'CAPI – Web',
        usageContext: ['WEB']
      },
      tag,
      trigger,
      variable
    }
  };
}

// ============================================
// SERVER CONTAINER BUILDER
// ============================================

export function buildServerContainerJSON(config: Config): any {
  _id = 1;
  const variable: GTMVar[] = [];
  const trigger: GTMTrigger[] = [];
  const tag: GTMTag[] = [];
  const client: GTMClient[] = [];

  // GA4 Client
  client.push({ name: 'GA4', type: 'gaawc', parameter: [] });

  // Event Data variables
  const evVar = (name: string): GTMVar => ({
    name: `ED – ${name}`,
    type: 'aed',
    parameter: [p('key', 'TEMPLATE', name)],
  });

  variable.push(evVar('event_id'), evVar('fbp'), evVar('fbc'));

  // Cookie variables
  variable.push({
    name: 'CK – _fbp',
    type: 'k',
    parameter: [p('name', 'TEMPLATE', '_fbp')],
  });
  variable.push({
    name: 'CK – _fbc',
    type: 'k',
    parameter: [p('name', 'TEMPLATE', '_fbc')],
  });

  // Lookup variables (fallback to cookies)
  const lookup = (nm: string, inputVar: string, cookieVar: string): GTMVar => ({
    name: nm,
    type: 'smm',
    parameter: [
      p('input', 'TEMPLATE', `{{${inputVar}}}`),
      p('map', 'LIST', [
        {
          type: 'MAP',
          map: [
            { type: 'TEMPLATE', key: 'key', value: '.+' },
            { type: 'TEMPLATE', key: 'value', value: `{{${inputVar}}}` },
          ],
        },
      ]),
      p('defaultValue', 'TEMPLATE', `{{${cookieVar}}}`),
    ],
  });

  variable.push(lookup('FB – fbp (event→cookie)', 'ED – fbp', 'CK – _fbp'));
  variable.push(lookup('FB – fbc (event→cookie)', 'ED – fbc', 'CK – _fbc'));

  // Flattened user fields (from Web GA4 event params)
  ['email', 'phone', 'fn', 'ln', 'ct', 'st', 'zp', 'country'].forEach((f) => {
    variable.push(evVar(`ud_${f}`));
  });

  // Event Name lookup (optional)
  const evNameLookup: GTMVar = {
    name: 'LV – FB Event Name',
    type: 'smm',
    parameter: [
      p('input', 'TEMPLATE', '{{Event Name}}'),
      p('map', 'LIST', [
        {
          type: 'MAP',
          map: [
            { type: 'TEMPLATE', key: 'key', value: 'page_view' },
            { type: 'TEMPLATE', key: 'value', value: 'PageView' },
          ],
        },
        {
          type: 'MAP',
          map: [
            { type: 'TEMPLATE', key: 'key', value: 'lead_submit' },
            { type: 'TEMPLATE', key: 'value', value: 'Lead' },
          ],
        },
        {
          type: 'MAP',
          map: [
            { type: 'TEMPLATE', key: 'key', value: 'contact_click' },
            { type: 'TEMPLATE', key: 'value', value: 'Contact' },
          ],
        },
      ]),
      p('defaultValue', 'TEMPLATE', '{{Event Name}}'),
    ],
  };
  variable.push(evNameLookup);

  // Trigger: only chosen events (regex)
  const regex = `^(${config.events.join('|')})$`;
  const trig: GTMTrigger = {
    name: 'TR – FB CAPI Events',
    type: 'CUSTOM_EVENT',
    customEventFilter: [
      {
        type: 'MATCH_REGEX',
        parameter: [
          { type: 'TEMPLATE', key: 'arg0', value: '{{Event Name}}' },
          { type: 'TEMPLATE', key: 'arg1', value: regex },
        ],
      },
    ],
  };
  (trig as any).triggerId = '1';
  trigger.push(trig);

  // Facebook CAPI tag
  const capiParams: Param[] = [
    p('pixelId', 'TEMPLATE', config.pixelId),
    p('apiAccessToken', 'TEMPLATE', config.accessToken),
    p('eventName', 'TEMPLATE', '{{LV – FB Event Name}}'),
    p('eventId', 'TEMPLATE', '{{ED – event_id}}'),
    p('userDataList', 'LIST', [
      {
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'name', value: 'em' },
          { type: 'TEMPLATE', key: 'value', value: '{{ED – ud_email}}' },
        ],
      },
      {
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'name', value: 'ph' },
          { type: 'TEMPLATE', key: 'value', value: '{{ED – ud_phone}}' },
        ],
      },
      {
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'name', value: 'fn' },
          { type: 'TEMPLATE', key: 'value', value: '{{ED – ud_fn}}' },
        ],
      },
      {
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'name', value: 'ln' },
          { type: 'TEMPLATE', key: 'value', value: '{{ED – ud_ln}}' },
        ],
      },
      {
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'name', value: 'ct' },
          { type: 'TEMPLATE', key: 'value', value: '{{ED – ud_ct}}' },
        ],
      },
      {
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'name', value: 'st' },
          { type: 'TEMPLATE', key: 'value', value: '{{ED – ud_st}}' },
        ],
      },
      {
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'name', value: 'zp' },
          { type: 'TEMPLATE', key: 'value', value: '{{ED – ud_zp}}' },
        ],
      },
      {
        type: 'MAP',
        map: [
          { type: 'TEMPLATE', key: 'name', value: 'country' },
          { type: 'TEMPLATE', key: 'value', value: '{{ED – ud_country}}' },
        ],
      },
    ]),
    p('fbp', 'TEMPLATE', '{{FB – fbp (event→cookie)}}'),
    p('fbc', 'TEMPLATE', '{{FB – fbc (event→cookie)}}'),
    p('userDataAutomatic', 'BOOLEAN', 'true'),
  ];

  if (config.testEventCode) {
    capiParams.push(p('testEventCode', 'TEMPLATE', config.testEventCode));
  }

  const capi: GTMTag = {
    name: 'FB – Conversions API',
    type: 'cvt_temp_public_id', // Template placeholder - will need to be connected to FB CAPI template
    parameter: capiParams,
    firingTriggerId: ['1'],
  };
  tag.push(capi);

  return {
    exportFormatVersion: 2,
    exportTime: new Date().toISOString(),
    containerVersion: {
      container: {
        name: 'CAPI – Server',
        usageContext: ['SERVER']
      },
      tag,
      trigger,
      variable,
      client
    }
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

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
