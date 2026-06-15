import React from 'react';
import { useNavigate } from 'react-router-dom';
import catImg from '../Assets/cat.jpg'; 

export default function Page2() {
  const navigate = useNavigate();

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
    // ✅ Cat image replaces the emoji animation
    catAnimation: {
      marginBottom: '30px',
      animation: 'bounce 0.6s infinite',
      display: 'flex',
      justifyContent: 'center',
    },
    catImage: {
      width: '180px',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '50%',           // ✅ circular shape looks cute
      boxShadow: '0 8px 30px rgba(255, 107, 157, 0.5)',
      border: '4px solid #ff8fab',
    },
    title: {
      fontSize: '42px',
      fontWeight: 'bold',
      color: '#ff6b9d',
      margin: '20px 0 20px 0',
    },
    subtitle: {
      fontSize: '20px',
      color: '#666',
      marginBottom: '50px',
      lineHeight: '1.6',
    },
    okButton: {
      padding: '18px 60px',
      fontSize: '20px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '50px',
      background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)',
      width: '100%',
      marginTop: '30px',
    },
  };

  const animationStyles = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-20px); }
    }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div style={styles.container}>
        <div style={styles.card}>

          {/* ✅ Cat image bouncing instead of 🎉 emoji */}
          <div style={styles.catAnimation}>
            <img
              src={catImg}
              alt="Cute cat"
              style={styles.catImage}
            />
          </div>

          <h1 style={styles.title}>You actually said YES!😭</h1>
          <p style={styles.subtitle}>
            I thought you would say NO... but I'm soo happy! 😸
          </p>

          <button
            onClick={() => navigate('/page3')}
            style={styles.okButton}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Okay Okay!--
          </button>

        </div>
      </div>
    </>
  );
}