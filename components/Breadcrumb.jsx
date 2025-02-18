'use client';

const Breadcrumb = ({ yearInfo, selectedSemester, selectedBranch, currentDateTime, username }) => {
    if (!yearInfo) return null;

    const items = [
        {
            label: yearInfo.label,
            mobileLabel: yearInfo.label.split(' ')[0], // '1st' instead of '1st Year'
            icon: "📚",
            active: true
        },
        selectedSemester !== null && {
            label: yearInfo.semesters[selectedSemester],
            mobileLabel: `Sem ${selectedSemester + 1}`, // 'Sem 1' instead of '1st Semester'
            icon: "📝",
            active: true
        },
        selectedBranch && {
            label: selectedBranch,
            mobileLabel: selectedBranch, // Keep branch code as is (CSE, ECE, etc.)
            icon: "🎓",
            active: true
        }
    ].filter(Boolean);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                {/* Desktop Version */}
                <div className="hidden sm:flex items-center justify-center space-x-3">
                    {items.map((item, index) => (
                        <div key={item.label} className="flex items-center">
                            <div className={`
                                flex items-center px-4 py-2 rounded-lg
                                ${item.active
                                    ? 'bg-blue-50 border border-blue-100'
                                    : 'bg-gray-50 border border-gray-100'
                                }
                            `}>
                                <span className="mr-2 text-xl">{item.icon}</span>
                                <span className={`
                                    text-sm font-medium
                                    ${item.active ? 'text-blue-600' : 'text-gray-500'}
                                `}>
                                    {item.label}
                                </span>
                            </div>
                            {index < items.length - 1 && (
                                <div className="px-3">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Version */}
                <div className="sm:hidden">
                    {/* Compact Breadcrumb */}
                    <div className="flex items-center justify-center">
                        {items.map((item, index) => (
                            <div key={item.label} className="flex items-center">
                                <div className={`
                                    flex items-center px-2 py-1 rounded-md text-xs
                                    ${item.active
                                        ? 'bg-blue-50 border border-blue-100'
                                        : 'bg-gray-50 border border-gray-100'
                                    }
                                `}>
                                    <span className="mr-1 text-base">{item.icon}</span>
                                    <span className={`
                                        font-medium
                                        ${item.active ? 'text-blue-600' : 'text-gray-500'}
                                    `}>
                                        {item.mobileLabel}
                                    </span>
                                </div>
                                {index < items.length - 1 && (
                                    <div className="px-1">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    
                </div>

               
            </div>
        </div>
    );
};

export default Breadcrumb;