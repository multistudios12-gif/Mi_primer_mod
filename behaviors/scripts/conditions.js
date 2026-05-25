// Condiciones para comportamientos personalizados

const conditions = {
  // Verificar si es de día
  isDay: (world) => {
    return world.getTime() < 12000;
  },

  // Verificar si es de noche
  isNight: (world) => {
    return world.getTime() >= 12000;
  },

  // Verificar si el jugador tiene un item específico
  hasItem: (player, itemId) => {
    return player.inventory.contains(itemId);
  },

  // Verificar si el jugador está en lluvia
  isRaining: (world) => {
    return world.isRaining();
  }
};

module.exports = conditions;
