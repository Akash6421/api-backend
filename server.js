const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

async function main() {
    const uri =
      'mongodb+srv://akash6421:159357@cluster0.xd1b4fo.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB');
    
        // Access the database and collection
        const database = client.db('weatherdata'); //'weatherdata' database name
        const collection = database.collection('temperature'); // 'temperature' collection name
    
        // Fetch weather data
        const weatherData = await collection.find({}).toArray();
        console.log('Fetched Weather Data:', weatherData);

const server = http.createServer((req, res) => {
    
    
    if (req.url === '/') {
        // read public.html file from public folder
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }

    else if (req.url === '/about') {


        // read the about.html file public folder
        fs.readFile(
            path.join(__dirname, 'public', 'about.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }
    else if (req.url==='/api/weather') // host API
    {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ weather: weatherData }));
      } else {
        // Handle other routes or serve your portfolio website
        //res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Nothing is here</h1>');
      }
    });

    /*

        But what if we have  1000 pages/urls ? do we need to write 1000 if-else statements?

    /*/


// it will first try to look for
// environment variable, if not found then go for 1482
const PORT= process.env.PORT || 10000;

// port, callback
server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));
} catch (e) {
  console.error('Error:', e);
} finally {
  await client.close();
  console.log('MongoDB connection closed');
}
}

main();
