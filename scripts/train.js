
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
        //implementing errors later
        

    }

}



class Network{

    constructor() {
        //number of weights array = hidden layers + 1
        this.weights = [];
        //array of hidden layers
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
            let tem = new Layer(n,acti, 0);
            this.layers.push(tem);

        }
        else{
            let tem = new Layer(n,acti, this.layers[this.layers.length-1].numberOfNeurons);
            this.layers.push(tem);
            this.initilize_weights(tem.input);
        }


    }

    initilize_weights(n){
        var tem = [];
        var min = -2.4/n ;
        var max = 2.4/n ;
        for(var i = 0; i < n; i++){
            var t = Math.random() * (max - min) + min;
            console.log(t);
            tem.push(t);
        }
        this.weights.push(tem);
    }

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

    }



}
