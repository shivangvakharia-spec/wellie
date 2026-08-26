document.addEventListener('DOMContentLoaded', () => {
  const journey = document.querySelector('.wellie-journey');

  if (!journey) return;

  const updateJourneyLines = () => {
    const rows = journey.querySelectorAll(
      '.wellie-journey__timeline-row'
    );

    rows.forEach((row, index) => {
      const currentMonth = row.querySelector(
        '.wellie-journey__month'
      );

      const nextRow = rows[index + 1];

      // Last row has no connector
      if (!currentMonth || !nextRow) {
        row.style.removeProperty('--journey-line-height');
        return;
      }

      const nextMonth = nextRow.querySelector(
        '.wellie-journey__month'
      );

      if (!nextMonth) {
        row.style.removeProperty('--journey-line-height');
        return;
      }

      const currentBottom =
        currentMonth.getBoundingClientRect().bottom;

      const nextTop =
        nextMonth.getBoundingClientRect().top;

      const lineHeight =
        nextTop - currentBottom;

      row.style.setProperty(
        '--journey-line-height',
        `${Math.max(0, lineHeight)}px`
      );
    });
  };

  // Initial calculation
  updateJourneyLines();

  // Recalculate when viewport changes
  window.addEventListener('resize', updateJourneyLines);

  // Recalculate after images/fonts/layout settle
  window.addEventListener('load', updateJourneyLines);

  // Recalculate if the timeline dimensions change
  const resizeObserver = new ResizeObserver(() => {
    updateJourneyLines();
  });

  resizeObserver.observe(journey);
});