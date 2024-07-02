function MenuButton()
{
    var element = document.getElementById("dropdown_container")
    if (element.style.display == "inline-block")
    {
        element.style.display = "none"; 
    }
    else
    {
        element.style.display = "inline-block"; 
    } 

}

function MenuButtonResize()
{
    var element = document.getElementById("dropdown_container")
    if (window.innerWidth > 800)
    {
        element.style.display = "none"; 
    }
}

window.addEventListener('resize', function() {
    MenuButtonResize();
});