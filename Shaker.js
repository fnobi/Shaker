(function (exports, $) {
    function Shaker (opts) {
        this.$el = opts.$el || $('<div />');
        this.maxWidth = opts.maxWidth || 50;
        this.maxHeight = opts.maxHeight || 50;
        this.xPeriod = opts.xPeriod || 100;
        this.yPeriod = opts.yPeriod || 100;
        this.clock = opts.clock || 20;
    }

    Shaker.prototype.start = function (opts) {
        var attack = opts.attack || 1000;
        var duration = opts.duration || 4000;
        var release = opts.release || 1000;
        var callback = opts.callback || function () {};

        var maxWidth = this.maxWidth;
        var maxHeight = this.maxHeight;
        var clock = this.clock;
        var xPeriod = this.xPeriod;
        var yPeriod = this.yPeriod;

        var time = 0;

        var self = this;
        this.loop = setInterval(function () {
            time += clock;

            if (time > duration) {
                self.stop();
                self.reset();
                return callback();
            }

            var valueX = Math.sin(Math.PI * 2 * time / xPeriod);
            var valueY = Math.sin(Math.PI * 2 * time / yPeriod);

            var sizeRate = 1;
            if (time < attack) {
                sizeRate = time / attack;
            } else if (release > (duration - time)) {
                sizeRate = (duration - time) / release;
            }

            var width = maxWidth * sizeRate;
            var height = maxHeight * sizeRate;

            self.posit(valueX * width, valueY * height);
        }, clock);
    };

    Shaker.prototype.posit = function (x, y) {
        var $el = this.$el;

        var transform = 'translate(' + x + 'px, ' + y + 'px)';
        $el.css({
            transform: transform,
            webkitTransform: transform
        });
    };

    Shaker.prototype.reset = function () {
        this.posit(0, 0);
    };

    Shaker.prototype.stop = function () {
        clearInterval(this.loop); 
    };

    exports.Shaker = Shaker;
})(window, jQuery);
