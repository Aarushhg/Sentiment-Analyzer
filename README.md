# Sentiment Analyzer

A machine learning-based sentiment analysis tool built using Python. This project analyzes the sentiment of textual data (e.g., tweets), classifying them as **positive**, **negative**, or **neutral**. It includes preprocessing, feature extraction, model training, evaluation, and a Flask-based web interface for real-time sentiment prediction.

---

## 🚀 Features

- Clean and preprocess text data
- Train multiple ML models (SVM, Logistic Regression, etc.)
- Evaluate models using accuracy, F1-score, and confusion matrix
- Flask web app for live predictions
- Custom text input for sentiment classification

---

## 🧠 Algorithms Used

- Logistic Regression
- Support Vector Machine (SVM)
- Random Forest
- Naive Bayes
- Neural Networks

---

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Aarushhg/Sentiment-Analyzer.git
cd Sentiment-Analyzer
```

2. **Create a virtual environment (optional but recommended):**

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
# OR
venv\Scripts\activate     # Windows
```

3. **Install dependencies:**

```bash
pip install -r requirements.txt
```

4. **(Optional) Download SpaCy model:**

```bash
python -m spacy download en_core_web_lg
```

---

## 🧪 Model Training

To train the models on your dataset:

```bash
python model_train.py
```

You can modify `model_train.py` to choose different models or tune hyperparameters.

---

## 🌐 Run Web App

To start the Flask web application:

```bash
python app.py
```

Then visit [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

---

## 📊 Evaluation

Model performance is evaluated using:

- Confusion Matrix
- Accuracy
- Precision, Recall, F1-Score
- ROC-AUC (for binary classification)

Results are displayed in the notebook or terminal depending on the script used.

---

## 📁 Datasets

Datasets are stored in the `Data/` folder. These can include:

- Labeled tweets (positive/negative/neutral)
- Custom datasets (CSV format)

Please ensure your dataset contains a `text` column and a `label` column for compatibility.

---

## ✅ Requirements

All Python dependencies are listed in `requirements.txt`. Key libraries include:

- Flask
- scikit-learn
- pandas
- numpy
- spaCy
- matplotlib / seaborn (for plotting)

Install them via:

```bash
pip install -r requirements.txt
```

---


## 🙌 Acknowledgements

- [scikit-learn](https://scikit-learn.org/)
- [Flask](https://flask.palletsprojects.com/)
- [spaCy](https://spacy.io/)
- [Kaggle Datasets](https://www.kaggle.com/)

---

