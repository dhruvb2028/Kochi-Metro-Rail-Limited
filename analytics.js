const departmentData = {
  "Train Operations": {
    docs: 34, today: 7, pending: 2, ai: 20,
    weeklyTrend: [5, 8, 7, 4, 3, 4, 3],
    leaderboard: [
      {name: "Anil Kumar", count: 8},
      {name: "Sheela P", count: 6},
      {name: "Vikram Raj", count: 5}
    ]
  },
  "Engineering & Maintenance": {
    docs: 28, today: 17, pending: 1, ai: 34,
    weeklyTrend: [3, 4, 5, 6, 3, 5, 2],
    leaderboard: [
      {name: "Rahul S", count: 12},
      {name: "Riya George", count: 9},
      {name: "Suresh B", count: 7}
    ]
  },
  "Procurement": {
    docs: 19, today: 2, pending: 0, ai: 6,
    weeklyTrend: [1, 2, 3, 2, 6, 4, 1],
    leaderboard: [
      {name: "Geetha M", count: 8},
      {name: "Alok Jain", count: 4},
      {name: "Fatima N", count: 3}
    ]
  },
  "Human Resources": {
    docs: 15, today: 2, pending: 1, ai: 6,
    weeklyTrend: [2, 4, 2, 3, 0, 2, 2],
    leaderboard: [
      {name: "Krishna Menon", count: 7},
      {name: "Aishwarya M", count: 5},
      {name: "Pravin N", count: 3}
    ]
  },
  "Finance & Accounts": {
    docs: 22, today: 3, pending: 1, ai: 8,
    weeklyTrend: [2, 5, 4, 2, 4, 3, 2],
    leaderboard: [
      {name: "Debashis S", count: 9},
      {name: "Kavita DS", count: 7},
      {name: "Amar K", count: 6}
    ]
  },
  "Safety & Security": {
    docs: 14, today: 2, pending: 2, ai: 4,
    weeklyTrend: [1,2,2,2,2,2,3],
    leaderboard: [
      {name: "Imran M", count: 6},
      {name: "Shalini B", count: 4},
      {name: "Paresh D", count: 3}
    ]
  },
  "Legal & Compliance": {
    docs: 10, today: 1, pending: 1, ai: 2,
    weeklyTrend: [0,2,2,1,2,2,1],
    leaderboard: [
      {name: "Thomas George", count: 5},
      {name: "Feroz S", count: 3},
      {name: "Maya K", count: 2}
    ]
  },
  "Administration": {
    docs: 16, today: 3, pending: 0, ai: 5,
    weeklyTrend: [2,2,1,3,3,2,3],
    leaderboard: [
      {name: "Priya V", count: 7},
      {name: "Manoj N", count: 5},
      {name: "Meera B", count: 4}
    ]
  }
};

let chartInstance = null;

function updateDashboard(dept) {
  if (departmentData[dept]) {
    document.getElementById('total-docs').innerText = departmentData[dept].docs;
    document.getElementById('docs-today').innerText = departmentData[dept].today;
    document.getElementById('pending-review').innerText = departmentData[dept].pending;
    document.getElementById('ai-summaries').innerText = departmentData[dept].ai;
    updateLeaderboard(departmentData[dept].leaderboard);
    updateDeptChart(dept, departmentData[dept].weeklyTrend);
  } else {
    document.getElementById('total-docs').innerText = '';
    document.getElementById('docs-today').innerText = '';
    document.getElementById('pending-review').innerText = '';
    document.getElementById('ai-summaries').innerText = '';
    updateLeaderboard([]);
    updateDeptChart(null, []);
  }
}

function updateLeaderboard(boardData) {
  const tbody = document.getElementById('leaderboard').querySelector('tbody');
  tbody.innerHTML = '';
  boardData.forEach((user, idx) => {
    const row = `<tr><td>${idx + 1}</td><td>${user.name}</td><td>${user.count}</td></tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

function updateDeptChart(dept, data) {
  const ctx = document.getElementById('deptChart').getContext('2d');
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: dept ? `${dept} - Documents Processed` : `Select Department`,
        data: data,
        borderColor: '#329dfa',
        fill: true,
        backgroundColor: 'rgba(50,157,250, 0.07)',
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, stepSize: 1 }
      }
    }
  });
}

document.getElementById('department').addEventListener('change', function() {
  const dept = this.value;
  updateDashboard(dept);
});

window.onload = () => {
  updateDashboard('Train Operations');
  document.getElementById('department').value = 'Train Operations';
};
