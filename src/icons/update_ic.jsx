import React from 'react';

const UpdateIc = ({ className, color }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <g className="Refresh">
                <g className="Group 8593">
                    <path stroke={color} stroke-width="2" d="M13.714 14.571 10.286 18l3.428 3.429"
                          className="Vector 9"/>
                    <path stroke={color} stroke-linecap="round" stroke-width="2" d="M17.196 9A6 6 0 0 1 12 18"
                          className="Ellipse 57"/>
                </g>
                <g className="Group 8594">
                    <path stroke={color} stroke-width="2" d="M10.286 9.429 13.714 6l-3.428-3.429"
                          className="Vector 9"/>
                    <path stroke={color} stroke-linecap="round" stroke-width="2" d="M6.804 15A6 6 0 0 1 12 6"
                          className="Ellipse 57"/>
                </g>
            </g>
        </svg>
    );
};

export default UpdateIc;