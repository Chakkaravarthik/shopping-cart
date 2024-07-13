import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const adData = {
    title: "Shop In Style",
    para: "Home Page Template"
  };

  const ad2Data = {
    title: "",
    para: "Copyright © Your Website 2023"
  };

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
      <BlackProductAd data={adData} />
      <div id="shop-card">
        {data.map((product, index) => (
          <DisplayCard
            product={product}
            key={index}
            handlesetcountinc={handlesetcountinc}
            handlesetcountdec={handlesetcountdec}
          />
        ))}
      </div>
      <BlackProductAd data={ad2Data} />
    </>
  );
}

export default App;

function NavBar({ count }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item" key="home">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item" key="about">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item dropdown" key="shop">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Shop
                </a>
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
    <div className='card1'>
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
