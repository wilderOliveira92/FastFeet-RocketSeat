module.exports = {
    dialect: 'postgres',
    host: 'localhost', //"192.168.99.100",
    username: 'postgres',
    password: 'docker',
    database: 'fastfeet',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};