import ReactECharts from 'echarts-for-react';
import { baseTooltip } from './theme';

export default function YearlyTrendChart({ data }) {
  const years = data.map((d) => d.year);
  const counts = data.map((d) => d.count);
  const avgInt = data.map((d) => d.avgIntensity);

  const option = {
    tooltip: { ...baseTooltip, trigger: 'axis' },
    legend: { data: ['Reports', 'Avg intensity'], top: 0, textStyle: { color: '#4A4763', fontSize: 12 } },
    grid: { left: 44, right: 44, top: 40, bottom: 30 },
    xAxis: { type: 'category', data: years, axisLine: { lineStyle: { color: '#E7E6F5' } }, axisLabel: { color: '#8A8B9E' } },
    yAxis: [
      { type: 'value', name: 'Reports', splitLine: { lineStyle: { color: '#EDECF8' } }, axisLabel: { color: '#8A8B9E' } },
      { type: 'value', name: 'Avg intensity', splitLine: { show: false }, axisLabel: { color: '#8A8B9E' } },
    ],
    series: [
      { name: 'Reports', type: 'bar', data: counts, barWidth: 16, itemStyle: { color: '#D8D3FA', borderRadius: [6, 6, 0, 0] } },
      {
        name: 'Avg intensity', type: 'line', yAxisIndex: 1, data: avgInt, smooth: true, symbol: 'circle', symbolSize: 6,
        lineStyle: { color: '#EF476F', width: 3 }, itemStyle: { color: '#EF476F' }, areaStyle: { color: 'rgba(239,71,111,.08)' },
      },
    ],
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge />;
}
