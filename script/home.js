// Togoling btn 
const button = document.querySelectorAll(".filter-btn");
button.forEach(btn => {
    console.log(btn)
  btn.addEventListener("click", () => {
    button.forEach(b => {
        b.classList.remove("btn-primary","text-white")
        b.classList.add("gray","bg-white")
    });
    btn.classList.remove("gray","bg-white")
    btn.classList.add("btn-primary","text-white");
  });
});

