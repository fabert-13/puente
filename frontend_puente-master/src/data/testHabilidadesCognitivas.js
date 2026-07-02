const testHabilidadesCognitivas = [
  {
  "Razonamiento lógico": [
    {
      "pregunta": "Si tres libros cuestan $12, ¿cuánto costarán 5 libros del mismo precio?",
      "opciones": ["$20", "$18", "$15", "$10"],
      "respuesta_correcta": "$20"
    },
    {
      "pregunta": "En una familia, Pedro es el hijo de Carmen y hermano de Laura. Laura es la madre de Sofía. ¿Qué relación tiene Pedro con Sofía?",
      "opciones": ["Tío", "Hermano", "Primo", "Abuelo"],
      "respuesta_correcta": "Tío"
    }
  ],
  "Comprensión verbal": [
    {
      "pregunta": "Elige la palabra que tiene un significado opuesto a 'optimista':",
      "opciones": ["Pesimista", "Realista", "Entusiasta", "Idealista"],
      "respuesta_correcta": "Pesimista"
    },
    {
      "pregunta": "¿Cuál es el sinónimo de 'empeño'?",
      "opciones": ["Esfuerzo", "Disgusto", "Descanso", "Tristeza"],
      "respuesta_correcta": "Esfuerzo"
    }
  ],
  "Resolución de problemas": [
    {
      "pregunta": "Un tren viaja a una velocidad constante de 80 km/h. ¿Cuánto tiempo tardará en recorrer 240 km?",
      "opciones": ["3 horas", "2 horas", "4 horas", "5 horas"],
      "respuesta_correcta": "3 horas"
    },
    {
      "pregunta": "Tienes un cubo de hielo en un vaso de agua. Cuando se derrite completamente, ¿subirá o bajará el nivel de agua?",
      "opciones": ["Subirá", "Bajará", "Se mantendrá igual", "Ninguna respuesta es correcta"],
      "respuesta_correcta": "Se mantendrá igual"
    }
  ],
  "Atención y concentración": [
    {
      "pregunta": "Observar con atención, continuando con la secuencia ¿Qué opción corresponde al número siguiente?: 2, 4, 8, 16, ___",
      "opciones": ["32", "30", "24", "64"],
      "respuesta_correcta": "32"
    },
    {
      "pregunta": "En la siguiente lista de palabras, ¿cuál se repite solo una vez? Casa, perro, gato, perro, gato, flor, gato, casa",
      "opciones": ["Casa", "Árbol", "Gato", "Flor"],
      "respuesta_correcta": "Flor"
    }
  ],
  "Memoria de trabajo": [
    {
      "pregunta": "¿Cuántas letras 'S' hay en la siguiente secuencia? 'ASSMSSKLSMSSSM'",
      "opciones": ["5", "7", "6", "8"],
      "respuesta_correcta": "8"
    },
    {
      "pregunta": "¿Cuántas veces aparece el número '3' en la siguiente secuencia? '1233532235333'",
      "opciones": ["4", "5", "6", "7"],
      "respuesta_correcta": "7"
    }
  ],
  "Comprensión numérica": [
    {
      "pregunta": "Un agricultor siembra 10 hectáreas de trigo, cada hectárea produce 2000 kg, ¿Cuántos kilogramos de trigo produce en total?",
      "opciones": ["20000 kg", "15000 kg", "25000 kg", "30000 kg"],
      "respuesta_correcta": "20000 kg"
    },
    {
      "pregunta": "En un local, un celular nuevo sale $120.000 pesos y hay un descuento del 20%, ¿cuál es el precio con descuento?",
      "opciones": ["$100.000", "$96.000", "$90.000", "$110.000"],
      "respuesta_correcta": "$96.000"
    }
  ],
  "Razonamiento lógico abstracto": [
    {
      "pregunta": "Si 'CARTA' es igual a 'DBSUB', ¿cómo sería 'LIBRO'?",
      "opciones": ["MGWCS", "KIPWN", "HJGVQ", "MJCSP"],
      "respuesta_correcta": "MJCSP"
    },
    {
      "pregunta": "Observa la secuencia de símbolos y determina cuál debe seguir: ▲, ◯, ◆, ▲, ◯, ◆, ___",
      "opciones": ["◯", "◆", "▲", "■"],
      "respuesta_correcta": "▲"
    }
  ],
  "Creatividad": [
    {
      "pregunta": "¿Cómo puedes usar un lápiz para hacer una torre de cartas más estable?",
      "opciones": [
        "Colocarlo debajo de la base",
        "Usarlo para escribir en las cartas",
        "Colocarlo en el centro de las cartas",
        "No es posible"
      ],
      "respuesta_correcta": "Colocarlo debajo de la base"
    },
    {
      "pregunta": "¿Cómo puedes usar una cuchara para mantener una puerta entreabierta?",
      "opciones": [
        "Colocarla en el marco de la puerta",
        "Usarla para golpear la puerta y que se detenga",
        "Ponerla como un soporte en el suelo",
        "No es posible"
      ],
      "respuesta_correcta": "Ponerla como un soporte en el suelo"
    }
  ],
  "Pensamiento crítico": [
    {
      "pregunta": "Un hombre tiene tres hijas y cada hija tiene un hermano. ¿Cuántos hijos/as tiene en total?",
      "opciones": ["4", "3", "5", "6"],
      "respuesta_correcta": "4"
    },
    {
      "pregunta": "Un tren tiene capacidad para 100 pasajeros. En la primera estación suben 45 personas. En la segunda estación bajan 10 y suben 20 más. En la tercera suben 30, pero el tren ya no puede aceptar más pasajeros. ¿Cuántas personas había en el tren al inicio de la tercera estación?",
      "opciones": ["55", "65", "75", "85"],
      "respuesta_correcta": "55"
    }
  ],
  "Planificación": [
    {
      "pregunta": "Si tienes que organizar una fiesta, ¿cuál es el primer paso que tomarías?",
      "opciones": [
        "Elegir el lugar",
        "Hacer la lista de invitados",
        "Elegir el menú",
        "Comprar los decorativos"
      ],
      "respuesta_correcta": "Hacer la lista de invitados"
    },
    {
      "pregunta": "Si estás organizando un proyecto con un equipo, ¿cómo pueden garantizar que todos sigan el mismo plan?",
      "opciones": [
        "Asignando tareas sin discusión y esperando que todos sigan las instrucciones",
        "Explicando claramente el objetivo del proyecto, asignando roles según las habilidades y haciendo reuniones periódicas de seguimiento",
        "Permitiendo que cada miembro trabaje de manera independiente sin coordinación",
        "Dejando que el equipo decida el plan sin intervención tuya"
      ],
      "respuesta_correcta": "Explicando claramente el objetivo del proyecto, asignando roles según las habilidades y haciendo reuniones periódicas de seguimiento"
    }
  ]
}
]

export default testHabilidadesCognitivas;