import { BASE_URL } from "../constant";
import { BaseResult } from "./types";

export interface ChecklistItem {
  id: number;
  name: string;
  items: {
    id: number;
    name: string;
    itemCompletionStatus: boolean;
  }[];
  checklistCompletionStatus: boolean;
}

export const API_getChecklist = async (token: string) => {
  const res = await fetch(`${BASE_URL}/checklist`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    try {
      const errorRes = (await res.json()) as BaseResult;
      if (errorRes?.errorMessage)
        return { success: false, message: errorRes.errorMessage };
      return { success: false, message: "Gagal melakukan pendaftaran" };
    } catch (error) {
      return { success: false, message: "Gagal melakukan pendaftaran" };
    }
  }
  const result = (await res.json()) as BaseResult & { data: ChecklistItem[] };
  return {
    success: true,
    message: result?.message || "Berhasil mendaftarkan user",
    data: result.data,
  };
};
