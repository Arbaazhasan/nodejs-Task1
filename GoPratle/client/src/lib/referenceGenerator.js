export const generateReferenceId = (category = 'planner') => {
  const prefixMap = {
    planner: 'PLN',
    performer: 'PRF',
    crew: 'CRW',
  };

  const prefix = prefixMap[category.toLowerCase()] || 'REQ';
  const randomSuffix = Math.floor(10000 + Math.random() * 90000); // 5-digit unique number
  const year = new Date().getFullYear();

  return `GP-${prefix}-${year}-${randomSuffix}`;
};
