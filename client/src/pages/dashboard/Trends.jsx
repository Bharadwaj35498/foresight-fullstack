import ChartCard from '../../components/charts/ChartCard';
import YearlyTrendChart from '../../components/charts/YearlyTrendChart';
import LikelihoodRelevanceBubble from '../../components/charts/LikelihoodRelevanceBubble';
import { fetchTimeline, fetchBubble } from '../../api/insights';
import { useAggregation } from '../../hooks/useAggregation';
import { useFilters } from '../../context/FilterContext';

export default function Trends() {
  const { params } = useFilters();
  const timeline = useAggregation(fetchTimeline, params);
  const bubble = useAggregation(fetchBubble, params);

  return (
    <section className="page-section active">
      <div className="section-title"><h2>📈 Trends &amp; Scoring</h2><p>Momentum over time, and where likelihood meets relevance.</p></div>

      <div className="grid-2">
        <ChartCard title="Reports & Avg Intensity by Year" span2 loading={timeline.loading} error={timeline.error}>
          <YearlyTrendChart data={timeline.data} />
        </ChartCard>
      </div>

      <div className="grid-2">
        <ChartCard title="🎈 Likelihood × Relevance" subtitle="Bubble size = intensity · color = sector" span2 tall loading={bubble.loading} error={bubble.error}>
          <LikelihoodRelevanceBubble data={bubble.data} />
        </ChartCard>
      </div>
    </section>
  );
}
