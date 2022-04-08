#!/bin/sh

curl -s "https://github.com/googlefonts/noto-emoji/raw/main/fonts/NotoColorEmoji.ttf" -o /tmp/fonts/ && \
mkdir -p ./fonts && mv /tmp/fonts/*.ttf ./fonts