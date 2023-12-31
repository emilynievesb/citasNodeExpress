import executeQuery from "../utils/db.js";

class Date {
  cit_codigo;
  cit_fecha;
  cit_estadoCita;
  cit_medico;
  cit_datosUsuario;
  usu_id;
  med_id;
  fecha;
  genero;
  mes;
  constructor() {}

  async getDatesAlf() {
    let sql = /*sql*/ `
    SELECT c.cit_codigo AS CodigoCita,
    c.cit_fecha AS FechaCita,
    c.cit_estadoCita AS IdEstadoCita,
    e.estcita_nombre AS EstadoCita,
    c.cit_medico AS MedicoID,
    m.med_nombreCompleto AS MedicoNombre,
    c.cit_datosUsuario AS UsuarioID,
    u.usu_primer_apellido_usuar AS PrimerApellido,
    u. usu_nombre AS Nombre
    FROM cita c
    INNER JOIN usuario u ON c.cit_datosUsuario = u.usu_id
    INNER JOIN medico m ON c.cit_medico= m.med_nroMatriculaProsional
    INNER JOIN estado_cita e ON c.cit_estadoCita = e.estcita_id
    ORDER BY u.usu_primer_apellido_usuar, u.usu_nombre;
    `;
    try {
      const result = await executeQuery(sql);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  async getDateProx() {
    let sql = /*sql*/ `
    SELECT
    c.cit_codigo AS CodigoCita,
    c.cit_fecha AS FechaCita,
    c.cit_estadoCita AS IdEstadoCita,
    e.estcita_nombre AS EstadoCita,
    c.cit_medico AS MedicoID,
    m.med_nombreCompleto AS MedicoNombre,
    c.cit_datosUsuario AS UsuarioID,
    u.usu_primer_apellido_usuar AS PrimerApellido,
    u. usu_nombre AS Nombre
  FROM
    cita c
    INNER JOIN usuario u ON c.cit_datosUsuario = u.usu_id
    INNER JOIN medico m ON c.cit_medico= m.med_nroMatriculaProsional
    INNER JOIN estado_cita e ON c.cit_estadoCita = e.estcita_id
  WHERE
    c.cit_datosUsuario = ${this.usu_id}
    AND c.cit_fecha >= CURDATE()
  ORDER BY
    c.cit_fecha
  LIMIT 1;`;
    try {
      const result = await executeQuery(sql);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  async getDatesDoc() {
    let sql = /*sql*/ `
    SELECT u.usu_nombre AS NombrePaciente,
    u.usu_primer_apellido_usuar AS ApellidoPaciente,
    c.cit_fecha AS FechaCita,
    e.esp_nombre AS NombreEspecialidad,
    co.cons_nombre AS NombreConsultorio
    FROM cita c
    JOIN usuario u ON c.cit_datosUsuario = u.usu_id
    JOIN medico m ON c.cit_medico = m.med_nroMatriculaProsional
    INNER JOIN consultorio co ON m.med_consultario = co.cons_codigo
    INNER JOIN especialidad e ON m.med_especialidad = e.esp_id
    WHERE c.cit_medico = ${this.med_id}
    AND c.cit_estadoCita = 2;
    `;
    try {
      const result = await executeQuery(sql);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  async getDatePatient() {
    let sql = /*sql*/ `
    SELECT u.usu_nombre AS NombrePaciente,
    u.usu_primer_apellido_usuar AS ApellidoPaciente,
    c.cit_fecha AS FechaCita,
    co.cons_nombre AS NombreConsultorio,
    e.esp_nombre AS NombreEspecialidad,
    m.med_nombreCompleto AS NombreMedico
    FROM cita c
    INNER JOIN usuario u ON c.cit_datosUsuario = u.usu_id
    INNER JOIN medico m ON c.cit_medico = m.med_nroMatriculaProsional
    INNER JOIN consultorio co ON m.med_consultario = co.cons_codigo
    INNER JOIN especialidad e ON m.med_especialidad = e.esp_id
    WHERE c.cit_datosUsuario = ${this.usu_id};
    `;
    try {
      const result = await executeQuery(sql);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  async getDatesByDate() {
    let sql = /*sql*/ `
    SELECT u.usu_nombre AS NombrePaciente,
    u.usu_primer_apellido_usuar AS ApellidoPaciente,
    c.cit_fecha AS FechaCita,
    c.cit_estadoCita AS EstadoCita,
    co.cons_nombre AS NombreConsultorio,
    e.esp_nombre AS NombreEspecialidad,
    m.med_nombreCompleto AS NombreMedico
    FROM cita c
    INNER JOIN usuario u ON c.cit_datosUsuario = u.usu_id
    INNER JOIN medico m ON c.cit_medico = m.med_nroMatriculaProsional
    INNER JOIN consultorio co ON m.med_consultario = co.cons_codigo
    INNER JOIN especialidad e ON m.med_especialidad = e.esp_id
    WHERE c.cit_fecha = \"${this.fecha}\"
    AND c.cit_estadoCita = 2;
    `;
    try {
      const result = await executeQuery(sql);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  async getCountDatesByDocDate() {
    let sql = /*sql*/ `
    SELECT COUNT(*) AS NumeroCitas
    FROM cita
    WHERE cit_medico = ${this.med_id}
    AND cit_fecha = \"${this.fecha}\";
    `;
    try {
      const result = await executeQuery(sql);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  async getConsultorysPatient() {
    let sql = /*sql*/ `
    SELECT u.usu_nombre AS NombrePaciente,
    u.usu_primer_apellido_usuar AS ApellidoPaciente,
    c.cit_fecha AS FechaCita,
    co.cons_nombre AS NombreConsultorio
    FROM cita c
    INNER JOIN usuario u ON c.cit_datosUsuario = u.usu_id
    INNER JOIN medico m ON c.cit_medico = m.med_nroMatriculaProsional
    INNER JOIN consultorio co ON m.med_consultario = co.cons_codigo
    WHERE u.usu_id = ${this.usu_id} AND c.cit_estadoCita = 5;
    `;
    try {
      const result = await executeQuery(sql);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  async getDatesByGender() {
    let sql = /*sql*/ `
    SELECT u.usu_nombre AS NombrePaciente,
    u.usu_primer_apellido_usuar AS ApellidoPaciente,
    g.gen_nombre AS GeneroPaciente,
    c.cit_fecha AS FechaCita,
    co.cons_nombre AS NombreConsultorio,
    e.esp_nombre AS NombreEspecialidad,
    m.med_nombreCompleto AS NombreMedico
    FROM cita c
    INNER JOIN usuario u ON c.cit_datosUsuario = u.usu_id
    INNER JOIN medico m ON c.cit_medico = m.med_nroMatriculaProsional
    INNER JOIN genero g ON u.usu_genero = g.gen_id
    INNER JOIN consultorio co ON m.med_consultario = co.cons_codigo
    INNER JOIN especialidad e ON m.med_especialidad = e.esp_id
    WHERE g.gen_nombre = \"${this.genero}\" AND c.cit_estadoCita=5
    `;
    try {
      const result = await executeQuery(sql);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  async getDatesSuspendByMont() {
    let sql = /*sql*/ `
    SELECT c.cit_fecha AS FechaCita,
    u.usu_nombre AS NombreUsuario,
    m.med_nombreCompleto AS NombreMedico
    FROM cita c
    JOIN usuario u ON c.cit_datosUsuario = u.usu_id
    JOIN medico m ON c.cit_medico = m.med_nroMatriculaProsional
    WHERE MONTH(c.cit_fecha) = ${this.mes}
    AND c.cit_estadoCita = 8;
    `;
    try {
      const result = await executeQuery(sql);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
}

export { Date };
