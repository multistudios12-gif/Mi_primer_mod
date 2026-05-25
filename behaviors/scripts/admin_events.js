// Script Event para el Sistema Admin
// Usa ScriptEvent para comunicación entre packs de comportamiento

import { world, system } from '@minecraft/server';\n
const ADMIN_SCRIPT_EVENT = 'mime:admin_action';

/**
 * Registra los script events para las acciones admin
 */
function registerAdminEvents() {
  world.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.id === ADMIN_SCRIPT_EVENT) {
      const messageArray = event.message.split(':');
      const action = messageArray[0];
      const player = event.sourceEntity;

      if (!player || !player.hasTag('admin')) {
        return;
      }

      processAdminEvent(player, action);
    }
  });

  console.log('✅ Sistema de eventos admin registrado');
}

/**
 * Procesa los eventos recibidos
 * @param {Player} player - El jugador que ejecuta el evento
 * @param {string} action - La acción a ejecutar
 */
function processAdminEvent(player, action) {
  switch (action) {
    case 'killall':
      player.runCommandAsync('kill @a');
      broadcastAction(player, 'MATÓ A TODOS');
      break;

    case 'spectator':
      player.runCommandAsync('gamemode spectator @s');
      broadcastAction(player, 'ENTRÓ EN MODO ESPECTADOR');
      break;

    case 'creative':
      player.runCommandAsync('gamemode creative @s');
      broadcastAction(player, 'ENTRÓ EN MODO CREATIVO');
      break;

    case 'survival':
      player.runCommandAsync('gamemode survival @s');
      broadcastAction(player, 'ENTRÓ EN MODO SUPERVIVENCIA');
      break;

    default:
      player.sendMessage(`§cAcción desconocida: ${action}`);
  }
}

/**
 * Anuncia una acción admin a todos
 * @param {Player} admin - El administrador
 * @param {string} action - La acción realizada
 */
function broadcastAction(admin, action) {
  const players = world.getAllPlayers();
  const message = `§4[ADMIN]§r §b${admin.name}§r ${action}`;
  
  players.forEach(p => {
    p.sendMessage(message);
  });

  console.log(`[ADMIN] ${admin.name}: ${action}`);
}

// Inicializar eventos al cargar el script
registerAdminEvents();

export { registerAdminEvents, processAdminEvent };
