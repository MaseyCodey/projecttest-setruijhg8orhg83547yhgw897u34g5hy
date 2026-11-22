# Set up Stripe donations

The simplest setup for this website is a **Stripe Payment Link** created in the foundation’s own Stripe account. Donors click a button on the website and complete payment on Stripe’s hosted checkout. The website only needs the public link; it needs no API keys, payment server, or shared Stripe login.

Instructions checked against official Stripe documentation on **2026-11-22**. Start with one-time donations. Monthly giving is optional.

## 1. Set up the foundation’s account

An authorized foundation representative should create or sign into its Stripe account, provide the organization’s accurate business details, complete verification, and confirm its payout bank information. Use its actual legal status; this website does not establish that the foundation is tax-exempt.

Describe the specific purpose donations support. Stripe’s donation requirements apply to the organization receiving the money, so use the foundation’s account for this direct setup. If a developer helps with the website, give them the public payment link rather than login credentials or keys.

Official guidance: [Account setup](https://docs.stripe.com/get-started/account/set-up), [account checklist](https://docs.stripe.com/get-started/account/checklist), and [donation requirements](https://support.stripe.com/questions/requirements-for-accepting-tips-or-donations).

## 2. Create a one-time donation link

For a practice run, first choose a **sandbox** in the Stripe Dashboard’s account picker. Some older accounts also show **Test mode**. These environments let you test without moving real money.

1. Open **Payment Links** in the Stripe Dashboard and choose **New**.
2. Select **Customers choose what to pay**.
3. Enter a title such as “Support Lola’s Butterfly Effect Foundation” and a foundation-approved description of how donations will be used.
4. Choose **USD** to match this website’s $25, $50, and $100 suggestions. Optionally set a suggested amount and minimum/maximum donation amounts.
5. In **Advanced options**, change the checkout action from **Pay** to **Donate**.
6. Choose **Create link**, then copy the resulting URL.

The link is reusable for multiple donors. **Customers choose what to pay supports one-time donations only.** It cannot be converted into a custom-amount monthly link.

Official guidance: [Accept donations through Stripe](https://support.stripe.com/questions/how-to-accept-donations-through-stripe), [create a Payment Link](https://docs.stripe.com/payment-links/create), and [sandbox testing](https://docs.stripe.com/sandboxes).

## 3. Add branding, a thank-you message, and receipts

Use Stripe’s **Branding** settings to upload `assets/stripe-logo.png` and apply yellow `#FAE03A` and orange `#F35A29`. This included 180 × 180 PNG is below Stripe’s 512 KB receipt-image limit and meets its 128 × 128 minimum; the larger website logo remains unchanged. On the Payment Link’s **After the payment** settings, choose a clear thank-you confirmation or redirect donors back to the website.

For automatic payment receipts, open **Settings → Business → Customer emails**. Under **Payments**, turn on **Successful payments**. You may also enable **Refunds**. Stripe needs the donor’s email and the account’s required public contact information to send receipts.

A payment receipt records the transaction. Do not promise tax-deductibility until the foundation’s actual status and approved donation wording have been confirmed.

Official guidance: [Post-payment options](https://docs.stripe.com/payment-links/post-payment) and [receipt settings](https://docs.stripe.com/receipts).

## 4. Test the sandbox link

Open the sandbox Payment Link and complete a test payment with:

| Field | Test value |
| --- | --- |
| Card number | `4242 4242 4242 4242` |
| Expiration | Any valid future date |
| CVC | Any three digits |

Confirm that the amount, foundation name, and thank-you page look right, and that the payment succeeds in the sandbox Dashboard. Test in the sandbox instead of using a real card as a live-mode test.

**Test receipt nuance:** Stripe does not automatically email receipts for test payments. If you want to inspect one, open the successful test payment, find **Receipt history**, and use **Send receipt**. Automatic email receipts apply to successful live payments when configured.

Official guidance: [Test cards](https://docs.stripe.com/testing) and [receipts](https://docs.stripe.com/receipts).

## 5. Connect the live link to the website

Finish the account’s live activation, switch to the live account, and create the equivalent live Payment Link. Copy that live URL. Sandbox links and resources remain separate from live donations.

Open `site-config.js` and replace the empty `oneTimeUrl` value with the real live link:

```js
window.LOLA_SITE_CONFIG = {
  donations: {
    oneTimeUrl: 'PASTE_YOUR_LIVE_STRIPE_PAYMENT_LINK_HERE',
    monthlyLinks: []
  },
  contactEmail: ''
};
```

The capitalized text is a placeholder: replace it with the complete `https://buy.stripe.com/...` URL Stripe gives you. Keep the quotes. This website accepts Stripe’s standard `buy.stripe.com` links. Upload the updated `site-config.js` with the website. You do not need a publishable key, secret key, webhook secret, or account password for this link-based setup.

The site initially selects $50. Its one-time suggestion buttons use Stripe’s `prefilled_amount` parameter:

| Website suggestion | USD value sent to Stripe |
| --- | --- |
| $25 | `prefilled_amount=2500` |
| $50 | `prefilled_amount=5000` |
| $100 | `prefilled_amount=10000` |

Donors can still edit the amount in Stripe. The custom-amount choice opens the base link without adding a website preset; if you set a default amount in Stripe, Stripe can still display that default. Presets must satisfy the link’s minimum and maximum. This parameter works only on pay-what-you-want links, uses the price’s default currency, and does not enable custom monthly gifts.

Official guidance: [Payment Link amount parameters](https://docs.stripe.com/payment-links/customize) and [sandbox/live separation](https://support.stripe.com/questions/how-do-i-test-my-integration-when-test-mode-isnt-available).

## 6. Optional: add monthly donations

Monthly donations use **fixed recurring amounts**. For example, create separate $10/month, $25/month, and $50/month options:

1. In Payment Links, select **Products or subscriptions**.
2. Add a product with an accurate donation description.
3. Set its price to **Recurring**, with a **monthly** billing interval and the amount you want to offer.
4. Create one Payment Link for that monthly amount. Repeat for each amount.
5. Add the live links to `monthlyLinks` in `site-config.js`:

```js
monthlyLinks: [
  {
    label: '$10 / month',
    url: 'PASTE_YOUR_LIVE_10_DOLLAR_MONTHLY_LINK_HERE'
  },
  {
    label: '$25 / month',
    url: 'PASTE_YOUR_LIVE_25_DOLLAR_MONTHLY_LINK_HERE'
  }
]
```

Replace every placeholder with its actual link and match the visible label to the recurring amount. Keep each option’s link limited to the intended recurring price. Monthly controls stay hidden until valid links are configured. Stripe Billing pricing applies to recurring charges.

Stripe also offers a no-code customer portal so donors can manage subscriptions. In the [customer portal settings](https://dashboard.stripe.com/settings/billing/portal), activate the portal link and configure the options you want to provide. Stripe can include that link in customer emails.

Official guidance: [Recurring Payment Links](https://docs.stripe.com/payment-links/create), [Payment Links pricing](https://stripe.com/payments/payment-links), and [customer portal setup](https://docs.stripe.com/customer-management/activate-no-code-customer-portal).

## Optional nonprofit pricing

Eligible registered nonprofits in supported regions can request discounted processing through Stripe support. Stripe currently requires valid nonprofit/tax documentation and at least **80%** of payment volume from tax-deductible donations. Ask Stripe about eligibility and the applicable rate; qualification is not assumed for this foundation.

Official guidance: [Nonprofit fee discount](https://support.stripe.com/questions/fee-discount-for-nonprofit-organizations).

## If a donation button is unavailable

Check that `site-config.js` contains the complete live Payment Link, that the link is active in Stripe, and that the updated file reached GitHub Pages. The site deliberately shows an honest “not available yet” state when donation links are missing. It never simulates a successful payment or collects card details itself.
