import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client if key exists
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API endpoint for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        // Return a friendly, localized mock response if API Key is not set or placeholder
        return res.json({
          text: "Xin chào! Tôi là Trợ lý ảo chuyển đổi số của Tuổi trẻ Công an tỉnh Bắc Ninh. Hiện tại tính năng Trợ lý AI đang chạy ở chế độ ngoại tuyến (Chưa cấu hình API Key), tôi xin phép trả lời bạn dựa trên thông tin có sẵn: Bạn có thể tìm thấy hướng dẫn chi tiết về các Dịch vụ công trực tuyến (như Đăng ký thường trú, tạm trú, Lý lịch tư pháp) và các Tiện ích của VNeID ngay trên các chuyên mục tương ứng của website này. Chúc bạn có trải nghiệm tuyệt vời!"
        });
      }

      const systemInstruction = `Bạn là Trợ lý ảo chuyển đổi số thông minh của Đoàn Thanh niên Công an tỉnh Bắc Ninh (Tuổi trẻ Công an Bắc Ninh).
Nhiệm vụ của bạn là hỗ trợ, giải đáp cho người dân về các dịch vụ công trực tuyến (Cấp Phiếu lý lịch tư pháp, đăng ký thường trú/tạm trú, khai báo lưu trú, cấp căn cước công dân, đăng ký phương tiện, nộp phạt giao thông, tố giác tội phạm trực tuyến) và giới thiệu, hướng dẫn sử dụng ứng dụng VNeID (mức 1, mức 2, tích hợp giấy tờ, ví giấy tờ điện tử, thanh toán trực tuyến).

Yêu cầu về phong cách trả lời:
- Xưng hô lịch sự, thân thiện: "Trợ lý ảo Công an Bắc Ninh xin chào bạn!", hoặc xưng "Tôi"/"Trợ lý ảo" và gọi người dùng là "Bạn", "Anh/Chị", "Cô/Chú".
- Thể hiện tinh thần "Thanh niên Công an tiên phong, xung kích, vì nhân dân phục vụ".
- Trả lời ngắn gọn, rõ ràng, dễ hiểu, chia theo các bước cụ thể nếu là hướng dẫn thủ tục.
- Thông tin chính xác, tin cậy về địa bàn tỉnh Bắc Ninh. Địa chỉ Công an tỉnh Bắc Ninh: Số 14 đường Nguyễn Đăng Đạo, phường Tiền An, thành phố Bắc Ninh, tỉnh Bắc Ninh. Số điện thoại hỗ trợ: 0222.3822.415.
- Nếu người dân hỏi những câu không liên quan, hãy khéo léo dẫn dắt họ về chủ đề dịch vụ công, VNeID hoặc chuyển đổi số của Công an tỉnh.`;

      const contents = [];
      
      // Map history if provided
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          contents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text }]
          });
        }
      }
      
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
