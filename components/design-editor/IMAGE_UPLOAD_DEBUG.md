# Image Upload Debug Guide

## 🐛 Issue Description
The image upload functionality is not working properly when clicking on template image elements.

## 🔧 Fixes Applied

### 1. **Fixed Object Lookup**
- **Problem**: `replaceImage` was looking for objects by `id` instead of `templateId`
- **Fix**: Changed to use `templateId` for object lookup
- **Location**: `useCanvasEditor.ts` line ~280

### 2. **Enhanced Image Scaling**
- **Problem**: New images weren't properly scaled to fit original bounds
- **Fix**: Added proper scaling calculation to maintain aspect ratio
- **Location**: `useCanvasEditor.ts` line ~320

### 3. **Improved Debugging**
- **Problem**: Limited visibility into what's happening during image upload
- **Fix**: Added comprehensive logging and debug functions
- **Location**: Throughout `useCanvasEditor.ts`

## 🧪 Testing Steps

### 1. **Load a Template**
1. Go to `/template-editor-demo` or `/image-upload-test`
2. Select a template with editable images (e.g., "Open/Closed Sign")
3. Look for images with blue borders (these are editable)

### 2. **Test Image Upload**
1. Click on an editable image (should have blue border)
2. Check browser console for debug messages:
   - `🖼️ Image clicked!` - Image was clicked
   - `✅ Triggering image upload for: [templateId]` - Upload dialog triggered
   - `📁 File selected: [filename]` - File was selected
   - `🔄 Replacing image for object: [templateId]` - Replacement started
   - `✅ Image replaced successfully` - Replacement completed

### 3. **Debug Information**
- Use the "Debug" button in the toolbar to see all canvas objects
- Check the debug panel on `/image-upload-test` for real-time logs
- Look for these key properties in console output:
  - `templateId`: Unique identifier for the template object
  - `isEditable`: Whether the object can be edited
  - `templateRole`: Role of the object in the template

## 🔍 Common Issues & Solutions

### Issue: "Object not found or not an image"
**Cause**: Object lookup is failing
**Solution**: 
1. Check that `templateId` is properly set on the object
2. Verify the object type is 'image'
3. Use debug function to see all objects

### Issue: Image not scaling properly
**Cause**: Incorrect scale calculation
**Solution**: 
1. Check the scaling logs in console
2. Verify original dimensions are correct
3. Ensure aspect ratio is maintained

### Issue: Click not detected
**Cause**: Event handler not working
**Solution**:
1. Check that `isEditable` is true
2. Verify `templateId` exists
3. Ensure object is visible and selectable

## 📋 Debug Checklist

- [ ] Template loads successfully
- [ ] Editable images have blue borders
- [ ] Clicking image shows debug message
- [ ] File dialog opens
- [ ] File selection is logged
- [ ] Image replacement starts
- [ ] New image scales correctly
- [ ] Metadata is preserved
- [ ] Canvas updates properly

## 🛠️ Manual Testing Commands

Open browser console and run:

```javascript
// Check all canvas objects
window.debugCanvasObjects()

// Check specific object
const canvas = document.querySelector('canvas')
const fabricCanvas = canvas.__fabric
console.log('Canvas objects:', fabricCanvas.getObjects().map(obj => ({
  id: obj.id,
  templateId: obj.templateId,
  type: obj.type,
  isEditable: obj.isEditable
})))
```

## 🎯 Expected Behavior

1. **Visual Indicators**: Editable images should have blue borders
2. **Click Detection**: Clicking editable images should trigger file dialog
3. **File Selection**: Selecting an image file should replace the original
4. **Proper Scaling**: New image should fit within original bounds
5. **Metadata Preservation**: Template properties should be maintained

## 📞 If Issues Persist

1. Check browser console for error messages
2. Verify Fabric.js is properly loaded
3. Ensure all template objects have correct properties
4. Test with different image formats (JPG, PNG, GIF)
5. Check file size limits (max 10MB)

---

**Last Updated**: Template Editor v2.0
**Status**: Fixed and tested
