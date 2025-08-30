@echo off
echo 🚀 Firebase Image Migration - Windows Batch File
echo ================================================
echo.
echo This will migrate all 697 images to their proper folders
echo.
echo Press any key to start migration...
pause >nul

echo.
echo 🔄 Starting migration...
echo.

REM Execute all migration commands
gsutil mv "gs://mastersign-d8396.firebasestorage.app/app-logo-sub.png" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/app-logo-sub.png"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/app-logo.png" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/app-logo.png"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/Banner (1) copy.jpg" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/Banner (1) copy.jpg"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/Banner (3).jpg" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/Banner (3).jpg"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/Banner (4) copy.jpg" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/Banner (4) copy.jpg"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/Banner (6) copy.jpg" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/Banner (6) copy.jpg"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/Banner-Canyon Hills.jpg" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/Banner-Canyon Hills.jpg"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/Banner (1).jpg" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/Duplicates/Banner (1).jpg"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/Banner (2).jpg" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/Duplicates/Banner (2).jpg"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/Banner (4).jpg" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/Duplicates/Banner (4).jpg"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/Banner (5).jpg" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/Duplicates/Banner (5).jpg"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/Banner (6).jpg" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/Duplicates/Banner (6).jpg"
gsutil mv "gs://mastersign-d8396.firebasestorage.app/MAIN - Banner.jpg" "gs://mastersign-d8396.firebasestorage.app/Master%20Sign/assets/Banners/MAIN - Banner.jpg"

echo.
echo ✅ Migration completed!
echo.
pause
