// src/components/Sidebar.jsx
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import {
    HomeIcon,
    Cog6ToothIcon,
    ClipboardDocumentListIcon,
    ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import logo from '../../assets/logo.png';

export default function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        // await logout();
        navigate('/', { replace: true });
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg
     ${isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`;

    return (
        /* add drawer-mobile so content is pushed, not covered */
        <div className="drawer drawer-mobile lg:drawer-open">
            {/* 1️⃣ toggle checkbox */}
            <input id="app-drawer" type="checkbox" className="drawer-toggle" />

            {/* 2️⃣ main area now renders routed pages */}
            <div className="drawer-content flex flex-col">
                {/* hamburger visible only on mobile */}
                <label htmlFor="app-drawer" className="btn btn-ghost lg:hidden m-2 w-max">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </label>

                {/* routed component appears here */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            {/* 3️⃣ sidebar itself */}
            {/* ─── sidebar ───────────────────────────────────────────────────── */}
            <div className="drawer-side">
                <label htmlFor="app-drawer" className="drawer-overlay" />

                {/* ①  make the whole sidebar a flex column that is as tall as the screen */}
                <aside className="w-64 h-full bg-base-100 border-r border-base-300 flex flex-col">
                    <div className="p-4">
                        <img src={logo} alt="Logo" className="w-1/2 h-auto mx-auto mb-4" />
                    </div>

                    {/* ②  let the list grow to fill remaining height */}
                    <ul className="menu flex flex-col flex-1 space-y-1 w-full">
                        <li>
                            <NavLink to="/home" className={linkClass}>
                                <HomeIcon className="h-5 w-5" />
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/task-management" className={linkClass}>
                                <ClipboardDocumentListIcon className="h-5 w-5" />
                                Tasks
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/settings" className={linkClass}>
                                <Cog6ToothIcon className="h-5 w-5" />
                                Settings
                            </NavLink>
                        </li>

                        {/* ③  this auto‑margin now has room to push itself to the bottom */}
                        <li className="mt-auto">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-200 w-full"
                            >
                                <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </aside>
            </div>

        </div>
    );
}
