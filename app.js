const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function ageCalculate() {
    let inputDate = document.getElementById("date-input").value;
    if (inputDate === "") {
        alert("Please select a date");
        displayResult("-", "-", "-");
        return;
    }

    let today = new Date();
    let birthDate = new Date(inputDate);
    let birthMonth, birthDay, birthYear;
    let birthDetails = {
        day: birthDate.getDate(),
        month: birthDate.getMonth() + 1,
        year: birthDate.getFullYear()
    }
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDay = today.getDate();

    leapChecker(currentYear);

    if (
        birthDetails.year > currentYear ||
        (birthDetails.month > currentMonth && birthDetails.year == currentYear) ||
        (birthDetails.day > currentDay && birthDetails.month == currentMonth && birthDetails.year == currentYear)
    ) {
        alert("Not Born Yet");
        displayResult("-", "-", "-");
        return;
    }

    birthYear = currentYear - birthDetails.year;

    if (currentMonth >= birthDetails.month) {
        birthMonth = currentMonth - birthDetails.month;
    } else {
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if (currentDay >= birthDetails.day) {
        birthDay = currentDay - birthDetails.day;
    } else {
        birthMonth--;
        let days = months[(currentMonth - 2 + 12) % 12]; // Correcting for array index
        birthDay = days + currentDay - birthDetails.day;
        if (birthMonth < 0) {
            birthMonth = 11;
            birthYear--;
        }
    }
    displayResult(birthDay, birthMonth, birthYear);
}

function displayResult(bDay, bMonth, bYear) {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDay;
}

function leapChecker(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        months[1] = 29;
    } else {
        months[1] = 28;
    }
}
