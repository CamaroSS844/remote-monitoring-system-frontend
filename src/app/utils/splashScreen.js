'use client';
import { useState, useEffect } from 'react';

const styles = {
  splashScreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff6e', // White background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 123, 255, 0.9)', // Light blue bubbles
    animation: 'float 3s infinite ease-in-out',
  },
  content: {
    color: '#000', // Black text
    fontSize: '1.5rem',
    fontWeight: 'bold',
    zIndex: 1,
  },
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0) scale(1)',
    },
    '50%': {
      transform: 'translateY(-20px) scale(1.1)',
    },
    '100%': {
      transform: 'translateY(0) scale(1)',
    },
  },
};

const generateBubbles = () => {
  const bubbles = [
    { size: 40, left: 20, delay: 0 }, // Bubble 1
    { size: 60, left: 50, delay: 1 }, // Bubble 2
    { size: 50, left: 80, delay: 2 }, // Bubble 3
  ];

  return bubbles.map((bubble, index) => (
    <div
      key={index}
      style={{
        ...styles.bubble,
        width: `${bubble.size}px`,
        height: `${bubble.size}px`,
        left: `${bubble.left}%`,
        animationDelay: `${bubble.delay}s`,
      }}
    />
  ));
};

export default function SplashScreen({ children, isLoading }) {
  if (isLoading) {
    return (
      <div style={styles.splashScreen}>
        <style>
          {`
            @keyframes float {
              0% {
                transform: translateY(0) scale(1);
              }
              50% {
                transform: translateY(-20px) scale(1.1);
              }
              100% {
                transform: translateY(0) scale(1);
              }
            }
          `}
        </style>
        <div style={styles.content}>Loading...</div>
        {generateBubbles()}
      </div>
    );
  }

  return children;
}