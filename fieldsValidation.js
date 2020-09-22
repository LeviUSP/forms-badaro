// validity of fields
const fields = document.querySelectorAll("[required]");

for (field of fields) {
  field.addEventListener("invalid", (event) => {
    event.preventDefault();
    customValidation(event);
  });
  field.addEventListener("blur", (event) => customValidation(event));
}

function customValidation(event) {
  const field = event.target;

  const error = verifyErrors(field);
  if (error) {
    const message = customMessage(field, error);
    setCustomMessage(field, message);
    label(field, error);
  } else {
    setCustomMessage(field);
    label(field);
  }
}

function verifyErrors(field) {
  let foundError = false;
  for (error in field.validity)
    if (field.validity[error] && !field.validity.valid) foundError = error;
  return foundError;
}

function customMessage(field, typeError) {
  const messages = {
    text: {
      valueMissing: "Please, this field is necessary",
    },
    email: {
      valueMissing: "We need your email",
      typeMismatch: "Email is not valid",
    },
  };
  return messages[field.type][typeError];
}

function setCustomMessage(field, message) {
  const spanError = field.parentNode.querySelector("span.error");

  if (message) {
    spanError.classList.add("active-error");
    spanError.innerHTML = message;
  } else {
    spanError.classList.remove("active-error");
    spanError.innerHTML = "";
  }
}

function label(field, error) {
  const label = field.parentNode.querySelector("label");
  if (error === "typeMismatch") label.style.visibility = "hidden";
  else label.style.visibility = "visible";
}
