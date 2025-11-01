export type SelectorSet = {
  email: string;
  phone: string;
  fn: string;
  ln: string;
  ct: string;
  st: string;
  zp: string;
  country: string;
};

export type Config = {
  pixelId: string;
  accessToken: string;
  testEventCode?: string;
  ga4MeasurementId: string;
  taggingServerUrl: string;
  transportUrl: string;
  events: string[];
  selectors: {
    main: SelectorSet;
    unbounce: SelectorSet;
  };
};

export const defaultConfig: Config = {
  pixelId: '',
  accessToken: '',
  testEventCode: '',
  ga4MeasurementId: '',
  taggingServerUrl: '',
  transportUrl: '',
  events: ['page_view', 'lead_submit', 'contact_click', 'form_start', 'form_submit'],
  selectors: {
    main: {
      email: 'input[name="email"]',
      phone: 'input[name="phone"]',
      fn: 'input[name="first_name"]',
      ln: 'input[name="last_name"]',
      ct: 'input[name="city"]',
      st: 'input[name="state"]',
      zp: 'input[name="zip"]',
      country: 'input[name="country"]',
    },
    unbounce: {
      email: '#email',
      phone: '#phone_number',
      fn: '#first_name',
      ln: '#last_name',
      ct: '#city',
      st: '#state',
      zp: '#zip',
      country: '#country',
    },
  },
};
