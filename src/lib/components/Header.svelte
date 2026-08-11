<script lang="ts">
    import { slide, fade, fly } from 'svelte/transition';
    import { cubicOut, sineInOut } from 'svelte/easing';

    let isMenuOpen = false;
    let y = 0;

    const menuItems = [
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Hakkımda', href: '/hakkimda' },
        { label: 'Hizmetler', href: '/services' }
    ];

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }
</script>

<svelte:window bind:scrollY={y} />

<header class="fixed top-0 left-0 z-50 w-full font-sans transition-all duration-500 {y > 20 ? 'py-2' : 'py-4'}">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
                class="header-bar group relative flex min-h-[80px] items-center justify-between gap-5 border-2 border-[#242A1F] bg-[#FCFAF2]/95 px-5 backdrop-blur-md transition-all duration-500 sm:px-6 {y > 20 ? 'shadow-[5px_5px_0_0_#242A1F]' : 'shadow-[7px_7px_0_0_#242A1F]'}"
        >
            <!-- ambient drifting grain texture, quiet -->
            <div class="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]" style="background-image: radial-gradient(#242A1F 1px, transparent 1px); background-size: 16px 16px;"></div>

            <!-- perforation strip along the top, ticket motif -->
            <div class="pointer-events-none absolute -top-[1px] left-8 right-8 hidden h-[1px] border-t-2 border-dashed border-[#242A1F]/25 sm:block"></div>

            <a href="/" class="group/logo relative z-10 flex min-w-0 shrink-0 items-center gap-3 sm:gap-4">
                <div class="relative shrink-0">
                    <!-- rotating dashed "seal" ring behind the logo -->
                    <svg class="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] animate-[spinSlow_14s_linear_infinite] text-[#4B5D3A]/50" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="47" stroke="currentColor" stroke-width="2" stroke-dasharray="6 7" />
                    </svg>

                    <div class="relative rounded-full border-2 border-[#242A1F] bg-[#F7F1E2] p-[2px]">
                        <img src="/images/logo.jpeg" alt="Dyt. Ayşenur Doğan" class="h-11 w-11 rounded-full object-cover transition-transform duration-500 group-hover/logo:rotate-6 group-hover/logo:scale-110 sm:h-12 sm:w-12" />
                    </div>

                    <span class="absolute -right-0.5 -bottom-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#F7F1E2] bg-[#E8B84B]">
                        <span class="absolute inset-0 animate-ping rounded-full bg-[#E8B84B] opacity-60"></span>
                    </span>
                </div>

                <div class="min-w-0">
                    <div class="display whitespace-nowrap text-lg font-bold tracking-tight text-[#242A1F] sm:text-xl">
                        Dyt. Ayşenur Doğan
                    </div>

                    <div class="mt-0.5 flex items-center gap-2">
                        <span class="h-px w-4 bg-[#E8B84B] transition-all duration-500 group-hover/logo:w-8"></span>
                        <span class="truncate font-mono text-[9px] font-bold tracking-[0.2em] text-[#4B5D3A] uppercase sm:text-[10px]">
                            Beslenme Danışmanlığı
                        </span>
                    </div>
                </div>
            </a>

            <div class="relative z-10 ml-auto hidden items-center gap-4 lg:flex">
                <nav class="flex items-center gap-1">
                    {#each menuItems as item}
                        <a href={item.href} class="nav-link relative px-4 py-2 font-semibold text-[#242A1F]">
                            {item.label}
                        </a>
                    {/each}
                </nav>

                <a href="/iletisim" class="btn-appt group/button relative flex items-center gap-3 overflow-hidden whitespace-nowrap border-2 border-[#242A1F] bg-[#4B5D3A] px-6 py-3 font-bold text-[#F7F1E2] shadow-[4px_4px_0_0_#242A1F] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#242A1F]">
                    <span class="relative z-10">Randevu Al</span>
                    <span class="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#F7F1E2]/20 transition-transform duration-300 group-hover/button:translate-x-1">
                        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                </a>
            </div>

            <button on:click={toggleMenu} aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={isMenuOpen} class="relative z-10 ml-auto flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[#242A1F] bg-[#F7F1E2] text-[#242A1F] transition-all duration-300 hover:bg-[#242A1F] hover:text-[#F7F1E2] active:scale-95 lg:hidden">
                <div class="relative flex w-5 flex-col items-end gap-1.5">
                    <span class="h-0.5 rounded-full bg-current transition-all duration-300 {isMenuOpen ? 'w-5 translate-y-2 rotate-45' : 'w-5'}"></span>
                    <span class="h-0.5 rounded-full bg-current transition-all duration-300 {isMenuOpen ? 'w-0 opacity-0' : 'w-3.5'}"></span>
                    <span class="h-0.5 rounded-full bg-current transition-all duration-300 {isMenuOpen ? 'w-5 -translate-y-2 -rotate-45' : 'w-4'}"></span>
                </div>
            </button>
        </div>
    </div>

    {#if isMenuOpen}
        <div transition:slide={{ duration: 350, easing: sineInOut }} class="absolute top-full left-0 w-full px-4 pt-2 lg:hidden">
            <!-- mobile menu styled like a torn receipt -->
            <div class="receipt relative mx-auto max-w-7xl border-2 border-[#242A1F] bg-[#FCFAF2] p-5 shadow-[6px_6px_0_0_#242A1F]">
                <p class="font-mono text-[10px] font-bold tracking-[0.2em] text-[#4B5D3A]/70 uppercase">— Menü —</p>

                <nav class="relative z-10 mt-3 flex flex-col">
                    {#each menuItems as item, index}
                        <a
                                href={item.href}
                                on:click={closeMenu}
                                in:fly={{ x: -20, delay: 50 + index * 70, duration: 300, easing: cubicOut }}
                                out:fade={{ duration: 120 }}
                                class="group/mobile flex items-center justify-between border-b border-dashed border-[#242A1F]/25 py-3.5 text-lg font-bold text-[#242A1F] transition-all duration-300 last:border-b-0 hover:pl-2 hover:text-[#4B5D3A]"
                        >
                            {item.label}
                            <svg class="h-5 w-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover/mobile:translate-x-0 group-hover/mobile:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    {/each}
                </nav>

                <div in:fly={{ y: 15, delay: 260, duration: 350, easing: cubicOut }} class="relative z-10 mt-4 border-t-2 border-dashed border-[#242A1F]/25 pt-4">
                    <a href="/iletisim" on:click={closeMenu} class="flex w-full items-center justify-center gap-3 border-2 border-[#242A1F] bg-[#4B5D3A] py-3.5 text-lg font-bold text-[#F7F1E2] shadow-[4px_4px_0_0_#242A1F] transition-all duration-300 active:scale-[0.98]">
                        Hemen Randevu Al
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>

                <!-- torn-edge bottom -->
                <svg class="absolute -bottom-[9px] left-0 h-[10px] w-full text-[#F7F1E2]" viewBox="0 0 400 10" preserveAspectRatio="none" fill="currentColor">
                    <path d="M0 0 L10 10 L20 0 L30 10 L40 0 L50 10 L60 0 L70 10 L80 0 L90 10 L100 0 L110 10 L120 0 L130 10 L140 0 L150 10 L160 0 L170 10 L180 0 L190 10 L200 0 L210 10 L220 0 L230 10 L240 0 L250 10 L260 0 L270 10 L280 0 L290 10 L300 0 L310 10 L320 0 L330 10 L340 0 L350 10 L360 0 L370 10 L380 0 L390 10 L400 0 Z" />
                </svg>
            </div>
        </div>
    {/if}
</header>

<style>
    .display {
        font-family: 'Fraunces', serif;
    }
    .font-sans {
        font-family: 'Work Sans', system-ui, sans-serif;
    }
    .font-mono {
        font-family: 'IBM Plex Mono', monospace;
    }

    .header-bar {
        isolation: isolate;
        transform: translateZ(0);
    }

    .nav-link::after {
        content: '';
        position: absolute;
        left: 1rem;
        right: 1rem;
        bottom: 4px;
        height: 2px;
        background: #E8B84B;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 300ms ease;
    }
    .nav-link:hover::after {
        transform: scaleX(1);
    }
    .nav-link:hover {
        color: #4B5D3A;
    }

    @keyframes spinSlow {
        to { transform: rotate(360deg); }
    }

    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
            transition-duration: 0.01ms;
        }
    }
</style>