function tsp_ls(distance_matrix) 
{
  
  if (distance_matrix.length <= 1) 
  {
    return 0;
  }

  
  function calculateTourLength(route, distanceMatrix) 
  {
    let totalLength = 0;
    for (let i = 0; i < route.length - 1; i++) 
    {
      totalLength += distanceMatrix[route[i]][route[i + 1]];
    }
    return totalLength;
  }


  function twoOptSwap(route, i, k)
{
    let newRoute = route.slice(0, i);
    newRoute = newRoute.concat(route.slice(i, k + 1).reverse());
    newRoute = newRoute.concat(route.slice(k + 1));
    return newRoute;
  }

  
  let numCities = distance_matrix.length;
  let route = [];
  for (let i = 0; i < numCities; i++) 
  {
    route.push(i);
  }
  
  route = route.sort(() => Math.random() - 0.5);

  
  let improvement = true;
  let maxIterations = 1000; 
  let iteration = 0;

  
  while (improvement && iteration < maxIterations) 
  {
    improvement = false;

    
    for (let i = 1; i < numCities - 1; i++) 
    { 
      for (let k = i + 1; k < numCities; k++) 
      {
       
        let newRoute = twoOptSwap(route, i, k);
        let newLength = calculateTourLength(newRoute, distance_matrix);

        
        if (newLength < calculateTourLength(route, distance_matrix)) 
        {
          route = newRoute;
          improvement = true;
        }
      }
    }

    iteration++;
  }

  
  return calculateTourLength(route, distance_matrix);
}
