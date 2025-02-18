'use client';

import { useEffect, useState } from 'react';
import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import YearSelection from '../../../components/YearSelection';
import SemesterSelection from '../../../components/SemesterSelection';
import BranchSelection from '../../../components/BranchSelection';
import Breadcrumb from '../../../components/Breadcrumb';

const ProtectedContent = () => {
    const { isLoaded, user, isSignedIn } = useUser();
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState('');

    // Grade Calculator States
    const [formData, setFormData] = useState({
        grades: {
            code: { grade: "" },
            clp: { grade: "" },
            pps: { grade: "" },
            be: { grade: "" },
            beLab: { grade: "" },
            tce: { grade: "" },
        },
    });
    const [result, setResult] = useState(null);

    // Year data structure with corresponding semesters
    const yearData = [
        { year: 1, label: '1st Year', semesters: ['1st Semester', '2nd Semester'] },
        { year: 2, label: '2nd Year', semesters: ['3rd Semester', '4th Semester'] },
        { year: 3, label: '3rd Year', semesters: ['5th Semester', '6th Semester'] },
        { year: 4, label: '4th Year', semesters: ['7th Semester', '8th Semester'] }
    ];

    // Branch data
    const branches = [
        { id: 'CSE', name: 'Computer Science Engineering', icon: '💻' },
        { id: 'CCE', name: 'Computer & Communication Engineering', icon: '📡' },
        { id: 'ECE', name: 'Electronics & Communication Engineering', icon: '🔌' },
        { id: 'ME', name: 'Mechanical Engineering', icon: '⚙️' }
    ];

    // Grade Calculator Data
    const subjects = [
        { id: "code", name: "CODE" },
        { id: "clp", name: "CLP" },
        { id: "pps", name: "PPS" },
        { id: "be", name: "BE" },
        { id: "beLab", name: "BE LAB" },
        { id: "tce", name: "TCE" },
    ];

    const grades = ["A", "AB", "B", "BC", "C", "CD", "D", "F"];

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            setShowAuthPrompt(true);
        }

        // Update current date time with the specified format
        const updateDateTime = () => {
            const now = new Date();
            const formattedDate = `Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${now.toISOString()
                .slice(0, 19)
                .replace('T', ' ')}`;
            setCurrentDateTime(formattedDate);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, [isLoaded, isSignedIn]);

    useEffect(() => {
        setSelectedSemester(null);
        setSelectedBranch(null);
    }, [selectedYear]);

    useEffect(() => {
        setSelectedBranch(null);
    }, [selectedSemester]);

    const handleBack = () => {
        if (selectedBranch !== null) {
            setSelectedBranch(null);
        } else if (selectedSemester !== null) {
            setSelectedSemester(null);
            setResult(null);
            setFormData({
                grades: {
                    code: { grade: "" },
                    clp: { grade: "" },
                    pps: { grade: "" },
                    be: { grade: "" },
                    beLab: { grade: "" },
                    tce: { grade: "" },
                },
            });
        } else {
            setSelectedYear(null);
        }
    };

    const calculateGradePoints = (grade) => {
        const gradePoints = {
            A: 10, AB: 9, B: 8, BC: 7, C: 6, CD: 5, D: 4, F: 0,
        };
        return gradePoints[grade] || 0;
    };

    const handleGradeChange = (subject, value) => {
        setFormData((prev) => ({
            ...prev,
            grades: {
                ...prev.grades,
                [subject]: {
                    grade: value,
                },
            },
        }));
    };

    const handleCalculate = (e) => {
        e.preventDefault();

        const credits = {
            code: 4,
            clp: 4,
            pps: 4.5,
            be: 4,
            beLab: 1.5,
            tce: 3,
        };

        let totalPoints = 0;
        let totalCredits = 21;

        for (const subject in formData.grades) {
            const creditHours = credits[subject];
            const gradePoints = calculateGradePoints(formData.grades[subject].grade);
            totalPoints += creditHours * gradePoints;
        }

        const calculatedCgpa = (totalPoints / totalCredits).toFixed(2);
        setResult(calculatedCgpa);
    };

    const needsBranchSelection = (year, semester) => {
        return !(Number(year) === 1 && Number(semester) === 0);
    };

    const GradeResult = ({ cgpa, onReset }) => (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                             from-blue-600 to-purple-600">
                    Your SGPA
                </h3>
                <div className="text-5xl font-bold text-blue-600">{cgpa}</div>
                <p className="text-gray-600">
                    {parseFloat(cgpa) >= 7.5
                        ? "Excellent performance! 🎉"
                        : parseFloat(cgpa) >= 6.0
                            ? "Good job! 👏"
                            : "Keep working hard! 💪"}
                </p>
                <button
                    onClick={onReset}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                             py-3 px-4 rounded-md hover:opacity-90 transition-opacity font-medium"
                >
                    Calculate Again
                </button>
            </div>
        </div>
    );

    const renderMainContent = () => {
        console.log('Current state:', { selectedYear, selectedSemester, selectedBranch });

        if (!selectedYear) {
            return (
                <YearSelection
                    yearData={yearData}
                    onYearSelect={(year) => {
                        console.log('Setting year:', year);
                        setSelectedYear(Number(year));
                    }}
                />
            );
        }

        if (selectedYear && selectedSemester === null) {
            const yearInfo = yearData.find(y => y.year === selectedYear);
            return (
                <SemesterSelection
                    yearInfo={yearInfo}
                    onSemesterSelect={(semester) => {
                        console.log('Setting semester:', semester);
                        setSelectedSemester(Number(semester));
                    }}
                    onBack={handleBack}
                />
            );
        }

        if (Number(selectedYear) === 1 && Number(selectedSemester) === 0) {
            console.log('Rendering first semester form');
            return (
                <div className="w-full">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col items-center gap-8">
                            <div className="text-center space-y-2">
                                <h3 className="text-3xl font-bold text-transparent bg-clip-text 
                                             bg-gradient-to-r from-blue-600 to-purple-600">
                                    First Semester
                                </h3>
                                <p className="text-gray-500">Enter your grades to calculate SGPA</p>
                            </div>
                            <div className="w-full">
                                <div className="flex justify-center w-full">
                                    <button
                                        onClick={handleBack}
                                        className="mb-6 px-6 py-2 text-gray-600 hover:text-blue-600 
                                 transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <span>←</span> Back to Semester Selection
                                    </button>
                                </div>

                                {result ? (
                                    <GradeResult
                                        cgpa={result}
                                        onReset={() => setResult(null)}
                                    />
                                ) : (
                                    <div className="max-w-md mx-auto p-6 bg-white rounded-lg outline-dashed 
                                                outline-slate-400 outline-1 shadow-md">
                                        <h2 className="text-2xl font-bold text-center mb-6 text-transparent 
                                                   bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                            Enter your Grades
                                        </h2>

                                        <form onSubmit={handleCalculate} className="space-y-4">
                                            {subjects.map((subject) => (
                                                <div key={subject.id} className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        {subject.name}
                                                    </label>
                                                    <div className="flex space-x-2">
                                                        <select
                                                            value={formData.grades[subject.id].grade}
                                                            onChange={(e) =>
                                                                handleGradeChange(subject.id, e.target.value)
                                                            }
                                                            className="w-full p-2 border rounded-md bg-white"
                                                            required
                                                        >
                                                            <option value="">Select Grade</option>
                                                            {grades.map((grade) => (
                                                                <option key={grade} value={grade}>
                                                                    {grade}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}

                                            <button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                                                         text-white py-3 px-4 rounded-md hover:opacity-90 
                                                         transition-opacity font-medium"
                                            >
                                                Calculate SGPA
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (needsBranchSelection(selectedYear, selectedSemester) && !selectedBranch) {
            return (
                <BranchSelection
                    branches={branches}
                    onBranchSelect={(branch) => setSelectedBranch(branch)}
                    onBack={handleBack}
                />
            );
        }

        return (
            <div className="w-full flex flex-col items-center">
                <button
                    onClick={handleBack}
                    className="mb-6 px-6 py-2 text-gray-600 hover:text-blue-600 
                             transition-colors duration-200 flex items-center gap-2"
                >
                    <span>←</span> Back to Branch Selection
                </button>
                <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-6">
                            <span className="text-4xl mr-3">
                                {branches.find(b => b.id === selectedBranch)?.icon}
                            </span>
                            <span className="text-2xl font-bold text-transparent bg-clip-text 
                                         bg-gradient-to-r from-blue-600 to-purple-600">
                                {selectedBranch}
                            </span>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                            <p className="text-blue-800 font-medium">
                                {yearData[selectedYear - 1].label} - {yearData[selectedYear - 1].semesters[selectedSemester]}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <span className="text-4xl block">🚧</span>
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text 
                                         bg-gradient-to-r from-blue-600 to-purple-600">
                                Coming Soon!
                            </h3>
                            <p className="text-gray-600">
                                Grade calculator for this combination will be available soon.
                            </p>
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-600 space-y-2">
                                    <p className="font-medium">Selected Options:</p>
                                    <p>Year: {yearData[selectedYear - 1].label}</p>
                                    <p>Semester: {yearData[selectedYear - 1].semesters[selectedSemester]}</p>
                                    <p>Branch: {branches.find(b => b.id === selectedBranch)?.name}</p>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                                {currentDateTime}
                                <br />
                                Current User's Login: {user?.username || 'AmrendraTheCoder'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {isSignedIn ? (
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="text-center mb-12 space-y-2">
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                                 from-blue-600 to-purple-600">
                            {!selectedYear ? 'Select Your Year' :
                                !selectedSemester ? 'Select Your Semester' :
                                    needsBranchSelection(selectedYear, selectedSemester) && !selectedBranch ?
                                        'Select Your Branch' : 'Grade Calculator'}
                        </h2>
                        <p className="text-xl text-gray-600">
                            Welcome, {user?.firstName || user?.username}!
                        </p>
                    </div>

                    <div className="flex justify-center mb-12">
                        <Breadcrumb
                            yearInfo={yearData.find(y => y.year === selectedYear)}
                            selectedSemester={selectedSemester}
                            selectedBranch={selectedBranch}
                        />
                    </div>

                    <div className="mt-8">
                        {renderMainContent()}
                    </div>

                    <footer className="mt-12 text-center text-sm text-gray-500">
                        <p>Made with ❤️ by Amrendra</p>
                    </footer>
                </div>
            ) : showAuthPrompt ? (
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                            Welcome to SGPA Calculator
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 text-center">
                            Please sign in to access your grade calculator
                        </p>
                        <div className="flex flex-col space-y-4">
                            <SignInButton>
                                <button className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 
                                           text-white font-medium rounded-lg transition-colors">
                                    Login
                                </button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 
                                           text-white font-medium rounded-lg transition-colors">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </div>
                        <div className="mt-8 text-center text-sm text-gray-500">
                            <p>{currentDateTime}</p>
                            <p>Current User's Login: AmrendraTheCoder</p>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ProtectedContent;