declare module 'react-google-recaptcha' {
  import * as React from 'react';

  interface ReCAPTCHAProps {
    sitekey: string;
    theme?: 'light' | 'dark';
    size?: 'compact' | 'normal' | 'invisible';
    tabindex?: number;
    onChange?: (value: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
    badge?: 'bottomright' | 'bottomleft' | 'inline';
  }

  const ReCAPTCHA: React.FC<ReCAPTCHAProps>;

  export default ReCAPTCHA;
}
