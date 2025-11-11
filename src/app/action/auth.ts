"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("로그인 실패:", error.message);
    throw new Error(error.message);
  }

  console.log("로그인 성공:", data.user?.email);
  redirect("/upload");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function SignupAction(formData: FormData){
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  const supabase = await createClient();

  const {error} = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error("회원가입 실패: ", error.message);
    throw new Error(error.message);
  }
  console.log("회원가입 성공", email);
  redirect("/login");
}