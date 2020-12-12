class Layer{

    constructor(n,activation, input){
        this.numberOfNeurons = n;
        //list of neurons in layer
        this.neurons = [];

        //not input layer
        if(input != 0){
            for(var i = 0; i < this.numberOfNeurons ;i++){
                this.neurons.push(new Neuron(input, activation));
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
        //returns output
        for(var i = 0; i < this.numberOfNeurons ; i++){
            var tem = this.neurons[i].activate(inputs);
            this.output_values.push(tem);
            sum += Math.exp(tem);
        }

        if(this.activation.localeCompare("softmax")==0){
            for(var i = 0; i < this.numberOfNeurons ; i++){
                this.output_values[i] = Math.exp(this.output_values[i])/sum;
            }
            
        }
        return this.output_values;
    }

    weight_training(error_gradients){
        //returns layer error_gradients

    }

}