import React, { useState } from 'react';
import { createPayroll } from '../services/api';

const Payroll = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [salary, setSalary] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [netSalary, setNetSalary] = useState(0);

  const handleSubmit = () => {
    const payrollData = {
      employeeId,
      month: 'October',
      year: 2024,
      salary,
      taxes,
      netSalary: salary - taxes
    };
    createPayroll(payrollData);
  };

  return (
    <div>
      <h1>Create Payroll</h1>
      <input
        type="text"
        placeholder="Employee ID"
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Salary"
        onChange={(e) => setSalary(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Taxes"
        onChange={(e) => setTaxes(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>Create Payroll</button>
    </div>
  );
};

export default Payroll;
