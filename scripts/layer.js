class Layer{

    constructor(n,activation, input,rate){
        this.numberOfNeurons = n;
        //list of neurons in layer
        this.neurons = [];
        this.rate = rate;

        //not input layer
        if(input != 0){
            console.log(this.numberOfNeurons);
            for(var i = 0; i < this.numberOfNeurons ;i++){
                this.neurons.push(new Neuron(input, activation, this.rate));
            }     
            //activation function for the layer
            this.activation = activation;
        }
        
        //number of inputs to the layer
        this.input = input;
        this.output_values = [];

    }

    activate_layer(inputs){
        let sum = 0.0;
        this.output_values = [];
        //console.log("neurons" + this.numberOfNeurons);
        //returns output
        for(var i = 0; i < this.numberOfNeurons ; i++){
            var tem = this.neurons[i].activate(inputs);
            this.output_values.push(tem);
            //console.log(" value " + tem);
            this.neurons[i].output = tem;
            sum += Math.exp(tem);

        }

        if(this.activation.localeCompare("softmax") == 0){
            //console.log("output layer");
            for(var i = 0; i < this.numberOfNeurons ; i++){

                //console.log("sum " +sum);
                this.output_values[i] = Math.exp(this.output_values[i])/sum;
                this.neurons[i].output = this.output_values[i];

            }
            
        }
        return this.output_values;
    }

    weight_training(inputs, error_gradients){
        //returns layer error_gradients*weights [neuron][weight] for each neuron []
        let new_gradients = [];

        for(var i = 0; i < this.numberOfNeurons ; i++){
            var tem = this.neurons[i].update_weights(inputs, error_gradients,i);
            new_gradients.push(tem);
        }
        return new_gradients;

    }

}