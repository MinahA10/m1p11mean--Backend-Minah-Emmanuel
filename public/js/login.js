let condition = true;
function showPassword()
{
    if(condition)
    {
        document.getElementById("password").setAttribute("type", "text");
        document.getElementById("icon-login").setAttribute("class", "position-absolute fas fa-eye"); 
        condition = false;
    }
    else
    {
        document.getElementById("password").setAttribute("type", "password");
        document.getElementById("icon-login").setAttribute("class", "position-absolute fas fa-eye-slash");
        condition = true;
    }
}