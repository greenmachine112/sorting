// Store the selected speed
let selectedSpeed = 1;

// speed-menu event listener
document.getElementById('speed-menu').addEventListener('change', (event) => {
  selectedSpeed = parseFloat(event.target.value);
});

// Generate an array
function generateArray(length, min, max) {
  return Array.from({ length: length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Visualize
function visualizeArray(array, arrayContainer, movingIndex = null, isSorted = false) {
  arrayContainer.innerHTML = '';
  array.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value}px`;
    if (index === movingIndex) {
      bar.style.backgroundColor = 'red';
    } else if (isSorted) {
      bar.style.backgroundColor = 'green';
    }
    arrayContainer.appendChild(bar);
  });
}

// Checker
function isSorted(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      return false;
    }
  }
  return true;
}

// Bubble Sort
async function bubbleSort(array, arrayContainer) {
  const len = array.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        await swap(array, j, j + 1);
        visualizeArray(array, arrayContainer, j + 1);
      } else {
        visualizeArray(array, arrayContainer, j);
      }
    }
  }
  visualizeArray(array, arrayContainer, null, true);
}

// Selection Sort
async function selectionSort(array, arrayContainer) {
  const len = array.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
      visualizeArray(array, arrayContainer, j);
      await sleep(100 / selectedSpeed);
    }
    if (minIndex !== i) {
      await swap(array, i, minIndex);
      visualizeArray(array, arrayContainer, i);
    }
  }
  visualizeArray(array, arrayContainer, null, true);
}

// Insertion Sort
async function insertionSort(array, arrayContainer) {
  const len = array.length;
  for (let i = 1; i < len; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j = j - 1;
      await sleep(100 / selectedSpeed);
      visualizeArray(array, arrayContainer, j + 1);
    }
    array[j + 1] = key;
  }
  visualizeArray(array, arrayContainer, null, true);
}

// Merge Sort
async function mergeSort(array, arrayContainer, left = 0, right = array.length - 1) {
  if (left >= right) {
    return;
  }
  const mid = Math.floor((left + right) / 2);
  await mergeSort(array, arrayContainer, left, mid);
  await mergeSort(array, arrayContainer, mid + 1, right);
  await merge(array, arrayContainer, left, mid, right);
  visualizeArray(array, arrayContainer);
  if (left === 0 && right === array.length - 1) {
    visualizeArray(array, arrayContainer, null, true);
  }
}

async function merge(array, arrayContainer, left, mid, right) {
  let leftArr = array.slice(left, mid + 1);
  let rightArr = array.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      array[k++] = leftArr[i++];
    } else {
      array[k++] = rightArr[j++];
    }
    visualizeArray(array, arrayContainer, k - 1);
    await sleep(100 / selectedSpeed);
  }

  while (i < leftArr.length) {
    array[k++] = leftArr[i++];
    visualizeArray(array, arrayContainer, k - 1);
    await sleep(100 / selectedSpeed);
  }

  while (j < rightArr.length) {
    array[k++] = rightArr[j++];
    visualizeArray(array, arrayContainer, k - 1);
    await sleep(100 / selectedSpeed);
  }
}

// Quick Sort
async function quickSort(array, arrayContainer, left = 0, right = array.length - 1) {
  if (left < right) {
    const pivotIndex = await partition(array, arrayContainer, left, right);
    await quickSort(array, arrayContainer, left, pivotIndex - 1);
    await quickSort(array, arrayContainer, pivotIndex + 1, right);
  }
  if (left === 0 && right === array.length - 1) {
    visualizeArray(array, arrayContainer, null, true);
  }
}

async function partition(array, arrayContainer, left, right) {
  const pivot = array[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (array[j] <= pivot) {
      i++;
      await swap(array, i, j);
      visualizeArray(array, arrayContainer, j);
    }
  }
  await swap(array, i + 1, right);
  visualizeArray(array, arrayContainer, i + 1);
  return i + 1;
}

// Heap Sort
async function heapSort(array, arrayContainer) {
  const len = array.length;
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    await heapify(array, len, i, arrayContainer);
  }
  for (let i = len - 1; i > 0; i--) {
    await swap(array, 0, i);
    visualizeArray(array, arrayContainer, 0);
    await heapify(array, i, 0, arrayContainer);
  }
  visualizeArray(array, arrayContainer, null, true);
}

async function heapify(array, heapSize, rootIndex, arrayContainer) {
  let largest = rootIndex;
  const leftChild = 2 * rootIndex + 1;
  const rightChild = 2 * rootIndex + 2;

  if (leftChild < heapSize && array[leftChild] > array[largest]) {
    largest = leftChild;
  }

  if (rightChild < heapSize && array[rightChild] > array[largest]) {
    largest = rightChild;
  }

  if (largest !== rootIndex) {
    await swap(array, rootIndex, largest);
    visualizeArray(array, arrayContainer, largest);
    await heapify(array, heapSize, largest, arrayContainer);
  }
}

// Counting Sort
async function countingSort(array, arrayContainer) {
  const len = array.length;
  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(len).fill(0);

  for (let i = 0; i < len; i++) {
    count[array[i] - min]++;
  }
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  for (let i = len - 1; i >= 0; i--) {
    output[count[array[i] - min] - 1] = array[i];
    count[array[i] - min]--;
  }
  for (let i = 0; i < len; i++) {
    array[i] = output[i];
    visualizeArray(array, arrayContainer, i);
    await sleep(100 / selectedSpeed);
  }
  visualizeArray(array, arrayContainer, null, true);
}

// Radix Sort
async function radixSort(array, arrayContainer) {
  const max = Math.max(...array);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    await countingSortByDigit(array, exp, arrayContainer);
    exp *= 10;
  }
  visualizeArray(array, arrayContainer, null, true);
}

async function countingSortByDigit(array, exp, arrayContainer) {
  const len = array.length;
  const output = new Array(len).fill(0);
  const count = new Array(10).fill(0);

  for (let i = 0; i < len; i++) {
    const digit = Math.floor(array[i] / exp) % 10;
    count[digit]++;
  }
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  for (let i = len - 1; i >= 0; i--) {
    const digit = Math.floor(array[i] / exp) % 10;
    output[count[digit] - 1] = array[i];
    count[digit]--;
  }
  for (let i = 0; i < len; i++) {
    array[i] = output[i];
    visualizeArray(array, arrayContainer, i);
    await sleep(100 / selectedSpeed);
  }
}

// Generic swap function
async function swap(array, a, b) {
  await sleep(100 / selectedSpeed);
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

// Generic delay function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startSorting(algorithm) {
  const arrayContainer = document.querySelector(`.${algorithm} .array-container`);
  const array = generateArray(43, 20, 250);
  visualizeArray(array, arrayContainer);

  switch (algorithm) {
    case 'bubble-sort':
      bubbleSort(array, arrayContainer);
      break;
    case 'selection-sort':
      selectionSort(array, arrayContainer);
      break;
    case 'insertion-sort':
      insertionSort(array, arrayContainer);
      break;
    case 'merge-sort':
      mergeSort(array, arrayContainer);
      break;
    case 'quick-sort':
      quickSort(array, arrayContainer);
      break;
    case 'heap-sort':
      heapSort(array, arrayContainer);
      break;
    case 'counting-sort':
      countingSort(array, arrayContainer);
      break;
    case 'radix-sort':
      radixSort(array, arrayContainer);
      break;
  }
}

function startAllSorts() {
  const algorithms = [
    'bubble-sort',
    'selection-sort',
    'insertion-sort',
    'merge-sort',
    'quick-sort',
    'heap-sort',
    'counting-sort',
    'radix-sort'
  ];
  const arrays = {};

  algorithms.forEach(algorithm => {
    const arrayContainer = document.querySelector(`.${algorithm} .array-container`);
    const array = generateArray(41, 20, 250);
    arrays[algorithm] = array;
    visualizeArray(array, arrayContainer);
  });

  algorithms.forEach(algorithm => {
    const arrayContainer = document.querySelector(`.${algorithm} .array-container`);
    switch (algorithm) {
      case 'bubble-sort':
        bubbleSort([...arrays[algorithm]], arrayContainer);
        break;
      case 'selection-sort':
        selectionSort([...arrays[algorithm]], arrayContainer);
        break;
      case 'insertion-sort':
        insertionSort([...arrays[algorithm]], arrayContainer);
        break;
      case 'merge-sort':
        mergeSort([...arrays[algorithm]], arrayContainer);
        break;
      case 'quick-sort':
        quickSort([...arrays[algorithm]], arrayContainer);
        break;
      case 'heap-sort':
        heapSort([...arrays[algorithm]], arrayContainer);
        break;
      case 'counting-sort':
        countingSort([...arrays[algorithm]], arrayContainer);
        break;
      case 'radix-sort':
        radixSort([...arrays[algorithm]], arrayContainer);
        break;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const sortButtons = document.querySelectorAll('.sort-button');
  sortButtons.forEach(button => {
    button.addEventListener('click', () => {
      const algorithm = button.getAttribute('data-algorithm');
      startSorting(algorithm);
    });
  });
  document.getElementById('start-all-btn').addEventListener('click', startAllSorts);
});
