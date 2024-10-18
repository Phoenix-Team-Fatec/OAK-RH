import React, { useEffect, useState } from 'react';
import './ModalEditTeams.css';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

interface User {
    id: number;
    name: string;
}

interface ModalProps {
    open: boolean;
    onClose: () => void;
    onFetchTeams: () => void;
    editingTeam: { id: number; name: string; description: string } | null;
}

const ModalEditTeams: React.FC<ModalProps> = ({ open, onClose, onFetchTeams, editingTeam }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [leaders, setLeaders] = useState<User[]>([]);
    const [members, setMembers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [dropdownType, setDropdownType] = useState<'leader' | 'member' | null>(null);
    const { id } = useUser();

    useEffect(() => {
        if (editingTeam) {
            setName(editingTeam.name);
            setDescription(editingTeam.description);
            fetchTeamMembers(editingTeam.id);
        } else {
            resetFields();
        }
        fetchAllUsers();
    }, [editingTeam]);

    const resetFields = () => {
        setName('');
        setDescription('');
        setLeaders([]);
        setMembers([]);
    };

    const fetchTeamMembers = async (teamId: number) => {
        const response = await fetch(`/api/teams/${teamId}/members`);
        const data = await response.json();
        setLeaders(data.leaders);
        setMembers(data.members);
    };

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${id}`);
            const userNames = response.data.map((user: User) => ({
                name: user.name
            }));
            setAllUsers(userNames)
        } catch (error) {
            console.log("Error in fetching users", error);
        }
    };

    const handleAddUser = (user: User, type: 'leader' | 'member') => {
        if (type === 'leader' && !leaders.some(leader => leader.id === user.id)) {
            setLeaders([...leaders, user]);
        } else if (type === 'member' && !members.some(member => member.id === user.id)) {
            setMembers([...members, user]);
        }
    };

    const handleRemoveUser = (userId: number, type: 'leader' | 'member') => {
        if (type === 'leader') {
            setLeaders(leaders.filter(leader => leader.id !== userId));
        } else {
            setMembers(members.filter(member => member.id !== userId));
        }
    };

    const handleSave = async () => {
        await fetch(`/api/teams/${editingTeam?.id}`, {
            method: 'PUT',  
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, leaders, members }),
        });
        onFetchTeams();
        onClose();
    };

    const toggleDropdown = (type: 'leader' | 'member') => {
        setDropdownType(type);
        setShowUserDropdown(!showUserDropdown);
    };

    return (
        <div className={`modal_overlay_edit_team ${open ? 'open' : ''}`}>
            <div className='modal_content_edit_team'>
                <h2>Editar Equipe</h2>
                <button className='close-btn' onClick={onClose}>&times;</button>
                <input
                    id='name'
                    type='text'
                    placeholder='Nome'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    id='description'
                    type='text'
                    placeholder='Descrição'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required 
                />
                
                <div className="members-section">
                    <h3>Membros da equipe</h3>
                    <UserSection
                        title="Líderes"
                        users={leaders}
                        onAddUser={(user) => handleAddUser(user, 'leader')}
                        onRemoveUser={handleRemoveUser}
                        dropdownOpen={() => toggleDropdown('leader')}
                    />
                    <UserSection
                        title="Liderados"
                        users={members}
                        onAddUser={(user) => handleAddUser(user, 'member')}
                        onRemoveUser={handleRemoveUser}
                        dropdownOpen={() => toggleDropdown('member')}
                    />
                    {showUserDropdown && (
                        <UserDropdown 
                            users={allUsers} 
                            onUserSelect={(user) => {
                                dropdownType === 'leader' ? handleAddUser(user, 'leader') : handleAddUser(user, 'member');
                                setShowUserDropdown(false);
                            }} 
                        />
                    )}
                </div>

                <div className='modal-actions'>
                    <button className='save-btn' onClick={handleSave}>Salvar</button>
                    <button className='close-btn' onClick={onClose}>&times;</button>
                </div>
            </div>
        </div>
    );
};

const UserSection: React.FC<{
    title: string;
    users: User[];
    onRemoveUser: (userId: number, type: 'leader' | 'member') => void;
    dropdownOpen: () => void;
}> = ({ title, users, onRemoveUser, dropdownOpen }) => (
    <>
        <h4>
            {title}: 
            <button className="add-btn" onClick={dropdownOpen}>+</button>
        </h4>
        <ul className={`${title.toLowerCase()}-list`}>
            {users.map(user => (
                <li key={user.id}>
                    {user.name}
                    <button className="remove-btn" onClick={() => onRemoveUser(user.id, title.toLowerCase() as 'leader' | 'member')}>-</button>
                </li>
            ))}
        </ul>
    </>
);

const UserDropdown: React.FC<{
    users: User[];
    onUserSelect: (user: User) => void;
}> = ({ users, onUserSelect }) => (
    <div className="user-dropdown">
        <ul>
            {users.map(user => (
                <li key={user.id} onClick={() => onUserSelect(user)}>
                    {user.name}
                </li>
            ))}
        </ul>
    </div>
);


export default ModalEditTeams;
