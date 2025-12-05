import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 text-center font-sans selection:bg-zinc-900 selection:text-white">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-6xl md:text-8xl text-zinc-900 leading-none">
          404 <br />
          <span className="text-zinc-400 font-urban">Not Found</span>
        </h1>

        <p className="text-xl md:text-2xl text-zinc-600 max-w-lg mx-auto leading-relaxed">
          La página que buscas no existe. Elige una sección para continuar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href="/hr"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full text-lg hover:bg-zinc-800 transition-all hover:scale-105"
          >
            Ver Portafolio Profesional
          </Link>

          <Link
            href="/home"
            className="w-full sm:w-auto px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full text-lg hover:bg-zinc-50 transition-all hover:scale-105 font-urban text-2xl"
          >
            Explorar Portafolio Creativo
          </Link>
        </div>
      </div>
    </div>
  );
}

