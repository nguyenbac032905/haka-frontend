export const buildCategoryTree = (categories, parentId = null) => {
    return categories
        .filter(item => String(item.parent_id) === String(parentId))
        .map(item => ({
            ...item,
            children: buildCategoryTree(categories, item.id)
        }));
};
export const buildCategorySelectOptions = (categories, prefix = "") => {
    let result = [];

    categories.forEach(item => {
        const label = prefix + item.title;

        result.push({
            label,
            value: item.id
        });

        if (item.children && item.children.length > 0) {
            result = result.concat(
                buildCategorySelectOptions(item.children, prefix+"--")
            );
        }
    });

    return result;
};
export const getSubCategoryId = (category) => {
    let result = [];

    // thêm id của chính nó
    result.push(category.id);

    // duyệt từng thằng con
    if (category.children && category.children.length > 0) {
        category.children.forEach(child => {
            result = result.concat(getSubCategoryId(child));
        });
    }

    return result;
};
export const findCategoryInTree = (category, idCategory) => {
    for (const item of category) {
        if (item.id === idCategory) return item;

        if (item.children && item.children.length > 0) {
            const found = findCategoryInTree(item.children, idCategory);
            if (found) return found;
        }
    }
    return null;
};
export const findTopCategory = (data, childId) => {
    const find = (nodes, parents = []) => {
        for (const node of nodes) {
            if (node.id === childId) return parents[0] || null;

            if (node.children && node.children.length > 0) {
                const res = find(node.children, [...parents, node]);
                if (res !== undefined) return res;
            }
        }
        return undefined;
    };

    return find(data);
};
export const getAllParents = (data, childId) => {
    const find = (nodes, targetId, parents = []) => {
        for (const node of nodes) {
            if (node.id === targetId) return parents;

            if (node.children && node.children.length > 0) {
                const res = find(node.children, targetId, [...parents, node]);
                if (res) return res;
            }
        }
        return null;
    };

    return find(data, childId) || [];
};