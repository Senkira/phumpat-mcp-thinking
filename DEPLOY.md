# 🚀 Deploy ไป Railway

## ขั้นตอนการ Deploy

### 1. เตรียม Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Phumpat MCP Thinking Framework"
```

### 2. Push ไป GitHub
1. สร้าง repository ใหม่ใน GitHub ชื่อ `phumpat-mcp-thinking`
2. Push code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/phumpat-mcp-thinking.git
git branch -M main
git push -u origin main
```

### 3. Deploy บน Railway
1. ไป https://railway.app
2. Sign up/Login ด้วย GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. เลือก `phumpat-mcp-thinking` repository
5. Railway จะอ่าน `railway.yml` และ deploy อัตโนมัติ

### 4. Get URL
หลัง deploy เสร็จ Railway จะให้ URL เช่น:
`https://phumpat-mcp-thinking-production.up.railway.app`

### 5. Config VS Code สำหรับทีม
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

## 🎯 การใช้งานในทีม

1. **แชร์ URL**: ให้เพื่อนใน config `.vscode/mcp.json`
2. **ใช้ใน Copilot**: `/mcp.phumpat-thinking.phumpat_think question="คำถาม"`
3. **Secret จะซ่อน**: เพื่อนเห็นแค่ผลลัพธ์ table thinking

## 📊 Free Tier Limits
- Railway: 512MB RAM, $5 credit/month
- Render: 512MB RAM, 750 hours/month  
- Vercel: Unlimited แต่ timeout 10 วินาที