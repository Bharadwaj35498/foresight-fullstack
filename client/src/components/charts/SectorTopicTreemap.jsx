import ReactECharts from 'echarts-for-react';
import { PALETTE, baseTooltip } from './theme';

export default function SectorTopicTreemap({ data }) {
  const treeData = data.map((row, i) => ({
    name: row.sector,
    itemStyle: { color: PALETTE[i % PALETTE.length] },
    children: (row.topics || []).map((t) => ({ name: t.name, value: t.value })),
  })).filter((n) => n.children.length);

  const option = {
    tooltip: { ...baseTooltip, formatter: (p) => `${p.name}: <b>${p.value || ''}</b>` },
    series: [{
      type: 'treemap', data: treeData, roam: false, nodeClick: 'zoomToNode',
      breadcrumb: { show: true, itemStyle: { color: '#EDEAFE', textStyle: { color: '#6C5CE7' } } },
      upperLabel: { show: true, height: 26, color: '#fff', fontWeight: 700 },
      label: { color: '#fff', fontSize: 11.5 },
      levels: [
        { itemStyle: { borderWidth: 0, gapWidth: 3 } },
        { itemStyle: { borderColorSaturation: 0.4, gapWidth: 2 } },
      ],
    }],
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge />;
}
