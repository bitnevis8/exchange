'use client';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/app/config/api';

export default function CurrenciesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ code: '', name: '', symbol: '', isBase: false, rateToAED: '', rateToUSD: '', rateToIRR: '' });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.currency.getAll, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setItems(data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = { ...form, isBase: !!form.isBase, rateToAED: num(form.rateToAED), rateToUSD: num(form.rateToUSD), rateToIRR: num(form.rateToIRR) };
    const res = await fetch(API_ENDPOINTS.currency.create, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (data.success) { setForm({ code: '', name: '', symbol: '', isBase: false, rateToAED: '', rateToUSD: '', rateToIRR: '' }); load(); }
  };

  const startEdit = (c) => {
    setEditing(c.code);
    setForm({ code: c.code, name: c.name, symbol: c.symbol || '', isBase: !!c.isBase, rateToAED: c.rateToAED || '', rateToUSD: c.rateToUSD || '', rateToIRR: c.rateToIRR || '' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const code = editing;
    const payload = { name: form.name, symbol: form.symbol || null, isBase: !!form.isBase, rateToAED: num(form.rateToAED, true), rateToUSD: num(form.rateToUSD, true), rateToIRR: num(form.rateToIRR, true), enabled: true };
    const res = await fetch(API_ENDPOINTS.currency.update(code), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (data.success) { setEditing(null); load(); }
  };

  const handleDelete = async (code) => {
    if (!confirm('حذف این ارز؟')) return;
    const res = await fetch(API_ENDPOINTS.currency.delete(code), { method: 'DELETE' });
    const data = await res.json();
    if (data.success) load();
  };

  const num = (v, allowNull = false) => {
    if (v === '' || v === null || v === undefined) return allowNull ? null : 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  if (loading) return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold">ارزها</h2>

      <form onSubmit={editing ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-8 gap-2 bg-white p-3 rounded border">
        <input className="border p-2 rounded" placeholder="کد" value={form.code} onChange={e=>setForm({...form, code: e.target.value.toUpperCase()})} disabled={!!editing} required />
        <input className="border p-2 rounded" placeholder="نام" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="نماد" value={form.symbol} onChange={e=>setForm({...form, symbol: e.target.value})} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.isBase} onChange={e=>setForm({...form, isBase: e.target.checked})}/> پایه</label>
        <input className="border p-2 rounded" placeholder="نرخ به AED" value={form.rateToAED} onChange={e=>setForm({...form, rateToAED: e.target.value})} />
        <input className="border p-2 rounded" placeholder="نرخ به USD" value={form.rateToUSD} onChange={e=>setForm({...form, rateToUSD: e.target.value})} />
        <input className="border p-2 rounded" placeholder="نرخ به IRR" value={form.rateToIRR} onChange={e=>setForm({...form, rateToIRR: e.target.value})} />
        <button className="bg-blue-600 text-white rounded px-4">{editing ? 'ذخیره' : 'ایجاد'}</button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="p-2 border">کد</th>
              <th className="p-2 border">نام</th>
              <th className="p-2 border">نماد</th>
              <th className="p-2 border">پایه</th>
              <th className="p-2 border">به AED</th>
              <th className="p-2 border">به USD</th>
              <th className="p-2 border">به IRR</th>
              <th className="p-2 border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.code}>
                <td className="p-2 border">{c.code}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.symbol}</td>
                <td className="p-2 border">{c.isBase ? 'بله' : 'خیر'}</td>
                <td className="p-2 border">{c.rateToAED}</td>
                <td className="p-2 border">{c.rateToUSD}</td>
                <td className="p-2 border">{c.rateToIRR}</td>
                <td className="p-2 border space-x-2 rtl:space-x-reverse">
                  <button onClick={()=>startEdit(c)} className="bg-yellow-500 text-white px-3 py-1 rounded">ویرایش</button>
                  <button onClick={()=>handleDelete(c.code)} className="bg-red-600 text-white px-3 py-1 rounded">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


