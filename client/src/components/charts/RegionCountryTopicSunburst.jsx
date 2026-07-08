import ReactECharts from 'echarts-for-react';
import { PALETTE, baseTooltip } from './theme';

export default function RegionCountryTopicSunburst({ data }) {
  const chartData = data.map((row, i) => ({
    name: row.name,
    itemStyle: { color: PALETTE[i % PALETTE.length] },
    children: row.children,
  }));

  const option = {
    tooltip: { ...baseTooltip, formatter: (p) => `${p.name}: <b>${p.value || ''}</b>` },
    series: [{
      type: 'sunburst', data: chartData, radius: [30, '92%'],
      label: { rotate: 'radial', fontSize: 10.5, color: '#3A3A55', minAngle: 8 },
      itemStyle: { borderColor: '#fff', borderWidth: 1.5 },
      levels: [
        {},
        { r0: '12%', r: '38%', itemStyle: { borderWidth: 2 } },
        { r0: '38%', r: '68%' },
        { r0: '68%', r: '92%', label: { show: false } },
      ],
    }],
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge />;
}
