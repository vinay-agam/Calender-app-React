import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dayInMonth = () => {
    const daysArray = [];

    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const lastDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );

    for (let i = 0; firstDay.getDay() > i; i++) {
      daysArray.push(null);
    }

    for (let i = 1; lastDay.getDate() >= i; i++) {
      daysArray.push(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i)
      );
    }

    return daysArray;
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() == date2.getDate() &&
      date1.getMonth() == date2.getMonth() &&
      date1.getFullYear() == date2.getFullYear()
    );
  };

  const handleMonth = (e) => {
    const newMonth = monthsOfYear.indexOf(e.target.value);
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
  };

  const handleYear = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setSelectedDate(new Date(newYear, selectedDate.getMonth(), 1));
  };

  const resetToToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <>
      <div className="p-4 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <button
            className="px-2 py-1 bg-blue-800 text-white rounded"
            onClick={() => {
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() - 1,
                  1
                )
              );
            }}
          >
            Prev
          </button>

          <select
            value={monthsOfYear[selectedDate.getMonth()]}
            onChange={handleMonth}
            className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
          >
            {monthsOfYear.map((month) => (
              <option value={month} key={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={selectedDate.getFullYear()}
            onChange={handleYear}
            className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
          >
            {Array.from(
              { length: 10 },
              (_, i) => selectedDate.getFullYear() - 5 + i
            ).map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            className="px-2 py-1 bg-blue-800 text-white rounded"
            onClick={() => {
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() + 1,
                  1
                )
              );
            }}
          >
            Next
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {monthsOfYear[selectedDate.getMonth()]} {selectedDate.getFullYear()}{" "}
          </h2>
          <button
            onClick={resetToToday}
            className="px-4 py-2 bg-blue-800 text-white rounded-lg"
          >
            Today
          </button>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 text-center font-semibold">
          {daysOfWeek.map((day) => (
            <div className="py-2" key={day}>
              {day}
            </div>
          ))}
        </div>

        {/* Days of the Month */}
        <div className="grid grid-cols-7 text-center">
          {dayInMonth().map((day, index) => (
            <button
              value={day}
              key={index}
              className={`py-2  rounded-full ${
                day
                  ? isSameDay(day, new Date())
                    ? "bg-blue-800 text-white"
                    : "hover:bg-blue-200"
                  : ""
              }`}
            >
              {day ? day.getDate() : ""}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
