import { useState } from 'react';

export function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-menu">
      <button className="dropdown-toggle" onClick={handleToggle}>
        Menu
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      )}
    </div>
  );
}
