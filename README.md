# Lola’s Butterfly Effect Foundation

A complete static website using the foundation’s logo, yellow and orange colors, Lola’s story and a seven-photo collage, butterfly animations, and Lola’s melody. It works on phones and desktop browsers, and can be uploaded to GitHub Pages without installing a framework or running a build command.

## Open the website

1. Extract the ZIP on your computer.
2. Open the extracted `index.html` in a browser.

Keep the files together and leave the `assets` folder beside `index.html`. Images and music are included locally. Stripe and social links open external websites.

## Upload to GitHub Pages

1. Open the GitHub repository that will host this website.
2. On its **Code** page, choose **Add file → Upload files**. Upload the extracted **contents** of this ZIP, including the complete `assets` folder and `.nojekyll`.
3. Commit the files to the branch you will publish, usually `main`. If your repository uses pull requests, merge the upload into that branch first.
4. Open **Settings → Pages**.
5. Under **Build and deployment → Source**, choose **Deploy from a branch**.
6. Select your branch and **/(root)**, then click **Save**.
7. Wait for publishing to finish, then use the website address shown in GitHub Pages.

Upload the extracted files, not the ZIP. `index.html` must be at the repository’s top level, with the CSS and JavaScript files and `assets` beside it. Include `gallery.css`, `gallery.js`, `butterflies.css`, and `butterflies.js` as well as `styles.css`, `script.js`, and `site-config.js`. Keep all seven pictures inside `assets/photos`. Do not place everything inside an extra enclosing folder. Include `.nojekyll`; your computer may hide files whose names start with a dot.

For an update, replace the matching website files together. Preserve any real Stripe links or contact email you previously entered in `site-config.js`. Refresh the published page after deployment; if an older copy remains visible, use your browser’s reload-without-cache command.

These menu names were checked on **2026-11-22** against GitHub’s official [file upload instructions](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository) and [Pages publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Enable donations and contact email

The finished design includes a donation section, but actual payment processing needs the foundation’s Stripe Payment Link. Until a link is entered, the site clearly says online donations through this website are not available yet and offers the foundation’s social links. Monthly giving stays hidden until configured.

Open `site-config.js` in a text editor. Its settings are:

```js
window.LOLA_SITE_CONFIG = {
  donations: {
    oneTimeUrl: '',
    monthlyLinks: []
  },
  contactEmail: ''
};
```

- **`oneTimeUrl`:** paste the foundation’s live Stripe **Customers choose what to pay** link between the quotes. Use a **USD** link for the included $25, $50, and $100 suggestions; $50 is initially selected. The custom-amount choice opens the same link without a website-supplied preset.
- **`monthlyLinks`:** optional fixed monthly donation links, each with a clear `label` and its own `url`.
- **`contactEmail`:** optional public foundation email address. Leave it empty until the foundation provides the inbox it wants shown.

See [STRIPE-SETUP.md](STRIPE-SETUP.md) for the complete setup and examples. You only need public Payment Link URLs. Do not put a Stripe API key, password, or bank information into these website files.

## Lola’s story and photo collage

The **Lola’s story** section (`#lola`) combines a short introduction, an expandable fuller account, and a quotation attributed to Lola’s mother, Alyssa Aguilar, with the seven photographs supplied on **November 22, 2026**. The lakeside photo with the pink/red striped shirt is the large center image. The collage adjusts to fit smaller screens.

- **Click or tap a photo:** open it in the larger image viewer.
- **Previous / Next:** move through all seven photos using the viewer’s buttons, or the keyboard’s **Left Arrow** and **Right Arrow** keys.
- **Close:** use the close button or press **Escape**.
- **Keyboard:** use **Tab** to focus a collage photo, then **Enter** to open it.

The original photographs are kept unchanged in `assets/photos/`. The collage’s styling controls the on-page crop; opening a photo lets visitors see the larger image.

### Replace or add photos

1. Put foundation-approved photographs in `assets/photos/`.
2. In `index.html`, find the section with `id="lola"` and the photo link you want to change. Each gallery link has the class `memory-photo` and a `data-gallery-photo` attribute; keep both so it remains part of the viewer.
3. Update both the photo link’s `href` and its image’s `src` to the correct file path. The link is the larger-image source; `src` is the collage image source.
4. Update the image’s `alt` text and the link’s `data-caption` and accessible label so they describe the replacement photograph accurately. Update the image’s `width` and `height` to its actual dimensions. Keep names, dates, and locations grounded in information the foundation has supplied.
5. The first gallery photo is the featured `assets/photos/lola-lakeside.webp` image. Preserve its positioning classes when rearranging photos unless you intend to change the centerpiece. Add or rearrange photo links together with the layout rules in `gallery.css` when changing the number of pictures.
6. Upload the updated `index.html` and photos together. Include `gallery.css` and `gallery.js` whenever those files change.

If you overwrite a photo with a new image using the same filename, the existing paths continue to work; still update the description and caption. Keep the filename’s letter case consistent with its references.

## Butterflies and melody

- **Hover over the logo:** butterflies circle it while the pointer remains over it.
- **Click or tap the logo:** play the butterfly celebration and Lola’s melody.
- **Click again:** start a fresh animation and restart the melody. The audio does not stack into several simultaneous copies.
- **Stop the melody:** use the sound control or press **Escape**.
- **Keyboard:** use **Tab** to focus the logo, then **Enter** or **Space** to activate it.
- **Reduced motion:** the site respects the visitor’s operating-system preference and reduces animated movement. The melody remains available.

Sound begins after interaction; hovering does not start music. A native audio player is available when JavaScript is disabled.

### Change the melody

Replace `assets/lolas-jingle.mp3` with another MP3 using the same filename. This keeps all existing references working.

If you choose a different filename or folder, update **all three references** in `index.html`: the main audio element, the direct “open melody” fallback link, and the audio player inside `<noscript>`. Search for `assets/lolas-jingle.mp3` to find them. Upload the new file and updated HTML together.

Original melody supplied for this site: [Lola’s jingle](https://lolasorg.lolasbutterflyeffect.org/assets/lolas-jingle.mp3).

## Update text, images, and colors

| What you want to change | Where to edit |
| --- | --- |
| Foundation wording, headings, social links, photo captions, and page metadata | `index.html` |
| Stripe links and the optional public contact email | `site-config.js` |
| Colors, layout, spacing, and responsive styling | `styles.css` |
| Menu and donation-button behavior | `script.js` |
| Butterfly animation and melody controls | `butterflies.js` and `butterflies.css` |
| Photo collage layout and image viewer | `gallery.css` and `gallery.js` |
| Logo artwork | `assets/logo.webp` and `assets/logo.png`; keep both versions consistent |
| Lola’s seven photographs | `assets/photos/`; photo links, image paths, descriptions, and captions in the `#lola` section of `index.html` |
| Other artwork | Add the file to `assets`, then update the corresponding `<img>` path and descriptive `alt` text in `index.html` |
| Browser and mobile icons | `assets/favicon.png` and `assets/apple-touch-icon.png` |
| Melody | `assets/lolas-jingle.mp3` |

The current site uses the supplied foundation logo, the seven supplied photographs, and decorative SVG butterflies. Edit the introduction, expandable story, and quotation in the `#lola` section of `index.html` together. Preserve attribution to Alyssa’s account and the supplemental news links, and add only information the foundation approves or an identified source supports.

The core logo colors are yellow `#FAE03A`, orange `#F35A29`, and pale yellow `#FDF8AB`.

## Content sources and limits

The foundation’s mission wording and location draw on its official public profiles, checked **2026-11-22**:

- [Instagram: @lolasbutterflyeffectfoundation](https://www.instagram.com/lolasbutterflyeffectfoundation/)
- [Facebook: Lola’s Butterfly Effect Foundation](https://www.facebook.com/p/Lolas-Butterfly-Effect-Foundation-61580059497479/)

The accessible profile information supports the focus on childhood cancer, grief, child loss, love, play, and imagination, and the Oregon/Salem location. The mission wording comes from those profiles: “We uplift warriors through the power of play and imagination!” Seasonal profile artwork was available during the earlier public-profile research; the website uses the supplied original logo for its evergreen design.

The seven real-life photographs were supplied directly by the user on **November 22, 2026** and are included in `assets/photos/`. They were added after that initial research. The user requested the pink/red striped-shirt lakeside photo as the large center image. See [CONTENT-SOURCES.md](CONTENT-SOURCES.md) for provenance and remaining content needs.

**Lola’s story is primarily adapted from the user-provided family account attributed to Alyssa Aguilar**, supplied on **November 22, 2026**. That account also supports the description of the foundation’s gifts to a local children’s hospital. The [Arizona’s Family report](https://www.azfamily.com/2025/03/13/flagstaff-family-loses-daughter-battling-cancer-fungal-infection/) and its [InvestigateTV publication](https://www.investigatetv.com/2025/10/08/young-girl-battling-leukemia-dies-due-fungal-infection-while-immunocompromised/) provide supplemental reporting. They publish the same Micaela Marshall report, dated March 12 and October 8, 2025 respectively. No exact death date was supplied or inferred.

Additional grant offerings, dated events, impact figures, a public contact email, and a live donation destination still need confirmed details. The family account mentions a holiday food drive, but supplies no event date or wishlist URL, so the site does not advertise it as an active campaign. The website makes no promise of tax-exempt status or tax-deductibility. A Stripe payment receipt does not establish the foundation’s tax status.

## Files to keep together

| File or folder | Purpose |
| --- | --- |
| `index.html` | Website content |
| `privacy.html` | Notice describing this website’s features |
| `styles.css` | Visual design |
| `script.js` | Website interactions |
| `butterflies.css` and `butterflies.js` | Logo animation and audio interaction |
| `gallery.css` and `gallery.js` | Responsive photo collage and larger-image viewer |
| `site-config.js` | Owner settings |
| `assets/` | Local logo, artwork, icons, music, and the seven original photos in `assets/photos/` |
| `.nojekyll` | Serves the prepared static files directly on GitHub Pages |
| `README.md` | This owner guide |
| `STRIPE-SETUP.md` | Donation setup guide |
| `CONTENT-SOURCES.md` | Verified content, asset provenance, and remaining content needs |

No account signup, donation processing, or GitHub publication is performed by opening this ZIP. The donation section becomes active after you supply the foundation’s working payment links.
