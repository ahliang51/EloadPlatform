module.exports.insertAccessLog = function (UserAccess, ipAddress, description, connection) {

    return new Promise(((resolve, reject) => {
        connection.query(`CALL WEB_ACCESS_LOG(?,?,?)`, [UserAccess, ipAddress, description],
            (err, result, fields) => {
                resolve(result)
            })
    }))
}