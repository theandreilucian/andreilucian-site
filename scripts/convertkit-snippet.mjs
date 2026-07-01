/** ConvertKit + script.js for newsletter forms on static pages */
export function renderConvertKitScripts(assetPrefix = "") {
  const p = assetPrefix;
  return `<script>
    window.CONVERTKIT_FORM_ID = '7774194';
    window.CONVERTKIT_API_KEY = 'N_JVENuZ2KKUbm_Nqrk3Hw';
    window.CONVERTKIT_REDIRECT_URL = 'https://andreilucian.kit.com/xsimplified';
  </script>
  <script src="${p}script.js?v=20260701180000"></script>`;
}
