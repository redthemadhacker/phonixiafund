import jpeg from 'jpeg-js';
import fs from 'fs';
import path from 'path';

const width = 128;
const height = 128;
const frameData = Buffer.alloc(width * height * 4);

// Center and radius
const cx = width / 2;
const cy = height / 2;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Deep cosmic dark background with slight radial glow
    let r = 8 + Math.floor(Math.max(0, 15 - dist * 0.2));
    let g = 12 + Math.floor(Math.max(0, 20 - dist * 0.25));
    let b = 22 + Math.floor(Math.max(0, 35 - dist * 0.3));

    // Outer golden rounded shield border
    const shieldDist = Math.max(Math.abs(dx), Math.abs(dy));
    if (shieldDist >= 56 && shieldDist <= 62) {
      r = 217;
      g = 119;
      b = 6;
    } else if (shieldDist > 62) {
      r = 7;
      g = 9;
      b = 14;
    }

    // Phoenix / Fire Bird Emblem (Voxel style)
    // Head / Crown at top
    if (Math.abs(dx) <= 6 && y >= 32 && y <= 46) {
      r = 251;
      g = 191;
      b = 36;
    }
    // Crown crests
    if ((Math.abs(dx) === 10 || Math.abs(dx) === 16) && y >= 28 && y <= 38) {
      r = 245;
      g = 158;
      b = 11;
    }
    // Eyes
    if ((dx === -3 || dx === 3) && y === 40) {
      r = 255;
      g = 255;
      b = 255;
    }
    // Body core
    if (Math.abs(dx) <= 12 && y >= 47 && y <= 78) {
      const grad = (y - 47) / 31;
      r = Math.floor(251 * (1 - grad) + 239 * grad);
      g = Math.floor(191 * (1 - grad) + 68 * grad);
      b = Math.floor(36 * (1 - grad) + 68 * grad);
    }
    // Left & Right Wings (Tiered Voxel Wings)
    const wingY = y - 48;
    const absDx = Math.abs(dx);
    if (wingY >= 0 && wingY <= 36) {
      const maxWingX = 14 + (wingY < 18 ? wingY * 2.2 : (36 - wingY) * 2.2);
      if (absDx >= 12 && absDx <= maxWingX) {
        r = 245 - Math.floor(absDx * 1.5);
        g = 158 - Math.floor(absDx * 1.2);
        b = 11 + Math.floor(absDx * 0.8);
      }
    }
    // Tail Feathers
    if (y >= 78 && y <= 98) {
      const tailWidth = 4 + (98 - y) * 0.6;
      if (absDx <= tailWidth || Math.abs(absDx - 14) <= 3) {
        r = 220;
        g = 38;
        b = 38;
      }
    }

    frameData[idx] = Math.min(255, Math.max(0, r));
    frameData[idx + 1] = Math.min(255, Math.max(0, g));
    frameData[idx + 2] = Math.min(255, Math.max(0, b));
    frameData[idx + 3] = 255;
  }
}

const rawImageData = {
  data: frameData,
  width,
  height,
};

const jpegImageData = jpeg.encode(rawImageData, 90);

// Write to root logo.jpeg
fs.writeFileSync(path.resolve('./logo.jpeg'), jpegImageData.data);
