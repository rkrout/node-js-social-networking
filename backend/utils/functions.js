module.exports.isEmail = (email) => {
    if (email.includes('@') && email.includes('.')) 
    {
        const [firstPart, secondPart] = email.split('@')

        if (firstPart.length >= 2 && secondPart.length >= 2) 
        {
            return true
        }
    }

    return false
}