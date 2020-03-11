import sys
import os
from PIL import Image

sys.path.append(os.path.join(sys.path[0], ".."))
import displayio
from adafruit_display_shapes.rect import Rect
from adafruit_display_shapes.circle import Circle
from adafruit_display_shapes.roundrect import RoundRect

# Make the display context
splash = displayio.Group(max_size=10)

# Make a background color fill
color_bitmap = displayio.Bitmap(320, 240, 1)
color_palette = displayio.Palette(1)
color_palette[0] = 0xFFFFFF
bg_sprite = displayio.TileGrid(color_bitmap, x=0, y=0, pixel_shader=color_palette)

img = Image.new("RGB", (240, 240), "black")  # Create a new black image
bmp_img = img.load()  # Create the pixel map

splash.append(bg_sprite)
##########################################################################


rect = Rect(80, 20, 41, 41, fill=0x0)
splash.append(rect)

splash.draw(bmp_img)
# splash.draw(bmp_img)

# circle = Circle(100, 100, 20, fill=0x00FF00, outline=0xFF00FF)
# splash.append(circle)

# # splash.draw(bmp_img)

# rect2 = Rect(50, 100, 61, 81, outline=0x0, stroke=3)
# splash.append(rect2)

# # splash.draw(bmp_img)

# # roundrect = RoundRect(10, 10, 61, 81, 10, fill=0x0, outline=0xFF00FF, stroke=6)
# # splash.append(roundrect)

# # splash.draw(bmp_img)


img.show()
# img.save("test.bmp")
# while True:
#     pass