#!/usr/bin/env python3
"""
Simple script to replace gray background and face with white.
Converts gray/light gray pixels to pure white.
"""

from PIL import Image
import numpy as np
import sys
import os

def gray_to_white(image_path, output_path=None, threshold=200):
    """
    Replaces gray/light gray pixels with white.
    
    Args:
        image_path: Path to input image
        output_path: Path to save output (optional)
        threshold: Brightness threshold (0-255). Pixels brighter than this become white.
    """
    # Load the image
    img = Image.open(image_path)
    original_mode = img.mode
    
    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Convert to numpy array
    img_array = np.array(img)
    
    # Calculate grayscale brightness for each pixel
    gray = np.mean(img_array, axis=2)
    
    # Create mask: pixels that are gray/light gray (brightness >= threshold)
    # This will catch both background and face if they're gray
    gray_mask = gray >= threshold
    
    # Replace gray pixels with white
    result = img_array.copy()
    result[gray_mask] = [255, 255, 255]
    
    # Convert back to PIL Image
    result_img = Image.fromarray(result.astype(np.uint8))
    
    # Convert back to original mode if needed
    if original_mode == 'RGBA':
        alpha = np.ones((img_array.shape[0], img_array.shape[1]), dtype=np.uint8) * 255
        result_with_alpha = np.dstack([result, alpha])
        result_img = Image.fromarray(result_with_alpha.astype(np.uint8), 'RGBA')
    elif original_mode != 'RGB':
        result_img = result_img.convert(original_mode)
    
    # Save the result
    if output_path is None:
        base, ext = os.path.splitext(image_path)
        output_path = f"{base}_white{ext}"
    
    result_img.save(output_path, quality=95)
    print(f"✓ Converted gray to white!")
    print(f"✓ Saved to: {output_path}")
    return output_path

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("=" * 60)
        print("Gray to White Converter")
        print("=" * 60)
        print("\nUsage: python gray_to_white.py <image_path> [output_path] [threshold]")
        print("\nExamples:")
        print("  python gray_to_white.py photo.jpg")
        print("  python gray_to_white.py photo.jpg output.jpg")
        print("  python gray_to_white.py photo.jpg output.jpg 180")
        print("\nParameters:")
        print("  threshold: Brightness threshold (0-255, default: 200)")
        print("            Lower = more pixels become white")
        print("            Higher = only very light gray becomes white")
        print("=" * 60)
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(f"❌ Error: Image file not found: {image_path}")
        sys.exit(1)
    
    output_path = sys.argv[2] if len(sys.argv) > 2 else None
    threshold = int(sys.argv[3]) if len(sys.argv) > 3 else 200
    
    try:
        gray_to_white(image_path, output_path, threshold)
        print("✓ Done!")
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)







