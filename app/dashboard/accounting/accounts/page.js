'use client';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/app/config/api';
import { MiniAreaChart, MiniBarChart } from '@/app/components/ui/Charts';
import Select from 'react-select';

export default function AccountsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ customerId: '', currencyCode: 'AED', ownershipType: 'custody' });
  const [editing, setEditing] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.accounts.getAll, { cache: 'no-store' });
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
  useEffect(() => { load(); loadCustomers(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const payload = { ...form, customerId: Number(form.customerId) };
    try {
      const res = await fetch(API_ENDPOINTS.accounts.create, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.success) {
        setForm({ customerId: '', currencyCode: 'AED', ownershipType: 'custody' });
        setSuccessMsg(data.message || 'حساب ایجاد شد');
        load();
      } else {
        setErrorMsg(data.message || 'ایجاد حساب ناموفق بود');
      }
    } catch (err) {
      setErrorMsg('خطا در ارتباط با سرور');
    }
  };

  const startEdit = (a) => { setEditing(a.id); setForm({ customerId: a.customerId, currencyCode: a.currencyCode, ownershipType: a.ownershipType }); };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = { ownershipType: form.ownershipType };
    const res = await fetch(API_ENDPOINTS.accounts.update(editing), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (data.success) { setEditing(null); load(); }
  };
  const handleDelete = async (id) => {
    if (!confirm('حذف حساب؟ (فقط با مانده صفر)')) return;
    const res = await fetch(API_ENDPOINTS.accounts.delete(id), { method: 'DELETE' });
    const data = await res.json();
    if (data.success) load();
  };

  if (loading) return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold">حساب‌ها</h2>
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-600 mb-2">روند تعداد حساب‌ها (۳۰ روز)</div>
          <MiniAreaChart data={[3,5,6,8,7,9,12,10,14,15,16,18,20,19,21,22,23,25,24,26,27,28,30,29,31,33,32,34,35,36]} height={100} />
        </div>
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-600 mb-2">توزیع نوع مالکیت</div>
          <MiniBarChart data={[60,40]} height={100} />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>امانی</span><span>شخصی</span></div>
        </div>
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-600 mb-2">ارزهای برتر</div>
          <MiniBarChart data={[50,35,15]} height={100} />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>AED</span><span>USD</span><span>IRR</span></div>
        </div>
      </div>
      {errorMsg && (<div className="bg-red-100 text-red-700 p-2 rounded border border-red-300">{errorMsg}</div>)}
      {successMsg && (<div className="bg-green-100 text-green-700 p-2 rounded border border-green-300">{successMsg}</div>)}

      <form onSubmit={editing ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-5 gap-2 bg-white p-3 rounded border">
        <div className="min-w-[220px]"><Select
          isRtl
          isSearchable
          isClearable
          placeholder="انتخاب مشتری..."
          options={(customers||[]).map(c=>({ value: c.id, label: `${c.fullName || `${c.firstName||''} ${c.lastName||''}`.trim()} (${c.code})` }))}
          value={(customers||[]).map(c=>({ value: c.id, label: `${c.fullName || `${c.firstName||''} ${c.lastName||''}`.trim()} (${c.code})` })).find(o=>String(o.value)===String(form.customerId)) || null}
          onChange={(opt)=> setForm({...form, customerId: opt ? opt.value : ''})}
          isDisabled={!!editing}
        /></div>
        <select className="border p-2 rounded" value={form.currencyCode} onChange={e=>setForm({...form, currencyCode: e.target.value})} disabled={!!editing}>
          <option value="AED">AED</option>
          <option value="USD">USD</option>
          <option value="IRR">IRR</option>
        </select>
        <select className="border p-2 rounded" value={form.ownershipType} onChange={e=>setForm({...form, ownershipType: e.target.value})}>
          <option value="custody">امانی</option>
          <option value="personal">شخصی</option>
        </select>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-6 py-2 shadow-md transition-all duration-150 cursor-pointer">{editing ? 'ذخیره' : 'ایجاد'}</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="p-2 border">مشتری</th>
              <th className="p-2 border">ارز</th>
              <th className="p-2 border">نوع مالکیت</th>
              <th className="p-2 border">مانده</th>
              <th className="p-2 border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id}>
                <td className="p-2 border">{a.customer?.fullName || a.customerId}</td>
                <td className="p-2 border">{a.currencyCode}</td>
                <td className="p-2 border">{a.ownershipType === 'personal' ? 'شخصی' : 'امانی'}</td>
                <td className="p-2 border">{a.balance}</td>
                <td className="p-2 border space-x-2 rtl:space-x-reverse">
                  <button onClick={()=>startEdit(a)} className="bg-yellow-500 text-white px-3 py-1 rounded">ویرایش</button>
                  <button onClick={()=>handleDelete(a.id)} className="bg-red-600 text-white px-3 py-1 rounded">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


