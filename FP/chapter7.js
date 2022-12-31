function payrollCalcSafe(employees) {
  const copy = deepCopy(employees);
  const pay_employees = payrollCalc(copy);
  return deepCopy(pay_employees);
}

userChanges.subscribe((user) => {
  const copy_user = deepCopy(user);
  processUser(copy_user);
});
