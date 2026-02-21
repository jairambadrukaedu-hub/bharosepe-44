# File Upload Quick Guide

## ✅ What's Fixed
The **"Upload failed: Bucket not found"** error is now resolved. Files can be uploaded automatically.

## 📤 How to Upload Files

### Step 1: Navigate to Form
1. Open http://localhost:3000/
2. Select "Fashion & Apparel" (or any category)
3. Click through to the form

### Step 2: Find File Upload Fields
Look for this section:
```
📷 Mandatory Seller Evidence
- Front View Photo ⭐ (REQUIRED)
- Back View Photo
- Brand Label/Tag Photo
- Defect Close-up Photos
- Fitting Demonstration Video
- Fabric Texture Photo
```

### Step 3: Upload Photos
Click on any upload field:
```
[Drop files here or click to upload]
Accepted: image/*, png, jpg, jpeg
(max 50MB each)
```

You can:
- **Drag & drop** files onto the box
- **Click to browse** and select files
- **Select multiple** files at once

### Step 4: Monitor Upload
You'll see progress:
```
📤 Uploading Files
Screens... ✅ [100% Complete]
```

Once complete:
```
✅ [filename.jpg]
Size: 2.5 MB
```

## 📁 Accepted File Types

### Images (for photos)
- ✅ JPG / JPEG
- ✅ PNG
- ✅ GIF
- ✅ WebP
- ✅ BMP
- ✅ TIFF

### Videos (for demonstrations)
- ✅ MP4
- ✅ AVI
- ✅ MOV (QuickTime)
- ✅ WebM
- ✅ MKV

### Documents (future)
- ✅ PDF
- ✅ DOC / DOCX

## ⚠️ File Size Limits
- **Max per file**: 50MB
- **Types**: Any image, video, or document format shown above
- **Exceeded?** You'll see: "File size must be less than 50MB"

## 🚨 Troubleshooting

### Error: "Bucket not found"
✅ **FIXED** - Auto-creates on app startup
- **Solution**: Refresh the page (hard refresh: Ctrl+Shift+R)
- **Check console**: F12 → Console tab
- Look for: ✅ Storage bucket "form-uploads" already exists

### Error: "File type not supported"
**Problem**: Uploading a file type that's not in the accepted list
**Solution**: Convert file to JPG/PNG/MP4 format

### Error: "User not authenticated"
**Problem**: Not logged in
**Solution**: Log in first before uploading

### Upload is very slow
**Problem**: Large file + slow internet
**Solution**: 
- Use smaller file size (compress image)
- Use faster internet connection
- Try a different device/network

## 📋 Fashion Form Photo Tips

### Front View Photo (Required)
- Full item visible from front
- Good lighting, clear focus
- Taken against plain background
- Shows overall condition

### Back View Photo
- Full item visible from back
- Similar lighting and distance
- Shows any back designs

### Brand Label Photo
- Close-up of label
- Size tag visible
- Care instructions visible
- Shows authenticity

### Defect Close-up Photos
- Zoom in on any damage mentioned
- Good focus on defect
- Clear lighting to see issue
- Include multiple angles if needed

### Fitting Demonstration Video
- Item being worn or held
- Shows fit and movement
- 10-30 seconds recommended
- Optional but increases buyer confidence

## ✨ Pro Tips
1. **Compress images** - Reduces file size without quality loss
2. **Consistent lighting** - All photos from same lighting conditions
3. **Clear background** - Plain walls, not cluttered
4. **Multiple angles** - Shows condition more thoroughly
5. **Video for fit** - Especially important for clothing items

## 📊 What Happens After Upload
1. Files stored in Supabase storage
2. File metadata saved to database
3. SHA-256 hash created for integrity
4. Files linked to your transaction
5. Ready for contract and verification

---

✅ **Ready to upload!** Refresh your browser and try uploading a file now.

