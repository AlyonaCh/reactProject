export async function loadProducts(category, offset, search) {
    let params = []
    if (category != null) params.push(`categoryId=${category}`)
    if (search) params.push(`q=${search}`)
    if (offset) params.push(`offset=${offset}`)
    let urlParams = params.length === 0 ? '' : '?' + params.join('&')
    const url = `http://localhost:7070/api/items${urlParams}`
    const res = await fetch(url)
    return res
}  