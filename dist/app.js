"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./class/database");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const bcrypt = require('bcrypt');
const SECRET_KEY = 'R9kHygkhN7mPb9sJY86rOwGxBwMAYJ-43ogMWWlzBe4I2y3QaiDMhxYKEjhN96czmaRt5Ihg42Uk250ud3kMKg';
const jwt = require('jsonwebtoken');
app.use(express_1.default.json());
const port = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    const db = new database_1.Database();
    db.connect()
        .then(() => {
        console.log('Conectado a la base de datos MySQL');
        // Operaciones con la base de datos
    })
        .catch(err => {
        console.error('Error al conectar con la base de datos', err);
    });
    res.send('¡Hola Mundo con TypeScript!');
});
//MEDICOS
app.get('/medicos', (req, res) => {
    const db = new database_1.Database();
    db.connect()
        .then(() => {
        db.query('SELECT IdNumeroColegiado, NombreMedico, ApellidoMedico FROM medicos')
            .then((results) => {
            const medicos = results.map(medico => ({
                id: medico.IdNumeroColegiado,
                nombreCompleto: `${medico.NombreMedico} ${medico.ApellidoMedico}`
            }));
            res.json(medicos);
        })
            .catch(error => {
            res.status(500).send('Error al realizar la consulta');
            console.error(error);
        });
    })
        .catch(err => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(err);
    });
});
app.delete('/medicos/:id', (req, res) => {
    const db = new database_1.Database();
    const id = req.params.id;
    db.connect()
        .then(() => {
        db.query('DELETE FROM medicos WHERE IdNumeroColegiado = ?', [id])
            .then(() => {
            res.send(`Médico con IdNumeroColegiado ${id} eliminado con éxito.`);
        })
            .catch(error => {
            res.status(500).send('Error al realizar la eliminación');
            console.error(error);
        });
    })
        .catch(err => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(err);
    });
});
app.get('/medicos/:id', (req, res) => {
    const db = new database_1.Database();
    const id = req.params.id;
    db.connect()
        .then(() => {
        // Seleccionar todas las columnas (o especifica las que necesites)
        db.query('SELECT * FROM medicos WHERE IdNumeroColegiado = ?', [id])
            .then(results => {
            if (results.length > 0) {
                res.json(results[0]); // Enviar los datos del médico encontrado
            }
            else {
                res.status(404).send(`Médico con IdNumeroColegiado ${id} no encontrado.`);
            }
        })
            .catch(error => {
            res.status(500).send('Error al realizar la selección');
            console.error(error);
        });
    })
        .catch(err => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(err);
    });
});
// Definición del endpoint PUT en tu servidor Express
app.put('/medicos/:id', (req, res) => {
    // Crear una nueva instancia de tu clase de base de datos
    const db = new database_1.Database();
    // Obtener el ID del médico desde el parámetro URL
    const id = req.params.id;
    // Obtener los datos del médico del cuerpo de la solicitud
    // 'req.body' contiene los datos enviados desde el cliente
    const datosMedico = req.body;
    console.log(datosMedico);
    // Conectar con la base de datos
    db.connect()
        .then(() => {
        // Crear la consulta SQL para actualizar los datos del médico
        // '?' son placeholders para los parámetros en la consulta para prevenir inyección SQL
        const query = 'UPDATE medicos SET NombreMedico = ?, ApellidoMedico = ?, Especialidad = ?, Consulta = ?, DisponibilidadMedico = ?, CorreoMedico = ?, Administrador = ? WHERE IdNumeroColegiado = ?';
        // Crear un array de parámetros para la consulta SQL
        const params = [
            datosMedico.NombreMedico,
            datosMedico.ApellidoMedico,
            datosMedico.Especialidad,
            datosMedico.Consulta,
            datosMedico.DisponibilidadMedico,
            datosMedico.CorreoMedico,
            datosMedico.Administrador,
            datosMedico.IdNumeroColegiado
        ];
        // Ejecutar la consulta SQL con los parámetros
        db.query(query, params)
            .then(() => {
            // Enviar una respuesta al cliente indicando que la actualización fue exitosa
            res.send(`Médico con IdNumeroColegiado ${id} actualizado con éxito.`);
        })
            .catch(error => {
            // Manejar errores en la consulta y enviar una respuesta de error
            res.status(500).send('Error al realizar la actualización');
            console.error(error);
        });
    })
        .catch(err => {
        // Manejar errores en la conexión a la base de datos y enviar una respuesta de error
        res.status(500).send('Error al conectar con la base de datos');
        console.error(err);
    });
});
app.post('/medicos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = new database_1.Database();
        const datosMedico = req.body;
        console.log(req.body);
        // Espera hasta que el hash esté listo
        const hash = yield registerUser(datosMedico.PasswordMedico);
        console.log('PassHash: ' + hash);
        yield db.connect();
        const query = 'INSERT INTO medicos (NombreMedico, ApellidoMedico, IdNumeroColegiado, Especialidad, Consulta, DisponibilidadMedico, CorreoMedico, PasswordMedico, Administrador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const params = [
            datosMedico.NombreMedico,
            datosMedico.ApellidoMedico,
            datosMedico.IdNumeroColegiado,
            datosMedico.Especialidad,
            datosMedico.Consulta,
            datosMedico.DisponibilidadMedico,
            datosMedico.CorreoMedico,
            hash, // Usa el hash generado
            datosMedico.Administrador
        ];
        const result = yield db.query(query, params);
        res.json({ message: `Médico agregado con éxito. ID: ${result.insertId}` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}));
function registerUser(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}
//LA TABLA MEDICAMENTOS NO EXISTE, ES MEDICAMENTO, ESTO NO SE QUE HACE AQUI O PARA QUE ES
//MEDICAMENTOS
// app.get('/medicamentos', (req, res) => {
//   const db = new Database();
//   db.connect()
//     .then(() => {
//       db.query('SELECT * FROM medicamentos')
//         .then((results: any[]) => {
//           const medicamentos = results.map(medicamento => ({
//             id: medicamento.idMedicamento,
//             nombre: medicamento.NombreMedicamento,
//             tipoMedicamento: medicamento.TipoMedicamento,
//             precio: medicamento.PagoMedicamento
//           }));
//           res.json(medicamentos);
//         })
//         .catch(error => {
//           res.status(500).send('Error al realizar la consulta');
//           console.error(error);
//         });
//     })
//     .catch(err => {
//       res.status(500).send('Error al conectar con la base de datos');
//       console.error(err);
//     });
// });
//CITAS TABLA
app.get('/citasTabla', (req, res) => {
    const db = new database_1.Database();
    db.connect()
        .then(() => {
        db.query('SELECT c.IdCita, p.NombrePaciente, p.ApellidoPaciente, m.Consulta, c.Fecha, c.Hora FROM Citas c INNER JOIN Pacientes p ON c.DNIPaciente = p.DNIPaciente INNER JOIN Medicos m ON c.IdNumeroColegiado = m.IdNumeroColegiado WHERE m.IdNumeroColegiado = "12345678"')
            .then((results) => {
            const citasTabla = results.map(citasTabla => {
                let fechaFormateada = citasTabla.Fecha;
                // Verifica si Fecha es un objeto Date y lo convierte a cadena
                if (fechaFormateada instanceof Date) {
                    fechaFormateada = fechaFormateada.toISOString();
                }
                // Ahora se puede usar split() de manera segura
                return {
                    id: citasTabla.IdCita,
                    nombrePaciente: citasTabla.NombrePaciente,
                    apellidoPaciente: citasTabla.ApellidoPaciente,
                    Consulta: citasTabla.Consulta,
                    Fecha: fechaFormateada.split("T")[0],
                    Hora: citasTabla.Hora
                };
            });
            res.json(citasTabla);
        })
            .catch(error => {
            res.status(500).send('Error al realizar la consulta');
            console.error(error);
        });
    })
        .catch(err => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(err);
    });
});
//Recetas médicas por medicamento
app.get('/recetasmedicamento', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new database_1.Database();
    db.connect()
        .then(() => {
        db.query('SELECT m.TipoMedicamento, COUNT(rm.idReceta) as NumeroDeRecetas FROM medicamento m INNER JOIN medicamento_has_recetasmedicas mhr ON m.idMedicamento = mhr.Medicamento_idMedicamento INNER JOIN recetasmedicas rm ON mhr.RecetasMedicas_idReceta = rm.idReceta GROUP BY m.TipoMedicamento;')
            .then((results) => {
            const recetas = results.map(receta => ({
                Medicamento: receta.TipoMedicamento,
                NumeroDeRecetas: receta.NumeroDeRecetas
            }));
            res.json(recetas);
        })
            .catch(error => {
            res.status(500).send('Error al realizar la consulta');
            console.error(error);
        })
            .finally(() => {
            db.close();
        });
    })
        .catch(error => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(error);
    });
}));
// -------------------------Seguros ------------------------
app.get('/segurosmedicos', (req, res) => {
    const db = new database_1.Database();
    db.connect()
        .then(() => {
        db.query('SELECT IdSeguroMedico, NombreSeguro FROM segurosmedicos')
            .then((results) => {
            const segurosmedicos = results.map(seguromedicos => ({
                IdSeguroMedico: seguromedicos.IdSeguroMedico,
                NombreSeguro: seguromedicos.NombreSeguro
            }));
            console.log(segurosmedicos);
            res.json(segurosmedicos);
        })
            .catch(error => {
            res.status(500).send('Error al realizar la consulta');
            console.error(error);
        });
    })
        .catch(err => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(err);
    });
});
// -------------------------PACIENTES ------------------------
app.get('/pacientes', (req, res) => {
    const db = new database_1.Database();
    db.connect()
        .then(() => {
        db.query('SELECT DNIPaciente, NombrePaciente, ApellidoPaciente FROM pacientes')
            .then((results) => {
            const pacientes = results.map(paciente => ({
                dni: paciente.DNIPaciente,
                nombreCompleto: `${paciente.NombrePaciente} ${paciente.ApellidoPaciente}`
            }));
            console.log(pacientes);
            res.json(pacientes);
        })
            .catch(error => {
            res.status(500).send('Error al realizar la consulta');
            console.error(error);
        });
    })
        .catch(err => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(err);
    });
});
app.get('/pacientes/:dniPaciente', (req, res) => {
    const db = new database_1.Database();
    const dniPaciente = req.params.dniPaciente;
    db.connect()
        .then(() => {
        db.query('SELECT * FROM pacientes WHERE DNIPaciente = ?', [dniPaciente])
            .then(results => {
            if (results.length > 0) {
                console.log(results);
                res.json(results[0]); // Enviar los datos del paciente encontrado
            }
            else {
                res.status(404).send(`Paciente con DNIPaciente ${dniPaciente} no encontrado.`);
            }
        })
            .catch(error => {
            res.status(500).send('Error al realizar la selección');
            console.error(error);
        });
    })
        .catch(err => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(err);
    });
});
app.post('/pacientes', (req, res) => {
    const db = new database_1.Database();
    const datosPaciente = req.body;
    console.log(req.body);
    db.connect()
        .then(() => {
        const query = 'INSERT INTO pacientes (NombrePaciente, ApellidoPaciente, DNIPaciente, DireccionPaciente, MovilPaciente, IdSeguroMedico, CorreoPaciente, PasswordPaciente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const params = [
            datosPaciente.NombrePaciente,
            datosPaciente.ApellidoPaciente,
            datosPaciente.DNIPaciente,
            datosPaciente.DireccionPaciente,
            datosPaciente.MovilPaciente,
            datosPaciente.IdSeguroMedico,
            datosPaciente.CorreoPaciente,
            datosPaciente.PasswordPaciente
        ];
        db.query(query, params)
            .then(result => {
            res.json({ message: `Paciente agregado con éxito. ID: ${result.insertId}` });
        })
            .catch(error => {
            res.status(500).json({ error: 'Error al añadir el paciente' });
            console.error(error);
        });
    })
        .catch(err => {
        res.status(500).json({ error: 'Error al conectar con la base de datos' });
        console.error(err);
    });
});
app.put('/pacientes/:dniPaciente', (req, res) => {
    const db = new database_1.Database();
    const dniPaciente = req.params.dniPaciente;
    const datosActualizados = req.body;
    db.connect()
        .then(() => {
        db.query('UPDATE pacientes SET ? WHERE DNIPaciente = ?', [datosActualizados, dniPaciente])
            .then(() => {
            res.send(`Paciente con DNIPaciente ${dniPaciente} actualizado con éxito`);
        })
            .catch(error => {
            res.status(500).send('Error al actualizar el paciente');
            console.error(error);
        });
    })
        .catch(err => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(err);
    });
});
app.delete('/pacientes/:dniPaciente', (req, res) => {
    const db = new database_1.Database();
    const dniPaciente = req.params.dniPaciente;
    db.connect()
        .then(() => {
        db.query('DELETE FROM pacientes WHERE DNIPaciente = ?', [dniPaciente])
            .then(() => {
            res.send(`Paciente con DNIPaciente ${dniPaciente} eliminado con éxito`);
        })
            .catch(error => {
            res.status(500).send('Error al eliminar el paciente');
            console.error(error);
        });
    })
        .catch(err => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(err);
    });
});
// -------------------------Login ------------------------
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //console.log(getUserByEmail(email));
        const user = yield getUserByEmail(email);
        //console.log(user);
        if (user === null) {
            console.log('Usuario no encontrado');
            return res.status(401).send('Usuario no encontrado.');
        }
        console.log('Pass: ' + password + ' hash: ' + user.PasswordMedico);
        const validPassword = yield bcrypt.compare(password, user.PasswordMedico);
        console.log(validPassword);
        if (!validPassword) {
            console.log('Contraseña incorrecta');
            return res.status(401).send('Contraseña incorrecta.');
        }
        if (user.Administrador !== 'Si') {
            console.log('No tiene permisos de Admin');
            return res.status(403).send('No tiene permisos de administrador.');
        }
        const token = jwt.sign({ id: user.IdNumeroColegiado }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
        console.log('TOKEN: ' + token);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
}));
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = new database_1.Database();
        yield db.connect();
        try {
            const results = yield db.query('SELECT * FROM medicos WHERE CorreoMedico = ?', [email]);
            if (results.length === 0) {
                return null;
            }
            console.log(results);
            return results[0];
        }
        catch (error) {
            throw error; // Podrías manejar el error de manera más específica aquí si lo deseas
        }
        finally {
            db.close();
        }
    });
}
// -------------------------CItas por dia ------------------------
// app.get('/citasPorDiaEnero/:anio', async (req, res) => {
//   const db = new Database();
//   const { anio } = req.params;
//   db.connect()
//     .then(() => {
//       // Fechas para enero del año especificado
//       const inicioEnero = `${anio}-01-01`;
//       const finEnero = `${anio}-01-31`;
//       const consultaSQL = `
//         SET @num := 0;
//         SELECT
//           fechas.Dia AS dia,
//           COALESCE(cantidad.cantidadCitas, 0) AS cantidadCitas
//         FROM
//           (SELECT @num := @num + 1 AS Dia FROM
//             (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) T1,
//             (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) T2,
//             (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) T3,
//             (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4) T4
//             LIMIT 31) AS fechas
//         LEFT JOIN
//           (SELECT DAY(Fecha) AS Dia, COUNT(*) AS cantidadCitas
//            FROM reservacitas.citas
//            WHERE Fecha BETWEEN ? AND ?
//            GROUP BY DAY(Fecha)) AS cantidad ON fechas.Dia = cantidad.Dia
//         ORDER BY fechas.Dia;
//       `;
//       // Ejecuta primero la instrucción SET
//       db.query('SET @num := 0;').then(() => {
//         // Luego ejecuta la consulta principal
//         db.query(consultaSQL, [inicioEnero, finEnero])
//         .then((results: any[]) => {
//             const citasPorDiaEnero = results.map(cita => ({
//               dia: cita.dia,
//               cantidadCitas: cita.cantidadCitas
//             }));
//             res.json(citasPorDiaEnero);
//           })
//           .catch(error => {
//             res.status(500).send('Error al realizar la consulta');
//             console.error(error);
//           })
//           .finally(() => {
//             db.close();
//           });
//       });
//     })
//     .catch(error => {
//       res.status(500).send('Error al conectar con la base de datos');
//       console.error(error);
//     });
// });
// -------------------------Citas por mes ------------------------
app.get('/citasPorMes2024', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new database_1.Database();
    db.connect()
        .then(() => {
        const inicio2024 = '2024-01-01';
        const fin2024 = '2024-12-31';
        const consultaSQL = `
  SELECT MONTH(Fecha) as mes, COUNT(*) as cantidadCitas
  FROM reservacitas.citas
  WHERE Fecha BETWEEN ? AND ?
  GROUP BY MONTH(Fecha)
  ORDER BY MONTH(Fecha);
`;
        db.query(consultaSQL, [inicio2024, fin2024])
            .then((results) => {
            const citasPorMes = results.map((cita) => ({
                mes: cita.mes,
                cantidadCitas: cita.cantidadCitas
            }));
            res.json(citasPorMes);
        })
            .catch(error => {
            res.status(500).send('Error al realizar la consulta');
            console.error(error);
        })
            .finally(() => {
            db.close();
        });
    })
        .catch(error => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(error);
    });
}));
// -------------------------Citas especialidad ------------------------
//Citas por especialidad
app.get('/citasespecialidad', (req, res) => {
    const db = new database_1.Database();
    db.connect()
        .then(() => {
        db.query('SELECT m.Especialidad, COUNT(c.IdCita) as NumeroDeCitas FROM medicos m INNER JOIN citas c ON m.IdNumeroColegiado = c.IdNumeroColegiado GROUP BY m.Especialidad;')
            .then((results) => {
            const citas = results.map(cita => ({
                Especialidad: cita.Especialidad,
                Citas: cita.NumeroDeCitas
            }));
            res.json(citas);
        })
            .catch(error => {
            res.status(500).send('Error al realizar la consulta');
            console.error(error);
        });
    })
        .catch(err => {
        res.status(500).send('Error al conectar con la base de datos');
        console.error(err);
    });
});
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
