// app/@modal/(...)signup/page.tsx
"use client";

import SignupForm from "@/app/_component/SignupForm";
import ModalFrame from "@/app/_component/ModalFrame";
import { useSearchParams } from "next/navigation";

export default function SignupModal(){
    const sp = useSearchParams();
    const redirect = sp.get("redirect") || "/";

    return(
        <ModalFrame title="Signup">
            <SignupForm redirect={redirect}/>
        </ModalFrame>
    )
}