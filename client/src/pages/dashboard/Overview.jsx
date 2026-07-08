import KpiRow from '../../components/KpiRow';
import ChartCard from '../../components/charts/ChartCard';
import ChoroplethMap from '../../components/charts/ChoroplethMap';
import TopCountriesBar from '../../components/charts/TopCountriesBar';
import SectorDonut from '../../components/charts/SectorDonut';
import { fetchByCountry, fetchBySector } from '../../api/insights';
import { useAggregation } from '../../hooks/useAggregation';
import { useFilters } from '../../context/FilterContext';

export default function Overview() {
  const { params, setFilter } = useFilters();
  const byCountry = useAggregation(fetchByCountry, params);
  const bySector = useAggregation(fetchBySector, params);

  return (
    <section className="page-section active">
      <KpiRow />

      <div className="grid-2">
        <ChartCard title="🌍 Global Intensity Map" subtitle="Average signal intensity by country — click a country to filter" span2 tall loading={byCountry.loading} error={byCountry.error}>
          <ChoroplethMap data={byCountry.data} onSelectCountry={(c) => setFilter('country', c)} />
        </ChartCard>
      </div>

      <div className="grid-2">
        <ChartCard title="📊 Top Countries" subtitle="By number of signals" loading={byCountry.loading} error={byCountry.error}>
          <TopCountriesBar data={byCountry.data} />
        </ChartCard>
        <ChartCard title="🍩 Sector Distribution" subtitle="Share of signals per sector" loading={bySector.loading} error={bySector.error}>
          <SectorDonut data={bySector.data} />
        </ChartCard>
      </div>
    </section>
  );
}
