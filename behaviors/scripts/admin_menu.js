// Sistema de Menú Admin con Click Derecho
// Requiere el tag 'admin' para funcionar

import { world, system, ItemStack } from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';

const ADMIN_TAG = 'admin';
const PAPER_ID = 'minecraft:paper';

// Evento que se dispara cuando un jugador usa un item
world.beforeEvents.itemUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;

  // Verificar si el jugador tiene el tag admin
  if (!player.hasTag(ADMIN_TAG)) {
    return;
  }

  // Verificar si el item es papel
  if (item.typeId !== PAPER_ID) {
    return;
  }

  // Abrir el menú admin
  openAdminMenu(player);
});

/**
 * Abre el menú de administrador
 * @param {Player} player - El jugador que abre el menú
 */
function openAdminMenu(player) {
  const form = new ActionFormData()
    .title('🛡️ Sistema de Mime Prueba')
    .body('Selecciona una acción administrativa');

  form.button('💀 Matar a Todos\n/kill @a', 'textures/ui/icon_multiplayer');
  form.button('👁️ Modo Espectador\n/gamemode spectator', 'textures/ui/binoculars');

  form.show(player).then((result) => {
    if (result.canceled) {
      player.sendMessage('§7Menú cancelado');
      return;
    }

    handleAdminAction(player, result.selection);
  }).catch((error) => {
    console.error(`Error al abrir el menú admin: ${error}`);
  });
}

/**
 * Maneja las acciones seleccionadas en el menú
 * @param {Player} player - El jugador que ejecuta la acción
 * @param {number} selection - La opción seleccionada
 */
function handleAdminAction(player, selection) {
  switch (selection) {
    case 0:
      // Matar a todos
      executeKillAll(player);
      break;
    case 1:
      // Modo espectador
      executeSpectatorMode(player);
      break;
    default:
      player.sendMessage('§cAcción inválida');
      break;
  }
}

/**
 * Ejecuta el comando de matar a todos
 * @param {Player} admin - El administrador que ejecuta la acción
 */
function executeKillAll(admin) {
  try {
    const command = 'kill @a';
    admin.runCommandAsync(command);
    admin.sendMessage('§6[ADMIN]§r §cComando ejecutado: /kill @a');
    broadcastAdminAction(admin, 'MATÓ A TODOS LOS JUGADORES');
  } catch (error) {
    admin.sendMessage(`§c[ERROR]§r No se pudo ejecutar el comando: ${error}`);
  }
}

/**
 * Ejecuta el comando de modo espectador
 * @param {Player} admin - El administrador que ejecuta la acción
 */
function executeSpectatorMode(admin) {
  try {
    const command = 'gamemode spectator @s';
    admin.runCommandAsync(command);
    admin.sendMessage('§6[ADMIN]§r §aAhora estás en modo espectador');
    broadcastAdminAction(admin, 'ENTRÓ EN MODO ESPECTADOR');
  } catch (error) {
    admin.sendMessage(`§c[ERROR]§r No se pudo cambiar el gamemode: ${error}`);
  }
}

/**
 * Broadcast de acciones admin a todos los jugadores
 * @param {Player} admin - El administrador
 * @param {string} action - La acción realizada
 */
function broadcastAdminAction(admin, action) {
  const players = world.getAllPlayers();
  const message = `§4[ADMIN]§r ${admin.name} ${action}`;
  
  players.forEach(player => {
    player.sendMessage(message);
  });

  console.log(`[ADMIN] ${admin.name}: ${action}`);
}

// Exportar funciones
export { openAdminMenu, handleAdminAction };
