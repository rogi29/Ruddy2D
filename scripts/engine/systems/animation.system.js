/**
 * Movement Animation System
 *
 * @param entities
 */
$2D.systems.animateMovement = function(entities){
	var entity, id;

	for(id in entities) {
		entity = {
			self: 		entities[id],
			components: entities[id].components,
			appearance:	entities[id].components.appearance,
			animation:	entities[id].components.animation,
			movement:	entities[id].components.movement
		};
		
		if(entity.appearance && entity.animation && entity.movement){

		}
	}
};

/**
 * Animation system
 *
 * @param entities
 */
$2D.systems.animation = function(entities){
	var entity, id;

	for(id in entities){
		entity = {
			self: 		entities[id],
			components: entities[id].components,
			appearance:	entities[id].components.appearance,
			animation:	entities[id].components.animation
		};

		if(entity.appearance && entity.animation){

		}
    }
};
