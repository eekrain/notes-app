import { BASE_URL } from "../constant";
import { SigninForm, SignupForm } from "../schema";
import { BaseResult } from "./types";

export const API_signIn = async (input: SigninForm) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    try {
      const errorRes = (await res.json()) as BaseResult;
      if (errorRes?.errorMessage)
        return { success: false, message: errorRes.errorMessage };
      return { success: false, message: "Gagal melakukan sign in" };
    } catch (error) {
      return { success: false, message: "Gagal melakukan sign in" };
    }
  }
  const result = (await res.json()) as BaseResult & {
    data: { token: string };
  };

  return {
    success: true,
    message: result?.message || "Berhasil masuk",
    data: result.data,
  };
};

export const API_signUp = async (input: SignupForm) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
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
  const result = (await res.json()) as BaseResult;
  return {
    success: true,
    message: result?.message || "Berhasil mendaftarkan user",
  };
};
