import { Library, Mic2, Settings } from 'lucide-react';
import { Outlet, NavLink } from 'react-router-dom';

export default function Layout() {
  const navItems = [
    { name: 'Projects', icon: Library, path: '/' },
    { name: 'Workspace', icon: Mic2, path: '/workspace' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-300 overflow-hidden">

      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 border-r border-zinc-800 bg-zinc-900/50">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-zinc-800">
          <span className="text-amber-500 font-bold text-xl tracking-wider hidden lg:block">
            <img src="SonusLab-full.png" className='w-25' alt="SonusLab" />
          </span>
          <span className="text-amber-500 font-bold text-xl lg:hidden">SL</span>
        </div>
        <nav className="flex-1 py-6 flex flex-col gap-2 lg:px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive
                  ? 'bg-zinc-800 text-amber-500'
                  : 'hover:bg-zinc-800/50 hover:text-zinc-100'
                }`
              }
            >
              <item.icon className="w-6 h-6 shrink-0" />
              <span className="font-medium hidden lg:block">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto pb-16 md:pb-0 relative">
        <Outlet />
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-zinc-950 border-t border-zinc-800 flex items-center justify-around z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-amber-500' : 'text-zinc-500 hover:text-zinc-300'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}