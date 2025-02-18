const YearSelection = ({ yearData, onYearSelect }) => {
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="text-center space-y-2">
                <p className="text-gray-500">Choose your academic year to calculate SGPA</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4 max-w-2xl w-full px-4">
                {yearData.map(({ year, label }) => (
                    <button
                        key={year}
                        onClick={() => onYearSelect(year)}
                        className="relative group flex flex-col items-center justify-center p-6
                                 bg-white rounded-2xl shadow-sm border-2 border-transparent
                                 hover:border-blue-500 hover:shadow-md transition-all duration-300"
                    >
                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br 
                                     from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 
                                     transition-opacity duration-300 rounded-2xl" />
                        <span className="relative text-4xl font-bold mb-2 bg-gradient-to-r 
                                     from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {year}
                        </span>
                        <span className="relative text-lg text-gray-600 group-hover:text-gray-800 
                                     transition-colors duration-300">
                            {label}
                        </span>
                    </button>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    Calculate your semester grades with ease
                </p>
            </div>
        </div>
    );
};

export default YearSelection;