const { Heap } = require('./../heap');

/**
 * Computes shotest paths to all nodes from source vertice index
 * @param {integer} sourceVerticeIndex 
 * @param {graph} graph Graph represented in adjacency matrix form 
 */
function dijsktra(sourceVerticeIndex, graph) {
    // Create vertices array holding vertice ojects
    const vertices = [];
    for (let i = 0; i < graph.length; i++) {
        vertices.push({
            name: String.fromCharCode('A'.charCodeAt(0) + i),   // vertice name
            index: i,                                              // index
            distance: i === sourceVerticeIndex ? 0 : Number.MAX_SAFE_INTEGER,       // set distance to max for distances
            prevIndex: null,
            visited: false                                             // previous vertice on closest path
        });
    }

    // Heap to perform Dijkstra faster
    const verticeHeap = new Heap(vertices, (a, b) => a.distance - b.distance);

    while (verticeHeap.size()) {
        const current = verticeHeap.extract();

        for (let i = 0; i < vertices.length; i++) {
            // if there is an edge between current vertice and vertice in question
            if (current.index !== i && graph[current.index][i]  !== -1 && vertices[i].visited === false) {
                let distance = graph[current.index][i] + current.distance;

                // need to update vertice since this path is shorter
                if (vertices[i].distance > distance) { 
                    vertices[i].distance = distance;
                    vertices[i].prevIndex = current.index;

                    // Copy the updated vertice into a new vertice, otherwise updateKey would throw a duplicate key error
                    let newVertice = {...vertices[i] };
                    verticeHeap.updateKey(vertices[i], newVertice);
                    vertices[i] = newVertice;
                }
            }
        }

        // mark this vertice as visited
        current.visited = true;
    }

    return vertices;
}

/**
 * Returns an array containing all the vertices need to be taken to reach current vertice in the shortest way possible
 * @param {string} sourceVerticeName Name of the shortest vertice
 * @param {object} currentVertice Curent vertice 
 * @param {array} vertices Array of vertices returned by dijkstra function
 * @param {array} path Current path so far, default value is empty array([])
 */
function getPathToVertice(sourceVerticeName, currentVertice, vertices, path = []) {
    if (currentVertice.prevIndex !== null) {
        path.push(vertices[currentVertice.prevIndex].name);

        if (path[path.length - 1] === sourceVerticeName) {
            return path.reverse();
        } else {
            return getPathToVertice(sourceVerticeName, vertices[currentVertice.prevIndex], vertices, path);
        }
    } else {
        return []; // empty path
    }
}

/**
 * Prints path and shortest distnace info for each vertice in vertices (array returned from dijkstra function)
 * @param {integer} sourceVerticeIndex Index of the start point in the path
 * @param {array} vertices Array of vertices returned by dijkstra function
 */
function printDistacesAndPaths(sourceVerticeIndex, vertices) {
    const sourceVerticeName = vertices[sourceVerticeIndex].name;
    for (let vertice of vertices) {
        const pathToVertice = getPathToVertice(sourceVerticeName, vertice, vertices);
        pathToVertice.push(vertice.name);
        console.log(`The shortest distance to ${sourceVerticeName} from ${vertice.name} is ${vertice.distance} using path: ${pathToVertice.join(" -> ")}`);
    }
}


// An adjaceny matrix representation of a graph, where each entry represents an undirected edge
// -1 is used when an edge is absent
const graph = [
    // A, B, C, D, E, F, G
    [0, 4, 3, -1, 7, -1, -1 ],
    [4, 0, 6, 5, -1, -1, -1 ],
    [3, 6, 0, 11, 8, -1, -1 ],
    [-1, 5, 11, 0, 2, 2, 10],
    [7, -1, 8, 2, 0, -1,  5],
    [-1, -1, -1, 2, -1, 0, 3],
    [-1, -1, -1, 10, 5, 3, 0]
];

printDistacesAndPaths(0, dijsktra(0, graph));