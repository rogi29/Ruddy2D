/**
 * Collision System
 *
 * @param entities
 */
$2D.systems.collision = function( entities ){
    var entity, entity2, length = entities.length, i, g;

    for(i = 0; i < length; i++) {
		entity = {
			self: 		entities[i],
			components: entities[i].components,
			position:	entities[i].components.position,
			movement:	entities[i].components.movement,
			collision:  entities[i].components.collision,
			shape:		entities[i].components.shape
		};

        if(entity.collision) {
            for(g = i+1; g < length; g++) {
				entity2 = {
					self: 		entities[g],
					components: entities[g].components,
					position:	entities[g].components.position,
					movement:	entities[g].components.movement,
					collision:  entities[g].components.collision,
					shape:		entities[g].components.shape
				};
            }
        }
    }
};
