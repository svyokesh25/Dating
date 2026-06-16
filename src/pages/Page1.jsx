import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page1() {
  const navigate = useNavigate();
  const noButtonRef = useRef(null);
  const titleRef = useRef(null);
  const [noPos, setNoPos] = useState(null);

  const moveNoButton = () => {
    if (!noButtonRef.current || !titleRef.current) return;
    const card = noButtonRef.current.closest('.card-inner');
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const titleRect = titleRef.current.getBoundingClientRect();
    const btnW = noButtonRef.current.offsetWidth;
    const btnH = noButtonRef.current.offsetHeight;

    const padding = 20;
    // Constrain X movement within card width
    const maxX = cardRect.width - btnW - padding;
    // Constrain Y movement only below the title
    const titleBottom = titleRect.bottom - cardRect.top + 30; // 30px is the margin-bottom of title
    const maxY = cardRect.height - btnH - padding;
    const minY = titleBottom;

    let newX, newY, attempts = 0;
    const curX = noPos ? noPos.x : maxX;
    const curY = noPos ? noPos.y : (minY + maxY) / 2;

    do {
      newX = padding + Math.random() * (maxX - padding);
      newY = minY + Math.random() * (maxY - minY);
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
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.06); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }

    .yes-btn:hover {
      transform: scale(1.08) !important;
      box-shadow: 0 8px 25px rgba(255, 107, 157, 0.6) !important;
    }
    .yes-btn:active {
      transform: scale(0.97) !important;
    }
    .no-btn:active {
      transform: scale(0.97);
    }

    /* Responsive font sizes */
    @media (max-width: 480px) {
      .card-title { font-size: 26px !important; }
      .yes-btn, .no-btn-el { font-size: 16px !important; padding: 14px 36px !important; }
      .cat-img { width: 140px !important; height: 140px !important; }
    }
    @media (min-width: 481px) and (max-width: 768px) {
      .card-title { font-size: 32px !important; }
      .cat-img { width: 160px !important; height: 160px !important; }
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div style={{
        minHeight: '100vh',
        minHeight: '100dvh', // ✅ fixes mobile browser bar cutting off content
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 25%, #6c567b 50%, #355c7d 75%, #2a9d8f 100%)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '16px',
        backgroundAttachment: 'fixed',
      }}>
        <div
          className="card-inner"
          style={{
            background: 'white',
            borderRadius: '28px',
            padding: '36px 32px 110px 32px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            maxWidth: '520px',
            width: '100%',
            animation: 'slideIn 0.5s ease-out',
            position: 'relative',
            minHeight: '520px',
          }}
        >
          {/* Cat Image */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            animation: 'float 2.5s ease-in-out infinite',
          }}>
            <img
              src={process.env.PUBLIC_URL + '/cat.jpg'}
              alt="Cute cat"
              className="cat-img"
              style={{
                width: '170px',
                height: '170px',
                objectFit: 'cover',
                borderRadius: '20px',
                boxShadow: '0 8px 25px rgba(255,107,157,0.35)',
                border: '4px solid #ffd6e0',
                display: 'inline-block',
              }}
            />
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="card-title"
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#2a2a2a',
              margin: '0 0 30px 0',
              lineHeight: '1.3',
            }}
          >
            Will you go on a date with me? 🥹
          </h1>

          {/* YES Button — fixed bottom-left */}
          <button
            className="yes-btn"
            onClick={() => navigate('/page2')}
            style={{
              padding: '16px 50px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
              color: 'white',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 15px rgba(255,107,157,0.4)',
              position: 'absolute',
              bottom: '40px',
              left: '32px',
              touchAction: 'manipulation', // ✅ better mobile tap
            }}
          >
            YES 💚
          </button>

          {/* NO Button — moves on hover (desktop) and on touch (mobile) */}
          <button
            ref={noButtonRef}
            className="no-btn-el"
            onMouseEnter={moveNoButton}      // ✅ desktop: moves on hover
            onTouchStart={(e) => {           // ✅ mobile: moves on touch
              e.preventDefault();            // prevents ghost click
              moveNoButton();
            }}
            style={{
              padding: '16px 50px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #ccc, #999)',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              userSelect: 'none',
              position: 'absolute',
              transition: 'left 0.2s ease-out, top 0.2s ease-out',
              touchAction: 'manipulation',   // ✅ better mobile tap response
              left: noPos ? `${noPos.x}px` : 'auto',
              right: noPos ? 'auto' : '32px',
              bottom: noPos ? 'auto' : '40px',
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