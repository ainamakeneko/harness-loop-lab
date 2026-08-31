export function chooseOption(optionA, optionB, random = Math.random) {
  const options = [optionA.trim(), optionB.trim()];
  const missing = options
    .map((option, index) => (option ? null : `Option ${index === 0 ? "A" : "B"}`))
    .filter(Boolean);

  if (missing.length) {
    return { error: `Enter ${missing.join(" and ")} before choosing.` };
  }

  return { choice: options[random() < 0.5 ? 0 : 1] };
}

const form = typeof document === "undefined" ? null : document.querySelector("#decision-form");

if (form) {
  const optionA = document.querySelector("#option-a");
  const optionB = document.querySelector("#option-b");
  const error = document.querySelector("#error");
  const result = document.querySelector("#result");
  const chosenOption = document.querySelector("#chosen-option");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const outcome = chooseOption(optionA.value, optionB.value);

    if (outcome.error) {
      error.textContent = outcome.error;
      result.hidden = true;
      return;
    }

    error.textContent = "";
    chosenOption.textContent = outcome.choice;
    result.hidden = false;
  });
}
