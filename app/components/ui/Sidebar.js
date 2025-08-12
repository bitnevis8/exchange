'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BuildingOffice2Icon as WarehouseIcon,
  CubeIcon as PackageIcon,
  ClipboardDocumentListIcon as ClipboardListIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  {
    title: 'داشبورد',
    path: '/dashboard',
    icon: '🏠',
  },
  {
    title: 'حسابداری',
    icon: '💹',
    submenu: [
      { title: 'ارزها', path: '/dashboard/accounting/currencies', icon: '💱' },
      { title: 'مشتریان', path: '/dashboard/accounting/customers', icon: '🧑‍💼' },
      { title: 'حساب‌ها', path: '/dashboard/accounting/accounts', icon: '🏦' },
      { title: 'تراکنش‌ها', path: '/dashboard/accounting/transactions', icon: '📈' },
      { title: 'فاکتورها', path: '/dashboard/accounting/invoices', icon: '🧾' },
      { title: 'شرکت‌ها', path: '/dashboard/accounting/companies', icon: '🏢' },
    ],
  },
  // {
  //   title: 'تنظیمات',
  //   icon: '⚙️',
  //   submenu: [
  //     { title: 'مدیریت مراکز', path: '/dashboard/settings/unit-locations', icon: '📍' },
  //     { title: 'مدیریت نرخ‌ها', path: '/dashboard/settings/rate-settings', icon: '💰' },
  //   ],
  // },
  {
    title: 'مدیریت کاربران',
    icon: '👤',
    submenu: [
      { title: 'لیست کاربران', path: '/dashboard/user-management/users', icon: '🧑‍💼' },
      { title: 'لیست نقش‌ها', path: '/dashboard/user-management/roles', icon: '🛡️' },
    ],
  },
];

export default function Sidebar({ onLinkClick }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <aside className="w-64 h-screen bg-slate-50 text-cyan-800 p-4">
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <div key={item.title} className="space-y-1">
            {item.submenu ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-cyan-600 hover:text-white transition-colors ${
                    openMenu === item.title ? 'bg-cyan-600 text-white' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <span className="ml-2">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <span className="text-lg">
                    {openMenu === item.title ? '▼' : '▶'}
                  </span>
                </button>
                
                {openMenu === item.title && (
                  <div className="mr-4 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        href={subItem.path}
                        onClick={onLinkClick}
                        className={`flex items-center p-2 rounded-lg hover:bg-cyan-600 hover:text-white transition-colors ${
                          isActive(subItem.path) ? 'bg-cyan-50' : ''
                        }`}
                      >
                        <span className="ml-2">{subItem.icon}</span>
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.path}
                onClick={onLinkClick}
                className={`flex items-center p-2 rounded-lg hover:bg-cyan-600  transition-colors ${
                  isActive(item.path) ? 'bg-cyan-600 text-white' : ''
                }`}
              >
                <span className="ml-2">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
} 