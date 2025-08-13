export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">داشبورد</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Summary cards */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-600">تعداد کاربران</div>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">1,248</div>
          <div className="text-xs text-emerald-600 mt-1">+3.2% این هفته</div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-600">حجم تراکنش امروز</div>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">2.4M IRR</div>
          <div className="text-xs text-emerald-600 mt-1">+12% نسبت به دیروز</div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-600">فاکتورهای باز</div>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">37</div>
          <div className="text-xs text-rose-600 mt-1">-2 از هفته قبل</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-700 mb-2">روند حجم تراکنش (۳۰ روز)</div>
          <svg viewBox="0 0 100 60" className="w-full" preserveAspectRatio="none">
            <polyline points="0,55 5,54 10,53 15,50 20,48 25,46 30,44 35,45 40,43 45,40 50,39 55,36 60,35 65,32 70,30 75,28 80,27 85,25 90,24 95,22 100,20" fill="none" stroke="#10b981" strokeWidth="2" />
            <polyline points="0,60 0,55 5,54 10,53 15,50 20,48 25,46 30,44 35,45 40,43 45,40 50,39 55,36 60,35 65,32 70,30 75,28 80,27 85,25 90,24 95,22 100,20 100,60" fill="rgba(16,185,129,0.12)" />
          </svg>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-700 mb-2">سهم انواع تراکنش</div>
          <div className="grid grid-cols-6 gap-1 items-end h-40">
            {[
              { h: 90, c: '#0ea5e9', l: 'نقد+' },
              { h: 70, c: '#22c55e', l: 'نقد-' },
              { h: 60, c: '#6366f1', l: 'حواله+' },
              { h: 45, c: '#f59e0b', l: 'حواله-' },
              { h: 55, c: '#ef4444', l: 'خرید' },
              { h: 65, c: '#14b8a6', l: 'فروش' },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center justify-end">
                <div className="w-8" style={{ height: `${b.h}%`, backgroundColor: b.c, borderRadius: 4 }}></div>
                <div className="text-[10px] text-gray-500 mt-1">{b.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-700 mb-2">نرخ‌های منتخب</div>
          <div className="space-y-3">
            {[
              { c: 'USD/IRR', b: '627,500', s: '631,000' },
              { c: 'EUR/IRR', b: '675,300', s: '680,900' },
              { c: 'AED/IRR', b: '171,200', s: '172,300' },
            ].map((r) => (
              <div key={r.c} className="flex items-center justify-between text-sm">
                <div className="font-bold text-gray-800">{r.c}</div>
                <div className="text-emerald-600">خرید: {r.b}</div>
                <div className="text-rose-600">فروش: {r.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 