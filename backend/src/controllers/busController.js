const pool = require('../config/db');

// 1. Obtener todos los asientos y liberar los expirados (> 10 minutos)
const obtenerAsientos = async (req, res) => {
  try {
    // Primero, liberamos de forma automática los asientos cuyo tiempo de bloqueo ya expiró
    await pool.query(`
      UPDATE asientos 
      SET estado = 'disponible', bloqueado_hasta = NULL, usuario_bloqueo = NULL 
      WHERE estado = 'bloqueado' AND bloqueado_hasta < NOW()
    `);

    // Consultamos todos los asientos actualizados
    const resultado = await pool.query('SELECT * FROM asientos ORDER BY numero_asiento ASC');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener asientos:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener los asientos.' });
  }
};

// 2. Bloquear un asiento por 10 minutos
const bloquearAsiento = async (req, res) => {
  const { numero_asiento, usuario } = req.body;

  try {
    // Verificar estado actual del asiento
    const asientoCheck = await pool.query('SELECT * FROM asientos WHERE numero_asiento = $1', [numero_asiento]);
    
    if (asientoCheck.rows.length === 0) {
      return res.status(404).json({ error: 'El asiento no existe.' });
    }

    const asiento = asientoCheck.rows[0];

    // Si está ocupado definitivamente
    if (asiento.estado === 'ocupado') {
      return res.status(400).json({ error: 'Este asiento ya fue comprado y está ocupado.' });
    }

    // Si está bloqueado por otra persona y aún no expira el tiempo
    if (asiento.estado === 'bloqueado' && new Date(asiento.bloqueado_hasta) > new Date()) {
      return res.status(400).json({ error: 'Este asiento está temporalmente seleccionado por otro usuario.' });
    }

    // Bloquear el asiento sumando exactamente 10 minutos a la hora actual
    const resultado = await pool.query(`
      UPDATE asientos 
      SET estado = 'bloqueado', 
          bloqueado_hasta = NOW() + INTERVAL '10 minutes', 
          usuario_bloqueo = $1 
      WHERE numero_asiento = $2 
      RETURNING *`,
      [usuario || 'Cliente Anónimo', numero_asiento]
    );

    res.json({
      mensaje: 'Asiento bloqueado con éxito por 10 minutos. ¡Finaliza tu compra!',
      asiento: resultado.rows[0]
    });

  } catch (error) {
    console.error('Error al bloquear asiento:', error);
    res.status(500).json({ error: 'Error al procesar el bloqueo del asiento.' });
  }
};

module.exports = {
  obtenerAsientos,
  bloquearAsiento
};