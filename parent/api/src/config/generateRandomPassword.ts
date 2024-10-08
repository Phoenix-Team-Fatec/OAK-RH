import dotenv from 'dotenv';

dotenv.config();

export function generateRandomPassword() {
    const key = process.env.UNIQUE_KEY || 'defaultKey';
    const characters = key.split('').sort(() => Math.random() - 0.5).join('');
    
    const extraCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';

    for (let i = 0; i < 12; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
        password += extraCharacters.charAt(Math.floor(Math.random() * extraCharacters.length));
    }

    return [...new Set(password)].join('').slice(0, 12);
}