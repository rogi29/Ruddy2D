/**
 * Movement system
 *
 * @param entities
 */
$2D.systems.movement = function( entities ){
	var entity, id;
	
	for(id in entities) {
		entity = {
			self: 		entities[id],
			components: entities[id].components,
			position:	entities[id].components.position,
			movement:	entities[id].components.movement,
			size:		entities[id].components.size
		};
		
		if(entity.position && entity.movement){

		}
	}
};