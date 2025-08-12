'use client';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/app/config/api';

export default function CompaniesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', taxId: '', phone: '', email: '' });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.companies.getAll, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setItems(data.data || []);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await fetch(API_ENDPOINTS.companies.create, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (data.success) { setForm({ name: '', taxId: '', phone: '', email: '' }); load(); }
  };

  const startEdit = (c) => { setEditing(c.id); setForm({ name: c.name, taxId: c.taxId||'', phone: c.phone||'', email: c.email||'' }); };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(API_ENDPOINTS.companies.update(editing), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (data.success) { setEditing(null); load(); }
  };
  const handleDelete = async (id) => {
    if (!confirm('حذف شرکت؟')) return;
    const res = await fetch(API_ENDPOINTS.companies.delete(id), { method: 'DELETE' });
    const data = await res.json();
    if (data.success) load();
  };

  if (loading) return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold">شرکت‌ها</h2>

      <form onSubmit={editing ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-6 gap-2 bg-white p-3 rounded border">
        <input className="border p-2 rounded" placeholder="نام" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="کد مالیاتی" value={form.taxId} onChange={e=>setForm({...form, taxId: e.target.value})} />
        <input className="border p-2 rounded" placeholder="تلفن" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
        <input className="border p-2 rounded" placeholder="ایمیل" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
        <button className="bg-blue-600 text-white rounded px-4">{editing ? 'ذخیره' : 'ایجاد'}</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="p-2 border">نام</th>
              <th className="p-2 border">کد مالیاتی</th>
              <th className="p-2 border">تلفن</th>
              <th className="p-2 border">ایمیل</th>
              <th className="p-2 border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.taxId}</td>
                <td className="p-2 border">{c.phone}</td>
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


