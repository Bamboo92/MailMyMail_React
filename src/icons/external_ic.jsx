import React from 'react';

const ExternalIc = ({ className, color }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
            <g className="External 1" clip-path="url(#a)">
                <path stroke={color} stroke-width="2" d="M10 1h6L8 9m8-9v7" className="Vector"/>
                <path stroke={color} stroke-linecap="round" stroke-width="2"
                      d="M7 2H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4" className="Vector"/>
            </g>
            <defs>
                <clipPath id="a" className="a">
                    <path fill="#fff" d="M0 0h17v17H0z"/>
                </clipPath>
            </defs>
        </svg>
    );
};

export default ExternalIc;