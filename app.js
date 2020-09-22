// selectNavItem(3);
// function selectNavItem(index) {
//   const navItems = document.getElementsByClassName("selectable");
//   console.log(typeof navItems);
//   for (const i in navItems.length) {
//     navItems[i].classList.remove("active");
//   }

//   const selectedItem = navItems[index];
//   selectedItem.classList.add("active");
// }

const text = "Preencha para que possamos retornar ao contato!";

let index = 0;
let currentText = "";
let letter = "";

(async function type() {
  currentText = text;
  letter = currentText.slice(0, ++index);

  document.querySelector(".typing").textContent = letter;

  if (letter.length === currentText.length) {
    return;
  }
  setTimeout(type, 150);
})();
