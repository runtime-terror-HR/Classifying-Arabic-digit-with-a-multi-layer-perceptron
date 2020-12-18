let network = new Network();

function train_network() {
    set_epoch();
    set_learningRate();
    document.getElementById("pleaseWait").style = 'display:inline';
    network.train();
}

function train_network2() {
    network.adaptiveLearning = true;    // default is false 
    train_network();
}

function set_epoch() {
    var tem = parseInt(document.getElementById("epochs").value);
    network.epochs = isNaN(tem) ? 200 : tem;
}

function set_learningRate() {
    var tem = parseFloat(document.getElementById("rate").value);
    network.learning_rate = isNaN(tem) ? 0.01 : tem;
    console.log("learning_rate:  " + network.learning_rate);
}

function addLayer() {
    var n = parseInt(document.getElementById("num").value);
    var acti = document.getElementById("activation").value;
    n = (isNaN(n) || (n < 1)) ? 3 : n;
    network.add_layer(n, acti);

    // for the network graph
    networkLayer.pop();
    networkLayer.push(n);
    networkLayer.push(10);
    draw();
}

function drawTestingGrid() {
    var parent = document.getElementById("grid");
    var digit_test = parseInt(document.getElementById("testdigit").value);
    var testDigit = [...digits[digit_test]];
    network.testingDigit = testDigit;

    var e = null;
    var counter = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 5; j++) {
            e = document.createElement("div");
            e.className = "unit";
            e.id = counter;
            if (testDigit[counter] == 1) {
                e.style.backgroundColor = "rgb(44,44,44)";
            }

            parent.appendChild(e);
            counter++;
        }
        e = document.createElement("br");
        parent.appendChild(e);
    }
}

function changeTestingDigit() {
    var digit_test = parseInt(document.getElementById("testdigit").value);
    var testDigit = [...digits[digit_test]];
    console.log(testDigit);
    network.testingDigit = testDigit;

    editGrid(testDigit);
}

function editGrid(testDigit) {
    var e = null;
    var color = "";
    for (let i = 0; i < 35; i++) {
        e = document.getElementById(i);
        if (testDigit[i] == 1) {
            e.style.backgroundColor = "rgb(44,44,44)";
        }
        else if (testDigit[i] == 0) {
            e.style.backgroundColor = "white";
        }
        else {
            color = Math.floor(testDigit[i] * 10);
            switch (color) {
                case 8:
                    e.style.backgroundColor = "rgb(64,64,64)";
                    break;
                case 7:
                    e.style.backgroundColor = "rgb(88,88,88)";
                    break;
                case 6:
                    e.style.backgroundColor = "rgb(105,105,105)";
                    break;
                case 5:
                    e.style.backgroundColor = "rgb(144,144,144)";
                    break;
                case 4:
                    e.style.backgroundColor = "rgb(168,168,168)";
                    break;
                case 3:
                    e.style.backgroundColor = "rgb(190,190,190)";
                    break;
                case 2:
                    e.style.backgroundColor = "rgb(211,211,211)";
                    break;
                case 1:
                    e.style.backgroundColor = "rgb(230,230,230)";
                    break;
                case 0:
                    e.style.backgroundColor = "rgb(240,240,240)";
                    break;
            }
        }
    }
}

function generateRandomNoise() {
    // network.testingDigit
    let noiseNum = Math.floor(Math.random() * 10) + 1;

    let x = 0;
    // add noise
    for (let i = 0; i < noiseNum; i++) {

        do {
            x = Math.floor(Math.random() * 35);
        }
        while (network.testingDigit[x] == 1);
        let num = Math.random() - 0.1;
        network.testingDigit[x] = ((num) < 0) ? 0 : num;
    }

    editGrid(network.testingDigit);

}

function checkLearning() {
    var lastIndex = performanceArray.length - 1;
    if (performanceArray.length > 1) {
        if ((performanceArray[lastIndex][0] - performanceArray[lastIndex - 1][0]) > 0) {
            network.learning_rate *= 0.8;      //= network.learning_rate - 0.5 * network.learning_rate;
        } else {
            network.learning_rate *= 1.05;              //+= 0.01;
        }
    }
    console.log("alpha = " + network.learning_rate);
}