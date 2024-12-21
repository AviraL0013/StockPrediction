from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model and tokenizer (ensure it's compatible with PyTorch)
with open('/Users/vritti/sent/model5.pkl', 'rb') as f:
    model = pickle.load(f)

tokenizer = AutoTokenizer.from_pretrained("yiyanghkust/finbert-tone")

def preprocess_text(text):
     # Basic text cleaning
    text = re.sub(r'[^a-zA-Z\s]', '', text)  # Remove punctuation and numbers
    text = text.lower()  # Convert to lowercase
     # Remove non-printable characters
    text = re.sub(r'[^\x00-\x7F]+', '', text)  # Removes non-ASCII characters
    # Replace multiple spaces, tabs, or newlines with a single space
    text = re.sub(r'\s+', ' ', text)  
    # Strip leading/trailing spaces
    text = text.strip() 
    return text

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        news_text = data.get('news_text', '')
        if not news_text:
            return jsonify({'error': 'No news text provided'}), 400

        # Preprocess the text
        clean_text = preprocess_text(news_text)

        # Tokenize the text
        inputs = tokenizer(clean_text, return_tensors="pt", padding=True, truncation=True, max_length=512)

        # Move inputs to GPU if available
        if torch.cuda.is_available():
            model.to('cuda')
            inputs = {key: value.to('cuda') for key, value in inputs.items()}

        # Make prediction
        model.eval()  # Set the model to evaluation mode
        with torch.no_grad():  # Disable gradient calculations
            outputs = model(**inputs)
            logits = outputs.logits  # The raw outputs (logits)

        # Convert logits to predictions (use softmax for probabilities if needed)
        predictions = torch.argmax(logits, dim=-1).item()  # Get the predicted class (0, 1, or 2)

        return jsonify({'prediction': predictions})  # Return prediction as JSON
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
