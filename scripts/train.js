
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
        this.training_data_size = 2;
        //all training data
        this.training_set = [];  

        this.epochs = 200;
        this.learning_rate = 1;
        //fill training_set wiht the training data
        this.generate_training_data();

    }

    add_layer(n,acti){

        if(this.layers.length == 0){
            //input layer
            let tem = new Layer(35,acti, 0);
            this.layers.push(tem);

        }
        else{
            let tem = new Layer(n,acti, this.layers[this.layers.length-1].numberOfNeurons);
            this.layers.push(tem);
        }


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

        for(var n = 0; n < 10; n++){
            for(var i = 0; i < this.training_data_size; i++){
                this.training_set.push(new Digit(n, false)); 
            }
        }
        
        console.log(this.training_set);
    }


    train(){
        //add output layer
        this.add_layer(10,"softmax");
        for (var i = 0; i < this.epochs ; i++){
            for(var data in this.training_set){
                let tem = [];
                let layers_outputs = [];
                layers_outputs.push(data);

                //activation
                for(var i = 1; i < this.layers.length ; i++){
                    //returns layer outputs , takes the output of previouse layer and weights array for corresponding layer
                    tem = this.layers[i].activate_layer(layers_outputs[layers_outputs.length-1]);
                    layers_outputs.push(tem);
                }

                //weight training 
                let error_gradients = [];
                let index = 0;
                //for output layer
                let tem = this.layers[this.layers.length-1].weight_training(null);
                error_gradients.push(tem);

                for (var i = this.layers - 1, index; i >= 1; i--, index++) {
                    error_gradients = this.layers[i].weight_training(error_gradients[index]);
                    
                }

            }

        }


    }

    update_weights(){

    }



}
