
import Link from 'next/link';
import Button from './components/ui/Button/Button';
import Card from './components/ui/Card/Card';

export default async function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cyan-900 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                صرافی آنلاین امن و سریع
              </h1>
              <p className="mt-4 text-cyan-100 text-lg">
                خرید و فروش لحظه‌ای ارزهای پرکاربرد با بهترین نرخ، تسویه فوری و پشتیبانی ۲۴ ساعته.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/auth/register">
                  <Button size="large" variant="primary" className="bg-emerald-500 hover:bg-emerald-600">
                    شروع تبادل
                  </Button>
                </Link>
                <Link href="#rates">
                  <Button size="large" variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border border-white/20">
                    مشاهده نرخ‌ها
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-cyan-100/90">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  تسویه آنی شتاب
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"/></svg>
                  احراز هویت آنلاین
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
                  پشتیبانی ۲۴/۷
                </div>
              </div>
            </div>
            <div className="md:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">مبدل سریع ارز</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label className="text-sm text-cyan-100/80 mb-1">مقدار</label>
                    <input className="rounded-md px-3 py-2 text-gray-900 focus:outline-none" placeholder="1000" defaultValue="1000" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-cyan-100/80 mb-1">ارز</label>
                    <select className="rounded-md px-3 py-2 text-gray-900 focus:outline-none">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                      <option>AED</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-cyan-100/80 mb-1">به</label>
                    <select className="rounded-md px-3 py-2 text-gray-900 focus:outline-none">
                      <option>IRR</option>
                      <option>IRT</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">محاسبه فوری</Button>
                  </div>
                </div>
                <p className="text-xs text-cyan-100/70 mt-3">نرخ‌ها نمایشی هستند. برای مشاهده نرخ لحظه‌ای ثبت‌نام کنید.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rates */}
      <section id="rates" className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            {[
              { c: 'USD/IRR', b: '627,500', s: '631,000' },
              { c: 'EUR/IRR', b: '675,300', s: '680,900' },
              { c: 'GBP/IRR', b: '785,100', s: '790,400' },
              { c: 'AED/IRR', b: '171,200', s: '172,300' },
              { c: 'TRY/IRR', b: '19,400', s: '19,850' },
            ].map((r, idx) => (
              <Card key={idx} className="rounded-md border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="font-bold text-gray-800">{r.c}</div>
                  <div className="text-sm text-emerald-600">خرید: {r.b}</div>
                  <div className="text-sm text-rose-600">فروش: {r.s}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">چرا صرافی آنلاین ما؟</h2>
            <p className="mt-3 text-gray-600">تمرکز بر امنیت، شفافیت و تجربه کاربری سریع</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { t: 'نرخ لحظه‌ای و شفاف', d: 'نمایش آنی قیمت‌ها و کارمزدها بدون ابهام.' },
              { t: 'احراز هویت آنلاین', d: 'شروع سریع بدون مراجعه حضوری.' },
              { t: 'تسویه فوری شتاب', d: 'واریز و برداشت سریع و مطمئن.' },
              { t: 'امنیت بانکی', d: 'رمزنگاری پیشرفته و ذخیره‌سازی امن.' },
              { t: 'پشتیبانی ۲۴/۷', d: 'همراه شما در تمام ساعات شبانه‌روز.' },
              { t: 'گزارش‌های حرفه‌ای', d: 'سوابق مالی شفاف و قابل دانلود.' },
            ].map((f, idx) => (
              <Card key={idx} className="h-full">
                <h3 className="text-lg font-semibold text-gray-900">{f.t}</h3>
                <p className="mt-2 text-gray-600">{f.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">چطور کار می‌کند؟</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { s: '۱', t: 'ثبت‌نام و احراز هویت', d: 'حساب بسازید و به‌صورت آنلاین احراز هویت شوید.' },
              { s: '۲', t: 'واریز یا ثبت سفارش', d: 'موجودی اضافه کنید یا سفارش خرید/فروش ثبت کنید.' },
              { s: '۳', t: 'تسویه فوری', d: 'در لحظه تسویه کنید و رسید دریافت کنید.' },
            ].map((step, idx) => (
              <Card key={idx} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-lg font-bold">
                  {step.s}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.t}</h3>
                <p className="mt-2 text-gray-600">{step.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">امنیت در سطح بانک‌ها</h3>
              <p className="mt-3 text-gray-600">تمام تراکنش‌ها با رمزنگاری قوی، مانیتورینگ لحظه‌ای و سیاست‌های سخت‌گیرانه حفاظت از داده انجام می‌شود.</p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-center gap-2"><svg className="w-5 h-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd"/></svg>رمزنگاری داده در حین انتقال</li>
                <li className="flex items-center gap-2"><svg className="w-5 h-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd"/></svg>ذخیره‌سازی امن و چندلایه</li>
                <li className="flex items-center gap-2"><svg className="w-5 h-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd"/></svg>کنترل دسترسی مبتنی بر نقش</li>
              </ul>
            </div>
            <div>
              <Card className="bg-gray-50">
                <div className="grid sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4">
                    <div className="text-2xl font-extrabold text-gray-900">99.99%</div>
                    <div className="text-sm text-gray-600">آپتایم</div>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-extrabold text-gray-900"><span dir="ltr">TLS</span> 1.3</div>
                    <div className="text-sm text-gray-600">رمزنگاری</div>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-extrabold text-gray-900">۲۴/۷</div>
                    <div className="text-sm text-gray-600">پشتیبانی</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h3 className="text-2xl font-bold text-gray-900 text-center">سوالات پرتکرار</h3>
          <div className="mt-6 space-y-3">
            {[
              { q: 'چگونه ثبت‌نام کنم؟', a: 'روی دکمه شروع تبادل کلیک کنید و مراحل ثبت‌نام و احراز هویت را به‌صورت آنلاین انجام دهید.' },
              { q: 'کارمزدها چقدر است؟', a: 'کارمزد به‌صورت شفاف قبل از تایید تراکنش نمایش داده می‌شود.' },
              { q: 'چقدر طول می‌کشد تا تسویه انجام شود؟', a: 'در اکثر موارد تسویه آنی و حداکثر چند دقیقه زمان می‌برد.' },
            ].map((item, idx) => (
              <details key={idx} className="group bg-white rounded-md border border-gray-200 p-4">
                <summary className="cursor-pointer list-none flex justify-between items-center">
                  <span className="font-medium text-gray-900">{item.q}</span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-3 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-cyan-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">همین حالا شروع کنید</h3>
            <p className="text-cyan-100 mt-1">در کمتر از چند دقیقه حساب خود را بسازید و تبادل را آغاز کنید.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/register">
              <Button size="large" className=" text-cyan-800 hover:bg-gray-100">ساخت حساب</Button>
            </Link>
            <Link href="/auth/login">
              <Button size="large" variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border border-white/20">ورود</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
