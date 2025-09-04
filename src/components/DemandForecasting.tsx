import React, { useState, useEffect } from 'react';
import { DemandForecast, SeasonalFactor } from '../types/scm';
import '../styles/DemandForecasting.css';

// モックデータ
const mockDemandForecasts: DemandForecast[] = [
  {
    id: 'DF001',
    productId: 'INV001',
    productName: 'スチール板材 5mm',
    period: '2025-02',
    forecastQuantity: 85,
    actualQuantity: 82,
    accuracy: 96.5,
    method: 'ai',
    confidence: 88,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'DF002',
    productId: 'INV002',
    productName: 'ボルト M8x50',
    period: '2025-02',
    forecastQuantity: 450,
    actualQuantity: 435,
    accuracy: 96.7,
    method: 'seasonal',
    confidence: 82,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'DF003',
    productId: 'INV003',
    productName: 'アルミニウム角材',
    period: '2025-02',
    forecastQuantity: 65,
    actualQuantity: undefined,
    accuracy: undefined,
    method: 'trend',
    confidence: 75,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'DF004',
    productId: 'INV004',
    productName: '電動ドリル替刃',
    period: '2025-02',
    forecastQuantity: 120,
    actualQuantity: undefined,
    accuracy: undefined,
    method: 'historical',
    confidence: 70,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  }
];

const mockSeasonalFactors: SeasonalFactor[] = [
  { month: 1, factor: 0.8, category: '原材料' },
  { month: 2, factor: 0.9, category: '原材料' },
  { month: 3, factor: 1.2, category: '原材料' },
  { month: 4, factor: 1.3, category: '原材料' },
  { month: 5, factor: 1.1, category: '原材料' },
  { month: 6, factor: 1.0, category: '原材料' },
  { month: 7, factor: 0.9, category: '原材料' },
  { month: 8, factor: 0.8, category: '原材料' },
  { month: 9, factor: 1.1, category: '原材料' },
  { month: 10, factor: 1.4, category: '原材料' },
  { month: 11, factor: 1.2, category: '原材料' },
  { month: 12, factor: 0.7, category: '原材料' }
];

const DemandForecasting: React.FC = () => {
  const [forecasts, setForecasts] = useState<DemandForecast[]>(mockDemandForecasts);
  const [selectedPeriod, setSelectedPeriod] = useState('2025-02');
  const [selectedMethod, setSelectedMethod] = useState<'all' | 'historical' | 'seasonal' | 'trend' | 'ai'>('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'historical': return '履歴ベース';
      case 'seasonal': return '季節調整';
      case 'trend': return 'トレンド分析';
      case 'ai': return 'AI予測';
      default: return method;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'historical': return '#3498db';
      case 'seasonal': return '#e67e22';
      case 'trend': return '#9b59b6';
      case 'ai': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getAccuracyColor = (accuracy?: number) => {
    if (!accuracy) return '#95a5a6';
    if (accuracy >= 95) return '#27ae60';
    if (accuracy >= 85) return '#f39c12';
    return '#e74c3c';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return '#27ae60';
    if (confidence >= 70) return '#f39c12';
    return '#e74c3c';
  };

  const filteredForecasts = forecasts.filter(forecast => {
    const periodMatch = forecast.period === selectedPeriod;
    const methodMatch = selectedMethod === 'all' || forecast.method === selectedMethod;
    return periodMatch && methodMatch;
  });

  const generateNewForecast = async () => {
    setIsGenerating(true);
    // シミュレート処理時間
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 新しい予測を生成（実際の実装ではAPIを呼び出す）
    const newForecast: DemandForecast = {
      id: `DF${Date.now()}`,
      productId: 'INV005',
      productName: '完成品 モーターケース',
      period: selectedPeriod,
      forecastQuantity: Math.floor(Math.random() * 100) + 50,
      actualQuantity: undefined,
      accuracy: undefined,
      method: 'ai',
      confidence: Math.floor(Math.random() * 20) + 75,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setForecasts(prev => [...prev, newForecast]);
    setIsGenerating(false);
  };

  const averageAccuracy = filteredForecasts
    .filter(f => f.accuracy !== undefined)
    .reduce((sum, f) => sum + (f.accuracy || 0), 0) / 
    filteredForecasts.filter(f => f.accuracy !== undefined).length || 0;

  const averageConfidence = filteredForecasts
    .reduce((sum, f) => sum + f.confidence, 0) / filteredForecasts.length || 0;

  return (
    <div className="demand-forecasting">
      <div className="forecasting-header">
        <div className="header-title">
          <h2>🔮 需要予測・計画</h2>
          <p>過去のデータと市場動向から将来の需要を予測し、生産・調達計画を最適化</p>
        </div>
        <div className="header-controls">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="2025-01">2025年1月</option>
            <option value="2025-02">2025年2月</option>
            <option value="2025-03">2025年3月</option>
            <option value="2025-04">2025年4月</option>
          </select>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value as any)}
            className="method-select"
          >
            <option value="all">全手法</option>
            <option value="historical">履歴ベース</option>
            <option value="seasonal">季節調整</option>
            <option value="trend">トレンド分析</option>
            <option value="ai">AI予測</option>
          </select>
          <button 
            className="generate-btn"
            onClick={generateNewForecast}
            disabled={isGenerating}
          >
            {isGenerating ? '🔄 生成中...' : '🎯 予測生成'}
          </button>
        </div>
      </div>

      <div className="forecasting-summary">
        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-content">
            <div className="summary-value">{filteredForecasts.length}</div>
            <div className="summary-label">予測アイテム数</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">🎯</div>
          <div className="summary-content">
            <div className="summary-value">{averageAccuracy.toFixed(1)}%</div>
            <div className="summary-label">平均予測精度</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">🔒</div>
          <div className="summary-content">
            <div className="summary-value">{averageConfidence.toFixed(1)}%</div>
            <div className="summary-label">平均信頼度</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">📈</div>
          <div className="summary-content">
            <div className="summary-value">
              {filteredForecasts.reduce((sum, f) => sum + f.forecastQuantity, 0)}
            </div>
            <div className="summary-label">総予測数量</div>
          </div>
        </div>
      </div>

      <div className="forecasting-content">
        <div className="forecasts-section">
          <h3>📋 需要予測一覧</h3>
          <div className="forecasts-grid">
            {filteredForecasts.map((forecast) => (
              <div key={forecast.id} className="forecast-card">
                <div className="forecast-header">
                  <h4>{forecast.productName}</h4>
                  <div 
                    className="method-badge"
                    style={{ backgroundColor: getMethodColor(forecast.method) }}
                  >
                    {getMethodLabel(forecast.method)}
                  </div>
                </div>
                
                <div className="forecast-metrics">
                  <div className="metric">
                    <span className="metric-label">予測数量</span>
                    <span className="metric-value forecast-quantity">
                      {forecast.forecastQuantity.toLocaleString()}
                    </span>
                  </div>
                  
                  {forecast.actualQuantity && (
                    <div className="metric">
                      <span className="metric-label">実績数量</span>
                      <span className="metric-value actual-quantity">
                        {forecast.actualQuantity.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  <div className="metric">
                    <span className="metric-label">信頼度</span>
                    <span 
                      className="metric-value confidence"
                      style={{ color: getConfidenceColor(forecast.confidence) }}
                    >
                      {forecast.confidence}%
                    </span>
                  </div>
                  
                  {forecast.accuracy && (
                    <div className="metric">
                      <span className="metric-label">予測精度</span>
                      <span 
                        className="metric-value accuracy"
                        style={{ color: getAccuracyColor(forecast.accuracy) }}
                      >
                        {forecast.accuracy.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="forecast-actions">
                  <button className="btn-detail">📊 詳細</button>
                  <button className="btn-adjust">⚙️ 調整</button>
                  <button className="btn-apply">✅ 採用</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="seasonal-section">
          <h3>📅 季節調整係数</h3>
          <div className="seasonal-chart">
            <div className="chart-container">
              <svg viewBox="0 0 800 300" className="seasonal-svg">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="66.67" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 66.67 0 L 0 0 0 50" fill="none" stroke="#e1e8ed" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="800" height="300" fill="url(#grid)" />
                
                {/* Y-axis */}
                <line x1="50" y1="50" x2="50" y2="250" stroke="#2c3e50" strokeWidth="2"/>
                {/* X-axis */}
                <line x1="50" y1="250" x2="750" y2="250" stroke="#2c3e50" strokeWidth="2"/>
                
                {/* Reference line at 1.0 */}
                <line x1="50" y1="150" x2="750" y2="150" stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5"/>
                <text x="760" y="155" fontSize="12" fill="#e74c3c">1.0</text>
                
                {/* Seasonal factors line chart */}
                <path
                  d={`M 108.33 ${250 - mockSeasonalFactors[0].factor * 100} ${mockSeasonalFactors.slice(1).map((factor, index) => 
                    `L ${108.33 + (index + 1) * 58.33} ${250 - factor.factor * 100}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#3498db"
                  strokeWidth="3"
                />
                
                {/* Data points */}
                {mockSeasonalFactors.map((factor, index) => (
                  <g key={factor.month}>
                    <circle
                      cx={108.33 + index * 58.33}
                      cy={250 - factor.factor * 100}
                      r="6"
                      fill={factor.factor > 1 ? '#27ae60' : factor.factor < 1 ? '#e74c3c' : '#3498db'}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x={108.33 + index * 58.33}
                      y={270}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#2c3e50"
                    >
                      {factor.month}月
                    </text>
                    <text
                      x={108.33 + index * 58.33}
                      y={factor.factor > 1 ? 250 - factor.factor * 100 - 10 : 250 - factor.factor * 100 + 20}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill={factor.factor > 1 ? '#27ae60' : factor.factor < 1 ? '#e74c3c' : '#3498db'}
                    >
                      {factor.factor.toFixed(1)}
                    </text>
                  </g>
                ))}
                
                {/* Y-axis labels */}
                <text x="40" y="255" textAnchor="end" fontSize="12" fill="#2c3e50">0.0</text>
                <text x="40" y="205" textAnchor="end" fontSize="12" fill="#2c3e50">0.5</text>
                <text x="40" y="155" textAnchor="end" fontSize="12" fill="#2c3e50">1.0</text>
                <text x="40" y="105" textAnchor="end" fontSize="12" fill="#2c3e50">1.5</text>
                
                {/* Chart title */}
                <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="600" fill="#2c3e50">
                  原材料カテゴリの季節調整係数
                </text>
              </svg>
            </div>
          </div>
          
          <div className="seasonal-legend">
            <div className="legend-item">
              <div className="legend-color high"></div>
              <span>需要増加期 (係数 > 1.0)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color normal"></div>
              <span>通常期 (係数 = 1.0)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color low"></div>
              <span>需要減少期 (係数 < 1.0)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandForecasting;
