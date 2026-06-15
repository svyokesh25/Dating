import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function Page3() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');

  const timeSlots = ['10:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '8:00 PM', '10:00 PM'];
  const places = ['Downtown', 'Mall', 'Park', 'Beach', 'Restaurant District', 'Movie Theater'];

  const months = [
    { value: '1',  label: 'January' },
    { value: '2',  label: 'February' },
    { value: '3',  label: 'March' },
    { value: '4',  label: 'April' },
    { value: '5',  label: 'May' },
    { value: '6',  label: 'June' },
    { value: '7',  label: 'July' },
    { value: '8',  label: 'August' },
    { value: '9',  label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  // Get correct number of days based on selected month
  const getDaysInMonth = (month) => {
    if (!month) return 31;
    const year = new Date().getFullYear();
    return new Date(year, parseInt(month), 0).getDate();
  };

  const daysInMonth = getDaysInMonth(selectedMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Format display: "January 1" style
  const getFormattedDate = () => {
    if (!selectedMonth || !selectedDay) return '';
    const monthLabel = months.find(m => m.value === selectedMonth)?.label;
    return `${monthLabel} ${selectedDay}`;
  };

  const handleSetDate = () => {
    if (selectedDay && selectedMonth && selectedTime && selectedPlace) {
      localStorage.setItem('dateData', JSON.stringify({
        date: getFormattedDate(),
        time: selectedTime,
        place: selectedPlace,
      }));
      navigate('/page4');
    } else {
      alert('Please select all options! 😊');
    }
  };

  const isComplete = selectedDay && selectedMonth && selectedTime && selectedPlace;

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 25%, #6c567b 50%, #355c7d 75%, #2a9d8f 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      backgroundAttachment: 'fixed',
    },
    card: {
      background: 'white',
      borderRadius: '30px',
      padding: '50px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      maxWidth: '600px',
      width: '100%',
      animation: 'slideIn 0.5s ease-out',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#2a2a2a',
      marginBottom: '15px',
    },
    subtitle: {
      fontSize: '18px',
      textAlign: 'center',
      color: '#666',
      marginBottom: '40px',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      marginBottom: '30px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    label: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2a2a2a',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    // ✅ Two dropdowns side by side for Day + Month
    dateRow: {
      display: 'flex',
      gap: '12px',
    },
    select: {
      padding: '14px 16px',
      fontSize: '16px',
      border: '2px solid #ff6b9d',
      borderRadius: '12px',
      background: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      fontWeight: '500',
      flex: 1,
    },
    // ✅ Preview pill showing "January 1"
    datePill: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
      color: 'white',
      borderRadius: '50px',
      padding: '6px 18px',
      fontSize: '14px',
      fontWeight: '600',
      marginTop: '4px',
      alignSelf: 'flex-start',
    },
    setButton: {
      padding: '18px 50px',
      fontSize: '18px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '50px',
      background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)',
      width: '100%',
      marginTop: '20px',
    },
  };

  const animationStyles = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    select:focus {
      outline: none;
      border-color: #c06c84;
      box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Soo when are you free? 📅</h1>  
          <h2 style={styles.title}>Let's Plan Our Date! 📅</h2>
          <p style={styles.subtitle}>Pick the perfect time and place</p>

          <div style={styles.formContainer}>

            {/* ✅ Date Selection — Month (1–12) + Day (1–31) */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Calendar size={22} />
                When are you free?
              </label>

              <div style={styles.dateRow}>
                {/* Month dropdown — shows 1 to 12 */}
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    setSelectedDay(''); // reset day when month changes
                  }}
                  style={styles.select}
                >
                  <option value="">Month (1–12)</option>
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.value} – {m.label}
                    </option>
                  ))}
                </select>

                {/* Day dropdown — shows 1 to 28/29/30/31 based on month */}
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  style={styles.select}
                  disabled={!selectedMonth}
                >
                  <option value="">Day (1–{daysInMonth})</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ Live preview: shows "January 1" once both are selected */}
              {selectedMonth && selectedDay && (
                <span style={styles.datePill}>
                  📅 {getFormattedDate()}
                </span>
              )}
            </div>

            {/* Time Selection */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Clock size={22} />
                What time?
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={styles.select}
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            {/* Place Selection */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <MapPin size={22} />
                Where should we meet?
              </label>
              <select
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
                style={styles.select}
              >
                <option value="">Select a place</option>
                {places.map((place) => (
                  <option key={place} value={place}>{place}</option>
                ))}
              </select>
            </div>

          </div>

          <button
            onClick={handleSetDate}
            style={{ ...styles.setButton, opacity: isComplete ? 1 : 0.6 }}
            disabled={!isComplete}
            onMouseEnter={(e) => { if (isComplete) e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Set the Date! 🎯
          </button>
        </div>
      </div>
    </>
  );
}