var $ = mdui.JQ;
var user = Z.cookie.get('loginname') ? Z.cookie.get('loginname') : '';
var favoriteData = null;
var strategy = null;
var stockchoosePanel = new mdui.Panel('#stockchoosepanel');
var oldname = '';
var newname = '';
var editGroup = new mdui.Dialog('#editgroup', {
    closeOnCancel: true,
    modal: true
});
var newGroup = new mdui.Dialog('#newgroup', {
    closeOnCancel: true,
    modal: true
});
var stockfilter = {};
$('#acount').css('display', 'block');
$.ajax({
    url: '/ajax',
    method: 'POST',
    dataType: 'json',
    data: {
        action: 'getfavorite'
    },
    success: function(data) {
        Z.check.localStorageSupport ? localStorage.setItem(user + "favoriteData", JSON.stringify(data)) : console.log("Your browser is not support localStorage!");
        initFavorite(data.favorite, document.getElementById('favoritegrouplist'));
        favoriteData = data;
    }
});
$.ajax({
    url:'/ajax', 
    method:'POST', 
    dataType:'json', 
    data:{action:'getpublicstrategy'}, 
    success:function(data){
        Z.check.localStorageSupport ? localStorage.setItem('publicStrategy', JSON.stringify(data)) : console.log("Your browser is not support localStorage!");
        initPublicStrategy(data, '#publicstrategy');
    }
});
$(document).on('change', '#stockfilter input',
function () {
    if ($(this)[0].type == 'range') {
        var contrul = $(this).data().contrul;
        stockfilter[contrul] = $(this).val();
        $('#'+contrul).text($(this).val());
    } else if ($(this)[0].type == 'checkbox') {
        var contrul = $(this).data().contrul;
        stockfilter[contrul] = $(this).val();
    } else if ($(this)[0].type == 'radio') {
        var contrul = $(this).data().contrul;
        stockfilter[contrul] = $(this).val();
    }

}
);
$(document).on('click', '#logoutbtn',
function() {
    Z.cookie.remove('loginname');
    Z.cookie.remove('token');
    window.location.href = '/';
});
//******************************
//the active of the left drawer navigation.
//******************************
$(document).on('click', '.mdui-collapse-item',
function() {
    var list = $('.panel');
    if (index != 1) {
    var index = $(this).index();
        list.css('display', 'none');
        list[index].style.display = 'block';
        if (index == 2){
            $.ajax({
                url:'/ajax',
                method:'POST',
                dataType:'json',
                data:{action:'gettrade'},
                success:function(data){
                    var htmlstr = '<div class="mdui-panel mdui-panel-gapless">';
                    for (var i = 0; i < data.length; i ++ ){
                        htmlstr += '<div class="mdui-panel-item"><div class="mdui-panel-item-header"><div class="mdui-panel-item-title">'+ data[i].name + ' - ' + data[i].code +'<a href="/detail/?stockcode='+data[i].code+'" target="_blank"><i class="mdui-icon material-icons">trending_up</i></a></div><i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i></div><div class="mdui-panel-item-body"><div class="mdui-table-fluid"><table class="mdui-table mdui-table-hoverable"><thead><tr><th>日期</th><th>买卖</th><th>价格</th><th>数量</th><th>总价</th><th>编辑</th></tr></thead><tbody>';
                        for (var j = 0;j < data[i].value.length ; j++ ){
                            var tradedata = data[i].code+'-'+data[i].value[j][0]+'-'+data[i].value[j][2]+'-'+data[i].value[j][3]+'-'+data[i].value[j][1];
                            htmlstr += '<tr><th>' + data[i].value[j][0] + '</th><th>' + data[i].value[j][2] + '</th><th>' + data[i].value[j][3] + '</th><th>' + data[i].value[j][1] + '</th><th>' + data[i].value[j][3] * data[i].value[j][1] + '</th><th><i class="mdui-icon material-icons" data-trade="edit-'+tradedata+'">edit</i><i class="mdui-icon material-icons" data-trade="delete-'+tradedata+'">delete</i></th></tr>';
                        }
                        htmlstr += '</tbody></table></div></div></div>';
                    }
                    htmlstr += '</div>';
                    $('#tradedata>.mdui-row').html(htmlstr);
                    var tradedataPanel = new mdui.Panel('#tradedata .mdui-panel', {accordion:true});
                }
                });
        }
    }
});
$(document).on('click', '.mdui-table th i',
function() {
    //console.log($(this).data());
    var tradearray = $(this).data().trade.split('-');
    if (tradearray[0] == 'edit'){
        mdui.alert('Coming soon...');
    } else if (tradearray[0] == 'delete'){
        mdui.dialog({
            title:'提示', 
            content:'确定要删除交易记录{' + tradearray.join(' - ') + '}吗?',
            buttons: [
                  {
                      text: '取消'
                  },
                  {
                      text: '确认',
                      onClick: function(){
                        $.ajax({
                            url:'/ajax',
                            method:'POST',
                            data:{"action":"deletetrade", "data":JSON.stringify(tradearray)},
                            success:function(result) {
                                if(result==1){
                                    mdui.snackbar({message:'删除成功', timeout:800, position:'top'});
                                }
                                else{
                                    mdui.snackbar({message:'删除失败', timeout:800, position:'top'});
                                }
                            }
                            });
                          }
                  }
                ]
            });
    }
});
$(document).on('click', '.favoritegroup',
function() {
    $('.panel').css('display', 'none');
    $('#favorite').css('display', 'block');
});
$(document).on('click', '.favoritegroup span',
function() {
    favoriteData = JSON.parse(localStorage.getItem(user + 'favoriteData'));
    var stocklist = favoriteData.favorite[$(this).parent().index()].stock;
    var stockGroup = favoriteData.favorite[$(this).parent().index()].name;
    var stockData = favoriteData.stockdata;
    var str = '';
    stocklist.forEach(function(e) {
        str += '<div class="mdui-col-md-3 mdui-col-sm-6 mdui-col-xs-12"><div class="mdui-card height-150 gradient-45deg-light-blue-cyan gradient-shadow"><div class="chart"></div><i id="'+ stockGroup + '-' + e[0] + '-' + e[1] + '" class="delete-favorite mdui-list-item-icon mdui-icon material-icons">delete_forever</i></div></div>';
    });
    $('#favorite').html(str);
    list = document.querySelectorAll('#favorite .chart');
    list.forEach(function(e, i) {
        var chart = echarts.init(e);
        option.title.text = stocklist[i][1];
        option.title.link = '/detail/?stockcode=' + stocklist[i][0];
        option.xAxis.data = stockData[stocklist[i][0]]['date'];
        option.series[0].data = stockData[stocklist[i][0]]['value'];
        chart.setOption(option);
    });
});
$(document).on('mouseover', '.mdui-card', function(){
            $(this).children('i').css('display', 'block');
            });
$(document).on('mouseout', '.mdui-card', function(){
            $(this).children('i').css('display', 'none');
            });
//******************************
//delete a favorite stock
//******************************
$(document).on('click', '.delete-favorite', function(){
            var _this = $(this);
            var stock = $(this).prop('id');
            var infolist = stock.split('-');
            mdui.alert('你将删除股票 - ' + stock + '，请确认。', '提示', function(){
                $.ajax({
                    url:'/ajax', 
                    method:'POST', 
                    data:{"action":"deletefavoritestock", "stock":stock}, 
                    success:function(data){
                        if(data == 1){
                            var favoriteData = JSON.parse(localStorage.getItem(user + 'favoriteData'));
                            var favorite = favoriteData.favorite;
                            for(var i = 0; i < favorite.length; i ++ ){
                                if(favorite[i].name == infolist[0]){
                                    for(var j = 0; j < favorite[i].stock.length; j ++ ){
                                        if(favorite[i].stock[j][0] == infolist[1]){
                                            favorite[i].stock.splice(j, 1);
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                            localStorage.setItem(user + 'favoriteData', JSON.stringify(favoriteData));
                            _this.parent().parent().remove();
                            mdui.snackbar({message:'删除成功', timeout:800, position:'top'});
                        } else {
                            mdui.snackbar({message:'删除失败', timeout:800, position:'top'});
                        }
                    }
                    });
                }, {confirmText:'确定'});
            })
$(document).on('mouseover', '.favoritegroup',
function() {
    $(this).children('.edit').css('display', 'inline');
});
$(document).on('mouseout', '.favoritegroup',
function() {
    $(this).children('.edit').css('display', 'none');
});
//******************************
//rename a stock group
//******************************
$(document).on('click', '.edit-edit',
function() {
    //renameGroupObj = $(this).parent().children('span');
    oldname = $(this).parent().children('span').text();
    $('#groupname').val(oldname);
    editGroup.open();
});
//******************************
//delete a stock group
//******************************
$(document).on('click', '.edit-del',
function() {
    name = $(this).parent().children('span').text();
    mdui.alert('删除后分组内股票也将全部删除。确定删除此分组吗？','删除分组 - ' + name, function(){
            $.ajax({
                url:'/ajax', 
                method:'POST', 
                data:{"action":"deletegroup", "groupname":name},
                success:function(data){
                    if(data == 1){
                        mdui.snackbar({message:'删除成功', timeout:800, position:'top'});
                        var favoriteData = JSON.parse(localStorage.getItem(user + 'favoriteData'));
                        for (i in favoriteData.favorite){
                            if(favoriteData.favorite[i].name == name){
                                favoriteData.favorite.splice(i, 1);
                                break;
                            }
                        }
                        localStorage.setItem(user + 'favoriteData', JSON.stringify(favoriteData));
                        initFavorite(favoriteData.favorite, document.getElementById('favoritegrouplist'));
                    } else {
                        mdui.snackbar({message:'删除失败', timeout:800, position:'top'});
                    }
                }
            });
        }, {confirmText:'确定'});
});
//******************************
//edit group
//******************************
$(document).on('confirm.mdui.dialog', '#editgroup',
function() {
    var newname = $('#groupname').val();
    if (oldname == newname) {
        console.log('The oldname is equal to newname.');
    } else if(localStorage.getItem(user + 'favoriteData').indexOf('"' + newname + '"') == -1){
        $.ajax({
            url: '/ajax',
            method: 'POST',
            data: {
                "action": "renamegroup",
                "oldname": oldname,
                "newname": newname
            },
            success: function(data) {
                if(data == 1){
                    mdui.snackbar({
                        message: "重命名成功",
                        timeout: 800,
                        position: "top"
                    });
                    var favoriteData = JSON.parse(localStorage.getItem(user + 'favoriteData'));
                    for(var i = 0; i < favoriteData.favorite.length; i ++ ){
                        if(favoriteData.favorite[i].name == oldname){
                            favoriteData.favorite[i].name = newname;
                            break;
                        }
                    }
                    localStorage.setItem(user + 'favoriteData', JSON.stringify(favoriteData));
                    initFavorite(favoriteData.favorite, document.getElementById('favoritegrouplist'));
                }else{
                mdui.snackbar({
                    message: "重命名失败",
                    timeout: 800,
                    position: "top"
                });
                }
            }
        });
    } else {
        mdui.alert('分组名已存在，请更换分组名称。');
    }
});
//******************************
//create a new group
//******************************
$(document).on('confirm.mdui.dialog', '#newgroup', 
function() {
    var newgroupname = $('#newgroupname').val();
    if(localStorage.getItem(user + 'favoriteData').indexOf(newgroupname) == -1){
        $.ajax({
            url:'/ajax',
            method:'POST',
            data:{
                "action":'creategroup', 
                "newgroupname":$('#newgroupname').val()
            },
            success:function(data){
                if(data == 1){
                    mdui.snackbar({message:'创建成功', timeout:800, position:'top'});
                    var favoriteData = JSON.parse(localStorage.getItem(user + 'favoriteData'));
                    favoriteData.favorite.push({name:newgroupname, stock:[]});
                    localStorage.setItem(user + 'favoriteData', JSON.stringify(favoriteData));
                    initFavorite(favoriteData.favorite, document.getElementById('favoritegrouplist'));
                }
                else {mdui.snackbar({message:'创建失败', timeout:800, position:'top'});}
            }
        });
    } else {
        mdui.alert('分组名已存在，请更换分组名称。');
    }
}
);
$(document).on('click', '#addgroup',
function() {
    newGroup.open();
});
//******************************
//search stock
//******************************
$(document).on('click', '#publicstrategy button', 
function(){
    let searchObj = $(this).data();
    stockchoosePanel.closeAll();
    $('#searchprogress').css('display', 'block');
    $.ajax({
        url:'/ajax',
        method:'POST',
        dataType:'json',
        data:searchObj,
        success:function(data){
            $('#searchprogress').css('display', 'none');
            if(data.length > 0){
                var str = '';
                data.forEach(function(e) {
                    str += '<div class="mdui-col-md-3 mdui-col-sm-6 mdui-col-xs-12"><div class="mdui-card height-150 gradient-45deg-light-blue-cyan gradient-shadow"><div class="chart"></div></div></div>';
                });
                $('#searchresult').html(str);
                let list = document.querySelectorAll('#searchresult .chart');
                list.forEach(function(e, i) {
                    var chart = echarts.init(e);
                    option.title.text = data[i].name;
                    option.title.link = '/detail/?stockcode=' + data[i].code;
                    option.xAxis.data = data[i].date;
                    option.series[0].data = data[i].value;
                    chart.setOption(option);
                });
            }else{
                $('#searchprogress').css('display', 'none');
                mdui.snackbar({message:'无搜索结果', timeout:800, position:'top'});
            }
        }
        });
});
function initFavorite(favorite, element) {
    htmlstr = '';
    for (i in favorite) {
        htmlstr += '<li class="mdui-list-item favoritegroup"><span>' + favorite[i].name + '</span><i class="mdui-list-item-icon mdui-icon material-icons edit edit-edit">edit</i><i class="mdui-list-item-icon mdui-icon material-icons edit edit-del">delete_forever</i></li>';
    }
    htmlstr += '<li id="addgroup" class="mdui-list-item mdui-ripple favoritegroup"><i class="mdui-list-item-icon mdui-icon material-icons">add</i>添加分组</li>';
    element.innerHTML = htmlstr;
}
function initPublicStrategy(data, elementselector) {
    htmlstr = '';
    for (var i = 0; i < data.length; i ++ ){
    htmlstr += '<div class="mdui-col"><div class="mdui-card mdui-hoverable"><div class="mdui-card-primary"><div class="mdui-card-primary-title">' +data[i][1]+ '</div><div class="mdui-card-primary-subtitle">' +data[i][2]+ '</div></div><div class="mdui-card-content">' +data[i][3]+ '</div><div class="mdui-card-actions"><button class="mdui-btn" data-strategyid="'+data[i][0]+'" data-action="search">搜索股票</button></div></div></div>';
    }
    $(elementselector).html(htmlstr);
}
//******************************
//the charts option which in the panel
//******************************
option = {
    title: {
        text: '',
        link: '',
        target: 'black',
        textStyle: {
            color: '#eee',
        }
    },
    tooltip: {
        trigger: 'axis',
        position: ['1%', '10%'],
        backgroundColor: ''
    },
    grid: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        min: function(value){return value.min - (value.max - value.min)/5},
        max: function(value){return value.max + (value.max - value.min)/5},
        splitLine: {show: false}, 
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        boundaryGap: [0, '100%']
    },
    series: [{
        name: '收盘',
        type: 'line',
        smooth: false,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
            normal: {
                color: 'rgb(204, 255, 51)'
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255, 255, 255, 0.7)'
                },
                {
                    offset: 1,
                    color: 'rgba(255, 255, 255, 0.1)'
                }])
            }
        },
        data: [],
    }]
};
