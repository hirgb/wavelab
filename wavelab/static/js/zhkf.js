var $ = mdui.JQ;
$(document).on('click', '#left-drawer .mdui-list-item', 
function(){
    var contrul = $(this).data().contrul;
    $('.panel').css('display', 'none');
    $('#' + contrul).css('display', 'block');
}
);
$(document).on('click', '#addstrategybtn', 
function(){
    var title = $('#addstrategy-title').val();
    var subtitle = $('#addstrategy-subtitle').val();
    var introduce = $('#addstrategy-introduce').val();
    var querystr = $('#addstrategy-querystr').val();
    $.ajax({
        url:'/zhkfmanage',
        method:'POST',
        data:{action:"addstrategy", title:title, subtitle:subtitle, introduce:introduce, querystr:querystr},
        success:function(data){
            if(data == 1){
                mdui.snackbar({message:'添加成功', timeout:800, position:'top'});
            }else{
                mdui.snackbar({message:'添加失败', timeout:800, position:'top'});
            }
        }
        });
});
