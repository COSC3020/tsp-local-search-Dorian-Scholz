function tsp_ls(distance_matrix) 
{
    const n = distance_matrix.length;
    
    let route = Array.from({ length: n }, (_, i) => i);  
    route = shuffle(route);  

    let bestRoute = [...route];
    let bestLength = calculateTotalDistance(bestRoute, distance_matrix);

    let noImprovementCount = 0;
    const maxIterations = 1000;
    const maxNoImprovementIterations = 100;

    
    for (let iter = 0; iter < maxIterations; iter++) 
    {
        let improved = false;

        
        let i = Math.floor(Math.random() * (n - 1));
        let k = Math.floor(Math.random() * (n - i - 1)) + i + 1;

        
        let newRoute = 2optSwap([...route], i, k);
        let newLength = calculateTotalDistance(newRoute, distance_matrix);

        if (newLength < bestLength)
        {
            bestRoute = [...newRoute];
            bestLength = newLength;
            noImprovementCount = 0;
            improved = true;
        } else 
        {
            noImprovementCount++;
        }

        
        if (noImprovementCount > maxNoImprovementIterations)
        {
            break;
        }
    }

    return bestLength;
}


function 2optSwap(route, i, k) 
{
    const newRoute = [...route];
    while (i < k) 
    {
        [newRoute[i], newRoute[k]] = [newRoute[k], newRoute[i]];  
        i++;
        k--;
    }
    return newRoute;
}


function calculateTotalDistance(route, distance_matrix)
{
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) 
    {
        totalDistance += distance_matrix[route[i]][route[i + 1]];
    }
    return totalDistance;
}


function shuffle(array)
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
