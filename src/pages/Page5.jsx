import React, { useEffect, useState } from 'react';

export default function Page5() {
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
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 25%, #6c567b 50%, #355c7d 75%, #2a9d8f 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '14px',
      backgroundAttachment: 'fixed',
    },
    card: {
      background: 'white',
      borderRadius: '26px',
      padding: '24px 22px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.28)',
      maxWidth: '500px',
      width: '100%',
      animation: 'slideIn 0.5s ease-out',
      textAlign: 'center',
    },
    dogWrap: {
      marginBottom: '12px',
      display: 'flex',
      justifyContent: 'center',
    },
    dogImage: {
      width: '110px',
      height: '110px',
      objectFit: 'cover',
      borderRadius: '18px',
      boxShadow: '0 8px 24px rgba(255, 107, 157, 0.28)',
      border: '4px solid #ffe0eb',
    },
    celebration: {
      marginBottom: '8px',
      animation: 'float 2s ease-in-out infinite',
    },
    emoji: {
      fontSize: '40px',
      display: 'inline-block',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#ff6b9d',
      margin: '8px 0 18px 0',
      lineHeight: '1.2',
    },
    detailsBlock: {
      background: '#fff9fb',
      padding: '18px 16px',
      borderRadius: '18px',
      marginBottom: '16px',
      border: '2px solid #ff6b9d',
      textAlign: 'left',
    },
    detailLine: {
      fontSize: '18px',
      color: '#2a2a2a',
      fontWeight: '600',
      lineHeight: '1.8',
      marginBottom: '6px',
      wordBreak: 'break-word',
    },
    finalMessage: {
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#2a2a2a',
      lineHeight: '1.55',
      background: '#fff9fb',
      padding: '16px 14px',
      borderRadius: '14px',
    },
  };

  const animationStyles = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(24px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-6px);
      }
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
    }

    @media (max-width: 480px) {
      .page5-card {
        padding: 18px 14px !important;
        border-radius: 20px !important;
      }

      .page5-dog {
        width: 88px !important;
        height: 88px !important;
        border-radius: 14px !important;
      }

      .page5-title {
        font-size: 24px !important;
        margin: 6px 0 14px 0 !important;
      }

      .page5-details {
        padding: 14px 12px !important;
      }

      .page5-line {
        font-size: 15px !important;
        line-height: 1.7 !important;
      }

      .page5-message {
        font-size: 15px !important;
        padding: 13px 11px !important;
      }
    }

    @media (min-width: 481px) and (max-width: 768px) {
      .page5-title {
        font-size: 28px !important;
      }
    }
  `;

  if (!dateData) {
    return (
      <>
        <style>{animationStyles}</style>
        <div style={styles.container}>
          <div style={styles.card} className="page5-card">
            <h1 style={styles.title} className="page5-title">Loading...</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{animationStyles}</style>
      <div style={styles.container}>
        <div style={styles.card} className="page5-card">
          <div style={styles.dogWrap}>
            <img
              src="/dog.jpg"
              alt="Cute dog"
              style={styles.dogImage}
              className="page5-dog"
            />
          </div>

          <div style={styles.celebration}>
            <span style={styles.emoji}>😍</span>
          </div>

          <h1 style={styles.title} className="page5-title">
            Woo!!! Glad you didn't say NO! 🎊
          </h1>

          <div style={styles.detailsBlock} className="page5-details">
            <div style={styles.detailLine} className="page5-line">
              📅 DATE - {getFormattedDate()}
            </div>
            <div style={styles.detailLine} className="page5-line">
              🕐 TIME - {dateData.time}
            </div>
            <div style={styles.detailLine} className="page5-line">
              📍 PLACE - {dateData.place}
            </div>
            <div style={{ ...styles.detailLine, marginBottom: 0 }} className="page5-line">
              🍽️ FOOD - {food}
            </div>
          </div>

          <div style={styles.finalMessage} className="page5-message">
            Be ready by <strong>{dateData.time}</strong>! 💨
            <br />I'll be coming to pick you up 🚗
            <br />
            <br />See you soon! 💕
          </div>
        </div>
      </div>
    </>
  );
}