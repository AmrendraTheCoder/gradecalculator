'use client';

const Breadcrumb = ({ yearInfo, selectedSemester, selectedBranch, currentDateTime, username }) => {
    if (!yearInfo) return null;

    const items = [
        {
            label: yearInfo.label,
            icon: "📚",
            active: true
        },
        selectedSemester !== null && {
            label: yearInfo.semesters[selectedSemester],
            icon: "📝",
            active: true
        },
        selectedBranch && {
            label: selectedBranch,
            icon: "🎓",
            active: true
        }
    ].filter(Boolean);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-center space-x-3">
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
            </div>
        </div>
    );
};

export default Breadcrumb;