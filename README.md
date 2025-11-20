# 🧠 Phumpat-MCP-Thinking

MCP Server ที่บังคับให้คิด solution เป็น table ก่อนตอบคำถามทุกครั้ง สำหรับใช้กับ GitHub Copilot ใน VS Code

## 🎯 วัตถุประสงค์

บังคับให้ GitHub Copilot คิดอย่างเป็นระบบโดยสร้างตาราง Solution Table เปรียบเทียบทางเลือกต่าง ๆ ก่อนให้คำตอบสุดท้าย

## 🚀 การติดตั้งและใช้งาน

### Local Development
```bash
npm install
npm run build

# Stdio mode (local)
npm run dev

# HTTP mode (for sharing)
npm run dev:http
```

### Production
```bash
# Stdio mode
npm run start

# HTTP mode (for hosting)
npm run start:http
```

## 🌐 การ Host สำหรับทีม

### 1. Deploy ไปยัง Cloud Platform

**Railway:**
```bash
# Push ไป GitHub แล้วเชื่อมต่อกับ Railway
# Railway จะอ่าน railway.yml อัตโนมัติ
```

**Render:**
```bash
# เชื่อมต่อ GitHub repo กับ Render
# ใช้ render.yaml config
```

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Docker (VPS/Cloud):**
```bash
docker build -t phumpat-mcp .
docker run -p 3000:3000 phumpat-mcp
```

### 2. การ Config VS Code สำหรับทีม

**Local (stdio):**
```json
{
  "servers": {
    "phumpat-thinking": {
      "type": "stdio",
      "command": "npm", 
      "args": ["run", "dev"],
      "cwd": "/path/to/Phumpat-MCP-Thinking"
    }
  }
}
```

**Remote (HTTP):**
```json
{
  "servers": {
    "phumpat-thinking": {
      "type": "http",
      "url": "https://your-deployed-url.com"
    }
  }
}
```

## 🛠️ Tool Available

### `phumpat_think`
บังคับให้คิดเป็น table ก่อนตอบ

**Parameters:**
- `question` (required): คำถามที่ต้องการแก้ไข
- `context` (optional): บริบทเพิ่มเติม

**การใช้งานใน Copilot:**
```
/mcp.phumpat-thinking.phumpat_think question="วิธีออกแบบ database schema สำหรับ e-commerce"
```

## 📊 Thinking Framework

1. **SOLUTION TABLE** - เปรียบเทียบทางเลือก
2. **SELECTED SOLUTION** - เลือกและอธิบายเหตุผล  
3. **IMPLEMENTATION PLAN** - แผนดำเนินการ
4. **FINAL ANSWER** - คำตอบสุดท้าย

## 🔒 Security

- Secret prompts ซ่อนไว้ใน server
- ผู้ใช้มองเห็นแค่ผลลัพธ์
- ไม่เผย source code ให้ client