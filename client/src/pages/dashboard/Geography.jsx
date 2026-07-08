import ChartCard from '../../components/charts/ChartCard';
import ChoroplethMap from '../../components/charts/ChoroplethMap';
import TopCountriesBar from '../../components/charts/TopCountriesBar';
import RegionSectorHeatmap from '../../components/charts/RegionSectorHeatmap';
import { fetchByCountry, fetchHeatmap } from '../../api/insights';
import { useAggregation } from '../../hooks/useAggregation';
import { useFilters } from '../../context/FilterContext';

export default function Geography() {
  const { params, setFilter } = useFilters();
  const byCountry = useAggregation(fetchByCountry, params);
  const heatmap = useAggregation(fetchHeatmap, params);

  return (
    <section className="page-section active">
      <div className="section-title"><h2>🌍 Geography</h2><p>Where the signal density concentrates, and which countries lead.</p></div>

      <div className="grid-2">
        <ChartCard title="Choropleth — Avg Intensity by Country" span2 tall loading={byCountry.loading} error={byCountry.error}>
          <ChoroplethMap data={byCountry.data} onSelectCountry={(c) => setFilter('country', c)} />
        </ChartCard>
      </div>

      <div className="grid-2">
        <ChartCard title="Top Countries by Volume" loading={byCountry.loading} error={byCountry.error}>
          <TopCountriesBar data={byCountry.data} />
        </ChartCard>
        <ChartCard title="🔥 Region × Sector Heatmap" subtitle="Signal count intersections" loading={heatmap.loading} error={heatmap.error}>
          <RegionSectorHeatmap data={heatmap.data} />
        </ChartCard>
      </div>
    </section>
  );
}
