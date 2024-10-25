// useUserData.ts
import { Base64 } from 'js-base64';

interface UserData {
    id: number;
    nome: string;
    email: string;
    empresa: string;
    cnpj: string;
    id_admin: number;
    isAdmin: boolean;
}

function useUserData(): UserData {
    const getUserData = (): UserData => {
        const token = sessionStorage.getItem("IdToken");
        if (token) {
            try {
                const parts = token.split('.');
                if (parts.length !== 3) {
                    throw new Error("Token inválido");
                }
                const decoded = Base64.decode(parts[1]);
                const payload = JSON.parse(decoded);
            

                return {
                    id: payload.id || 0,
                    nome: payload.nome || "",
                    email: payload.email || "",
                    empresa: payload.empresa || "",
                    cnpj: payload.cnpj || "",
                    id_admin: payload.id_admin || 0,
                    isAdmin: payload.isAdmin || false,
                };
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                return {
                    id: 0,
                    nome: "",
                    email: "",
                    empresa: "",
                    cnpj: "",
                    id_admin: 0,
                    isAdmin: false,
                };
            }
        } else {
            return {
                id: 0,
                nome: "",
                email: "",
                empresa: "",
                cnpj: "",
                id_admin: 0,
                isAdmin: false,
            };
        }
    };

    const userData = getUserData();

    return userData;
}

export default useUserData;
