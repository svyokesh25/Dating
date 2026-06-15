import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page1() {
  const navigate = useNavigate();
  const noButtonRef = useRef(null);
  const [noPos, setNoPos] = useState(null);

  const handleMouseEnterNoButton = () => {
    if (!noButtonRef.current) return;
    const card = noButtonRef.current.closest('.card-inner');
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const btnW = noButtonRef.current.offsetWidth;
    const btnH = noButtonRef.current.offsetHeight;

    const padding = 20;
    const maxX = cardRect.width - btnW - padding;
    const maxY = cardRect.height - btnH - padding;

    let newX, newY, attempts = 0;
    const curX = noPos ? noPos.x : maxX;
    const curY = noPos ? noPos.y : cardRect.height / 2 - btnH / 2;

    do {
      newX = padding + Math.random() * (maxX - padding);
      newY = padding + Math.random() * (maxY - padding);
      attempts++;
    } while (
      attempts < 15 &&
      Math.abs(newX - curX) < 100 &&
      Math.abs(newY - curY) < 50
    );

    setNoPos({ x: newX, y: newY });
  };

  const animationStyles = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
  `;

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        'linear-gradient(135deg, #ff6b9d 0%, #c06c84 25%, #6c567b 50%, #355c7d 75%, #2a9d8f 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      backgroundAttachment: 'fixed',
    },
    card: {
      background: 'white',
      borderRadius: '30px',
      padding: '40px 50px 120px 50px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      maxWidth: '600px',
      width: '100%',
      animation: 'slideIn 0.5s ease-out',
      position: 'relative',
      minHeight: '560px',
    },
    catContainer: {
      textAlign: 'center',
      marginBottom: '25px',
      animation: 'pulse 1.5s infinite',
    },
    catImage: {
      width: '180px',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '20px',
      boxShadow: '0 8px 25px rgba(255, 107, 157, 0.35)',
      border: '4px solid #ffd6e0',
      display: 'inline-block',
    },
    title: {
      fontSize: '42px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#2a2a2a',
      margin: '20px 0 50px 0',
    },
    yesButton: {
      padding: '18px 60px',
      fontSize: '20px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '50px',
      background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
      color: 'white',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)',
      position: 'absolute',
      bottom: '50px',
      left: '50px',
    },
    noButton: {
      padding: '18px 60px',
      fontSize: '20px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '50px',
      background: 'linear-gradient(135deg, #ccc, #999)',
      color: 'white',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      userSelect: 'none',
      position: 'absolute',
      transition: 'left 0.15s ease-out, top 0.15s ease-out',
    },
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div style={styles.container}>
        <div style={styles.card} className="card-inner">
          <div style={styles.catContainer}>
            <img
              src={process.env.PUBLIC_URL + '/cat.jpg'}
              alt="Cute cat"
              style={styles.catImage}
            />
          </div>

          <h1 style={styles.title}>Will you go on a date with me? 😊</h1>

          <button
            onClick={() => navigate('/page2')}
            style={styles.yesButton}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            YES 💚
          </button>

          <button
            ref={noButtonRef}
            onMouseEnter={handleMouseEnterNoButton}
            style={{
              ...styles.noButton,
              left: noPos ? `${noPos.x}px` : 'auto',
              right: noPos ? 'auto' : '50px',
              bottom: noPos ? 'auto' : '50px',
              top: noPos ? `${noPos.y}px` : 'auto',
            }}
          >
            NO 😢
          </button>
        </div>
      </div>
    </>
  );
}