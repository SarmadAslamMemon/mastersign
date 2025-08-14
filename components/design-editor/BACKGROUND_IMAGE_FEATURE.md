# Background Image Feature & Image Manipulation Improvements

## 🎯 Overview
This update adds comprehensive background image functionality and fixes critical image manipulation issues in the template editor.

## ✨ New Features

### 1. **Background Image Setting**
- **Function**: `setBackgroundImage(file: File)`
- **Purpose**: Set any image as a background for the current template
- **Features**:
  - Automatically scales image to cover entire canvas
  - Maintains aspect ratio with smart cropping
  - Adds subtle dark overlay for better text readability
  - Preserves all existing template elements
  - Places background at the bottom layer

### 2. **Background Image Removal**
- **Function**: `removeBackgroundImage()`
- **Purpose**: Remove current background image and overlay
- **Features**:
  - Cleans up background image and overlay
  - Restores original template appearance
  - No impact on other elements

### 3. **Enhanced Image Manipulation**
- **Fixed Issues**:
  - Images can now be properly resized, moved, and rotated
  - Selection handles appear correctly
  - Interactive properties are properly preserved
  - Visual feedback for editable images

## 🔧 Technical Implementation

### Background Image Function
```typescript
const setBackgroundImage = (file: File) => {
  // 1. Load image file
  // 2. Calculate optimal scaling for canvas coverage
  // 3. Create Fabric.js image with locked properties
  // 4. Add subtle overlay for better contrast
  // 5. Place at bottom layer
}
```

### Image Manipulation Fixes
```typescript
// Ensure proper interaction properties
fabricImage.set({
  selectable: isEditable,
  evented: isEditable,
  lockMovementX: false,
  lockMovementY: false,
  lockRotation: false,
  lockScalingX: false,
  lockScalingY: false,
  hasControls: isEditable,
  hasBorders: isEditable,
  cornerSize: isEditable ? 12 : 0,
  cornerStyle: 'circle',
  borderColor: isEditable ? '#4A90E2' : 'transparent'
})
```

## 🎨 User Interface

### Toolbar Buttons
- **Green "Background" button**: Set background image
- **Red "Remove BG" button**: Remove background image
- **Only visible when template is loaded**

### Elements Tab
- **"Set Background" button**: Access background functionality
- **"Remove Background" button**: Remove current background
- **Integrated with other element controls**

## 🧪 Testing Instructions

### 1. **Test Background Image**
1. Load a template (e.g., "Open/Closed Sign")
2. Click "Set Background" button (green button in toolbar)
3. Select an image file (JPG, PNG, GIF)
4. Verify image covers entire canvas
5. Check that all template elements remain visible

### 2. **Test Image Manipulation**
1. Click on an editable image (should have blue border)
2. Verify selection handles appear
3. Test resizing by dragging corner handles
4. Test moving by dragging the image
5. Test rotation by dragging rotation handle

### 3. **Test Background Removal**
1. With background image set, click "Remove Background"
2. Verify background and overlay are removed
3. Check template returns to original state

## 🔍 Debug Features

### Debug Button
- **Location**: Toolbar (gray "Debug" button)
- **Function**: Logs all canvas objects with properties
- **Use**: Verify object states and metadata

### Console Logging
- Background image operations are logged with emojis
- Image manipulation events are tracked
- Error handling provides clear feedback

## 📁 File Structure

```
components/design-editor/
├── hooks/
│   └── useCanvasEditor.ts          # Core functionality
├── TemplateEditor.tsx              # Main UI component
├── index.ts                        # Exports
└── BACKGROUND_IMAGE_FEATURE.md     # This documentation
```

## 🚀 Usage Examples

### Basic Background Setting
```typescript
// In your component
const { setBackgroundImage } = useCanvasEditor({...})

const handleBackgroundUpload = (file: File) => {
  setBackgroundImage(file)
}
```

### Background Removal
```typescript
const { removeBackgroundImage } = useCanvasEditor({...})

const handleRemoveBackground = () => {
  removeBackgroundImage()
}
```

## ⚠️ Important Notes

### Image Requirements
- **Formats**: JPG, PNG, GIF supported
- **Size**: No strict limits, but large images may impact performance
- **Aspect Ratio**: Automatically handled for optimal coverage

### Template Dependencies
- Background functionality requires a loaded template
- All existing elements are preserved
- Background is always placed at the bottom layer

### Performance Considerations
- Large background images are automatically scaled
- Overlay adds minimal performance impact
- Background removal is instant

## 🐛 Troubleshooting

### Background Not Setting
- Check that a template is loaded
- Verify file is valid image format
- Check browser console for errors

### Image Manipulation Not Working
- Ensure image has `isEditable: true`
- Check that `templateId` is properly set
- Use debug button to verify object properties

### Performance Issues
- Reduce background image size
- Check for memory leaks in console
- Verify Fabric.js is properly loaded

## 🔮 Future Enhancements

### Planned Features
- Multiple background layers
- Background opacity controls
- Background positioning options
- Background filters and effects
- Background templates/presets

### Integration Opportunities
- Background image library
- AI-powered background suggestions
- Background color matching
- Export with/without background options

---

**Version**: 2.1.0  
**Last Updated**: Template Editor Update  
**Status**: ✅ Implemented and Tested
