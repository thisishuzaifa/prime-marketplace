import { Fragment } from 'react';
import { Link, NavLink, useLocation } from '@remix-run/react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  { name: 'Deals', href: '/deals' },
  { name: 'Stores', href: '/stores' },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-2xl font-display font-bold text-emerald-600">
                    PrimeBazaar
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }: { isActive: boolean }) =>
                        `inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-150
                        ${isActive ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:border-emerald-500 hover:text-gray-700'}`
                      }
                      aria-current={location.pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Search products..."
                      aria-label="Search products"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                  <Link
                    to="/cart"
                    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label="View cart"
                  >
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" aria-label="User menu">
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }: { active: boolean }) => (
                            <Link
                              to="/account"
                              className={`$${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                            >
                              Your Account
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }: { active: boolean }) => (
                            <Link
                              to="/orders"
                              className={`$${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                            >
                              Orders
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }: { active: boolean }) => (
                            <Link
                              to="/logout"
                              className={`$${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                  aria-label={open ? 'Close main menu' : 'Open main menu'}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={({ isActive }: { isActive: boolean }) =>
                    `block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-colors duration-150
                    ${isActive ? 'border-emerald-600 text-emerald-700 bg-gray-50' : 'border-transparent text-gray-500 hover:border-emerald-500 hover:bg-gray-50 hover:text-gray-700'}`
                  }
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 