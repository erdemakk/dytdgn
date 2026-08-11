<script lang="ts">
    import { slide } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let activeFaq: number | null = 0;
    function toggleFaq(index: number) {
        activeFaq = activeFaq === index ? null : index;
    }

    const ingredients = [
        { name: 'Avokado', d: 'M12 3c4 0 6 4 6 9s-2.5 9-6 9-6-4-6-9 2-9 6-9z M9 10a3 3 0 106 0 3 3 0 00-6 0z' },
        { name: 'Yaprak', d: 'M4 20c8-1 14-7 15-15C11 6 5 12 4 20z M6 18c3-3 6-6 12-13' },
        { name: 'Tahıl', d: 'M12 2v20 M9 5c0 2 1 3 3 3s3-1 3-3 M9 10c0 2 1 3 3 3s3-1 3-3 M9 15c0 2 1 3 3 3s3-1 3-3' },
        { name: 'Balık', d: 'M3 12c4-5 12-6 18 0-6 6-14 5-18 0z M15 9l3-3 M15 15l3 3 M8 12h.01' },
        { name: 'Limon', d: 'M4 12a8 8 0 1116 0 8 8 0 01-16 0z M8 12h8 M12 8v8' },
        { name: 'Yumurta', d: 'M12 3C8 3 5 10 5 15a7 7 0 0014 0c0-5-3-12-7-12z' }
    ];

    const services = [
        {
            tag: '01',
            title: 'Kişiye Özel Beslenme Planı',
            description: 'Sağlık geçmişiniz, günlük ritminiz ve damak tadınıza göre kurgulanan, gerçekten uygulayabileceğiniz bir program.',
            features: ['Detaylı sağlık ve alışkanlık analizi', 'Sevdiğiniz besinlerle uyumlu menü', 'Yazılı ve görsel program dosyası']
        },
        {
            tag: '02',
            title: 'Online Danışmanlık',
            description: 'Şehir fark etmeksizin görüntülü görüşme, mesaj desteği ve düzenli ölçüm takibiyle sürecin her anında yanınızdayım.',
            features: ['Haftalık görüntülü görüşme', 'Uygulama üzerinden mesaj desteği', 'Düzenli ölçüm ve fotoğraf takibi']
        },
        {
            tag: '03',
            title: 'Kilo Yönetimi',
            description: 'Hızlı değil, kalıcı sonuç. Metabolizmanızı yormadan, esneklik payı bırakarak hedef kiloya güvenle ilerleyin.',
            features: ['Metabolizma dostu kalori planı', 'Esneklik günleri ve sosyal ortam desteği', 'Plato dönemlerinde program revizyonu']
        },
        {
            tag: '04',
            title: 'Sindirim & Enerji Dengesi',
            description: 'Şişkinlik, enerji düşüklüğü ve düzensiz iştah gibi şikayetleri kök nedenine inerek birlikte çözelim.',
            features: ['Şişkinlik ve intolerans değerlendirmesi', 'Bağırsak dostu beslenme protokolü', 'Enerji ve uyku düzeni takibi']
        },
        {
            tag: '05',
            title: 'Sporcu Beslenmesi',
            description: 'Performansınızı destekleyen, antrenman yüküne göre uyarlanan bir beslenme stratejisi kuralım.',
            features: ['Antrenman öncesi/sonrası beslenme', 'Performans ve toparlanma takibi', 'Supplement ihtiyacı değerlendirmesi']
        },
        {
            tag: '06',
            title: 'Gebelik & Emzirme Dönemi',
            description: 'Bu özel dönemde hem sizin hem bebeğinizin ihtiyaç duyduğu dengeli beslenmeyi birlikte planlayalım.',
            features: ['Trimestere özel besin planı', 'Doktor önerileriyle uyumlu takip', 'Emzirme dönemi enerji desteği']
        }
    ];

    const packages = [
        {
            name: 'Tek Seferlik Danışmanlık',
            desc: 'İlk kez danışmanlık almak isteyenler ya da tek bir yol haritasına ihtiyaç duyanlar için.',
            features: ['1 detaylı ön görüşme', 'Kişiye özel beslenme planı', '2 hafta mesaj desteği'],
            featured: false
        },
        {
            name: 'Aylık Takip Paketi',
            desc: 'Düzenli takip ve motivasyon desteğiyle süreci birlikte yönetmek isteyenler için.',
            features: ['Haftalık görüntülü görüşme', 'Sınırsız mesaj desteği', 'Program güncellemeleri', 'Ölçüm ve gelişim takibi'],
            featured: true
        },
        {
            name: '3 Aylık Dönüşüm Programı',
            desc: 'Kalıcı alışkanlık değişimi hedefleyen, uzun soluklu bir dönüşüm isteyenler için.',
            features: ['Aylık paketin tüm içeriği', '3 ay boyunca kesintisiz takip', 'Plato ve tatil dönemi planlaması', 'Süreç sonu değerlendirme raporu'],
            featured: false
        }
    ];

    const faqs = [
        { question: 'Hangi hizmeti seçeceğimi nasıl bilebilirim?', answer: 'Ücretsiz ön görüşmede hedeflerinizi ve yaşam düzeninizi birlikte değerlendirip size en uygun hizmeti öneririm.' },
        { question: 'Paketler arasında geçiş yapabilir miyim?', answer: 'Evet. Süreç içinde ihtiyacınız değişirse paketinizi birlikte güncelleyebiliriz.' },
        { question: 'Randevular ne sıklıkla yapılıyor?', answer: 'Bu, seçtiğiniz pakete göre değişir; genellikle haftalık veya iki haftalık görüşmelerle ilerliyoruz.' },
        { question: 'Ödeme ve iptal koşulları nasıl?', answer: 'Ön görüşmede tüm ödeme ve iptal koşulları netçe paylaşılır, sürpriz ücret bulunmaz.' }
    ];
</script>

<svelte:head>
    <title>Hizmetler | Dyt. Ayşenur Doğan</title>
    <meta name="description" content="Kişiye özel beslenme planı, online danışmanlık, kilo yönetimi ve daha fazlası." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Work+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap"
            rel="stylesheet"
    />
</svelte:head>

<main class="page overflow-hidden bg-[#F7F1E2] text-[#242A1F]">
    <section class="relative px-4 pb-16 pt-32 sm:px-6 lg:px-10 lg:pt-40">
        <div class="pointer-events-none absolute -left-32 top-16 h-105 w-105 rounded-full bg-[#B7C79A]/35 blur-[110px]"></div>
        <div class="pointer-events-none absolute -right-40 top-1/2 h-115 w-115 rounded-full bg-[#E8B84B]/20 blur-[120px]"></div>

        <div class="relative mx-auto max-w-4xl text-center hero-in">
            <div class="flex items-center justify-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[#242A1F]/50">
                <a href="/" class="hover:text-[#4B5D3A]">Ana Sayfa</a>
                <span>/</span>
                <span class="text-[#4B5D3A]">Hizmetler</span>
            </div>

            <div class="ticket mx-auto mt-6 inline-flex items-center gap-2 bg-[#242A1F] px-4 py-2 text-[#F7F1E2]">
                <span class="h-2 w-2 rounded-full bg-[#E8B84B]"></span>
                <span class="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase">Hizmetlerimiz</span>
            </div>

            <h1 class="display mx-auto mt-7 max-w-3xl text-[2.6rem] leading-[1.08] tracking-[-0.02em] sm:text-6xl lg:text-[4rem]">
                Size en uygun programı
                <span class="relative inline-block">
                    birlikte seçelim.
                    <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 14" fill="none">
                        <path d="M3 10C60 2 240 2 297 10" stroke="#E8B84B" stroke-width="5" stroke-linecap="round"/>
                    </svg>
                </span>
            </h1>

            <p class="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#242A1F]/70">
                Kişiye özel beslenme planından online takibe, kilo yönetiminden özel dönem
                beslenmesine kadar ihtiyacınıza uygun hizmeti burada bulacaksınız.
            </p>
        </div>
    </section>

    <div class="relative overflow-hidden border-y border-[#242A1F]/12 bg-[#EFE7D2] py-6">
        <div class="marquee flex w-max items-center gap-16">
            {#each [...ingredients, ...ingredients, ...ingredients] as ing}
                <div class="flex items-center gap-3 opacity-70">
                    <svg class="h-7 w-7 shrink-0 text-[#4B5D3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                        <path d={ing.d} />
                    </svg>
                    <span class="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[#242A1F]/50">{ing.name}</span>
                </div>
            {/each}
        </div>
    </div>

    <section class="px-4 py-20 sm:px-6 lg:px-10">
        <div class="mx-auto max-w-7xl">
            <div class="max-w-2xl">
                <span class="eyebrow">Neler Sunuyorum</span>
                <h2 class="display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Altı alanda uzman destek</h2>
                <p class="mt-5 text-lg leading-8 text-[#242A1F]/65">Her hizmet, ön görüşmede belirlediğimiz hedefe göre şekillenir.</p>
            </div>

            <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {#each services as service}
                    <article class="card-recipe group relative overflow-hidden bg-[#FCFAF2] p-7">
                        <span class="pin absolute right-6 top-0 flex h-8 w-6 items-center justify-center rounded-b-full bg-[#8C3B3B]"></span>
                        <span class="font-mono text-xs font-bold tracking-[0.2em] text-[#4B5D3A]">FİŞ NO. {service.tag}</span>
                        <h3 class="display mt-4 text-xl font-bold">{service.title}</h3>
                        <p class="mt-3 leading-7 text-[#242A1F]/65">{service.description}</p>

                        <ul class="mt-5 space-y-2 border-t border-dashed border-[#242A1F]/20 pt-4">
                            {#each service.features as feature}
                                <li class="flex items-start gap-2 text-sm font-semibold text-[#242A1F]/75">
                                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#4B5D3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                                    {feature}
                                </li>
                            {/each}
                        </ul>

                        <a href="/iletisim" class="mt-6 inline-flex items-center gap-2 font-semibold text-[#4B5D3A] underline decoration-[#E8B84B] decoration-2 underline-offset-4 transition-colors group-hover:text-[#242A1F]">
                            Bu hizmeti iste
                            <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </article>
                {/each}
            </div>
        </div>
    </section>

    <section class="px-4 py-20 sm:px-6 lg:px-10">
        <div class="mx-auto max-w-7xl">
            <div class="max-w-2xl">
                <span class="eyebrow">Paketler</span>
                <h2 class="display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Size uygun süreci seçin</h2>
                <p class="mt-5 text-lg leading-8 text-[#242A1F]/65">Tüm paketler ön görüşme sonrası kişiselleştirilir.</p>
            </div>

            <div class="mt-12 grid gap-6 lg:grid-cols-3">
                {#each packages as pkg}
                    <div class="ticket-stub relative bg-[#FCFAF2] p-8" class:featured-pkg={pkg.featured}>
                        {#if pkg.featured}
                            <div class="stamp absolute -right-5 -top-5 flex h-20 w-20 rotate-12 items-center justify-center rounded-full border-2 border-[#8C3B3B] text-center font-mono text-[9px] font-bold uppercase leading-tight text-[#8C3B3B]">
                                En Çok<br/>Tercih Edilen
                            </div>
                        {/if}

                        <h3 class="display text-2xl font-bold">{pkg.name}</h3>
                        <p class="mt-3 leading-7 text-[#242A1F]/65">{pkg.desc}</p>

                        <ul class="mt-6 space-y-2.5 border-t border-dashed border-[#242A1F]/20 pt-5">
                            {#each pkg.features as feature}
                                <li class="flex items-start gap-2 text-sm font-semibold text-[#242A1F]/75">
                                    <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#4B5D3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                                    {feature}
                                </li>
                            {/each}
                        </ul>

                        <a href="/iletisim" class="mt-7 w-full" class:btn-primary={pkg.featured} class:btn-ghost={!pkg.featured}>
                            Bu Paketi Seç
                        </a>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <section class="px-4 py-20 sm:px-6 lg:px-10">
        <div class="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
                <span class="eyebrow">Merak Edilenler</span>
                <h2 class="display mt-5 text-4xl font-bold tracking-tight">Hizmetlerle ilgili sorular</h2>
                <p class="mt-5 leading-7 text-[#242A1F]/65">Hangi hizmetin size uygun olduğuna dair merak ettiklerinizin cevapları burada.</p>
                <a href="/iletisim" class="mt-7 inline-flex items-center gap-2 font-semibold text-[#4B5D3A] underline decoration-[#E8B84B] decoration-2 underline-offset-4">
                    Başka bir sorum var
                </a>
            </div>

            <div class="space-y-3">
                {#each faqs as faq, index}
                    <article class="overflow-hidden border-2 border-[#242A1F] bg-[#FCFAF2] transition-shadow duration-300 {activeFaq === index ? 'shadow-[6px_6px_0_0_#242A1F]' : ''}">
                        <button type="button" on:click={() => toggleFaq(index)} aria-expanded={activeFaq === index} class="flex w-full items-center justify-between gap-5 px-6 py-5 text-left">
                            <span class="text-lg font-bold">{faq.question}</span>
                            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#242A1F] transition-transform duration-300 {activeFaq === index ? 'rotate-45 bg-[#242A1F] text-[#F7F1E2]' : ''}">
                                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 5v14M5 12h14"/></svg>
                            </span>
                        </button>
                        {#if activeFaq === index}
                            <div transition:slide={{ duration: 300, easing: cubicOut }} class="px-6 pb-6">
                                <p class="border-t border-dashed border-[#242A1F]/25 pt-4 leading-7 text-[#242A1F]/65">{faq.answer}</p>
                            </div>
                        {/if}
                    </article>
                {/each}
            </div>
        </div>
    </section>

    <section class="px-4 pb-20 pt-6 sm:px-6 lg:px-10">
        <div class="relative mx-auto max-w-7xl overflow-hidden rounded-sm bg-[#242A1F] px-6 py-16 text-center sm:px-12 sm:py-20">
            <div class="absolute inset-0 overflow-hidden opacity-20">
                <div class="marquee-rev flex w-max items-center gap-16 py-2">
                    {#each [...ingredients, ...ingredients, ...ingredients] as ing}
                        <svg class="h-10 w-10 shrink-0 text-[#E8B84B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d={ing.d} /></svg>
                    {/each}
                </div>
            </div>

            <div class="relative mx-auto max-w-2xl">
                <span class="ticket inline-flex items-center gap-2 bg-[#F7F1E2] px-4 py-2 text-[#242A1F]">
                    <span class="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">Hangi hizmet size uygun, konuşalım</span>
                </span>
                <h2 class="display mt-6 text-4xl font-bold tracking-tight text-[#F7F1E2] sm:text-5xl lg:text-6xl">
                    Ücretsiz ön görüşmeyle başlayalım.
                </h2>
                <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#F7F1E2]/70">
                    Hedeflerinizi konuşup size en uygun hizmeti birlikte belirleyelim.
                </p>
                <a href="/iletisim" class="mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-sm bg-[#E8B84B] px-8 font-bold text-[#242A1F] shadow-[6px_6px_0_0_#F7F1E2] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#F7F1E2]">
                    Ücretsiz Ön Görüşme
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>
            </div>
        </div>
    </section>
</main>

<style>
    :global(html) {
        scroll-behavior: smooth;
    }

    .page {
        font-family: 'Work Sans', system-ui, sans-serif;
    }

    .display {
        font-family: 'Fraunces', serif;
        font-optical-sizing: auto;
    }

    .eyebrow {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #4B5D3A;
        border-bottom: 2px solid #E8B84B;
        padding-bottom: 6px;
    }

    .ticket {
        clip-path: polygon(0% 20%, 4% 0%, 96% 0%, 100% 20%, 100% 80%, 96% 100%, 4% 100%, 0% 80%);
        border-radius: 2px;
    }

    .btn-primary {
        display: inline-flex;
        min-height: 3.5rem;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        border-radius: 2px;
        background: #4B5D3A;
        color: #F7F1E2;
        padding: 0 2rem;
        font-weight: 700;
        box-shadow: 6px 6px 0 0 #242A1F;
        transition: all 300ms ease;
    }
    .btn-primary:hover {
        transform: translate(-2px, -2px);
        box-shadow: 8px 8px 0 0 #242A1F;
    }

    .btn-ghost {
        display: inline-flex;
        min-height: 3.5rem;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        border-radius: 2px;
        border: 2px solid #242A1F;
        padding: 0 2rem;
        font-weight: 700;
        transition: all 300ms ease;
    }
    .btn-ghost:hover {
        background: #242A1F;
        color: #F7F1E2;
    }

    .card-recipe {
        border: 2px solid #242A1F;
        box-shadow: 5px 5px 0 0 #242A1F;
        transition: transform 300ms ease, box-shadow 300ms ease;
    }
    .card-recipe:hover {
        transform: translate(-3px, -3px);
        box-shadow: 8px 8px 0 0 #242A1F;
    }
    .pin {
        box-shadow: 5px 5px 0 0 #242A1F;
    }

    .ticket-stub {
        border: 2px dashed #242A1F;
        transition: transform 300ms ease;
    }
    .ticket-stub:hover {
        transform: translateY(-4px);
    }
    .featured-pkg {
        border-style: solid;
        box-shadow: 6px 6px 0 0 #8C3B3B;
    }

    .stamp {
        background: #F7F1E2;
        box-shadow: 0 0 0 3px #F7F1E2;
        animation: stampPulse 3.5s ease-in-out infinite;
    }

    .marquee {
        animation: scrollLeft 32s linear infinite;
    }
    .marquee-rev {
        animation: scrollRight 40s linear infinite;
    }

    .hero-in {
        animation: heroIn 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes heroIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes stampPulse {
        0%, 100% { transform: rotate(12deg) scale(1); }
        50% { transform: rotate(12deg) scale(1.06); }
    }
    @keyframes scrollLeft {
        from { transform: translateX(0); }
        to { transform: translateX(-33.333%); }
    }
    @keyframes scrollRight {
        from { transform: translateX(-33.333%); }
        to { transform: translateX(0); }
    }

    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
        }
    }
</style>