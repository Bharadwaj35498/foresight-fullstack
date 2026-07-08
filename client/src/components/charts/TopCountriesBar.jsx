import ReactECharts from 'echarts-for-react';
import { baseTooltip } from './theme';

export default function TopCountriesBar({ data }) {
  const top = [...data].sort((a, b) => b.count - a.count).slice(0, 10).reverse();
  const option = {
    grid: { left: 110, right: 24, top: 10, bottom: 10 },
    tooltip: { ...baseTooltip, trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: { type: 'value', splitLine: { lineStyle: { color: '#EDECF8' } } },
    yAxis: {
      type: 'category', data: top.map((t) => t.country), axisLine: { show: false },
      axisTick: { show: false }, axisLabel: { color: '#4A4763', fontSize: 12 },
    },
    series: [{
      type: 'bar', data: top.map((t) => t.count), barWidth: 16,
      itemStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#6C5CE7' }, { offset: 1, color: '#17C3B2' }] },
        borderRadius: [0, 8, 8, 0],
      },
    }],
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge />;
}
