const formRetirement = document.querySelector("#calc-form");
const messageRetirement = document.querySelector(".message-retirement");

const allInputs = document.querySelectorAll("input");

formRetirement.addEventListener("submit", (e) => {
  e.preventDefault();
  messageRetirement.innerHTML = "";

  const age = document.getElementById("age").value;
  const time = document.getElementById("time").value;

  if (age >= 65 || time >= 30) {
    messageRetirement.innerHTML = "Você pode se aposentar";
    messageRetirement.style.color = "green";
    return;
  }

  messageRetirement.innerHTML = "Você ainda não pode...";
});

function numberValidator(e) {
  const input = e.target;
  if (input.value < 0) {
    input.value = 0;
  }
}

allInputs.forEach((input) => {
  input.addEventListener("input", numberValidator);
});

// Imc:
const formIMC = document.querySelector("#imc-form");
const messageIMC = document.querySelector(".message-imc");

function getImcCategory(imc) {
  if (imc < 18.5) return "underWeight";
  if (imc <= 24.9) return "normalWeight";
  if (imc <= 29.9) return "overWeight";
  if (imc <= 34.4) return "obesityOne";
  if (imc <= 39.9) return "obesityTwo";
  return "obesityThree";
}

const dict = {
  underWeight: "Você está abaixo do peso.",
  normalWeight: "Você está dentro da normalidade.",
  overWeight: "Você está com sobrepeso",
  obesityOne: "Você está com obesidade grau I",
  obesityTwo: "Você está com obesidade grau II",
  obesityThree: "Você está com obesidade grau III",
};

formIMC.addEventListener("submit", (e) => {
  e.preventDefault();

  let heightRaw = document.getElementById("height").value;
  let weightRaw = document.getElementById("weight").value;

  const heightClean = heightRaw.trim().replace(",", ".");
  const weightClean = weightRaw.trim().replace(",", ".");

  const height = parseFloat(heightClean);
  const weight = parseFloat(weightClean);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    messageIMC.innerHTML = "Por favor, insira valores válidos (ex: 1,75 e 80).";
    messageIMC.style.color = "red";
    return;
  }

  const imc = weight / (height * height);

  messageIMC.innerHTML = `Seu IMC é ${imc.toFixed(2)}`;
  messageIMC.style.color = "black";
});
