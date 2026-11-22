# Content and asset notes

Prepared on November 22, 2026; updated the same day to include the family account attributed to Alyssa Aguilar, seven photographs, and two news links supplied directly by the user.

## Verified foundation information

The official public profile metadata supports these facts:

- Mission: “We uplift warriors through the power of play and imagination!”
- Focus: childhood cancer, grief, child loss, and big love.
- Location: Salem, Oregon (Facebook title); Oregon (profile descriptions).

Primary sources:

- https://www.instagram.com/lolasbutterflyeffectfoundation/
- https://www.facebook.com/p/Lolas-Butterfly-Effect-Foundation-61580059497479/

The site’s general headings, invitations, and values copy are original editorial writing based on those themes. The specific personal history and hospital-gift activity draw on the family account below.

## Sources for Lola’s story

**Primary source:** the user-provided written family account attributed to **Alyssa Aguilar**, supplied on **November 22, 2026**. It is the main source for Lola’s story, the fuller expandable treatment account, the mother’s quotation, and the foundation’s creation in Lola’s memory and described donations to a local children’s hospital. The website adapts this account with attribution; this guide does not repeat the biography.

**Supplemental sources:** the two news links supplied by the user and read on **November 22, 2026**:

- [Arizona’s Family report by Micaela Marshall](https://www.azfamily.com/2025/03/13/flagstaff-family-loses-daughter-battling-cancer-fungal-infection/), published **March 12, 2025 at 5:50 p.m. MST**. The URL contains March 13, but the article’s displayed publication date is March 12.
- [InvestigateTV publication of the report](https://www.investigatetv.com/2025/10/08/young-girl-battling-leukemia-dies-due-fungal-infection-while-immunocompromised/), published **October 8, 2025**, with the same author, report text, and KTVK/KPHO copyright.

These are two publications of the same report, not independent accounts of a new event. No exact death date was supplied in the family account, and the website does not infer one from relative wording such as “one week ago” in the later news publication. Medical history is presented as part of the attributed family story; the site adds no medical advice or unsupported clinical claims.

## User-supplied photographs

The user supplied seven real photographs on **November 22, 2026** for the website’s **Lola’s story** section (`#lola`). The original image data is copied unchanged into `assets/photos/`, using descriptive filenames. The collage features the requested lakeside photo of Lola wearing a pink/red striped shirt as its large center image, with the other six photos around it.

| Included image path | Placement |
| --- | --- |
| `assets/photos/lola-lakeside.webp` | Large center image; first gallery link |
| `assets/photos/lola-snow.png` | Surrounding collage image |
| `assets/photos/lola-shared-smile.png` | Surrounding collage image |
| `assets/photos/lola-present.png` | Surrounding collage image |
| `assets/photos/lola-butterflies.png` | Surrounding collage image |
| `assets/photos/lola-glasses.png` | Surrounding collage image |
| `assets/photos/lola-rainbow.png` | Surrounding collage image |

The lakeside upload was named `Thumbnail.png` but contained WebP image data, so its website filename uses `.webp`. Its image data was not converted.

Visitors can open a photo in the image viewer, move between photos with the previous/next buttons or Left/Right Arrow keys, and close the viewer with its close button or Escape. `gallery.css` controls the responsive collage and `gallery.js` controls the viewer. The source-image files remain unchanged even when the collage displays a crop.

Photo descriptions stay grounded in visible details and supplied information. The photographs’ source is the user’s uploads; the story primarily draws on Alyssa’s family account, with the identified news report as additional context. Captions do not infer dates, named events, medical history, or foundation services from the images.

## Earlier research and remaining content needs

The initial public-profile research established the mission, themes, and location but did not expose the full story or social posts. The later family account, photographs, and news links now support the personal story and described hospital donations. Additional grants, scheduled events, impact figures, a current donation destination, and an official contact email still need confirmed details. No tax status or registration claim was verified.

The family account mentions a holiday food drive but provides no event date or wishlist URL. It is therefore not advertised as an active campaign. Add campaign details only when the foundation supplies a current date and destination.

The downloadable social profile images were seasonal illustrated logos. The evergreen site uses the original supplied logo. Social posts, impact numbers, testimonials, and event listings were not invented for this build.

To expand the sourced story or update the photo collection, use foundation-approved text and images with clear sources for additional facts. Put gallery images in `assets/photos/`; update each `.memory-photo` link’s `href`, `data-caption`, and accessible label, and its image’s `src`, `alt`, `width`, and `height` in `index.html`. Preserve the `data-gallery-photo` attribute so the image remains in the viewer. The community links lead directly to the foundation’s own social pages.

## Original assets and inspiration

- Main logo, favicon, and touch icon: derived from the user-supplied Lola’s Butterfly Effect Foundation logo PDF; original artwork preserved.
- Seven photographs: supplied directly by the user on November 22, 2026, included unchanged in `assets/photos/`; the lakeside striped-shirt image is featured at the user’s request.
- Melody: the user-specified audio from https://lolasorg.lolasbutterflyeffect.org/assets/lolas-jingle.mp3, bundled as `assets/lolas-jingle.mp3`.
- Decorative butterflies and interface icons: original SVG/CSS in the website source.
- Layout inspiration: the user-uploaded National Pediatric Cancer Foundation homepage HTML. The reference informed navigation, section rhythm, and prominence of giving. Its text, photos, research claims, statistics, badges, logos, and organizational details were not reused.

## Owner settings

`site-config.js` contains public Stripe Payment Links and an optional contact email. Those fields are intentionally empty until the foundation supplies them. The website’s contact and social links work in the meantime.

`privacy.html` describes the supplied static site’s features. Keep it accurate if you later add analytics, forms, embedded feeds, or other services, and add any foundation-approved policies needed for your actual operations.

See `STRIPE-SETUP.md` for current official Stripe sources and setup instructions.
