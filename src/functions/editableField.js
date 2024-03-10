import { useState } from 'react';

export const useEditableField = () => {
    const [isEditable, setIsEditable] = useState(false);

    const toggleEdit = (event) => {
        if (event) event.preventDefault();
        setIsEditable(!isEditable);
    };

    return { isEditable, toggleEdit };
};
