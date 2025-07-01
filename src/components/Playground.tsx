import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Save, Download, Upload, BarChart3, Database, Code2, Terminal, RefreshCw, Settings, Maximize2 } from 'lucide-react';

interface PlaygroundProps {
  user?: any;
}

const Playground: React.FC<PlaygroundProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('editor');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState('iris');
  const [selectedExample, setSelectedExample] = useState('');
  
  const [code, setCode] = useState(`# Welcome to AI-ML Playground!
# Let's start with a simple machine learning example

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
import seaborn as sns

# Load sample data
print("Loading Iris dataset...")
data = pd.read_csv('iris.csv')
print(f"Dataset shape: {data.shape}")
print("\\nFirst 5 rows:")
print(data.head())

# Prepare features and target
X = data.drop('species', axis=1)
y = data['species']

print(f"\\nFeatures: {list(X.columns)}")
print(f"Target classes: {y.unique()}")

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\\nTraining set size: {X_train.shape[0]}")
print(f"Test set size: {X_test.shape[0]}")

# Train model
print("\\nTraining Random Forest model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print(f"\\n🎯 Model Accuracy: {accuracy:.4f}")
print("\\n📊 Classification Report:")
print(classification_report(y_test, predictions))

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("\\n🔍 Feature Importance:")
print(feature_importance)

print("\\n✅ Model training completed successfully!")
print("📈 Ready for visualization in the Charts tab")
`);

  const [output, setOutput] = useState('Click "Run Code" to execute your machine learning model...');

  const datasets = [
    { id: 'iris', name: 'Iris Dataset', size: '150 rows', type: 'Classification', description: 'Classic flower classification dataset' },
    { id: 'boston', name: 'Boston Housing', size: '506 rows', type: 'Regression', description: 'House price prediction dataset' },
    { id: 'mnist', name: 'MNIST Digits', size: '60k rows', type: 'Image Classification', description: 'Handwritten digit recognition' },
    { id: 'titanic', name: 'Titanic', size: '891 rows', type: 'Binary Classification', description: 'Passenger survival prediction' },
    { id: 'wine', name: 'Wine Quality', size: '1599 rows', type: 'Classification', description: 'Wine quality assessment' },
    { id: 'diabetes', name: 'Diabetes', size: '442 rows', type: 'Regression', description: 'Diabetes progression prediction' },
  ];

  const examples = [
    { id: 'linear_regression', name: 'Linear Regression', category: 'Regression' },
    { id: 'random_forest', name: 'Random Forest', category: 'Classification' },
    { id: 'neural_network', name: 'Neural Network', category: 'Deep Learning' },
    { id: 'kmeans', name: 'K-Means Clustering', category: 'Unsupervised' },
    { id: 'sentiment', name: 'Sentiment Analysis', category: 'NLP' },
    { id: 'cnn', name: 'Image Classification CNN', category: 'Computer Vision' },
    { id: 'time_series', name: 'Time Series Forecasting', category: 'Time Series' },
    { id: 'recommendation', name: 'Recommendation System', category: 'Recommender' },
  ];

  const runCode = async () => {
    if (!user) {
      alert('Please sign in to run code in the playground');
      return;
    }

    setIsRunning(true);
    setOutput('🚀 Initializing environment...\n📦 Loading libraries...\n');
    
    // Simulate code execution with realistic steps
    const steps = [
      { delay: 500, message: '📊 Loading Iris dataset...\nDataset shape: (150, 5)\n\nFirst 5 rows:\n   sepal_length  sepal_width  petal_length  petal_width species\n0           5.1          3.5           1.4          0.2  setosa\n1           4.9          3.0           1.4          0.2  setosa\n2           4.7          3.2           1.3          0.2  setosa\n3           4.6          3.1           1.5          0.2  setosa\n4           5.0          3.6           1.4          0.2  setosa' },
      { delay: 800, message: '\n\nFeatures: [\'sepal_length\', \'sepal_width\', \'petal_length\', \'petal_width\']\nTarget classes: [\'setosa\' \'versicolor\' \'virginica\']\n\nTraining set size: 120\nTest set size: 30' },
      { delay: 1200, message: '\n\n🤖 Training Random Forest model...\n⚙️ Fitting 100 decision trees...\n✅ Model training completed!' },
      { delay: 1500, message: '\n\n🎯 Model Accuracy: 0.9667\n\n📊 Classification Report:\n              precision    recall  f1-score   support\n\n      setosa       1.00      1.00      1.00        10\n  versicolor       0.91      1.00      0.95        10\n   virginica       1.00      0.90      0.95        10\n\n    accuracy                           0.97        30\n   macro avg       0.97      0.97      0.97        30\nweighted avg       0.97      0.97      0.97        30' },
      { delay: 1800, message: '\n\n🔍 Feature Importance:\n        feature  importance\n2  petal_length    0.423156\n3   petal_width    0.421784\n0  sepal_length    0.103924\n1   sepal_width    0.051136\n\n✅ Model training completed successfully!\n📈 Ready for visualization in the Charts tab\n\n⏱️ Execution time: 2.3s\n💾 Memory usage: 45.2 MB' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setOutput(prev => prev + step.message);
    }
    
    setIsRunning(false);
  };

  const loadExample = (exampleId: string) => {
    const examples_code = {
      'linear_regression': `# Linear Regression Example
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Generate sample data
np.random.seed(42)
X = np.random.randn(100, 1)
y = 2 * X.flatten() + 1 + np.random.randn(100) * 0.1

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

print(f"R² Score: {r2_score(y_test, y_pred):.4f}")
print(f"MSE: {mean_squared_error(y_test, y_pred):.4f}")`,
      
      'neural_network': `# Neural Network with TensorFlow/Keras
import tensorflow as tf
from tensorflow import keras
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Generate dataset
X, y = make_classification(n_samples=1000, n_features=20, n_classes=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Build model
model = keras.Sequential([
    keras.layers.Dense(64, activation='relu', input_shape=(20,)),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(32, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train model
history = model.fit(X_train_scaled, y_train, epochs=50, batch_size=32, 
                   validation_split=0.2, verbose=1)

# Evaluate
test_loss, test_accuracy = model.evaluate(X_test_scaled, y_test)
print(f"Test Accuracy: {test_accuracy:.4f}")`
    };

    if (examples_code[exampleId]) {
      setCode(examples_code[exampleId]);
      setSelectedExample(exampleId);
    }
  };

  const saveCode = () => {
    if (!user) {
      alert('Please sign in to save your code');
      return;
    }
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ml_playground_code.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Code2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in to access the AI-ML Playground and start coding your machine learning models.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">
            Sign In to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-ML <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Playground</span>
          </h1>
          <p className="text-xl text-gray-600">
            Code, train, and test machine learning models in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Datasets */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Datasets
              </h3>
              <div className="space-y-3">
                {datasets.map((dataset) => (
                  <motion.div
                    key={dataset.id}
                    onClick={() => setSelectedDataset(dataset.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedDataset === dataset.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="font-medium text-gray-900 text-sm">{dataset.name}</div>
                    <div className="text-xs text-gray-500">{dataset.size} • {dataset.type}</div>
                    <div className="text-xs text-gray-400 mt-1">{dataset.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Examples */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Code2 className="w-5 h-5 mr-2" />
                Code Examples
              </h3>
              <div className="space-y-2">
                {examples.map((example) => (
                  <motion.button
                    key={example.id}
                    onClick={() => loadExample(example.id)}
                    className={`w-full text-left p-2 text-sm rounded-md transition-all ${
                      selectedExample === example.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="font-medium">{example.name}</div>
                    <div className="text-xs opacity-75">{example.category}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200 bg-gray-50">
                <div className="flex space-x-8 px-6">
                  {[
                    { id: 'editor', label: 'Code Editor', icon: Code2 },
                    { id: 'output', label: 'Console Output', icon: Terminal },
                    { id: 'visualization', label: 'Charts & Graphs', icon: BarChart3 },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toolbar */}
              <div className="border-b border-gray-200 bg-white px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={runCode}
                      disabled={isRunning}
                      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                        isRunning 
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                      }`}
                      whileHover={{ scale: isRunning ? 1 : 1.05 }}
                      whileTap={{ scale: isRunning ? 1 : 0.95 }}
                    >
                      {isRunning ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                    </motion.button>
                    
                    <motion.button
                      onClick={saveCode}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </motion.button>

                    <motion.button
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </motion.button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <motion.button
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Upload className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="h-96 lg:h-[500px]">
                {activeTab === 'editor' && (
                  <div className="h-full relative">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full p-6 font-mono text-sm bg-gray-900 text-green-400 resize-none focus:outline-none"
                      style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
                      placeholder="Write your Python code here..."
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                      Lines: {code.split('\n').length} | Characters: {code.length}
                    </div>
                  </div>
                )}

                {activeTab === 'output' && (
                  <div className="p-6 h-full bg-gray-900 text-white font-mono text-sm overflow-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-green-400">Console Output:</span>
                      {isRunning && <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />}
                    </div>
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  </div>
                )}

                {activeTab === 'visualization' && (
                  <div className="p-6 h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Visualization Panel</h3>
                      <p className="text-gray-600 mb-4">Charts and graphs will appear here after running your code</p>
                      <div className="text-sm text-gray-500">
                        Supported: Matplotlib, Seaborn, Plotly visualizations
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Playground;

