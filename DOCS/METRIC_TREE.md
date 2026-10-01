# Metric Decomposition Tree

To solve the business problem, we must decompose the goal into actionable product metrics.

## Root: Successful Vague Retrieval
├── **1. User Expression** (Can the user express what they remember?)
│   ├── Query length
│   └── Multi-modal query usage
├── **2. System Interpretation** (Does the system parse the vague cues?)
│   ├── Entity extraction accuracy
│   └── Semantic embedding confidence
├── **3. Retrieval Efficacy** (Are the right candidates found?)
│   ├── Recall @ 10
│   └── Candidate relevance score
├── **4. Evaluation & Refinement** (Can the user navigate the results?)
│   ├── Time to target identification
│   └── Number of refinement turns
└── **5. Final Success**
    └── Target identified (Yes/No)