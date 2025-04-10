import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] min-h-screen p-8 gap-8 sm:p-20">
      <main className="flex flex-col items-center justify-center gap-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Bienvenue sur le</h1>
          <h1 className="text-4xl font-bold text-primary">Portail Étudiant</h1>
        </div>

        <p className="max-w-md text-lg text-muted-foreground">
          Gérez vos inscriptions, formations, départements et plus, dans une interface moderne et conviviale.
        </p>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Button asChild size="lg">
            <Link href="/register">S'inscrire</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">Se connecter</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}