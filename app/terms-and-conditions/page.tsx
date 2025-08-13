"use client";

import React from "react";

export default function TermsAndConditions() {
    const lastUpdated = new Date().toLocaleDateString("fa-IR");

    const sections = [
        { id: "intro", title: "مقدمه و پذیرش قوانین" },
        { id: "definitions", title: "تعاریف" },
        { id: "scope", title: "حوزه فعالیت" },
        { id: "account", title: "ثبت‌نام و حساب کاربری" },
        { id: "process", title: "فرآیند درخواست و انجام خدمات" },
        { id: "obligations", title: "تعهدات کاربران" },
        { id: "liability", title: "مسئولیت‌ها و محدودیت‌ها" },
        { id: "privacy", title: "حریم خصوصی و حفاظت از داده‌ها" },
        { id: "payments", title: "پرداخت‌ها و کمیسیون‌ها" },
        { id: "dispute", title: "حل اختلاف" },
        { id: "changes", title: "تغییر قوانین" },
        { id: "law", title: "قانون حاکم" },
    ];

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-gray-50 py-10 w-full under-navbar-content"
        >
            <div className="mx-auto max-w-3xl px-4">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                        قوانین و مقررات استفاده از پلتفرم نصب پنل‌های خورشیدی
                    </h1>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                        <span
                            className="inline-block h-2 w-2 rounded-full bg-emerald-500"
                            aria-hidden
                        />
                        آخرین به‌روزرسانی: {lastUpdated}
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                        استفاده از این وب‌سایت به منزله پذیرش تمامی شرایط و
                        ضوابط مندرج در این صفحه است. لطفاً پیش از استفاده، موارد
                        زیر را با دقت مطالعه کنید.
                    </p>
                </header>

                {/* Table of contents */}
                <nav aria-label="فهرست مطالب" className="mb-8 neu-container">
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                        <p className="mb-2 text-sm font-semibold text-gray-800">
                            فهرست مطالب
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                            {sections.map((s, idx) => (
                                <li key={s.id} className="truncate">
                                    <a
                                        href={`#${s.id}`}
                                        className="hover:text-emerald-700 hover:underline"
                                    >
                                        {idx + 1}. {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Card container */}
                <div className="space-y-6">
                    <section
                        id="intro"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۱) مقدمه و پذیرش قوانین
                        </h2>
                        <p className="text-gray-700 text-sm leading-7">
                            با ورود به این وب‌سایت و استفاده از خدمات آن، شما به
                            عنوان کاربر (مشتری یا پیمانکار) موافقت خود را با
                            شرایط و ضوابط مندرج در این صفحه اعلام می‌نمایید.
                        </p>
                    </section>

                    <section
                        id="definitions"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۲) تعاریف
                        </h2>
                        <ul className="list-disc pr-5 text-sm text-gray-700 space-y-2">
                            <li>
                                <strong>«سایت» یا «پلتفرم»:</strong> سامانه
                                آنلاین معرفی و اتصال مشتریان به شرکت‌های نصب پنل
                                خورشیدی و مدیریت روند درخواست‌ها.
                            </li>
                            <li>
                                <strong>«مشتری»:</strong> شخص حقیقی یا حقوقی که
                                درخواست نصب یا خدمات مرتبط با پنل خورشیدی ارائه
                                می‌دهد.
                            </li>
                            <li>
                                <strong>«پیمانکار»:</strong> شرکت یا فردی که
                                خدمات نصب، نگهداری یا راه‌اندازی سامانه‌های
                                خورشیدی را ارائه می‌کند.
                            </li>
                            <li>
                                <strong>«مدیریت سایت»:</strong> تیم یا شرکت مالک
                                و اداره‌کننده پلتفرم.
                            </li>
                        </ul>
                    </section>

                    <section
                        id="scope"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۳) حوزه فعالیت
                        </h2>
                        <p className="text-sm text-gray-700 leading-7">
                            این پلتفرم صرفاً به عنوان واسط ارتباطی بین مشتریان و
                            پیمانکاران عمل می‌کند و خود به صورت مستقیم اقدام به
                            نصب یا فروش تجهیزات نمی‌نماید؛ مگر در مواردی که به
                            صورت رسمی و شفاف اعلام شده باشد.
                        </p>
                    </section>

                    <section
                        id="account"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۴) ثبت‌نام و حساب کاربری
                        </h2>
                        <ul className="list-disc pr-5 text-sm text-gray-700 space-y-2">
                            <li>
                                کاربران موظف‌اند اطلاعات صحیح، کامل و به‌روز
                                ارائه دهند.
                            </li>
                            <li>
                                مسئولیت حفظ محرمانگی اطلاعات ورود (نام کاربری و
                                رمز عبور) بر عهده کاربر است.
                            </li>
                            <li>
                                مدیریت سایت می‌تواند در صورت تخلف، نقض قوانین یا
                                نگرانی‌های امنیتی، حساب کاربر را تعلیق یا حذف
                                کند.
                            </li>
                        </ul>
                    </section>

                    <section
                        id="process"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۵) فرآیند درخواست و انجام خدمات
                        </h2>
                        <ul className="list-disc pr-5 text-sm text-gray-700 space-y-2">
                            <li>
                                مشتری پس از ثبت درخواست، می‌تواند از بین
                                پیمانکاران پیشنهادی، گزینه مناسب را انتخاب کند.
                            </li>
                            <li>
                                جزئیات فنی و مالی پروژه بین مشتری و پیمانکار
                                توافق می‌شود. پلتفرم نقش تسهیل‌گر و مدیریت
                                فرآیند را دارد.
                            </li>
                            <li>
                                هرگونه تغییر در دامنه کار یا قیمت بایستی به
                                تأیید طرفین برسد.
                            </li>
                        </ul>
                    </section>

                    <section
                        id="obligations"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۶) تعهدات کاربران
                        </h2>
                        <ul className="list-disc pr-5 text-sm text-gray-700 space-y-2">
                            <li>
                                <strong>مشتری:</strong> ارائه اطلاعات دقیق،
                                فراهم‌کردن دسترسی‌های لازم در محل پروژه، و
                                پرداخت به‌موقع بر اساس شرایط توافق‌شده.
                            </li>
                            <li>
                                <strong>پیمانکار:</strong> اجرای کار مطابق
                                استانداردهای فنی، ارائه ضمانت‌های قانونی/فنی
                                لازم و تحویل به‌موقع.
                            </li>
                        </ul>
                    </section>

                    <section
                        id="liability"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۷) مسئولیت‌ها و محدودیت‌ها
                        </h2>
                        <ul className="list-disc pr-5 text-sm text-gray-700 space-y-2">
                            <li>
                                پلتفرم مسئول کیفیت، کمیت یا تأخیر خدمات
                                ارائه‌شده توسط پیمانکاران نیست؛ مگر در مواردی که
                                در اسناد رسمی پلتفرم به‌طور صریح تعهد شده باشد.
                            </li>
                            <li>
                                در صورت بروز اختلاف، پلتفرم می‌تواند برای
                                میانجی‌گری تلاش کند اما مسئولیت نهایی بر عهده
                                طرفین قرارداد است.
                            </li>
                            <li>
                                مسئولیت هرگونه خسارت ناشی از اطلاعات نادرست
                                ارائه‌شده توسط کاربران، بر عهده ارائه‌دهنده آن
                                اطلاعات است.
                            </li>
                        </ul>
                    </section>

                    <section
                        id="privacy"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۸) حریم خصوصی و حفاظت از داده‌ها
                        </h2>
                        <ul className="list-disc pr-5 text-sm text-gray-700 space-y-2">
                            <li>
                                اطلاعات کاربران مطابق سیاست حریم خصوصی پلتفرم
                                جمع‌آوری و استفاده می‌شود.
                            </li>
                            <li>
                                اطلاعات بدون رضایت کاربر یا حکم قانونی در اختیار
                                اشخاص ثالث قرار نخواهد گرفت.
                            </li>
                            <li>
                                کاربران می‌توانند درخواست ویرایش یا حذف اطلاعات
                                شخصی خود را مطابق قوانین اعمال کنند.
                            </li>
                        </ul>
                    </section>

                    <section
                        id="payments"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۹) پرداخت‌ها و کمیسیون‌ها
                        </h2>
                        <ul className="list-disc pr-5 text-sm text-gray-700 space-y-2">
                            <li>
                                نحوه پرداخت هزینه‌ها مطابق شرایط توافق شده بین
                                مشتری و پیمانکار است.
                            </li>
                            <li>
                                در صورت دریافت کارمزد/کمیسیون توسط پلتفرم، میزان
                                آن پیش از ثبت نهایی درخواست به‌طور شفاف اعلام
                                می‌شود.
                            </li>
                            <li>
                                صدور پیش‌فاکتور و فاکتور نهایی می‌تواند از طریق
                                سامانه انجام شود.
                            </li>
                        </ul>
                    </section>

                    <section
                        id="dispute"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۱۰) حل اختلاف
                        </h2>
                        <ul className="list-disc pr-5 text-sm text-gray-700 space-y-2">
                            <li>
                                ابتدا تلاش برای حل‌وفصل از طریق مذاکره مستقیم
                                میان طرفین صورت می‌گیرد.
                            </li>
                            <li>
                                در صورت عدم حصول نتیجه، موضوع به مراجع قانونی
                                صالح ارجاع خواهد شد.
                            </li>
                        </ul>
                    </section>

                    <section
                        id="changes"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۱۱) تغییر قوانین
                        </h2>
                        <p className="text-sm text-gray-700 leading-7">
                            مدیریت پلتفرم حق بروزرسانی یا تغییر این شرایط را
                            دارد. تغییرات از طریق وب‌سایت اطلاع‌رسانی می‌شود و
                            ادامه استفاده از خدمات به منزله پذیرش تغییرات خواهد
                            بود.
                        </p>
                    </section>

                    <section
                        id="law"
                        className="rounded-2xl bg-white p-6 neu-container"
                    >
                        <h2 className="mb-3 text-lg font-bold text-gray-900">
                            ۱۲) قانون حاکم
                        </h2>
                        <p className="text-sm text-gray-700 leading-7">
                            این شرایط تحت حاکمیت قوانین جمهوری اسلامی ایران است
                            و هرگونه دعوی در مراجع ذی‌صلاح ایران رسیدگی خواهد
                            شد.
                        </p>
                    </section>

                    {/* Footer note */}
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        <p>
                            <strong>توجه:</strong> این متن ماهیت عمومی دارد و
                            جایگزین مشاوره حقوقی تخصصی نیست. برای پروژه‌های بزرگ
                            یا شرایط خاص، دریافت مشاوره از وکیل توصیه می‌شود.
                        </p>
                    </div>
                </div>

                {/* Back to top */}
                <div className="mt-8 flex justify-end">
                    <a
                        href="#top"
                        className="text-sm text-emerald-700 hover:underline"
                    >
                        بازگشت به بالا
                    </a>
                </div>
            </div>
        </main>
    );
}
