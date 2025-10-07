// Enhanced KMRL Analytics System
// Supporting Department Comparison, Employee Leaderboard, Organizational Insights, and Impact Dashboard

const departmentData = {
  "Train Operations": {
    docs: 34, today: 7, pending: 2, ai: 20,
    responseTime: 2.1, complianceRate: 96, collaborationScore: 8.5, knowledgeScore: 142, aiUtilization: 82,
    weeklyTrend: [5, 8, 7, 4, 3, 4, 3],
    employees: [
      {name: "Anil Kumar", dept: "Train Operations", docsProcessed: 47, avgResponseTime: 1.8, accuracyScore: 94, collaborationMeetings: 15, complianceRate: 98, aiUsage: 85},
      {name: "Sheela P", dept: "Train Operations", docsProcessed: 42, avgResponseTime: 2.1, accuracyScore: 91, collaborationMeetings: 12, complianceRate: 95, aiUsage: 78},
      {name: "Vikram Raj", dept: "Train Operations", docsProcessed: 38, avgResponseTime: 2.4, accuracyScore: 89, collaborationMeetings: 18, complianceRate: 97, aiUsage: 88}
    ]
  },
  "Engineering & Maintenance": {
    docs: 28, today: 17, pending: 1, ai: 34,
    responseTime: 1.8, complianceRate: 98, collaborationScore: 9.2, knowledgeScore: 187, aiUtilization: 91,
    weeklyTrend: [3, 4, 5, 6, 3, 5, 2],
    employees: [
      {name: "Rahul S", dept: "Engineering & Maintenance", docsProcessed: 52, avgResponseTime: 1.5, accuracyScore: 96, collaborationMeetings: 22, complianceRate: 100, aiUsage: 94},
      {name: "Riya George", dept: "Engineering & Maintenance", docsProcessed: 45, avgResponseTime: 1.7, accuracyScore: 93, collaborationMeetings: 19, complianceRate: 98, aiUsage: 89},
      {name: "Suresh B", dept: "Engineering & Maintenance", docsProcessed: 41, avgResponseTime: 2.0, accuracyScore: 90, collaborationMeetings: 16, complianceRate: 96, aiUsage: 87}
    ]
  },
  "Procurement": {
    docs: 19, today: 2, pending: 0, ai: 6,
    responseTime: 3.2, complianceRate: 89, collaborationScore: 7.1, knowledgeScore: 98, aiUtilization: 65,
    weeklyTrend: [1, 2, 3, 2, 6, 4, 1],
    employees: [
      {name: "Geetha M", dept: "Procurement", docsProcessed: 35, avgResponseTime: 2.8, accuracyScore: 88, collaborationMeetings: 10, complianceRate: 92, aiUsage: 70},
      {name: "Alok Jain", dept: "Procurement", docsProcessed: 28, avgResponseTime: 3.5, accuracyScore: 85, collaborationMeetings: 8, complianceRate: 87, aiUsage: 62},
      {name: "Fatima N", dept: "Procurement", docsProcessed: 31, avgResponseTime: 3.1, accuracyScore: 89, collaborationMeetings: 11, complianceRate: 90, aiUsage: 68}
    ]
  },
  "Human Resources": {
    docs: 15, today: 2, pending: 1, ai: 6,
    responseTime: 2.7, complianceRate: 91, collaborationScore: 8.0, knowledgeScore: 156, aiUtilization: 73,
    weeklyTrend: [2, 4, 2, 3, 0, 2, 2],
    employees: [
      {name: "Krishna Menon", dept: "Human Resources", docsProcessed: 39, avgResponseTime: 2.3, accuracyScore: 92, collaborationMeetings: 20, complianceRate: 94, aiUsage: 79},
      {name: "Aishwarya M", dept: "Human Resources", docsProcessed: 33, avgResponseTime: 2.9, accuracyScore: 88, collaborationMeetings: 17, complianceRate: 89, aiUsage: 71},
      {name: "Pravin N", dept: "Human Resources", docsProcessed: 29, avgResponseTime: 3.1, accuracyScore: 86, collaborationMeetings: 14, complianceRate: 90, aiUsage: 69}
    ]
  },
  "Finance & Accounts": {
    docs: 22, today: 3, pending: 1, ai: 8,
    responseTime: 2.4, complianceRate: 94, collaborationScore: 7.8, knowledgeScore: 134, aiUtilization: 76,
    weeklyTrend: [2, 5, 4, 2, 4, 3, 2],
    employees: [
      {name: "Debashis S", dept: "Finance & Accounts", docsProcessed: 44, avgResponseTime: 2.1, accuracyScore: 93, collaborationMeetings: 13, complianceRate: 97, aiUsage: 82},
      {name: "Kavita DS", dept: "Finance & Accounts", docsProcessed: 37, avgResponseTime: 2.6, accuracyScore: 90, collaborationMeetings: 11, complianceRate: 92, aiUsage: 74},
      {name: "Amar K", dept: "Finance & Accounts", docsProcessed: 34, avgResponseTime: 2.5, accuracyScore: 91, collaborationMeetings: 12, complianceRate: 93, aiUsage: 75}
    ]
  },
  "Safety & Security": {
    docs: 14, today: 2, pending: 2, ai: 4,
    responseTime: 1.9, complianceRate: 97, collaborationScore: 8.8, knowledgeScore: 178, aiUtilization: 84,
    weeklyTrend: [1,2,2,2,2,2,3],
    employees: [
      {name: "Imran M", dept: "Safety & Security", docsProcessed: 36, avgResponseTime: 1.6, accuracyScore: 95, collaborationMeetings: 21, complianceRate: 99, aiUsage: 90},
      {name: "Shalini B", dept: "Safety & Security", docsProcessed: 32, avgResponseTime: 2.0, accuracyScore: 92, collaborationMeetings: 18, complianceRate: 96, aiUsage: 81},
      {name: "Paresh D", dept: "Safety & Security", docsProcessed: 28, avgResponseTime: 2.1, accuracyScore: 89, collaborationMeetings: 16, complianceRate: 95, aiUsage: 78}
    ]
  },
  "Legal & Compliance": {
    docs: 10, today: 1, pending: 1, ai: 2,
    responseTime: 2.9, complianceRate: 99, collaborationScore: 7.3, knowledgeScore: 201, aiUtilization: 67,
    weeklyTrend: [0,2,2,1,2,2,1],
    employees: [
      {name: "Thomas George", dept: "Legal & Compliance", docsProcessed: 31, avgResponseTime: 2.5, accuracyScore: 97, collaborationMeetings: 9, complianceRate: 100, aiUsage: 72},
      {name: "Feroz S", dept: "Legal & Compliance", docsProcessed: 27, avgResponseTime: 3.2, accuracyScore: 94, collaborationMeetings: 7, complianceRate: 98, aiUsage: 64},
      {name: "Maya K", dept: "Legal & Compliance", docsProcessed: 24, avgResponseTime: 3.1, accuracyScore: 95, collaborationMeetings: 8, complianceRate: 99, aiUsage: 66}
    ]
  },
  "Administration": {
    docs: 16, today: 3, pending: 0, ai: 5,
    responseTime: 2.6, complianceRate: 92, collaborationScore: 7.9, knowledgeScore: 123, aiUtilization: 71,
    weeklyTrend: [2,2,1,3,3,2,3],
    employees: [
      {name: "Priya V", dept: "Administration", docsProcessed: 40, avgResponseTime: 2.2, accuracyScore: 90, collaborationMeetings: 15, complianceRate: 95, aiUsage: 77},
      {name: "Manoj N", dept: "Administration", docsProcessed: 35, avgResponseTime: 2.8, accuracyScore: 87, collaborationMeetings: 12, complianceRate: 90, aiUsage: 68},
      {name: "Meera B", dept: "Administration", docsProcessed: 32, avgResponseTime: 2.9, accuracyScore: 89, collaborationMeetings: 14, complianceRate: 91, aiUsage: 69}
    ]
  }
};

// Organizational Insights Data
const organizationalData = {
  bottlenecks: [
    {dept: "Procurement", delay: "3.2 hrs", issue: "Vendor verification delays"},
    {dept: "Legal & Compliance", delay: "2.9 hrs", issue: "Document review backlog"},
    {dept: "Administration", delay: "2.6 hrs", issue: "Approval workflow issues"}
  ],
  emergingTrends: [
    {topic: "Digital transformation initiatives", frequency: "47 mentions", trend: "+23%"},
    {topic: "Safety protocol updates", frequency: "34 mentions", trend: "+15%"},
    {topic: "Environmental compliance", frequency: "28 mentions", trend: "+31%"},
    {topic: "Employee training programs", frequency: "22 mentions", trend: "+8%"},
    {topic: "Infrastructure modernization", frequency: "19 mentions", trend: "+12%"}
  ],
  engagementPulse: {
    overall: 84,
    trend: "+5.2%",
    breakdown: {
      participation: 87,
      satisfaction: 82,
      collaboration: 85,
      innovation: 81
    }
  }
};

// Impact Metrics
const impactMetrics = {
  timeSaved: 847,
  costReduction: 230000,
  paperSaved: 1247,
  complianceRate: 96.8,
  engagementGrowth: 23,
  trends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    timeSaved: [567, 623, 698, 745, 789, 847],
    costSaved: [145000, 167000, 189000, 205000, 218000, 230000],
    compliance: [92.1, 93.4, 94.7, 95.2, 96.1, 96.8]
  }
};

// Chart instances
let radarChart = null;
let comparisonChart = null;
let knowledgeChart = null;
let engagementChart = null;
let impactTrendChart = null;

// Current view state
let currentView = 'department';
let currentCategory = 'contributors';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  updateView('department');
});

function initializeEventListeners() {
  document.getElementById('viewType').addEventListener('change', function() {
    updateView(this.value);
  });

  document.getElementById('department').addEventListener('change', function() {
    if(currentView === 'department') {
      updateDepartmentView();
    }
  });

  // Tab buttons for leaderboard
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.category;
      updateLeaderboard();
    });
  });
}

function updateView(viewType) {
  currentView = viewType;
  
  // Hide all views
  document.querySelectorAll('.view-section').forEach(section => {
    section.style.display = 'none';
  });
  
  // Show selected view
  document.getElementById(`${viewType}-view`).style.display = 'block';
  
  // Update content based on view
  switch(viewType) {
    case 'department':
      updateDepartmentView();
      break;
    case 'leaderboard':
      updateLeaderboard();
      break;
    case 'insights':
      updateInsights();
      break;
    case 'impact':
      updateImpactDashboard();
      break;
  }
}

function updateDepartmentView() {
  const selectedDept = document.getElementById('department').value;
  
  if(selectedDept === 'All Departments') {
    updateOverallMetrics();
  } else if(departmentData[selectedDept]) {
    updateDepartmentMetrics(selectedDept);
  }
  
  updateRadarChart();
  updateComparisonChart();
}

function updateOverallMetrics() {
  let totalResponseTime = 0;
  let totalCollaboration = 0;
  let totalKnowledge = 0;
  let totalAI = 0;
  const deptCount = Object.keys(departmentData).length;
  
  Object.values(departmentData).forEach(dept => {
    totalResponseTime += dept.responseTime;
    totalCollaboration += dept.collaborationScore;
    totalKnowledge += dept.knowledgeScore;
    totalAI += dept.aiUtilization;
  });
  
  document.getElementById('avg-response-time').textContent = `${(totalResponseTime / deptCount).toFixed(1)} hrs`;
  document.getElementById('collaboration-score').textContent = `${(totalCollaboration / deptCount).toFixed(1)}/10`;
  document.getElementById('knowledge-score').textContent = Math.round(totalKnowledge / deptCount);
  document.getElementById('ai-utilization').textContent = `${Math.round(totalAI / deptCount)}%`;
}

function updateDepartmentMetrics(dept) {
  const data = departmentData[dept];
  document.getElementById('avg-response-time').textContent = `${data.responseTime} hrs`;
  document.getElementById('collaboration-score').textContent = `${data.collaborationScore}/10`;
  document.getElementById('knowledge-score').textContent = data.knowledgeScore;
  document.getElementById('ai-utilization').textContent = `${data.aiUtilization}%`;
}

function updateRadarChart() {
  const ctx = document.getElementById('radarChart').getContext('2d');
  
  if(radarChart) radarChart.destroy();
  
  const departments = Object.keys(departmentData);
  const metrics = ['Response Time', 'Collaboration', 'Knowledge', 'AI Usage'];
  
  const datasets = departments.map((dept, index) => {
    const data = departmentData[dept];
    return {
      label: dept,
      data: [
        (5 - data.responseTime) * 20, // Invert response time for radar chart
        data.collaborationScore * 10,
        data.knowledgeScore / 2,
        data.aiUtilization
      ],
      backgroundColor: `hsla(${index * 45}, 70%, 60%, 0.2)`,
      borderColor: `hsla(${index * 45}, 70%, 60%, 1)`,
      borderWidth: 2
    };
  });
  
  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: metrics,
      datasets: datasets
    },
    options: {
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

function updateComparisonChart() {
  const ctx = document.getElementById('comparisonChart').getContext('2d');
  
  if(comparisonChart) comparisonChart.destroy();
  
  const departments = Object.keys(departmentData);
  const responseData = departments.map(dept => departmentData[dept].responseTime);
  const collaborationData = departments.map(dept => departmentData[dept].collaborationScore * 10);
  const knowledgeData = departments.map(dept => departmentData[dept].knowledgeScore / 2);
  
  comparisonChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: departments.map(dept => dept.replace(' & ', '\n& ')),
      datasets: [
        {
          label: 'Response Time (inverted)',
          data: responseData.map(val => (5 - val) * 20),
          backgroundColor: 'rgba(59, 130, 246, 0.7)'
        },
        {
          label: 'Collaboration Score',
          data: collaborationData,
          backgroundColor: 'rgba(245, 158, 11, 0.7)'
        },
        {
          label: 'Knowledge Score',
          data: knowledgeData,
          backgroundColor: 'rgba(139, 92, 246, 0.7)'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

function updateLeaderboard() {
  const content = document.getElementById('leaderboard-content');
  let employees = [];
  
  // Collect all employees
  Object.values(departmentData).forEach(dept => {
    employees = employees.concat(dept.employees);
  });
  
  // Sort based on category
  switch(currentCategory) {
    case 'contributors':
      employees.sort((a, b) => b.docsProcessed - a.docsProcessed);
      break;
    case 'responders':
      employees.sort((a, b) => a.avgResponseTime - b.avgResponseTime);
      break;
    case 'accuracy':
      employees.sort((a, b) => b.accuracyScore - a.accuracyScore);
      break;
    case 'collaboration':
      employees.sort((a, b) => b.collaborationMeetings - a.collaborationMeetings);
      break;
    case 'compliance':
      employees.sort((a, b) => b.complianceRate - a.complianceRate);
      break;
  }
  
  // Display top 10
  content.innerHTML = employees.slice(0, 10).map((emp, index) => {
    const rankClass = index < 3 ? `rank-${index + 1}` : 'rank-other';
    return `
      <div class="leaderboard-card">
        <div class="employee-rank">
          <div class="rank-badge ${rankClass}">${index + 1}</div>
          <div class="employee-info">
            <h4>${emp.name}</h4>
            <div class="employee-department">${emp.dept}</div>
          </div>
        </div>
        <div class="employee-stats">
          <div class="stat-item">
            <div class="stat-value">${emp.docsProcessed}</div>
            <div class="stat-label">Docs</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${emp.avgResponseTime}h</div>
            <div class="stat-label">Response</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${emp.accuracyScore}%</div>
            <div class="stat-label">Accuracy</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${emp.collaborationMeetings}</div>
            <div class="stat-label">Meetings</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function updateInsights() {
  // Update bottlenecks
  const bottlenecksContainer = document.getElementById('bottlenecks');
  bottlenecksContainer.innerHTML = organizationalData.bottlenecks.map(bottleneck => `
    <div class="bottleneck-item">
      <span class="bottleneck-dept">${bottleneck.dept}</span>
      <span class="bottleneck-delay">${bottleneck.delay}</span>
    </div>
    <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">${bottleneck.issue}</div>
  `).join('');
  
  // Update trends
  const trendsContainer = document.getElementById('trends');
  trendsContainer.innerHTML = organizationalData.emergingTrends.map(trend => `
    <div class="trend-item">
      <div class="trend-topic">${trend.topic}</div>
      <div class="trend-frequency">${trend.frequency} (${trend.trend})</div>
    </div>
  `).join('');
  
  // Update engagement meter
  const engagementMeter = document.getElementById('engagement-meter');
  engagementMeter.innerHTML = `
    <div class="engagement-score">${organizationalData.engagementPulse.overall}%</div>
    <div>
      <div class="engagement-label">Overall Engagement</div>
      <div style="font-size: 12px; color: #10b981;">${organizationalData.engagementPulse.trend} this quarter</div>
    </div>
  `;
  
  updateKnowledgeChart();
  updateEngagementChart();
}

function updateKnowledgeChart() {
  const ctx = document.getElementById('knowledgeChart').getContext('2d');
  
  if(knowledgeChart) knowledgeChart.destroy();
  
  const departments = Object.keys(departmentData);
  const knowledgeScores = departments.map(dept => departmentData[dept].knowledgeScore);
  
  knowledgeChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: departments,
      datasets: [{
        data: knowledgeScores,
        backgroundColor: [
          '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
          '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function updateEngagementChart() {
  const ctx = document.getElementById('engagementChart').getContext('2d');
  
  if(engagementChart) engagementChart.destroy();
  
  const breakdown = organizationalData.engagementPulse.breakdown;
  
  engagementChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Participation', 'Satisfaction', 'Collaboration', 'Innovation'],
      datasets: [{
        label: 'Engagement Metrics',
        data: [breakdown.participation, breakdown.satisfaction, breakdown.collaboration, breakdown.innovation],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

function updateImpactDashboard() {
  // Update impact metrics
  document.getElementById('time-saved').textContent = `${impactMetrics.timeSaved} hrs`;
  document.getElementById('cost-saved').textContent = `₹${(impactMetrics.costReduction / 100000).toFixed(1)}L`;
  document.getElementById('paper-saved').textContent = impactMetrics.paperSaved;
  document.getElementById('compliance-percent').textContent = `${impactMetrics.complianceRate}%`;
  document.getElementById('engagement-growth').textContent = `+${impactMetrics.engagementGrowth}%`;
  
  updateImpactTrendChart();
}

function updateImpactTrendChart() {
  const ctx = document.getElementById('impactTrendChart').getContext('2d');
  
  if(impactTrendChart) impactTrendChart.destroy();
  
  impactTrendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: impactMetrics.trends.labels,
      datasets: [
        {
          label: 'Time Saved (hrs)',
          data: impactMetrics.trends.timeSaved,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          yAxisID: 'y'
        },
        {
          label: 'Cost Saved (₹L)',
          data: impactMetrics.trends.costSaved.map(val => val / 100000),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          yAxisID: 'y1'
        },
        {
          label: 'Compliance Rate (%)',
          data: impactMetrics.trends.compliance,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          yAxisID: 'y2'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Time (hrs)'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: 'Cost (₹L)'
          },
          grid: {
            drawOnChartArea: false,
          }
        },
        y2: {
          type: 'linear',
          display: false,
          min: 90,
          max: 100
        }
      }
    }
  });
}

// Initialize default view
window.onload = () => {
  updateView('department');
};
