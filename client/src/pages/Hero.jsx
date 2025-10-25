import React from 'react';
const Hero = () =>{

    


    return(
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                display: 'flex',
                gap: '20px'
            }}>
                <button style={{
                    padding: '12px 24px',
                    fontSize: '1.1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Add Vehicle
                </button>
                <button style={{
                    padding: '12px 24px',
                    fontSize: '1.1rem',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Find Vehicle
                </button>
            </div>
        </div>
    )
}

export default Hero;