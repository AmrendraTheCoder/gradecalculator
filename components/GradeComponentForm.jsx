"use client";
import { useState } from "react";
import GradeResult from "./GradeResult"; // Import the GradeResult component

const GradeForm = () => {
    const [formData, setFormData] = useState({
        grades: {
            code: { grade: "", marks: "" },
            clp: { grade: "", marks: "" },
            pps: { grade: "", marks: "" },
            be: { grade: "", marks: "" },
            beLab: { grade: "", marks: "" },
            tce: { grade: "", marks: "" },
        },
    });

    const [result, setResult] = useState(null); // State for result

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

        // Pass result to the GradeResult component
        setResult(calculatedCgpa);
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

    if (result) {
        return <GradeResult cgpa={result} onReset={() => setResult(null)} />;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg outline-dashed outline-slate-400 outline-1 shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Semester 1 : Grade Calculator
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