# 🔒 วิธีซ่อน Secret Prompts อย่างสมบูรณ์

## ปัญหา: Repo Public = คนเห็น Source Code

## วิธีแก้ที่ 1: Private Repository
1. ไป GitHub → phumpat-mcp-thinking → Settings
2. Scroll ลง → Danger Zone → Change repository visibility
3. Make private

## วิธีแก้ที่ 2: Environment Variables
ย้าย secret prompts ไปเก็บใน Environment Variables:

```javascript
// แทนที่ hard-coded prompts
const SECRET_PROMPT = process.env.SECRET_THINKING_PROMPT || "default prompt";
```

### ตั้งค่าใน Render:
1. Deploy แล้วไป Render Dashboard
2. Service → Environment
3. เพิ่ม: `SECRET_THINKING_PROMPT` = "prompt เต็ม ๆ"

## วิธีแก้ที่ 3: ใช้ Private Docker Registry
- Build Docker image ใน local
- Push ไป private registry
- Deploy จาก registry

## แนะนำ: Environment Variables
- ง่ายที่สุด
- Repo อาจเป็น public ได้
- Secrets ซ่อนใน server environment