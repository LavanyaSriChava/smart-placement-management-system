const pool = require("../config/db");

// Create notification
exports.createNotification = async (req, res) => {
    try {

        const {
            userId,
            title,
            message,
            type
        } = req.body;

        const result = await pool.query(
            `INSERT INTO notifications
            (user_id,title,message,type)
            VALUES($1,$2,$3,$4)
            RETURNING *`,
            [userId, title, message, type]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Get notifications by user
exports.getNotifications = async (req, res) => {
    try {

        const { userId } = req.params;

        const result = await pool.query(
            `SELECT * FROM notifications
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            `UPDATE notifications
             SET is_read = true
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        res.json(result.rows[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM notifications WHERE id = $1",
            [id]
        );

        res.json({
            message: "Notification Deleted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};