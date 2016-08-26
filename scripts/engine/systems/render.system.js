/**
 * Setup system
 *
 * @param entities
 */
$2D.systems.setup = function systemSetup ( entities ) {
    var entity, id;

    for(id in entities) {
		entity = {
			self: 		entities[id],
			components: entities[id].components,
			appearance:	entities[id].components.appearance ,
			position:	entities[id].components.position,
			size:		entities[id].components.size
		};

        entity.components.example.exName = 'player';
        if(entity.appearance && entity.position) {

        }
    }
};

/**
 * Render system
 *
 * @param entities
 */
$2D.systems.render = function systemRender ( entities ) {
    var entity, id;

    for(id in entities) {
		entity = {
			self: 		entities[id],
			components: entities[id].components,
			appearance:	entities[id].components.appearance,
			position:	entities[id].components.position,
			size:		entities[id].components.size
		};

        if(entity.appearance && entity.position) {

        }
    }
};