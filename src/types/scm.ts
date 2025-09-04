// SCM (Supply Chain Management) システムの型定義

// 需要予測関連
export interface DemandForecast {
  id: string;
  productId: string;
  productName: string;
  period: string; // YYYY-MM
  forecastQuantity: number;
  actualQuantity?: number;
  accuracy?: number; // 予測精度 (%)
  method: 'historical' | 'seasonal' | 'trend' | 'ai';
  confidence: number; // 信頼度 (%)
  createdAt: string;
  updatedAt: string;
}

export interface SeasonalFactor {
  month: number;
  factor: number; // 季節調整係数
  category: string;
}

// 在庫最適化関連
export interface OptimalStock {
  productId: string;
  safetyStock: number; // 安全在庫
  reorderPoint: number; // 発注点
  economicOrderQuantity: number; // 経済発注量
  maxStock: number; // 最大在庫
  leadTime: number; // リードタイム（日）
  demandVariability: number; // 需要変動係数
  serviceLevel: number; // サービスレベル (%)
}

export interface Location {
  id: string;
  name: string;
  type: 'warehouse' | 'factory' | 'store' | 'supplier';
  address: string;
  capacity: number;
  currentUtilization: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// 調達・購買管理関連
export interface Supplier {
  id: string;
  name: string;
  category: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  rating: number; // 1-5
  performance: {
    onTimeDelivery: number; // %
    qualityScore: number; // %
    costCompetitiveness: number; // %
    riskLevel: 'low' | 'medium' | 'high';
  };
  contracts: Contract[];
  certifications: string[];
  paymentTerms: string;
  leadTime: number;
  minimumOrder: number;
  isActive: boolean;
}

export interface Contract {
  id: string;
  supplierId: string;
  productId: string;
  unitPrice: number;
  currency: string;
  validFrom: string;
  validTo: string;
  minimumQuantity: number;
  maximumQuantity: number;
  terms: string;
  status: 'active' | 'expired' | 'pending' | 'cancelled';
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseOrderItem[];
  totalAmount: number;
  currency: string;
  orderDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  status: 'draft' | 'sent' | 'confirmed' | 'delivered' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  terms: string;
  notes?: string;
}

export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveryDate: string;
  specifications?: string;
}

// 生産計画関連
export interface ProductionPlan {
  id: string;
  productId: string;
  productName: string;
  plannedQuantity: number;
  actualQuantity?: number;
  startDate: string;
  endDate: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled' | 'delayed';
  resourceRequirements: ResourceRequirement[];
  dependencies: string[]; // 依存する他のプランのID
  progress: number; // 進捗率 (%)
}

export interface ResourceRequirement {
  resourceId: string;
  resourceName: string;
  type: 'machine' | 'labor' | 'material' | 'tool';
  requiredQuantity: number;
  availableQuantity: number;
  unit: string;
  startTime: string;
  endTime: string;
}

export interface ProductionSchedule {
  id: string;
  planId: string;
  machineId: string;
  machineName: string;
  startTime: string;
  endTime: string;
  setupTime: number; // 段取り時間（分）
  operatorId?: string;
  operatorName?: string;
  efficiency: number; // 効率 (%)
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

// 物流・配送関連
export interface ShipmentPlan {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  origin: Location;
  destination: Location;
  items: ShipmentItem[];
  plannedDepartureTime: string;
  plannedArrivalTime: string;
  actualDepartureTime?: string;
  actualArrivalTime?: string;
  carrierId: string;
  carrierName: string;
  vehicleType: string;
  cost: number;
  status: 'planned' | 'in_transit' | 'delivered' | 'cancelled' | 'delayed';
  trackingNumber?: string;
}

export interface ShipmentItem {
  productId: string;
  productName: string;
  quantity: number;
  weight: number;
  volume: number;
  specialHandling?: string;
}

export interface Route {
  id: string;
  name: string;
  waypoints: Location[];
  distance: number; // km
  estimatedTime: number; // 分
  cost: number;
  vehicleType: string;
  restrictions?: string[];
}

// リスク管理関連
export interface RiskEvent {
  id: string;
  type: 'supply_delay' | 'quality_issue' | 'demand_spike' | 'disaster' | 'supplier_bankruptcy' | 'transportation_disruption';
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number; // 0-1
  impact: number; // 1-10
  riskScore: number; // probability * impact
  description: string;
  affectedEntities: string[]; // 影響を受ける製品・サプライヤー・拠点のID
  mitigationPlan?: string;
  contingencyPlan?: string;
  status: 'identified' | 'monitoring' | 'active' | 'mitigated' | 'resolved';
  detectedAt: string;
  resolvedAt?: string;
}

export interface Alert {
  id: string;
  type: 'stock_out' | 'low_stock' | 'delivery_delay' | 'quality_alert' | 'cost_overrun' | 'schedule_delay';
  priority: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  entityId: string; // 関連するエンティティのID
  entityType: 'product' | 'supplier' | 'order' | 'shipment' | 'production';
  threshold?: number;
  currentValue?: number;
  isRead: boolean;
  isResolved: boolean;
  createdAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  actions?: AlertAction[];
}

export interface AlertAction {
  id: string;
  label: string;
  type: 'reorder' | 'contact_supplier' | 'reschedule' | 'escalate';
  parameters?: Record<string, any>;
}

// コスト分析関連
export interface CostBreakdown {
  productId: string;
  productName: string;
  period: string;
  totalCost: number;
  costComponents: {
    material: number;
    labor: number;
    overhead: number;
    transportation: number;
    storage: number;
    quality: number;
  };
  costPerUnit: number;
  targetCost: number;
  variance: number; // actual - target
  variancePercentage: number;
}

export interface CostOptimization {
  id: string;
  type: 'supplier_negotiation' | 'route_optimization' | 'inventory_reduction' | 'process_improvement';
  description: string;
  currentCost: number;
  projectedCost: number;
  savings: number;
  implementationCost: number;
  paybackPeriod: number; // months
  roi: number; // %
  status: 'proposed' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  deadline?: string;
}

// 外部システム連携関連
export interface ExternalSystem {
  id: string;
  name: string;
  type: 'ERP' | 'WMS' | 'TMS' | 'EDI' | 'CRM' | 'MES' | 'QMS';
  endpoint: string;
  apiKey?: string;
  isActive: boolean;
  lastSync?: string;
  syncFrequency: number; // minutes
  dataMapping: Record<string, string>;
  errorCount: number;
  successCount: number;
}

export interface DataSync {
  id: string;
  systemId: string;
  systemName: string;
  dataType: 'inventory' | 'orders' | 'shipments' | 'suppliers' | 'customers' | 'products';
  direction: 'inbound' | 'outbound' | 'bidirectional';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  recordsProcessed: number;
  recordsSuccessful: number;
  recordsFailed: number;
  startTime: string;
  endTime?: string;
  errorMessages?: string[];
}

// ダッシュボード・KPI関連
export interface KPI {
  id: string;
  name: string;
  category: 'inventory' | 'procurement' | 'production' | 'logistics' | 'cost' | 'quality';
  value: number;
  unit: string;
  target: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
  previousValue: number;
  changePercentage: number;
  status: 'good' | 'warning' | 'critical';
}

export interface DashboardWidget {
  id: string;
  type: 'chart' | 'kpi' | 'table' | 'map' | 'alert';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  configuration: Record<string, any>;
  dataSource: string;
  refreshInterval: number; // seconds
  isVisible: boolean;
}
