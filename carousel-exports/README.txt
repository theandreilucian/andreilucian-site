LinkedIn Carousel JPEG Exports
==============================

This folder is filled when you run the export script. Each subfolder contains one carousel's slides as JPEGs, ready to upload to LinkedIn.

HOW TO GENERATE THE IMAGES
--------------------------
From the project root (d:\Website), run:

  npm run export-carousels

or:

  node export-carousel-slides.js

This will create one folder per carousel and save every slide as a JPEG:

  carousel-exports/
    andrei-lucian-carousel-1-unlearn/
      slide-01.jpg
      slide-02.jpg
      ...
      slide-08.jpg
    andrei-lucian-carousel-2-lines-repeat/
      slide-01.jpg
      ...
    ... (one folder per carousel)

POSTING ON LINKEDIN
-------------------
1. Open LinkedIn and create a new post.
2. Choose "Document" or "Carousel" (multiple images).
3. For one carousel: upload the images from that carousel's folder in order (slide-01.jpg first, then 02, 03, ... 08).
4. Add your caption and publish.

Repeat for each carousel folder when you want to post that carousel.
