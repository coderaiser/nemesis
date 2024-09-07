export const report = () => `Use 'Member Expression' instead of 'Assignment Expression'`;

export const replace = () => ({
    '__a.__b = __c': '__a.__b[__c]',
});
