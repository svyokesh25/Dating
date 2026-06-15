import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page5() {
  const navigate = useNavigate();
  const [dateData, setDateData] = useState(null);
  const [food, setFood] = useState('');

  useEffect(() => {
    const storedDateData = JSON.parse(localStorage.getItem('dateData'));
    const storedFood = localStorage.getItem('selectedFood');
    
    if (storedDateData) {
      setDateData(storedDateData);
    }
    if (storedFood) {
      setFood(storedFood);
    }
  }, []);

  const handleRestart = () => {
    localStorage.removeItem('dateData');
    localStorage.removeItem('selectedFood');
    navigate('/');
  };

  const getFormattedDate = () => {
    if (!dateData) return '';
    return new Date(dateData.date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

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
      padding: '60px 50px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      maxWidth: '600px',
      width: '100%',
      animation: 'slideIn 0.5s ease-out',
      textAlign: 'center',
    },
    celebration: {
      textAlign: 'center',
      marginBottom: '30px',
      animation: 'spin 1s linear infinite',
    },
    emoji: {
      fontSize: '100px',
      display: 'inline-block',
    },
    title: {
      fontSize: '40px',
      fontWeight: 'bold',
      color: '#ff6b9d',
      marginBottom: '30px',
      margin: '20px 0 30px 0',
    },
    confirmationBox: {
      background: '#fff9fb',
      padding: '40px',
      borderRadius: '20px',
      marginBottom: '40px',
      border: '3px solid #ff6b9d',
    },
    detailRow: {
      fontSize: '20px',
      color: '#2a2a2a',
      marginBottom: '20px',
      fontWeight: '500',
    },
    detailLabel: {
      fontSize: '18px',
      color: '#666',
      marginBottom: '8px',
    },
    detailValue: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#ff6b9d',
    },
    finalMessage: {
      fontSize: '22px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#2a2a2a',
      marginBottom: '40px',
      lineHeight: '1.6',
      background: '#fff9fb',
      padding: '25px',
      borderRadius: '15px',
    },
    restartButton: {
      padding: '18px 50px',
      fontSize: '18px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '50px',
      background: 'linear-gradient(135deg, #2a9d8f, #34d399)',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(42, 157, 143, 0.4)',
      width: '100%',
    },
  };

  const animationStyles = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
    }
  `;

  if (!dateData) {
    return (
      <>
        <style>{animationStyles}</style>
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.title}>Loading...</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{animationStyles}</style>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.celebration}>
            <span style={styles.emoji}>✨</span>
          </div>

          <h1 style={styles.title}>Glad you didn't say NO! 🎊</h1>

          <div style={styles.confirmationBox}>
            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>📅 DATE</div>
              <div style={styles.detailValue}>{getFormattedDate()}</div>
            </div>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>🕐 TIME</div>
              <div style={styles.detailValue}>{dateData.time}</div>
            </div>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>📍 PLACE</div>
              <div style={styles.detailValue}>{dateData.place}</div>
            </div>

            <div style={styles.detailRow}>
              <div style={styles.detailLabel}>🍽️ FOOD</div>
              <div style={styles.detailValue}>{food}</div>
            </div>
          </div>

          <div style={styles.finalMessage}>
            Be ready by <strong>{dateData.time}</strong>! 💨
            <br />I'll be coming to pick you up 🚗
            <br />
            <br />See you soon! 💕
          </div>

          <button
            onClick={handleRestart}
            style={styles.restartButton}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            Ask Someone Else 😄
          </button>
        </div>
      </div>
    </>
  );
}