import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Save, Download, Upload, BarChart3, Database, Code2, Terminal, RefreshCw, Settings, Maximize2, CheckCircle, Clock, Trophy, Target, BookOpen, Zap, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Playground: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('ml-playground');
  const [activeTab, setActiveTab] = useState('editor');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState('iris');
  const [selectedExample, setSelectedExample] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [challengeProgress, setChallengeProgress] = useState({});
  const [userStats, setUserStats] = useState({
    totalChallenges: 45,
    completedChallenges: user?.stats?.completedChallenges || 0,
    currentStreak: user?.streak || 0,
    totalXP: user?.xp || 0,
    rank: user?.stats?.rank || 999,
    accuracy: user?.stats?.accuracy || 0,
    timeSpent: user?.stats?.timeSpent || 0,
    languageProgress: user?.stats?.languageProgress || {
      python: 0,
      javascript: 0,
      java: 0,
      cpp: 0,
      sql: 0
    }
  });
  
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

  const programmingChallenges = {
    python: [
      { id: 'py1', title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', completed: user?.stats?.completedChallenges >= 1, xp: 50 },
      { id: 'py2', title: 'Fibonacci Sequence', difficulty: 'Easy', category: 'Recursion', completed: user?.stats?.completedChallenges >= 2, xp: 50 },
      { id: 'py3', title: 'Binary Search', difficulty: 'Medium', category: 'Algorithms', completed: false, xp: 100 },
      { id: 'py4', title: 'Merge Sort', difficulty: 'Medium', category: 'Sorting', completed: false, xp: 100 },
      { id: 'py5', title: 'Graph Traversal', difficulty: 'Hard', category: 'Graphs', completed: false, xp: 200 },
    ],
    javascript: [
      { id: 'js1', title: 'DOM Manipulation', difficulty: 'Easy', category: 'Web Dev', completed: user?.stats?.languageProgress?.javascript >= 20, xp: 50 },
      { id: 'js2', title: 'Async/Await', difficulty: 'Medium', category: 'Promises', completed: false, xp: 100 },
      { id: 'js3', title: 'React Component', difficulty: 'Medium', category: 'React', completed: false, xp: 100 },
      { id: 'js4', title: 'API Integration', difficulty: 'Hard', category: 'Backend', completed: false, xp: 200 },
    ],
    java: [
      { id: 'java1', title: 'OOP Concepts', difficulty: 'Easy', category: 'Classes', completed: false, xp: 50 },
      { id: 'java2', title: 'Collections Framework', difficulty: 'Medium', category: 'Data Structures', completed: false, xp: 100 },
      { id: 'java3', title: 'Multithreading', difficulty: 'Hard', category: 'Concurrency', completed: false, xp: 200 },
    ],
    cpp: [
      { id: 'cpp1', title: 'Pointers & Memory', difficulty: 'Medium', category: 'Memory Management', completed: false, xp: 100 },
      { id: 'cpp2', title: 'STL Algorithms', difficulty: 'Medium', category: 'Standard Library', completed: false, xp: 100 },
      { id: 'cpp3', title: 'Template Programming', difficulty: 'Hard', category: 'Templates', completed: false, xp: 200 },
    ],
    sql: [
      { id: 'sql1', title: 'Basic Queries', difficulty: 'Easy', category: 'SELECT', completed: user?.stats?.languageProgress?.sql >= 20, xp: 50 },
      { id: 'sql2', title: 'Joins & Subqueries', difficulty: 'Medium', category: 'Advanced Queries', completed: false, xp: 100 },
      { id: 'sql3', title: 'Database Design', difficulty: 'Hard', category: 'Schema Design', completed: false, xp: 200 },
    ]
  };

  const challengeTemplates = {
    py1: `# Two Sum Problem
# Given an array of integers nums and an integer target, 
# return indices of the two numbers such that they add up to target.

def two_sum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your code here
    pass

# Test cases
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Input: nums = {nums}, target = {target}")
print(f"Output: {result}")
print(f"Expected: [0, 1]")`,
    
    py2: `# Fibonacci Sequence
# Write a function to return the nth Fibonacci number

def fibonacci(n):
    """
    Calculate the nth Fibonacci number
    :param n: position in sequence
    :return: Fibonacci number at position n
    """
    # Your code here
    pass

# Test cases
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,

    js1: `// DOM Manipulation Challenge
// Create a dynamic todo list with add, remove, and toggle functionality

// HTML structure (already provided):
// <div id="todo-container">
//   <input id="todo-input" type="text" placeholder="Enter a task">
//   <button id="add-btn">Add Task</button>
//   <ul id="todo-list"></ul>
// </div>

function initTodoApp() {
    // Your code here
    // Implement add, remove, and toggle functionality
}

// Initialize the app
initTodoApp();`,

    sql1: `-- Basic SQL Queries Challenge
-- Write queries to solve the following problems

-- Table: employees
-- +-------------+---------+
-- | Column Name | Type    |
-- +-------------+---------+
-- | id          | int     |
-- | name        | varchar |
-- | salary      | int     |
-- | department  | varchar |
-- +-------------+---------+

-- 1. Select all employees with salary > 50000
-- Your query here:


-- 2. Find the average salary by department
-- Your query here:


-- 3. Get the top 5 highest paid employees
-- Your query here:

`
  };

  const recentActivity = [
    { type: 'challenge', title: 'Completed: Two Sum Problem', time: '2 hours ago', xp: 50 },
    { type: 'ml', title: 'Trained: Random Forest Model', time: '4 hours ago', xp: 100 },
    { type: 'challenge', title: 'Attempted: Binary Search', time: '1 day ago', xp: 0 },
    { type: 'ml', title: 'Completed: Linear Regression Tutorial', time: '2 days ago', xp: 75 },
  ];

  const weeklyProgress = [
    { day: 'Mon', challenges: 3, ml: 2, xp: 250 },
    { day: 'Tue', challenges: 2, ml: 1, xp: 150 },
    { day: 'Wed', challenges: 4, ml: 3, xp: 350 },
    { day: 'Thu', challenges: 1, ml: 2, xp: 200 },
    { day: 'Fri', challenges: 3, ml: 1, xp: 200 },
    { day: 'Sat', challenges: 2, ml: 4, xp: 400 },
    { day: 'Sun', challenges: 1, ml: 1, xp: 100 },
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

  const loadChallenge = (challengeId: string) => {
    if (challengeTemplates[challengeId]) {
      setCode(challengeTemplates[challengeId]);
      setSelectedChallenge(challengeId);
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
    a.download = `${activeSection === 'ml-playground' ? 'ml_playground' : 'programming_challenge'}_code.${selectedLanguage === 'python' ? 'py' : selectedLanguage === 'javascript' ? 'js' : selectedLanguage === 'java' ? 'java' : selectedLanguage === 'cpp' ? 'cpp' : 'sql'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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
            Please sign in to access the Interactive Playground and start your coding journey.
          </p>
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
            Interactive <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Playground</span>
          </h1>
          <p className="text-xl text-gray-600">
            Master AI/ML and programming through hands-on practice
          </p>
        </motion.div>

        {/* Section Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'ml-playground', label: 'AI/ML Playground', icon: Database },
                { id: 'programming', label: 'Programming Practice', icon: Code2 },
                { id: 'performance', label: 'Performance Dashboard', icon: BarChart3 },
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeSection === section.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ML Playground Section */}
        {activeSection === 'ml-playground' && (
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
                  ML Examples
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
        )}

        {/* Programming Practice Section */}
        {activeSection === 'programming' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Language Selection & Challenges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Language Selection */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Programming Languages</h3>
                <div className="space-y-2">
                  {Object.keys(programmingChallenges).map((lang) => (
                    <motion.button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedLanguage === lang
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'text-gray-700 hover:bg-blue-50 border border-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="font-medium capitalize">{lang}</div>
                      <div className="text-xs opacity-75">
                        {programmingChallenges[lang].filter(c => c.completed).length}/{programmingChallenges[lang].length} completed
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                        <div 
                          className="bg-blue-500 h-1 rounded-full transition-all"
                          style={{ 
                            width: `${(programmingChallenges[lang].filter(c => c.completed).length / programmingChallenges[lang].length) * 100}%` 
                          }}
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Challenges List */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Challenges
                </h3>
                <div className="space-y-3">
                  {programmingChallenges[selectedLanguage]?.map((challenge) => (
                    <motion.div
                      key={challenge.id}
                      onClick={() => loadChallenge(challenge.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedChallenge === challenge.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900 text-sm">{challenge.title}</div>
                        {challenge.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <div className="text-xs text-gray-500">
                          {challenge.xp} XP • {challenge.category}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Code Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedChallenge ? 
                        programmingChallenges[selectedLanguage]?.find(c => c.id === selectedChallenge)?.title || 'Code Editor'
                        : 'Code Editor'
                      }
                    </h3>
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
                        <span>{isRunning ? 'Testing...' : 'Test Code'}</span>
                      </motion.button>
                      
                      <motion.button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trophy className="w-4 h-4" />
                        <span>Submit</span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="h-96 lg:h-[500px] relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full p-6 font-mono text-sm bg-gray-900 text-green-400 resize-none focus:outline-none"
                    style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
                    placeholder={`Write your ${selectedLanguage} code here...`}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                    {selectedLanguage.toUpperCase()} | Lines: {code.split('\n').length}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Performance Dashboard Section */}
        {activeSection === 'performance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total XP', value: userStats.totalXP.toLocaleString(), icon: Trophy, color: 'text-yellow-500', change: '+120 this week' },
                { label: 'Challenges Solved', value: `${userStats.completedChallenges}/${userStats.totalChallenges}`, icon: Target, color: 'text-blue-500', change: '+3 this week' },
                { label: 'Current Streak', value: `${userStats.currentStreak} days`, icon: Zap, color: 'text-orange-500', change: 'Keep it up!' },
                { label: 'Global Rank', value: `#${userStats.rank}`, icon: Award, color: 'text-purple-500', change: '+12 positions' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Weekly Progress Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
                  Weekly Progress
                </h3>
                <div className="space-y-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={day.day} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                      <div className="flex-1 flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(day.xp / 400) * 100}%` }}
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-900 w-16">{day.xp} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Language Progress */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Code2 className="w-6 h-6 mr-2 text-purple-500" />
                  Language Mastery
                </h3>
                <div className="space-y-4">
                  {Object.entries(userStats.languageProgress).map(([lang, progress]) => (
                    <div key={lang} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 capitalize">{lang}</span>
                        <span className="text-sm text-gray-500">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-green-500" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'challenge' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'ml' ? 'bg-purple-100 text-purple-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {activity.type === 'challenge' ? <Target className="w-5 h-5" /> :
                       activity.type === 'ml' ? <Database className="w-5 h-5" /> :
                       <BookOpen className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">+{activity.xp} XP</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Playground;