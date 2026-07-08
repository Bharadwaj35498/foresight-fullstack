import ReactECharts from 'echarts-for-react';
import { PALETTE, baseTooltip } from './theme';

export default function RegionCountrySectorSankey({ data }) {
  const nodes = data.nodes || [];
  const links = data.links || [];

  const option = {
    tooltip: { ...baseTooltip, trigger: 'item' },
    series: [{
      type: 'sankey', data: nodes, links,
      emphasis: { focus: 'adjacency' }, nodeGap: 10, nodeWidth: 14,
      lineStyle: { color: 'gradient', opacity: 0.35, curveness: 0.5 },
      label: { color: '#3A3A55', fontSize: 11, formatter: (p) => p.name.replace(/^R: |^C: |^S: /, '') },
      itemStyle: { borderWidth: 0 },
      color: PALETTE,
    }],
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge />;
}
