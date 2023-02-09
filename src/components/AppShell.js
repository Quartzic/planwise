import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    BellIcon,
    XMarkIcon,
    UserCircleIcon,
    CogIcon
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useAuth } from "./Auth.js";
import { Link } from "react-router-dom";
import lockup_white from "../assets/lockup-white.svg";

const navigation = [];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function AppShell({ children, ...props }) {
    let auth = useAuth();
    return (
        <>
            <div className="min-h-full">
                <div className="bg-gray-800 pb-32">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto sm:py-4 max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="sm:border-b border-gray-700">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <Link to="/">
                                            <img
                                                src={lockup_white}
                                                alt="Supabase"
                                                className="h-8"
                                            />
                                        </Link>

                                        {props.noNav ? null : (
                                            <div className="hidden md:block">
                                                <div className="ml-10 flex items-baseline space-x-4">
                                                    {navigation.map((item) => (
                                                        <NavLink
                                                            key={item.name}
                                                            to={item.href}
                                                            className={(
                                                                navData
                                                            ) =>
                                                                classNames(
                                                                    navData.isActive
                                                                        ? "bg-gray-900 text-white"
                                                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                                    "px-3 py-2 rounded-md text-sm font-medium"
                                                                )
                                                            }
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {props.noNav ? null : (
                                        <>
                                            <div className="hidden md:block">
                                                <div className="ml-4 flex items-center md:ml-6">
                                                    {/* Profile dropdown */}
                                                    <Menu
                                                        as="div"
                                                        className="relative ml-3"
                                                    >
                                                        <div>
                                                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                                <span className="sr-only">
                                                                    Open user
                                                                    menu
                                                                </span>
                                                                <CogIcon className="h-7 w-7 rounded-full text-white" />
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
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <a
                                                                            href="/settings"
                                                                            className={classNames(
                                                                                active
                                                                                    ? "bg-gray-100"
                                                                                    : "",
                                                                                "block px-4 py-2 text-sm text-gray-700"
                                                                            )}
                                                                        >
                                                                            Settings
                                                                        </a>
                                                                    )}
                                                                </Menu.Item>
{/*                                                                 <Menu.Item>
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <a
                                                                            href="/contactus"
                                                                            className={classNames(
                                                                                active
                                                                                    ? "bg-gray-100"
                                                                                    : "",
                                                                                "block px-4 py-2 text-sm text-gray-700"
                                                                            )}
                                                                        >
                                                                            Contact Us
                                                                        </a>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <a
                                                                            href="/aboutplanwise"
                                                                            className={classNames(
                                                                                active
                                                                                    ? "bg-gray-100"
                                                                                    : "",
                                                                                "block px-4 py-2 text-sm text-gray-700"
                                                                            )}
                                                                        >
                                                                            About Planwise
                                                                        </a>
                                                                    )}
                                                                </Menu.Item> */}
                                                                <Menu.Item>
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <button
                                                                            className={classNames(
                                                                                active
                                                                                    ? "bg-gray-100"
                                                                                    : "",
                                                                                "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                                                            )}
                                                                            onClick={() => {
                                                                                auth.signOut();
                                                                            }}
                                                                        >
                                                                            Sign
                                                                            out
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </div>
                                            </div>
                                            <div className="-mr-2 flex md:hidden">
                                                {/* Mobile menu button */}
                                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">
                                                        Open main menu
                                                    </span>
                                                    {open ? (
                                                        <XMarkIcon
                                                            className="block h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <Bars3Icon
                                                            className="block h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </Disclosure.Button>
                                            </div>{" "}
                                        </>
                                    )}
                                </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                "block px-3 py-2 rounded-md text-base font-medium"
                                            )}
                                            aria-current={
                                                item.current
                                                    ? "page"
                                                    : undefined
                                            }
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pt-4 pb-3">
                                    <div className="space-y-1 px-2">
                                        <Disclosure.Button
                                            as="a"
                                            href={"/settings"}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            Settings
                                        </Disclosure.Button>
                                        <Disclosure.Button
                                            onClick={() => {
                                                auth.signOut();
                                            }}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            Sign out
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                {props.title && (
                    <header className="">
                        <div className="mx-auto max-w-7xl py-4 px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                {props.title}
                            </h1>
                        </div>
                    </header>
                )}

            </div>

                <main className="-mt-32">
                    <div className="bg-white mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 mt-8 rounded shadow">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
