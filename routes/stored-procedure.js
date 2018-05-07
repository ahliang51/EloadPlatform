module.exports.insertAccessLog = function (UserAccess, ipAddress, description, connection) {
    connection.query(`CALL WEB_ACCESS_LOG(?,?,?)`, [UserAccess, ipAddress, description],
        (err, result, fields) => {
            console.log(result)
            return result
        })
}