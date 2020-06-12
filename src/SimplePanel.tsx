import React, { useRef, useState, useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { stylesFactory, useTheme } from '@grafana/ui';

import echarts from 'echarts';
import 'echarts/theme/dark.js';
import 'echarts/theme/infographic.js';
import 'echarts/theme/macarons.js';
import 'echarts/theme/shine.js';
import 'echarts/theme/roma.js';
import 'echarts/theme/vintage.js';

import './lib/echarts-wordcloud.js';

import { css, cx } from 'emotion';
import { SimpleOptions, funcParams } from 'types';

const getStyles = stylesFactory(() => ({
  wrapper: css`
    position: relative;
  `,
}));

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const grafanaTheme = useTheme(); // get current grafana theme
  const styles = getStyles();
  const echartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts>();

  // if chart option is returned, setOption(). Otherwise meaning chart is drawn inside function
  const resetOption = () => {
    if (chart) {
      chart.clear();
      let getFunction = new Function(funcParams, options.funcBody); //构造函数，Function（参数，返回值）
      const o = getFunction(data, chart, echarts);
      o && chart.setOption(o);
    }
  };

  // when Ref or theme is changed, reset chart instance with new theme.
  // This will trigger a chart updated useEffect()
  useEffect(() => {
    if (echartRef.current) {
      chart?.clear();
      chart?.dispose();
      setChart(echarts.init(echartRef.current, options.echartTheme ? options.echartTheme : grafanaTheme));
    }

    return () => {
      chart?.clear();
      chart?.dispose();
    };
  }, [echartRef.current, options.echartTheme]);

  useEffect(() => {
    chart?.resize();
  }, [width, height]);

  useEffect(() => {
    chart && resetOption();
  }, [chart, options.funcBody, data]);

  return (
    <div
      ref={echartRef}
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    />
  );
};
