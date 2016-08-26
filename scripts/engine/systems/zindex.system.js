/**
 * Z position system
 *
 * @param entities
 */
$2D.systems.zIndex = function( entities ){
	var entity, entity2, i, g;
	
	for(i = 0; i < entities.length; i++) {
		entity = {
			self: 		entities[i],
			components: entities[i].components,
			appearance:	entities[i].components.appearance,
			position:	entities[i].components.position,
			zIndex:		entities[i].components.zIndex
		};
		
		if(entity.appearance && entity.zIndex){
			for(g = i+1; g < entities.length; g++){
				entity2 = {
					self: 		entities[g],
					components: entities[g].components,
					appearance:	entities[g].components.appearance,
					position:	entities[g].components.position,
					zIndex:		entities[g].components.zIndex
				};
			}
		}
	}
};