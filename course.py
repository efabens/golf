from PIL import Image
from math import trunc
from collections import Counter
from requests import get
from io import BytesIO

ENDC = '\033[0m'


def custom_background(tup):
    return (
        '\033[48;2;' +
        str(tup[0]) + ";" +
        str(tup[1]) + ";" +
        str(tup[2]) + 'm')


def color_to_use(pixels):
    counted = Counter(pixels)
    return counted.most_common(1)[0][0]


def print_hole(url):
    print(url)
    web = get(url)
    image = BytesIO(web.content)

    im = Image.open(image)
    x, y = im.size
    char_width = 80
    aspect_ratio = .413
    char_height = trunc(((y / x) * char_width) * aspect_ratio)

    pix_per_char_x = trunc(x / char_width)
    pix_per_char_y = trunc(y / char_height)
    print(pix_per_char_x)
    print(pix_per_char_y)

    to_print = []
    for i in range(char_height):
        colors = []
        for j in range(char_width):
            cur_char = []
            for k in range(pix_per_char_x):
                for l in range(pix_per_char_y):
                    coord = (k + j * pix_per_char_x, l + i * pix_per_char_y)
                    im.getpixel(coord)
                    cur_char.append(im.getpixel(coord))
            common = color_to_use(cur_char)
            colors.append(custom_background(common) + " " + ENDC)
        to_print.append(colors)
    for i in to_print:
        print("".join(i))

print_hole('https://pga-tour-res.cloudinary.com/image/upload/c_fill,w_720,b_rgb:424141,b_rgb:424242/holes_2018_r_464_552_overhead_green_18.jpg')