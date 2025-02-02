db.log.insertOne({"message": "Database created."});

db.createUser(
    {
        user: _getEnv("ME_CONFIG_MONGODB_ADMINUSERNAME"),
        pwd: _getEnv("ME_CONFIG_MONGODB_ADMINPASSWORD"),
        roles: [
            "readWrite", "dbAdmin"
        ]
    }
);