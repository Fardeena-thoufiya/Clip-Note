// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('messageForm');
    const calendarDiv = document.getElementById('calendar');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const messageType = document.getElementById('messageType').value;
        const messageContent = document.getElementById('messageContent').value;
        const messageDate = document.getElementById('messageDate').value;
        const messageTime = document.getElementById('messageTime').value;

        const message = {
            type: messageType,
            content: messageContent,
            date: messageDate,
            time: messageTime
        };

        saveMessage(message);
        renderCalendar();
        form.reset();
    });

    function saveMessage(message) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function renderCalendar() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const groupedMessages = groupMessagesByDate(messages);

        calendarDiv.innerHTML = generateCalendarHTML(groupedMessages);
    }

    function groupMessagesByDate(messages) {
        return messages.reduce((acc, message) => {
            const date = message.date;
            if (!acc[date]) acc[date] = [];
            acc[date].push(message);
            return acc;
        }, {});
    }

    function generateCalendarHTML(messagesByDate) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        
        const calendarHTML = `
            <table class="calendar">
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateCalendarDaysHTML(currentYear, currentMonth, messagesByDate)}
                </tbody>
            </table>
        `;
        return calendarHTML;
    }

    function generateCalendarDaysHTML(year, month, messagesByDate) {
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        let html = '<tr>';

        // Fill the first week
        for (let i = 0; i < firstDay; i++) {
            html += '<td></td>';
        }

        for (let day = 1; day <= lastDay; day++) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const messages = messagesByDate[dateString] || [];

            html += `<td>${day}<br>`;
            messages.forEach(message => {
                html += `<div class="message-preview">${message.type[0].toUpperCase()}: ${message.content}</div>`;
            });
            html += '</td>';

            if ((firstDay + day) % 7 === 0) {
                html += '</tr><tr>';
            }
        }

        // Fill the last week
        const remainingDays = (firstDay + lastDay) % 7;
        if (remainingDays > 0) {
            for (let i = remainingDays; i < 7; i++) {
                html += '<td></td>';
            }
        }
        html += '</tr>';

        return html;
    }

    // Initial rendering
    renderCalendar();
});

// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('messageForm');
    const calendarDiv = document.getElementById('calendar');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const messageType = document.getElementById('messageType').value;
        const messageContent = document.getElementById('messageContent').value;
        const messageDate = document.getElementById('messageDate').value;
        const messageTime = document.getElementById('messageTime').value;

        const message = {
            type: messageType,
            content: messageContent,
            date: messageDate,
            time: messageTime
        };

        saveMessage(message);
        renderCalendar();
        form.reset();
    });

    function saveMessage(message) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function renderCalendar() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const groupedMessages = groupMessagesByDate(messages);

        calendarDiv.innerHTML = generateCalendarHTML(groupedMessages);
    }

    function groupMessagesByDate(messages) {
        return messages.reduce((acc, message) => {
            const date = message.date;
            if (!acc[date]) acc[date] = [];
            acc[date].push(message);
            return acc;
        }, {});
    }

    function generateCalendarHTML(messagesByDate) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        
        const calendarHTML = `
            <table class="calendar">
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateCalendarDaysHTML(currentYear, currentMonth, messagesByDate)}
                </tbody>
            </table>
        `;
        return calendarHTML;
    }

    function generateCalendarDaysHTML(year, month, messagesByDate) {
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        let html = '<tr>';

        // Fill the first week
        for (let i = 0; i < firstDay; i++) {
            html += '<td></td>';
        }

        for (let day = 1; day <= lastDay; day++) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const messages = messagesByDate[dateString] || [];

            html += `<td class="${messages.length > 0 ? 'message-day' : ''}">${day}<br>`;
            messages.forEach(message => {
                html += `<div class="message-preview">${message.type[0].toUpperCase()}: ${message.content}</div>`;
            });
            html += '</td>';

            if ((firstDay + day) % 7 === 0) {
                html += '</tr><tr>';
            }
        }

        // Fill the last week
        const remainingDays = (firstDay + lastDay) % 7;
        if (remainingDays > 0) {
            for (let i = remainingDays; i < 7; i++) {
                html += '<td></td>';
            }
        }
        html += '</tr>';

        return html;
    }

    // Initial rendering
    renderCalendar();
});
