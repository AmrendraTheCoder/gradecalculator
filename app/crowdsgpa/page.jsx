"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Calculator() {
    const router = useRouter();
    const [rows, setRows] = useState([{ subject: "", credits: "", grade: "" }]);
    const [result, setResult] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const grades = ["A", "AB", "B", "BC", "C", "CD", "D", "F"];

    const calculateGradePoints = (grade) => {
        const gradePoints = { A: 10, AB: 9, B: 8, BC: 7, C: 6, CD: 5, D: 4, F: 0 };
        return gradePoints[grade] || 0;
    };

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    const addRow = () => {
        setRows([...rows, { subject: "", credits: "", grade: "" }]);
    };

    const removeRow = (index) => {
        if (rows.length > 1) {
            setRows(rows.filter((_, i) => i !== index));
        }
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        let totalPoints = 0;
        let totalCredits = 0;

        for (const row of rows) {
            const creditHours = parseFloat(row.credits) || 0;
            const gradePoints = calculateGradePoints(row.grade);
            totalPoints += creditHours * gradePoints;
            totalCredits += creditHours;
        }

        if (totalCredits === 0) {
            alert("Please enter valid credits!");
            return;
        }

        const calculatedSgpa = (totalPoints / totalCredits).toFixed(2);
        setResult(calculatedSgpa);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Calculate Your SGPA Easily
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Whether you're planning your semester or checking your performance, this tool helps you compute your Semester Grade Point Average (SGPA) with just a few clicks. Add your subjects, credits, and grades below!
                    </p>
                </div>

                {!result ? (
                    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Your Subjects
                        </h2>
                        <form onSubmit={handleCalculate} className="space-y-6">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left text-sm font-medium text-gray-700 pb-2 pr-4">Subject</th>
                                        <th className="text-left text-sm font-medium text-gray-700 pb-2 pr-4">Credits</th>
                                        <th className="text-left text-sm font-medium text-gray-700 pb-2 pr-4">Grade</th>
                                        <th className="text-left text-sm font-medium text-gray-700 pb-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                            <td className="py-1 pr-4">
                                                <input
                                                    type="text"
                                                    value={row.subject}
                                                    onChange={(e) => handleInputChange(index, "subject", e.target.value)}
                                                    placeholder="e.g., Math"
                                                    className="w-full p-2 border rounded-md"
                                                    required
                                                />
                                            </td>
                                            <td className="py-1 pr-4">
                                                <input
                                                    type="number"
                                                    step="0.5"
                                                    min="0"
                                                    value={row.credits}
                                                    onChange={(e) => handleInputChange(index, "credits", e.target.value)}
                                                    placeholder="e.g., 4"
                                                    className="w-full p-2 border rounded-md"
                                                    required
                                                />
                                            </td>
                                            <td className="py-1 pr-4">
                                                <select
                                                    value={row.grade}
                                                    onChange={(e) => handleInputChange(index, "grade", e.target.value)}
                                                    className="w-full p-2 border rounded-md"
                                                    required
                                                >
                                                    <option value="">Grade</option>
                                                    {grades.map((grade) => (
                                                        <option key={grade} value={grade}>
                                                            {grade}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="py-1">
                                                {rows.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeRow(index)}
                                                        className="text-gray-500 hover:text-red-500 text-lg font-semibold"
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="text-sm text-gray-600">
                                Grades: A=10, AB=9, B=8, BC=7, C=6, CD=5, D=4, F=0
                            </p>
                            <button
                                type="button"
                                onClick={addRow}
                                className="w-full py-2 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                + Add Another Subject
                            </button>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md hover:opacity-90 transition-opacity font-medium"
                            >
                                Calculate SGPA
                            </button>
                        </form>

                        <div className="mt-6">
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="w-full py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            >
                                {showDetails ? "Hide Details" : "Show Details"}
                            </button>
                            {showDetails && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-md text-gray-700">
                                    <h3 className="text-lg font-semibold mb-2">How SGPA is Calculated</h3>
                                    <p className="text-sm mb-4">
                                        SGPA (Semester Grade Point Average) measures your academic performance for a semester. Here’s how it works:
                                    </p>
                                    <ul className="list-disc list-inside text-sm space-y-2 mb-4">
                                        <li>
                                            <strong>Step 1:</strong> Each subject has credits (e.g., 4) and a grade (e.g., A). We assign a grade point to each grade: A=10, AB=9, B=8, BC=7, C=6, CD=5, D=4, F=0.
                                        </li>
                                        <li>
                                            <strong>Step 2:</strong> Multiply the credits by the grade point for each subject to get the "points" (e.g., 4 credits × 10 for A = 40 points).
                                        </li>
                                        <li>
                                            <strong>Step 3:</strong> Add up all the points and all the credits separately.
                                        </li>
                                        <li>
                                            <strong>Step 4:</strong> Divide total points by total credits to get your SGPA, rounded to two decimal places.
                                        </li>
                                    </ul>
                                    <p className="text-sm">
                                        <strong>Example:</strong> Math (4 credits, A=10) = 40 points, Physics (3 credits, B=8) = 24 points. Total points = 64, total credits = 7, SGPA = 64 / 7 = 9.14.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold text-center text-[#7d7bff] mb-4">Your SGPA</h2>
                        <div className="p-6 bg-[#EBEAFF] rounded-lg">
                            <p className="text-center text-2xl font-bold text-[#6461ff]">
                                SGPA: {result}
                            </p>
                        </div>
                        <button
                            onClick={() => setResult(null)}
                            className="mt-6 w-full bg-[#4b48ff] text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
                        >
                            Calculate Again
                        </button>
                    </div>
                )}
                <div className="pt-12">
                    <div className="container mx-auto text-center pb-8">
                        <p className="text-gray-400">Made with ❤️ by Amrendra</p>
                    </div>
                </div>
            </div>
        </div>
    );
}