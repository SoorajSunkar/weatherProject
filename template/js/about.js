const menuActivator = (option)=>{
    let menuBtn = document.querySelector('#menu-btn');
    let searchBtn = document.querySelector('#search-btn');
    menuBtn.addEventListener("click",()=>{
    let navBar  = document.querySelector('nav');
    navBar.classList.toggle('active');

    })
}

menuActivator();