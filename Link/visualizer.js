const arrayContainer = document.getElementById("array-container");
const generateButton = document.getElementById("generate");
const shuffleButton = document.getElementById("shuffle");
const sortButton = document.getElementById("sort");
const algorithmSelect = document.getElementById("algorithm");

let array = [];

function generateArray() {
    array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 400) + 10);
    }
    renderArray();
}

function shuffleArray() {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    renderArray();
}

function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        arrayContainer.appendChild(bar);
    });
}

function disableControls(disabled) {
    generateButton.disabled = disabled;
    shuffleButton.disabled = disabled;
    sortButton.disabled = disabled;
    algorithmSelect.disabled = disabled;
}

// ---------- Bubble Sort ----------
async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add('active');
            bars[j + 1].classList.add('active');
            await new Promise(resolve => setTimeout(resolve, 50));
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }
            bars[j].classList.remove('active');
            bars[j + 1].classList.remove('active');
        }
    }
}

// ---------- Merge Sort ----------
async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
}

async function mergeSortHelper(left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSortHelper(left, mid);
    await mergeSortHelper(mid + 1, right);
    await merge(left, mid, right);
}

async function merge(left, mid, right) {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    const bars = document.querySelectorAll('.bar');

    while (i < leftArr.length && j < rightArr.length) {
        bars[k].classList.add('active');
        await new Promise(resolve => setTimeout(resolve, 50));

        if (leftArr[i] <= rightArr[j]) {
            array[k] = leftArr[i];
            i++;
        } else {
            array[k] = rightArr[j];
            j++;
        }

        bars[k].style.height = `${array[k]}px`;
        bars[k].classList.remove('active');
        k++;
    }

    while (i < leftArr.length) {
        array[k] = leftArr[i];
        bars[k].style.height = `${array[k]}px`;
        i++; k++;
    }

    while (j < rightArr.length) {
        array[k] = rightArr[j];
        bars[k].style.height = `${array[k]}px`;
        j++; k++;
    }
}

// ---------- Quick Sort ----------
async function quickSort() {
    await quickSortHelper(0, array.length - 1);
}

async function quickSortHelper(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
    }
}

async function partition(low, high) {
    const bars = document.querySelectorAll('.bar');
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].classList.add('active');
        await new Promise(resolve => setTimeout(resolve, 50));

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;
        }

        bars[j].classList.remove('active');
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[high].style.height = `${array[high]}px`;
    return i + 1;
}

// ---------- Event Listeners ----------
generateButton.addEventListener('click', generateArray);
shuffleButton.addEventListener('click', shuffleArray);
sortButton.addEventListener('click', async () => {
    disableControls(true);
    const selectedAlgorithm = algorithmSelect.value;
    if (selectedAlgorithm === 'bubble') {
        await bubbleSort();
    } else if (selectedAlgorithm === 'merge') {
        await mergeSort();
    } else if (selectedAlgorithm === 'quick') {
        await quickSort();
    }
    disableControls(false);
});

// Initialize
generateArray();
