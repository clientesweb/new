import sharp from 'sharp';
import fetch from 'node-fetch';

async function generateIcons() {
  try {
    // Fetch the source image
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Icon512x512-Rt04aV2NQtpc9pb26QPhNPKeW7KSel.png');
    const imageBuffer = await response.buffer();

    // Define the sizes we need for various purposes
    const sizes = {
      favicon: [16, 32],
      apple: [180],
      android: [192, 512],
      maskable: [384]
    };

    console.log('Generating icons...');

    // Generate standard favicons
    for (let size of sizes.favicon) {
      await sharp(imageBuffer)
        .resize(size, size)
        .toFormat('png')
        .toFile(`favicon-${size}x${size}.png`);
      console.log(`✓ Generated favicon-${size}x${size}.png`);
    }

    // Generate favicon.ico (multi-size ico file)
    await sharp(imageBuffer)
      .resize(32, 32)
      .toFormat('ico')
      .toFile('favicon.ico');
    console.log('✓ Generated favicon.ico');

    // Generate Apple Touch Icon
    await sharp(imageBuffer)
      .resize(180, 180)
      .toFormat('png')
      .toFile('apple-touch-icon.png');
    console.log('✓ Generated apple-touch-icon.png');

    // Generate Android Chrome icons
    for (let size of sizes.android) {
      await sharp(imageBuffer)
        .resize(size, size)
        .toFormat('png')
        .toFile(`android-chrome-${size}x${size}.png`);
      console.log(`✓ Generated android-chrome-${size}x${size}.png`);
    }

    // Generate maskable icon (with padding for safe area)
    const maskableSize = sizes.maskable[0];
    await sharp(imageBuffer)
      .resize(maskableSize, maskableSize, {
        fit: 'contain',
        background: { r: 196, g: 30, b: 58, alpha: 1 } // Your brand red color
      })
      .toFormat('png')
      .toFile('maskable_icon.png');
    console.log('✓ Generated maskable_icon.png');

    console.log('\nAll icons generated successfully! 🎉');
    
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
