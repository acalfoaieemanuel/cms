import axios from "axios";
import { ContentDto } from "@/models/content";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5183/api",
  headers: { "Content-Type": "application/json" },
});

export const contentApi = {
  async getAll(): Promise<ContentDto[]> {
    const res = await api.get<ContentDto[]>("/content");
    return res.data;
  },

  async getById(id: string): Promise<ContentDto> {
    const res = await api.get<ContentDto>(`/content/${id}`);
    return res.data;
  },

  async create(content: ContentDto): Promise<ContentDto> {
    const res = await api.post<ContentDto>("/content", content);
    return res.data;
  },

  async update(id: string, content: ContentDto): Promise<void> {
    await api.put(`/content/${id}`, content);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/content/${id}`);
  },
};
