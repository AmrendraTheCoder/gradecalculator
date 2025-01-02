"use client";
import { useState } from "react";

const GradeForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        grades: {
            code: { grade: "", marks: "" },
            clp: { grade: "", marks: "" },
            pps: { grade: "", marks: "" },
            be: { grade: "", marks: "" },
            beLab: { grade: "", marks: "" },
            tce: { grade: "", marks: "" },
        },
    });

    const [result, setResult] = useState({
        showForm: true,
        cgpa: 0,
    });

    const calculateGradePoints = (grade) => {
        const gradePoints = {
            A: 10,
            AB: 9,
            B: 8,
            BC: 7,
            C: 6,
            CD: 5,
            D: 4,
            F: 0,
        };
        return gradePoints[grade] || 0;
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

        setResult({
            showForm: false,
            cgpa: calculatedCgpa,
        });
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleGradeChange = (subject, field, value) => {
        setFormData((prev) => ({
            ...prev,
            grades: {
                ...prev.grades,
                [subject]: {
                    ...prev.grades[subject],
                    [field]: value,
                },
            },
        }));
    };

    const subjects = [
        { id: "code", name: "CODE" },
        { id: "clp", name: "CLP" },
        { id: "pps", name: "PPS" },
        { id: "be", name: "BE" },
        { id: "beLab", name: "BE LAB" },
        { id: "tce", name: "TCE" },
    ];

    const grades = ["A", "AB", "B", "BC", "C", "CD", "D", "F"];

    if (!result.showForm) {
        return (
            <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Your Results</h2>
                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <p className="text-center text-2xl font-bold text-blue-900">
                        CGPA: {result.cgpa}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Semester 1 : Grade Calculator
            </h2>

            <form onSubmit={handleCalculate} className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full p-2 border rounded-md bg-white"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Number Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Branch:</label>
                    <input
                        type="text"
                        value={formData.number}
                        onChange={(e) => handleInputChange("number", e.target.value)}
                        className="w-full p-2 border rounded-md bg-white"
                        placeholder="Enter your number"
                        required
                    />
                </div>

                {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            {subject.name}
                        </label>

                        <div className="flex space-x-2">
                            {/* Grade Dropdown */}
                            <select
                                value={formData.grades[subject.id].grade}
                                onChange={(e) =>
                                    handleGradeChange(subject.id, "grade", e.target.value)
                                }
                                className="w-1/2 p-2 border rounded-md bg-white"
                                required
                            >
                                <option value="">Select Grade</option>
                                {grades.map((grade) => (
                                    <option key={grade} value={grade}>
                                        {grade}
                                    </option>
                                ))}
                            </select>

                            {/* Marks Input */}
                            <input
                                type="number"
                                value={formData.grades[subject.id].marks}
                                onChange={(e) =>
                                    handleGradeChange(subject.id, "marks", e.target.value)
                                }
                                className="w-1/2 p-2 border rounded-md bg-white"
                                placeholder="Enter marks"
                                min="0"
                                max="100"
                                required
                            />
                        </div>
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                    Calculate SGPA
                </button>
            </form>
        </div>
    );
};

export default GradeForm;