const BranchSelection = ({ branches, onBranchSelect, onBack }) => {
    return (
        <div className="flex flex-col items-center gap-8">
            {/* Header Section */}
            <div className="text-center space-y-2">
                <p className="text-gray-500">
                    Choose your engineering branch to continue
                </p>
            </div>

            {/* Branch Selection Grid */}
            <div className="grid grid-cols-2 gap-6 mt-4 max-w-3xl w-full px-4">
                {branches.map((branch) => (
                    <button
                        key={branch.id}
                        onClick={() => onBranchSelect(branch.id)}
                        className="relative group flex flex-col items-center justify-center p-8
                                 bg-white rounded-2xl shadow-sm border-2 border-transparent
                                 hover:border-blue-500 hover:shadow-md transition-all duration-300"
                    >
                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br 
                                     from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 
                                     transition-opacity duration-300 rounded-2xl"
                        />

                        {/* Branch Icon */}
                        <span className="relative text-5xl mb-4 transform group-hover:scale-110 
                                     transition-transform duration-300">
                            {branch.icon}
                        </span>

                        {/* Branch Name */}
                        <span className="relative text-lg font-semibold text-gray-800 group-hover:text-blue-600 
                                     transition-colors duration-300 text-center">
                            {branch.id}
                        </span>

                        {/* Branch Full Name */}
                        <span className="relative text-sm text-gray-500 group-hover:text-gray-700 
                                     transition-colors duration-300 text-center mt-2">
                            {branch.name}
                        </span>

                        {/* Decorative Elements */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                                    group-hover:border-blue-200 transition-colors duration-300"
                        />
                    </button>
                ))}
            </div>

            {/* Navigation and Info */}
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-blue-600 
                             transition-colors duration-200 group"
                >
                    <svg
                        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
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
                    <span>Back to Semester Selection</span>
                </button>

                {/* Additional Info */}
                <div className="mt-4 text-center">
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Select your branch to view relevant courses</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BranchSelection;