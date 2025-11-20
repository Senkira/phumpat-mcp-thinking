# 🔧 เพิ่ม Remote Origin

## วิธีหา URL ที่ถูกต้อง:
1. ไป GitHub repo ที่เพิ่งสร้าง
2. ใน "Quick setup" จะมี URL แบบนี้:
   `https://github.com/YOUR_USERNAME/phumpat-mcp-thinking.git`

## แทนที่ YOUR_USERNAME ด้วยชื่อ GitHub ของคุณ:
```bash
git remote add origin https://github.com/YOUR_USERNAME/phumpat-mcp-thinking.git
git push -u origin main
```

## หรือ Copy URL จาก GitHub:
1. ไป GitHub repo
2. คลิก Code (สีเขียว)
3. Copy HTTPS URL
4. รัน: `git remote add origin [URL_ที่_COPY_มา]`

## หลัง Push สำเร็จ → Deploy ไป Railway:
1. ไป https://railway.app
2. Login ด้วย GitHub
3. New Project → Deploy from GitHub repo
4. เลือก `phumpat-mcp-thinking`
5. Deploy!