const { Sequelize, DataTypes } = require('sequelize');

// Replace with your actual database credentials
const sequelize = new Sequelize('user_info', 'root', 'baza', {
    host: 'localhost', 
    dialect: 'mysql'  
});

// Define the User model
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user_info', // Name of the table in the database
    timestamps: false       // Disable timestamps if your table doesn’t have them
});

// Define the Product model (assuming uploads refers to products)
const Product = sequelize.define('Product', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'uploads', // Name of the table in the database
    timestamps: false    // Disable timestamps if your table doesn’t have them
});

module.exports = { User, Product, sequelize };
