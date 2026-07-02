import { Link } from "react-router-dom";
import { Book, Zap, Lightbulb } from "lucide-react";
import bgImage from "./assets/background.png"; // ajustá la ruta si es necesario

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Encabezado con gradiente */}
      <section
        className="relative text-white px-4 text-center min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Capa de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-600 opacity-50" />

        {/* Contenido */}
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Bienvenido a la web del Programa PUENTE
          </h1>
          <p className="text-sm md:text-lg mb-8">
            Un espacio dedicado a ayudarte a descubrir tu vocación y construir
            tu futuro profesional. Explora nuestros tests vocacionales y
            encontrá el camino que mejor se adapte a tus habilidades e intereses.
          </p>
          <Link
            to="/tests"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            Explorar Tests Vocacionales
          </Link>
        </div>
      </section>

      {/* Secciones informativas */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="bg-blue-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4">
              <Lightbulb className="text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Descubre tu Vocación</h3>
            <p className="text-gray-600 text-sm">
              Nuestros tests están diseñados para ayudarte a identificar tus
              fortalezas y pasiones.
            </p>
          </div>

          <div>
            <div className="bg-blue-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4">
              <Book className="text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Aprende sobre Carreras
            </h3>
            <p className="text-gray-600 text-sm">
              Explora diferentes campos profesionales y descubre cuáles se
              alinean con tus intereses.
            </p>
          </div>

          <div>
            <div className="bg-blue-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4">
              <Zap className="text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Toma Acción</h3>
            <p className="text-gray-600 text-sm">
              Recibe recomendaciones personalizadas para dar los primeros pasos
              hacia tu futuro profesional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
