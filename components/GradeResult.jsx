import React from 'react'

const GradeResult = ({ cgpa, onReset }) => {
    return (
        <>
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg outline-dashed outline-1 outline-primary shadow-lg">
                <h2 className="text-3xl font-bold text-center text-[#7d7bff] mb-4">Prediction Score :</h2>
                <div className="p-6 bg-[#EBEAFF] rounded-lg border border-dotted border-[#6461ff]">
                    <p className="text-center text-2xl font-bold text-[#6461ff]">
                    CGPA: {cgpa}
                </p>
            </div>
            <button
                onClick={onReset}
                    className="mt-6 w-full bg-[#4b48ff] text-white py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium"
            >
                Re-Predict
            </button>
            </div>
            <div className="pt-6">
                <div className="container mx-auto text-center pb-8">
                    <p className="text-gray-400">
                        Made with ❤️ by Amrendra
                    </p>
                </div>
            </div>
        </>
    );
};

export default GradeResult;
