export const generateDate = (idea) => {
    const output = idea.createdAt.split('T')
    return output[0];
    // return output[0].toLocaleDateString();
}

