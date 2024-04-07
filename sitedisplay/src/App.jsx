import React, { useState, useEffect } from 'react';

function App() {
    const [link, setLink] = useState('');
    const [jsonData, setJsonData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch('/output.json');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setJsonData(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching JSON data:', error);
            setError(error.message);
        }
    }

    fetchData();
}, []);

    const handleInputChange = (event) => {
        setLink(event.target.value);
    };

    const handleCrawl = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/crawl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ link }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data)
            setJsonData(data);
            setError(null);
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

 return (
    <div>
        <input type="text" value={link} onChange={handleInputChange} />
        <button onClick={handleCrawl} disabled={loading}>
            {loading ? 'Crawling...' : 'Crawl'}
        </button>
        {error && <div>Error: {error}</div>}
        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
                <p>The Name of product is : {jsonData.product_name}</p>
                <p>Price is : {jsonData.product_price}</p>
            </>
        )}
    </div>
)
}

export default App;
