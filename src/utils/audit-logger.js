const { run } = require('../utils/db-async');

const logAudit = async (userId, actionType, tableName, recordId, description) => {
    try {
        await run(`
            INSERT INTO audit_logs (user_id, action_type, table_name, record_id, description)
            VALUES (?, ?, ?, ?, ?)
        `, [userId, actionType, tableName, recordId, description])
    } catch(err) {
        console.error("Failed to write audit log: ", err.message)
    }
}

module.exports = logAudit;