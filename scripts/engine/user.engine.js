(function($r) {

    var user = {
        mouse: {event: false, down: {}, up: {}, position: {x: 0, y: 0}},
        keys: {}
    };

    function mouseMove(e) {
        user.mouse.position = $doc (document).mousePosition(e);
    }

    function mouseDown(e, t, o, c) {
        var p = $doc (document).mousePosition(e);


        user.mouse.event = true;
        user.mouse.up.event = false;

        user.mouse.down = {
            event:      true,
            position:   p,
            target:     t,
            calls:      c
        };
    }

    function mouseUp(e, t, o, c) {
        var p = $doc (document).mousePosition(e);

        user.mouse.event = false;
        user.mouse.down.event = false;

        user.mouse.up = {
            event:      true,
            position:   p,
            target:     t,
            calls:      c
        };
    }

    function keyDown(e, t, o, c) {
        var code = e.keyCode || e.which;

        user.keys[code] = {
            down:   true,
            up:     false,
            event:  true,
            id:     code,
            calls:  c
        };
    }

    function keyUp(e) {
        var code = e.keyCode || e.which,
            c = (user.keys[code]) ? user.keys[code].calls : 0;

        user.keys[code] = {
            down:   true,
            up:     false,
            event:  true,
            id:     code,
            calls:  c
        };
    }

    $r (document).on('touchstart', mouseDown);
    $r (document).on('touchend', mouseUp);
    $r (document).on('touchmove', mouseMove);
    $r (document).on('touchcancel', mouseUp);

    $r (document).on('mousedown', mouseDown);
    $r (document).on('mousemove', mouseMove);
    $r (document).on('mouseup', mouseUp);

    $r (document).on('keydown', keyDown);
    $r (document).on('keyup', keyUp);

    $2D.user = user;

}($r));