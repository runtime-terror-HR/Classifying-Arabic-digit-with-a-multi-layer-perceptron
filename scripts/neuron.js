
class Neuron{
    constructor(input_num, acti){
        this.input_num = input_num;
        this.threshold = Math.random() * (2.4/this.inputs - 2.4/this.inputs) - 2.4/this.inputs;
        this.acti = acti;

    }
}