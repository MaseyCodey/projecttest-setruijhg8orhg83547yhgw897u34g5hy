/*
 * The only settings needed to connect donations.
 * Read STRIPE-SETUP.md before adding your foundation's LIVE links.
 * These are public Payment Link URLs, never API keys or passwords.
 */
window.LOLA_SITE_CONFIG = {
  donations: {
    // Create a USD Payment Link with “Customers choose what to pay”.
    oneTimeUrl: '',

    // Optional: one fixed-price recurring Stripe link per monthly amount.
    // Example: { label: '$10 / month', url: 'https://buy.stripe.com/YOUR_LINK' }
    monthlyLinks: []
  },

  // Optional public contact email. Leave empty to use official social pages.
  contactEmail: ''
};
