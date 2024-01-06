import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonCliente from "./button-login-client";
export async function AuthButtonServer() {
    
    const supabase = createServerComponentClient({cookies})
    const {data: {session}} = await supabase.auth.getSession();

    return <AuthButtonCliente session={session}/>


}