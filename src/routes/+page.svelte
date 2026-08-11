<script lang="ts">
    import { slide, fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    let activeFaq: number | null = 0;
    let labelInView = false;
    let labelEl: HTMLElement;

    const labelRows = [
        { key: 'kısıtlama', label: 'Kısıtlama', target: 0, unit: 'g', note: 'Yasaklı besin yok' },
        { key: 'esneklik', label: 'Esneklik', target: 100, unit: '%', note: 'Yaşamınıza uyar' },
        { key: 'sureklilik', label: 'Süreklilik', target: 100, unit: '%', note: 'Geçici değil, kalıcı' },
        { key: 'ozgunluk', label: 'Kişiye Özgünlük', target: 1, unit: '/1', note: 'Sadece size özel' }
    ];
    let counts = labelRows.map(() => 0);

    function startCounters() {
        if (labelInView) return;
        labelInView = true;
        const duration = 1100;
        const start = performance.now();
        function step(now: number) {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            counts = labelRows.map((r) => Math.round(r.target * eased));
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    onMount(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) startCounters();
            },
            { threshold: 0.4 }
        );
        if (labelEl) obs.observe(labelEl);
        return () => obs.disconnect();
    });

    const services = [
        {
            tag: '01',
            title: 'Kişiye Özel Beslenme Planı',
            description:
                'Sağlık geçmişiniz, günlük ritminiz ve damak tadınıza göre kurgulanan, gerçekten uygulayabileceğiniz bir program.'
        },
        {
            tag: '02',
            title: 'Online Danışmanlık',
            description:
                'Şehir fark etmeksizin görüntülü görüşme, mesaj desteği ve düzenli ölçüm takibiyle sürecin her anında yanınızdayım.'
        },
        {
            tag: '03',
            title: 'Kilo Yönetimi',
            description:
                'Hızlı değil, kalıcı sonuç. Metabolizmanızı yormadan, esneklik payı bırakarak hedef kiloya güvenle ilerleyin.'
        },
        {
            tag: '04',
            title: 'Sindirim & Enerji Dengesi',
            description:
                'Şişkinlik, enerji düşüklüğü ve düzensiz iştah gibi şikayetleri kök nedenine inerek birlikte çözelim.'
        }
    ];

    const steps = [
        {
            number: '01',
            title: 'Ön Görüşme',
            description: 'Beslenme alışkanlıklarınızı, sağlık durumunuzu ve hedeflerinizi dinliyorum.'
        },
        {
            number: '02',
            title: 'Program Tasarımı',
            description: 'Sevdiğiniz besinleri koruyan, uygulanabilir kişisel planınızı hazırlıyorum.'
        },
        {
            number: '03',
            title: 'Takip & Uyarlama',
            description: 'Düzenli görüşmelerle programı yaşamınıza göre ince ayar yaparak sürdürüyoruz.'
        }
    ];

    const testimonials = [
        {
            text: 'Kendimi hiç bu kadar kısıtlanmamış hissetmemiştim. İlk kez bir program bu kadar hayatıma uydu.',
            name: 'Zeynep K.',
            result: '-8 kg / 4 ay'
        },
        {
            text: 'Seyahat eden biri olarak online takip beni gerçekten kurtardı, her yerden ulaşabildim.',
            name: 'Melis A.',
            result: 'Online süreç'
        },
        {
            text: 'Şişkinlik şikayetim geçti, enerjim arttı. Diyet değil gerçek bir düzen kurduk.',
            name: 'Elif T.',
            result: 'Sindirim dengesi'
        }
    ];

    const faqs = [
        {
            question: 'İlk görüşmede neler konuşuyoruz?',
            answer:
                'Sağlık geçmişiniz, yaşam düzeniniz, beslenme alışkanlıklarınız ve hedefleriniz üzerine konuşuyor, size özel bir yol haritası çıkarıyoruz.'
        },
        {
            question: 'Online süreç nasıl işliyor?',
            answer:
                'Görüşmeler görüntülü olarak yapılır. Ölçümleriniz ve beslenme kayıtlarınız düzenli olarak takip edilir, program buna göre güncellenir.'
        },
        {
            question: 'Sevdiğim yiyecekleri bırakmam gerekiyor mu?',
            answer:
                'Hayır. Amaç yasak listesi değil, sevdiğiniz besinlerle dengeli ve sürdürülebilir bir düzen kurmaktır.'
        },
        {
            question: 'Sonuçları ne zaman görmeye başlarım?',
            answer:
                'Bu süre metabolizma, sağlık durumu ve programa uyuma göre kişiden kişiye değişir; birlikte gerçekçi bir zaman çizelgesi belirleriz.'
        }
    ];

    const ingredients = [
        { name: 'Avokado', d: 'M12 3c4 0 6 4 6 9s-2.5 9-6 9-6-4-6-9 2-9 6-9z M9 10a3 3 0 106 0 3 3 0 00-6 0z' },
        { name: 'Yaprak', d: 'M4 20c8-1 14-7 15-15C11 6 5 12 4 20z M6 18c3-3 6-6 12-13' },
        { name: 'Tahıl', d: 'M12 2v20 M9 5c0 2 1 3 3 3s3-1 3-3 M9 10c0 2 1 3 3 3s3-1 3-3 M9 15c0 2 1 3 3 3s3-1 3-3' },
        { name: 'Balık', d: 'M3 12c4-5 12-6 18 0-6 6-14 5-18 0z M15 9l3-3 M15 15l3 3 M8 12h.01' },
        { name: 'Limon', d: 'M4 12a8 8 0 1116 0 8 8 0 01-16 0z M8 12h8 M12 8v8' },
        { name: 'Yumurta', d: 'M12 3C8 3 5 10 5 15a7 7 0 0014 0c0-5-3-12-7-12z' }
    ];

    function toggleFaq(index: number) {
        activeFaq = activeFaq === index ? null : index;
    }
</script>

<svelte:head>
    <title>Dyt. Ayşenur Doğan</title>
    <meta
            name="description"
            content="Kısıtlama değil denge. Kişiye özel beslenme planı, online diyet takibi ve sürdürülebilir kilo yönetimi."
    />
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

        <div class="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">
            <div class="hero-in">
                <div class="ticket inline-flex items-center gap-2 bg-[#242A1F] px-4 py-2 text-[#F7F1E2]">
                    <span class="h-2 w-2 rounded-full bg-[#E8B84B]"></span>
                    <span class="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase">Beslenme Danışmanlığı</span>
                </div>

                <h1 class="display mt-7 max-w-2xl text-[2.9rem] leading-[1.06] tracking-[-0.02em] sm:text-6xl lg:text-[4.4rem]">
                    Diyet listesi değil,
                    <span class="relative inline-block">
                        yaşam biçimi.
                        <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 14" fill="none">
                            <path d="M3 10C60 2 240 2 297 10" stroke="#E8B84B" stroke-width="5" stroke-linecap="round"/>
                        </svg>
                    </span>
                </h1>

                <p class="mt-7 max-w-xl text-lg leading-8 text-[#242A1F]/70">
                    Yasaklarla değil, dengeyle çalışıyoruz. Yaşamınıza uyan, sürdürülebilir bir
                    beslenme düzeniyle hedefinize sağlıklı adımlarla ulaşın.
                </p>

                <div class="mt-9 flex flex-col gap-4 sm:flex-row">
                    <a href="/iletisim" class="btn-primary group">
                        Ücretsiz Ön Görüşme
                        <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                    <a href="#hizmetler" class="btn-ghost">Hizmetleri İncele</a>
                </div>

                <div class="mt-11 flex flex-wrap items-center gap-6">
                    <div class="flex -space-x-3">
                        {#each ['Z', 'M', 'E', 'A'] as letter}
                            <span class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F7F1E2] bg-[#4B5D3A] font-mono text-xs font-bold text-[#F7F1E2]">{letter}</span>
                        {/each}
                    </div>
                    <p class="text-sm font-semibold text-[#242A1F]/60">200+ danışanın tercih ettiği süreç</p>
                </div>
            </div>

            <div class="relative mx-auto w-full max-w-[400px] label-in" bind:this={labelEl}>
                <div class="absolute -inset-3 rotate-2 rounded-sm bg-[#242A1F]/5"></div>
                <div class="relative rounded-sm border-[3px] border-[#242A1F] bg-[#FCFAF2] p-6 shadow-[10px_10px_0_0_#242A1F]">
                    <p class="display text-3xl font-bold tracking-tight">Yaşam Etiketi</p>
                    <p class="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-[#242A1F]/60">Porsiyon: 1 danışan / ömür boyu</p>

                    <div class="my-4 h-2 w-full bg-[#242A1F]"></div>

                    {#each labelRows as row, i}
                        <div class="flex items-baseline justify-between border-b border-dashed border-[#242A1F]/25 py-2.5 {i === 0 ? 'border-t border-solid border-[#242A1F] pt-3' : ''}">
                            <div>
                                <p class="font-semibold">{row.label}</p>
                                <p class="text-xs text-[#242A1F]/55">{row.note}</p>
                            </div>
                            <p class="display text-2xl font-bold tabular-nums">{counts[i]}{row.unit}</p>
                        </div>
                    {/each}

                    <div class="mt-4 h-1.5 w-full bg-[#242A1F]"></div>
                    <p class="mt-3 text-[11px] leading-5 text-[#242A1F]/55">
                        * Günlük değerler kişiye göre hesaplanır. Sabit reçete, standart liste ve genel kalıp içermez.
                    </p>
                </div>

                <div class="stamp absolute -right-5 -top-5 flex h-20 w-20 rotate-12 items-center justify-center rounded-full border-2 border-[#8C3B3B] text-center font-mono text-[9px] font-bold uppercase leading-tight text-[#8C3B3B]">
                    Onaylı<br/>Denge
                </div>
            </div>
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

    <section class="px-4 py-16 sm:px-6 lg:px-10">
        <div class="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-dashed divide-[#242A1F]/20 lg:grid-cols-4 lg:divide-x">
            {#each [
                ['0', 'Yasaklı besin'],
                ['%100', 'Kişiye özel program'],
                ['7/24', 'Mesaj desteği'],
                ['3', 'Adımda süreç']
            ] as stat, i}
                <div class="px-5 py-6 text-center {i >= 2 ? 'lg:border-t-0' : ''} {i % 2 === 1 ? 'border-l' : ''}">
                    <p class="display text-4xl font-bold text-[#4B5D3A]">{stat[0]}</p>
                    <p class="mt-2 font-mono text-xs font-semibold uppercase tracking-[0.13em] text-[#242A1F]/55">{stat[1]}</p>
                </div>
            {/each}
        </div>
    </section>

    <section id="hizmetler" class="px-4 py-20 sm:px-6 lg:px-10">
        <div class="mx-auto max-w-7xl">
            <div class="max-w-2xl">
                <span class="eyebrow">Hizmetler</span>
                <h2 class="display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Nasıl birlikte çalışıyoruz</h2>
                <p class="mt-5 text-lg leading-8 text-[#242A1F]/65">Her yaşam biçimi farklıdır — süreç de öyle olmalı.</p>
            </div>

            <div class="mt-12 grid gap-5 md:grid-cols-2">
                {#each services as service}
                    <article class="card-recipe group relative overflow-hidden bg-[#FCFAF2] p-8">
                        <span class="pin absolute right-6 top-0 flex h-8 w-6 items-center justify-center rounded-b-full bg-[#8C3B3B]"></span>
                        <span class="font-mono text-xs font-bold tracking-[0.2em] text-[#4B5D3A]">FİŞ NO. {service.tag}</span>
                        <h3 class="display mt-4 text-2xl font-bold">{service.title}</h3>
                        <p class="mt-3 leading-7 text-[#242A1F]/65">{service.description}</p>
                        <a href="/iletisim" class="mt-6 inline-flex items-center gap-2 font-semibold text-[#4B5D3A] underline decoration-[#E8B84B] decoration-2 underline-offset-4 transition-colors group-hover:text-[#242A1F]">
                            Detaylı bilgi
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
        <div class="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
            <div class="order-2 lg:order-1">
                <span class="eyebrow">Yaklaşımım</span>
                <h2 class="display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                    Kısıtlama değil, <span class="text-[#4B5D3A]">denge.</span>
                </h2>
                <p class="mt-6 text-lg leading-8 text-[#242A1F]/65">
                    Amacım geçici bir liste vermek değil, bedeninizi tanımanızı ve doğru
                    seçimleri hayatınızın doğal bir parçası hâline getirmenizi sağlamak.
                </p>

                <div class="mt-8 space-y-3">
                    {#each [
                        'Yasaksız, esnek beslenme yaklaşımı',
                        'Günlük yaşamınıza uygun, uygulanabilir plan',
                        'Düzenli takip ve gerçekçi hedefler',
                        'Kalıcı, sürdürülebilir alışkanlıklar'
                    ] as feature}
                        <div class="flex items-center gap-4 border-b border-dashed border-[#242A1F]/20 pb-3">
                            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4B5D3A] text-[#F7F1E2]">
                                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                            </span>
                            <span class="font-semibold">{feature}</span>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="order-1 mx-auto lg:order-2">
                <div class="plate relative h-72 w-72 rounded-full border-[3px] border-[#242A1F] sm:h-80 sm:w-80">
                    <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#B7C79A" stroke-width="8" stroke-dasharray="144.5 289" stroke-dashoffset="0" />
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#E8B84B" stroke-width="8" stroke-dasharray="72.25 289" stroke-dashoffset="-144.5" />
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#8C3B3B" stroke-width="8" stroke-dasharray="72.25 289" stroke-dashoffset="-216.75" />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p class="display text-lg font-bold leading-tight">Dengeli<br/>Tabak</p>
                    </div>
                </div>
                <div class="mt-6 flex justify-center gap-5 font-mono text-xs font-semibold uppercase tracking-wide">
                    <span class="flex items-center gap-2"><i class="h-2.5 w-2.5 rounded-full bg-[#B7C79A]"></i>Sebze %50</span>
                    <span class="flex items-center gap-2"><i class="h-2.5 w-2.5 rounded-full bg-[#E8B84B]"></i>Karbonhidrat %25</span>
                    <span class="flex items-center gap-2"><i class="h-2.5 w-2.5 rounded-full bg-[#8C3B3B]"></i>Protein %25</span>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-20 sm:px-6 lg:px-10">
        <div class="mx-auto max-w-7xl">
            <div class="max-w-2xl">
                <span class="eyebrow">Süreç</span>
                <h2 class="display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Üç adımlık yolculuk</h2>
            </div>

            <div class="mt-12 grid gap-6 lg:grid-cols-3">
                {#each steps as step, i}
                    <div class="ticket-stub relative bg-[#FCFAF2] p-8">
                        <span class="display text-5xl font-bold text-[#4B5D3A]/25">{step.number}</span>
                        <h3 class="display mt-3 text-2xl font-bold">{step.title}</h3>
                        <p class="mt-3 leading-7 text-[#242A1F]/65">{step.description}</p>
                        {#if i < steps.length - 1}
                            <svg class="absolute -right-8 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-[#242A1F]/30 lg:block" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <section class="px-4 py-20 sm:px-6 lg:px-10">
        <div class="mx-auto max-w-7xl">
            <div class="max-w-2xl">
                <span class="eyebrow">Danışan Deneyimleri</span>
                <h2 class="display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Onların sözleriyle</h2>
            </div>

            <div class="mt-12 grid gap-8 lg:grid-cols-3">
                {#each testimonials as t, i}
                    <article class="note-card relative bg-[#FCFAF2] p-7 {i === 1 ? 'lg:-translate-y-3' : ''}">
                        <svg class="h-7 w-7 text-[#E8B84B]" viewBox="0 0 24 24" fill="currentColor"><path d="M9 7c-3 0-5 2.5-5 6 0 3 2 5 4.5 5S13 16 13 13c0-2-1.5-3.5-3-3.5.3-1.5 1.5-2.5 3-2.5V5C10.5 5 9 5.8 9 7zm10 0c-3 0-5 2.5-5 6 0 3 2 5 4.5 5s4.5-2 4.5-5c0-2-1.5-3.5-3-3.5.3-1.5 1.5-2.5 3-2.5V5c-2.5 0-4 .8-4 2z"/></svg>
                        <p class="display mt-4 text-lg italic leading-8">{t.text}</p>
                        <div class="mt-6 flex items-center justify-between border-t border-dashed border-[#242A1F]/20 pt-4">
                            <p class="font-mono text-xs font-bold uppercase tracking-wide">{t.name}</p>
                            <p class="font-mono text-xs font-semibold text-[#4B5D3A]">{t.result}</p>
                        </div>
                    </article>
                {/each}
            </div>
        </div>
    </section>

    <section class="px-4 py-20 sm:px-6 lg:px-10">
        <div class="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
                <span class="eyebrow">Merak Edilenler</span>
                <h2 class="display mt-5 text-4xl font-bold tracking-tight">Sıkça sorulan sorular</h2>
                <p class="mt-5 leading-7 text-[#242A1F]/65">Sürece dair merak ettiklerinizin cevapları burada.</p>
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
                    <span class="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">İlk adımı bugün atın</span>
                </span>
                <h2 class="display mt-6 text-4xl font-bold tracking-tight text-[#F7F1E2] sm:text-5xl lg:text-6xl">
                    En sağlıklı hâlinize birlikte ulaşalım.
                </h2>
                <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#F7F1E2]/70">
                    Hedeflerinizi konuşmak ve size uygun süreci belirlemek için iletişime geçin.
                </p>
                <a href="/iletisim" class="mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-sm bg-[#E8B84B] px-8 font-bold text-[#242A1F] shadow-[6px_6px_0_0_#F7F1E2] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#F7F1E2]">
                    Randevunuzu Oluşturun
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

    .note-card {
        border: 2px solid #242A1F;
        box-shadow: 4px 4px 0 0 #242A1F;
        transition: transform 300ms ease;
    }
    .note-card:hover {
        transform: rotate(-1deg) translateY(-4px);
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
    .label-in {
        animation: labelIn 900ms 150ms cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    .plate {
        animation: plateIn 900ms 200ms cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes heroIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes labelIn {
        from { opacity: 0; transform: translateY(30px) rotate(0deg) scale(0.96); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes plateIn {
        from { opacity: 0; transform: scale(0.85) rotate(-8deg); }
        to { opacity: 1; transform: scale(1) rotate(0deg); }
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
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
            scroll-behavior: auto;
            transition-duration: 0.01ms;
        }
    }
</style>