// utils/supabase/server.ts
"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "../../types_db";

export async function createClient() {
  // Next 15에서는 이렇게 await 붙여서 "얘는 동적임" 표시해줘야 경고 안 남
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // = anon key
    {
      cookies: {
        getAll() {
          // 현재 요청의 쿠키들 Supabase에 넘겨줌
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Supabase가 세션 유지하려고 쿠키 바꾸라고 줄 때 여기서 반영
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Component에서 호출될 때는 set 안 될 수 있음 -> 무시
            // (middleware가 리프레시 담당)
          }
        },
      },
    }
  );
}