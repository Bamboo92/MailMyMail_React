import React from 'react';
import DeleteIc from "../icons/delete_ic";

export const NameUploadedFiles = (files, onRemove) => {
    const maxLength = 20; // Maximale Länge, die angezeigt werden soll

    return Array.from(files).map((file, index) => {
        let displayName = file.name;
        const fileExtension = file.name.split('.').pop(); // Extrahiert die Dateiendung

        if (displayName.length > maxLength) {
            // Kürzt den Namen, fügt Ellipsen hinzu und behält die Dateiendung bei
            displayName = `${displayName.substring(0, maxLength - 3 - fileExtension.length)}...${fileExtension}`;
        }

        return (
            <li className='uploadedFileLi unselectable' key={index}>
                <span className='uploadedFileName unselectable'>{displayName}</span>
                <button className='uploadedFileBtn unselectable' onClick={(e) => onRemove(file.name, e)}><DeleteIc className="uploadedFileDeleteIc" color={'red'}/></button>
            </li>
        );
    });
};