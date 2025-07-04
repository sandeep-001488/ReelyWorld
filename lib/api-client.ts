import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo, "_id" | "createdAt" | "updatedAt">;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<any> {
    const { method = "GET", body, headers = {} } = options;
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const res = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return res.json();
  }

  async getVideos(): Promise<IVideo[]> {
    return this.fetch("/videos");
  }

  async getAVideo(id: string): Promise<IVideo> {
    return this.fetch(`/videos/${id}`);
  }

  async createVideo(videoData: VideoFormData): Promise<IVideo> {
    return this.fetch("/videos", {
      method: "POST",
      body: videoData,
    });
  }
}

export const apiClient = new ApiClient();
