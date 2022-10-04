
class State{
    outputState = [];
    inputState = [];
    outputs=[];
    inputs = [];
    outputsMoore=[];
    name;
    constructor(name,inputs,outputs,outputState){
        this.name = name;
        this.inputs = inputs;
        this.outputs = outputs;
        this.outputState = outputState;
    }

    get getName(){
        return this.name;
    }

    get getOutputs(){
        return this.outputs;
    }

    get getInputs(){
        return this.inputs;
    }

    addOutputState(element){
        this.outputState.push(element);
    }
    addInputState(element){
        this.inputState.push(element);
    }
}

class Automata{
    partition = [];
    constructor(type,initialState,states){
        this.type = type;
        this.initialState = initialState;
        this.states = states;
    };
}

var automaton;
var numSimbols=2;
var numStates=0;
var type='';

function addState(){
    numStates++;
        const $tr = document.createElement("tr"),
        $tbody = document.querySelector('tbody'),
        $buttonSimbol = document.querySelector('.addSimbol'),
        $fSimbol = document.querySelector('.finishSimbol'),
        $th = document.createElement('th'),
        $trTh = document.querySelector('.tr-th');
        if(numStates==1 && type=='Moore'){
        $th.textContent='Salidas';
        $trTh.appendChild($th);
        }
        $buttonSimbol.classList.add('display-none');
        $fSimbol.classList.add('display-none');
        if(type == 'Mealy'){
        for(i=0; i<numSimbols; i++){
        const $td = document.createElement('td'),
        $input = document.createElement('input');
        $input.setAttribute('type','text');
        if($tr.children[0]){
        $input.setAttribute('placeholder','Entrada,Salida');
        }
        $td.appendChild($input);
        $tr.classList.add(`state${numStates}`);
        $tr.appendChild($td);
        }
    }else{
        for(i=0; i<numSimbols+1; i++){
            const $td = document.createElement('td'),
            $input = document.createElement('input');
            $input.setAttribute('type','text');
            if($tr.children[0] && i!= numSimbols){
            $input.setAttribute('placeholder','Entrada');
            }
            $td.appendChild($input);
            $tr.classList.add(`state${numStates}`);
            $tr.appendChild($td);
            }
    }
        $tbody.appendChild($tr);
}

function addSimbol(){
    numSimbols++;
    $th = document.createElement('th'),
    $input = document.createElement('input'),
    $trTh = document.querySelector('.tr-th');
    $input.setAttribute('type','text');
    $th.appendChild($input);
    $trTh.appendChild($th);
    for(i =0;i<numStates;i++){
        const $td = document.createElement('td'),
        $input = document.createElement('input');
        $input.setAttribute('type','text');
        $td.appendChild($input);
        $tr.appendChild($td);
    }
}

/** hide buttons in the ui */
function hideButtons(hide1,hide2,show1,show2){
    const $hide1 = document.querySelector(`${hide1}`),
    $hide2 = document.querySelector(`${hide2}`),
    $show1 = document.querySelector(`${show1}`),
    $show2= document.querySelector(`${show2}`);
    $hide1.classList.add('display-none');
    $hide2.classList.add('display-none');
    $show1.classList.remove('display-none');
    $show2.classList.remove('display-none');
}

/**event to the cells of the table */
function eventData(){
    const th = document.querySelector('.tr-th');
    for (let i = 0; i < numStates; i++) {
        const element = document.querySelector(`.state${i+1}`);
            for(let j=0; j<element.children.length;j++){
                element.children[j].addEventListener('keyup',(e)=>{
                element.children[j].value = e.path[0].value;
                }
    )}
}
    for(let i=0;i<numSimbols;i++){
        th.children[i].addEventListener('keyup',(e)=>{
            th.children[i].value = e.path[0].value;
        })    
    }
}

/**create the automata with the table */
function createAutomata(){
    const th = document.querySelector('.tr-th');
    let name;
    let output = [];
    let outputsMoore = '';
    let outputStates =[];
    let outputsMealy = [];
    let states =[];
    let simbols = [];
    let createStates=[];
    for (let i = 0; i < th.children.length; i++) {
        simbols.push(th.children[i].value);
    }
    for (let i = 0; i < numStates; i++) {
        const element = document.querySelector(`.state${i+1}`);
        for(let j=0; j<element.children.length;j++){
            output.push(element.children[j].value);
        }
    }
    if(type=='Mealy'){
    for(let i =0;i<output.length;i=i+(numSimbols)){
        let j = i+(numSimbols);
        states.push(output.slice(i,j));
    }
    for(let j = 0;j<numStates;j++){
        for (let k = 0; k < states[j].length; k++) {
            if(k==0){
              name = states[j][k];
            }
            else{
                let aux = []
                aux = states[j][k].split(',')
                outputStates.push(aux[0]);
                outputsMealy.push(aux[1]);
            }
        }
        createStates.push(new State(name,simbols,outputsMealy,outputStates));
        outputStates = [];
        outputsMealy = [];
    }
}
else{
    for(let i =0;i<output.length;i=i+(numSimbols+1)){
        let j = i+(numSimbols+1);
        states.push(output.slice(i,j));
    }

    for(let j = 0;j<numStates;j++){
        for (let k = 0; k < states[j].length; k++) {
            if(k == 0){
              name = states[j][k];
            }
            else if(k == (states[j].length-1)){
              outputsMoore = states[j][k];
            }
            else{
                outputStates.push(states[j][k]);
            }
            }
        createStates.push(new State(name,simbols,new Array(outputsMoore),outputStates));
        outputStates = [];
    }
}
    /**Add references of the states in the outputs */
    for (let i = 0; i < createStates.length; i++) {
        for (let j = 0; j < createStates.length; j++) {
            for(let k = 0; k<createStates[j].outputState.length;k++){
                if(createStates[i].name == createStates[j].outputState[k]){
                    createStates[j].outputState[k] = createStates[i];
                }
            }
        } 
    }
    
    /**Get the states that reach the current state*/
    for (let i = 0; i < createStates.length; i++) {
       for (let j = 0; j < createStates.length; j++) {
        for (let k = 0; k < createStates[j].outputState.length; k++) {
            if(createStates[j].outputState[k] == createStates[i]){
                createStates[i].addInputState(createStates[j]);
            }
        }
       }
    }
    automaton = new Automata(type,createStates[0],createStates);
    getOutputsMoore();
}

/** get the related automaton of an automaton */
function automataConexo(){
    /**Quitar inaccesibles */
    let aux = [];
    aux.push(automaton.initialState);
    for (let i = 0; i < automaton.states.length; i++) {
       if(automaton.states[i].inputState.length >= 1 && automaton.states[i]!=automaton.states[0]){
        aux.push(automaton.states[i]);
       }
    }
    automaton.states = aux;

    let newStates = [];
    newStates.push(automaton.initialState);
    let arrayaux=[];
    arrayaux.push(automaton.initialState.outputState);
    for (let i = 1; i < automaton.states.length; i++) {
        arrayaux.push(automaton.states[i].inputState);
    }
    
    for (let i = 0; i < automaton.states.length; i++) {
        for (let j = 1; j < arrayaux.length; j++) {
            for (let k = 0; k < arrayaux[j].length; k++) {
                if(automaton.states[i] == arrayaux[j][k]){
                   newStates.push(automaton.states[j]);
                }
            }   
    }
    }

    const result = [];
    newStates.forEach((item)=>{
    //pushes only unique element
    if(!result.includes(item)){
        result.push(item);
    }
    })
    automaton.states = result;
}

/**function to compare two arrays */
Array.prototype.equals = function (getArray) {
    if (this.length != getArray.length) return false;
  
    for (var i = 0; i < getArray.length; i++) {
      if (this[i] instanceof Array && getArray[i] instanceof Array) {
        if (!this[i].equals(getArray[i])) return false;
      } else if (this[i] != getArray[i]) {
        return false;
      }
    }
    return true;
  };

  /**get the outputs of the moore machine */
function getOutputsMoore(){
    for (let i = 0; i < automaton.states.length; i++) {
        for (let j = 0; j < automaton.states[i].outputState.length; j++) {
            if(automaton.states[i].outputState[j] instanceof State){
            automaton.states[i].outputsMoore.push(automaton.states[i].outputState[j].outputs[0]);
            }
          }
        }
}

/** Give me the first partition watching the outputs */
function initialPartition(){
let partition1=[];
if(type == 'Mealy'){
  for (let i = 0; i < automaton.states.length; i++) {
    let arrayUx=[];
    for (let j = 0; j < automaton.states.length; j++) {
        if(automaton.states[i].outputs.equals(automaton.states[j].outputs)){
            arrayUx.push(automaton.states[j]);
        }
    }
        let aux = 0;
        for (let k = 0; k < partition1.length; k++) {
            if(partition1[k].equals(arrayUx))
            aux++;
            }

        if(aux == 0){
            partition1.push(arrayUx);
        }  
  }
}else{
    for (let i = 0; i < automaton.states.length; i++) {
        let arrayUx=[];
        for (let j = 0; j < automaton.states.length; j++) {
            if(automaton.states[i].outputsMoore.equals(automaton.states[j].outputsMoore)){
                arrayUx.push(automaton.states[j]);
            }
        }
        let aux = 0;
        for (let k = 0; k < partition1.length; k++) {
            if(partition1[k].equals(arrayUx))
            aux++;
            }
        if(aux == 0){
            partition1.push(arrayUx);
        }
    }
      }
      const $h2 = document.querySelector('h2');
      let tostring = []
      for (let i = 0; i < partition1.length; i++) {
        let aux = [];
       for (let j = 0; j < partition1[i].length; j++) {
            aux.push(partition1[i][j].name);
        }
        tostring.push(aux);
      }
      console.log(tostring);
      let string='[';
      for (let i = 0; i < tostring.length; i++) {
        if(i == tostring.length -1 ){
         string=string+tostring[i]+']';
        }else{
         string=string+tostring[i]+']'+'[';
        }
      }
      $h2.innerHTML = `P1=[${string}]`;
      return partition1;
}

/**Function to reduce the automaton */
function minimizer(pk){
    let partition = [];
    if(pk == automaton.partition){
        return pk;
    }
    else{
        console.log(pk);
        for (let i = 0; i < pk.length; i++) {
            let auxArray = [];
            for (let j = 0; j < pk.length; j++) {
                for (let k = 0; k < pk[i].length; k++) {
                    let aux = 0;
                    for (let l = 0; l < pk[i].length; l++) {
                        for (let m = 0; m < pk[i][k].outputState.length; m++) {
                            if(pk[j].includes(pk[i][k].outputState[m]) &&
                               pk[j].includes(pk[i][l].outputState[m])){
                                aux++;
                               }
                        }
                        if(aux == pk[i][k].outputState.length){
                            auxArray.push(pk[i][k]);
                            }
                } 
            }
            }
        partition.push(auxArray);
    }
    }
        console.log(partition);
        const partitionResult = [];
        for (let i = 0; i < partition.length; i++) {
            const result = [];
            partition[i].forEach((item)=>{
            //pushes only unique element
            if(!result.includes(item)){
            result.push(item);
    }
    }  
    )
        partitionResult.push(result);}
        console.log(partitionResult);
        automaton.partition = partitionResult;
    }

document.addEventListener("click",(e)=>{
    eventData();
    if(e.target.matches('.addState')){
        addState();
    }
    
    if(e.target.matches('.addSimbol')){
        addSimbol();
    }

    if(e.target.matches('.finishSimbol')){
        hideButtons('.finishSimbol','.addSimbol','.addState','.minimizer');
    }
    if(e.target.matches('.mealy')){
        hideButtons('.moore','.mealy','.addSimbol','.finishSimbol');
        type='Mealy';
    }
    if(e.target.matches('.moore')){
        hideButtons('.moore','.mealy','.addSimbol','.finishSimbol');
        type='Moore';
    }
    if(e.target.matches('.minimizer')){
       createAutomata();
       automataConexo();
       minimizer(initialPartition());
    }
})
