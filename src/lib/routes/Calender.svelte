<script>
    let weekCalender = [];
    let currentDate = new Date();
    let currentDay = currentDate.getDay();

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay);
    
    for (let i = 1; i < 8; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        weekCalender.push({
            date: date,
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        });
    }

    console.log(weekCalender);
</script>

<div class="w-full h-full">
    <!-- Calender -->
</div>