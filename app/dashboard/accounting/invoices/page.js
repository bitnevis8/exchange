'use client';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/app/config/api';
import Select from 'react-select';

export default function InvoicesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ number: '', customerId: '', companyId: '', currencyCode: 'AED', type: 'sale', subtotal: '', vatPercent: 5, notes: '' });
  const [editing, setEditing] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.invoices.getAll, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setItems(data.data || []);
    } finally {
      setLoading(false);
    }
  };
  const loadCustomers = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.customers.getAll, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setCustomers(data.data || []);
    } catch {}
  };
  const loadCompanies = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.companies.getAll, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setCompanies(data.data || []);
    } catch {}
  };
  useEffect(() => { load(); loadCustomers(); loadCompanies(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (!form.customerId || !form.companyId) { setErrorMsg('مشتری و شرکت را انتخاب کنید'); return; }
    const payload = { ...form, customerId: Number(form.customerId), companyId: Number(form.companyId), subtotal: Number(form.subtotal), vatPercent: Number(form.vatPercent) };
    try {
      const res = await fetch(API_ENDPOINTS.invoices.create, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.success) { setForm({ number: '', customerId: '', companyId: '', currencyCode: 'AED', type: 'sale', subtotal: '', vatPercent: 5, notes: '' }); setSuccessMsg(data.message || 'فاکتور ثبت شد'); load(); }
      else setErrorMsg(data.message || 'ثبت فاکتور ناموفق بود');
    } catch {
      setErrorMsg('خطا در ارتباط با سرور');
    }
  };

  const startEdit = (i) => { setEditing(i.id); setForm({ number: i.number, customerId: i.customerId, companyId: i.companyId, currencyCode: i.currencyCode, type: i.type, subtotal: i.subtotal, vatPercent: i.vatPercent, notes: i.notes||'' }); };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = { number: form.number, customerId: Number(form.customerId), companyId: Number(form.companyId), currencyCode: form.currencyCode, type: form.type, subtotal: Number(form.subtotal), vatPercent: Number(form.vatPercent), notes: form.notes };
    const res = await fetch(API_ENDPOINTS.invoices.update(editing), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (data.success) { setEditing(null); load(); }
  };
  const handleDelete = async (id) => {
    if (!confirm('حذف فاکتور؟')) return;
    const res = await fetch(API_ENDPOINTS.invoices.delete(id), { method: 'DELETE' });
    const data = await res.json();
    if (data.success) load();
  };

  if (loading) return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold">فاکتورها</h2>
      {errorMsg && (<div className="bg-red-100 text-red-700 p-2 rounded border border-red-300">{errorMsg}</div>)}
      {successMsg && (<div className="bg-green-100 text-green-700 p-2 rounded border border-green-300">{successMsg}</div>)}

      <form onSubmit={editing ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-9 gap-2 bg-white p-3 rounded border items-center">
        <input className="border p-2 rounded" placeholder="شماره" value={form.number} onChange={e=>setForm({...form, number: e.target.value})} required />
        <div className="min-w-[240px] md:col-span-2"><Select
          isRtl isSearchable isClearable placeholder="انتخاب مشتری..."
          options={(customers||[]).map(c=>({ value: c.id, label: `${c.fullName || `${c.firstName||''} ${c.lastName||''}`.trim()} (${c.code})` }))}
          value={(customers||[]).map(c=>({ value: c.id, label: `${c.fullName || `${c.firstName||''} ${c.lastName||''}`.trim()} (${c.code})` })).find(o=>String(o.value)===String(form.customerId)) || null}
          onChange={(opt)=> setForm({...form, customerId: opt ? opt.value : ''})}
        /></div>
        <div className="min-w-[240px] md:col-span-2"><Select
          isRtl isSearchable isClearable placeholder="انتخاب شرکت..."
          options={(companies||[]).map(c=>({ value: c.id, label: `${c.name}${c.taxId ? ` - ${c.taxId}` : ''}` }))}
          value={(companies||[]).map(c=>({ value: c.id, label: `${c.name}${c.taxId ? ` - ${c.taxId}` : ''}` })).find(o=>String(o.value)===String(form.companyId)) || null}
          onChange={(opt)=> setForm({...form, companyId: opt ? opt.value : ''})}
        /></div>
        <select className="border p-2 rounded" value={form.currencyCode} onChange={e=>setForm({...form, currencyCode: e.target.value})}>
          <option value="AED">AED</option>
          <option value="USD">USD</option>
          <option value="IRR">IRR</option>
        </select>
        <select className="border p-2 rounded" value={form.type} onChange={e=>setForm({...form, type: e.target.value})}>
          <option value="sale">فروش</option>
          <option value="purchase">خرید</option>
          <option value="service">خدمات</option>
        </select>
        <input className="border p-2 rounded" placeholder="جمع جزء" value={form.subtotal} onChange={e=>setForm({...form, subtotal: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="VAT %" value={form.vatPercent} onChange={e=>setForm({...form, vatPercent: e.target.value})} />
        <input className="border p-2 rounded" placeholder="یادداشت" value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})} />
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-6 py-2 shadow-md transition-all duration-150 cursor-pointer">{editing ? 'ذخیره' : 'ثبت'}</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="p-2 border">شماره</th>
              <th className="p-2 border">مشتری</th>
              <th className="p-2 border">شرکت</th>
              <th className="p-2 border">ارز</th>
              <th className="p-2 border">نوع</th>
              <th className="p-2 border">مجموع</th>
              <th className="p-2 border">وضعیت</th>
              <th className="p-2 border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td className="p-2 border">{i.number}</td>
                <td className="p-2 border">{i.customerId}</td>
                <td className="p-2 border">{i.companyId}</td>
                <td className="p-2 border">{i.currencyCode}</td>
                <td className="p-2 border">{i.type}</td>
                <td className="p-2 border">{i.total}</td>
                <td className="p-2 border">{i.status}</td>
                <td className="p-2 border space-x-2 rtl:space-x-reverse">
                  <button onClick={()=>startEdit(i)} className="bg-yellow-500 text-white px-3 py-1 rounded">ویرایش</button>
                  <button onClick={()=>handleDelete(i.id)} className="bg-red-600 text-white px-3 py-1 rounded">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


