(function () {
    let startTime: number | null = null;

    document.querySelector('#hold-me')?.addEventListener('mousedown', () => {
        startTime = Date.now();
    });

    document.querySelector('#hold-me')?.addEventListener('mouseup', () => {
        if (startTime) {
            const elapsedMilliseconds = Date.now() - startTime;
            startTime = null;
            // @ts-ignore
            document.querySelector('#hold-time').textContent = elapsedMilliseconds;
        }
    });
})();
