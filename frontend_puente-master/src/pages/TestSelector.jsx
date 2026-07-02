import { PersonStanding, SquareChartGantt, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function TestSelector() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Encabezado */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Tests Vocacionales</h1>
        <p className="text-lg max-w-3xl mx-auto px-4">
          Explora nuestra selección de tests diseñados para ayudarte a descubrir tus intereses, habilidades y el camino profesional que mejor se adapte a ti.
        </p>
      </section>

      {/* Tests */}
      <section className="py-12 px-4 max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {/* Test de Intereses Profesionales */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white flex justify-center">
            <SquareChartGantt size={40} />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">Test de Autoconocimiento</h3>
            <p className="text-sm text-gray-600 mb-3">
              Descubre qué áreas profesionales se alinean mejor con tus intereses y preferencias personales.
            </p>
            <p className="text-sm text-gray-500 mb-3">Duración: 10 minutos</p>
            <Link
              to="/testAutoconocimiento"
              className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
            >
              Comenzar
            </Link>
          </div>
        </div>

        {/* Test de Aptitudes y Habilidades */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white flex justify-center">
            <SquareChartGantt size={40} />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">Test de Organización del Tiempo y Gestión económica</h3>
            <p className="text-sm text-gray-600 mb-3">
              Identifica tus fortalezas y habilidades naturales para encontrar profesiones donde puedas destacar.
            </p>
            <p className="text-sm text-gray-500 mb-3">Duración: 10 minutos</p>
            <Link
              to="/testGestionTiempo"
              className="bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700"
            >
                Comenzar
            </Link>
          </div>
        </div>

        {/* Test de Habilidades Cognitivas */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r  from-orange-600 to-yellow-600 p-6 text-white flex justify-center">
            <SquareChartGantt size={40} />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">Test de Habilidades Cognitivas</h3>
            <p className="text-sm text-gray-600 mb-3">
              Este test puede ayudarte a identificar áreas y puntos fuertes en los que destacas, lo cual es útil para orientar tu vocación o elección de carrera.
            </p>
            <p className="text-sm text-gray-500 mb-3">Duración: 10 minutos</p>
            <Link
              to="/testHabilidadesCognitivas"
              className="bg-orange-400 text-white text-sm px-4 py-2 rounded hover:bg-amber-700"
            >
                Comenzar
            </Link>
          </div>
        </div>

        {/* Test de Orientacion Vocacional */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r  from-sky-600 to-blue-600 p-6 text-white flex justify-center">
            <SquareChartGantt size={40} />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">Test de Orientación Vocacional</h3>
            <p className="text-sm text-gray-600 mb-3">
Descubrí qué carrera podrías estudiar siguiendo tus intereses y gustos con este test de orientación vocacional.          
</p>
            <p className="text-sm text-gray-500 mb-3">Duración: 10 minutos</p>
            <Link
              to="/testOrientacionVocacional"
              className="bg-blue-400 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
            >
                Comenzar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
