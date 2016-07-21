'use strict';

/**
 * @ngdoc function
 * @name squareV1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the squareV1App
 */

var squareApp, borded, row, col, gamers, gamer = 0,
    border = {
        default: '#ff0000',
        highlight: '#f0f000'
    };

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

angular.module('squareV1App')
    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);

            for (var i = 0; i < total; i++) {
                input.push(i);
            }

            return input;
        };
    })
    .factory('Config', function() {
        var obj = {};

        return {
            get: function(key) {
                return obj[key];
            },
            set: function(key, value) {
                obj[key] = value;

                return obj;
            }
        };
    })
    .directive('col', function(Config) {
        // Runs during compile
        return {
            restrict: 'A',
            scope: {},
            link: function($scope, elem, iAttrs, controller) {
                elem.find('.top').bind("click", function(e) {
                    if (rgb2hex($(this).parent().css('border-top-color')) == '#c2c2c2') {
                        row = parseInt($(this).parent().parent().attr('row'));
                        col = parseInt($(this).parent().attr('col'));
                        gamer = parseInt(Config.get('gamer')) || 0;

                        if (row > 1) $('.r' + (row - 1)).find('.c' + col).css('border-bottom', '2px solid ' + Config.get('gamers')[gamer].color);

                        $(this).parent().css('border-top', '2px solid ' + Config.get('gamers')[gamer].color);

                        console.log('> Gamer: ', gamer);

                        borded = $(this).parent();
                        valid(borded, gamer, Config.get('gamers'));
                        $('#gamer_' + gamer).removeClass('active');
                        gamer = ((gamer + 1) < Config.get('gamers').length) ? gamer + 1 : 0;
                        Config.set('gamer', gamer);
                        $('#gamer_' + gamer).addClass('active');
                    }
                });
                elem.find('.left').bind("click", function(e) {
                    if (rgb2hex($(this).parent().css('border-left-color')) == '#c2c2c2') {
                        row = parseInt($(this).parent().parent().attr('row'));
                        col = parseInt($(this).parent().attr('col'));
                        gamer = parseInt(Config.get('gamer')) || 0;

                        if (col > 1) $('.r' + row).find('.c' + (col - 1)).css('border-right', '2px solid ' + Config.get('gamers')[gamer].color);

                        $(this).parent().css('border-left', '2px solid ' + Config.get('gamers')[gamer].color);

                        console.log('> Gamer: ', gamer);

                        borded = $(this).parent();
                        valid(borded, gamer, Config.get('gamers'));
                        $('#gamer_' + gamer).removeClass('active');
                        gamer = ((gamer + 1) < Config.get('gamers').length) ? gamer + 1 : 0;
                        Config.set('gamer', gamer);
                        $('#gamer_' + gamer).addClass('active');
                    }
                });
                elem.find('.right').bind("click", function(e) {
                    if (rgb2hex($(this).parent().css('border-right-color')) == '#c2c2c2') {
                        row = parseInt($(this).parent().parent().attr('row'));
                        col = parseInt($(this).parent().attr('col'));
                        gamer = parseInt(Config.get('gamer')) || 0;

                        if (col < Config.get('dashboard').square) $('.r' + row).find('.c' + (col + 1)).css('border-left', '2px solid ' + Config.get('gamers')[gamer].color);

                        $(this).parent().css('border-right', '2px solid ' + Config.get('gamers')[gamer].color);

                        console.log('> Gamer: ', gamer);

                        borded = $(this).parent();
                        valid(borded, gamer, Config.get('gamers'));
                        $('#gamer_' + gamer).removeClass('active');
                        gamer = ((gamer + 1) < Config.get('gamers').length) ? gamer + 1 : 0;
                        Config.set('gamer', gamer);
                        $('#gamer_' + gamer).addClass('active');
                    }
                });
                elem.find('.bottom').bind("click", function(e) {
                    if (rgb2hex($(this).parent().css('border-bottom-color')) == '#c2c2c2') {
                        row = parseInt($(this).parent().parent().attr('row'));
                        col = parseInt($(this).parent().attr('col'));
                        gamer = parseInt(Config.get('gamer')) || 0;

                        if (row < Config.get('dashboard').square) $('.r' + (row + 1)).find('.c' + col).css('border-top', '2px solid ' + Config.get('gamers')[gamer].color);

                        $(this).parent().css('border-bottom', '2px solid ' + Config.get('gamers')[gamer].color);

                        console.log('> Gamer: ', gamer);

                        borded = $(this).parent();
                        valid(borded, gamer, Config.get('gamers'));
                        $('#gamer_' + gamer).removeClass('active');
                        gamer = ((gamer + 1) < Config.get('gamers').length) ? gamer + 1 : 0;
                        Config.set('gamer', gamer);
                        $('#gamer_' + gamer).addClass('active');
                    }
                });
            }
        };
    })
    .controller('MainCtrl', function($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    })
    .controller('GamersCtrl', ['$scope', 'Config', function($scope, Config) {
        $scope.form = {};
        $scope.colors = [{
            id: '#f2fa05',
            name: 'Amarillo'
        }, {
            id: '#05fa88',
            name: 'Verde'
        }, {
            id: '#0d05fa',
            name: 'Azul'
        }, {
            id: '#fa0577',
            name: 'Rosado'
        }];
        Config.set('gamers', []);

        $scope.gamers = Config.get('gamers') || [];
        $scope.create = function() {
            gamers = Config.get('gamers');

            gamers.push({
                name: $scope.form.name,
                color: $scope.form.color[0]
            });
        }
    }])
    .controller('DashboardCtrl', ['$scope', 'Config', function($scope, Config) {
        Config.set('dashboard', {
            square: 5
        });

        $scope.dashboard = Config.get('dashboard') || [];
    }]);

function valid(borded, gamer, gamers) {
    if (
        rgb2hex(borded.css('border-left-color')) == gamers[gamer].color &&
        rgb2hex(borded.css('border-right-color')) == gamers[gamer].color &&
        rgb2hex(borded.css('border-bottom-color')) == gamers[gamer].color &&
        rgb2hex(borded.css('border-top-color')) == gamers[gamer].color
    ) {
        var letter = gamers[gamer].name.toUpperCase().substring(0, 1);
        
        $('#gamer_' + gamer).find('.score').text(parseInt($('#gamer_' + gamer).find('.score').text()) + 1);
        borded.find('.letter').text(letter);

        borded.css('background-color', gamers[gamer].color);
    }
}
$(function() {
    $('#gamer_0').addClass('active');
});
