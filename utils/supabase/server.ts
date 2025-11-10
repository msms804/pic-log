import {cookies} from "next/headers"
import { createServerClient } from "@supabase/ssr"

export async function createClient(){
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL! as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
        {
            cookies: {
                get(name){
                    return cookieStore.get(name)?.value;
                },
                set(){
                    // Next.js App Router에서 middleware가 처리하니까 여기선 비워둬도 됨
                },
                remove(){
                // Next.js App Router에서 middleware가 처리하니까 여기선 비워둬도 됨
                },
            }
        }
    
    )
}