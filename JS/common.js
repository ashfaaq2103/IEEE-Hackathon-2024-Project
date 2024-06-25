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