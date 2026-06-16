import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page4() {
  const navigate = useNavigate();

  const foods = [
    { id: 1, name: 'Burger', emoji: '🍔' },
    { id: 2, name: 'Pizza', emoji: '🍕' },
    { id: 3, name: 'Sushi', emoji: '🍣' },
    { id: 4, name: 'Pasta', emoji: '🍝' },
    { id: 5, name: 'Tacos', emoji: '🌮' },
    { id: 6, name: 'Coffee & Cake', emoji: '☕' },
  ];

  const handleFoodSelect = (foodName) => {
    localStorage.setItem('selectedFood', foodName);
    navigate('/page5');
  };

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
      padding: '50px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      maxWidth: '700px',
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
    foodGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    foodCard: {
      padding: '30px 20px',
      border: '3px solid #ff6b9d',
      borderRadius: '20px',
      background: '#fff9fb',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      fontWeight: '600',
      color: '#2a2a2a',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },
    foodEmoji: {
      fontSize: '60px',
    },
    foodName: {
      fontSize: '16px',
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

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>

      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>What Should We Eat? 🍽️</h1>

          <p style={styles.subtitle}>
            Pick your favorite (Note: We can have a split bill 😁)
          </p>

          <div style={styles.foodGrid}>
            {foods.map((food) => (
              <button
                key={food.id}
                onClick={() => handleFoodSelect(food.name)}
                style={styles.foodCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 30px rgba(255, 107, 157, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                <span style={styles.foodEmoji}>{food.emoji}</span>

                <span style={styles.foodName}>{food.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}