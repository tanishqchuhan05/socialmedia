import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

class PasswordHandler {
    // Hash password
    static async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    // Compare password
    static async comparePassword(password: string , hashPassword: string) {
        return await bcrypt.compare(password, hashPassword);
    }
}

export default PasswordHandler



