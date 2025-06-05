
document.addEventListener('DOMContentLoaded', function () {
  const savedEvents = JSON.parse(localStorage.getItem('calendar_events') || '[]');

  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: "auto",
    events: savedEvents,
    editable: true,
    selectable: true,
    dateClick: function(info) {
      const title = prompt('予定のタイトルを入力:');
      if (title) {
        const newEvent = { title: title, start: info.dateStr };
        calendar.addEvent(newEvent);
        saveEvent(newEvent);
      }
    },
    eventChange: function(info) {
      updateEvents(calendar.getEvents());
    },
    eventRemove: function(info) {
      updateEvents(calendar.getEvents());
    }
  });

  calendar.render();
});

function saveEvent(event) {
  const events = JSON.parse(localStorage.getItem('calendar_events') || '[]');
  events.push({ title: event.title, start: event.start });
  localStorage.setItem('calendar_events', JSON.stringify(events));
}

function updateEvents(events) {
  const updated = events.map(e => ({ title: e.title, start: e.startStr }));
  localStorage.setItem('calendar_events', JSON.stringify(updated));
}

function clearEvents() {
  localStorage.removeItem('calendar_events');
  location.reload();
}
