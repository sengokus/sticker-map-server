const generateSelectFields = (fields: string[]) => {
    const selectFields: any = {};
    for (const field of fields) {
        selectFields[field] = true;
    }
    return selectFields;
};

export function createDynamicType<T extends Record<string, unknown>>(dict: T): T {
    return dict;
}
