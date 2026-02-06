import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios
      .get(`${baseUrl}/products/all`)
      .then((response) => {
        console.log(response.data);
        setAllProducts(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const addToCart = (product) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (token) {
      axios
        .post(
          `${baseUrl}/cart/${product.id}?quantity=1`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          alert('Product added to cart');
          console.log('Product added to cart:', response.data);
        })
        .catch((error) => {
          console.error('Error adding product to cart:', error.message);
        });
    } else {
      console.error('Error: Authorization token not found.');
    }
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, {
      state: { product },
    });
  };

  const handleCategoryFilter = (category) => {
    const filteredProducts = allProducts.filter(
      (product) => product.category === category
    );
    setProducts(filteredProducts);
  };

  const handleRateFilter = (rate) => {
    const filteredProducts = allProducts.filter(
      (product) => product.rate === rate
    );
    setProducts(filteredProducts);
  };

  const handleSortChange = (event) => {
    const order = event.target.value === '1' ? 'asc' : 'desc';
    const sortedProducts = sortProductsByPrice([...products], order);
    setProducts(sortedProducts);
  };

  const sortProductsByPrice = (productsToSort, order = 'asc') => {
    return productsToSort.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else if (order === 'desc') {
        return b.price - a.price;
      } else {
        console.error('Invalid order parameter');
        return 0;
      }
    });
  };

  const handleSearch = (e) => {
    const searchWord = e.target.value.toLowerCase();
    setSearchTerm(searchWord);

    let filteredProducts;
    if (searchWord === '') {
      filteredProducts = allProducts;
    } else {
      filteredProducts = allProducts.filter((product) => {
        const brandAndModel = (
          product.brand +
          ' ' +
          product.model
        ).toLowerCase();
        return brandAndModel.includes(searchWord);
      });
    }

    setProducts(filteredProducts);
  };

  const getUniqueCategories = () => {
    const categories = allProducts.map((product) => product.category);
    return [...new Set(categories)];
  };

  const ShowRate = ({ rate }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi bi-star-fill ${
            i <= rate ? 'text-warning' : 'text-secondary'
          }`}
        ></i>
      );
    }
    return <>{stars}</>;
  };

  return (
    <section className="container my-4">
      <h1 className="my-3">Shop</h1>
      <div className="row">
        <div className="col-2">
          <input
            type="search"
            placeholder="search"
            className="form-control mb-3 w-100"
            value={searchTerm}
            onChange={handleSearch}
          />

          <div className="border-bottom my-3 py-2">
            <h3>Category</h3>
            <div className="ps-3 fw-bold fs-5">
              {getUniqueCategories().map((category, index) => (
                <div
                  key={index}
                  className="my-1"
                  onClick={() => handleCategoryFilter(category)}
                  style={{ cursor: 'pointer' }}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>

          <div className="border-bottom my-3 py-2">
            <h3>Rate</h3>
            <div className="ps-3 fw-bold fs-5">
              {[5, 4, 3, 2, 1].map((rate) => (
                <div
                  key={rate}
                  className="my-1"
                  onClick={() => handleRateFilter(rate)}
                  style={{ cursor: 'pointer' }}
                >
                  {[...Array(rate)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill text-warning"></i>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-10">
          <div className="w-25 mb-3">
            <button
              className="btn btn-danger mb-2"
              onClick={getAllProducts}
            >
              All products
            </button>

            <select
              className="form-select"
              aria-label="Sort products by price"
              onChange={handleSortChange}
            >
              <option selected>Sort by price</option>
              <option value="1">Price: Low to High</option>
              <option value="2">Price: High to Low</option>
            </select>
          </div>

          <div className="row row-cols-2 row-cols-md-4 g-4">
            {products.map((product, index) => (
              <div className="col" key={index}>
                <div className="card h-100 border-0">
                  <div className="bg-light-grey p-3">
                    <img
                      src={product.imageUrl}
                      className="card-img-top"
                      alt={`${product.brand} ${product.model}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleProductClick(product)}
                    />
                  </div>

                  <div className="card-body">
                    <h6 className="card-title">
                      {product.brand} {product.model}
                    </h6>
                    <div className="text-danger">{product.price}$</div>
                    <div>
                      <ShowRate rate={product.rate} />
                      <span className="text-secondary">
                        {' '}
                        ({product.reviewsCount ||
                          Math.round(Math.random() * 100)})
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn btn-dark w-100 my-2"
                    onClick={() => addToCart(product)}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
