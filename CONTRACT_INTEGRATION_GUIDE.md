# Contract Agent Integration Guide

## Quick Start

### 1. Import Components

```tsx
import ContractBuilder from '@/components/ContractBuilder';
import ContractSuggestions from '@/components/ContractSuggestions';
import { ContractAgentService, ContractGenerationParams } from '@/services/contractAgentService';
import { AIContractService } from '@/services/aiContractService';
```

### 2. Basic Usage in Transaction Flow

```tsx
// In your transaction creation page
<ContractBuilder
  transactionData={currentTransaction}
  onComplete={(contract) => {
    console.log('Contract generated:', contract);
    // Save contract to database
    // Send to counterparty
    // Update transaction status
  }}
  initialParams={{
    transactionType: 'goods',
    amount: transactionAmount,
    sellerName: sellerDetails.name,
    buyerName: buyerDetails.name,
  }}
/>
```

## Component Hierarchy

```
ContractBuilder (Main Component)
├── Basic Information Section
│   ├── Transaction Type Input
│   ├── Amount Input
│   ├── Party Information
│   └── ...
├── Details Section
│   ├── Product/Service Details
│   ├── Delivery/Completion Date
│   ├── Warranty/Return Policy
│   └── Special Terms
├── Clauses Section
│   ├── Recommended Clauses (Auto-checked)
│   ├── Optional Clauses (Checkbox)
│   └── Clause Details & References
└── Right Sidebar
    ├── Contract Analysis Card
    │   ├── Risk Level Badge
    │   ├── Completeness Progress Bar
    │   ├── Compliance Checklist
    │   └── Warnings List
    └── ContractSuggestions Component
        ├── Suggestion Stats
        ├── Categorized Suggestions
        │   ├── Financial
        │   ├── Legal
        │   ├── Operational
        │   ├── Risk
        │   └── Improvement
        └── Expandable Details with Apply Button
```

## Service Layer Usage

### Generate Suggestions

```typescript
import { ContractAgentService, ContractGenerationParams } from '@/services/contractAgentService';

const params: ContractGenerationParams = {
  transactionType: 'goods',
  amount: 100000,
  sellerName: 'John Seller',
  buyerName: 'Jane Buyer',
  sellerPhone: '+91 9876543210',
  buyerPhone: '+91 9123456789',
  productName: 'iPhone 15 Pro',
  quantity: '2 units',
  deliveryDate: '2025-12-31',
  warranty: '1 year manufacturer warranty',
  returnPolicy: '7-day return window'
};

// Get real-time suggestions
const suggestions = await ContractAgentService.generateSuggestions(params);

suggestions.forEach(suggestion => {
  console.log(`[${suggestion.severity}] ${suggestion.title}`);
  console.log(`Impact: ${suggestion.impact}`);
  console.log(`Suggestion: ${suggestion.suggestion}`);
});
```

### Generate Smart Clauses

```typescript
const clauses = ContractAgentService.generateSmartClauses(params);

// Get recommended vs optional
const { recommended, optional } = 
  ContractAgentService.getClauseRecommendations(params);

console.log('Must-Have Clauses:', recommended.length);
console.log('Optional Clauses:', optional.length);

recommended.forEach(clause => {
  console.log(`✓ ${clause.title} (${clause.category})`);
  console.log(`  ${clause.content}`);
});
```

### Analyze Contract Compliance

```typescript
const analysis = ContractAgentService.analyzeContract(params, clauses);

console.log(`Risk Level: ${analysis.riskLevel}`);
console.log(`Completeness: ${analysis.completeness}%`);

console.log('Compliant Items:');
analysis.compliance.forEach(item => console.log(`  ✓ ${item}`));

console.log('Warnings:');
analysis.warnings.forEach(item => console.log(`  ⚠ ${item}`));
```

### Generate Full Contract

```typescript
const contractResult = await AIContractService.generateContract(params);

console.log('Generated Contract:');
console.log(contractResult.content); // Full contract text

console.log('Smart Clauses:');
console.log(contractResult.clauses); // Array of clause titles

console.log('Risk Assessment:');
console.log(contractResult.riskAssessment); // Risk analysis text

console.log('Suggestions:');
console.log(contractResult.suggestions); // Array of improvement suggestions
```

### Apply Suggestions

```typescript
// When user clicks "Apply Suggestion"
const updates = ContractAgentService.applySuggestion(
  currentParams,
  'goods-2' // suggestionId
);

// Update contract parameters
const updatedParams = { ...currentParams, ...updates };
setParams(updatedParams);

// Re-analyze
const newAnalysis = ContractAgentService.analyzeContract(updatedParams, clauses);
```

## Integration Points with Existing Features

### 1. Transaction Creation Flow

```tsx
// In TransactionTypeSelection.tsx
import ContractBuilder from '@/components/ContractBuilder';

export const TransactionFlow = () => {
  const [step, setStep] = useState('type'); // type -> contract -> payment

  return (
    <>
      {step === 'type' && <TransactionTypeSelection />}
      
      {step === 'contract' && (
        <ContractBuilder
          transactionData={transactionData}
          onComplete={(contract) => {
            // Save contract
            saveContractToDB(contract);
            setStep('payment');
          }}
        />
      )}
      
      {step === 'payment' && <PaymentMethods />}
    </>
  );
};
```

### 2. Contract Sender Integration

```tsx
// In ContractSender.tsx - Enhanced with Agent
import ContractBuilder from '@/components/ContractBuilder';

export const ContractSenderWithAgent = () => {
  const [generatedContract, setGeneratedContract] = useState<string>('');

  return (
    <>
      <ContractBuilder
        onComplete={(contract) => {
          setGeneratedContract(contract);
          // Continue with existing send flow
          handleSendContract(contract);
        }}
      />
    </>
  );
};
```

### 3. Contract Viewer Enhancement

```tsx
// In ContractViewer.tsx - Show suggestions for review
import ContractSuggestions from '@/components/ContractSuggestions';

export const ContractViewerEnhanced = ({ contractId }) => {
  const contract = useContracts().contracts.find(c => c.id === contractId);
  
  const params: ContractGenerationParams = {
    transactionType: contract.transaction_type,
    amount: contract.transaction_amount,
    // ... map other fields
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        {/* Existing contract viewer */}
        <ContractView contract={contract} />
      </div>
      
      <div className="col-span-1">
        {/* New: Suggestions sidebar */}
        <ContractSuggestions params={params} />
      </div>
    </div>
  );
};
```

### 4. Admin Role Manager

```tsx
// Add admin panel for monitoring contract generation
import { ContractAgentService } from '@/services/contractAgentService';

export const ContractAnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalContracts: 0,
    avgCompleteness: 0,
    riskDistribution: {},
    suggestionsApplied: 0,
  });

  return (
    <div>
      <h2>Contract Generation Analytics</h2>
      <p>Total Contracts: {stats.totalContracts}</p>
      <p>Avg Completeness: {stats.avgCompleteness}%</p>
      <p>Risk Distribution: {JSON.stringify(stats.riskDistribution)}</p>
      <p>Suggestions Applied: {stats.suggestionsApplied}</p>
    </div>
  );
};
```

## State Management Integration

### Using Zustand (existing in your app)

```typescript
// Create contract store
import { create } from 'zustand';

interface ContractStore {
  currentParams: ContractGenerationParams;
  suggestions: ContractSuggestion[];
  analysis: AgentResponse['analysis'] | null;
  setParams: (params: ContractGenerationParams) => void;
  loadSuggestions: () => Promise<void>;
  applyClause: (clauseId: string) => void;
}

export const useContractStore = create<ContractStore>((set) => ({
  currentParams: getDefaultParams(),
  suggestions: [],
  analysis: null,
  
  setParams: (params) => {
    set({ currentParams: params });
    // Auto-reload suggestions
    set.loadSuggestions();
  },
  
  loadSuggestions: async () => {
    const suggestions = await ContractAgentService.generateSuggestions(
      set.currentParams
    );
    set({ suggestions });
  },
  
  applyClause: (clauseId) => {
    // Add clause to contract
  },
}));
```

### Usage in Components

```tsx
export const MyContractComponent = () => {
  const { currentParams, suggestions, setParams } = useContractStore();

  return (
    <ContractBuilder
      initialParams={currentParams}
      onParamChange={(field, value) => {
        setParams({ ...currentParams, [field]: value });
      }}
    />
  );
};
```

## Database Schema Integration

### Store Generated Contracts

```typescript
// Add to your contract table
interface StoredContract {
  id: string;
  transaction_id: string;
  content: string;
  parameters: ContractGenerationParams;
  clauses_selected: string[]; // clause IDs
  analysis: {
    riskLevel: string;
    completeness: number;
    complianceItems: string[];
  };
  suggestions_applied: string[]; // suggestion IDs
  generated_at: Date;
  accepted_at?: Date;
  signed_at?: Date;
  status: 'draft' | 'sent' | 'pending' | 'accepted' | 'rejected';
}
```

### Store Suggestions Analytics

```typescript
interface SuggestionAnalytics {
  id: string;
  suggestion_id: string;
  transaction_id: string;
  category: string;
  severity: string;
  shown_at: Date;
  applied_at?: Date;
  user_id: string;
}
```

## Error Handling

```typescript
try {
  const contract = await AIContractService.generateContract(params);
  handleSuccess(contract);
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    toast.error('Please fill in all required fields');
  } else if (error.code === 'GENERATION_ERROR') {
    toast.error('Failed to generate contract. Using template.');
  } else {
    toast.error('An unexpected error occurred');
    console.error(error);
  }
}
```

## Testing

### Unit Tests

```typescript
// Test suggestion generation
test('should generate GST suggestions for high-value transactions', async () => {
  const params: ContractGenerationParams = {
    amount: 600000,
    transactionType: 'goods',
    // ... other params
  };

  const suggestions = await ContractAgentService.generateSuggestions(params);
  
  expect(suggestions.some(s => s.id === 'high-value-3')).toBe(true); // GST suggestion
});

// Test clause generation
test('should include warranty clause for goods with warranty param', () => {
  const params = {
    transactionType: 'goods',
    warranty: '1-year warranty',
    // ... other params
  };

  const clauses = ContractAgentService.generateSmartClauses(params);
  
  expect(clauses.some(c => c.id === 'warranty-clause')).toBe(true);
});

// Test compliance analysis
test('should flag missing quantity for goods transaction', () => {
  const params = {
    transactionType: 'goods',
    quantity: '', // Missing
    // ... other params
  };

  const analysis = ContractAgentService.analyzeContract(params, []);
  
  expect(analysis.warnings.some(w => w.includes('quantity'))).toBe(true);
});
```

## Performance Optimization

```typescript
// Debounce suggestion loading (avoid too many API calls)
import { debounce } from 'lodash';

const debouncedLoadSuggestions = debounce(
  async (params) => {
    const suggestions = await ContractAgentService.generateSuggestions(params);
    setSuggestions(suggestions);
  },
  500 // Wait 500ms after user stops typing
);

useEffect(() => {
  debouncedLoadSuggestions(params);
}, [params]);
```

## Deployment Checklist

- [ ] Contracts stored securely in database
- [ ] Suggestions cached with 30-min TTL
- [ ] Error logging configured
- [ ] Legal review process documented
- [ ] Consumer complaint handling process established
- [ ] Regular legal updates scheduled (quarterly)
- [ ] Backup & recovery procedures
- [ ] Data privacy compliance verified
- [ ] User education materials created
- [ ] Support team trained

## Support & Maintenance

### Regular Updates Required:
1. **Legal Framework Updates** - Quarterly review of new amendments
2. **Clause Templates** - Annual refresh based on case law
3. **Suggestion Engine** - Continuous refinement based on usage
4. **Risk Assessment Model** - Monthly calibration

### Monitoring:
- Track contract generation success rate
- Monitor suggestion acceptance rate
- Collect dispute data for pattern analysis
- Gather user feedback regularly

---

**Questions?** Refer to CONTRACT_AGENT_README.md or contact legal support team.
