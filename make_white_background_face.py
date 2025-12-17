#!/usr/bin/env python3
"""
Script to make the background and face white in a portrait image.
Uses intelligent thresholding and region detection.
"""

from PIL import Image, ImageFilter
import numpy as np
import sys
import os

def make_background_face_white(image_path, output_path=None):
    """
    Makes the background and face white in an image.
    Uses adaptive thresholding and region detection.
    """
    # Load the image
    img = Image.open(image_path)
    original_mode = img.mode
    
    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    img_array = np.array(img)
    height, width = img_array.shape[:2]
    
    # Convert to grayscale for analysis
    gray = np.mean(img_array, axis=2).astype(np.uint8)
    
    # Create result array
    result = img_array.copy()
    
    # Method 1: Detect background (light areas, typically edges and corners)
    # Sample corners and edges to determine background color
    corner_size = min(50, width // 10, height // 10)
    corners = [
        gray[:corner_size, :corner_size].flatten(),  # Top-left
        gray[:corner_size, -corner_size:].flatten(),  # Top-right
        gray[-corner_size:, :corner_size].flatten(),  # Bottom-left
        gray[-corner_size:, -corner_size:].flatten()  # Bottom-right
    ]
    
    # Background is likely the lightest areas in corners
    background_samples = np.concatenate(corners)
    background_threshold = np.percentile(background_samples, 75)  # 75th percentile
    
    # Create background mask (pixels brighter than threshold)
    background_mask = gray > background_threshold
    
    # Method 2: Detect face region
    # Face is typically in the center-upper portion
    center_x, center_y = width // 2, int(height * 0.4)  # Slightly above center
    
    # Create elliptical mask for face (more accurate than circle)
    face_width = int(width * 0.35)
    face_height = int(height * 0.45)
    
    y_coords, x_coords = np.ogrid[:height, :width]
    
    # Elliptical mask for face region
    face_region_mask = ((x_coords - center_x) / face_width) ** 2 + \
                       ((y_coords - center_y) / face_height) ** 2 <= 1
    
    # Within face region, detect skin tones
    # Skin tones are typically in medium brightness range
    # Exclude very dark (hair) and very light (already background-like) areas
    skin_lower = 80
    skin_upper = 240
    
    # Create skin mask within face region
    skin_mask = (gray >= skin_lower) & (gray <= skin_upper) & face_region_mask
    
    # Also include areas that are medium brightness in the central region
    # This helps catch the face even if thresholding isn't perfect
    central_region = (x_coords > width * 0.2) & (x_coords < width * 0.8) & \
                     (y_coords > height * 0.15) & (y_coords < height * 0.7)
    
    face_final_mask = (skin_mask | (face_region_mask & central_region & (gray > 100) & (gray < 250)))
    
    # Apply white color to both background and face
    result[background_mask] = [255, 255, 255]
    result[face_final_mask] = [255, 255, 255]
    
    # Convert back to PIL Image
    result_img = Image.fromarray(result.astype(np.uint8))
    
    # Convert back to original mode if needed
    if original_mode == 'RGBA':
        # If original had alpha, we need to handle it
        alpha = np.ones((height, width), dtype=np.uint8) * 255
        result_with_alpha = np.dstack([result, alpha])
        result_img = Image.fromarray(result_with_alpha.astype(np.uint8), 'RGBA')
    elif original_mode != 'RGB':
        result_img = result_img.convert(original_mode)
    
    # Save the result
    if output_path is None:
        base, ext = os.path.splitext(image_path)
        output_path = f"{base}_white{ext}"
    
    result_img.save(output_path, quality=95)
    print(f"✓ Processed image saved to: {output_path}")
    return output_path

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("=" * 60)
        print("Make Background and Face White - Image Processor")
        print("=" * 60)
        print("\nUsage: python make_white_background_face.py <image_path> [output_path]")
        print("\nExamples:")
        print("  python make_white_background_face.py photo.jpg")
        print("  python make_white_background_face.py photo.jpg output_white.jpg")
        print("\nThe script will:")
        print("  - Detect and make the background white")
        print("  - Detect and make your face white")
        print("  - Save the result with '_white' suffix if no output specified")
        print("=" * 60)
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(f"❌ Error: Image file not found: {image_path}")
        sys.exit(1)
    
    try:
        output_path = sys.argv[2] if len(sys.argv) > 2 else None
        make_background_face_white(image_path, output_path)
        print("✓ Processing complete!")
    except Exception as e:
        print(f"❌ Error processing image: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
