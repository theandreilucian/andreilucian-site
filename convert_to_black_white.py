#!/usr/bin/env python3
"""
Convert image to pure black and white (high contrast).
Gray colors become white, dark colors become black.
"""

from PIL import Image
import numpy as np
import sys
import os

def convert_to_black_white(image_path, output_path=None, threshold=128):
    """
    Converts image to pure black and white (high contrast).
    Gray/light pixels become white, dark pixels become black.
    
    Args:
        image_path: Path to input image
        output_path: Path to save output (optional)
        threshold: Brightness threshold (0-255). Pixels >= threshold become white, < threshold become black.
    """
    # Load the image
    img = Image.open(image_path)
    original_mode = img.mode
    
    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Convert to numpy array
    img_array = np.array(img)
    
    # Convert to grayscale (calculate brightness)
    gray = np.mean(img_array, axis=2)
    
    # Apply threshold: >= threshold = white (255), < threshold = black (0)
    binary = (gray >= threshold).astype(np.uint8) * 255
    
    # Create RGB version (all channels same for grayscale)
    result = np.stack([binary, binary, binary], axis=2)
    
    # Convert back to PIL Image
    result_img = Image.fromarray(result.astype(np.uint8), 'RGB')
    
    # Save the result
    if output_path is None:
        base, ext = os.path.splitext(image_path)
        output_path = f"{base}_black_white{ext}"
    
    result_img.save(output_path, quality=95)
    print(f"✓ Converted to pure black and white!")
    print(f"✓ Saved to: {output_path}")
    return output_path

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("=" * 60)
        print("Black and White High Contrast Converter")
        print("=" * 60)
        print("\nUsage: python convert_to_black_white.py <image_path> [output_path] [threshold]")
        print("\nExamples:")
        print("  python convert_to_black_white.py photo.jpg")
        print("  python convert_to_black_white.py photo.jpg output.jpg")
        print("  python convert_to_black_white.py photo.jpg output.jpg 140")
        print("\nParameters:")
        print("  threshold: Brightness threshold (0-255, default: 128)")
        print("            Higher = more pixels become white")
        print("            Lower = more pixels become black")
        print("=" * 60)
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(f"❌ Error: Image file not found: {image_path}")
        sys.exit(1)
    
    output_path = sys.argv[2] if len(sys.argv) > 2 else None
    threshold = int(sys.argv[3]) if len(sys.argv) > 3 else 128
    
    try:
        convert_to_black_white(image_path, output_path, threshold)
        print("✓ Done!")
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)




