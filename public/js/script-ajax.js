$(function(){
    let fullUrl = window.location.href;
    let splitUrl = fullUrl.split("/");
    let urlApp = splitUrl[0]+"//"+splitUrl[2]+"/";


    $(document).on("click", "#modificationServices", function(e){
        e.preventDefault();
        let id = $(this).attr("value");
        $.ajax({
            url: urlApp+"auth/ajax-services/"+id,
            type: "get",
            dataType: "json",
            success: function(response){
                $("#servicesModifId").val(response._id);
                $('#name').val(response.name);
                $('#price').val(response.price);
                $('#duration').val(response.duration);
                $('#commission').val(response.commission);
            }
        });
    });

    $(document).on("click", "#suppressionServices", function(e){
        e.preventDefault();
        let id = $(this).attr("value");
        $.ajax({
            url: urlApp+"auth/ajax-services/"+id,
            type: "get",
            dataType: "json",
            success: function(response){
                $("#label_suppression_service").text(response.name);
                $("#servicesSuppId").val(response._id);
            }
        });
    });
});