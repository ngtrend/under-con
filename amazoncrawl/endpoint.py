from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/crawl', methods=['POST'])
def crawl():
    link = request.json.get('link')
    print(link)

    # Run Scrapy spider with the provided link as argument
    try:
        process = subprocess.Popen(['scrapy', 'crawl', 'amazoncrawler', '-a', f'url={link}'])
        process.communicate()  # Wait for the process to finish

        # Read and parse the output.json file
        with open('D:/app/pro/undercon/sitedisplay/public/output.json','r') as file:
            data = json.load(file)

        # Wrap the data in a list to form a valid JSON array
        response_data = [data]

        return jsonify(response_data)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
