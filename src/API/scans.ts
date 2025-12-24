import { api } from "@/lib/api";

export interface ScanResult {
  id: string;
  disease: string;
  confidence: number;
  severity: "mild" | "moderate" | "severe" | "unknown";
  summary: string;
  recommendations: string[];
  provider: "gemini" | "perplexity";
}

export const scanPlantImage = async (file: File): Promise<ScanResult> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post<ScanResult>("/api/scan/plant", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getScanById = async (id: string): Promise<ScanResult> => {
  const response = await api.get<ScanResult>(`/api/scan/${id}`, {
    withCredentials: true,
  });
  console.log("getScanById response:", response);
  return response.data;
};
