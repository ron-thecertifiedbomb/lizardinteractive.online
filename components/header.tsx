import Link from "next/link";
import Image from "next/image";
import Container from "../components/container";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "About" },
    { href: "/blogs", label: "Blog" },
    { href: "/utilities", label: "Utilities" },
    { href: "/latest", label: "Latest" },
  ];

  return (
    <header className="py-6 bg-dark-bg text-white">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/lizardinteractive.png"
              alt="lizardinteractive logo"
              width={40}
              height={40}
              className="rounded-xl"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1 rounded-md font-medium transition-colors duration-200
                  ${pathname === link.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  );
}
