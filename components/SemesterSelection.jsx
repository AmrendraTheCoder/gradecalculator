const SemesterSelection = ({ yearInfo, onSemesterSelect, onBack }) => {
    return (
        <div className="flex flex-col items-center gap-8">
            {/* Header Section */}
            <div className="text-center space-y-2">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Select Your Semester
                </h3>
                <p className="text-gray-500">
                    {yearInfo.label} - Choose your semester to calculate SGPA
                </p>
            </div>

            {/* Semester Selection Grid */}
            <div className="grid grid-cols-2 gap-6 mt-4 max-w-2xl w-full px-4">
                {yearInfo.semesters.map((semester, index) => (
                    <button
                        key={index}
                        onClick={() => onSemesterSelect(index)}
                        className="relative group flex flex-col items-center justify-center p-6
                                 bg-white rounded-2xl shadow-sm border-2 border-transparent
                                 hover:border-blue-500 hover:shadow-md transition-all duration-300"
                    >
                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br 
                                     from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 
                                     transition-opacity duration-300 rounded-2xl"
                        />
                        <span className="relative text-4xl font-bold mb-2 bg-gradient-to-r 
                                     from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {index + 1}
                        </span>
                        <span className="relative text-lg text-gray-600 group-hover:text-gray-800 
                                     transition-colors duration-300">
                            {semester}
                        </span>
                    </button>
                ))}
            </div>

            {/* Navigation and Info */}
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-blue-600 
                             transition-colors duration-200"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <span>Back to Year Selection</span>
                </button>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                        Calculate your semester grades with ease
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SemesterSelection;