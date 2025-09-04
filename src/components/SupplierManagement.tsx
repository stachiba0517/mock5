import React, { useState, useMemo } from 'react';
import { Supplier, Contract, PurchaseOrder } from '../types/scm';
import '../styles/SupplierManagement.css';

// モックデータ
const mockSuppliers: Supplier[] = [
  {
    id: 'SUP001',
    name: '東京鉄鋼株式会社',
    category: '原材料',
    contactInfo: {
      email: 'orders@tokyo-steel.co.jp',
      phone: '03-1234-5678',
      address: '東京都大田区蒲田1-2-3'
    },
    rating: 4.8,
    performance: {
      onTimeDelivery: 96.5,
      qualityScore: 98.2,
      costCompetitiveness: 87.3,
      riskLevel: 'low'
    },
    contracts: [],
    certifications: ['ISO9001', 'ISO14001', 'JIS認証'],
    paymentTerms: '月末締め翌月末払い',
    leadTime: 7,
    minimumOrder: 100000,
    isActive: true
  },
  {
    id: 'SUP002',
    name: '関西部品工業',
    category: '部品',
    contactInfo: {
      email: 'sales@kansai-parts.com',
      phone: '06-9876-5432',
      address: '大阪府大阪市住之江区南港1-1-1'
    },
    rating: 4.2,
    performance: {
      onTimeDelivery: 89.1,
      qualityScore: 94.7,
      costCompetitiveness: 92.8,
      riskLevel: 'medium'
    },
    contracts: [],
    certifications: ['ISO9001', 'TS16949'],
    paymentTerms: '20日締め翌月10日払い',
    leadTime: 10,
    minimumOrder: 50000,
    isActive: true
  },
  {
    id: 'SUP003',
    name: 'アルミテック九州',
    category: '原材料',
    contactInfo: {
      email: 'info@alumi-kyushu.jp',
      phone: '092-111-2222',
      address: '福岡県福岡市博多区博多駅前2-3-4'
    },
    rating: 3.9,
    performance: {
      onTimeDelivery: 82.4,
      qualityScore: 91.5,
      costCompetitiveness: 95.2,
      riskLevel: 'medium'
    },
    contracts: [],
    certifications: ['ISO9001', 'JIS認証'],
    paymentTerms: '月末締め翌々月10日払い',
    leadTime: 14,
    minimumOrder: 75000,
    isActive: true
  },
  {
    id: 'SUP004',
    name: '精密工具メーカー',
    category: '工具',
    contactInfo: {
      email: 'orders@precision-tools.co.jp',
      phone: '052-333-4444',
      address: '愛知県名古屋市中区錦1-2-3'
    },
    rating: 4.6,
    performance: {
      onTimeDelivery: 94.8,
      qualityScore: 97.1,
      costCompetitiveness: 78.9,
      riskLevel: 'low'
    },
    contracts: [],
    certifications: ['ISO9001', 'ISO14001'],
    paymentTerms: '15日締め翌月末払い',
    leadTime: 5,
    minimumOrder: 30000,
    isActive: true
  }
];

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-2025-001',
    supplierId: 'SUP001',
    supplierName: '東京鉄鋼株式会社',
    items: [
      {
        productId: 'INV001',
        productName: 'スチール板材 5mm',
        quantity: 50,
        unitPrice: 15000,
        totalPrice: 750000,
        deliveryDate: '2025-02-01',
        specifications: '厚さ5mm、幅1000mm、長さ2000mm'
      }
    ],
    totalAmount: 750000,
    currency: 'JPY',
    orderDate: '2025-01-15',
    expectedDeliveryDate: '2025-02-01',
    status: 'sent',
    priority: 'normal',
    terms: '月末締め翌月末払い',
    notes: '定期発注分'
  },
  {
    id: 'PO-2025-002',
    supplierId: 'SUP002',
    supplierName: '関西部品工業',
    items: [
      {
        productId: 'INV002',
        productName: 'ボルト M8x50',
        quantity: 500,
        unitPrice: 80,
        totalPrice: 40000,
        deliveryDate: '2025-01-25',
        specifications: 'ステンレス製、六角頭'
      }
    ],
    totalAmount: 40000,
    currency: 'JPY',
    orderDate: '2025-01-10',
    expectedDeliveryDate: '2025-01-25',
    actualDeliveryDate: '2025-01-24',
    status: 'delivered',
    priority: 'high',
    terms: '20日締め翌月10日払い',
    notes: '緊急補充'
  }
];

const SupplierManagement: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [activeTab, setActiveTab] = useState<'suppliers' | 'orders' | 'performance'>('suppliers');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '#27ae60';
      case 'medium': return '#f39c12';
      case 'high': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getRiskLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '低リスク';
      case 'medium': return '中リスク';
      case 'high': return '高リスク';
      default: return '不明';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#95a5a6';
      case 'sent': return '#3498db';
      case 'confirmed': return '#f39c12';
      case 'delivered': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return '下書き';
      case 'sent': return '送信済み';
      case 'confirmed': return '確認済み';
      case 'delivered': return '納品済み';
      case 'cancelled': return 'キャンセル';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return '#95a5a6';
      case 'normal': return '#3498db';
      case 'high': return '#f39c12';
      case 'urgent': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low': return '低';
      case 'normal': return '通常';
      case 'high': return '高';
      case 'urgent': return '緊急';
      default: return priority;
    }
  };

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;
      const matchesRisk = riskFilter === 'all' || supplier.performance.riskLevel === riskFilter;
      return matchesSearch && matchesCategory && matchesRisk;
    });
  }, [suppliers, searchTerm, categoryFilter, riskFilter]);

  const categories = [...new Set(suppliers.map(s => s.category))];

  const supplierStats = useMemo(() => {
    const active = suppliers.filter(s => s.isActive).length;
    const avgRating = suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length;
    const avgDelivery = suppliers.reduce((sum, s) => sum + s.performance.onTimeDelivery, 0) / suppliers.length;
    const highRisk = suppliers.filter(s => s.performance.riskLevel === 'high').length;
    
    return {
      total: suppliers.length,
      active,
      avgRating: avgRating.toFixed(1),
      avgDelivery: avgDelivery.toFixed(1),
      highRisk
    };
  }, [suppliers]);

  return (
    <div className="supplier-management">
      <div className="supplier-header">
        <div className="header-title">
          <h2>🤝 サプライヤー管理</h2>
          <p>サプライヤーの評価、契約管理、発注処理を統合的に管理</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-value">{supplierStats.total}</span>
            <span className="stat-label">登録サプライヤー</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{supplierStats.active}</span>
            <span className="stat-label">アクティブ</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{supplierStats.avgRating}</span>
            <span className="stat-label">平均評価</span>
          </div>
        </div>
      </div>

      <div className="supplier-nav">
        <button
          className={`nav-button ${activeTab === 'suppliers' ? 'active' : ''}`}
          onClick={() => setActiveTab('suppliers')}
        >
          <span className="nav-icon">🏢</span>
          <span className="nav-text">サプライヤー一覧</span>
        </button>
        <button
          className={`nav-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <span className="nav-icon">📋</span>
          <span className="nav-text">発注管理</span>
        </button>
        <button
          className={`nav-button ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-text">パフォーマンス</span>
        </button>
      </div>

      <div className="supplier-content">
        {activeTab === 'suppliers' && (
          <div className="suppliers-section">
            <div className="section-header">
              <div className="filters">
                <input
                  type="text"
                  placeholder="サプライヤー名で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">全カテゴリ</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">全リスクレベル</option>
                  <option value="low">低リスク</option>
                  <option value="medium">中リスク</option>
                  <option value="high">高リスク</option>
                </select>
              </div>
              <button className="add-supplier-btn">➕ サプライヤー追加</button>
            </div>

            <div className="suppliers-grid">
              {filteredSuppliers.map((supplier) => (
                <div key={supplier.id} className="supplier-card">
                  <div className="supplier-header">
                    <div className="supplier-info">
                      <h3>{supplier.name}</h3>
                      <span className="supplier-category">{supplier.category}</span>
                    </div>
                    <div className="supplier-status">
                      <div className="rating">
                        <span className="rating-value">⭐ {supplier.rating}</span>
                      </div>
                      <div 
                        className="risk-badge"
                        style={{ backgroundColor: getRiskColor(supplier.performance.riskLevel) }}
                      >
                        {getRiskLabel(supplier.performance.riskLevel)}
                      </div>
                    </div>
                  </div>

                  <div className="supplier-performance">
                    <div className="performance-item">
                      <span className="perf-label">納期遵守率</span>
                      <div className="perf-bar">
                        <div 
                          className="perf-fill"
                          style={{ 
                            width: `${supplier.performance.onTimeDelivery}%`,
                            backgroundColor: supplier.performance.onTimeDelivery >= 90 ? '#27ae60' : 
                                           supplier.performance.onTimeDelivery >= 80 ? '#f39c12' : '#e74c3c'
                          }}
                        />
                        <span className="perf-value">{supplier.performance.onTimeDelivery}%</span>
                      </div>
                    </div>

                    <div className="performance-item">
                      <span className="perf-label">品質スコア</span>
                      <div className="perf-bar">
                        <div 
                          className="perf-fill"
                          style={{ 
                            width: `${supplier.performance.qualityScore}%`,
                            backgroundColor: supplier.performance.qualityScore >= 95 ? '#27ae60' : 
                                           supplier.performance.qualityScore >= 85 ? '#f39c12' : '#e74c3c'
                          }}
                        />
                        <span className="perf-value">{supplier.performance.qualityScore}%</span>
                      </div>
                    </div>

                    <div className="performance-item">
                      <span className="perf-label">コスト競争力</span>
                      <div className="perf-bar">
                        <div 
                          className="perf-fill"
                          style={{ 
                            width: `${supplier.performance.costCompetitiveness}%`,
                            backgroundColor: supplier.performance.costCompetitiveness >= 90 ? '#27ae60' : 
                                           supplier.performance.costCompetitiveness >= 80 ? '#f39c12' : '#e74c3c'
                          }}
                        />
                        <span className="perf-value">{supplier.performance.costCompetitiveness}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="supplier-details">
                    <div className="detail-row">
                      <span className="detail-label">リードタイム</span>
                      <span className="detail-value">{supplier.leadTime}日</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">最小発注額</span>
                      <span className="detail-value">¥{supplier.minimumOrder.toLocaleString()}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">支払条件</span>
                      <span className="detail-value">{supplier.paymentTerms}</span>
                    </div>
                  </div>

                  <div className="supplier-actions">
                    <button 
                      className="btn-detail"
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      📋 詳細
                    </button>
                    <button className="btn-order">📦 発注</button>
                    <button className="btn-contact">📞 連絡</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <div className="section-header">
              <h3>発注管理</h3>
              <button className="create-order-btn">➕ 新規発注</button>
            </div>

            <div className="orders-table">
              <div className="table-header">
                <div className="col-order-id">発注番号</div>
                <div className="col-supplier">サプライヤー</div>
                <div className="col-amount">金額</div>
                <div className="col-date">発注日</div>
                <div className="col-delivery">納期</div>
                <div className="col-status">ステータス</div>
                <div className="col-priority">優先度</div>
                <div className="col-actions">アクション</div>
              </div>

              {purchaseOrders.map((order) => (
                <div key={order.id} className="table-row">
                  <div className="col-order-id">
                    <span className="order-id">{order.id}</span>
                  </div>
                  <div className="col-supplier">
                    <span className="supplier-name">{order.supplierName}</span>
                  </div>
                  <div className="col-amount">
                    <span className="amount">¥{order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="col-date">
                    <span className="date">{order.orderDate}</span>
                  </div>
                  <div className="col-delivery">
                    <span className="delivery-date">{order.expectedDeliveryDate}</span>
                    {order.actualDeliveryDate && (
                      <span className="actual-date">実績: {order.actualDeliveryDate}</span>
                    )}
                  </div>
                  <div className="col-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="col-priority">
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(order.priority) }}
                    >
                      {getPriorityLabel(order.priority)}
                    </span>
                  </div>
                  <div className="col-actions">
                    <button className="btn-view">👁️</button>
                    <button className="btn-edit">✏️</button>
                    <button className="btn-track">📍</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="performance-section">
            <div className="performance-overview">
              <h3>📊 サプライヤーパフォーマンス概要</h3>
              
              <div className="performance-metrics">
                <div className="metric-card">
                  <div className="metric-icon">🎯</div>
                  <div className="metric-content">
                    <div className="metric-value">{supplierStats.avgDelivery}%</div>
                    <div className="metric-label">平均納期遵守率</div>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-icon">⭐</div>
                  <div className="metric-content">
                    <div className="metric-value">{supplierStats.avgRating}</div>
                    <div className="metric-label">平均評価</div>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-icon">⚠️</div>
                  <div className="metric-content">
                    <div className="metric-value">{supplierStats.highRisk}</div>
                    <div className="metric-label">高リスクサプライヤー</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="performance-chart">
              <h4>サプライヤー評価マトリックス</h4>
              <div className="matrix-chart">
                <svg viewBox="0 0 500 400" className="matrix-svg">
                  {/* Grid */}
                  <defs>
                    <pattern id="matrixGrid" width="50" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#e1e8ed" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="500" height="400" fill="url(#matrixGrid)" />
                  
                  {/* Axes */}
                  <line x1="50" y1="50" x2="50" y2="350" stroke="#2c3e50" strokeWidth="2"/>
                  <line x1="50" y1="350" x2="450" y2="350" stroke="#2c3e50" strokeWidth="2"/>
                  
                  {/* Quadrant backgrounds */}
                  <rect x="50" y="50" width="200" height="150" fill="rgba(231, 76, 60, 0.1)"/>
                  <rect x="250" y="50" width="200" height="150" fill="rgba(46, 204, 113, 0.1)"/>
                  <rect x="50" y="200" width="200" height="150" fill="rgba(241, 196, 15, 0.1)"/>
                  <rect x="250" y="200" width="200" height="150" fill="rgba(52, 152, 219, 0.1)"/>
                  
                  {/* Quadrant labels */}
                  <text x="150" y="125" textAnchor="middle" fontSize="12" fontWeight="600" fill="#e74c3c">要改善</text>
                  <text x="350" y="125" textAnchor="middle" fontSize="12" fontWeight="600" fill="#27ae60">戦略的パートナー</text>
                  <text x="150" y="275" textAnchor="middle" fontSize="12" fontWeight="600" fill="#f1c40f">コスト重視</text>
                  <text x="350" y="275" textAnchor="middle" fontSize="12" fontWeight="600" fill="#3498db">安定供給</text>
                  
                  {/* Data points */}
                  {suppliers.map((supplier, index) => {
                    const x = 50 + (supplier.performance.costCompetitiveness / 100) * 400;
                    const y = 350 - (supplier.performance.onTimeDelivery / 100) * 300;
                    const color = getRiskColor(supplier.performance.riskLevel);
                    
                    return (
                      <g key={supplier.id}>
                        <circle
                          cx={x}
                          cy={y}
                          r="8"
                          fill={color}
                          stroke="white"
                          strokeWidth="2"
                          opacity="0.8"
                        />
                        <text
                          x={x}
                          y={y - 15}
                          textAnchor="middle"
                          fontSize="10"
                          fill="#2c3e50"
                          fontWeight="500"
                        >
                          {supplier.name.substring(0, 6)}...
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Axis labels */}
                  <text x="250" y="385" textAnchor="middle" fontSize="14" fontWeight="600" fill="#2c3e50">
                    コスト競争力 (%)
                  </text>
                  <text x="25" y="200" textAnchor="middle" fontSize="14" fontWeight="600" fill="#2c3e50" transform="rotate(-90 25 200)">
                    納期遵守率 (%)
                  </text>
                  
                  {/* Scale labels */}
                  <text x="45" y="355" textAnchor="end" fontSize="12" fill="#7f8c8d">0</text>
                  <text x="45" y="275" textAnchor="end" fontSize="12" fill="#7f8c8d">50</text>
                  <text x="45" y="200" textAnchor="end" fontSize="12" fill="#7f8c8d">75</text>
                  <text x="45" y="125" textAnchor="end" fontSize="12" fill="#7f8c8d">90</text>
                  <text x="45" y="55" textAnchor="end" fontSize="12" fill="#7f8c8d">100</text>
                  
                  <text x="55" y="365" fontSize="12" fill="#7f8c8d">0</text>
                  <text x="155" y="365" fontSize="12" fill="#7f8c8d">25</text>
                  <text x="255" y="365" fontSize="12" fill="#7f8c8d">50</text>
                  <text x="355" y="365" fontSize="12" fill="#7f8c8d">75</text>
                  <text x="445" y="365" fontSize="12" fill="#7f8c8d">100</text>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* サプライヤー詳細モーダル */}
      {selectedSupplier && (
        <div className="modal-overlay" onClick={() => setSelectedSupplier(null)}>
          <div className="supplier-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedSupplier.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedSupplier(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="supplier-detail-grid">
                <div className="detail-section">
                  <h4>基本情報</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">カテゴリ</span>
                      <span className="info-value">{selectedSupplier.category}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">評価</span>
                      <span className="info-value">⭐ {selectedSupplier.rating}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">リードタイム</span>
                      <span className="info-value">{selectedSupplier.leadTime}日</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">最小発注額</span>
                      <span className="info-value">¥{selectedSupplier.minimumOrder.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>連絡先</h4>
                  <div className="contact-info">
                    <div className="contact-item">
                      <span className="contact-icon">📧</span>
                      <span className="contact-value">{selectedSupplier.contactInfo.email}</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">📞</span>
                      <span className="contact-value">{selectedSupplier.contactInfo.phone}</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">📍</span>
                      <span className="contact-value">{selectedSupplier.contactInfo.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>認証・資格</h4>
                  <div className="certifications">
                    {selectedSupplier.certifications.map((cert, index) => (
                      <span key={index} className="certification-badge">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;
