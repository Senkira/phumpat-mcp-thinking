import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import express from 'express';
import cors from 'cors';

// 🔒 SECRET THINKING PROMPT - ซ่อนจากผู้ใช้ MCP
const SECRET_TABLE_THINKING_PROMPT = `
🧠 **PHUMPAT THINKING TABLE FRAMEWORK**

คุณต้องปฏิบัติตามขั้นตอนนี้อย่างเคร่งครัดก่อนตอบคำถามใด ๆ:

## 📊 STEP 1: SOLUTION TABLE (บังคับทำก่อน)
สร้างตารางเปรียบเทียบทางเลือกในรูปแบบนี้:

| Solution | Pros | Cons | Complexity | Feasibility | Score (1-10) |
|----------|------|------|------------|-------------|--------------|
| Option A | • ข้อดี 1<br>• ข้อดี 2 | • ข้อเสีย 1<br>• ข้อเสีย 2 | Low/Med/High | High/Med/Low | X/10 |
| Option B | • ข้อดี 1<br>• ข้อดี 2 | • ข้อเสีย 1<br>• ข้อเสีย 2 | Low/Med/High | High/Med/Low | X/10 |
| Option C | • ข้อดี 1<br>• ข้อดี 2 | • ข้อเสีย 1<br>• ข้อเสีย 2 | Low/Med/High | High/Med/Low | X/10 |

## 🎯 STEP 2: SELECTED SOLUTION & REASONING
- **เลือก:** [ระบุ Option ที่เลือก]
- **เหตุผล:** [อธิบายทำไมเลือกตัวนี้]

## 📋 STEP 3: IMPLEMENTATION PLAN
1. [ขั้นตอนที่ 1]
2. [ขั้นตอนที่ 2]  
3. [ขั้นตอนที่ 3]

## ✅ STEP 4: FINAL ANSWER
[คำตอบสุดท้ายที่สมบูรณ์]

🚨 **CRITICAL RULES:**
- ห้ามตอบโดยไม่มีตาราง SOLUTION TABLE
- ต้องมีอย่างน้อย 2-3 ทางเลือก
- ต้องให้คะแนนทุก option
- ห้ามข้ามขั้นตอนใด ๆ เด็ดขาด
`;

// สร้าง MCP Server
const server = new Server(
  {
    name: "phumpat-thinking-framework",  
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// รายการ Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "phumpat_think",
        description: "🧠 Phumpat Thinking Framework - บังคับให้คิด solution เป็น table ก่อนตอบทุกครั้ง",
        inputSchema: {
          type: "object",
          properties: {
            question: {
              type: "string",
              description: "คำถามหรือปัญหาที่ต้องการแก้ไข"
            },
            context: {
              type: "string",
              description: "บริบทเพิ่มเติม (ไม่บังคับ)"
            }
          },
          required: ["question"]
        }
      }
    ]
  };
});

// Tool Handler 
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === "phumpat_think") {
    const { question, context } = args as { question: string; context?: string };
    
    // ส่ง SECRET PROMPT ให้ Copilot บังคับใช้
    const response = `${SECRET_TABLE_THINKING_PROMPT}

📝 **คำถาม/ปัญหา:** ${question}
${context ? `📋 **บริบท:** ${context}` : ""}

---

⚠️ **กรุณาปฏิบัติตาม PHUMPAT THINKING TABLE FRAMEWORK ข้างต้นอย่างเคร่งครัด**
⚠️ **ห้ามตอบทันทีโดยไม่ทำตาราง SOLUTION TABLE ก่อน**
⚠️ **ต้องมีอย่างน้อย 2-3 ทางเลือกในตาราง**
⚠️ **ต้องให้คะแนนทุก Option แล้วเลือกตัวที่ดีที่สุด**`;
    
    return {
      content: [
        {
          type: "text",
          text: response
        }
      ]
    };
  }
  
  throw new Error(`Unknown tool: ${name}`);
});

// เริ่มต้น MCP Server
async function main() {
  // ตรวจสอบว่าเป็น HTTP mode หรือ stdio mode
  const isHttpMode = process.env.MCP_HTTP_MODE === 'true' || process.argv.includes('--http');
  const port = parseInt(process.env.PORT || '3000');
  
  console.log(`Starting server - HTTP Mode: ${isHttpMode}, Port: ${port}`);
  
  if (isHttpMode) {
    // HTTP Mode สำหรับ hosting
    const app = express();
    
    // CORS สำหรับ cross-origin requests
    app.use(cors({
      origin: true,
      credentials: true
    }));
    
    app.use(express.json());
    
    // Health check endpoint
    app.get('/', (req: any, res: any) => {
      res.json({
        name: "🧠 Phumpat MCP Thinking Framework",
        version: "1.0.0",
        status: "running",
        description: "Forces thinking in table format before answering",
        tools: ["phumpat_think"],
        usage: "Use with VS Code MCP client: {\"servers\": {\"phumpat-thinking\": {\"type\": \"http\", \"url\": \"" + req.protocol + "://" + req.get('host') + "\"}}}",
        endpoint: "/mcp"
      });
    });
    
    // MCP endpoint - รับ JSON-RPC requests
    app.post('/mcp', async (req: any, res: any) => {
      try {
        const { method, params, id } = req.body;
        
        if (method === 'tools/list') {
          res.json({
            jsonrpc: "2.0",
            id,
            result: {
              tools: [
                {
                  name: "phumpat_think",
                  description: "🧠 Phumpat Thinking Framework - บังคับให้คิด solution เป็น table ก่อนตอบทุกครั้ง",
                  inputSchema: {
                    type: "object",
                    properties: {
                      question: {
                        type: "string",
                        description: "คำถามหรือปัญหาที่ต้องการแก้ไข"
                      },
                      context: {
                        type: "string",
                        description: "บริบทเพิ่มเติม (ไม่บังคับ)"
                      }
                    },
                    required: ["question"]
                  }
                }
              ]
            }
          });
        } else if (method === 'tools/call' && params?.name === 'phumpat_think') {
          const { question, context } = params.arguments || {};
          
          const response = `${SECRET_TABLE_THINKING_PROMPT}

📝 **คำถาม/ปัญหา:** ${question}
${context ? `📋 **บริบท:** ${context}` : ""}

---

⚠️ **กรุณาปฏิบัติตาม PHUMPAT THINKING TABLE FRAMEWORK ข้างต้นอย่างเคร่งครัด**
⚠️ **ห้ามตอบทันทีโดยไม่ทำตาราง SOLUTION TABLE ก่อน**
⚠️ **ต้องมีอย่างน้อย 2-3 ทางเลือกในตาราง**
⚠️ **ต้องให้คะแนนทุก Option แล้วเลือกตัวที่ดีที่สุด**`;
          
          res.json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: response
                }
              ]
            }
          });
        } else {
          res.status(400).json({
            jsonrpc: "2.0",
            id,
            error: { code: -32601, message: "Method not found" }
          });
        }
      } catch (error: any) {
        res.status(500).json({
          jsonrpc: "2.0",
          id: req.body.id,
          error: { code: -32603, message: error.message }
        });
      }
    });
    
    app.listen(port, '0.0.0.0', () => {
      console.log(`🌐 Phumpat MCP HTTP Server running on http://0.0.0.0:${port}`);
      console.log(`🔗 MCP Endpoint: http://0.0.0.0:${port}/mcp`);
      console.log(`📋 Config for VS Code: {"servers": {"phumpat-thinking": {"type": "http", "url": "http://localhost:${port}"}}}`);
      console.log("🔒 Secret thinking prompt loaded");
    });
    
  } else {
    // Stdio Mode สำหรับ local development
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("🧠 Phumpat MCP Thinking Framework Server is running (stdio)...");
    console.error("🔒 Secret thinking prompt loaded");
  }
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});