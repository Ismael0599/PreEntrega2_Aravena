

//!  Función para agregar eventos deportivos

function gestionarEventos() {
    let eventos = [];
    let agregarMasEventos = true;

    while (agregarMasEventos) {
        if (eventos.length >= 3) {
            agregarMasEventos = confirm(`Ya has agregado ${eventos.length} eventos. ¿Deseas agregar más eventos?`);
            if (!agregarMasEventos) {
                break;
            }
        }

        let nombreEvento = prompt(`(RECORDATORIO: Mínimo 3 eventos deportivos) \n Ingresa el nombre del evento deportivo: `);
        if (nombreEvento === null) {
            alert("Nos vemos!");
            return eventos; // Devuelve el array cuando se cancela
        }

        if (nombreEvento.trim()) {
            eventos.push({ nombre: nombreEvento, participantes: [] });
        } else {
            alert("El nombre del evento está vacío, intenta nuevamente");
        }
    }

    return eventos; // Devuelve el array cuando se completa
}


//! Función para añadir participantes a cada evento

function gestionarParticipantes(eventos) {
    eventos.forEach(evento => {
        let agregarMasParticipantes = true;

        while (agregarMasParticipantes) {
            if (evento.participantes.length >= 3) {
                agregarMasParticipantes = confirm(`Ya has agregado ${evento.participantes.length} participantes en el evento: ${evento.nombre} ¿Deseas agregar más?`);
                if (!agregarMasParticipantes) {
                    return; // Termina la función si se cancela
                }
            }

            let nombre = prompt("(RECORDATORIO: Debes ingresar al menos 3 participantes con su país) \n Ingrese el nombre del participante: ");
            let pais = prompt(`Ingrese el país del participante ${nombre}: `);

            if (nombre === null || pais === null) {
                alert("Nos vemos!");
                return; // Termina la función si se cancela
            }

            if (nombre.trim() && pais.trim()) { // Verifica que ambos campos no estén vacíos
                evento.participantes.push({ nombre: nombre, pais: pais });
            } else {
                alert("Debes completar ambos campos, intenta nuevamente");
            }
        }
    });
}

//! Función para asignar medallas a los 3 primeros participantes de cada evento

function asignarMedallas(eventos) {
    eventos.forEach(evento => {
        if (evento.participantes.length >= 3) { // Asegura que el evento tenga al menos 3 participantes

            let medallas = ['Oro', 'Plata', 'Bronce'];
            let participantes = [...evento.participantes]; // Copia del array para evitar modificaciones durante la asignación de medallas


            while (medallas.length > 0 && participantes.length > 0) {

                //* genera un número aleatorio desde el número 0 hasta la cantidad de participantes
                let numeroAleatorio = Math.floor(Math.random() * participantes.length);

                //* splice elimina el participante del array y devuelve un array con el participante eliminado (Posición "[0]")
                let participante = participantes.splice(numeroAleatorio, 1)[0];

                //* pop elimina el último elemento del array y permite guardarlo en una variable para asignar la medalla
                participante.medalla = medallas.pop();

                //* Busca al participante original en el array 'evento.participantes' que coincida con el seleccionado
                let originalParticipante = evento.participantes.find(p => p.nombre === participante.nombre && p.pais === participante.pais);

                if (originalParticipante) {
                    originalParticipante.medalla = participante.medalla; // Actualiza el participante original con la medalla
                }
            }
        }
    });
}


//! Función para simular los resultados de las olimpiadas

function simuladorJuegosOlimpicos() {
    alert("Bienvenido al simulador de los juegos olímpicos 2024");

    let eventos = gestionarEventos(); // Obtiene el array de eventos
    if (eventos.length === 0) return; // Termina si no hay eventos

    gestionarParticipantes(eventos); // Añade participantes a los eventos
    asignarMedallas(eventos); // Asigna medallas a los participantes

    eventos.forEach(evento => {
        console.log(`Evento: ${evento.nombre}`);
        evento.participantes.forEach(parti => {
            console.log(`Nombre: ${parti.nombre}, País: ${parti.pais}, Medalla: ${parti.medalla || 'Ninguna'}`);
        });
    });
}


simuladorJuegosOlimpicos(); // Ejecuta el simulador


