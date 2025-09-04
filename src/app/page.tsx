"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = { href: string; label: string; private?: boolean };

const NAV: NavItem[] = [
    { href: "/", label: "홈" },
    { href: "/public/profile", label: "프로필" },
    { href: "/public/video", label: "영상" },
    { href: "/public/photo", label: "사진" },
    { href: "/private/files", label: "파일(로그인 필요)", private: true },
];

export default function Page() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const baseItem =
        "block rounded px-3 py-2 text-sm transition-colors";
    const active =
        "bg-gray-900 text-white dark:bg-white dark:text-gray-900";
    const hover =
        "hover:bg-gray-100 dark:hover:bg-gray-800";

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* 상단 헤더 (모바일 내비 버튼 포함) */}
            <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 backdrop-blur-sm">
                <button
                    className="md:hidden rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Open navigation"
                    onClick={() => setOpen(true)}
                >
                    {/* 햄버거 아이콘 */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
                <a href="/" className="font-semibold">Euntaek</a>
                <div className="hidden md:block text-xs opacity-60">Next.js + Tailwind</div>
            </header>

            <div className="mx-auto flex max-w-6xl">
                {/* 사이드바: 데스크톱 */}
                <aside className="sticky top-14 hidden h-[calc(100vh-56px)] w-60 shrink-0 border-r p-4 md:block">
                    <Nav pathname={pathname} baseItem={baseItem} active={active} hover={hover} />
                </aside>

                {/* 모바일 오버레이 메뉴 */}
                {open && (
                    <div
                        className="fixed inset-0 z-40 md:hidden"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
                        <div className="absolute left-0 top-0 h-full w-72 bg-[var(--background)] p-4 shadow-xl">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="font-semibold">메뉴</span>
                                <button
                                    className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    aria-label="Close navigation"
                                    onClick={() => setOpen(false)}
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                            <Nav
                                pathname={pathname}
                                baseItem={baseItem}
                                active={active}
                                hover={hover}
                                onNavigate={() => setOpen(false)}
                            />
                        </div>
                    </div>
                )}

                {/* 메인 콘텐츠 */}
                <main className="flex-1 p-6">
                    {/* Hero */}
                    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white">
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold">Euntaek Portfolio</h1>
                            <p className="mt-2 text-white/90">
                                Java · Spring Boot · React · AWS. 프로젝트와 작업물을 한곳에서.
                            </p>
                            <div className="mt-6 flex gap-3">
                                <Link
                                    href="/public/profile"
                                    className="rounded-lg bg-white px-4 py-2 font-medium text-blue-700 hover:bg-white/90"
                                >
                                    프로필
                                </Link>
                                <Link
                                    href="/public/photo"
                                    className="rounded-lg border border-white/40 px-4 py-2 hover:bg-white/10"
                                >
                                    사진
                                </Link>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
                    </section>

                    {/* 퀵 링크 카드 */}
                    <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Card title="프로필" desc="경력 요약과 기술 스택" href="/public/profile" />
                        <Card title="영상" desc="데모 및 발표 영상" href="/public/video" />
                        <Card title="사진" desc="스크린샷, 이미지 갤러리" href="/public/photo" />
                    </section>

                    {/* 통계 하이라이트 */}
                    <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <Stat label="완료 프로젝트" value="12" />
                        <Stat label="오픈소스 기여" value="34" />
                        <Stat label="올해 발표" value="5" />
                    </section>

                    {/* 최근 작업 리스트 */}
                    <section className="mt-6 overflow-hidden rounded-2xl border">
                        <div className="flex items-center justify-between border-b px-5 py-3">
                            <h2 className="text-lg font-semibold">최근 작업</h2>
                            <Link href="/public/video" className="text-sm text-blue-600 hover:underline">
                                더 보기
                            </Link>
                        </div>
                        <ul className="divide-y">
                            <Item title="항공 ERP 모듈 리팩터링" sub="Spring Boot · JPA · Query Optimization" />
                            <Item title="React 대시보드 성능개선" sub="React · TanStack Query · Code Splitting" />
                            <Item title="CI/CD 파이프라인 구축" sub="GitHub Actions · AWS" />
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}

/* ===== 재사용 컴포넌트 ===== */

function Nav({
    pathname,
    baseItem,
    active,
    hover,
    onNavigate,
}: {
    pathname: string;
    baseItem: string;
    active: string;
    hover: string;
    onNavigate?: () => void;
}) {
    return (
        <nav className="space-y-1">
            {NAV.map((n) => {
                const isActive = pathname === n.href;
                return (
                    <Link
                        key={n.href}
                        href={n.href}
                        onClick={onNavigate}
                        className={`${baseItem} ${isActive ? active : hover} flex items-center gap-2`}
                    >
                        <Dot private={n.private} />
                        <span>{n.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

function Dot({ private: isPrivate }: { private?: boolean }) {
    return (
        <span
            aria-hidden
            className={`h-2 w-2 rounded-full ${isPrivate ? "bg-red-500" : "bg-blue-500"
                }`}
        />
    );
}

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
    return (
        <Link
            href={href}
            className="group rounded-xl border bg-[var(--background)] p-5 transition hover:shadow-sm"
        >
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-[color:var(--foreground)/0.7]">{desc}</p>
            <span className="mt-3 inline-block text-sm text-blue-600 group-hover:underline">
                바로가기 →
            </span>
        </Link>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border p-5">
            <p className="text-sm opacity-60">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
    );
}

function Item({ title, sub }: { title: string; sub: string }) {
    return (
        <li className="px-5 py-4">
            <p className="font-medium">{title}</p>
            <p className="text-sm opacity-70">{sub}</p>
        </li>
    );
}