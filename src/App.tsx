import React, { useState } from 'react';
import './App.css';
import DemandForecasting from './components/DemandForecasting';
import SupplierManagement from './components/SupplierManagement';


type ActiveTab = 'dashboard' | 'demand' | 'suppliers' | 'production' | 'logistics' | 'risks' | 'costs' | 'integration';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left"></div>
          <div className="logo-section">
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">稼働中</span>
            </div>
          </div>
          <div className="header-right">
            <div className="current-time">
              {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </header>

      <nav className="app-nav">
        <div className="nav-section">
          <div className="nav-section-title">概要</div>
          <button
            className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">ダッシュボード</span>
          </button>
        </div>
        
        <div className="nav-section">
          <div className="nav-section-title">SCM機能</div>
          <button
            className={`nav-button ${activeTab === 'demand' ? 'active' : ''}`}
            onClick={() => setActiveTab('demand')}
          >
            <span className="nav-icon">🔮</span>
            <span className="nav-text">需要予測</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'suppliers' ? 'active' : ''}`}
            onClick={() => setActiveTab('suppliers')}
          >
            <span className="nav-icon">🤝</span>
            <span className="nav-text">サプライヤー</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'production' ? 'active' : ''}`}
            onClick={() => setActiveTab('production')}
          >
            <span className="nav-icon">🏭</span>
            <span className="nav-text">生産計画</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'logistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('logistics')}
          >
            <span className="nav-icon">🚛</span>
            <span className="nav-text">物流最適化</span>
          </button>
        </div>
        
        <div className="nav-section">
          <div className="nav-section-title">分析・管理</div>
          <button
            className={`nav-button ${activeTab === 'risks' ? 'active' : ''}`}
            onClick={() => setActiveTab('risks')}
          >
            <span className="nav-icon">⚠️</span>
            <span className="nav-text">リスク管理</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'costs' ? 'active' : ''}`}
            onClick={() => setActiveTab('costs')}
          >
            <span className="nav-icon">💰</span>
            <span className="nav-text">コスト分析</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'integration' ? 'active' : ''}`}
            onClick={() => setActiveTab('integration')}
          >
            <span className="nav-icon">🔗</span>
            <span className="nav-text">システム連携</span>
          </button>
        </div>
      </nav>

      <main className="app-main">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <div className="dashboard-header">
              <h2>SCM ダッシュボード</h2>
              <button className="refresh-btn">🔄 更新</button>
            </div>

            <div className="stats-grid">
              <div className="stat-card demand-forecast">
                <div className="stat-icon">🔮</div>
                <div className="stat-content">
                  <h3>需要予測精度</h3>
                  <div className="stat-value">96.4%</div>
                  <div className="stat-unit">平均精度</div>
                </div>
              </div>
              <div className="stat-card supplier-performance">
                <div className="stat-icon">🤝</div>
                <div className="stat-content">
                  <h3>サプライヤー評価</h3>
                  <div className="stat-value">4.4</div>
                  <div className="stat-unit">平均評価</div>
                </div>
              </div>
              <div className="stat-card cost-optimization">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>コスト削減</h3>
                  <div className="stat-value">12.3%</div>
                  <div className="stat-unit">前年比</div>
                </div>
              </div>
              <div className="stat-card delivery-performance">
                <div className="stat-icon">🚚</div>
                <div className="stat-content">
                  <h3>納期遵守率</h3>
                  <div className="stat-value">94.2%</div>
                  <div className="stat-unit">平均遵守率</div>
                </div>
              </div>
            </div>

            <div className="alerts-section">
              <h3>🚨 SCM アラート</h3>
              <div className="alerts-list">
                <div className="alert-item warning">
                  <span className="alert-icon">⚠️</span>
                  <span className="alert-text">サプライヤー「関西部品工業」の納期遅延が発生しています</span>
                  <span className="alert-time">15分前</span>
                </div>
                <div className="alert-item info">
                  <span className="alert-icon">📈</span>
                  <span className="alert-text">スチール板材の需要予測が上方修正されました</span>
                  <span className="alert-time">1時間前</span>
                </div>
                <div className="alert-item critical">
                  <span className="alert-icon">🚨</span>
                  <span className="alert-text">物流ルートの最適化により配送コスト8%削減を達成</span>
                  <span className="alert-time">3時間前</span>
                </div>
              </div>
            </div>

            <div className="scm-overview">
              <h3>📊 サプライチェーン概要</h3>
              <div className="overview-grid">
                <div className="overview-card">
                  <div className="overview-header">
                    <h4>🔮 需要予測</h4>
                    <span className="status-badge active">稼働中</span>
                  </div>
                  <p>AI予測モデルが来月の需要を分析中。季節要因とトレンドを考慮した高精度予測を提供。</p>
                  <button 
                    className="overview-btn"
                    onClick={() => setActiveTab('demand')}
                  >
                    詳細を見る
                  </button>
                </div>
                
                <div className="overview-card">
                  <div className="overview-header">
                    <h4>🤝 サプライヤー管理</h4>
                    <span className="status-badge active">稼働中</span>
                  </div>
                  <p>4社のサプライヤーを管理中。パフォーマンス評価と契約最適化を継続実行。</p>
                  <button 
                    className="overview-btn"
                    onClick={() => setActiveTab('suppliers')}
                  >
                    詳細を見る
                  </button>
                </div>
                
                <div className="overview-card">
                  <div className="overview-header">
                    <h4>🏭 生産計画</h4>
                    <span className="status-badge coming-soon">準備中</span>
                  </div>
                  <p>需要予測に基づく生産スケジュール最適化とリソース配分管理機能。</p>
                  <button 
                    className="overview-btn disabled"
                    onClick={() => setActiveTab('production')}
                  >
                    近日公開
                  </button>
                </div>
                
                <div className="overview-card">
                  <div className="overview-header">
                    <h4>🚛 物流最適化</h4>
                    <span className="status-badge coming-soon">準備中</span>
                  </div>
                  <p>配送ルート最適化とリアルタイム追跡による効率的な物流管理。</p>
                  <button 
                    className="overview-btn disabled"
                    onClick={() => setActiveTab('logistics')}
                  >
                    近日公開
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}



        {activeTab === 'demand' && <DemandForecasting />}
        
        {activeTab === 'suppliers' && <SupplierManagement />}
        
        {activeTab === 'production' && (
          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>🏭 生産計画・スケジューリング</h2>
              <p>需要予測に基づく生産計画とリソース最適化機能</p>
              <div className="feature-preview">
                <div className="preview-item">📅 生産スケジュール管理</div>
                <div className="preview-item">⚙️ リソース配分最適化</div>
                <div className="preview-item">📊 生産効率分析</div>
                <div className="preview-item">🔄 リアルタイム進捗追跡</div>
              </div>
              <button className="preview-btn">近日公開予定</button>
            </div>
          </div>
        )}
        
        {activeTab === 'logistics' && (
          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>🚛 物流・配送最適化</h2>
              <p>輸送ルート最適化とリードタイム短縮機能</p>
              <div className="feature-preview">
                <div className="preview-item">🗺️ ルート最適化エンジン</div>
                <div className="preview-item">📦 配送スケジュール管理</div>
                <div className="preview-item">💸 輸送コスト最小化</div>
                <div className="preview-item">📍 リアルタイム追跡</div>
              </div>
              <button className="preview-btn">近日公開予定</button>
            </div>
          </div>
        )}
        
        {activeTab === 'risks' && (
          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>⚠️ リスク管理・アラート</h2>
              <p>サプライチェーンリスクの早期検知と対応支援</p>
              <div className="feature-preview">
                <div className="preview-item">🚨 自動アラート機能</div>
                <div className="preview-item">📋 リスク評価マトリックス</div>
                <div className="preview-item">🛡️ 緊急時対応計画</div>
                <div className="preview-item">📈 リスクトレンド分析</div>
              </div>
              <button className="preview-btn">近日公開予定</button>
            </div>
          </div>
        )}
        
        {activeTab === 'costs' && (
          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>💰 コスト分析・最適化</h2>
              <p>総コスト最適化のための詳細分析と改善提案</p>
              <div className="feature-preview">
                <div className="preview-item">📊 コスト構造分析</div>
                <div className="preview-item">💡 改善提案エンジン</div>
                <div className="preview-item">🎯 ROI計算機能</div>
                <div className="preview-item">📉 コスト削減追跡</div>
              </div>
              <button className="preview-btn">近日公開予定</button>
            </div>
          </div>
        )}
        
        {activeTab === 'integration' && (
          <div className="coming-soon">
            <div className="coming-soon-content">
              <h2>🔗 外部システム連携</h2>
              <p>ERP、WMS、TMS等との統合によるデータ一元化</p>
              <div className="feature-preview">
                <div className="preview-item">🔄 リアルタイムデータ同期</div>
                <div className="preview-item">🔌 API統合管理</div>
                <div className="preview-item">📋 EDI連携機能</div>
                <div className="preview-item">⚙️ カスタムマッピング</div>
              </div>
              <button className="preview-btn">近日公開予定</button>
            </div>
          </div>
        )}

      </main>

      <footer className="app-footer">
        <p>© 2025 統合SCMシステム - AWS Amplify Hosting | Supply Chain Management Platform</p>
      </footer>
    </div>
  );
}

export default App;