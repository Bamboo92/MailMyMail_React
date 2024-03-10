import React from 'react';

const DeleteIc = ({ className, color }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={color}
             viewBox="0 0 24 24">
            <g className="Trash">
                <g className="Group 21">
                    <path fill={color} fill-rule="evenodd"
                          d="M21 6H3v3a2 2 0 0 1 2 2v4c0 2.828 0 4.243.879 5.121C6.757 21 8.172 21 11 21h2c2.829 0 4.243 0 5.121-.879.88-.878.88-2.293.88-5.121v-4a2 2 0 0 1 2-2V6Zm-10.5 5a1 1 0 0 0-2 0v5a1 1 0 1 0 2 0v-5Zm5 0a1 1 0 0 0-2 0v5a1 1 0 1 0 2 0v-5Z"
                          className="Subtract" clip-rule="evenodd"/>
                </g>
                <path stroke={color} stroke-linecap="round" stroke-width="2"
                      d="M10.068 3.37c.114-.106.365-.2.715-.267A6.68 6.68 0 0 1 12 3c.44 0 .868.036 1.217.103.35.067.6.161.715.268"
                      className="Ellipse 45"/>
            </g>
        </svg>
    );
};

export default DeleteIc;