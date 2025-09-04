"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../providers/AuthProvider";

export default function LoginPage() {
    const router = useRouter();
    const sp = useSearchParams();
    const next = sp.get("next") || "/";
    const { login } = useAuth();

    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        if (!name || !pw) {
            setErr("이름과 비밀번호를 입력하세요.");
            return;
        }

        try {
            setLoading(true);
            // 실제 서비스라면 여기서 API 호출
            await new Promise((r) => setTimeout(r, 400)); // demo delay
            login(name);
            router.replace(next);
        } catch (e) {
            setErr("로그인에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen grid place-items-center p-6 bg-[var(--background)] text-[var(--foreground)] animate-[fade-in-up_.35s_ease-out_both]">
            <div className="w-full max-w-md rounded-2xl border p-6 shadow-sm bg-[var(--background)]">
                <header className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">로그인</h1>
                    <p className="mt-1 text-sm opacity-70">계정을 입력해 주세요.</p>
                </header>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">이름</label>
                        <input
                            id="name"
                            type="text"
                            autoComplete="username"
                            className="mt-1 w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="홍길동"
                        />
                    </div>

                    <div>
                        <label htmlFor="pw" className="block text-sm font-medium">비밀번호</label>
                        <div className="mt-1 flex items-stretch gap-2">
                            <input
                                id="pw"
                                type={showPw ? "text" : "password"}
                                autoComplete="current-password"
                                className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw((v) => !v)}
                                aria-pressed={showPw}
                                className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
                                title={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
                            >
                                {showPw ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {err && (
                        <p role="alert" className="text-sm text-red-600">{err}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                        {loading ? "로그인 중..." : "로그인"}
                    </button>
                </form>

                <div className="mt-4 flex items-center justify-between text-sm">
                    <Link className="text-blue-600 hover:underline" href="/register">회원가입</Link>
                    <Link className="text-blue-600 hover:underline" href="/">홈으로</Link>
                </div>

                {/* 안내 */}
                {next !== "/" && (
                    <p className="mt-4 text-center text-xs opacity-60">
                        로그인 후 <span className="font-medium">{next}</span> 경로로 이동합니다.
                    </p>
                )}
            </div>
        </main>
    );
}