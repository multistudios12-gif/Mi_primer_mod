// Sistema de eventos del mod

const events = {
  // Evento cuando el jugador mata un mob
  onMobKill: (mob) => {
    console.log(`Mob asesinado: ${mob.name}`);
    // Aquí iría la lógica personalizada
  },

  // Evento cuando el jugador coloca un bloque
  onBlockPlace: (block, position) => {
    console.log(`Bloque colocado: ${block.name} en ${position}`);
  },

  // Evento cuando el jugador rompe un bloque
  onBlockBreak: (block, position) => {
    console.log(`Bloque roto: ${block.name} en ${position}`);
  },

  // Evento cuando el jugador recoge un objeto
  onItemPickup: (item) => {
    console.log(`Objeto recogido: ${item.name}`);
  }
};

module.exports = events;
