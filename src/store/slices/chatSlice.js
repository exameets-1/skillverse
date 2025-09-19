import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCourseSpecificPrompt } from "@/utils/prompt";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ message, courseData }, { rejectWithValue }) => {
    const userMessage = { role: "user", content: message };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          systemPrompt: getCourseSpecificPrompt(courseData),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = { role: "assistant", content: data.response };

      return { userMessage, assistantMessage };
    } catch (error) {
      console.error("Chat API error:", error);
      return rejectWithValue(error.message || "Failed to send message");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload.userMessage);
        state.messages.push(action.payload.assistantMessage);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send message";
        state.messages.push({
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        });
      });
  },
});

export const { clearMessages } = chatSlice.actions;
export const { addUserMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
