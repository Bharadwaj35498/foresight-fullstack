import ReactECharts from 'echarts-for-react';
import { baseTooltip } from './theme';

export default function PestleRadar({ data }) {
  const indicator = data.map((d) => ({ name: d.pestle, max: 10 }));
  const values = data.map((d) => d.avgIntensity || 0);

  const option = {
    tooltip: { ...baseTooltip },
    radar: {
      indicator, radius: '68%', splitNumber: 4,
      axisName: { color: '#4A4763', fontSize: 10.5 },
      splitLine: { lineStyle: { color: '#E7E6F5' } },
      splitArea: { areaStyle: { color: ['#fff', '#FAFAFF'] } },
      axisLine: { lineStyle: { color: '#E7E6F5' } },
    },
    series: [{
      type: 'radar',
      data: [{
        value: values, name: 'Avg intensity',
        areaStyle: { color: 'rgba(108,92,231,.25)' },
        lineStyle: { color: '#6C5CE7', width: 2 },
        itemStyle: { color: '#6C5CE7' },
      }],
    }],
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge />;
}
