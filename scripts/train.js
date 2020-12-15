
const digits = [
    //digit0
    [0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 
    0, 0, 1, 1, 0,
    0, 0, 1, 1, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0],
    //digit1
    [0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, 0, 0],
    //digit2
    [0, 0, 0, 0, 0,
    1, 0, 0, 1, 0, 
    1, 1, 1, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    0, 0, 0, 0, 0],
    //digit3
    [0, 0, 0, 0, 0,
    1, 0, 1, 0, 1, 
    1, 1, 0, 1, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    0, 0, 0, 0, 0],
    //digit4
    [0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 
    0, 0, 1, 0, 0,
    0, 0, 0, 1, 0,
    0, 0, 1, 0, 0,
    0, 1, 0, 0, 0,
    0, 1, 1, 1, 1],
    //digit5
    [0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 
    0, 1, 0, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0],
    //digit6
    [0, 0, 0, 0, 0,
    0, 1, 0, 0, 1, 
    0, 0, 1, 1, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0],
    //digit7
    [0, 0, 0, 0, 0,
    1, 0, 0, 0, 1, 
    1, 0, 0, 1, 0,
    1, 0, 1, 0, 0,
    1, 1, 0, 0, 0,
    1, 0, 0, 0, 0,
    0, 0, 0, 0, 0],
    //digit8
    [0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 
    0, 0, 0, 1, 1,
    0, 0, 1, 0, 1,
    0, 1, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 0, 0, 0, 0],
    //digit9
    [0, 0, 0, 0, 0,
    0, 0, 1, 1, 0, 
    0, 1, 0, 0, 1,
    0, 0, 1, 1, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0]
];


class Digit{  
    constructor(value, noise) {
        this.value = value;
        this.noise = noise;
        this.pixels = [];
        this.fill_pixels();
    }

    fill_pixels(){
        //shallow cloning
        this.pixels = [...digits[this.value]];
        //implementing noise later
        //Math.random(); 


    }

}



class Network{

    constructor() {
        //array of network layers
        this.layers = [];
        //input layer
        this.add_layer(35,"");
        //size of training data for each digit
        this.training_data_size = 30;
        //all training data
        this.training_set = [];  

        this.epochs = 200;
        this.learning_rate = 0.0001;
        //fill training_set wiht the training data
        this.generate_training_data();
        this.error = 0.0;

    }

    add_layer(n,acti){

        if(this.layers.length == 0){
            //input layer
            let tem = new Layer(35,acti, 0);
            this.layers.push(tem);

        }
        else{
            let tem = new Layer(n,acti, this.layers[this.layers.length-1].numberOfNeurons, this.learning_rate);
            this.layers.push(tem);
        }
        console.log("layer added");


    }

    // initilize_weights(n){
    //     var tem = [];
    //     var min = -2.4/n ;
    //     var max = 2.4/n ;
    //     for(var i = 0; i < n; i++){
    //         var t = Math.random() * (max - min) + min;
    //         console.log(t);
    //         tem.push(t);
    //     }
    //     this.weights.push(tem);
    // }

    generate_training_data(){

        for(var n = 0; n < this.training_data_size; n++){
            for(var i = 0; i < 10; i++){
                this.training_set.push(new Digit(i, false)); 
            }
        }
        
        //console.log(this.training_set);
    }


    train(){
        
        //add output layer
        this.add_layer(10,"softmax");
        console.log("start training");
        for (var c = 0; c < this.epochs ; c++){
            console.log("starting epoch " + c );

            for(var j = 0; j < this.training_data_size*10 ; j++){
                let tem = [];
                //[][]
                let layers_outputs = [];
                
                //console.log(this.training_set[j].pixels);
                layers_outputs.push(this.training_set[j].pixels);
                
                //activation
                for(var i = 1; i < this.layers.length ; i++){
                    //returns layer outputs , takes the output of previouse layer and weights array for corresponding layer
                    tem = this.layers[i].activate_layer(layers_outputs[i-1], this.training_set[j].value);
                    //console.log(tem);
                    layers_outputs.push(tem);
                }
                this.error += this.layers[this.layers.length-1].cross_entropy;
                //console.log(layers_outputs);

                //weight training 
                //error gradients array will hold values of gradient*weight [] []
                let error_gradients = [];
                //for output layer
                error_gradients = this.layers[this.layers.length-1].weight_training(layers_outputs[layers_outputs.length-2], layers_outputs[layers_outputs.length-1], this.training_set[j].value);
                //calculating gradients errors and updating weights for hidden layers
                for (var i = this.layers.length - 2 ; i >= 1; i--) {
                    error_gradients = this.layers[i].weight_training(layers_outputs[i-1],error_gradients, this.training_set[j].value);
                }
                //console.log(layers_outputs);
                //console.log("iteration " + j);
                
            }

            console.log( this.error/(this.training_data_size*10));
            this.error = 0.0;
            console.log("epoch " + c +" done");
        }


    }

    test(){

        var digit_test = parseInt(document.getElementById("testdigit").value);

        let tem = [];
        let layers_outputs = [];
        layers_outputs.push(digits[digit_test]);
        //console.log(document.getElementById("testdigit").value);
        //console.log(digits[digit_test]);

        //activation
        for(var i = 1; i < this.layers.length ; i++){
            //returns layer outputs , takes the output of previouse layer and weights array for corresponding layer
            tem = this.layers[i].activate_layer(layers_outputs[i-1]);
            layers_outputs.push(tem);
            //console.log(layers_outputs);
        }


        console.log(layers_outputs);
        console.log("output values");

        console.log(layers_outputs[layers_outputs.length-1]);
        let sum = 0.0;
        let max = layers_outputs[layers_outputs.length-1][0];
        let index = 0;
        for(var i = 1; i < 10 ; i++){
            sum += layers_outputs[layers_outputs.length-1][i];
            if(layers_outputs[layers_outputs.length-1][i] > max){
                max = layers_outputs[layers_outputs.length-1][i];
                index = i;
            }
        }
        document.getElementById("output").innerHTML = "predict  " + index + "  sum:" + sum;



    }

    update_weights(){

    }



}
