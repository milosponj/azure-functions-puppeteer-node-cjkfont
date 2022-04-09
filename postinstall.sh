#!/bin/sh

curl -s "https://github.com/googlefonts/noto-emoji/raw/main/fonts/NotoColorEmoji.ttf" -L -o /tmp/fonts/NotoColorEmoji.ttf && \
mkdir -p ./fonts && mv /tmp/fonts/*.ttf ./fonts