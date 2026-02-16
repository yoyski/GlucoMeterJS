function GlucoseCalc() {
  function evaluate(glucose, unit, selectedTest) {

    const glucoseInMgdL = unit === "mmol/L" ? glucose * 18 : glucose;
    const converted = parseFloat(unit === "mmol/L" ? glucose * 18 : glucose / 18).toFixed(2);

    const levelsMgdL = [
      {
        max: selectedTest === "Random Blood Test" ? 90 : 70,
        level: "Hypoglycemia (Low)",
        msg: "May cause dizziness, weakness, and confusion, putting extra stress on the kidneys. If these symptoms persist, it is important to tryconsult with a healthcare provider for further evaluation.",
        color: "#3498db"
      },
      {
        max: selectedTest === "Random Blood Test" ? 140 : 100,
        level: "Normal",
        msg: "Healthy blood sugar range. Maintain a balanced diet, regular exercise, and proper hydration to keep your blood sugar levels stable and support overall well-being.",
        color: "#2ecc71"
      },
      {
        max: selectedTest === "Random Blood Test" ? 180 : 126,
        level: "Prediabetes",
        msg: "Could indicate early insulin resistance and a developing imbalance in blood sugar control. Monitoring your diet and increasing physical activity can help manage these early signs.",
        color: "#f1c40f"
      },
      {
        max: selectedTest === "Random Blood Test" ? 250 : 200,
        level: "Diabetes",
        msg: "Excess glucose strains kidney function and can lead to long-term health complications. It is crucial to monitor your condition closely and consult healthcare professionals for proper management.",
        color: "#c0392b"
      },
      {
        max: Infinity,
        level: "Severely High",
        msg: "There is a high risk of kidney failure and diabetic ketoacidosis (DKA). Immediate medical attention is advised to manage blood sugar levels and prevent potentially life-threatening complications.",
        color: "#B22222"
      }
    ];

    const { msg, level, color } = levelsMgdL.find(({ max }) => glucoseInMgdL < max);

    resultContainer(selectedTest, glucose, unit, converted, level, msg, color)
  }

  return { evaluate };
}

function resultContainer(selectedTest, glucose, unit, converted, level, msg, color) {
  const typeOfTest = document.querySelector('.type-of-test');
  const levelResult = document.querySelector('.level');
  const unitConversion = document.querySelector('.unit');
  const message = document.querySelector('.message');
  
  document.querySelector('.result-container').style.border = `2px double ${color}`;

  typeOfTest.innerHTML = `${selectedTest}`;
  
  levelResult.innerHTML = `${level}`;
  levelResult.style.color = color;
  
  unitConversion.innerHTML = `${glucose} ${unit} - ${converted} ${unit === "mmol/L" ? "mg/dL" : "mmol/L"}`;
  
  message.innerHTML = `${msg}`;
  message.style.color = color;
}

export default GlucoseCalc;