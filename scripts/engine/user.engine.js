(function($r) {
    $r(document).on('keydown', function () {
        user.key.id = this.e.keyCode || this.e.which;
        user.key.event = true;
    });

    $r(document).on('keyup', function () {
        user.key.id = this.e.keyCode || this.e.which;
        user.key.event = false;
    });


    var user = {
        key: {down: false, up: false, event: false, id: null}
    };

    user.isKeyDown = function(keyName) {
        if (user.key.id == $r(false).keyCode(keyName) && user.key.event) {
            user.key.down = true;
            user.key.up = false;
        }

        return {bool: user.key.down, id: user.key.id};
    };

    user.isKeyUp = function(keyName) {
        if (user.key.id == $r(false).keyCode(keyName) && !user.key.event) {
            user.key.down = false;
            user.key.up = true;
        }

        return {bool: user.key.up, id: user.key.id};
    };

    $2D.user = user;

}($r));