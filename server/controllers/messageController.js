import Chat from "../models/chat.js";

//Text-based AI Chat Message Controller
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, prompt } = req.body;

    const chat = await Chat.findOne({ userId, _id: chatId });
    chat.messages.push({
      role: "User",
      content: prompt,
      timestamp: Date.now(),
      ifImage: false,
    });
  } catch (error) {}
};
