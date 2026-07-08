import ChartCard from '../../components/charts/ChartCard';
import RegionCountrySectorSankey from '../../components/charts/RegionCountrySectorSankey';
import RegionCountryTopicSunburst from '../../components/charts/RegionCountryTopicSunburst';
import { fetchSankey, fetchSunburst } from '../../api/insights';
import { useAggregation } from '../../hooks/useAggregation';
import { useFilters } from '../../context/FilterContext';

export default function Flows() {
  const { params } = useFilters();
  const sankey = useAggregation(fetchSankey, params, { nodes: [], links: [] });
  const sunburst = useAggregation(fetchSunburst, params);

  return (
    <section className="page-section active">
      <div className="section-title"><h2>🌊 Flows &amp; Hierarchy</h2><p>Trace signals from region → country → sector, and drill by region → country → topic.</p></div>

      <div className="grid-2">
        <ChartCard title="Sankey — Region → Country → Sector" subtitle="Top flows by volume" span2 tall loading={sankey.loading} error={sankey.error}>
          <RegionCountrySectorSankey data={sankey.data} />
        </ChartCard>
      </div>

      <div className="grid-2">
        <ChartCard title="Sunburst — Region → Country → Topic" subtitle="Click a ring to drill in" span2 tall loading={sunburst.loading} error={sunburst.error}>
          <RegionCountryTopicSunburst data={sunburst.data} />
        </ChartCard>
      </div>
    </section>
  );
}
