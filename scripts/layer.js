class Layer{

    constructor(n,activation, input){
        this.numberOfNeurons = n;
        //list of neurons in layer
        this.neurons = [];
        for(var i = 0; i < this.numberOfNeurons ;i++){
            this.neurons.push(new Neuron(input, activation));
        }     
        //activation function for the layer
        this.activation = activation;
        //number of inputs to the layer
        this.input = input;

    }

}