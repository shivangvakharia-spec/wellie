# Wellie Animal Food PDP — Complete Figma-to-Shopify Implementation

## Figma Access and Source of Truth

The Figma design is available at:

https://www.figma.com/design/Wb8TZIgBie0K489tMBdv4s/On-boarding?node-id=0-1&p=f&t=nd0SwLEHMnTem9pZ-0

Use the Figma MCP remote server to inspect this design.

I have view access to the Figma file but do not have Figma Dev/Edit access.

This is a READ-ONLY design reference.

Do NOT attempt to modify, write to, or create anything inside the Figma file.

Use the Figma MCP only to inspect:

- frames
- nodes
- layers
- assets
- dimensions
- spacing
- typography
- colors
- components
- layout structure
- responsive designs
- interactions/prototypes where accessible

The Figma design is the source of truth for visual appearance.

Shopify is the source of truth for product, variant, store, commerce and merchant-managed content.

If the Figma MCP cannot access the file, STOP and tell me that access is insufficient. Do not approximate the design from assumptions or invent missing design details.

## 1. Objective

Build a **complete, production-quality Shopify Online Store 2.0 Product Detail Page (PDP)** for the Wellie animal-food product line.

The final result must:

1. Visually match the provided Figma design as closely as possible — effectively pixel-accurate.
2. Be fully responsive.
3. Use Shopify-native Liquid, JSON templates, sections, blocks, product/variant objects, metafields, metaobjects, Shopify menus, and Shopify APIs where appropriate.
4. Be fully functional, not merely a static visual recreation.
5. Be merchant-editable through the Shopify Theme Editor wherever the data should be merchant-controlled.
6. Avoid hardcoding product-specific content into Liquid.
7. Avoid creating metafields/metaobjects when Shopify already provides the required data through its standard objects.
8. Keep presentation, content/data, and interactive behavior properly separated.
9. Produce clean, maintainable, reusable code rather than one enormous monolithic Liquid file.
10. Preserve Shopify's Online Store 2.0 architecture.

### Figma source

Figma file:

`On-boarding`

Figma file key:

`Wb8TZIgBie0K489tMBdv4s`

Figma node:

`0-1`

Use the connected **Figma MCP server** as the authoritative source for the visual implementation.

Do not rely only on the screenshot or on assumptions about the design.

Before implementing each section:

- Inspect the relevant Figma frame/node using the Figma MCP.
- Inspect exact dimensions.
- Inspect spacing.
- Inspect typography.
- Inspect font sizes, weights, line heights and letter spacing.
- Inspect colors.
- Inspect borders, radii and shadows.
- Inspect image/video assets.
- Inspect desktop/mobile layouts if available.
- Inspect alignment and responsive behavior.
- Inspect repeated components.
- Inspect interactions/prototypes where available.
- Reuse Figma assets where possible instead of recreating them.
- Do not invent visual behavior when the Figma provides enough information to determine it.

The Figma is the source of truth for **visual appearance**.

Shopify is the source of truth for **product/store data and commerce functionality**.

---

# 2. Existing Shopify architecture

Work within the existing Shopify theme rather than creating a separate web application.

The animal-food PDP should use the existing animal-food product template and section architecture.

The current animal-food PDP architecture includes:

- `templates/product.animal-food.json`
- `sections/animal-food-product.liquid`

If these files already exist, extend/refactor them rather than unnecessarily creating a second competing implementation.

Use additional section/snippet/asset files where that creates a cleaner architecture.

Do not put the entire PDP into one huge Liquid file if it can reasonably be separated into reusable sections/snippets.

---

# 3. Core Shopify data-model principles

Follow these rules throughout the implementation.

## Standard Shopify data

Use Shopify's standard objects whenever the information already exists there.

Examples:

- `product.title`
- `product.description`
- `product.media`
- `product.featured_media`
- `product.variants`
- `product.options_with_values`
- selected/current variant
- product price
- variant compare-at price
- product availability
- product URL
- product images

Do not duplicate standard Shopify product information into metafields.

---

## Section settings

Use section settings when content/configuration belongs directly to one section.

Examples:

- Section heading
- Static marketing text
- Image specific to the section
- CTA text
- CTA URL
- Optional section-specific configuration
- Fixed certification logos used only by this PDP
- Check-with-my-vet image/text

---

## Blocks

Use blocks when the merchant should be able to:

- add items
- remove items
- reorder items
- configure repeated content

Examples:

- announcement messages
- promotional-strip messages
- reviews displayed by the section
- videos
- FAQ entries
- potentially certification logos if a variable number is desired

Do not confuse a block with an HTML element.

A block is Shopify's merchant/content structure.

A `<div>`, `<span>`, etc. is only HTML presentation structure.

---

## Metafields

Use product/collection metafields for product- or collection-specific information that is not already part of Shopify's standard object.

Examples:

- short product description
- product-specific badge/highlight when it is simple product data
- references to ingredient metaobjects
- references to review metaobjects
- feeding-guide reference
- benefits references
- journey references
- dog-suitability references

Prefer typed metafield definitions and references rather than storing complicated structured content as arbitrary strings.

---

## Metaobjects

Use metaobjects when the content represents a distinct, structured entity that should exist independently and potentially be reusable.

Examples:

- Review
- Ingredient
- Journey month
- Dog suitability item
- Benefit
- Feeding guide, if sufficiently structured

A metaobject should describe the entity itself.

The product/collection should determine which entities belong to it through references.

For example:

`Product -> list of Ingredient metaobject references`

rather than putting product-specific information directly into the Ingredient metaobject.

This allows the same metaobject to be reused by multiple products.

---

# 4. Required page structure

Implement the entire page in this order.

---

# SECTION 1 — Announcement Bar

Create a dedicated announcement-bar section.

### Data

The announcement bar itself should be a Shopify section.

Each announcement/message should be a block.

Conceptually:

- Announcement Bar section
  - Announcement block
    - Text
    - Optional link
  - Announcement block
    - Text
    - Optional link
  - etc.

The merchant must be able to:

- add announcements
- remove announcements
- reorder announcements
- edit announcement text

The link should be optional.

For the Figma design, the announcement does not need to redirect anywhere unless the merchant configures a link.

### Behavior

If multiple announcements exist, implement the visual rotation/marquee behavior shown in the Figma.

Prefer CSS animation for a simple continuous marquee.

Use JavaScript only where necessary for interaction/state.

### Styling

Use the Figma as the visual source of truth.

Allow sensible merchant/theme customization where appropriate, but do not expose every CSS property as a Theme Editor setting.

Structural styling belongs in CSS.

---

# SECTION 2 — Header

Create/reuse a proper Shopify header section.

The visual structure should be approximately:

- Left: Wellie logo
- Center: navigation/menu
- Right: search, account/profile, cart

### Logo

Use a merchant-selectable image.

Prefer a global theme logo setting if the logo is shared across the website.

If the existing theme already has a global logo setting, reuse it instead of creating a duplicate.

### Navigation

Use Shopify's Navigation/Menu system.

Do not hardcode menu items in Liquid.

The header should receive a `link_list`/menu setting and render the configured menu.

### Icons

Search, account and cart are UI/functionality icons.

Do not make the merchant upload arbitrary icons unless there is a genuine design-system requirement.

Use SVG/icon snippets or the theme's existing icon system.

Connect them to the appropriate Shopify functionality:

- Search → store search
- Account → customer account
- Cart → cart

### Header styling

Match the Figma exactly.

Use theme color schemes/settings where appropriate.

### Sticky behavior

Implement sticky behavior with CSS/JS as required by the Figma.

If useful, expose an optional "Enable sticky header" setting.

The sticky behavior itself is implementation logic, not product data.

---

# SECTION 3 — Main Product Information / PDP Hero

This is the primary product section.

It contains:

- Product media gallery
- Product title
- Price
- Compare-at price
- Product badges/highlights
- Variant/pack-size selector
- Quantity selector
- Add to Cart
- Product-specific short information

## Product media

Use:

- `product.media`
- `product.featured_media`

Generate the gallery server-side with Liquid.

Do not hardcode image URLs.

### Thumbnail behavior

Use JavaScript only for the interaction.

Requirements:

1. Render all relevant product media using Liquid.
2. Render corresponding thumbnails.
3. The first/current media is active initially.
4. Clicking a thumbnail changes the main displayed media.
5. The clicked thumbnail becomes visually active.
6. The previous thumbnail loses active state.
7. Support image/video/product media appropriately.
8. Maintain accessibility.
9. Work with keyboard navigation.
10. Work on mobile.

Separate responsibilities:

- Liquid → generates product media markup.
- JavaScript → changes active media.
- CSS → displays active/inactive states.

Do not make opacity itself the source of truth for active state. Use an explicit active class/state and let CSS determine its appearance.

---

## Product title

Use:

`product.title`

Do not create a metafield for the product title.

---

## Price

Use the currently selected/current variant price.

Do not hardcode the price.

The displayed price must update when the customer changes variant/pack size.

---

## Compare-at price

Use the currently selected variant's compare-at price.

Only display the compare-at price when appropriate.

Style it exactly as shown in Figma, including the strike-through treatment.

The price area must react to variant changes.

---

## Product badges / labels

Do not assume every badge needs a metafield.

Determine what each badge represents.

If it is derived from Shopify data, derive it.

Examples:

- Sale → compare-at price > price
- Sold out → variant availability
- Other product-specific marketing label → product metafield

If a badge represents reusable structured content, consider a metaobject.

Inspect the Figma and existing product data before deciding.

---

## Variant / pack-size selection

Use Shopify product options and variants.

Do not create a fake custom pack-size data structure if Shopify variants already represent the pack sizes.

Use:

- `product.options_with_values`
- `product.variants`
- selected/current variant

When a variant is selected, update all dependent PDP information:

- price
- compare-at price
- availability
- selected variant ID
- relevant media if applicable
- Add to Cart state

Use Shopify's normal product-form/variant-selection architecture.

Do not render essential initial product content exclusively through JavaScript.

---

## Quantity selector

The quantity is customer/runtime state, not a metafield or metaobject.

Implement:

- decrement
- current quantity
- increment
- sensible minimum
- respect Shopify quantity rules where applicable

The selected quantity must be submitted with the selected variant.

---

## Add to Cart

Use a native Shopify product form and/or Shopify Cart AJAX API.

The important data is:

- selected variant ID
- quantity

Do not hardcode product or variant IDs.

Add-to-cart must actually work.

Handle:

- loading state
- success state
- error state
- unavailable/sold-out state

If the theme has an existing cart drawer/cart bubble, integrate with it rather than creating a second unrelated cart implementation.

If the existing theme does not have AJAX cart behavior, implement it cleanly using Shopify's locale-aware Cart API.

---

# SECTION 4 — Promotional Pink Strip

Create a dedicated promotional-strip section.

Use blocks for the repeated messages.

Each block should contain:

- Text
- Optional image/icon if required by Figma

The merchant should be able to:

- add messages
- remove messages
- reorder messages
- edit message text

Implement the scrolling/marquee behavior using CSS where possible and JavaScript only when necessary.

Match:

- background
- typography
- spacing
- speed
- direction
- repetition
- mobile behavior

to the Figma.

The strip does not need to be clickable unless a link is explicitly configured.

---

# SECTION 5 — Hear from our Customers

Create a customer-review/testimonial section.

### Heading

Use a section text setting.

Default it to the Figma heading:

`Hear from our Customers!`

But do not hardcode it in the markup.

### Review data

Use Review metaobjects.

A Review metaobject should contain appropriate structured fields such as:

- Customer name
- Rating
- Review text
- Customer image/avatar if required
- Optional date
- Optional supporting information

The same Review metaobject must be reusable across multiple products.

Do not duplicate the review entry just because it appears on multiple PDPs.

The relationship should be something like:

`Product -> reviews -> list of Review metaobject references`

### Display

The section can use blocks or a metaobject-list configuration to determine which reviews appear and their order.

Do not store the actual review text directly inside each visual card if the same review needs to be reusable.

Match the Figma review-card layout exactly.

---

# SECTION 6 — Love at First Bite

Create a dedicated section.

### Heading

Merchant-editable section setting.

### Videos

Use repeatable video blocks.

Each block should reference/select a video.

The merchant should be able to:

- add video
- remove video
- reorder videos

Use Shopify's supported video/video URL/media mechanisms according to the actual Figma assets and existing theme architecture.

Match the Figma's video card dimensions, crop, radius, spacing and responsive behavior.

---

# SECTION 7 — Product Description

Display:

`product.description`

Do not duplicate the product description into a metafield.

Render the product description safely and preserve intended formatting.

Match the Figma typography and width.

---

# SECTION 8 — Premium Ingredients

Create a Premium Ingredients section.

### Heading

Use a section setting.

### Ingredient data

Create an Ingredient metaobject with fields such as:

- Name
- Image
- Description
- Tags/list of tag text

The product should reference a list of Ingredient metaobjects.

Conceptually:

`Product -> ingredients -> Ingredient metaobject[]`

The same Ingredient metaobject can be reused by multiple products.

### Cards

Display each ingredient as a card.

The card should obtain:

- image
- name
- description
- tags

from the referenced Ingredient metaobject.

The section should support the number/order of ingredients required by the product.

Match the Figma precisely.

---

# SECTION 9 — Feeding Guide

Create a Feeding Guide section.

This content is product-specific.

Use a structured Feeding Guide metaobject if the data contains structured rows/fields such as:

- weight range
- recommended quantity
- frequency
- age/category
- notes

Then attach the Feeding Guide to the product through a metafield reference.

If the actual data is sufficiently simple, use a typed product metafield instead.

Do not create a metaobject merely for the sake of using one.

The final implementation should reflect the actual structure of the feeding guide shown in the Figma.

Match the table/grid precisely.

---

# SECTION 10 — Benefits Your Pet Can Feel

Create the benefits section.

The section is product/food-collection specific.

The four benefits shown in the Figma should be represented as structured content.

Prefer a Benefit metaobject if each benefit is a reusable entity.

Possible fields:

- Heading
- Description
- Icon/image if needed

Then use a product or collection metafield containing a list of Benefit metaobject references.

If the benefit content is truly unique and simple for each product, a structured metafield/list may be sufficient.

Do not unnecessarily duplicate benefit entities.

Match the pink background, decorative artwork, typography, iconography and four-point layout exactly.

---

# SECTION 11 — Start Your Journey With Wellie

This section contains structured journey information.

The Figma shows:

- Month
- Heading for each month
- Points belonging to that heading

This is structured repeated content and should use metaobjects rather than one giant text field.

Use a Journey Month/Phase metaobject.

Possible structure:

`Journey Phase`
- Month
- Heading
- Points/list of text

If the Figma reveals multiple headings per month, model the data as separate structured entities rather than forcing multiple unrelated headings into one field.

The product/food collection should reference the appropriate journey entries.

The section should iterate through the structured journey data and render it in the exact Figma layout.

The image shown in this section should be configurable through an image picker or an appropriate content reference.

Do not hardcode the product-specific journey text into Liquid.

---

# SECTION 12 — Is This Right For My Dog?

This section contains repeated structured items.

Each item has:

- Small image
- Heading
- Description

Create a Dog Suitability Item metaobject.

Possible fields:

- Image
- Heading
- Description

The relevant product/food collection should reference the appropriate list of suitability items.

The section should iterate over those entries and render them exactly like the Figma.

Do not hardcode the individual dog-suitability content into Liquid.

---

# SECTION 13 — You Might Also Like

Create a related-products/recommendations section.

Each card should represent a real Shopify product object.

Each product card should display appropriate product data such as:

- Product image
- Product title
- Price
- Compare-at price if applicable
- Product badge if applicable
- Product URL
- Add to Cart button

Do not create a metaobject just to represent a product card.

The product card should receive a Shopify product object and render its data.

## Recommendation source

Prefer Shopify's native product recommendation system for automatic related-product recommendations.

Use Shopify's Product Recommendations API / recommendations object where appropriate.

The current product is the context.

Conceptually:

`Current Product -> Shopify recommendations -> Product[] -> Product cards`

If the design/business requirement requires merchant-controlled recommendations, provide an optional `product_list` setting or equivalent merchant-selected product configuration.

Do not manually query unrelated product objects in an inefficient way.

## Add to Cart

Each product card's Add to Cart button must add the correct variant.

For products with a simple/default purchasable variant, use the appropriate first/default available variant.

If the product requires variant selection, do not silently add an arbitrary unavailable variant.

Handle unavailable products gracefully.

---

# SECTION 14 — Check With My Vet

Create a dedicated section.

This does NOT need a metaobject.

Use section settings for:

- Heading
- Body text
- Image
- Optional CTA text
- Optional CTA link

The image should use an image picker.

Match the Figma precisely.

---

# SECTION 15 — FAQ

Create a dedicated FAQ section.

The heading should be a section setting.

The FAQ entries should be section blocks.

Each FAQ block should contain:

- Question
- Answer

The merchant should be able to:

- add FAQ
- remove FAQ
- reorder FAQ
- edit question
- edit answer

The first FAQ should initially be open if that matches the Figma.

The remaining FAQs should initially be collapsed.

Implement accessible accordion behavior:

- keyboard accessible
- proper button semantics
- `aria-expanded`
- associated content IDs
- smooth open/close if present in Figma

The FAQ content may be shared/common across the website, but that does not mean it should be global theme settings. Repeated question/answer content belongs naturally in blocks.

---

# SECTION 16 — Certified & Trusted

Create a dedicated section.

The Figma contains a row of certification/trust logos.

Because these logos are only required on this PDP and are not necessarily reusable structured entities, section settings with image pickers are acceptable.

Use individual image-picker settings corresponding to the number of logo positions required by the Figma.

For example:

- Certification logo 1
- Certification logo 2
- Certification logo 3
- etc.

Do not create a Certification metaobject unless the actual requirements later indicate that certifications need to become reusable structured entities.

The section should allow empty logo slots without creating broken images.

Match:

- green background
- decorative shapes
- heading
- logo sizes
- spacing
- alignment
- responsive wrapping/scrolling

exactly to the Figma.

---

# SECTION 17 — Securely Pay Using

Create the payment-information section.

### Heading

Use a section setting.

Default:

`Securely pay using`

### Payment icons

Do not manually upload arbitrary payment logos if Shopify already exposes the store's enabled payment types.

Use Shopify's payment configuration:

`shop.enabled_payment_types`

and the appropriate Shopify payment-icon filter.

Only render payment methods that are actually enabled/available.

This is important because the payment icons should reflect the actual store configuration rather than merely reproducing static Figma artwork.

### COD text

The Figma contains:

`Oh! and cash on delivery too :)`

Render this as merchant-editable text if desired.

If the implementation later needs to conditionally show it based on actual COD availability, do not simply hardcode it as always true.

Match the Figma's typography, alignment and spacing.

---

# SECTION 18 — Footer

Use the Figma as the visual source of truth for the footer.

Do not create a completely separate footer system if the existing theme already contains a footer.

Reuse/refactor the existing footer where appropriate.

Expected content visible in the Figma includes:

- Wellie logo
- Brand description
- Social media icons/links
- Navigation columns
- Footer links
- Newsletter/contact area if present in the Figma
- Copyright/footer text
- Footer background and typography

Use Shopify menus for navigation columns rather than hardcoding links.

Use theme settings for global brand assets such as the logo and social links where appropriate.

Make the number of navigation columns configurable in a way consistent with the existing theme architecture.

Match the Figma exactly.

---

# 19. Global styling and design system

Do not create independent arbitrary styling for every section.

First inspect the Figma and determine the design tokens.

Extract:

- primary colors
- secondary colors
- background colors
- text colors
- accent colors
- font families
- font weights
- heading sizes
- body sizes
- button styles
- border radii
- shadows
- spacing scale
- container widths

Where values are genuinely global, implement them through theme settings/CSS variables.

For section-specific styling, use section settings only where merchant customization provides real value.

Do not expose every CSS property to the merchant.

The Theme Editor should remain understandable.

---

# 20. Responsive implementation

The PDP must be fully responsive.

Do not simply scale down the desktop design.

Use the Figma's mobile/tablet frames if available through Figma MCP.

Inspect how each section changes at different viewport sizes.

Pay special attention to:

- Header/navigation
- Product gallery
- Product information
- Variant selectors
- Quantity/Add to Cart
- Review cards
- Video cards
- Ingredient cards
- Feeding table
- Benefits grid
- Journey timeline
- Dog suitability cards
- Related products
- FAQ
- Certification logos
- Payment icons
- Footer

If mobile Figma frames exist, treat them as authoritative.

If a responsive state is not explicitly shown, infer it conservatively from the desktop design while maintaining usability and visual consistency.

---

# 21. Performance requirements

Do not sacrifice performance for visual accuracy.

Requirements:

- Use responsive image sizes.
- Use `image_url`/`image_tag` appropriately.
- Lazy-load below-the-fold images where appropriate.
- Do not load every asset at maximum resolution.
- Avoid unnecessary JavaScript.
- Avoid rendering the same data multiple times.
- Keep essential content server-rendered with Liquid.
- Use JavaScript to enhance interaction rather than render the entire PDP client-side.
- Avoid external libraries unless genuinely necessary.
- Avoid unnecessary network requests.

---

# 22. Accessibility requirements

Implement:

- semantic HTML
- proper heading hierarchy
- alt text for meaningful images
- decorative images marked appropriately
- keyboard-accessible controls
- visible focus states
- accessible accordions
- accessible gallery controls
- accessible buttons
- proper labels for quantity/variant selectors
- `aria-expanded` for accordion controls
- `aria-current` or equivalent state for active gallery thumbnails where appropriate
- sufficient contrast
- no interaction that depends solely on hover

Do not use `<div>` elements as buttons.

---

# 23. JavaScript architecture

Do not create one giant JavaScript file containing unrelated PDP logic.

Separate behavior logically.

At minimum, isolate or clearly modularize:

- product gallery
- variant selection
- quantity control
- add-to-cart
- announcement/promo marquee
- FAQ accordion
- related-product interactions if needed

Use section-scoped selectors where possible so multiple instances do not conflict.

Use `section.id`/`block.id` or data attributes where appropriate.

Do not rely on globally duplicated IDs.

---

# 24. Liquid architecture

Keep Liquid readable.

Use snippets for repeated UI where appropriate.

Examples:

- product card
- icon
- price
- rating
- gallery media
- certification logo
- payment icon

Avoid duplicating the same markup across multiple sections.

Do not put unrelated section styles and JavaScript into a single massive file.

Use section-specific CSS/JS when appropriate.

Shopify supports section-specific stylesheet/javascript assets; use the theme's existing conventions where available.

---

# 25. Theme Editor requirements

Every section that should be merchant configurable must have a proper `{% schema %}`.

The schemas must be valid JSON.

Use meaningful:

- setting IDs
- setting labels
- block names
- block types
- defaults
- presets

Do not use invalid JSON.

Do not use duplicate setting IDs.

Do not create unnecessarily complicated nested configuration.

Where blocks are used, include `{{ block.shopify_attributes }}` in the block's rendered root element so the Theme Editor can correctly identify blocks.

Make the default/preset state resemble the Figma as closely as possible.

---

# 26. Required data model

Implement/document the following conceptual Shopify data model.

## Product standard fields

Use Shopify standard product/variant fields for:

- title
- description
- media
- variants
- options
- price
- compare-at price
- availability
- URL

---

## Product metafields

Create/document typed product metafields such as:

### `custom.short_description`

Type:

single-line text or multi-line/rich text depending on the exact Figma content.

Purpose:

Short PDP-specific description.

---

### `custom.reviews`

Type:

list of Review metaobject references.

Purpose:

Associate reusable reviews with a product.

---

### `custom.ingredients`

Type:

list of Ingredient metaobject references.

Purpose:

Associate ingredients with a product.

---

### `custom.feeding_guide`

Type:

Feeding Guide metaobject reference, if the final data structure warrants a metaobject.

---

### `custom.benefits`

Type:

list of Benefit metaobject references, if benefits are modeled as reusable entities.

---

### `custom.journey`

Type:

list of Journey Phase/Month metaobject references.

---

### `custom.dog_suitability`

Type:

list of Dog Suitability Item metaobject references.

---

# 27. Required metaobjects

Create/document the following metaobject definitions.

## Review

Fields:

- `customer_name`
- `rating`
- `review_text`
- `customer_image` — optional
- `date` — optional

The same Review entry must be reusable across products.

Do not duplicate review records simply because multiple products use them.

---

## Ingredient

Fields:

- `name`
- `image`
- `description`
- `tags` — list of text

Product references the Ingredient entries.

---

## Feeding Guide

Use only if the feeding guide is sufficiently structured.

Possible fields:

- `title`
- `rows` or appropriate structured representation
- `notes`

If row-level data needs its own entity, use a separate Feeding Guide Row metaobject rather than storing a giant HTML string.

---

## Benefit

Possible fields:

- `heading`
- `description`
- `icon`/`image` if required

---

## Journey Phase / Month

Fields:

- `month`
- `heading`
- `points` — list of text

If the Figma shows multiple headings per month, refactor the data model appropriately rather than forcing it into one field.

---

## Dog Suitability Item

Fields:

- `image`
- `heading`
- `description`

---

# 28. Important distinction: block vs metaobject

Follow this rule strictly.

Use a block when the merchant is primarily arranging content inside a section.

Example:

`FAQ Block -> question + answer`

Use a metaobject when the content itself is a meaningful structured entity.

Example:

`Review -> customer + rating + text + image`

Use both when appropriate.

Example:

`Review Section -> blocks -> Review metaobject references`

This allows:

- reusable content
- merchant-controlled ordering
- section-specific selection

---

# 29. Related products implementation

For "You Might Also Like":

1. Use Shopify's native recommendations where possible.
2. Render real product objects.
3. Reuse the theme's product-card component if one exists.
4. If no product-card component exists, create a reusable snippet.
5. Add functional Add to Cart behavior.
6. Do not hardcode product IDs.
7. Provide a merchant-controlled fallback if appropriate.
8. Do not create a metaobject for ordinary products.

---

# 30. Figma-to-code workflow

Follow this workflow rather than immediately writing code.

## Phase 1 — Inspect

Use Figma MCP to inspect the entire PDP.

Create an internal inventory of every visible component.

For each component determine:

- Figma node
- dimensions
- content
- typography
- color
- spacing
- asset
- responsive behavior
- interaction
- Shopify data source
- Shopify implementation type

Do not start coding until the page structure is understood.

---

## Phase 2 — Architecture

Map each component to:

- section
- section setting
- block
- product object
- variant object
- metafield
- metaobject
- collection
- menu
- Shopify payment configuration
- CSS
- JavaScript
- customer state

Do not create data structures simply because something appears visually on the page.

---

## Phase 3 — Build

Implement the sections from top to bottom.

Build reusable snippets/components where appropriate.

Use the Figma assets.

Use Shopify-native objects and APIs.

---

## Phase 4 — Functional testing

Test:

### Product

- correct title
- correct images
- thumbnails
- active gallery state
- variants
- pack sizes
- price updates
- compare-at price updates
- availability
- quantity
- Add to Cart

### Reviews

- correct review data
- reusable reviews
- correct ordering

### Videos

- playback
- responsive behavior

### FAQ

- open/close
- keyboard behavior
- accessibility

### Related products

- correct recommendations
- correct product cards
- Add to Cart works

### Cart

- selected variant added
- correct quantity added
- cart count updates
- cart drawer integration works if present

---

# 31. Visual QA

After implementation, compare the rendered Shopify PDP against the Figma.

Do not stop when the page is merely "similar."

Perform a section-by-section comparison:

1. Announcement bar
2. Header
3. Main PDP
4. Promotional strip
5. Customer reviews
6. Love at First Bite
7. Product description
8. Premium Ingredients
9. Feeding Guide
10. Benefits
11. Start Your Journey
12. Is This Right For My Dog
13. You Might Also Like
14. Check With My Vet
15. FAQ
16. Certified & Trusted
17. Securely Pay Using
18. Footer

Check:

- widths
- heights
- vertical spacing
- horizontal spacing
- font sizes
- font weights
- line heights
- colors
- borders
- radii
- image crops
- image dimensions
- card dimensions
- alignment
- responsive behavior
- animations
- hover states
- active states

Fix discrepancies rather than explaining them away.

---

# 32. Do not fake data

If Shopify data does not yet exist for a section:

- create the required schema/data model
- provide sensible empty states
- use the Figma only for visual placeholder/default content where appropriate
- clearly document what the merchant needs to populate

Do not hardcode fake product data into production Liquid.

Do not create fake product IDs.

Do not pretend a metaobject exists if it has not been created.

---

# 33. Shopify Admin data setup

Theme code alone cannot magically populate all custom merchant data.

If you have Shopify Admin API/MCP access, create the required metafield/metaobject definitions and sample entries.

If you do not have Shopify Admin API/MCP access:

1. Implement the theme code expecting the correct definitions.
2. Create a `SHOPIFY_DATA_SETUP.md` document.
3. Document every metafield definition.
4. Document every metaobject definition.
5. Document field names and types.
6. Document which product/collection references each definition.
7. Provide exact instructions for creating/populating them in Shopify Admin.

Do not silently substitute hardcoded data for missing Shopify data.

---

# 34. Existing theme compatibility

Before creating anything new, inspect the existing theme.

Reuse existing:

- header
- footer
- product-card
- icons
- cart drawer
- typography
- color schemes
- buttons
- utility snippets
- responsive utilities

where appropriate.

Do not duplicate functionality that already exists.

If the existing theme's architecture conflicts with the Figma, refactor carefully rather than creating two competing systems.

---

# 35. Final deliverables

The final implementation should include:

1. Complete animal-food PDP JSON template.
2. Complete PDP section(s).
3. Supporting snippets.
4. Supporting CSS.
5. Supporting JavaScript.
6. Any required theme settings.
7. Any required section/block schemas.
8. Metafield/metaobject data model documentation.
9. Shopify Admin setup documentation if Admin API/MCP access is unavailable.
10. No broken Liquid.
11. No invalid JSON.
12. No console errors.
13. No broken images.
14. No broken links.
15. Fully functional Add to Cart.
16. Fully functional variant selection.
17. Fully functional gallery.
18. Fully functional FAQ accordion.
19. Fully functional recommendations.
20. Responsive implementation matching the Figma.

---

# 36. Definition of done

Do not consider this task complete merely because the code compiles.

The task is complete only when:

- The PDP visually matches the Figma.
- The entire page from announcement bar to footer is implemented.
- All major content is connected to the correct Shopify data source.
- Product data comes from Shopify product/variant objects.
- Product-specific custom content comes from metafields/metaobjects where appropriate.
- Reusable structured entities use metaobjects.
- Repeatable section content uses blocks.
- Merchant-editable content is exposed through section/block/theme settings.
- Navigation uses Shopify menus.
- Payment icons reflect Shopify's enabled payment methods.
- Product recommendations use Shopify product objects/recommendations.
- Add to Cart works with the correct selected variant and quantity.
- Variant changes update price and other variant-dependent UI.
- Gallery interactions work.
- FAQ accordion works.
- Responsive behavior works.
- Accessibility requirements are satisfied.
- No unnecessary data duplication exists.
- No product-specific production content is hardcoded.
- No unnecessary JavaScript is used.
- There are no Liquid/schema/JSON errors.
- There are no browser-console errors.
- The final result has been visually compared against the Figma and discrepancies have been corrected.

## Most important instruction

**Do not interpret this as a request to create a static HTML recreation of the Figma.**

This is a request to build a **real Shopify Online Store 2.0 animal-food PDP whose visual design matches the Figma**.

The Figma determines how it looks.

Shopify determines how its data and commerce functionality work.

Use the Figma MCP extensively, use Shopify-native architecture wherever possible, and do not take shortcuts by hardcoding data that should live in Shopify.