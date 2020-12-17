// Modified from https://github.com/sinb/draw-neural-network-js 

let networkLayer = [35, 10];
// networkLayer.pop();
// window.onload = draw;

var arrow = [
    [2, 0],
    [-10, -4],
    [-10, 4]
];

function drawFilledPolygon(ctx, shape) {
    ctx.beginPath();
    ctx.moveTo(shape[0][0], shape[0][1]);

    for (p in shape)
        if (p > 0) ctx.lineTo(shape[p][0], shape[p][1]);

    ctx.lineTo(shape[0][0], shape[0][1]);
    ctx.fillStyle = "#000000";
    ctx.fill();
}

function translateShape(shape, x, y) {
    var rv = [];
    for (p in shape)
        rv.push([shape[p][0] + x, shape[p][1] + y]);
    return rv;
}

function rotateShape(shape, ang) {
    var rv = [];
    for (p in shape)
        rv.push(rotatePoint(ang, shape[p][0], shape[p][1]));
    return rv;
}

function rotatePoint(ang, x, y) {
    return [
        (x * Math.cos(ang)) - (y * Math.sin(ang)),
        (x * Math.sin(ang)) + (y * Math.cos(ang))
    ];
}

function drawLineArrow(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    var ang = Math.atan2(y2 - y1, x2 - x1);
    drawFilledPolygon(ctx, translateShape(rotateShape(arrow, ang), x2, y2));
};


function draw() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var width = canvas.width * 0.9;
    var height = canvas.height * 0.9;
    canvas.style.backgroundColor = "rgba(255, 255, 255, 1.0)";
    ctx.font = "15px Arial";

    var bias = false;

    var maxNeuronNumInLayer = Math.max.apply(Math, networkLayer);
    var neuronSize = height / maxNeuronNumInLayer;
    var radius = getRadiusSize(neuronSize);

    var intervalVertical = (height - maxNeuronNumInLayer * radius * 2) / maxNeuronNumInLayer;
    var interval = width / (networkLayer.length - 1) - radius;

    var x = radius + 10;
    var y = 0;
    var neuronLocationPerLayer = [];

    console.log(networkLayer);
    for (numberIdx in networkLayer) {
        console.log("n " + numberIdx);
        var thisLayerNeuronLocation = [];
        number = networkLayer[numberIdx];
        console.log("x= " + x);
        y = (height - number * neuronSize) / 2 + radius + intervalVertical;

        for (var i = 0; i < number; ++i) {
            drawCircle(ctx, x, y, radius, 'white');
            if (bias === true) {
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                if (numberIdx != networkLayer.length - 1) {
                    if (i == 0)
                        ctx.fillText("+1", x, y);
                }
            }

            thisLayerNeuronLocation.push([x, y]);
            y += (radius * 2 + intervalVertical);
        }
        neuronLocationPerLayer.push(thisLayerNeuronLocation);
        x += interval;
    }
    console.log(neuronLocationPerLayer);
    for (var i = 0; i < networkLayer.length - 1; i++) {
        var firstLayer = neuronLocationPerLayer[i];
        var secondLayer = neuronLocationPerLayer[i + 1];
        for (firstIdx in firstLayer) {
            var firstX = firstLayer[firstIdx][0];
            var firstY = firstLayer[firstIdx][1];
            for (secondIdx in secondLayer) {
                var secondX = secondLayer[secondIdx][0];
                var secondY = secondLayer[secondIdx][1];
                if (bias === true) {
                    if (secondIdx == 0 && (i + 1) != networkLayer.length - 1) {
                        console.log(secondIdx)
                        continue;
                    }
                    else
                        drawLineArrow(ctx, firstX + radius, firstY, secondX - radius, secondY);
                }
                else {
                    drawLineArrow(ctx, firstX + radius, firstY, secondX - radius, secondY);
                }
            }
        }
    }


}
function drawCircle(context, centerX, centerY, radius, color, txt) {
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = radius / 20;
    context.strokeStyle = '#000000';
    context.stroke();
}

function getRadiusSize(neuronSize) {
    return neuronSize / 2.5;
}
