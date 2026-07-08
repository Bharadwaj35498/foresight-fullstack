import DataTable from '../../components/DataTable';

export default function Explorer() {
  return (
    <section className="page-section active">
      <div className="section-title"><h2>▤ Data Explorer</h2><p>Every record behind the visuals above — searchable and sortable, straight from MongoDB.</p></div>
      <DataTable />
    </section>
  );
}
