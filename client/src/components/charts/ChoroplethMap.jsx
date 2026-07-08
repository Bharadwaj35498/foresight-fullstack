import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const COUNTRY_ALIAS = {
  'South Sudan': 'S. Sudan',
  Czechia: 'Czech Rep.',
};

let cachedGeo = null;
let cachedGeoPromise = null;

function loadWorldGeo() {
  if (cachedGeo) return Promise.resolve(cachedGeo);
  if (!cachedGeoPromise) {
    cachedGeoPromise = d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((topo) => {
      cachedGeo = topojson.feature(topo, topo.objects.countries);
      return cachedGeo;
    });
  }
  return cachedGeoPromise;
}

export default function ChoroplethMap({ data, onSelectCountry }) {
  const containerRef = useRef(null);
  const [geo, setGeo] = useState(cachedGeo);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let alive = true;
    if (!geo) {
      loadWorldGeo()
        .then((g) => alive && setGeo(g))
        .catch(() => alive && setMapError(true));
    }
    return () => { alive = false; };
  }, [geo]);

  useEffect(() => {
    if (!geo || !containerRef.current) return;
    draw(containerRef.current, geo, data, onSelectCountry);
    const ro = new ResizeObserver(() => draw(containerRef.current, geo, data, onSelectCountry));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, data]);

  if (mapError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: 20 }}>
        Map tiles require network access to jsdelivr.net.<br />All other charts remain fully interactive.
      </div>
    );
  }

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />;
}

function draw(container, geo, data, onSelectCountry) {
  if (!container) return;
  const width = container.clientWidth || 800;
  const height = container.clientHeight || 420;
  if (!width || !height) return;

  d3.select(container).selectAll('*').remove();
  const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '100%');
  const g = svg.append('g');

  const intensityMap = new Map();
  const countMap = new Map();
  (data || []).forEach((d) => { intensityMap.set(d.country, d.avgIntensity); countMap.set(d.country, d.count); });

  const maxVal = Math.max(1, ...intensityMap.values());
  const color = d3.scaleLinear().domain([0, maxVal]).range(['#F0EDFC', '#5A47D6']);

  const projection = d3.geoNaturalEarth1().fitSize([width, height], geo);
  const path = d3.geoPath(projection);

  const tooltip = d3.select(container).append('div')
    .style('position', 'absolute').style('pointer-events', 'none').style('opacity', 0)
    .style('background', '#1E1B39').style('color', '#fff').style('padding', '8px 12px')
    .style('border-radius', '8px').style('font-size', '12px').style('font-family', 'Inter').style('z-index', 5);

  function resolveKey(name) {
    const alias = Object.keys(COUNTRY_ALIAS).find((k) => COUNTRY_ALIAS[k] === name);
    return alias || name;
  }

  g.selectAll('path').data(geo.features).join('path')
    .attr('d', path)
    .attr('fill', (f) => {
      const key = resolveKey(f.properties.name);
      return intensityMap.has(key) ? color(intensityMap.get(key)) : '#EDECF8';
    })
    .attr('stroke', '#fff').attr('stroke-width', 0.6)
    .style('cursor', 'pointer')
    .on('mousemove', function (event, f) {
      const key = resolveKey(f.properties.name);
      const val = intensityMap.get(key);
      tooltip.style('opacity', val !== undefined ? 1 : 0)
        .html(`<b>${f.properties.name}</b><br>${val !== undefined ? `Avg intensity: ${val.toFixed(1)} · ${countMap.get(key)} signals` : ''}`)
        .style('left', `${event.offsetX + 14}px`).style('top', `${event.offsetY + 8}px`);
      d3.select(this).attr('stroke', '#6C5CE7').attr('stroke-width', 1.4);
    })
    .on('mouseleave', function () {
      tooltip.style('opacity', 0);
      d3.select(this).attr('stroke', '#fff').attr('stroke-width', 0.6);
    })
    .on('click', (event, f) => {
      const key = resolveKey(f.properties.name);
      if (intensityMap.has(key) && onSelectCountry) onSelectCountry(key);
    });
}
