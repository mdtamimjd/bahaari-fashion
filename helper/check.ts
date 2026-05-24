import { auth } from "@/lib/auth";

export async function check_admin() {
    const session = await auth()
    if (!session) return { error: "Server error" }
    return session;
}