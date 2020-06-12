export const funcParams = 'data, echartsInstance, echarts';

// data: data queried from Grafana Datasource
// echartsInstance: current instance of chart, mainly used for drawing custom chart
// echarts: imported echarts lib

const funcBody = `
// hint: 
//   - use console.log() to watch data queried from Grafana Datasource
//   - use backgroundColor: 'rgba(255,255,255,1)' to override theme backgroup color
//   - use echartsInstance.setOption(option) to draw charts without return value.

const series = data.series.map((s) => {
  const sData = s.fields.find((f) => f.type === 'number').values.buffer;
  const sTime = s.fields.find((f) => f.type === 'time').values.buffer;

  return {
    name: s.name,
    type: 'line',
    showSymbol: false,
    areaStyle: {
      opacity: 0.1,
    },
    lineStyle: {
      width: 1,
    },
    data: sData.map((d, i) => [sTime[i], d.toFixed(2)]),
  };
});

const axisOption = {
  axisTick: {
    show: false,
  },
  axisLine: {
    show: false,
  },
  axisLabel: {
    color: 'rgba(128, 128, 128, .9)',
  },
  splitLine: {
    lineStyle: {
      color: 'rgba(128, 128, 128, .2)',
    },
  },
};

return {
  // backgroundColor: 'rgba(255,255,255,1)',
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    left: '0',
    bottom: '0',
    data: data.series.map((s) => s.name),
    textStyle: {
      color: 'rgba(128, 128, 128, .9)',
    },
  },
  xAxis: Object.assign(
    {
      type: 'time',
    },
    axisOption
  ),
  yAxis: Object.assign(
    {
      type: 'value',
      min: 'dataMin',
    },
    axisOption
  ),
  grid: {
    left: 0,
    right: 16,
    top: 6,
    bottom: 24,
    containLabel: true,
  },
  series,
};`;

export interface SimpleOptions {
  echartTheme: string | undefined;
  funcBody: string;
}

export const defaults: SimpleOptions = {
  echartTheme: undefined,
  funcBody: funcBody,
};
