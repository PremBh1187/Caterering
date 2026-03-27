import { useState, useEffect } from 'react';
import Link from 'next/link';
import CatererCard from '../components/CatererCard';
import Sidebar from '../components/Sidebar';

export default function Caterers() {
  const [caterers, setCaterers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchCaterers = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/caterers');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCaterers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaterers();
  }, []);

  const filteredCaterers = caterers.filter((caterer) => {
    const matchesName = caterer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = maxPrice === '' || caterer.pricePerPlate <= parseFloat(maxPrice);
    return matchesName && matchesPrice;
  });

  if (loading) return <div className="container loading">🍽️ Loading caterers...</div>;
  if (error) return <div className="container error">⚠️ Error: {error}</div>;

  return (
    <>
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🍲</span>
          <span className="logo-text">Cater<span>Find</span></span>
        </div>
        <p className="tagline">Discover the perfect caterer for your event</p>
        <Link href="/add-caterer" className="add-btn">
          + Add Caterer
        </Link>
      </header>

      <div className="main-layout">
        <Sidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        <main className="cards-container">
          <div className="cards">
            {filteredCaterers.length === 0 ? (
              <p className="no-results">No caterers found. Try adjusting your search or filter.</p>
            ) : (
              filteredCaterers.map((caterer) => (
                <CatererCard key={caterer.id} caterer={caterer} />
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}