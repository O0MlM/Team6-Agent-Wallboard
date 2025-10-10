CREATE TABLE teams (
    team_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_name VARCHAR(50) NOT NULL UNIQUE,
    supervisor_code VARCHAR(10),
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1
);

-- Index สำหรับ performance
CREATE INDEX idx_teams_supervisor ON teams(supervisor_code);
CREATE INDEX idx_teams_active ON teams(is_active);

CREATE TABLE agents (
    agent_id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_code VARCHAR(10) NOT NULL UNIQUE,
    agent_name VARCHAR(100) NOT NULL,
    team_id INTEGER NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('agent', 'supervisor')),
    email VARCHAR(100),
    phone VARCHAR(20),
    hire_date DATE,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

-- Indexes สำหรับ performance
CREATE INDEX idx_agents_code ON agents(agent_code);
CREATE INDEX idx_agents_team ON agents(team_id);
CREATE INDEX idx_agents_role ON agents(role);

CREATE TABLE system_config (
    config_id INTEGER PRIMARY KEY AUTOINCREMENT,
    config_key VARCHAR(50) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_config_key ON system_config(config_key);
CREATE INDEX idx_config_active ON system_config(is_active);