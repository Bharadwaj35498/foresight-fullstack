import ReactECharts from 'echarts-for-react';
import { PALETTE, baseTooltip } from './theme';

export default function SectorDonut({ data }) {
  const chartData = [...data].sort((a, b) => b.count - a.count).map((d) => ({ name: d.sector, value: d.count }));
  const option = {
    tooltip: { ...baseTooltip, trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { show: false },
    series: [{
      type: 'pie', radius: ['46%', '76%'], center: ['50%', '50%'],
      itemStyle: { borderColor: '#fff', borderWidth: 2 },
      label: { formatter: '{b}\n{d}%', fontSize: 11, color: '#4A4763' },
      labelLine: { length: 8, length2: 6 },
      data: chartData, color: PALETTE,
    }],
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge />;
}
