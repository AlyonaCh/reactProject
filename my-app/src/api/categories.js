export async function loadCategories() {
    const res = await fetch('http://localhost:7070/api/categories')
    return res
}  