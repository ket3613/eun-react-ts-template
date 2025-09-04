import Link from "next/link";

export default function SideNav() {
    const item = "block px-3 py-2 rounded hover:bg-gray-100";
    return (
        <aside className="w-52 border-r p-3">
            <nav className="space-y-1">
                <Link className={item} href="/">홈</Link>
                <Link className={item} href="/profile">프로필</Link>
                <Link className={item} href="/video">영상</Link>
                <Link className={item} href="/photo">사진</Link>
                <Link className={item} href="/files">파일(로그인 필요)</Link>
            </nav>
        </aside>
    );
}