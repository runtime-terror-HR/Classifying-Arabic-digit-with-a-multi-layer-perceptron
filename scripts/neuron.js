
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
        this.output;
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
        sum += this.threshold;
        let result = 0.0;
        switch(this.acti) {
            case "relu":
                result = relu(sum);
              break;
            case "tanh":
                result = tanh(sum);
              break;
            case "softmax":
                result = sum;
              break;
            default:
              // code block
          }
          this.output = result;
          return result;
        }


    deri(value){
        switch(this.acti) {
            case "relu":
               return value < 0? 0 : 1;
            case "tanh":
                return  1 - value*value;
            default:
              // code block
          }
    }
    update_weights(inputs, error_gradients, index){
        let new_values = [];
        let sum = 0.0;
        let gradient;

        if(this.acti.localeCompare("softmax")!=0){
            for(var i = 0; i < error_gradients.length ; i++){
                sum += error_gradients[i][index];
            }
            gradient = deri(this.output)*sum;
            let weight_correction;
            for(var i =0; i < this.weights.length;i++){
                //fix learning rate it's fixed to 1 for now
                weight_correction = 1 * inputs[i] * gradient;
                //save values
                let tem = this.weights[i]*gradient;
                new_values.push(tem);
                //update weight
                this.weights[i] = weight_correction + this.weights[i];

            }
            
        } 
        //output layer
        else{
            let tem;
            let weight_correction;
            for(var i = 0; i < error_gradients.length ; i++){
                sum += error_gradients[i];
                if(i == index ) tem = error_gradients[i];
            }
            let error = (this.value == index? 1 : 0) - this.output;
            gradient = ((sum - tem)*tem)/sum * error;
            for(var i =0; i < this.weights.length;i++){
                //fix learning rate it's fixed to 1 for now
                weight_correction = 1 * inputs[i] * gradient;
                //save values
                let tem = this.weights[i]*gradient;
                new_values.push(tem);
                //update weight
                this.weights[i] = weight_correction + this.weights[i];

            }



        }

    }
}
