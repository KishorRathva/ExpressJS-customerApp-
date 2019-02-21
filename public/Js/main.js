$(document).ready(() => {
    $('#deleteUser').on('click',deleteUser);
});

deleteUser = () => {
    var confirmation = confirm('Are You Sure?');

    if(confirmation){
        $.ajax({
            method:"DELETE",
            url:'/user/delete/'+$("#deleteUser").attr('data-id'),
            success : function( data) {
                console.log('success');
             },
            error : function() {
              console.log('error');
      
            }
    
        }).done(response => {
            window.location.replace('/');
        });
        window.location.replace('/');
    }else{
        return false;
    }
}
