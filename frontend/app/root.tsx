import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Navbar from "./components/layout/Navbar";
import "./tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  {
    rel: "stylesheet",
    href: "https://rsms.me/inter/inter.css",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap",
  },
];

export default function App() {
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen h-full bg-white">
        <div className="min-h-screen">
          <Navbar />
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
