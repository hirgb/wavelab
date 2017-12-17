function loadData(data, chart) {
    chart.setOption({
                    xAxis : {
                        data : data.date
                    }, 
                    series : [{
                        name : '指数',
                        data : data.value
                    }]
                });
}
var chartSH = echarts.init(document.getElementById('shindex'));
optionSH = {
title: {
    text: '上证指数-SH000001',
      link: '/detail/?stockcode=sh000001',
      target: 'black',
      textStyle:{
        color:'#eee',
      }
       },
    tooltip: {
        trigger: 'axis',
        position: ['1%', '15%'],
        backgroundColor: ''
    },
grid: {top:0,left:0,bottom:0,right:0},
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLine:{show:false},
        axisTick:{show:false},
        axisLabel:{show:false}
    },
    yAxis: {
        type: 'value',
        min : 'dataMin',
        max : 'dataMax', 
        axisLine:{show:false},
        axisTick:{show:false},
        axisLabel:{show:false},
        boundaryGap: [0, '100%']
    },
    series: [
        {
            name:'指数',
            type:'line',
            smooth:true,
            symbol:'none',
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
                        color: 'rgba(255, 255, 255, 0.2)'
                    }, {
                        offset: 1,
                        color: 'rgba(255, 255, 255, 0.5)'
                    }])
                }
            },
            data: [],
        }
    ]
};
chartSH.setOption(optionSH);

var chartSZ = echarts.init(document.getElementById('szindex'));
        
optionSZ = {
title: {
text: '深证成指-SZ399001',
      link: '/detail/?stockcode=sz399001',
      target: 'black',
      textStyle:{
        color:'#eee',
      }
       },
    tooltip: {
        trigger: 'axis',
        position: ['1%', '15%'],
        backgroundColor: ''
    },
grid: {top:0,left:0,bottom:0,right:0},
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:[],
        axisLine:{show:false},
        axisTick:{show:false},
        axisLabel:{show:false}
    },
    yAxis: {
        type: 'value',
        min : 'dataMin',
        max : 'dataMax', 
        axisLine:{show:false},
        axisTick:{show:false},
        axisLabel:{show:false},
        boundaryGap: [0, '100%']
    },
    series: [
        {
            name:'指数',
            type:'line',
            smooth:true,
            symbol:'none',
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
                        color: 'rgba(255, 255, 255, 0.2)'
                    }, {
                        offset: 1,
                        color: 'rgba(255, 255, 255, 0.5)'
                    }])
                }
            },
            data: [],
        }
    ]
};
chartSZ.setOption(optionSZ);
var chartZX = echarts.init(document.getElementById('zxindex'));
optionZX = {
title: {
text: '中小板指-SZ399005',
      link: '/detail/?stockcode=sz399005',
      target:'black',
      textStyle:{
        color:'#eee',
      }
       },
    tooltip: {
        trigger: 'axis',
        position: ['1%', '15%'],
        backgroundColor: ''
    },
grid: {top:0,left:0,bottom:0,right:0},
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLine:{show:false},
        axisTick:{show:false},
        axisLabel:{show:false}
    },
    yAxis: {
        type: 'value',
        min : 'dataMin',
        max : 'dataMax', 
        axisLine:{show:false},
        axisTick:{show:false},
        axisLabel:{show:false},
        boundaryGap: [0, '100%']
    },
    series: [
        {
            name:'指数',
            type:'line',
            smooth:true,
            symbol:'none',
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
                        color: 'rgba(255, 255, 255, 0.2)'
                    }, {
                        offset: 1,
                        color: 'rgba(255, 255, 255, 0.5)'
                    }])
                }
            },
            data: [],
        }
    ]
};
chartZX.setOption(optionZX);
var chartCY = echarts.init(document.getElementById('cyindex'));
optionCY = {
title: {
text: '创业板指-SZ399006',
      link: '/detail/?stockcode=sz399006',
      target:'black',
      textStyle:{
        color:'#eee',
      }
       },
    tooltip: {
        trigger: 'axis',
        position: ['1%', '15%'],
        backgroundColor: ''
    },
grid: {top:0,left:0,bottom:0,right:0},
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLine:{show:false},
        axisTick:{show:false},
        axisLabel:{show:false}
    },
    yAxis: {
        type: 'value',
        min : 'dataMin',
        max : 'dataMax', 
        axisLine:{show:false},
        axisTick:{show:false},
        axisLabel:{show:false},
        boundaryGap: [0, '100%']
    },
    series: [
        {
            name:'指数',
            type:'line',
            smooth:true,
            symbol:'none',
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
                        color: 'rgba(255, 255, 255, 0.2)'
                    }, {
                        offset: 1,
                        color: 'rgba(255, 255, 255, 0.5)'
                    }])
                }
            },
            data: [],
        }
    ]
};
chartCY.setOption(optionCY);

        var chartIndustry = echarts.init(document.getElementById('industry'));
        var xAxisData = [];
        var data1 = [];
        for (var i = 0; i < 25; i++) {
            xAxisData.push('类目' + i);
            data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
        }
        optionIndustry = {
            title: {
                text: '行业',
                textStyle:{color:'#666'}
            },
            grid: {
                top:'13%',bottom:'15%',left:'3%',right:'1%'
                  },
            xAxis: {
                axisLabel:{rotate:45},
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
            },
            series: [{
                name: 'bar',
                type: 'bar',
                data: data1,
                //itemStyle: {normal:{color:'rgba(255,0,0,0.7)',shadowColor:'rgba(0,0,0,0.5)',shadowOffsetX:2,shadowOffsetY:2,shadowBlur:5},
                itemStyle: {normal:{shadowColor:'rgba(0,0,0,0.5)',shadowOffsetX:2,shadowOffsetY:2,shadowBlur:5,
                color: function(params){
                    var colorList;
                    if (params.data >= 0){
                        colorList = '#ef232a';
                    } else {
                        colorList = '#14b143';
                    }
                    return colorList;
                }},
                emphasis:{shadowColor:'rgba(0,0,0,0.7)',shadowOffsetX:2,shadowOffsetY:2,shadowBlur:6}},
                animationDelay: function (idx) {
                    return idx * 30;
                }
            }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        };
        chartIndustry.setOption(optionIndustry);

      var chartRiseOrFall = echarts.init(document.getElementById('riseorfall'));
        optionRiseOrFall = {
            title: {
                        text: '涨跌分布',
                        textStyle:{color:'#666'}
                   }, 
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    animationDelay: function(idx){return idx * 100},
                    data:[
                        {value:235, name:'视频广告'},
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ],
                    roseType: 'angle',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(10, 10, 10, 0.8)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(10, 10, 10, 0.8)'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 40,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        chartRiseOrFall.setOption(optionRiseOrFall);
      var chartHot = echarts.init(document.getElementById('hot'));
        optionHot = {
            title: {
                text: '热点投资',
                textStyle:{color:'#666'}
            },
            tooltip: {
                trigger: 'axis'
            },
            radar: [
                {
                    indicator: (function (){
                        var res = [];
                        for (var i = 1; i <= 6; i++) {
                            res.push({text:i+'月',max:100});
                        }
                        return res;
                    })(),
                    center: ['50%','50%'],
                    radius: 110
                }
            ],
            series: [
                {
                    type: 'radar',
                    radarIndex: 0,
                    itemStyle: {normal: {areaStyle: {type: 'default',}}},
                    lineStyle: {normal: {color: 'rgba(102,153,255,0.8)'}},
                    areaStyle: {normal:{color: 'rgba(153,187,255,0.8)',shadowColor:'rgba(0,0,0,1)',shadowOffsetX:10,shadowOffsetY:10,shadowBlur:40}},
                    animationDelay: function(idx){return idx * 170},
                    data: [
                        {
                            name:'蒸发量',
                            value:[23.2, 25.6, 76.7, 35.6, 62.2, 32.6]
                        }
                    ]
                }
            ]
        };
        chartHot.setOption(optionHot);
