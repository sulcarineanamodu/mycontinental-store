from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

PRODUCT_DIR = "/Users/princeademola/Desktop/My Claude Idea/02 Projects/Prestige Web Co/Clients/MyContinental Food Store/assets/product-images"
OUTPUT_DIR = "/Users/princeademola/Desktop/mycontinental-store/public"

# Brand colours
GREEN      = (26, 122, 74)    # #1a7a4a
DARK_GREEN = (15, 80, 48)     # darker shade
GOLD       = (201, 151, 43)   # #C9972B
WHITE      = (255, 255, 255)
CREAM      = (255, 248, 240)  # #FFF8F0

W, H = 1920, 1080

banners = [
    {
        "filename": "hero-1.jpg",
        "product":  "EM2987-plantain.jpg",
        "tag":      "🌿 Fresh Produce",
        "headline": ["Your Taste of", "Home, Delivered"],
        "sub":      "Authentic African & Caribbean groceries\ndelivered to your door in Hillingdon.",
        "cta":      "Shop Now",
        "bg":       GREEN,
        "accent":   GOLD,
    },
    {
        "filename": "hero-2.jpg",
        "product":  "EM3002-onions.jpg",
        "tag":      "🍲 Cooking Essentials",
        "headline": ["2,700+ Authentic", "Products In Store"],
        "sub":      "From egusi to palm oil — everything you need\nfor your favourite African & Caribbean dishes.",
        "cta":      "Browse Categories",
        "bg":       DARK_GREEN,
        "accent":   GOLD,
    },
    {
        "filename": "hero-3.jpg",
        "product":  "EM3012-mielle-moisturising-detangling-shampoo-355ml.jpg",
        "tag":      "💆 Hair & Beauty",
        "headline": ["Free Local", "Delivery Available"],
        "sub":      "Same-day dispatch on orders before 2pm\nwithin Hillingdon & Uxbridge.",
        "cta":      "Order Today",
        "bg":       (20, 20, 46),   # navy #1a1a2e
        "accent":   GOLD,
    },
]

def load_font(size, bold=False):
    """Try to load a system font, fall back to default."""
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                continue
    return ImageFont.load_default()

def make_banner(cfg):
    img = Image.new("RGB", (W, H), cfg["bg"])
    draw = ImageDraw.Draw(img)

    # ── subtle diagonal stripe pattern ──────────────────────────────
    stripe_col = tuple(min(255, c + 12) for c in cfg["bg"])
    for x in range(-H, W, 60):
        draw.line([(x, 0), (x + H, H)], fill=stripe_col, width=1)

    # ── gold accent bar on left edge ─────────────────────────────────
    draw.rectangle([0, 0, 8, H], fill=cfg["accent"])

    # ── product image (right side, with glow) ────────────────────────
    prod_path = os.path.join(PRODUCT_DIR, cfg["product"])
    if os.path.exists(prod_path):
        prod = Image.open(prod_path).convert("RGBA")

        # Scale to fit within a 680×680 box
        prod.thumbnail((680, 680), Image.LANCZOS)
        pw, ph = prod.size

        # Soft glow/halo behind product
        glow = Image.new("RGBA", (pw + 120, ph + 120), (0, 0, 0, 0))
        glow_d = ImageDraw.Draw(glow)
        glow_col = (*cfg["accent"], 60)
        for r in range(60, 0, -4):
            alpha = int(60 * (1 - r / 60))
            glow_d.ellipse(
                [60 - r + pw // 2 - 40, 60 - r + ph // 2,
                 60 + r + pw // 2 + 40, 60 + r + ph // 2 + 80],
                fill=(*cfg["accent"], alpha)
            )
        glow = glow.filter(ImageFilter.GaussianBlur(30))
        glow_x = W - pw - 100 - 60
        glow_y = (H - ph) // 2 - 60
        img.paste(glow, (glow_x, glow_y), glow)

        # Paste product
        px = W - pw - 100
        py = (H - ph) // 2
        img.paste(prod, (px, py), prod)

    # ── text layout (left side) ───────────────────────────────────────
    text_x = 120

    # Tag pill
    tag_font = load_font(28)
    tag_w = draw.textlength(cfg["tag"], font=tag_font) + 32
    tag_y = 200
    draw.rounded_rectangle([text_x, tag_y, text_x + tag_w, tag_y + 48],
                            radius=24, fill=(*cfg["accent"], 220))
    draw.text((text_x + 16, tag_y + 10), cfg["tag"], font=tag_font, fill=WHITE)

    # Headline
    h_font = load_font(112, bold=True)
    hy = tag_y + 80
    for line in cfg["headline"]:
        draw.text((text_x, hy), line, font=h_font, fill=WHITE)
        hy += 130

    # Subtext
    sub_font = load_font(36)
    sub_y = hy + 20
    for line in cfg["sub"].split("\n"):
        draw.text((text_x, sub_y), line, font=sub_font,
                  fill=(*WHITE, 210))
        sub_y += 52

    # CTA button
    cta_font = load_font(38, bold=True)
    cta_text = cfg["cta"]
    cta_w = int(draw.textlength(cta_text, font=cta_font)) + 64
    cta_h = 72
    cta_y = sub_y + 48
    draw.rounded_rectangle(
        [text_x, cta_y, text_x + cta_w, cta_y + cta_h],
        radius=36, fill=cfg["accent"]
    )
    draw.text((text_x + 32, cta_y + 16), cta_text, font=cta_font, fill=WHITE)

    # ── bottom bar ────────────────────────────────────────────────────
    bar_col = tuple(max(0, c - 15) for c in cfg["bg"])
    draw.rectangle([0, H - 56, W, H], fill=bar_col)
    bar_font = load_font(26)
    bar_items = [
        "✓ Free local delivery in Hillingdon & Uxbridge",
        "✓ Same-day dispatch before 2pm",
        "✓ 2,700+ authentic products",
        "✓ Family run since 2010",
    ]
    bx = 120
    for item in bar_items:
        draw.text((bx, H - 42), item, font=bar_font, fill=(*WHITE, 180))
        bx += 420

    # Save
    out = os.path.join(OUTPUT_DIR, cfg["filename"])
    img.convert("RGB").save(out, "JPEG", quality=92)
    size_kb = os.path.getsize(out) // 1024
    print(f"  ✅  {cfg['filename']}  ({size_kb} KB)")

print("🎨 Generating hero banners...\n")
for b in banners:
    print(f"  → {b['tag']}: {b['headline'][0]}...")
    make_banner(b)

print("\n✅ All 3 banners saved to public/")
print("Run: git add public/hero-*.jpg && git commit -m 'feat: branded hero banners' && git push")
