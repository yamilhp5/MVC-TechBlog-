// All models require id, User, and index.js as best practice. index.js helps pull everything together//

const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comments.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Post.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})

// Ensuring all variables are consistant and accurate //

module.exports = { User, Post, Comments };
