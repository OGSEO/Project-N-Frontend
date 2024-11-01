export const generateDate = (idea) => {
    const output = idea.createdAt.split('T')
    return output[0]
}

