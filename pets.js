// footer


   export function addFooter() {
    let newH4 = document.createElement('h4');
    newH4.textContent = "Rehome Your Forever Friend.";
    newH4.className = 'h4footer';
    newH4.style.color = 'black';
    newH4.style.marginTop = '5px';
    newH4.style.textAlign = 'center';
    newH4.style.fontSize = '30px';
    newH4.style.paddingLeft = '1000px';
    const footer = document.querySelector('footer');
    footer.appendChild(newH4);
   
};

addFooter();