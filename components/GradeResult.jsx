import React from 'react'

const GradeResult = ({ cgpa, onReset }) => {
    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg outline  outline-3 outline-primary shadow-lg">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Your Results</h2>
            <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <p className="text-center text-2xl font-bold text-blue-900">
                    CGPA: {cgpa}
                </p>
            </div>
            <button
                onClick={onReset}
                className="mt-6 w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-900 transition-colors font-medium"
            >
                Recalculate
            </button>
        </div>
    );
};

export default GradeResult;
