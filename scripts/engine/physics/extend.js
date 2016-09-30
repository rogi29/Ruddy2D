(function() {
    $obj ($2D.physics).forEach(function(v, k){
        if(!$2D[k])
            $2D[k] = v;
    });
}());