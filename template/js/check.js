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


menuActivator(true);

let submit = document.querySelector('#submit');
submit.addEventListener('click',()=>{
    let form = document.querySelector('form');
    form.submit();
})