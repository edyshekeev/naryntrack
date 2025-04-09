import { useGetMe } from "@/hooks/queries/useGetMe";
import Link from "next/link";

const Header = () => {

    const { data: user, isLoading } = useGetMe();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/admin'; // Hard redirect
    };

    return (
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link href={user.is_admin ? "/admin/dashboard" : "/admin/driver"}>
                <h1 className="text-xl font-bold text-gray-800">
                    Панель управления
                </h1>
            </Link>
            <nav className="space-x-4">
                <Link
                    href="/admin/changepassword"
                    className="text-gray-700 hover:text-blue-600 transition"
                >
                    Смена пароля
                </Link>
                <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 transition"
                >
                    Выйти
                </button>
            </nav>
        </header >
    );
};

export default Header;