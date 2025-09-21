// Gracefully register a KendoReact license key when available.
// Some versions of '@progress/kendo-licensing' do not export `registerLicense`.
// We avoid static imports to prevent build-time errors in such cases.

const licenseKey = (globalThis as any)?.process?.env?.NEXT_PUBLIC_KENDO_LICENSE_KEY;

if (licenseKey) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const licensing = require('@progress/kendo-licensing');
    const register = licensing.registerLicense || licensing.setScriptKey;
    if (typeof register === 'function') {
      register(licenseKey);
    }
  } catch {
    // The licensing package might be absent or incompatible; safely ignore.
  }
} else if ((globalThis as any)?.process?.env?.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.warn('KendoReact license key is missing. Set NEXT_PUBLIC_KENDO_LICENSE_KEY if required.');
}
