const form = document.querySelector("form");
const priceInput = document.querySelector("#price");
const message = document.querySelector(".message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const price = parseFloat(priceInput.value);
  const selectedRadio = document.querySelector('input[name="payment"]:checked');

  if (!selectedRadio || isNaN(price)) {
    message.innerHTML = "Preencha o valor e selecione o pagamento!";
    return;
  }

  let finalValue = 0;
  let description = "";

  switch (selectedRadio.id) {
    case "pix":
      finalValue = price * 0.9;
      description = "Desconto de 10% (PIX)";
      break;

    case "debito":
      finalValue = price * 0.95;
      description = "Desconto de 5% (Débito)";
      break;

    case "credito":
      finalValue = price;
      description = "Valor Integral (Crédito)";
      break;

    default:
      finalValue = price;
      description = "Forma de pagamento não identificada";
  }

  message.innerHTML = `
    <strong>${description}</strong><br>
    Total a pagar: R$ ${finalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
  `;
});
