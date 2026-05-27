(function() {
    let events = [];

    const refreshBtn = document.getElementById('refreshBtn');
    const statusArea = document.getElementById('statusArea');
    const activityList = document.getElementById('activityList');
    const membersSpan = document.getElementById('members');
    const onlineSpan = document.getElementById('online');
    const cardBtns = document.querySelectorAll('.card-btn');

    function renderActivity() {
        if (!activityList) return;
        if (events.length === 0) {
            activityList.innerHTML = '<li>Нет данных</li>';
            return;
        }
        const reversed = [...events].reverse();
        activityList.innerHTML = reversed.slice(0, 10).map(ev => 
            `<li>${ev.time} — ${ev.text}</li>`
        ).join('');
    }

    function addEvent(text) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', second:'2-digit' });
        events.unshift({ text: text, time: timeStr });
        if (events.length > 20) events.pop();
        renderActivity();
    }

    function setStatus(msg, isError) {
        if (!statusArea) return;
        statusArea.textContent = msg;
        if (isError) {
            statusArea.style.color = '#FF0000';
            setTimeout(() => { statusArea.style.color = '#888'; }, 2000);
        } else {
            statusArea.style.color = '#888';
        }
    }

    function updateStats() {
        const members = Math.floor(2400 + Math.random() * 100);
        const online = Math.floor(120 + Math.random() * 50);
        if (membersSpan) membersSpan.textContent = members;
        if (onlineSpan) onlineSpan.textContent = online;
        return { members, online };
    }

    function handleAction(action) {
        setStatus('Обработка...');
        setTimeout(() => {
            let message = '';
            switch(action) {
                case 'top':
                    message = 'Запрошен топ игроков';
                    break;
                case 'pvp':
                    message = 'Запрошена PVP статистика';
                    break;
                case 'clans':
                    message = 'Запрошен рейтинг кланов';
                    break;
                default:
                    message = 'Выполнено действие';
            }
            addEvent(message);
            setStatus('Готов');
        }, 300);
    }

    function handleRefresh() {
        setStatus('Обновление...');
        setTimeout(() => {
            const stats = updateStats();
            addEvent(`Обновлена статистика: ${stats.members} участников, ${stats.online} онлайн`);
            setStatus('Обновлено');
        }, 400);
    }

    if (cardBtns) {
        cardBtns.forEach(btn => {
            const action = btn.getAttribute('data-action');
            if (action) {
                btn.addEventListener('click', () => handleAction(action));
            }
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', handleRefresh);
    }

    setTimeout(() => {
        addEvent('Система загружена');
        setStatus('Готов');
        updateStats();
    }, 100);
})();