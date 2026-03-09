let allData =[];
let total = document.getElementById("total");

// spinner loading
const mangeSpinner = (status) => {
   if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issues-container").classList.add("hidden");
  } else {
    document.getElementById("issues-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// Togoling btn 
const button = document.querySelectorAll(".filter-btn");
button.forEach(btn => {
    // console.log(btn)
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
const loadIssues = async() =>{
  mangeSpinner(true)
   const url ="https://phi-lab-server.vercel.app/api/v1/lab/issues";
   const res = await fetch(url);
   const json = await res.json();
   mangeSpinner(false)
   displayIssues(json.data);
   allData = json.data; //store all data on a empty array 
   console.log(allData)
}

const showModal = async (id) => {
  mangeSpinner(true)
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayIssuesDetails(details.data)
}


// show modal
const displayIssuesDetails = (issue) => {

    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML = `
    <h1 class="font-bold text-2xl">${issue.title}</h1>
            <div class="gap-2 flex">
                <span class="badge bg-success rounded-full text-white">${issue.status}</span> 
                <p>•  ${issue.author}  •</p>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="flex gap-1">
                <div class="badge badge-soft badge-secondary border-1 border-red-400 p-3 rounded-full font-medium"><i
                        class="fa-solid fa-bug"></i>${issue.labels[0] ? issue.labels[0] : 'No labels'}</div>
                <div class="badge badge-soft badge-warning border-1 border-yellow-300 p-3 rounded-full font-medium"><i
                        class="fa-regular fa-life-ring"></i>${issue.labels[1] ? issue.labels[1] : 'No labels'}</div>
            </div>
            <p class="gray py-4">${issue.description}</p>
            <div class="flex bg-gray-100 p-5 rounded-md">
                <div class="flex-1">
                    <p class="gray">Assignee:</p>
                    <p class="font-semibold text-4">${issue.assignee}</p>
                </div>
                <div class="flex-1">
                    <p class="gray">Priority:</p>
                    <p class="badge text-white rounded-full ${issue.priority === 'high' ? 'badge-error' : issue.priority === 'medium' ? 'badge-warning' : 'badge-info'}">${issue.priority}</p>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog" >
                    <button class="btn btn-primary">Close</button>
                   </form>        
            </div>
    ` 
    document.getElementById('issue_modal').showModal();
    mangeSpinner(false)
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
      <span class="bg-yellow-100 text-orange-300 px-1 rounded-4xl border-1">${issue.labels[1]}</span>`:
        issue.labels[0] ? issue.labels[0] == "bug" ?`<span class="bg-pink-100 text-red-400 px-1 rounded-4xl border-1"><i class="fa-solid fa-bug"></i> ${issue.labels[0]}</span>` :`<span class="bg-green-100 text-green-300 px-1 rounded-4xl border-1" >${issue.labels[0]}</span>`:false}   
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
   card.querySelector("div").addEventListener("click", () => {
      showModal(issue.id);
    });
   issusContainer.append(card)
 })
 mangeSpinner(false)
 
}

// btn switching and counting 
document.getElementById("btn-all").addEventListener('click', () =>{
  const allCard = allData;
  displayIssues(allCard)
})
document.getElementById("btn-open").addEventListener('click', () =>{
  const openCard = allData.filter(open => open.status === 'open');
  displayIssues(openCard)
})
document.getElementById( "btn-closed").addEventListener('click', () =>{
  const closeCard = allData.filter(close => close.status === 'closed');
  displayIssues(closeCard)
})

// search issues
document.getElementById("search-issue").addEventListener('input', (e)=>{
    const searchValue = e.target.value.trim().toLowerCase(); 
     mangeSpinner(true);  
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res=> res.json())
    .then(data=> {
        const allIssues = data.data;
        // console.log(allIssues)
        const filterIssus = allIssues.filter(issues=> issues.title.toLowerCase().includes(searchValue));
        // console.log(filterIssus);
        displayIssues(filterIssus);
        mangeSpinner(false);
    })
})
loadIssues()


