(function() {

    var settings = {};
    var paths = {};
    settings['world'] = 'main';
    settings['key'] = {};

    settings.key['up']      = 'w';
    settings.key['down']    = 's';


    paths = {
        worlds:     'data/worlds/',
        systems:    'engine/systems/',
        physics:    'engine/physics/'
    };

    $2D.settings = settings;
    $2D.paths = paths;

}());