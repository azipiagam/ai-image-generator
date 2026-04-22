@echo off
title Backend AI Image Generator

cd /d "C:\ai-image-generator\backend_ai"

echo Menjalankan FastAPI Backend...
echo ===============================

python -m uvicorn app.main:app --host 0.0.0.0 --port 8005

pause