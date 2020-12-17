
let canvas = null;
let ctx = null;
let width = 0;
let height = 0;
let ind = 50;   // indentation
let step = 0;
let performance = [];
let lastPerformanceSize = 0;

function drawLoss() {
    canvas = document.getElementById("lossCanvas");
    ctx = canvas.getContext("2d");
    let spaceValue = 20;
    width = canvas.width -spaceValue;
    height = canvas.height-spaceValue;
    // step = (1 / network.epochs) * (width - ind);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = "white";
    ctx.font = "10px Arial";

    // y-axis
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(ind, spaceValue);
    ctx.lineTo(ind, height);
    // x-axis
    ctx.moveTo(spaceValue, height - ind);
    ctx.lineTo(width, height - ind);
    ctx.stroke();

    ctx.strokeStyle = "#FF0000";
    ctx.beginPath();



    // let loss = 3.73435642;  // y    (0-400) --> (0-4)
    // let epochNum = 0;
    // loss = (height - ind) - parseInt(loss * 100);
    // ctx.moveTo(epochNum + ind, loss);

    // // -----------------------------------------

    // loss = 3.73435642;  // y    (0-400) --> (0-4)
    // epochNum = 1;
    // loss = (height - ind) - parseInt(loss * 100);
    // ctx.lineTo(epochNum + ind, loss);



    // let loss2 = 3.73435642;

    // for (let i = 0; i <= width - ind; i += step) {
    //     loss2 -= 0.01;  // y    (0-400) --> (0-4)
    //     console.log(step);
    //     // epochNum = 1;
    //     loss = (height - ind) - (loss2 * 100);
    //     ctx.lineTo(i + ind, loss);
    // }

    // ctx.stroke();

}

function drawLossStep(loss, epochNum) {
    console.log("hi");
    loss = (height - ind) - (loss * 100);
    ctx.lineTo((epochNum * step) + ind, loss);
    ctx.stroke();
}
