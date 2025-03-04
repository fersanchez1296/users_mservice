export const generateUsername = (req, res, next) => {
    try {
        const { Nombre } = req.body;

        if (!Nombre) {
            return res.status(400).json({ desc: "El campo 'Nombre' es obligatorio." });
        }

        // Función para eliminar acentos y reemplazar "ñ" por "n"
        const normalizeText = (text) =>
            text
                .normalize("NFD") // Descompone caracteres latinos con acentos
                .replace(/[\u0300-\u036f]/g, "") // Elimina marcas de acentos
                .replace(/ñ/g, "n")
                .replace(/Ñ/g, "N"); 
        
        const nameParts = Nombre.split(" ");

        if (nameParts.length < 2) {
            return res.status(400).json({
                error: "El 'Nombre' debe incluir al menos un nombre y un apellido.",
            });
        }

        // Toma el primer nombre y el primer apellido
        const firstName = nameParts[0];
        const lastName = nameParts[1]; // Primer apellido

        const firstInitial = normalizeText(firstName[0].toUpperCase()); // Primera letra del primer nombre
        const formattedLastName = normalizeText(
            lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
        ); // Primer apellido con capitalización correcta
        const randomNumbers = Math.floor(10 + Math.random() * 90); // Dos dígitos aleatorios (10 a 99)

        const username = `${firstInitial}${formattedLastName}${randomNumbers}`;

        req.body.Username = username; // Agrega el username al cuerpo de la solicitud
        return next(); // Pasa al siguiente middleware o controlador
    } catch (error) {
        return res.status(500).json({ desc: "Error al generar el username." });
    }
};
