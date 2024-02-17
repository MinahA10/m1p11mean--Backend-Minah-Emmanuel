$(function(){
    let fullUrl = window.location.href;
    let splitUrl = fullUrl.split("/");
    let urlApp = splitUrl[0]+"//"+splitUrl[2]+"/";


    $(document).on("click", "#modificationServices", function(e){
        e.preventDefault();
        console.log("Ok");
    });
});