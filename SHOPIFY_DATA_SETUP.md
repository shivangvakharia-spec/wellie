# Shopify data setup

This file documents merchant/Admin-side data that the theme code expects but
that cannot be created from the theme files alone (no Admin API/MCP access
was available while building this section). Create the definitions below in
**Shopify Admin → Content → Metaobjects** before the corresponding section
will show real content.

---

## Metaobject: Review

Used by: `sections/wellie-testimonials.liquid` ("Hear from our Customers!")

### Definition

- **Name:** Review
- **Type handle:** `review` (must match exactly — the section's block schema references `metaobject_type: "review"`)

### Fields

| Field name | Key | Type | Required | Notes |
|---|---|---|---|---|
| Customer name | `customer_name` | Single line text | Yes | Rendered as the bolded name under the review. |
| Rating | `rating` | Rating | No | Scale 1–5. Renders as filled/outline stars. If left empty, no stars are shown. |
| Review text | `review_text` | Multi-line text | Yes | The quoted testimonial copy. |
| Customer image | `customer_image` | File (image) | No | Used for both the large lifestyle photo on the card and the small round avatar next to the name. If left empty, a neutral placeholder block is shown instead of a broken image. |

### Enable entries to be selected from the theme editor

1. In Shopify Admin, go to **Content → Metaobjects → Add definition**.
2. Set the name to `Review` and confirm the type handle is `review`.
3. Add the four fields listed above with the exact keys shown.
4. Save the definition, then add one entry per real customer testimonial.
5. In the theme editor, open the **Wellie testimonials** section on the
   `product.wellie` template, add a **Review** block for each testimonial,
   and pick the corresponding metaobject entry in the block's **Review** setting.

### Why a metaobject (not a block-only or metafield-only design)

Reviews are reusable, structured entities that may need to appear on more
than one product/section over time (e.g. the same testimonial reused on a
future homepage). The metaobject stores the entity itself; the section's
blocks only control **which** reviews appear on this section and in what
order — the content is not duplicated per placement.
