const { Heap } = require('./../heap');

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

/**
 * Computes minimum spanning tree using prim's algorithm utilizing heap. Returns array of [mst, vertices]
 * @param {array} graph A graph represented as an adjaceny matrix 
 */
function prim(graph) {
    let sourceVerticeIndex = 0;

    // Create vertices array holding vertice ojects
    const vertices = [];
    for (let i = 0; i < graph.length; i++) {
        vertices.push({
            name: String.fromCharCode('A'.charCodeAt(0) + i),   // vertice name
            index: i,                                              // index
            value: i === sourceVerticeIndex ? 0 : Number.MAX_SAFE_INTEGER, 
            prevIndex: null,
            visited: false                                             // previous vertice on closest path
        });
    }

    // wil hold vertices, we've not visited before
    const verticeHeap = new Heap(vertices, (a, b) => a.value - b.value);

    // will contain vertices/edges in order we pick them for the minimum spanning tree
    const mst = [];

    while (verticeHeap.size()) {
        // get the vertice with the shortest connected edge
        const current = verticeHeap.extract();
        
        for (let i = 0; i < vertices.length; i++) {
            if (current.index !== i && graph[current.index][i] !== -1 && vertices[i].visited === false) {
                // update vertice's value if edge is closer to the mst
                if (graph[current.index][i] < vertices[i].value) {
                    vertices[i].value =  graph[current.index][i];
                    vertices[i].prevIndex = current.index;
    
                    let newVertice = { ...vertices[i] };
    
                    verticeHeap.updateKey(vertices[i], newVertice);
                    vertices[i] = newVertice;
                }
            }
        }
    
        // move current to mst
        current.visited = true;
        mst.push(current);
    }

    return [mst, vertices];
}


/**
 * Returns minimum spanning tree as a human-readable string
 * @param {array} mst Array of mst returned by prim function
 * @param {array} vertices Array of vertices returned by prim function 
 */
function getMSTString(mst, vertices) {
    const str = [];

    for (let i = 0; i < mst.length; i++) {
        if (mst[i].prevIndex === null) {
            str.push(mst[i].name);
        } else {
            str.push(`${mst[i].name}<->${vertices[mst[i].prevIndex].name}(${mst[i].value})`);
        }
    }

    return str.join(', ');
}

const [mst, vertices] = prim(graph);
console.log(getMSTString(mst, vertices));



