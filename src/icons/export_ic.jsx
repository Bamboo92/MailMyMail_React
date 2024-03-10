import React from 'react';

const ExportIc = ({ className, color }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <g className="Export">
                <path fill={color}
                      d="m12 5-.707-.707.707-.707.707.707L12 5Zm1 9a1 1 0 1 1-2 0h2ZM6.293 9.293l5-5 1.414 1.414-5 5-1.414-1.414Zm6.414-5 5 5-1.414 1.414-5-5 1.414-1.414ZM13 5v9h-2V5h2Z"
                      className="Vector 9"/>
                <path stroke={color} stroke-width="2" d="M5 16v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1"
                      className="Vector 114"/>
            </g>
        </svg>
    );
};

export default ExportIc;