<script lang="ts">
    import { cubicOut } from 'svelte/easing';
    import { scale } from 'svelte/transition';
    import { tick } from 'svelte';

    type ChatMessage = {
        role: 'assistant' | 'user';
        text: string;
    };

    let isOpen = false;
    let message = '';
    let isLoading = false;
    let chatContainer: HTMLDivElement | undefined;

    let chatHistory: ChatMessage[] = [
        {
            role: 'assistant',
            text: "Merhaba! Ben Dyt. Ayşenur'un beslenme asistanı Hera 🐱 Sağlıklı beslenme ve diyet süreçleri hakkında nasıl yardımcı olabilirim?"
        }
    ];

    function toggleChat() {
        isOpen = !isOpen;

        if (isOpen) {
            void scrollToBottom();
        }
    }

    async function scrollToBottom() {
        await tick();

        if (chatContainer) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    async function sendMessage() {
        const userMessage = message.trim();

        if (!userMessage || isLoading) {
            return;
        }

        chatHistory = [
            ...chatHistory,
            {
                role: 'user',
                text: userMessage
            }
        ];

        message = '';
        isLoading = true;
        void scrollToBottom();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage
                })
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.reply ?? `Sunucu hatası: ${response.status}`
                );
            }

            chatHistory = [
                ...chatHistory,
                {
                    role: 'assistant',
                    text:
                        typeof data?.reply === 'string'
                            ? data.reply
                            : 'Yanıt alınamadı. Tekrar dener misin? 🐱'
                }
            ];
        } catch (error) {
            chatHistory = [
                ...chatHistory,
                {
                    role: 'assistant',
                    text:
                        error instanceof Error && error.message
                            ? error.message
                            : 'Bağlantımda küçük bir sorun oluştu. Biraz sonra tekrar dener misin? 🐱🥗'
                }
            ];
        } finally {
            isLoading = false;
            void scrollToBottom();
        }
    }
</script>

<svelte:head>
    <title>Beslenme Asistanı</title>
</svelte:head>

{#snippet CatAvatar(size, decorative = false)}
    <div class:cat-avatar-small={size === 'small'} class:cat-avatar-large={size === 'large'} class:cat-avatar-mini={size === 'mini'} class="cat-avatar">
        <span class="avatar-glow"></span>
        <span class="avatar-shine"></span>

        <svg
            viewBox="0 0 220 220"
            role={decorative ? undefined : 'img'}
            aria-hidden={decorative}
            aria-label={decorative ? undefined : 'Önden bakan animasyonlu 3D kedi'}
        >
            <defs>
                <radialGradient id="catFace" cx="35%" cy="24%" r="82%">
                    <stop offset="0%" stop-color="#f2ede5" />
                    <stop offset="48%" stop-color="#b8aa98" />
                    <stop offset="100%" stop-color="#62584d" />
                </radialGradient>
                <linearGradient id="catEar" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#d6cdc1" />
                    <stop offset="100%" stop-color="#655b50" />
                </linearGradient>
                <linearGradient id="catEarInner" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#b98f8d" />
                    <stop offset="100%" stop-color="#79595a" />
                </linearGradient>
                <radialGradient id="catEye" cx="36%" cy="28%" r="75%">
                    <stop offset="0%" stop-color="#f4d783" />
                    <stop offset="46%" stop-color="#b38732" />
                    <stop offset="100%" stop-color="#3a2d16" />
                </radialGradient>
                <linearGradient id="catMuzzle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#eee7de" />
                    <stop offset="100%" stop-color="#c7b9aa" />
                </linearGradient>
                <linearGradient id="catNose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#9b7370" />
                    <stop offset="100%" stop-color="#5f4445" />
                </linearGradient>
                <filter id="catShadow" x="-30%" y="-30%" width="160%" height="180%">
                    <feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#273021" flood-opacity="0.28" />
                </filter>
            </defs>

            <ellipse class="cat-ground-shadow" cx="110" cy="196" rx="67" ry="13" fill="#25301f" opacity="0.2" />

            <g class="cat-character" filter="url(#catShadow)">
                <g class="cat-ear cat-ear-left">
                    <path d="M51 90C42 62 44 27 59 16C72 7 92 42 94 71Z" fill="url(#catEar)" />
                    <path d="M60 69C57 50 59 34 65 29C72 24 82 48 84 65Z" fill="url(#catEarInner)" opacity="0.92" />
                </g>

                <g class="cat-ear cat-ear-right">
                    <path d="M169 90C178 62 176 27 161 16C148 7 128 42 126 71Z" fill="url(#catEar)" />
                    <path d="M160 69C163 50 161 34 155 29C148 24 138 48 136 65Z" fill="url(#catEarInner)" opacity="0.92" />
                </g>

                <path
                    d="M110 53C154 53 184 83 184 128C184 174 154 201 110 201C66 201 36 174 36 128C36 83 66 53 110 53Z"
                    fill="url(#catFace)"
                />

                <path d="M62 82C73 67 91 60 110 60C129 60 147 67 158 82C139 73 128 76 110 87C92 76 81 73 62 82Z" fill="#514940" opacity="0.52" />
                <path d="M110 58C103 69 101 82 103 96" fill="none" stroke="#514940" stroke-width="7" stroke-linecap="round" opacity="0.68" />
                <path d="M83 64C79 75 79 84 83 95" fill="none" stroke="#514940" stroke-width="6" stroke-linecap="round" opacity="0.48" />
                <path d="M137 64C141 75 141 84 137 95" fill="none" stroke="#514940" stroke-width="6" stroke-linecap="round" opacity="0.48" />

                <g class="cat-eye cat-eye-left">
                    <ellipse cx="80" cy="122" rx="15" ry="17" fill="url(#catEye)" />
                    <ellipse cx="80" cy="123" rx="3.8" ry="11" fill="#17140e" />
                    <ellipse cx="74" cy="115" rx="4" ry="5" fill="#ffffff" opacity="0.92" />
                </g>

                <g class="cat-eye cat-eye-right">
                    <ellipse cx="140" cy="122" rx="15" ry="17" fill="url(#catEye)" />
                    <ellipse cx="140" cy="123" rx="3.8" ry="11" fill="#17140e" />
                    <ellipse cx="134" cy="115" rx="4" ry="5" fill="#ffffff" opacity="0.92" />
                </g>

                <ellipse cx="73" cy="150" rx="23" ry="18" fill="url(#catMuzzle)" />
                <ellipse cx="147" cy="150" rx="23" ry="18" fill="url(#catMuzzle)" />

                <path d="M99 142C99 134 121 134 121 142C121 149 115 154 110 154C105 154 99 149 99 142Z" fill="url(#catNose)" />
                <path d="M110 153V160" stroke="#513536" stroke-width="4" stroke-linecap="round" />
                <path d="M110 160C103 169 92 168 88 160" fill="none" stroke="#513536" stroke-width="4" stroke-linecap="round" />
                <path d="M110 160C117 169 128 168 132 160" fill="none" stroke="#513536" stroke-width="4" stroke-linecap="round" />

                <g class="cat-whiskers">
                    <path d="M75 145L31 136" />
                    <path d="M75 153L27 153" />
                    <path d="M75 161L34 171" />
                    <path d="M145 145L189 136" />
                    <path d="M145 153L193 153" />
                    <path d="M145 161L186 171" />
                </g>

                <ellipse cx="82" cy="92" rx="29" ry="12" fill="#ffffff" opacity="0.18" transform="rotate(-17 82 92)" />
            </g>
        </svg>
    </div>
{/snippet}

<div class="chat-root">
    {#if isOpen}
        <section
            class="chat-window"
            transition:scale={{
                duration: 280,
                start: 0.88,
                opacity: 0,
                easing: cubicOut
            }}
        >
            <div class="window-glow"></div>

            <header class="chat-header">
                <div class="assistant-profile">
                    {@render CatAvatar('small')}

                    <div class="assistant-info">
                        <div class="assistant-name-row">
                            <h2>Asistan Hera</h2>
                            <span class="verified-mark">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M9.3 16.4 5.7 12.8l1.7-1.7 1.9 1.9 7.3-7.3 1.7 1.7Z" />
                                </svg>
                            </span>
                        </div>

                        <div class="online-row">
                            <span class="online-dot"></span>
                            <span>Beslenme rehberi aktif</span>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    class="close-button"
                    aria-label="Sohbeti kapat"
                    on:click={toggleChat}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                </button>
            </header>

            <div
                class="messages"
                bind:this={chatContainer}
                aria-live="polite"
            >
                <div class="day-label">
                    <span>Bugün</span>
                </div>

                {#each chatHistory as chat}
                    <div
                        class:message-row-user={chat.role === 'user'}
                        class:message-row-assistant={chat.role === 'assistant'}
                        class="message-row"
                    >
                        {#if chat.role === 'assistant'}
                            {@render CatAvatar('mini', true)}
                        {/if}

                        <div
                            class:user-message={chat.role === 'user'}
                            class:assistant-message={chat.role === 'assistant'}
                            class="message-bubble"
                        >
                            {chat.text}
                        </div>
                    </div>
                {/each}

                {#if isLoading}
                    <div class="message-row message-row-assistant">
                        {@render CatAvatar('mini', true)}

                        <div class="typing-bubble">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                {/if}
            </div>

            <footer class="chat-footer">
                <form on:submit|preventDefault={sendMessage}>
                    <div class="input-shell">
                        <input
                            type="text"
                            bind:value={message}
                            disabled={isLoading}
                            maxlength="1500"
                            autocomplete="off"
                            aria-label="Mesaj"
                            placeholder="Beslenmeyle ilgili bir şey sor..."
                        />

                        <button
                            type="submit"
                            class="send-button"
                            disabled={isLoading || !message.trim()}
                            aria-label="Mesaj gönder"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="m4 4 17 8-17 8 3-8-3-8Z" />
                                <path d="M7 12h14" />
                            </svg>
                        </button>
                    </div>
                </form>

                <p class="footer-note">
                    Hera genel bilgi verir, kişisel sağlık değerlendirmesi yapmaz.
                </p>
            </footer>
        </section>
    {/if}

    <button
        type="button"
        class:launcher-open={isOpen}
        class="chat-launcher"
        aria-label={isOpen ? 'Asistanı kapat' : 'Asistanı aç'}
        on:click={toggleChat}
    >
        <span class="launcher-ring"></span>
        <span class="launcher-ring launcher-ring-two"></span>

        {@render CatAvatar('large')}

        {#if !isOpen}
            <span class="notification-dot">
                <span></span>
            </span>

            <span class="launcher-label">
                Hera'ya sor
            </span>
        {/if}
    </button>
</div>

<style>
    :global(*) {
        box-sizing: border-box;
    }

    .chat-root {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 18px;
        font-family: 'Work Sans', system-ui, sans-serif;
    }

    .chat-window {
        position: relative;
        width: min(390px, calc(100vw - 32px));
        height: min(610px, calc(100vh - 130px));
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(43, 54, 37, 0.18);
        border-radius: 30px;
        background:
            radial-gradient(circle at 100% 0%, rgba(226, 188, 100, 0.22), transparent 34%),
            #f7f4ed;
        box-shadow:
            0 30px 70px rgba(26, 34, 22, 0.24),
            0 8px 20px rgba(26, 34, 22, 0.12);
        isolation: isolate;
    }

    .window-glow {
        position: absolute;
        top: -100px;
        right: -80px;
        width: 230px;
        height: 230px;
        border-radius: 50%;
        background: rgba(232, 184, 75, 0.22);
        filter: blur(45px);
        pointer-events: none;
        z-index: -1;
    }

    .chat-header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 92px;
        padding: 16px 18px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        background:
            radial-gradient(circle at 20% -30%, rgba(255, 255, 255, 0.17), transparent 45%),
            linear-gradient(135deg, #35462e, #526643);
        color: #fffaf0;
    }

    .assistant-profile {
        display: flex;
        align-items: center;
        min-width: 0;
        gap: 13px;
    }

    .assistant-info {
        min-width: 0;
    }

    .assistant-name-row {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .assistant-name-row h2 {
        margin: 0;
        font-family: 'Fraunces', Georgia, serif;
        font-size: 20px;
        line-height: 1.1;
        font-weight: 750;
        letter-spacing: -0.02em;
    }

    .verified-mark {
        display: grid;
        width: 18px;
        height: 18px;
        place-items: center;
        border-radius: 50%;
        background: #e8b84b;
        color: #35462e;
    }

    .verified-mark svg {
        width: 14px;
        height: 14px;
        fill: currentColor;
    }

    .online-row {
        display: flex;
        align-items: center;
        gap: 7px;
        margin-top: 7px;
        color: rgba(255, 250, 240, 0.76);
        font-size: 11px;
        font-weight: 650;
        letter-spacing: 0.02em;
    }

    .online-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #a9dd79;
        box-shadow: 0 0 0 4px rgba(169, 221, 121, 0.13);
        animation: onlinePulse 2s ease-in-out infinite;
    }

    .close-button {
        display: grid;
        width: 38px;
        height: 38px;
        flex: 0 0 auto;
        place-items: center;
        border: 1px solid rgba(255, 255, 255, 0.13);
        border-radius: 13px;
        background: rgba(255, 255, 255, 0.08);
        color: #fffaf0;
        cursor: pointer;
        transition:
            transform 180ms ease,
            background 180ms ease;
    }

    .close-button:hover {
        transform: rotate(5deg) scale(1.05);
        background: rgba(255, 255, 255, 0.15);
    }

    .close-button svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
    }

    .messages {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 15px;
        overflow-y: auto;
        padding: 20px 18px 25px;
        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: rgba(53, 70, 46, 0.24) transparent;
    }

    .messages::-webkit-scrollbar {
        width: 5px;
    }

    .messages::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background: rgba(53, 70, 46, 0.24);
    }

    .day-label {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #918a7c;
        font-size: 10px;
        font-weight: 750;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .day-label::before,
    .day-label::after {
        height: 1px;
        flex: 1;
        background: rgba(62, 69, 55, 0.12);
        content: '';
    }

    .message-row {
        display: flex;
        align-items: flex-end;
        gap: 9px;
        animation: messageIn 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .message-row-user {
        justify-content: flex-end;
    }

    .message-row-assistant {
        justify-content: flex-start;
    }

    .message-bubble {
        max-width: 78%;
        padding: 12px 14px;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font-size: 13px;
        font-weight: 560;
        line-height: 1.55;
    }

    .assistant-message {
        border: 1px solid rgba(53, 70, 46, 0.1);
        border-radius: 18px 18px 18px 5px;
        background: rgba(255, 255, 255, 0.88);
        color: #30372c;
        box-shadow:
            0 8px 18px rgba(40, 48, 34, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
    }

    .user-message {
        border-radius: 18px 18px 5px 18px;
        background: linear-gradient(135deg, #45583b, #31432d);
        color: #fffaf0;
        box-shadow: 0 10px 20px rgba(49, 67, 45, 0.18);
    }

    .typing-bubble {
        display: flex;
        align-items: center;
        gap: 5px;
        min-width: 62px;
        padding: 14px 15px;
        border: 1px solid rgba(53, 70, 46, 0.1);
        border-radius: 18px 18px 18px 5px;
        background: rgba(255, 255, 255, 0.88);
        box-shadow: 0 8px 18px rgba(40, 48, 34, 0.06);
    }

    .typing-bubble span {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #75836d;
        animation: typingDot 1.2s ease-in-out infinite;
    }

    .typing-bubble span:nth-child(2) {
        animation-delay: 160ms;
    }

    .typing-bubble span:nth-child(3) {
        animation-delay: 320ms;
    }

    .chat-footer {
        padding: 15px 16px 13px;
        border-top: 1px solid rgba(53, 70, 46, 0.1);
        background: rgba(252, 250, 244, 0.91);
        backdrop-filter: blur(14px);
    }

    .input-shell {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 6px 6px 15px;
        border: 1px solid rgba(53, 70, 46, 0.15);
        border-radius: 18px;
        background: #ffffff;
        box-shadow:
            0 8px 20px rgba(44, 54, 38, 0.07),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
        transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            transform 180ms ease;
    }

    .input-shell:focus-within {
        border-color: rgba(75, 93, 58, 0.5);
        box-shadow:
            0 10px 25px rgba(44, 54, 38, 0.1),
            0 0 0 4px rgba(75, 93, 58, 0.08);
        transform: translateY(-1px);
    }

    .input-shell input {
        min-width: 0;
        flex: 1;
        border: 0;
        outline: 0;
        background: transparent;
        color: #2c3328;
        font: inherit;
        font-size: 13px;
        font-weight: 550;
    }

    .input-shell input::placeholder {
        color: #9b978d;
    }

    .input-shell input:disabled {
        cursor: not-allowed;
        opacity: 0.55;
    }

    .send-button {
        display: grid;
        width: 42px;
        height: 42px;
        flex: 0 0 auto;
        place-items: center;
        border: 0;
        border-radius: 14px;
        background: linear-gradient(135deg, #e8b84b, #d69b29);
        color: #273222;
        cursor: pointer;
        box-shadow:
            0 7px 15px rgba(190, 132, 26, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.38);
        transition:
            transform 170ms ease,
            box-shadow 170ms ease,
            opacity 170ms ease;
    }

    .send-button:hover:not(:disabled) {
        transform: translateY(-2px) rotate(-3deg);
        box-shadow:
            0 10px 18px rgba(190, 132, 26, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.38);
    }

    .send-button:active:not(:disabled) {
        transform: translateY(0) scale(0.95);
    }

    .send-button:disabled {
        cursor: not-allowed;
        opacity: 0.38;
        box-shadow: none;
    }

    .send-button svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.9;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .footer-note {
        margin: 9px 2px 0;
        color: #9a958a;
        font-size: 9px;
        font-weight: 550;
        line-height: 1.4;
        text-align: center;
    }

    .chat-launcher {
        position: relative;
        display: grid;
        width: 78px;
        height: 78px;
        place-items: center;
        border: 0;
        border-radius: 50%;
        background:
            radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.52), transparent 30%),
            linear-gradient(145deg, #d8c9ad, #aa9270);
        cursor: pointer;
        box-shadow:
            0 18px 35px rgba(75, 66, 30, 0.23),
            0 6px 13px rgba(42, 48, 35, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.55);
        transition:
            transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1),
            border-radius 280ms ease,
            box-shadow 280ms ease;
    }

    .chat-launcher:hover {
        transform: translateY(-5px) scale(1.03);
        border-radius: 50%;
        box-shadow:
            0 25px 46px rgba(75, 66, 30, 0.28),
            0 8px 15px rgba(42, 48, 35, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.58);
    }

    .chat-launcher:active {
        transform: translateY(-2px) scale(0.96);
    }

    .launcher-open {
        transform: rotate(4deg);
    }

    .launcher-ring {
        position: absolute;
        inset: -7px;
        border: 1px solid rgba(127, 110, 88, 0.28);
        border-radius: 50%;
        animation: launcherRing 2.8s ease-out infinite;
        pointer-events: none;
    }

    .launcher-ring-two {
        animation-delay: 1.4s;
    }

    .cat-avatar {
        position: relative;
        display: grid;
        overflow: hidden;
        place-items: center;
        background:
            radial-gradient(circle at 34% 25%, rgba(255, 255, 255, 0.9), transparent 34%),
            linear-gradient(145deg, #e8e1d8, #b9aa98);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            inset 0 -8px 18px rgba(101, 79, 36, 0.13);
        isolation: isolate;
    }

    .cat-avatar-small {
        width: 58px;
        height: 58px;
        flex: 0 0 auto;
        border: 2px solid rgba(255, 255, 255, 0.55);
        border-radius: 20px;
    }

    .cat-avatar-large {
        width: 66px;
        height: 66px;
        border-radius: 50%;
    }

    .cat-avatar-mini {
        width: 32px;
        height: 32px;
        flex: 0 0 auto;
        border: 1px solid rgba(53, 70, 46, 0.12);
        border-radius: 11px;
    }

    .cat-avatar svg {
        position: relative;
        z-index: 2;
        width: 95%;
        height: 105%;
        overflow: visible;
    }

    .cat-avatar-small svg {
        transform: translateY(3px);
    }

    .cat-avatar-large svg {
        transform: translateY(5px);
    }

    .cat-avatar-mini svg {
        width: 30px;
        height: 32px;
        transform: translateY(2px);
    }

    .cat-character {
        transform-origin: center bottom;
        animation: catBreathe 3.4s ease-in-out infinite;
    }

    .cat-ground-shadow {
        transform-origin: center;
        animation: shadowBreathe 3.4s ease-in-out infinite;
    }

    .cat-ear {
        transform-box: fill-box;
        transform-origin: bottom center;
    }

    .cat-ear-left {
        animation: earLeft 5.4s ease-in-out infinite;
    }

    .cat-ear-right {
        animation: earRight 5.4s ease-in-out infinite;
    }

    .cat-eye {
        transform-box: fill-box;
        transform-origin: center;
        animation: catBlink 5s ease-in-out infinite;
    }

    .cat-eye-right {
        animation-delay: 35ms;
    }

    .cat-whiskers path {
        fill: none;
        stroke: #514941;
        stroke-width: 3;
        stroke-linecap: round;
        transform-box: fill-box;
        transform-origin: center;
        animation: whiskerMove 3.4s ease-in-out infinite;
    }

    .avatar-glow {
        position: absolute;
        inset: 12%;
        z-index: 0;
        border-radius: 50%;
        background: rgba(220, 204, 181, 0.48);
        filter: blur(13px);
        animation: avatarGlow 3.4s ease-in-out infinite;
    }

    .avatar-shine {
        position: absolute;
        top: -32%;
        left: -60%;
        z-index: 3;
        width: 42%;
        height: 170%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        transform: rotate(24deg);
        animation: avatarShine 4.8s ease-in-out infinite;
        pointer-events: none;
    }

    .notification-dot {
        position: absolute;
        top: -5px;
        right: -5px;
        display: grid;
        width: 25px;
        height: 25px;
        place-items: center;
        border: 4px solid #f7f4ed;
        border-radius: 50%;
        background: #a64a4a;
        box-shadow: 0 4px 8px rgba(55, 39, 32, 0.2);
    }

    .notification-dot span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fff7e9;
        animation: notificationBlink 1.8s ease-in-out infinite;
    }

    .launcher-label {
        position: absolute;
        right: 90px;
        padding: 10px 14px;
        white-space: nowrap;
        border: 1px solid rgba(53, 70, 46, 0.12);
        border-radius: 14px;
        background: rgba(255, 253, 247, 0.96);
        color: #35462e;
        font-size: 12px;
        font-weight: 750;
        box-shadow: 0 10px 28px rgba(35, 44, 30, 0.13);
        opacity: 0;
        transform: translateX(8px);
        transition:
            opacity 200ms ease,
            transform 200ms ease;
        pointer-events: none;
    }

    .launcher-label::after {
        position: absolute;
        top: 50%;
        right: -6px;
        width: 11px;
        height: 11px;
        border-top: 1px solid rgba(53, 70, 46, 0.12);
        border-right: 1px solid rgba(53, 70, 46, 0.12);
        background: rgba(255, 253, 247, 0.96);
        content: '';
        transform: translateY(-50%) rotate(45deg);
    }

    .chat-launcher:hover .launcher-label {
        opacity: 1;
        transform: translateX(0);
    }

    .chat-launcher:hover .cat-character {
        animation: catHello 900ms ease-in-out infinite alternate;
    }

    .chat-launcher:hover .cat-ear-left {
        animation: earLeftHover 900ms ease-in-out infinite alternate;
    }

    .chat-launcher:hover .cat-ear-right {
        animation: earRightHover 900ms 120ms ease-in-out infinite alternate;
    }

    @keyframes catBreathe {
        0%,
        100% {
            transform: translateY(0) scale(1);
        }

        50% {
            transform: translateY(-3px) scale(1.018);
        }
    }

    @keyframes catHello {
        0% {
            transform: translateY(-2px) rotate(-0.6deg) scale(1.01);
        }

        100% {
            transform: translateY(-4px) rotate(0.6deg) scale(1.02);
        }
    }

    @keyframes shadowBreathe {
        0%,
        100% {
            transform: scaleX(1);
            opacity: 0.2;
        }

        50% {
            transform: scaleX(0.86);
            opacity: 0.13;
        }
    }

    @keyframes catBlink {
        0%,
        42%,
        46%,
        100% {
            transform: scaleY(1);
        }

        44% {
            transform: scaleY(0.08);
        }
    }

    @keyframes earLeft {
        0%,
        72%,
        100% {
            transform: rotate(0deg);
        }

        76% {
            transform: rotate(-8deg);
        }

        80% {
            transform: rotate(3deg);
        }
    }

    @keyframes earRight {
        0%,
        79%,
        100% {
            transform: rotate(0deg);
        }

        83% {
            transform: rotate(8deg);
        }

        87% {
            transform: rotate(-3deg);
        }
    }

    @keyframes earLeftHover {
        from {
            transform: rotate(-3deg);
        }

        to {
            transform: rotate(-10deg);
        }
    }

    @keyframes earRightHover {
        from {
            transform: rotate(3deg);
        }

        to {
            transform: rotate(10deg);
        }
    }

    @keyframes whiskerMove {
        0%,
        100% {
            transform: rotate(0deg);
        }

        50% {
            transform: rotate(1.5deg);
        }
    }

    @keyframes avatarGlow {
        0%,
        100% {
            opacity: 0.55;
            transform: scale(0.92);
        }

        50% {
            opacity: 0.9;
            transform: scale(1.08);
        }
    }

    @keyframes avatarShine {
        0%,
        68% {
            left: -65%;
        }

        88%,
        100% {
            left: 135%;
        }
    }

    @keyframes launcherRing {
        0% {
            opacity: 0.55;
            transform: scale(0.92);
        }

        70%,
        100% {
            opacity: 0;
            transform: scale(1.2);
        }
    }

    @keyframes messageIn {
        from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
        }

        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes typingDot {
        0%,
        65%,
        100% {
            opacity: 0.35;
            transform: translateY(0);
        }

        30% {
            opacity: 1;
            transform: translateY(-4px);
        }
    }

    @keyframes onlinePulse {
        0%,
        100% {
            box-shadow: 0 0 0 4px rgba(169, 221, 121, 0.13);
        }

        50% {
            box-shadow: 0 0 0 7px rgba(169, 221, 121, 0.05);
        }
    }

    @keyframes notificationBlink {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }

        50% {
            opacity: 0.5;
            transform: scale(0.7);
        }
    }

    @media (max-width: 540px) {
        .chat-root {
            right: 12px;
            bottom: 12px;
        }

        .chat-window {
            width: calc(100vw - 24px);
            height: min(620px, calc(100dvh - 116px));
            border-radius: 25px;
        }

        .chat-launcher {
            width: 70px;
            height: 70px;
            border-radius: 50%;
        }

        .cat-avatar-large {
            width: 59px;
            height: 59px;
            border-radius: 50%;
        }

        .launcher-label {
            display: none;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .cat-character,
        .cat-ground-shadow,
        .cat-ear,
        .cat-eye,
        .cat-whiskers path,
        .avatar-glow,
        .avatar-shine,
        .launcher-ring,
        .notification-dot span,
        .online-dot,
        .typing-bubble span {
            animation: none;
        }

        .messages {
            scroll-behavior: auto;
        }
    }
</style>
