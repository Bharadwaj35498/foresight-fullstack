import ReactECharts from 'echarts-for-react';
import { baseTooltip } from './theme';

export default function RegionSectorHeatmap({ data }) {
  const regionCounts = new Map();
  const sectorCounts = new Map();
  data.forEach((d) => {
    regionCounts.set(d.region, (regionCounts.get(d.region) || 0) + d.count);
    sectorCounts.set(d.sector, (sectorCounts.get(d.sector) || 0) + d.count);
  });
  const regions = [...regionCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map((e) => e[0]);
  const sectors = [...sectorCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map((e) => e[0]);

  const grid = [];
  let max = 0;
  sectors.forEach((sec, x) => {
    regions.forEach((reg, y) => {
      const found = data.find((d) => d.region === reg && d.sector === sec);
      const c = found ? found.count : 0;
      if (c > max) max = c;
      grid.push([x, y, c]);
    });
  });

  const option = {
    tooltip: { ...baseTooltip, position: 'top', formatter: (p) => `${sectors[p.value[0]]} × ${regions[p.value[1]]}: <b>${p.value[2]}</b>` },
    grid: { left: 140, right: 20, top: 10, bottom: 70 },
    xAxis: { type: 'category', data: sectors, axisLabel: { rotate: 40, fontSize: 10.5, color: '#4A4763' }, splitArea: { show: true } },
    yAxis: { type: 'category', data: regions, axisLabel: { fontSize: 10.5, color: '#4A4763' }, splitArea: { show: true } },
    visualMap: { min: 0, max: max || 1, calculable: false, show: false, inRange: { color: ['#F4F1FC', '#B7ACF5', '#6C5CE7', '#3E2FAE'] } },
    series: [{
      type: 'heatmap', data: grid, itemStyle: { borderRadius: 3, borderColor: '#fff', borderWidth: 2 },
      emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(108,92,231,.4)' } },
    }],
  };
  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge />;
}
