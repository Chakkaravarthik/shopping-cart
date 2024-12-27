import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  

  const handlesetcountinc = () => {
    setCount(count + 1);
    console.log("count added");
  };

  const handlesetcountdec = () => {
    setCount(count - 1);
    console.log("count reduced");
  };

  // API fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar count={count} />
      <div id="shop-card" className='bg-secondary'>
        {data.map((product, index) => (
          <DisplayCard
            product={product}
            key={index}
            handlesetcountinc={handlesetcountinc}
            handlesetcountdec={handlesetcountdec}
          />
        ))}
      </div>
      
    </>
  );
}

export default App;

function NavBar({ count }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">Navbar</a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item" key="home">
                <a className="nav-link text-white" href="#">Home</a>
              </li>
              <li className="nav-item" key="about">
                <a className="nav-link text-white" href="#">About</a>
              </li>
            </ul>
          </div>
          <button type="button" className="cart btn btn-light">Cart {count}</button>
        </div>
      </nav>
    </>
  );
}

function BlackProductAd(props) {
  const { title, para } = props.data;
  return (
    <>
      <div className='black-container'>
        <h1>{title}</h1>
        <p>{para}</p>
      </div>
    </>
  );
}

function DisplayCard({ product, handlesetcountdec, handlesetcountinc }) {
  const [buttonstate, setbuttonstate] = useState(true);

  return (
    <div className='card1 bg-white'>
      <img src={product.image} className="cardimg card-img-top" alt={product.name} />
      <h5 className="card-title headfont">{product.title}</h5>
      <p>{product.price}</p>
      {buttonstate ? (
        <button className="btn btn-primary" onClick={() => { setbuttonstate(!buttonstate); handlesetcountinc(); }}>
          Add To Cart
        </button>
      ) : (
        <button className="btn btn-primary" onClick={() => { setbuttonstate(!buttonstate); handlesetcountdec(); }}>
          Remove From Cart
        </button>
      )}
    </div>
  );
}
