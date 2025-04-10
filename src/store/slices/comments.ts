import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/ApiResponse";
import { CommentPost, CommentRes } from "../../models/Comment";
import api from "../../services/api";

interface CommentState {
  comments: CommentRes[];
  loading: boolean;
  error: string | null;
  posting: boolean;
  postError: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  posting: false,
  postError: null,
};

export const fetchCommentsByRoom = createAsyncThunk(
  "comments/fetchByRoom",
  async (roomId: number, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<CommentRes[]>>(
        `/binh-luan/lay-binh-luan-theo-phong/${roomId}`
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải bình luận"
      );
    }
  }
);

export const postComment = createAsyncThunk(
  "comments/postComment",
  async (newComment: CommentPost, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse<CommentRes>>(
        "/binh-luan",
        newComment
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi gửi bình luận"
      );
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postComment.pending, (state) => {
        state.posting = true;
        state.postError = null;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.posting = false;
        state.comments.unshift(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.posting = false;
        state.postError = action.payload as string;
      });
  },
});

export default commentSlice.reducer;
