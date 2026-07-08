import ChartCard from '../../components/charts/ChartCard';
import SectorTopicTreemap from '../../components/charts/SectorTopicTreemap';
import SectorDonut from '../../components/charts/SectorDonut';
import PestleRadar from '../../components/charts/PestleRadar';
import { fetchTreemap, fetchBySector, fetchRadar } from '../../api/insights';
import { useAggregation } from '../../hooks/useAggregation';
import { useFilters } from '../../context/FilterContext';

export default function Sectors() {
  const { params } = useFilters();
  const treemap = useAggregation(fetchTreemap, params);
  const bySector = useAggregation(fetchBySector, params);
  const radar = useAggregation(fetchRadar, params);

  return (
    <section className="page-section active">
      <div className="section-title"><h2>🌳 Sectors &amp; Topics</h2><p>How topics nest inside each sector, and which dominate.</p></div>

      <div className="grid-2">
        <ChartCard title="Treemap — Sector → Topic" subtitle="Size = number of signals" span2 tall loading={treemap.loading} error={treemap.error}>
          <SectorTopicTreemap data={treemap.data} />
        </ChartCard>
      </div>

      <div className="grid-2">
        <ChartCard title="🍩 Sector Share" loading={bySector.loading} error={bySector.error}>
          <SectorDonut data={bySector.data} />
        </ChartCard>
        <ChartCard title="🕸️ PESTLE Radar" subtitle="Avg intensity per lens" loading={radar.loading} error={radar.error}>
          <PestleRadar data={radar.data} />
        </ChartCard>
      </div>
    </section>
  );
}
