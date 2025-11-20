# 🚀 ขั้นตอนการ Deploy

## 1. สร้าง GitHub Repository (ทำก่อน!)
1. ไป https://github.com
2. คลิก "New" → ตั้งชื่อ `phumpat-mcp-thinking`
3. เลือก Public → Create repository

## 2. Push Code ขึ้น GitHub
```bash
# เปลี่ยน branch เป็น main
git branch -M main

# เพิ่ม remote origin (แทน YOUR_USERNAME ด้วยชื่อ GitHub ของคุณ)
git remote add origin https://github.com/YOUR_USERNAME/phumpat-mcp-thinking.git

# Push ขึ้น GitHub
git push -u origin main
```

## 3. Deploy ไป Railway
1. ไป https://railway.app
2. Login ด้วย GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. เลือก `phumpat-mcp-thinking`
5. Deploy อัตโนมัติ!

## 4. ได้ URL สำหรับทีม
Railway จะให้ URL เช่น:
`https://phumpat-mcp-thinking-production.up.railway.app`

## 5. Config VS Code สำหรับเพื่อน
```json
{
  "servers": {
    "phumpat-thinking": {
      "type": "http",
      "url": "https://phumpat-mcp-thinking-production.up.railway.app"
    }
  }
}
```

## 6. การใช้งาน
```
/mcp.phumpat-thinking.phumpat_think question="วิธีแก้ปัญหา X"
```