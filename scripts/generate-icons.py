"""Rasterize SVG app icons to PNG for iOS/Android launchers."""

from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
ICON_DIR = ROOT / "assets" / "icons"

EXPORTS = [
    ("icon-maskable.svg", "apple-touch-icon.png", 180),
    ("icon.svg", "icon-192.png", 192),
    ("icon.svg", "icon-512.png", 512),
    ("icon-maskable.svg", "icon-maskable-512.png", 512),
]


def export_png(svg_name: str, png_name: str, size: int) -> None:
    svg_path = (ICON_DIR / svg_name).resolve().as_uri()
    html = f"""<!DOCTYPE html>
<html>
  <head>
    <style>
      html, body {{ margin: 0; padding: 0; background: #1E3A5F; }}
      img {{ display: block; width: {size}px; height: {size}px; }}
    </style>
  </head>
  <body>
    <img src="{svg_path}" width="{size}" height="{size}" alt="">
  </body>
</html>"""

    png_path = ICON_DIR / png_name
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page(
            viewport={"width": size, "height": size},
            device_scale_factor=1,
        )
        page.set_content(html)
        page.locator("img").wait_for()
        page.screenshot(path=str(png_path), clip={"x": 0, "y": 0, "width": size, "height": size})
        browser.close()

    print(f"wrote assets/icons/{png_name} ({size}x{size}) from {svg_name}")


def main() -> None:
    for svg_name, png_name, size in EXPORTS:
        export_png(svg_name, png_name, size)


if __name__ == "__main__":
    main()
