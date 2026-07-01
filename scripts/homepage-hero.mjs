/** Dan Koe–style homepage hero + ghostwriter aside */
export const HOMEPAGE_SIGNUP_MARKER = "<!-- HOMEPAGE_SIGNUP_START -->";
export const HOMEPAGE_SIGNUP_END = "<!-- HOMEPAGE_SIGNUP_END -->";

export function renderHomepageHero() {
  return `    ${HOMEPAGE_SIGNUP_MARKER}
    <section class="home-hero" id="newsletter-signup">
        <div class="home-hero-inner">
            <div class="home-hero-main">
                <img src="assets/andrei-lucian-headshot.png.jpg" alt="Andrei Lucian" class="home-hero-avatar" loading="eager" onerror="this.src='assets/images/logo.png'; this.onerror=null;">
                <p class="home-hero-eyebrow">A N D R E I&nbsp;&nbsp;L U C I A N</p>
                <h1 class="home-hero-title">Write With Proof.<br>Grow Online.<br>Build Income.</h1>
                <p class="home-hero-lead">Join <strong>1,100+ creators</strong> getting weekly letters on writing, audience growth, and building in public — blunt proof, no guru noise.</p>
                <form id="newsletterForm" class="newsletter-form home-hero-form">
                    <input type="email" id="emailInput" class="email-input" placeholder="Your Email" required>
                    <button type="submit" class="submit-btn">Receive 2 free letters a week</button>
                </form>
                <div id="formMessage" class="form-message"></div>
                <a href="#newsletters" class="home-hero-letters-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    Read The Andrei Lucian Letters
                </a>
                <div class="signup-social-links home-hero-social">
                    <a href="https://x.com/theandreilucian" target="_blank" rel="noopener noreferrer" class="signup-social-link" aria-label="X (Twitter)">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M15.5 2h2.5l-5.5 6.25L18 15h-4.5l-3.5-4.5L6 15H2l5-5.75L2 2h4.5l3 4L13 2h2.5z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/andrei-lucian-0498901b8/" target="_blank" rel="noopener noreferrer" class="signup-social-link" aria-label="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M4.5 2C3.67 2 3 2.67 3 3.5v13c0 .83.67 1.5 1.5 1.5h13c.83 0 1.5-.67 1.5-1.5v-13c0-.83-.67-1.5-1.5-1.5h-13zM7 7h2v8H7V7zm1-2a1 1 0 1 1 0 2 1 1 0 0 1-2 0zm3 2h1.5v8H11V7zm2.5 0H15v5.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V7h1.5v8H17v-3.5c0-1.38-1.12-2.5-2.5-2.5S12 10.12 12 11.5V15h-1V7z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/theandreilucian/" target="_blank" rel="noopener noreferrer" class="signup-social-link" aria-label="Instagram">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 2.5c2.76 0 3.08.01 4.17.06.98.04 1.51.18 1.86.3.47.15.8.33 1.15.68.35.35.53.68.68 1.15.12.35.26.88.3 1.86.05 1.09.06 1.41.06 4.17s-.01 3.08-.06 4.17c-.04.98-.18 1.51-.3 1.86-.15.47-.33.8-.68 1.15-.35.35-.68.53-1.15.68-.35.12-.88.26-1.86.3-1.09.05-1.41.06-4.17.06s-3.08-.01-4.17-.06c-.98-.04-1.51-.18-1.86-.3-.47-.15-.8-.33-1.15-.68-.35-.35-.53-.68-.68-1.15-.12-.35-.26-.88-.3-1.86-.05-1.09-.06-1.41-.06-4.17s.01-3.08.06-4.17c.04-.98.18-1.51.3-1.86.15-.47.33-.8.68-1.15.35-.35.68-.53 1.15-.68.35-.12.88-.26 1.86-.3 1.09-.05 1.41-.06 4.17-.06zm0-2.5C7.24 0 6.92.01 5.83.06 4.85.1 4.32.24 3.97.36 3.5.51 3.17.69 2.82 1.04 2.47 1.39 2.29 1.72 2.14 2.19 2.02 2.66 1.98 3.64 1.93 4.73 1.92 5.05 1.92 7.81 1.92 10.57s.01 5.52.06 6.61c.04.98.18 1.51.3 1.86.15.47.33.8.68 1.15.35.35.68.53 1.15.68.35.12.88.26 1.86.3 1.09.05 1.41.06 4.17.06s3.08-.01 4.17-.06c.98-.04 1.51-.18 1.86-.3.47-.15.8-.33 1.15-.68.35-.35.53-.68.68-1.15.12-.35.26-.88.3-1.86.05-1.09.06-1.41.06-4.17s-.01-3.08-.06-4.17c-.04-.98-.18-1.51-.3-1.86-.15-.47-.33-.8-.68-1.15-.35-.35-.68-.53-1.15-.68-.35-.12-.88-.26-1.86-.3-1.09-.05-1.41-.06-4.17-.06z"/><path d="M10 5.38c-2.55 0-4.62 2.07-4.62 4.62s2.07 4.62 4.62 4.62 4.62-2.07 4.62-4.62-2.07-4.62-4.62-4.62zm0 7.62c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6.25-7.5c-.6 0-1.08.48-1.08 1.08s.48 1.08 1.08 1.08 1.08-.48 1.08-1.08-.48-1.08-1.08-1.08z"/></svg>
                    </a>
                    <a href="https://www.threads.com/@theandreilucian" target="_blank" rel="noopener noreferrer" class="signup-social-link" aria-label="Threads">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5S3.5 13.59 3.5 10 6.41 3.5 10 3.5z"/><path d="M10 6.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5S11.93 6.5 10 6.5zm0 5.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/><circle cx="10" cy="10" r="1"/></svg>
                    </a>
                </div>
            </div>
            <aside class="home-hero-aside" aria-label="Ghostwriting">
                <p class="home-hero-aside-eyebrow">Done-for-you writing</p>
                <h2 class="home-hero-aside-title">Need a Ghostwriter?</h2>
                <p class="home-hero-aside-lead">I write your 𝕏 threads, LinkedIn posts, and newsletters in your voice — so you grow while you build the product.</p>
                <ul class="home-hero-aside-list">
                    <li>Content systems, not one-off posts</li>
                    <li>Your voice — not generic AI slop</li>
                    <li>Built for founders who hate writing</li>
                </ul>
                <a href="ghostwriting.html" class="home-hero-aside-btn">See how it works →</a>
            </aside>
        </div>
    </section>
    ${HOMEPAGE_SIGNUP_END}
`;
}
