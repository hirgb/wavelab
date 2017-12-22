var user = Z.cookie.get('loginname') ? Z.cookie.get('loginname') : '';
function display(pagedata) {
    var option = {
        title: [{
            text: '分时图',
            left: '2%',
            top: 5,
            link: 'https://gupiao.baidu.com/stock/' + pagedata.stockdata.code + '.html',
            target: 'blank',
            textStyle: {
                fontSize: 14
            }
        },
        {
            text: '一年',
            left: '5%',
            top: 5,
            link: '/detail/?stockcode=' + pagedata.stockdata.code + '&yearcount=1',
            target: 'self',
            textStyle: {
                fontSize: 14
            }
        },
        {
            text: '两年',
            left: '7%',
            top: 5,
            link: '/detail/?stockcode=' + pagedata.stockdata.code + '&yearcount=2',
            target: 'self',
            textStyle: {
                fontSize: 14
            }
        },
        {
            text: '三年',
            left: '9%',
            top: 5,
            link: '/detail/?stockcode=' + pagedata.stockdata.code + '&yearcount=3',
            target: 'self',
            textStyle: {
                fontSize: 14
            }
        },
        {
            text: '五年',
            left: '11%',
            top: 5,
            link: '/detail/?stockcode=' + pagedata.stockdata.code + '&yearcount=5',
            target: 'self',
            textStyle: {
                fontSize: 14
            }
        },
        {
            text: '十年',
            left: '13%',
            top: 5,
            link: '/detail/?stockcode=' + pagedata.stockdata.code + '&yearcount=10',
            target: 'self',
            textStyle: {
                fontSize: 14
            }
        }],
        tooltip: {
            trigger: 'axis',
            position: ['3%', '4%'],
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: '',
            textStyle: {
                color: '#000'
            },
            formatter: function(params) {
                //console.log(params);
                if (params[0].seriesType == 'candlestick') {
                    str = params[0].axisValue + ', 开盘:' + params[0].data[1] + ', 收盘:' + params[0].data[2] + ', 最高:' + params[0].data[4] + ', 最低:' + params[0].data[3];
                    for (i = 1; i < params.length; i++) {
                        str += ', ' + params[i].marker + params[i].seriesName + ':' + params[i].value;
                    }
                } else {
                    str = params[3].axisValue + ', 开盘:' + params[3].data[1] + ', 收盘:' + params[3].data[2] + ', 最高:' + params[3].data[4] + ', 最低:' + params[3].data[3];
                    for (i = 4; i < params.length; i++) {
                        str += ', ' + params[i].marker + params[i].seriesName + ':' + params[i].value;
                    }
                    for (i = 0; i < 3; i++) {
                        str += ', ' + params[i].marker + params[i].seriesName + ':' + params[i].value;
                    }
                }
                return str;
            }
        },
        axisPointer: {
            link: {
                xAxisIndex: 'all'
            },
            label: {
                show: true,
                backgroundColor: '#777'
            }
        },
        legend: [{
            right: 5,
            top: 5,
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30', 'MA60'],
            selected: {
                '日K': true,
                'MA5': false,
                'MA10': false,
                'MA20': false,
                'MA30': true,
                'MA60': false
            }
        }],
        grid: [{
            top: '5%',
            left: '3%',
            right: 5,
            height: '50%'
        },
        {
            left: '3%',
            right: 5,
            top: '55%',
            height: '40%'
        }],
        xAxis: [{
            type: 'category',
            gridIndex: 0,
            data: pagedata.stockdata.date.slice( - (pagedata.dataamount)),
            scale: true,
            boundaryGap: false,
            axisLine: {
                onZero: false
            },
            splitLine: {
                show: false
            },
            splitNumber: 20,
            max: 'dataMax',
            axisPointer: {
                label: {
                    show: false
                },
                snap: true
            }
        },
        {
            type: 'category',
            gridIndex: 1,
            data: pagedata.stockdata.date.slice( - (pagedata.dataamount)),
            scale: true,
            boundaryGap: false,
            axisLine: {
                onZero: true,
                show: true
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            },
            splitNumber: 20,
            axisPointer: {
                snap: true
            },
            max: 'dataMax'
        }],
        yAxis: [{
            gridIndex: 0,
            scale: true,
            splitLine: {
                show: false
            },
            splitArea: {
                show: true
            }
        },
        {
            gridIndex: 1,
            axisLine: {
                onZero: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            splitArea: {
                show: true
            },
            axisLabel: {
                show: true
            }
        }],
        dataZoom: [{
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 0,
            end: 100
        },
        {
            show: true,
            type: 'slider',
            xAxisIndex: [0, 1],
            start: 0,
            end: 100
        },
        {
            show: false,
            xAxisIndex: [0, 1],
            type: 'slider',
            start: 0,
            end: 100
        }],
        series: [{
            name: '日K',
            type: 'candlestick',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: pagedata.stockdata.value.slice( - (pagedata.dataamount)),
            itemStyle: {
                normal: {
                    color: '#ec0000',
                    color0: '#00da3c',
                    borderColor: '#8A0000',
                    borderColor0: '#008F28'
                }
            },
            markPoint: {
                label: {
                    normal: {
                        formatter: '{b}',
                    }
                },
                data: pagedata.stockdata.trade
            }
        },
        {
            name: 'MA5',
            type: 'line',
            data: pagedata.stockdata.ma5.slice( - (pagedata.dataamount)),
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: pagedata.stockdata.ma10.slice( - (pagedata.dataamount)),
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        },
        {
            name: 'MA20',
            type: 'line',
            data: pagedata.stockdata.ma20.slice( - (pagedata.dataamount)),
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        },
        {
            name: 'MA30',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: pagedata.stockdata.ma30.slice( - (pagedata.dataamount)),
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        },
        {
            name: 'MA60',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: pagedata.stockdata.ma60.slice( - (pagedata.dataamount)),
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        },
        {
            name: 'MACD',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: pagedata.stockdata.bar.slice( - (pagedata.dataamount)),
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList;
                        if (params.data >= 0) {
                            colorList = '#ef232a';
                        } else {
                            colorList = '#14b143';
                        }
                        return colorList;
                    }
                }
            }
        },
        {
            name: 'DIF',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: pagedata.stockdata.dif.slice( - (pagedata.dataamount))
        },
        {
            name: 'DEA',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: pagedata.stockdata.dea.slice( - (pagedata.dataamount))
        }]
    };
    pagedata.chart.setOption(option);
}
function addFavoriteStock(favoriteStock, stockData) {
    favoriteStock[stockData.name] = stockData.code;
}
function delFavoriteStock(favoriteStock, stockData) {
    favoriteStock[stockData.name] = undefined;
}
function addTradeData() {
    var xmlHttp = new XMLHttpRequest();
    var queryStr = $('form').serialize();
    // console.log(queryStr);
    xmlHttp.open('get', hostName + 'addtradedata?' + queryStr);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            mdui.snackbar({
                message: xmlHttp.responseText,
                position: 'top',
                timeout: 1000
            });
        }
    };
}
function initPage(option) {
    var stockData = option.stockdata;
    localStorage.setItem(stockData.code, JSON.stringify(stockData));
    $('title').text(stockData.name + stockData.code + ' - WAVE LAB');
    $('#title').text(stockData.name + stockData.code);
    $('#title').prop('href', 'http://stockpage.10jqka.com.cn/' + stockData.code.substr(2) + '/');
    if (user != '') {document.getElementById('favoriteCheckbox').checked = !(localStorage.getItem(user + 'favoriteData').indexOf(stockData.code) == -1);}
    updateRecentStock(stockData.code, stockData.name);
    recentStockDisplay();
    if ( !! Z.cookie.get('loginname')) {
        $.ajax({
            url: '/ajax',
            method: 'POST',
            data: {
                action: 'getsingletrade',
                stockcode: stockData.code
            },
            dataType: 'json',
            success: function(data) {
                stockData['trade'] = data;
                var myChart = echarts.init(document.getElementById('main'));
                myChart.showLoading();
                display({
                    stockdata: stockData,
                    chart: myChart,
                    dataamount: option.dataamount
                });
                myChart.hideLoading();
            }
        });
    } else {
        var myChart = echarts.init(document.getElementById('main'));
        myChart.showLoading();
        display({
            stockdata: stockData,
            chart: myChart,
            dataamount: option.dataamount
        });
        myChart.hideLoading();
    }
}
function getStockData(callback) {
    $.ajax({
        url: '/ajax',
        method: 'POST',
        dataType: 'json',
        data: {
            action: 'getstockdata',
            stockcode: stockCode,
            yearcount: yearCount
        },
        success: function(data) {
            if (!!data.code){
                callback({
                    stockdata: data,
                    dataamount: (yearCount * 250)
                });
            } else {
                $('#left-drawer').remove();
                $('body').removeClass('mdui-drawer-body-left');
                $('#main').html('<div class="mdui-typo-display-2-opacity" style="text-align:center">无相关数据!</div>');
            }
        }
    });
}
function updateRecentStock(stockcode, stockname) {
    if (Z.check.localStorageSupport() && localStorage.getItem(user + 'recentStock')) {
        var recentObj = JSON.parse(localStorage.getItem(user + 'recentStock'));
        var len = recentObj.length;
        var index = -1;
        for (e in recentObj) {
            if (recentObj[e][0] == stockcode) {
                index = e;
                recentObj.splice(e, 1);
                recentObj.unshift([stockcode, stockname]);
                break;
            }
        }
        if (index == -1) {
            if (len < 20) {
                recentObj.unshift([stockcode, stockname]);
            } else {
                recentObj.pop();
                recentObj.unshift([stockcode, stockname]);
            }
        }
        localStorage.setItem(user + 'recentStock', JSON.stringify(recentObj));
    } else {
        Z.check.localStorageSupport() && localStorage.setItem(user + 'recentStock', JSON.stringify([[stockcode, stockname]]));
    }
}
function recentStockDisplay() {
    recentObj = JSON.parse(localStorage.getItem(user + 'recentStock'));
    htmlStr = '';
    for (i in recentObj) {
        htmlStr += '<a href="/detail/?stockcode=' + recentObj[i][0] + '"><li class="mdui-list-item mdui-ripple">' + recentObj[i][1] + '</li></a>';
    }
    $('#recentStock').html(htmlStr);
}
