const container = document.getElementById('array-container');
const startBtn = document.getElementById('start');
const regenerateBtn = document.getElementById('regenerate')
const speedControl = document.getElementById('speed-control');
const speedValueDisp = document.getElementById('speed-value');

let array=[];
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
    startBtn.disabled = false;
}

//render the array as bars
function renderArray(){
    container.innerHTML = "";
    array.forEach(value=>{
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${value * 3}px`;
        bar.style.backgroundColor= "steelblue";
        container.appendChild(bar);
    });
}

//sleep function for delays
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mergeSort(arr,start,end) {
    if(start>=end)return;
    const mid = Math.floor((start+end)/2);
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid+1, end);
    await merge(arr,start, mid, end);
}

async function merge(arr, start, mid, end) {
    let left = arr.slice(start, mid+1);
    let right = arr.slice(mid+1, end+1);
    let i = 0, j=0, k = start;
    const bars = document.getElementsByClassName("array-bar");
    while(i<left.length && j<right.length){
        bars[k].style.backgroundColor = "red"; 
        await new Promise(resolve=>setTimeout(resolve, animationSpeed));
        if(left[i] <= right[j]){
            arr[k]=left[i++];
        }
        else{
            arr[k]=right[j++];
    
        }
        bars[k].style.height = `${arr[k] * 3}px`;
        bars[k].style.backgroundColor = "steelblue"; //reset color
        k++;
    }

    while(i<left.length){
        bars[k].style.backgroundColor = "red";
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        arr[k]=left[i++];
        bars[k].style.height = `${arr[k] * 3}px`;
        bars[k].style.backgroundColor="steelblue";
        k++;
    }
    while (j < right.length) {
        bars[k].style.backgroundColor = "red"; // Highlight bar
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        arr[k] = right[j++];
        bars[k].style.height = `${arr[k] * 3}px`;
        bars[k].style.backgroundColor = "steelblue"; // Reset color
        k++;
    }
}
    //merge sort animation
    async function  startMergeSort() {
        await mergeSort(array,0,array.length-1);

        //mark all bar green
        const bars = document.getElementsByClassName("array-bar");
        for(let bar of bars){
            bar.style.backgroundColor = "green";
        }
    }
    startBtn.addEventListener('click', startMergeSort);
    regenerateBtn.addEventListener('click', generateArray);
generateArray();