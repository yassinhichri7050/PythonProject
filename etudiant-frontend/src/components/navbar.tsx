// components/navbar.tsx
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className=" flex h-16 items-center justify-around px-4">
        <Link href="/" className="font-bold">
          Portail Étudiant
        </Link>
        
        <nav className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/register">Inscription</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/login">Connexion</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/profile">Mon Profil</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}