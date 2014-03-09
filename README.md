Shaker
======

Shake element.

## install

### from bower
```
bower install Shaker
```

### from github
```
git clone git://github.com/fnobi/Shaker.git
```

## usage
```
var shaker = new Shaker({
    $el: $('#shaker'),
    xPeriod: 100, // 100ms
    yPeriod: 30, // 30ms,
    maxWidth: 50, // max shake width
    maxHeight: 30 // max shake height
});

shaker.start({
    duration: 5000,
    attack: 1000,
    release: 2000,
    callback: function () {
        alert('shake has started & ended.');
    }
});

```