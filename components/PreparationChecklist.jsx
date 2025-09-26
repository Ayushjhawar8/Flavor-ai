// Flavor-ai/components/PreparationChecklist.jsx
import React, { useEffect, useState } from "react";

const PreparationChecklist = ({ steps, checklistKey }) => {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    // Load state from localStorage
    const saved = localStorage.getItem(checklistKey);
    if (saved) setChecked(JSON.parse(saved));
    else setChecked(Array(steps.length).fill(false));
  }, [steps, checklistKey]);

  const handleCheck = (idx) => {
    const updated = [...checked];
    updated[idx] = !updated[idx];
    setChecked(updated);
    // Save updated state to localStorage
    localStorage.setItem(checklistKey, JSON.stringify(updated));
  };

  return (
    <ul className="space-y-3">
      {steps.map((step, idx) => (
        <li key={idx} className="bg-base-100 rounded-lg shadow-sm hover:bg-base-200 transition duration-200">
          <label 
            className={`flex items-start gap-3 p-3 cursor-pointer select-none ${
              checked[idx] ? 'opacity-70 line-through text-success-content' : 'text-base-content'
            }`}
            // Allow clicking the entire label (text + checkbox) to trigger the change
            onClick={() => handleCheck(idx)}
          >
            {/* 1. Styled Checkbox (DaisyUI/Tailwind) */}
            <input
              type="checkbox"
              checked={checked[idx] || false}
              // Prevent a double-click event from the input itself
              readOnly
              className="checkbox checkbox-primary checkbox-md mt-0.5 flex-shrink-0"
              style={{ minWidth: '1.25rem', minHeight: '1.25rem' }}
            />
            
            {/* 2. Instruction Text (Clicking this text toggles the checkbox via the <label> wrapper) */}
            <span className="text-sm leading-relaxed flex-1">
              {step}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default PreparationChecklist;