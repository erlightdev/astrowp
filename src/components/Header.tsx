import React from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { ModeToggle } from './ModeToggle';
import { Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export function Header() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <a href="/" className="flex items-center">
            <MountainIcon className="h-6 w-6" />
            <span className="ml-2 font-bold">Astro WP</span>
          </a>
          <nav className="hidden md:flex gap-4">
            <a
              href="/"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Home
            </a>
            <a
              href="/about"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              About
            </a>
            <a
              href="/blog"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Blog
            </a>
            <a
              href="/contact"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign in
            </Button>
            <Button size="sm">Sign up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}