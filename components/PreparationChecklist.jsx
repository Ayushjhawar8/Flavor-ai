// Flavor-ai/components/PreparationChecklist.jsx
import React, { useEffect, useState } from "react";
import { ChefHat, Flame, Timer, Utensils, Thermometer, Scissors, Droplet, Eye } from "lucide-react";

// Helper function to detect step type and return appropriate icon
const getStepIcon = (step) => {
  const lowerStep = step.toLowerCase();
  if (lowerStep.includes('heat') || lowerStep.includes('boil') || lowerStep.includes('simmer')) return Flame;
  if (lowerStep.includes('cut') || lowerStep.includes('chop') || lowerStep.includes('slice') || lowerStep.includes('dice')) return Scissors;
  if (lowerStep.includes('mix') || lowerStep.includes('stir') || lowerStep.includes('whisk') || lowerStep.includes('combine')) return Utensils;
  if (lowerStep.includes('wait') || lowerStep.includes('rest') || lowerStep.includes('minutes') || lowerStep.includes('hours')) return Timer;
  if (lowerStep.includes('temperature') || lowerStep.includes('degrees') || lowerStep.includes('°')) return Thermometer;
  if (lowerStep.includes('add') || lowerStep.includes('pour') || lowerStep.includes('drizzle')) return Droplet;
  if (lowerStep.includes('check') || lowerStep.includes('watch') || lowerStep.includes('monitor')) return Eye;
  return ChefHat; // Default icon
};

const PreparationChecklist = ({ steps, checklistKey }) => {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    // Load state from localStorage
    const saved = localStorage.getItem(checklistKey);
    if (saved) {
      setChecked(JSON.parse(saved));
    } else {
      setChecked(Array(steps.length).fill(false));
    }
  }, [steps, checklistKey]);

  const handleCheck = (idx) => {
    const updated = [...checked];
    updated[idx] = !updated[idx];
    setChecked(updated);
    localStorage.setItem(checklistKey, JSON.stringify(updated));
  };

  // Calculate progress
  const completedSteps = checked.filter(Boolean).length;
  const totalSteps = steps.length;
  const progressPercentage =
    totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  // FIXED: Better progress colors for visibility
  const getProgressColor = () => {
    if (progressPercentage === 0) return "bg-base-300";
    if (progressPercentage < 25) return "bg-orange-500"; // More visible orange
    if (progressPercentage < 50) return "bg-yellow-500"; // Bright yellow
    if (progressPercentage < 75) return "bg-blue-500"; // Bright blue
    if (progressPercentage < 100) return "bg-purple-500"; // Purple for high progress
    return "bg-green-500"; // Bright green for completion
  };

  const handleMarkAllComplete = () => {
    const allChecked = Array(steps.length).fill(true);
    setChecked(allChecked);
    localStorage.setItem(checklistKey, JSON.stringify(allChecked));
  };

  const handleResetAll = () => {
    const allUnchecked = Array(steps.length).fill(false);
    setChecked(allUnchecked);
    localStorage.setItem(checklistKey, JSON.stringify(allUnchecked));
  };

  return (
    <div className="space-y-6">
      {/* Progress Section */}
      <div
        className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300"
        data-aos="fade-up"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-base-content mb-1">
              Preparation Progress
            </h3>
            <p className="text-sm text-base-content/70">
              {completedSteps} of {totalSteps} steps completed
            </p>
          </div>

          {/* Progress Percentage */}
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* Progress Bar - FIXED VISIBILITY */}
        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            {" "}
            {/* Changed to gray-200 for better contrast */}
            <div
              className={`h-4 rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Motivational Messages */}
          {totalSteps > 0 && (
            <div className="text-center">
              <p className="text-sm font-medium text-base-content">
                {progressPercentage === 0 && "🚀 Let's get cooking!"}
                {progressPercentage > 0 &&
                  progressPercentage < 25 &&
                  "🔥 Great start! Keep going!"}
                {progressPercentage >= 25 &&
                  progressPercentage < 50 &&
                  "👏 You're making progress!"}
                {progressPercentage >= 50 &&
                  progressPercentage < 75 &&
                  "🌟 Almost there! Amazing!"}
                {progressPercentage >= 75 &&
                  progressPercentage < 100 &&
                  "💪 Final touches!"}
                {progressPercentage === 100 && "🎉 Perfect! Ready to serve!"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Checklist Items - Enhanced with Icons */}
      <ul className="space-y-4">
        {steps.map((step, idx) => {
          const StepIcon = getStepIcon(step);
          return (
            <li 
              key={idx} 
              className={`
                rounded-lg transition-all duration-200 shadow-sm
                ${checked[idx] 
                  ? 'bg-green-50 dark:bg-success/10 border-l-4 border-green-600 dark:border-success' 
                  : 'bg-base-100 border-l-4 border-purple-500 hover:bg-base-200 hover:shadow-md'
                }
              `}
            >
              <label 
                className="flex items-start gap-4 p-5 cursor-pointer select-none"
              >
                {/* Contextual Icon */}
                <div className={`flex-shrink-0 mt-0.5 ${
                  checked[idx] 
                    ? 'text-green-600 dark:text-success/60' 
                    : 'text-purple-600 dark:text-purple-400'
                }`}>
                  <StepIcon size={22} />
                </div>
                
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={checked[idx] || false}
                  onChange={() => handleCheck(idx)}
                  className="checkbox checkbox-primary checkbox-md mt-1 flex-shrink-0"
                />
                
                {/* Step Content */}
                <div className="flex-1">
                  <span className={`text-base leading-relaxed font-medium ${
                    checked[idx] 
                      ? 'line-through text-gray-600 dark:text-gray-400 decoration-2 decoration-green-600 dark:decoration-success' 
                      : 'text-base-content'
                  }`}>
                    {step}
                  </span>
                  
                  {/* Step Number and Status */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-semibold text-base-content/60 bg-base-200 px-2 py-1 rounded">
                      Step {idx + 1} of {totalSteps}
                    </span>
                    
                    {checked[idx] && (
                      <span className="text-xs text-green-600 dark:text-success font-semibold flex items-center gap-1">
                        <span className="text-base">✓</span> Completed
                      </span>
                    )}
                  </div>
                </div>
              </label>
            </li>
          );
        })}
      </ul>

      {/* Quick Actions - UNCHANGED */}
      {totalSteps > 0 && (
        <div className="flex gap-3 justify-end pt-4 border-t border-base-300">
          <button
            onClick={handleResetAll}
            className="btn btn-outline btn-sm"
            disabled={completedSteps === 0}
          >
            Reset All
          </button>

          <button
            onClick={handleMarkAllComplete}
            className="btn btn-primary btn-sm"
            disabled={completedSteps === totalSteps}
          >
            Mark All Complete
          </button>
        </div>
      )}
    </div>
  );
};

export default PreparationChecklist;
