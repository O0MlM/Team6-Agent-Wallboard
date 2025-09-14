// models/Agent.js
class Agent {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.agentCode = data.agentCode;
    this.name = data.name;
    this.email = data.email;
    this.department = data.department || 'General';
    this.skills = data.skills || [];
    this.status = data.status || 'Available';
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.loginTime = data.loginTime || null;
    this.lastStatusChange = new Date();
    this.statusHistory = data.statusHistory || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }

  generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  }

  updateStatus(newStatus, reason = null) {
    this.statusHistory.push({
      from: this.status,
      to: newStatus,
      reason,
      timestamp: new Date()
    });

    this.status = newStatus;
    this.lastStatusChange = new Date();
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      agentCode: this.agentCode,
      name: this.name,
      email: this.email,
      department: this.department,
      skills: this.skills,
      status: this.status,
      isActive: this.isActive,
      loginTime: this.loginTime,
      lastStatusChange: this.lastStatusChange,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  getStatusHistory() {
    return this.statusHistory;
  }
}

// In-memory storage (Phase 1 only)
const agents = new Map();

// Sample data initialization
function initializeSampleData() {
  const sampleAgents = [
    {
      agentCode: 'A001',
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Sales',
      skills: ['Thai', 'English', 'Sales'],
      status: 'Available'
    },
    {
      agentCode: 'A002',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'Support',
      skills: ['Thai', 'Technical Support'],
      status: 'Busy'
    },
    {
      agentCode: 'S001',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      department: 'Technical',
      skills: ['English', 'Technical', 'Supervisor'],
      status: 'Available'
    }
  ];

  sampleAgents.forEach(data => {
    const agent = new Agent(data);
    agents.set(agent.id, agent);
  });

  console.log(`✅ Initialized ${agents.size} sample agents`);
}

initializeSampleData();

module.exports = { Agent, agents };