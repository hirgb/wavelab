var $ = mdui.JQ;
$.ajax({
    url:'/zhkfmanage', 
    method:'POST', 
    dataType:'json', 
    data:{action:'getpublicstrategy'}, 
    success:function(data){
        initPublicStrategy(data, '#publicstrategy');
    }
});
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
    $.ajax({
        url:'/zhkfmanage',
        method:'POST',
        data:{action:"addstrategy", title:title, subtitle:subtitle, introduce:introduce},
        success:function(data){
            if(data == 1){
                mdui.snackbar({message:'添加成功', timeout:800, position:'top'});
            }else{
                mdui.snackbar({message:'添加失败', timeout:800, position:'top'});
            }
        }
        });
});
$(document).on('click', '#publicstrategy button',
function(){
    console.log($(this).data());
}
);
function initPublicStrategy(data, elementselector) {
    htmlstr = '';
    for (var i = 0; i < data.length; i ++ ){
    htmlstr += '<div class="mdui-col"><div class="mdui-card mdui-hoverable"><div class="mdui-card-primary"><div class="mdui-card-primary-title">' +data[i][1]+ '</div><div class="mdui-card-primary-subtitle">' +data[i][2]+ '</div></div><div class="mdui-card-content">' +data[i][3]+ '</div><div class="mdui-card-actions"><button class="mdui-btn" data-id="'+data[i][0]+'" data-action="modify">修改</button><button class="mdui-btn" data-id="'+data[i][0]+'" data-action="delete">删除</button></div></div></div>';
    }
    $(elementselector).html(htmlstr);
}
