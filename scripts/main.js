
let network = new Network();

function set_epoch(){
    network.epochs = parseInt(document.getElementById("epochs").innerHTML);
}

function set_learningRate(){
    network.learning_rate = parseInt(document.getElementById("rate").innerHTML);
}

function addLayer(){
    var n = parseInt(document.getElementById("num").innerHTML);
    var acti = document.getElementById("activation").value;
    network.add_layer(n,acti);

}

