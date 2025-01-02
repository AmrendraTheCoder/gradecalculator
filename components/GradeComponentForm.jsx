"use client";
import { useState } from "react";
import GradeResult from "./GradeResult"; // Import the GradeResult component

const GradeForm = () => {
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
        <>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg outline-dashed outline-slate-400 outline-1 shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#6461ff]">
                    Enter your Grades : 
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
                        className="w-full bg-[#4b48ff] text-white py-3 px-4 rounded-md hover:bg-accent transition-colors font-medium"
                    >
                        Calculate SGPA
                    </button>
                </form>

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

export default GradeForm;