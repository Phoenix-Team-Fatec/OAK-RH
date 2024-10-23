// ToggleSwitch.tsx
import React from 'react';
import './ToggleSwitch.css';

interface ToggleSwitchProps {
    isOn: boolean;
    handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
    return (
        <div className="toggle-switch" onClick={handleToggle}>
            <div className={`switch ${isOn ? 'on' : 'off'}`}></div>
        </div>
    );
};

export default ToggleSwitch;
