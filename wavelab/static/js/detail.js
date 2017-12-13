function isReady(stockCode,user = 'zhkf'){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('get',hostName + 'isready?stockcode=' + stockCode + '&yearcount=' + yearCount + '&user=' + user,true);
  xmlHttp.send();
  xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
      stockData = JSON.parse(xmlHttp.responseText);
      stockData.name != '' && stock.catchStock(stockData.code,stockData.name);
      document.title = stockData.name + stockData.code + ' - WAVE LAB';
      document.getElementById('title').innerHTML = stockData.name + stockData.code;
      document.getElementById('title').href = 'http://stockpage.10jqka.com.cn/' + stockData.code.substr(2) + '/';
      document.getElementById('favoriteCheckbox').checked = (favoriteStock?(favoriteStock[stockData.name] !== undefined?true:false):false);
      stockData.isready ? display(stockData) : (document.writeln(stockData.message));
    }
  };
}
function display(stockData){
  var _this = this;
  var data0 = _this.splitData(stockData.data);
  var dataDIF = stock.calculateDIF(12,26,data0.values);
  var dataDEA = stock.calculateDEA(9,dataDIF);
  var dataMACD = stock.calculateMACD(dataDIF,dataDEA);

  var option = {
    title: [
      {
        text: stockData.name + stockData.code,
        show: false,
        left: '4%',
        link: 'http://stockpage.10jqka.com.cn/' + stockData.code.substr(2) + '/',
        target: 'blank',
      },
      {
        text: '分时图',
        left: '2%',
        link: 'https://gupiao.baidu.com/stock/'+stockData.code+'.html',
        target: 'blank',
        textStyle: {fontSize:14}
      },
      {
        text: '一年',
        left: '5%',
        link: hostName + 'detail.html?stockcode=' + stockCode + '&yearcount=1',
        target: 'self',
        textStyle: {fontSize:14}
      },
      {
        text: '两年',
        left: '7%',
        link: hostName + 'detail.html?stockcode=' + stockCode + '&yearcount=2',
        target: 'self',
        textStyle: {fontSize:14}
      },
      {
        text: '三年',
        left: '9%',
        link: hostName + 'detail.html?stockcode=' + stockCode + '&yearcount=3',
        target: 'self',
        textStyle: {fontSize:14}
      },
      {
        text: '五年',
        left: '11%',
        link: hostName + 'detail.html?stockcode=' + stockCode + '&yearcount=5',
        target: 'self',
        textStyle: {fontSize:14}
      },
      {
        text: '十年',
        left: '13%',
        link: hostName + 'detail.html?stockcode=' + stockCode + '&yearcount=10',
        target: 'self',
        textStyle: {fontSize:14}
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: [{
      right: '4%',
      data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30', 'MA60'],
      selected: {
        '日K': true,
        'MA5': false,
        'MA10': false,
        'MA20': false,
        'MA30': true,
        'MA60': false
      }
    },
    {
      left: '15%',
      data: ['分时图','一年','三年']
    }
  ],
  grid: [{
    top: '5%',
    left: '2%',
    right: '1%',
    height: '50%'
    // bottom: '15%'
  },
  {
    left: '2%',
    right: '1%',
    top: '55%',
    height: '40%'
  }
],
xAxis: [{
  type: 'category',
  gridIndex: 0,
  data: data0.categoryData.slice(-250 * window.yearCount),
  scale: true,
  boundaryGap : false,
  axisLine: {onZero: false},
  splitLine: {show: false},
  splitNumber: 20,
  // min: 'dataMin',
  max: 'dataMax'
},
{
  type: 'category',
  gridIndex: 1,
  data: data0.categoryData.slice(-250 * window.yearCount),
  scale: true,
  boundaryGap : false,
  axisLine: {onZero: true,show: true},
  axisLabel: {show: false},
  splitLine: {show: false},
  splitNumber: 20,
  // min: 'dataMin',
  max: 'dataMax'
}
],
yAxis: [{
  gridIndex: 0,
  scale: true,
  splitLine: {show: false},
  splitArea: {show: true}
},
{
  gridIndex: 1,
  // splitNumber: 3,
  // scale: false,
  axisLine: {onZero: false},
  axisTick: {show: false},
  splitLine: {show: false},
  splitArea: {show: true},
  axisLabel: {show: true}
}
],
dataZoom: [
  {
    type: 'inside',
    xAxisIndex: [0, 1],
    start: 0,
    end: 100
  },
  {
    show: true,
    type: 'slider',
    xAxisIndex: [0, 1],
    // y: '90%',
    start: 0,
    end: 100
  },
  {
    show: false,
    xAxisIndex: [0, 1],
    type: 'slider',
    start: 0,
    end: 100
  }
],
series: [
  {
    name: '日K',
    type: 'candlestick',
    xAxisIndex: 0,
    yAxisIndex: 0,
    data: data0.values.slice(-250 * window.yearCount),
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
      data: [
        {
          name: '买',
          coord: ['2017/06/21',4.04]
        },
        {
          name: '买',
          coord: ['2017/07/11',4.02]
        },
        {
          name: '卖',
          coord: ['2017/09/06',3.99]
        }
      ]
      // itemStyle: {
      //   normal: {
      //     color: function(params) {
      //       // console.log(params);
      //       var colorList;
      //       if (params.data >= 0) {//attention
      //         colorList = '#ef232a';
      //       } else {
      //         colorList = '#14b143';
      //       }
      //       return colorList;
      //     }
      //   }
      // }
    }
  },
  {
    name: 'MA5',
    type: 'line',
    data: stock.calculateMA(5,data0.values).slice(-250 * window.yearCount),
    smooth: true,
    lineStyle: {
      normal: {opacity: 0.5}
    }
  },
  {
    name: 'MA10',
    type: 'line',
    data: stock.calculateMA(10,data0.values).slice(-250 * window.yearCount),
    smooth: true,
    lineStyle: {
      normal: {opacity: 0.5}
    }
  },
  {
    name: 'MA20',
    type: 'line',
    data: stock.calculateMA(20,data0.values).slice(-250 * window.yearCount),
    smooth: true,
    lineStyle: {
      normal: {opacity: 0.5}
    }
  },
  {
    name: 'MA30',
    type: 'line',
    xAxisIndex: 0,
    yAxisIndex: 0,
    data: stock.calculateMA(30,data0.values).slice(-250 * window.yearCount),
    smooth: true,
    lineStyle: {
      normal: {opacity: 0.5}
    }
  },
  {
    name: 'MA60',
    type: 'line',
    xAxisIndex: 0,
    yAxisIndex: 0,
    data: stock.calculateMA(60,data0.values).slice(-250 * window.yearCount),
    smooth: true,
    lineStyle: {
      normal: {opacity: 0.5}
    }
  },
  {
    name: 'MACD',
    type: 'bar',
    xAxisIndex: 1,
    yAxisIndex: 1,
    data: dataMACD.slice(-250 * window.yearCount),
    itemStyle: {
      normal: {
        color: function(params) {
          var colorList;
          if (params.data >= 0) {//attention
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
    data: dataDIF.slice(-250 * window.yearCount)
  },
  {
    name: 'DEA',
    type: 'line',
    xAxisIndex: 1,
    yAxisIndex: 1,
    data: dataDEA.slice(-250 * window.yearCount)
  }
]
};
console.log(stockData.tradeData);
option.series[0].markPoint.data = stockData.tradeData;//[{name: '买', coord: ['2017/09/21',4.04]}];
window.myChart.hideLoading();
window.myChart.setOption(option);
}
function splitArray(rawArray){
  var raw2Array = [];
  var arrayTemp = [];
  for(var i=0; i<rawArray.length; i++){
    raw2Array.push(rawArray[i].split(','));
  }
  for(var i=0; i<rawArray.length; i++){
    for(var j=1; j<5; j++){
      raw2Array[i][j] = parseFloat(raw2Array[i][j]);
    }
  }
  return raw2Array;
}
function splitData(rawData) {
  var categoryData = [];
  var values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i])
  }
  return {
    categoryData: categoryData,
    values: values
  };
}
function addFavoriteStock(favoriteStock,stockData){
    favoriteStock[stockData.name] = stockData.code;
}
function delFavoriteStock(favoriteStock,stockData){
    favoriteStock[stockData.name] = undefined;
}
function updateFavoriteStockUl(ulObj,favoriteStock){
    let htmlstr = '';
    for (let item in favoriteStock) {
        if (favoriteStock[item]) {
        htmlstr += '<a href="' + hostName + 'detail.html?stockcode=' + favoriteStock[item].substr(2) + '&yearcount=1" target="_self"><li class="mdui-list-item mdui-ripple">' + item + '</li></a>';
        }
    }
    ulObj.innerHTML = htmlstr;
}
function displayTradeData(ulObj,tradeData){
    let htmlstr = '';
    for (let item in tradeData){
        htmlstr += '<a href="' + hostName + 'detail.html?stockcode=' + item.substr(2) + '&yearcount=1" target="_self"><li class="mdui-list-item mdui-ripple">' + tradeData[item] + '</li></a>';
    }
    ulObj.innerHTML = htmlstr;
}
function addTradeData(){
    var xmlHttp = new XMLHttpRequest();
    var queryStr = $('form').serialize();
    // console.log(queryStr);
    xmlHttp.open('get',hostName + 'addtradedata?' + queryStr);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            mdui.snackbar({message: xmlHttp.responseText,position: 'top', timeout: 1000});
        }
    };
}
