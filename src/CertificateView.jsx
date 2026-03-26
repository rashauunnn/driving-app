import React, { useState, useEffect, useRef } from 'react';

export default function CertificateView({ userData, onExit }) {
  const [showCertificate, setShowCertificate] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const scrollRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 15;
    const y = ((clientY - top) / height - 0.5) * -15;
    setTilt({ x, y });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  useEffect(() => {
    if (!showCertificate && scrollRef.current) {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += 1;
          if (scrollRef.current.scrollTop + scrollRef.current.clientHeight >= scrollRef.current.scrollHeight) {
            clearInterval(interval);
          }
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [showCertificate]);

  if (showCertificate) {
    return (
      <div className="ultra-view-wrapper" style={{ 
        background: '#050505', height: '100vh', overflowY: 'auto',
        padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center',
        perspective: '1200px', position: 'relative'
      }}>
        {/* --- BACKGROUND ANIMATION --- */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(241, 196, 15, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(241, 196, 15, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px', zIndex: 0
        }}></div>

        <style>{`
          @keyframes scan-line { from { top: -10%; } to { top: 110%; } }
          @keyframes seal-pop { 
            0% { transform: scale(0) rotate(-45deg); opacity: 0; } 
            80% { transform: scale(1.2) rotate(-15deg); } 
            100% { transform: scale(1) rotate(-15deg); opacity: 1; } 
          }
          .formal-cert { transition: transform 0.1s ease-out; animation: fadeIn 1s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @media print { 
            .no-print { display: none !important; } 
            body { background: white !important; }
            .formal-cert { transform: none !important; box-shadow: none !important; border: 1px solid #000 !important; background: #000 !important; -webkit-print-color-adjust: exact; }
          }
        `}
        
        </style>

        <style>{`
        .sig-img {
          height: 180px; /* Default for PC */
          filter: invert(1);
          opacity: 0.95;
          display: block;
          transform: rotate(-2deg);
        }

        /* 2. MOBILE OVERRIDE */
        @media (max-width: 600px) {
          .sig-img {
            height: 100px; /* Scaled down for Phones */
          }
          .sig-container {
            bottom: 20px !important; /* Move it down slightly so it doesn't float too high on mobile */
          }
          .sig-line {
            width: 180px !important; /* Shorter line for mobile */
          }
        }

        /* ... rest of your existing animations ... */
      `}</style>

        {/* Moving Scan Line */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '2px', background: 'rgba(241, 196, 15, 0.2)', boxShadow: '0 0 15px #f1c40f', animation: 'scan-line 6s linear infinite', zIndex: 1 }}></div>

        {/* --- THE 3D MASTER OPERATOR CERTIFICATE --- */}
        <div 
          className="formal-cert" 
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          style={{
            background: 'linear-gradient(145deg, #111 0%, #050505 100%)',
            width: '100%', maxWidth: '650px', padding: '60px 50px',
            position: 'relative', color: '#fff', textAlign: 'center',
            boxShadow: '0 50px 100px rgba(0,0,0,1), 0 0 20px rgba(241, 196, 15, 0.1)',
            borderRadius: '4px', border: '1px solid #222',
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transformStyle: 'preserve-3d', zIndex: 2
        }}>
            <div style={{ transform: 'translateZ(60px)' }}>
                <p style={{ letterSpacing: '8px', fontSize: '10px', fontWeight: '900', color: '#f1c40f', marginBottom: '10px' }}>
                    CERTIFICATE OF ACHIEVEMENT
                </p>
                <h1 style={{ fontFamily: 'serif', fontSize: '2.8rem', margin: '0', color: '#fff', textTransform: 'uppercase' }}>
                    Master Operator
                </h1>
                
                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #f1c40f, transparent)', width: '100%', margin: '25px 0' }}></div>

                <p style={{ fontSize: '14px', color: '#888', fontStyle: 'italic', marginBottom: '30px' }}>
                    This document serves as formal validation that
                </p>

                <h2 style={{ fontSize: '3.2rem', fontWeight: '900', color: '#fff', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
                    {userData?.name || "CHIEF OPERATOR"}
                </h2>

                <p style={{ fontSize: '13px', color: '#666', maxWidth: '420px', margin: '20px auto', lineHeight: '1.6' }}>
                    Demonstrated elite proficiency in Spatial Reasoning and Hazard Perception under high-stress simulation.
                </p>

                <div style={{ border: '1px solid #333', padding: '15px 30px', display: 'inline-block', borderRadius: '4px', background: 'rgba(255,255,255,0.02)' }}>
                    <span style={{ fontSize: '9px', color: '#555', display: 'block', letterSpacing: '2px' }}>FINAL EVALUATION SCORE</span>
                    <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#f1c40f' }}>{userData?.score || "98"}%</span>
                </div>

                {/* SIGNATURE SECTION */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '70px', alignItems: 'flex-end' }}>
                  <div style={{ textAlign: 'left', position: 'relative' }}>
                      
                      {/* Signature Image Container */}
                      <div className="sig-container" style={{ 
                          position: 'absolute', 
                          bottom: '35px', 
                          left: '5px', 
                          height: 'auto', 
                          pointerEvents: 'none',
                          zIndex: 5
                      }}>
                          <img 
                              src="/signature.png" 
                              className="sig-img"
                              alt="Authorized Signature" 
                              onError={(e) => { e.target.style.opacity = 0; }}
                          />
                      </div>

                      {/* The Line */}
                      <div className="sig-line" style={{ borderBottom: '1px solid #444', width: '280px', marginBottom: '8px' }}></div>
                      
                      {/* Labels */}
                      <span style={{ fontSize: '10px', color: '#f1c40f', fontWeight: 'bold', display: 'block', paddingLeft: '5px' }}>
                          Shaquiel Daniel Umandap
                      </span>
                      <span style={{ fontSize: '8px', color: '#444', display: 'block', paddingLeft: '5px' }}>
                          COMMANDING OFFICER / ARCHITECT
                      </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>{new Date().toLocaleDateString()}</span>
                      <div style={{ borderBottom: '1px solid #444', width: '100px', marginBottom: '8px' }}></div>
                      <span style={{ fontSize: '8px', color: '#444' }}>DATE OF ISSUE</span>
                  </div>
              </div>
            </div>

            {/* RED WAX SEAL */}
            <div style={{
              position: 'absolute', bottom: '20px', left: '50%', marginLeft: '-45px',
              width: '90px', height: '90px', background: '#b22222', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.5)',
              border: '2px solid rgba(255,255,255,0.1)',
              animation: 'seal-pop 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
              transform: 'rotate(-15deg)', zIndex: 10
            }}>
              <span style={{ color: '#fff', fontSize: '9px', fontWeight: '900', textAlign: 'center', letterSpacing: '1px' }}>CERTIFIED<br/>ELITE</span>
            </div>
        </div>
        
        {/* ACTION BUTTONS */}
        <div className="no-print" style={{ marginTop: '50px', width: '100%', maxWidth: '650px', display: 'flex', flexDirection: 'column', gap: '15px', paddingBottom: '60px', zIndex: 10 }}>
            <button onClick={() => window.print()} style={{
              background: '#f1c40f', color: '#000', padding: '20px', borderRadius: '4px', 
              fontWeight: '900', border: 'none', cursor: 'pointer', fontSize: '16px',
              boxShadow: '0 10px 30px rgba(241, 196, 15, 0.2)'
            }}>
                DOWNLOAD CREDENTIAL (PNG/PDF)
            </button>
            <button onClick={onExit} style={{ background: 'transparent', border: 'none', color: '#444', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}>
               RETURN TO COMMAND DASHBOARD
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="stealth-container debrief-view" style={{ background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="debrief-scroll-box" ref={scrollRef} style={{ maxHeight: '80vh', overflowY: 'auto', padding: '40px', width: '100%', maxWidth: '600px' }}>
        <p style={{ color: '#f1c40f', fontFamily: 'monospace', fontSize: '12px', marginBottom: '20px' }}>[ INCOMING DEBRIEFING ]</p>
        <h2 style={{ color: '#fff', fontSize: '2.2rem', marginBottom: '20px' }}>Mission Accomplished.</h2>
        <p style={{ color: '#888', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '40px' }}>
          You have successfully navigated the tactical landscape. The Command has verified your results.
        </p>
        <button 
          onClick={() => setShowCertificate(true)}
          style={{ 
            width: '100%', padding: '25px', background: '#f1c40f', color: '#000', 
            fontWeight: '900', border: 'none', borderRadius: '4px', cursor: 'pointer',
            boxShadow: '0 0 30px rgba(241, 196, 15, 0.4)', fontSize: '18px'
          }}>
          BREAK SEAL & VIEW CREDENTIALS
        </button>
      </div>
    </div>
  );
}