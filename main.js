import GlucoseCalc from './glucoseCalculator.js';

const stepProcess = document.querySelectorAll('.step');
const fastingRandom = document.querySelector('.fasting-or-random');
const bloodButton = document.querySelectorAll('.blood-btn');
const selection = document.querySelector('.option-unit');
const buttonContainer = document.querySelector('.button-container')

let currentStep = 1;
let chosen = false;
let selectedTest = null;
const glucoseCalc = new GlucoseCalc();

stepProcess.forEach((step, index) => {
  if (index === 0) {
    const nextButton = document.createElement('button');
    nextButton.classList.add('btn', 'next-btn');
    nextButton.textContent = 'Next';
    step.appendChild(nextButton);
    nextButton.addEventListener('click', nextStep);
  } else {
    const previousButton = document.createElement('button');
    previousButton.classList.add('btn', 'prev-btn');
    previousButton.textContent = 'Prev';
    buttonContainer.appendChild(previousButton);
    previousButton.addEventListener('click', prevStep);

    const showResultButton = document.createElement('button');
    showResultButton.classList.add('btn', 'show-result-btn');
    showResultButton.textContent = 'Show Result';
    buttonContainer.appendChild(showResultButton);
    showResultButton.addEventListener('click', showResultStep);
  }
});

function nextStep() {
  //document.querySelector('.gluco-meter-container').style.height = 
  if (chosen) {
    if (currentStep === 1) {
      stepProcess.forEach(step => step.classList.remove('active'));
      currentStep++;
    }
    document.querySelector(`.step${currentStep}`).classList.add('active');
  } else {
    console.log("choose first");
  }
}

function prevStep() {
  document.querySelector('.result-container').style.display = "none";
  if (currentStep === 2) {
    stepProcess.forEach(step => step.classList.remove('active'));
    currentStep--;
  }
  document.querySelector(`.step${currentStep}`).classList.add('active');
}

function showResultStep() {
  const glucoseMeter = document.querySelector('input').value;
  const glucose = parseFloat(glucoseMeter);
  if (glucoseMeter.length > 0) {
    const unit = selection.value;

    document.querySelector('.result-container').style.display = "grid";

    console.log(selectedTest);
    console.log(GlucoseCalc().evaluate(glucose, unit, selectedTest));
  } else {
    alert("No input")
  }
}

fastingRandom.addEventListener("click", e => {
  const target = e.target;

  if (target.classList.contains("fasting-blood-btn")) {
    target.nextElementSibling.classList.remove('isHover');
    target.classList.add('isHover');
    selectedTest = "Fasting Blood Test";
    chosen = true;
  } else if (target.classList.contains("random-blood-btn")) {
    target.previousElementSibling.classList.remove('isHover');
    target.classList.add('isHover');
    selectedTest = "Random Blood Test";
    chosen = true;
  }
});