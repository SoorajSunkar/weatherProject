let img_src = document.querySelector('img');

let pic  = 1;
setInterval(()=>{
    let imgLink = `img/pic${pic}.png`;
    img_src.src  = imgLink;
    pic++;
    if(pic>3){
        pic  =1;
    }
},3000)


const menuActivator = (option)=>{
    let menuBtn = document.querySelector('#menu-btn');
    let searchBtn = document.querySelector('#search-btn');
    menuBtn.addEventListener("click",()=>{
    let navBar  = document.querySelector('nav');
    navBar.classList.toggle('active');
    if(option){
        console.log('here')
        let searchBox = document.querySelector('.search');
        // searchBox.style.zIndex = "-1";
        searchBox.classList.toggle('deactive');
    }
    else{
        console.log('here not')
        let searchBox = document.querySelector('.search');
        // searchBox.style.zIndex = "1";
    }
    })
}

menuActivator();

let close_btn = document.querySelector("#close-btn");
close_btn.addEventListener('click',()=>{
    close_btn.classList.remove('remove');
    document.querySelector('.reader').classList.remove('active');
})

let add= document.querySelector("#add");
add.addEventListener('click',()=>{
    document.querySelector('.reader').classList.add('remove');
    
})



let url = `${document.URL}/data/data.txt`;
let data;

fetch(url)
    .then(response => response.json())
    .then((data)=>{
    data = data;
    
    let articleContainer = document.querySelector(".articles-container");
    let html = articleContainer.innerHTML;
    data.forEach((data)=>{
        html+= `
    
        <div class="art-container">
        <h1>${data.title}</h1>
        <div class="details">
           <p class="topic">${data.question}</p>
           <p> <span class="space"></span> ${data.short} </p>

           <button class="btns main-btn">Read More</button>
        </div> 
        </div>
        `
    })

    articleContainer.innerHTML = html;

    let mainBtn  =document.querySelectorAll(".main-btn");

console.log(mainBtn)
  
mainBtn.forEach((ele,index)=>{
    ele.addEventListener('click',()=>{
    close_btn.classList.add('remove')
    document.querySelector('.reader').classList.add('active');

    let firstHead = document.querySelector('#reader-first-head')
    let secondHead = document.querySelector('#reader-second-head')
    let headerData = document.querySelector('#reader-data')

    firstHead.innerHTML = "Loading....";
    secondHead.innerHTML = "Loading....";
    headerData.innerHTML = "Loading....";   
    firstHead.innerHTML = data[index].title;
    secondHead.innerHTML = data[index].question;
    headerData.innerHTML = data[index].data;
     })
 })


})
