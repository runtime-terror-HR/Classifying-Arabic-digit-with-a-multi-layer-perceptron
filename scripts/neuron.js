
function relu(value){
    let result = value < 0? 0 : value;
    return result;
}

function softmax(value){
    let result = 0.0;
//needs vaalues from other neurons in the layer
    return result;
}

function tanh(value){
    let result = (2/(1+Math.exp(-2*value)))-1;
    return result;
}


class Neuron{
    constructor(input_num, acti){
        this.input_num = input_num;
        this.threshold;
        this.acti = acti;
        this.weights = [];
        this.initilize_weights();
    }

    initilize_weights(){
        
        var min = -2.4/this.input_num ;
        var max = 2.4/this.input_num ;
        this.threshold = Math.random() * (max - min) + min;

        for(var i = 0; i < this.input_num; i++){

            var t = Math.random() * (max - min) + min;
            //console.log(t);
            this.weights.push(t);
        }
    }

    activate(inputs){
        let sum = 0.0;
        for(var i = 0; i < this.input_num ; i++){
            sum += this.weights[i] * inputs[i];
        }
        sum -= this.threshold;
        let result = 0.0;
        switch(this.acti) {
            case "relu":
                result = relu(sum);
              break;
            case "tanh":
                result = tanh(sum);
              break;
            //linear then softmax applied at layer level
            case "softmax":
                result = sum;
              break;

            default:
              // code block
          }

          return result;
    }
}