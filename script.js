const container = document.getElementById('array-container');
const startBtn = document.getElementById('start');
const regenerateBtn = document.getElementById('regenerate')
const speedControl = document.getElementById('speed-control');
const speedValueDisp = document.getElementById('speed-value');

let arr=[];
let animationSpeed = parseInt(speedControl.value);

speedControl.addEventListener('input', function(){
    animationSpeed = parseInt(this.value);
    speedValueDisp.textContent = `${animationSpeed}ms`;
});

//Random array of numbers
function generateArray(num = 30){
    array=[];
    for(let i = 0; i<num; i++){
        array.push(Math.floor(Math.random() * 100)+5);
    }
    renderArray();
}

//render the array as bars
function renderArray(){
    array.forEach(value=>{
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    });
}

//sleep function for delays
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mergerSort(arr,start,end) {
    if(start>=end)return;
    const mid = Math.floor((start+end)/2);
    await mergerSort(arr, start, mid);
    await mergerSort(arr, mid+1, end);
    await merge(arr,start, mid, end);
}

async function merge(arr, start, mid, end) {
    let left = array.slice(start, mid+1);
    let right = array.slice(mid+1, end+1);
    let i = 0, j=0, k = start;
    const bars = document.getElementsByClassName("array-bar");
}