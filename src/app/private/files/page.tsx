"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../providers/AuthProvider";

export default function FilesPage() {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => { if (!user) router.replace("/login?next=/files"); }, [user, router]);
    if (!user) return null;
    return <main className="p-6"><h1 className="text-xl font-bold">파일(보호)</h1></main>;
}