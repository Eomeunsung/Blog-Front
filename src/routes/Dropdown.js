import React, { useState } from "react";
import './../css/Dropdown.css'

function Dropdown({ options, onSelect }) {
    const [isOpen, setIsOpen] = useState(false); // 드롭다운 상태

    const handleToggle = () => {
        setIsOpen(!isOpen); // 열고 닫기 상태 전환
    };

    const handleSelect = (option) => {
        setIsOpen(false); // 드롭다운 닫기
        onSelect(option); // 부모로 선택한 옵션 전달
    };

    return (
        <div className="simple-dropdown">
            <div className="dropdown-header" onClick={handleToggle}>
                메뉴 ▾
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
