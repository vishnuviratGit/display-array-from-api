const API1="https://dummyjson.com/posts";
const API2="https://dummyjson.com/products";
const API3="https://dummyjson.com/todos";
/*  table structure: data.posts.body,   data.posts.id, data.posts.title, data.posts.reactions.likes, data.posts.reactions.dislikes,
    data.posts.tags, data.posts.userId, data.posts.views
*/
let button=document.getElementById("btn");
button.addEventListener("click", ()=>{
    PromiseAPI1()
        .then(() => PromiseAPI2())
        .then(() => PromiseAPI3())
        .catch((error) => console.log("Error in fetching data:", error));
})
function PromiseAPI1(){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        fetch(API1).then((result)=>result.json()).then(data=>{
            console.log(data);
            displayData(data.posts,"Posts")
            resolve();
       }).catch(error=>reject(error));
         

      }, 1000);
})}
function PromiseAPI2(){
    return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        fetch(API2).then((result)=>result.json()).then(data=>{
            console.log(data);
            displayData(data.products,"Products")
            resolve();
       }).catch(error=>reject(error));
    }, 2000);
})}
function PromiseAPI3(){ 
    return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        fetch(API3).then((result)=>result.json()).then(data=>{
            console.log(data);
            displayData(data.todos,"Todos")
            resolve();
       }).catch(error=>reject(error));
    }, 3000);
})};
function displayData(items, title) {
    const outputDiv = document.getElementById("tableDiv");
    const section = document.createElement("div");
    section.innerHTML = `<h3 class="mt-4">${title}</h3>`;
    
    const table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-striped", "mt-2");
    
    const thead = document.createElement("thead");
    thead.classList.add("table-dark");
    const headerRow = document.createElement("tr");
    
    // Create table headers dynamically based on keys
    Object.keys(items[0]).forEach(key => {
        
        const th = document.createElement("th");
        if(title=="Products"){
            if(key!=="reviews" && key!=="meta"){
                th.textContent=key;
            }
             
        }
        else{
            th.textContent = key;
        }
       
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement("tbody");
    // Populate table rows
    items.forEach(item => {
        const row = document.createElement("tr");
        Object.keys(item).forEach(key=> {
            const td = document.createElement("td");
               if(title=="Posts"){
                   if(key=="reactions"){
                       td.textContent=`likes: ${item[key].likes}, dislikes: ${item[key].dislikes}`;
                   }else{
                       td.textContent = item[key];
                   }
               }
               else if(title=="Products"){
                    if(key=="dimensions"){
                        td.textContent=`width: ${item[key].width}, height: ${item[key].height}, depth: ${item[key].depth}`;
                    }
                    else if(key!=="reviews" && key!=="meta"){
                        td.textContent = item[key];
                    }
               }
               else{
                  td.textContent = item[key];
               }
              
                
            
            
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    
    section.appendChild(table);
    outputDiv.appendChild(section);
}