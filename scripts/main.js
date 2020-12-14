
let network = new Network();


function train_network(){
    set_epoch();
    set_learningRate()
    network.train();
}

function set_epoch(){
    var tem = parseInt(document.getElementById("epochs").value);
    network.epochs = isNaN(tem)?200:tem;
}

function set_learningRate(){
    var tem = parseInt(document.getElementById("rate").value);
    network.learning_rate = isNaN(tem)?0.0001:tem;
}

function addLayer(){
    var n = parseInt(document.getElementById("num").value);
    var acti = document.getElementById("activation").value;
    n = isNaN(n)?3:n;
    network.add_layer(n,acti);

}


