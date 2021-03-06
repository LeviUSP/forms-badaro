document.querySelectorAll(".button").forEach((button) => {
  let getVar = (variable) =>
    getComputedStyle(button).getPropertyValue(variable);

  button.addEventListener("click", (e) => {
    e.preventDefault();
    const spanDefault = e.target.parentNode.querySelector("span.default");

    if (foundError()) {
      spanDefault.innerHTML = "Error";
      return;
    }
    if (!button.classList.contains("active")) {
      spanDefault.innerHTML = "Send";
      button.classList.add("active");

      disappearCardContent();

      gsap.to(button, {
        keyframes: [
          {
            "--left-wing-first-x": 50,
            "--left-wing-first-y": 100,
            "--right-wing-second-x": 50,
            "--right-wing-second-y": 100,
            duration: 0.3,
            onComplete() {
              gsap.set(button, {
                "--left-wing-first-y": 0,
                "--left-wing-second-x": 40,
                "--left-wing-second-y": 100,
                "--left-wing-third-x": 0,
                "--left-wing-third-y": 100,
                "--left-body-third-x": 40,
                "--right-wing-first-x": 50,
                "--right-wing-first-y": 0,
                "--right-wing-second-x": 60,
                "--right-wing-second-y": 100,
                "--right-wing-third-x": 100,
                "--right-wing-third-y": 100,
                "--right-body-third-x": 60,
              });
            },
          },
          {
            "--left-wing-third-x": 20,
            "--left-wing-third-y": 90,
            "--left-wing-second-y": 90,
            "--left-body-third-y": 90,
            "--right-wing-third-x": 80,
            "--right-wing-third-y": 90,
            "--right-body-third-y": 90,
            "--right-wing-second-y": 90,
            duration: 0.3,
          },
          {
            "--rotate": 50,
            "--left-wing-third-y": 95,
            "--left-wing-third-x": 27,
            "--right-body-third-x": 45,
            "--right-wing-second-x": 45,
            "--right-wing-third-x": 60,
            "--right-wing-third-y": 83,
            duration: 0.6,
          },
          {
            "--rotate": 55,
            "--plane-x": -8,
            "--plane-y": 24,
            duration: 0.3,
          },
          {
            "--rotate": 40,
            "--plane-x": 45,
            "--plane-y": -180,
            "--plane-opacity": 0,
            duration: 0.3,
            onComplete() {
              setTimeout(() => {
                button.removeAttribute("style");
                gsap.fromTo(
                  button,
                  {
                    opacity: 0,
                    y: -8,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    clearProps: true,
                    duration: 0.3,
                    onComplete() {
                      button.classList.remove("active");
                    },
                  }
                );
              }, 2000);
            },
          },
        ],
      });
      gsap.to(button, {
        keyframes: [
          {
            "--text-opacity": 0,
            "--border-radius": 0,
            "--left-wing-background": getVar("--primary-darkest"),
            "--right-wing-background": getVar("--primary-darkest"),
            duration: 0.1,
          },
          {
            "--left-wing-background": getVar("--primary"),
            "--right-wing-background": getVar("--primary"),
            duration: 0.1,
          },
          {
            "--left-body-background": getVar("--primary-dark"),
            "--right-body-background": getVar("--primary-darkest"),
            duration: 0.4,
          },
          {
            "--success-opacity": 1,
            "--success-scale": 1,
            duration: 0.25,
            delay: 0.25,
          },
        ],
      });
    }
  });
});

function foundError() {
  const fields = document.querySelectorAll("[required]");

  for (field of fields) {
    const error = verifyErrors(field);
    if (error) return true;
  }
  return false;
}

function verifyErrors(field) {
  let foundError = false;
  for (error in field.validity)
    if (field.validity[error] && !field.validity.valid) foundError = error;
  return foundError;
}

function disappearCardContent() {
  const card = document.querySelector(".card");
  const cardImg = document.querySelector("img.main-image");
  const inputs = document.querySelectorAll(".input");

  for (const input of inputs) {
    gsap.to(input, getDisappearKeyframe(input));
    input.querySelector("input").value = "";
  }

  gsap.to(cardImg, getDisappearKeyframe(cardImg));
  gsap.to(card, {
    keyframes: [
      {
        justifyContent: "space-between",
        duration: 0.6,
      },
      {
        justifyContent: "center",
        onComplete() {
          setTimeout(() => {
            gsap.fromTo(
              card,
              {
                justifyContent: "center",
                duration: 0.1,
              },
              {
                display: "flex",
                clearProps: true,
                duration: 0.3,
              }
            );
          }, 2000);
        },
      },
    ],
  });
}

function getDisappearKeyframe(object) {
  return {
    keyframes: [
      {
        duration: 0.2,
      },
      {
        display: "none",
        onComplete() {
          setTimeout(() => {
            // card.removeAttribute("style");
            console.log(object);
            gsap.fromTo(
              object,
              {
                display: "none",
                duration: 0.4,
              },
              {
                display: "flex",
                clearProps: true,
                duration: 0.3,
              }
            );
          }, 2000);
        },
      },
    ],
  };
}

function getCardKeyFrames() {}
