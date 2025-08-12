'use client';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/app/config/api';

export default function CustomersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ code: '', firstName: '', lastName: '', mobile: '', email: '' });
  const [editing, setEditing] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.customers.getAll, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setItems(data.data || []);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (!form.code || !form.firstName || !form.lastName) {
      setErrorMsg('کد، نام و نام خانوادگی الزامی است');
      return;
    }
    try {
      const res = await fetch(API_ENDPOINTS.customers.create, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) {
        setForm({ code: '', firstName: '', lastName: '', mobile: '', email: '' });
        setSuccessMsg(data.message || 'مشتری ایجاد شد');
        load();
      } else {
        setErrorMsg(data.message || 'ایجاد مشتری ناموفق بود');
      }
    } catch (err) {
      setErrorMsg('خطا در ارتباط با سرور');
    }
  };

  const startEdit = (c) => { setEditing(c.id); setForm({ code: c.code, firstName: c.firstName, lastName: c.lastName, mobile: c.mobile||'', email: c.email||'' }); };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch(API_ENDPOINTS.customers.update(editing), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { setEditing(null); setSuccessMsg(data.message || 'بروزرسانی شد'); load(); }
      else setErrorMsg(data.message || 'بروزرسانی ناموفق بود');
    } catch {
      setErrorMsg('خطا در ارتباط با سرور');
    }
  };
  const handleDelete = async (id) => {
    if (!confirm('حذف مشتری؟')) return;
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch(API_ENDPOINTS.customers.delete(id), { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { setSuccessMsg(data.message || 'حذف شد'); load(); }
      else setErrorMsg(data.message || 'حذف ناموفق بود');
    } catch {
      setErrorMsg('خطا در ارتباط با سرور');
    }
  };

  if (loading) return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold">مشتریان</h2>
      {errorMsg && (<div className="bg-red-100 text-red-700 p-2 rounded border border-red-300">{errorMsg}</div>)}
      {successMsg && (<div className="bg-green-100 text-green-700 p-2 rounded border border-green-300">{successMsg}</div>)}

      <form onSubmit={editing ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-6 gap-2 bg-white p-3 rounded border">
        <input className="border p-2 rounded" placeholder="کد" value={form.code} onChange={e=>setForm({...form, code: e.target.value})} disabled={!!editing} required />
        <input className="border p-2 rounded" placeholder="نام" value={form.firstName} onChange={e=>setForm({...form, firstName: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="نام خانوادگی" value={form.lastName} onChange={e=>setForm({...form, lastName: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="موبایل" value={form.mobile} onChange={e=>setForm({...form, mobile: e.target.value})} />
        <input className="border p-2 rounded" placeholder="ایمیل" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-6 py-2 shadow-md transition-all duration-150">{editing ? 'ذخیره' : 'ایجاد'}</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="p-2 border">کد</th>
              <th className="p-2 border">نام</th>
              <th className="p-2 border">موبایل</th>
              <th className="p-2 border">ایمیل</th>
              <th className="p-2 border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <td className="p-2 border">{c.code}</td>
                <td className="p-2 border">{c.fullName}</td>
                <td className="p-2 border">{c.mobile}</td>
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border space-x-2 rtl:space-x-reverse">
                  <button onClick={()=>startEdit(c)} className="bg-yellow-500 text-white px-3 py-1 rounded">ویرایش</button>
                  <button onClick={()=>handleDelete(c.id)} className="bg-red-600 text-white px-3 py-1 rounded">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


