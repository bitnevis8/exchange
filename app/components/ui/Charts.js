'use client';

export function MiniAreaChart({ data = [], height = 80, stroke = '#10b981', fill = 'rgba(16,185,129,0.15)', className = '' }) {
  const max = Math.max(...data, 1);
  const points = data.length > 1
    ? data.map((v, i) => `${(i/(data.length-1))*100},${100 - (v/max)*100}`).join(' ')
    : '0,100 100,100';
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} style={{ height }}>
      <polyline points={`0,100 ${points} 100,100`} fill={fill} stroke="none" />
      {data.length > 1 && (
        <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" />
      )}
    </svg>
  );
}

export function MiniBarChart({ data = [], height = 80, barColor = '#6366f1', className = '' }) {
  const max = Math.max(...data, 1);
  const gap = 2;
  const barWidth = data.length ? (100 - (data.length + 1) * gap) / data.length : 0;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} style={{ height }}>
      {data.map((v, i) => {
        const h = (v / max) * 90;
        const x = gap + i * (barWidth + gap);
        const y = 100 - h;
        return <rect key={i} x={x} y={y} width={barWidth} height={h} fill={barColor} rx="1" />;
      })}
    </svg>
  );
}


