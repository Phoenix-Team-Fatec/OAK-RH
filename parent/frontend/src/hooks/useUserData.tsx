import { Base64 } from 'js-base64';
import { useState, useEffect } from 'react';

function useUserData() {
    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [id_admin, setId_Admin] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem("IdToken")
        if (token) {
            const parts = token.split('.');
            const decoded = Base64.decode(parts[1]);
            const payload = JSON.parse(decoded);

            setId(payload.id);
            setNome(payload.nome);
            setEmail(payload.email);
            setEmpresa(payload.empresa)
            setCnpj(payload.cnpj);
            setId_Admin(payload.id_admin);
            setIsAdmin(payload.isAdmin);
        }
    }, [])

    return { id, nome, email, empresa, cnpj, id_admin, isAdmin }
}

export default useUserData