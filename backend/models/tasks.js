const mongoose = require('mongoose');

function arrayUnique(value) {
    return Array.isArray(value) && new Set(value).size === value.length;
}

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    description: { type: String, maxlength: 500 },
    status: { type: String, required: true, enum: ['Pending', 'In Progress', 'Completed'] },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    dueDate: { type: Date, required: true },
    tags: { type: [String], validate: [arrayUnique, 'Tags must be unique'] },
    history: [{
        changeDate: { type: Date, default: Date.now },
        changes: { type: String }
    }]
}, { timestamps: true });

taskSchema.index({ dueDate: 1 });
taskSchema.index({ status: 1 });

module.exports = mongoose.model('Task', taskSchema);