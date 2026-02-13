import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAnalysisById } from '../utils/storageManager';
import { CheckCircle2, Calendar, Target, MessageSquare, ArrowLeft, Building2, Briefcase } from 'lucide-react';

export default function Results() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            const data = getAnalysisById(id);
            if (data) {
                setAnalysis(data);
            } else {
                navigate('/practice');
            }
        } else {
            navigate('/practice');
        }
    }, [searchParams, navigate]);

    if (!analysis) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate('/dashboard/practice')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Analyzer
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900">Analysis Results</h2>
                </div>
                <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-2 justify-end">
                        {analysis.company !== 'Not specified' && (
                            <>
                                <Building2 className="w-4 h-4" />
                                <span className="font-medium">{analysis.company}</span>
                            </>
                        )}
                    </div>
                    {analysis.role !== 'Not specified' && (
                        <div className="flex items-center gap-2 justify-end mt-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{analysis.role}</span>
                        </div>
                    )}
                    <div className="mt-1">{new Date(analysis.createdAt).toLocaleDateString()}</div>
                </div>
            </div>

            {/* Readiness Score */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-lg shadow-md border border-purple-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Readiness Score</h3>
                        <p className="text-gray-600">Based on JD analysis and provided details</p>
                    </div>
                    <div className="text-center">
                        <div className="text-6xl font-bold text-primary">{analysis.readinessScore}</div>
                        <div className="text-gray-500 text-sm mt-1">/ 100</div>
                    </div>
                </div>
            </div>

            {/* Extracted Skills */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Key Skills Extracted
                </h3>
                <div className="space-y-4">
                    {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
                        <div key={category}>
                            <div className="text-sm font-medium text-gray-600 mb-2">{category}</div>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Round-wise Checklist */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Round-wise Preparation Checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(analysis.checklist).map(([round, items]) => (
                        <div key={round} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-3">{round}</h4>
                            <ul className="space-y-2">
                                {items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* 7-Day Plan */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    7-Day Preparation Plan
                </h3>
                <div className="space-y-4">
                    {Object.entries(analysis.plan).map(([day, tasks]) => (
                        <div key={day} className="border-l-4 border-primary pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 mb-2">{day}</h4>
                            <ul className="space-y-1">
                                {tasks.map((task, idx) => (
                                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                        <span className="text-primary">→</span>
                                        <span>{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interview Questions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    10 Likely Interview Questions
                </h3>
                <div className="space-y-3">
                    {analysis.questions.map((question, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                {idx + 1}
                            </div>
                            <p className="text-gray-800">{question}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={() => navigate('/dashboard/practice')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                    Analyze Another JD
                </button>
                <button
                    onClick={() => navigate('/dashboard/practice/history')}
                    className="flex-1 bg-primary hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                    View History
                </button>
            </div>
        </div>
    );
}
