import ReactECharts from 'echarts-for-react';
import { PALETTE, baseTooltip } from './theme';

export default function LikelihoodRelevanceBubble({ data }) {
  const sectors = [...new Set(data.map((d) => d.sector))].slice(0, 10);
  const series = sectors.map((sec, i) => ({
    name: sec,
    type: 'scatter',
    data: data.filter((d) => d.sector === sec).map((d) => [d.likelihood, d.relevance, d.intensity, d.title]),
    symbolSize: (v) => Math.max(6, v[2] * 3.2),
    itemStyle: { color: PALETTE[i % PALETTE.length], opacity: 0.65, borderColor: '#fff', borderWidth: 1 },
    emphasis: { itemStyle: { opacity: 0.95, shadowBlur: 10, shadowColor: 'rgba(0,0,0,.2)' } },
  }));

  const option = {
    tooltip: {
      ...baseTooltip,
      formatter: (p) => `<b>${p.seriesName}</b><br>Likelihood: ${p.value[0]} · Relevance: ${p.value[1]} · Intensity: ${p.value[2]}<br>${(p.value[3] || '').slice(0, 60)}`,
    },
    legend: { type: 'scroll', top: 0, textStyle: { color: '#4A4763', fontSize: 11 } },
    grid: { left: 50, right: 30, top: 46, bottom: 40 },
    xAxis: { type: 'value', name: 'Likelihood', min: 0, max: 5, splitLine: { lineStyle: { color: '#EDECF8' } } },
    yAxis: { type: 'value', name: 'Relevance', min: 0, max: 5, splitLine: { lineStyle: { color: '#EDECF8' } } },
    series,
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge />;
}
