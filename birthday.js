document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const letter = document.querySelector('.letter');

    let isOpen = false;

    openBtn.addEventListener('click', () => {
        isOpen = !isOpen;

        if (isOpen) {
            envelopeWrapper.classList.add('open');
            openBtn.textContent = 'Close Letter 💌';

            // Wait for expansion, then clear space below the letter
            setTimeout(() => {
                const letterHeight = letter.offsetHeight;
                const overflowBelowEnvelope = letterHeight - 80 - 220;
                const extraSpace = Math.max(60, overflowBelowEnvelope + 50);
                
                envelopeWrapper.style.marginBottom = `${extraSpace}px`;
            }, 300);
        } else {
            envelopeWrapper.classList.remove('open');
            openBtn.textContent = 'Open Letter 💌';
            envelopeWrapper.style.marginBottom = '60px';

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});