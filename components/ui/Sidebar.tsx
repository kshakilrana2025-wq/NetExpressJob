'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState('user');
  const [subadminRole, setSubadminRole] = useState('');

  useEffect(() => {
    fetch('/api/auth/me').then(res => res.json()).then(data => {
      if (data.user) {
        setRole(data.user.role);
        setSubadminRole(data.user.subadminRole);
      }
    }).catch(() => {});
  }, []);

  const studentLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/wallet', label: 'Wallet', icon: '💰' },
    { href: '/referrals', label: 'Referrals', icon: '👥' },
    { href: '/tasks', label: 'Tasks', icon: '📋' },
    { href: '/withdraw', label: 'Withdraw', icon: '💸' },
  ];

  const subadminLinks = [
    { href: '/subadmin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/subadmin/users', label: 'My Users', icon: '👥' },
    { href: '/subadmin/earnings', label: 'Earnings', icon: '💰' },
    { href: '/subadmin/withdraw', label: 'Withdraw', icon: '💸' },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/subadmins', label: 'Subadmins', icon: '👑' },
    { href: '/admin/tasks', label: 'Tasks', icon: '📋' },
    { href: '/admin/payments', label: 'Payments', icon: '💳' },
    { href: '/admin/withdrawals', label: 'Withdrawals', icon: '💸' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  let links = studentLinks;
  if (role === 'subadmin') links = subadminLinks;
  if (role === 'admin') links = adminLinks;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="w-64 bg-gray-800 h-screen sticky top-0 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <img src="https://i.ibb.co.com/bjcsBPvg/Logo.png" alt="Logo" className="h-8" />
          <span className="text-white font-bold">NetExpressJob</span>
        </div>
      </div>
      <nav className="flex-1 py-4">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 transition ${
              pathname === link.href ? 'bg-gray-700 text-white' : ''
            }`}
          >
            <span>{link.icon}</span> {link.label}
          </Link>
        ))}
      </nav>
      <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 transition border-t border-gray-700">
        🚪 Logout
      </button>
    </div>
  );
}
