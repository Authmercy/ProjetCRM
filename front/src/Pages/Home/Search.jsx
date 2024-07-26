import React, { useEffect, useState } from 'react'
import axios from 'axios';

function SearchBar() {
  const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (query.length > 0) {
            fetch(`http://localhost:8000/api/products/search/?name=${query}`)
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error fetching products:', error));
        } else {
            setProducts([]);
        }
    }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un produit..."
      />
      <ul>
        {products.map((product => (
          <li key={product.id}>
            <h3>{product.nomProduit}</h3>
            <p>{product.description}</p>
            <p>prix: {product.prix}</p>
            <p>qte: {product.quantite}</p>
          </li>
        )))}
      </ul>
    </div>
  );
}

export default SearchBar;