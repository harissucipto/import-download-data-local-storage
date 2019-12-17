import React from 'react';

const Header = ({ tampil = 0, setTampil }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h1>DBMS Data Storage</h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '-20px'
        }}
      >
        <div
          style={{
            marginRight: '10px'
          }}
        >
          <p
            style={{
              textDecoration: tampil === 0 ? 'underline' : '',
              fontWeight: tampil === 0 ? 'bolder' : '',
              cursor: 'pointer'
            }}
            onClick={() => setTampil(0)}
          >
            Read Data
          </p>
        </div>
        <div
          style={{
            marginRight: '10px'
          }}
        >
          |
        </div>
        <div
          style={{
            marginRight: '10px'
          }}
        >
          <p
            style={{
              textDecoration: tampil === 1 ? 'underline' : '',
              fontWeight: tampil === 1 ? 'bolder' : '',
              cursor: 'pointer'
            }}
            onClick={() => setTampil(1)}
          >
            Upsert Data
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
