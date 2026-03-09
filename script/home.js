let total = document.getElementById("total");
// total.innerText = 55;
// console.log(total)

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

// load data 
const loadIssues = () =>{
    const url ="https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then (res =>res.json())
    .then (json => displayIssues(json.data))
}
const displayIssues = (issues) =>{
 const issusContainer = document.getElementById("issues-container");
 const length = issues.length;
 total.innerText = length;
 console.log(length)
 issusContainer.innerHTML = "";
 issues.forEach(issue => {
    const card = document.createElement("div");
    card.innerHTML =`
      <div class="bg-white p-4 rounded-sm shadow space-y-3 h-full border-t-3 ${issue.status === "open"?" border-green-500":"border-purple-500"}">
      <div class="flex justify-between">
        <div>
        ${issue.priority == "high" ||issue.priority == "medium" ?`<img src="./assets/Open-Status.png" alt="">` :`<img src="./assets/Closed- Status .png" alt="">`}
          
        </div>
        <div>
        ${issue.priority == "high" ?`<span class="bg-pink-100 text-red-400 px-5 py-1 rounded-4xl">${issue.priority}</span>`:issue.priority == "medium" ?`<span class="bg-yellow-100 text-orange-300 px-5 py-1 rounded-4xl">${issue.priority}`:`<span class="bg-gray-100 text-gray-400 px-5 py-1 rounded-4xl">${issue.priority}</span>` }
        </div>
        
      </div>
      <div>
        <h3 class="font-semibold">${issue.title}</h3>
        <p class="gray">${issue.description}</p>
      </div>
      <div class="flex gap-2">
      ${issue.labels[0] &&  issue.labels[1]?`<span class="bg-pink-100 text-red-400 px-1 rounded-4xl border-1">${issue.labels[0]}</span>
      <span class="bg-yellow-100 text-orange-300 px-1 rounded-4xl border-1" >${issue.labels[1]}</span>`:
        issue.labels[0] ? issue.labels[0] == "bug" ?`<span class="bg-pink-100 text-red-400 px-1 rounded-4xl border-1"><i class="fa-solid fa-bug"></i>${issue.labels[0]}</span>` :`<span class="bg-green-100 text-green-300 px-1 rounded-4xl border-1" >${issue.labels[0]}</span>`:false}   
      </div>
       <hr>
      <div class="flex flex-col gap-2 gray">
        <div>
        <span>#${issue.id} by ${issue.author}</span>
       </div>
      <span>${new Date(issue.createdAt).getDate()} ${new Date(issue.createdAt).toLocaleString('en-US',{month:'long'})} ${new Date(issue.createdAt).getFullYear()}</span>
      </div>
     </div>
   `
   issusContainer.append(card)
 })
}
loadIssues()

