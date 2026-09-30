# Date Invite design direction

## Ground truth
The supplied video is the visual reference. Recreate only the pink retro 8-bit date invitation website, not the laptop, browser chrome, or builder UI around it.

## Design movement
Warm pixel-romance: an intentionally handmade, game-like love note with chunky pixel borders, candy pink layers, and tiny floating details.

## Core principles
- The romantic story is the interface: each screen is a beat in the invitation.
- Keep the main action obvious and playful.
- Preserve the reference's pink/white contrast and 8-bit rhythm.
- Every control is usable with keyboard focus and readable on small screens.

## Color philosophy
Deep berry ink (#5b183f) for text, rose shadows (#b52263), hot pink (#f74e9a), candy pink (#ff8cbd), blush (#ffd8ea), and cloud white (#fffafc). Use gradients only in the sky; all key UI surfaces stay flat and high-contrast.

## Layout paradigm
A centered mobile-first game board constrained to a 560px reading column, with a full-bleed illustrated sky and mountains. Screens crossfade/slide in place.

## Signature elements
Pixel scallop borders, cat and bear SVG pixel art, floating hearts/stars, a lower mountain silhouette, a tiny status chip, and a love_note.txt modal.

## Interaction philosophy
A little mischief should reward trying: the No button escapes, guilt copy changes, and YES+ becomes more assertive. After that, the flow is calm and legible.

## Animation
Slow sky drift, bobbing art, floating sparkles, CTA pulse, and 150–300ms screen transitions. Respect prefers-reduced-motion.

## Typography system
Use a system monospace fallback with `font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`; headings use uppercase letter spacing and a pixel shadow. Body copy is compact and friendly.

## Brand essence
A tiny, sincere, slightly mischievous digital love letter.

## Wordmark/logo
A simple full-bleed square icon: hot pink ground with a white pixel heart and berry outline, reused as favicon and as the small badge in the header.

## Signature brand color
Hot pink #f74e9a.
