
function relu(value){
    let result = value < 0? 0 : value;
    return result;
}

function softmax(value){
//needs vaalues from other neurons in the layer
    return value;
}

function tanh(value){
    let result = (2/(1+Math.exp(-2*value)))-1;
    return result;
}


class Neuron{
    constructor(input_num, acti, rate){
        this.input_num = input_num;
        this.threshold;
        this.acti = acti;
        this.weights = [];
        this.output;
        this.rate = rate;
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
        //console.log(sum);

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
                return  (1 - value*value);
            default:
              // code block
          }
    }

    update_weights(inputs, error_gradients, index, yd, rate){
        let new_values = [];
        let sum = 0.0;
        let gradient;
        this.rate = rate;

        //console.log("weight  " + this.weights);
        if(this.acti.localeCompare("softmax") != 0){
            for(var i = 0; i < error_gradients.length ; i++){
                sum += error_gradients[i][index];
            }
            gradient = this.deri(this.output)*sum;
            let weight_correction;
            for(var i =0; i < this.weights.length;i++){
                //fix learning rate it's fixed to 1 for now
                weight_correction = this.rate * inputs[i] * gradient;
                //save values
                let tem = this.weights[i]*gradient;
                new_values.push(tem);
                //update weight
                this.weights[i] = weight_correction + this.weights[i];

            }
            this.threshold = this.threshold + this.rate * -1 * gradient;

            
        } 
        //output layer
        else{
            let weight_correction;

            for(var i = 0; i < error_gradients.length ; i++){

                sum += Math.exp(error_gradients[i]);
            }
            let error = (yd == index? 1 : 0) - this.output;
            //console.log("desired output " + (yd == index? 1 : 0));

            //derivateive ((sum - tem)*tem)/(sum * sum)
            let derivative = Math.exp(error_gradients[index])*(sum - Math.exp(error_gradients[index]))/(sum*sum);
            gradient = derivative * error;
            //console.log("derivative " + derivative);
            //console.log("gradient " + gradient);

            for(var i = 0; i < this.weights.length ; i++){
                weight_correction = this.rate * inputs[i] * gradient;
                //console.log("input " + inputs[i]);               
                //console.log("weight correction " + weight_correction);
                //save values
                let tem = this.weights[i]*gradient;
                new_values.push(tem);
                //update weight
                this.weights[i] = weight_correction + this.weights[i];

            }
            this.threshold = this.threshold + this.rate * -1 * gradient;
            
        }
        return new_values;

    }
}
