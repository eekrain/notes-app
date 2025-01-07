import { BASE_URL } from "../constant";
import { CreateChecklistForm } from "../schema";
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
  if (!res.ok) return { success: false, message: "Gagal fetch checklist" };

  const result = (await res.json()) as BaseResult & { data: ChecklistItem[] };
  return {
    success: true,
    message: result?.message || "",
    data: result.data,
  };
};

export const API_createChecklist = async (input: {
  token: string;
  input: CreateChecklistForm;
}) => {
  const res = await fetch(`${BASE_URL}/checklist`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${input.token}`,
    },
    body: JSON.stringify(input.input),
  });
  if (!res.ok) return { success: false, message: "Gagal menyimpan checklist" };

  const result = (await res.json()) as BaseResult & { data: ChecklistItem[] };
  console.log("🚀 ~ result:", result);
  return {
    success: true,
    message: result?.message || "Berhasil menyimpan checklist",
    data: result.data,
  };
};
