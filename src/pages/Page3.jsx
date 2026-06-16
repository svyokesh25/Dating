import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function Page3() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');

  const timeSlots = ['10:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '8:00 PM', '10:00 PM'];
  const places = ['Downtown', 'Mall', 'Park', 'Beach', 'Restaurant District', 'Movie Theater'];

  const handleSetDate = () => {
    if (selectedDate && selectedTime && selectedPlace) {
      localStorage.setItem(
        'dateData',
        JSON.stringify({
          date: new Date(selectedDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          time: selectedTime,
          place: selectedPlace,
        })
      );
      navigate('/page4');
    } else {
      alert('Please select all options! 😊');
    }
  };

  const isComplete = selectedDate && selectedTime && selectedPlace;

  const animationStyles = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }

    select:focus,
    input:focus {
      outline: none;
      border-color: #c06c84;
      box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.15);
    }

    select:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .set-btn:hover {
      transform: scale(1.04);
      box-shadow: 0 8px 25px rgba(255, 107, 157, 0.5) !important;
    }

    .set-btn:active {
      transform: scale(0.97);
    }

    @media (max-width: 480px) {
      .page3-card {
        padding: 28px 20px 32px 20px !important;
        border-radius: 20px !important;
      }
      .page3-title {
        font-size: 22px !important;
        margin-bottom: 4px !important;
      }
      .page3-subtitle {
        font-size: 14px !important;
        margin-bottom: 24px !important;
      }
      .page3-label {
        font-size: 14px !important;
      }
      .page3-select {
        padding: 11px 12px !important;
        font-size: 14px !important;
      }
      .page3-btn {
        padding: 14px 30px !important;
        font-size: 16px !important;
      }
    }

    @media (min-width: 481px) and (max-width: 768px) {
      .page3-card {
        padding: 36px 32px !important;
      }
      .page3-title {
        font-size: 28px !important;
      }
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div
        style={{
          minHeight: '100vh',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 25%, #6c567b 50%, #355c7d 75%, #2a9d8f 100%)',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          padding: '16px',
          backgroundAttachment: 'fixed',
        }}
      >
        <div
          className="page3-card"
          style={{
            background: 'white',
            borderRadius: '28px',
            padding: '44px 44px 36px 44px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            maxWidth: '560px',
            width: '100%',
            animation: 'slideIn 0.5s ease-out',
          }}
        >
          <h1
            className="page3-title"
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#ff6b9d',
              marginBottom: '6px',
              lineHeight: '1.3',
            }}
          >
            Soo when are you free? 😎
          </h1>

          <h2
            className="page3-title"
            style={{
              fontSize: '26px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#2a2a2a',
              marginBottom: '8px',
              lineHeight: '1.3',
            }}
          >
            Let's Plan Our Date! 📅
          </h2>

          <p
            className="page3-subtitle"
            style={{
              fontSize: '16px',
              textAlign: 'center',
              color: '#888',
              marginBottom: '32px',
            }}
          >
            Pick the perfect time and place
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '10px' }}>
            {/* Date - changed only this part */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label
                className="page3-label"
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#2a2a2a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Calendar size={20} />
                Pick a Day ✨
              </label>

              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="page3-select"
                style={{
                  padding: '13px 14px',
                  fontSize: '15px',
                  border: '2px solid #ff6b9d',
                  borderRadius: '12px',
                  background: 'white',
                  fontFamily: 'inherit',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  color: '#2a2a2a',
                }}
              />

              {selectedDate && (
                <span
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                    color: 'white',
                    borderRadius: '50px',
                    padding: '5px 16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    alignSelf: 'flex-start',
                  }}
                >
                  📅{' '}
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>

            {/* Time */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label
                className="page3-label"
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#2a2a2a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Clock size={20} />
                What time?
              </label>
              <select
                className="page3-select"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{
                  padding: '13px 14px',
                  fontSize: '15px',
                  border: '2px solid #ff6b9d',
                  borderRadius: '12px',
                  background: 'white',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                }}
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Place */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label
                className="page3-label"
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#2a2a2a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <MapPin size={20} />
                Where should we meet?
              </label>
              <select
                className="page3-select"
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
                style={{
                  padding: '13px 14px',
                  fontSize: '15px',
                  border: '2px solid #ff6b9d',
                  borderRadius: '12px',
                  background: 'white',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                }}
              >
                <option value="">Select a place</option>
                {places.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="set-btn page3-btn"
            onClick={handleSetDate}
            disabled={!isComplete}
            style={{
              padding: '16px 50px',
              fontSize: '17px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
              color: 'white',
              cursor: isComplete ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)',
              width: '100%',
              marginTop: '24px',
              opacity: isComplete ? 1 : 0.55,
            }}
          >
            Set the Date! 🎯
          </button>
        </div>
      </div>
    </>
  );
}