'use client';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/app/config/api';
import { MiniAreaChart, MiniBarChart } from '@/app/components/ui/Charts';
import Select from 'react-select';

export default function TransactionsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ accountId: '', currencyCode: 'AED', type: 'deposit_cash', amount: '', description: '' });
  const [editing, setEditing] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.transactions.getAll, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setItems(data.data || []);
    } finally {
      setLoading(false);
    }
  };
  const loadAccounts = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.accounts.getAll, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setAccounts(data.data || []);
    } catch {}
  };
  useEffect(() => { load(); loadAccounts(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (!form.accountId) { setErrorMsg('حساب را انتخاب کنید'); return; }
    if (form.amount === '' || isNaN(Number(form.amount))) { setErrorMsg('مبلغ معتبر نیست'); return; }
    const payload = { ...form, accountId: Number(form.accountId), amount: Number(form.amount) };
    try {
      const res = await fetch(API_ENDPOINTS.transactions.create, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.success) {
        setForm({ accountId: '', currencyCode: 'AED', type: 'deposit_cash', amount: '', description: '' });
        setSuccessMsg(data.message || 'تراکنش ثبت شد');
        load();
      } else {
        setErrorMsg(data.message || 'ثبت تراکنش ناموفق بود');
      }
    } catch (err) {
      setErrorMsg('خطا در ارتباط با سرور');
    }
  };

  const startEdit = (t) => { setEditing(t.id); setForm({ accountId: t.accountId, currencyCode: t.currencyCode, type: t.type, amount: t.amount, description: t.description||'' }); };
  const handleUpdate = async (e) => {
    e.preventDefault();
    // Only metadata updates allowed on applied tx; controller enforces rules
    const payload = { description: form.description };
    const res = await fetch(API_ENDPOINTS.transactions.update(editing), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (data.success) { setEditing(null); load(); }
  };
  const handleDelete = async (id) => {
    if (!confirm('حذف تراکنش در انتظار تایید؟')) return;
    const res = await fetch(API_ENDPOINTS.transactions.delete(id), { method: 'DELETE' });
    const data = await res.json();
    if (data.success) load();
  };

  if (loading) return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold">تراکنش‌ها</h2>
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-600 mb-2">روند حجم تراکنش (۷ روز)</div>
          <MiniAreaChart data={[12, 18, 15, 22, 30, 28, 35]} height={100} />
        </div>
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-600 mb-2">نوع تراکنش‌ها</div>
          <MiniBarChart data={[20,18,12,10,8,7]} height={100} />
          <div className="grid grid-cols-3 gap-1 text-[10px] text-gray-500 mt-1">
            <span>نقد دریافتی</span><span>نقد پرداختی</span><span>حواله ورودی</span><span>حواله خروجی</span><span>خرید</span><span>فروش</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded border">
          <div className="text-sm text-gray-600 mb-2">ارزهای پرتراکنش</div>
          <MiniBarChart data={[42,30,18]} height={100} />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>AED</span><span>USD</span><span>IRR</span></div>
        </div>
      </div>
      {errorMsg && (<div className="bg-red-100 text-red-700 p-2 rounded border border-red-300">{errorMsg}</div>)}
      {successMsg && (<div className="bg-green-100 text-green-700 p-2 rounded border border-green-300">{successMsg}</div>)}

      <form onSubmit={editing ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-7 gap-2 bg-white p-3 rounded border items-center">
        <div className="min-w-[280px] w-full md:col-span-3"><Select
          isRtl
          isSearchable
          isClearable
          placeholder="انتخاب حساب..."
          options={(accounts||[]).map(a=>({ value: a.id, label: `${a.customer?.fullName || a.customerId} - ${a.currencyCode} (${a.ownershipType==='personal'?'شخصی':'امانی'})` , currencyCode: a.currencyCode }))}
          value={(accounts||[]).map(a=>({ value: a.id, label: `${a.customer?.fullName || a.customerId} - ${a.currencyCode} (${a.ownershipType==='personal'?'شخصی':'امانی'})`, currencyCode: a.currencyCode })).find(o=>String(o.value)===String(form.accountId)) || null}
          onChange={(opt)=> setForm({...form, accountId: opt ? opt.value : '', currencyCode: opt?.currencyCode || form.currencyCode })}
        /></div>
        <select className="border p-2 rounded" value={form.currencyCode} onChange={e=>setForm({...form, currencyCode: e.target.value})} disabled>
          <option value="AED">AED</option>
          <option value="USD">USD</option>
          <option value="IRR">IRR</option>
        </select>
        <select className="border p-2 rounded" value={form.type} onChange={e=>setForm({...form, type: e.target.value})}>
          <option value="deposit_cash">دریافت نقد</option>
          <option value="withdraw_cash">پرداخت نقد</option>
          <option value="remittance_in">حواله ورودی</option>
          <option value="remittance_out">حواله خروجی</option>
          <option value="buy">خرید ارز</option>
          <option value="sell">فروش ارز</option>
        </select>
        <input className="border p-2 rounded" placeholder="مبلغ (+ بدهکار / - بستانکار)" value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="توضیحات" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-6 py-2 shadow-md transition-all duration-150 cursor-pointer">
          {editing ? 'ذخیره' : 'ثبت'}
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="p-2 border">حساب</th>
              <th className="p-2 border">ارز</th>
              <th className="p-2 border">نوع</th>
              <th className="p-2 border">مبلغ</th>
              <th className="p-2 border">مانده بعد</th>
              <th className="p-2 border">وضعیت</th>
              <th className="p-2 border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id}>
                <td className="p-2 border">{t.account?.customer?.fullName || t.accountId}</td>
                <td className="p-2 border">{t.currencyCode}</td>
                <td className="p-2 border">{t.type}</td>
                <td className="p-2 border">{t.amount}</td>
                <td className="p-2 border">{t.balanceAfter}</td>
                <td className="p-2 border">{t.requiresManagerApproval ? 'در انتظار تایید' : 'ثبت شده'}</td>
                <td className="p-2 border space-x-2 rtl:space-x-reverse">
                  <button onClick={()=>startEdit(t)} className="bg-yellow-500 text-white px-3 py-1 rounded">ویرایش</button>
                  {t.requiresManagerApproval && (
                    <button onClick={()=>handleDelete(t.id)} className="bg-red-600 text-white px-3 py-1 rounded">حذف</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


