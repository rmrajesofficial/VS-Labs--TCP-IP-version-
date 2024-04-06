import { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Component from './components/Component';
import DataCenter from "./assets/icons8-data-center-64.png"
import Switch from './assets/icons8-switch-64.png'
import Hub from './assets/icons8-hub-64.png'
import Laptop from './assets/icons8-laptop-64.png'
import Router from './assets/icons8-router-64.png'
const initialNodes = [
    {
        id: '1',
        image: { Switch },
        type: 'component',
        position: { x: 0, y: 0 },
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Switch 1', name: "Switch", image: Switch }
    },
    {
        id: '3',
        type: 'component',
        position: { x: 10, y: 10 },
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'data center 1', name: "DataCenter", image: DataCenter, }
    }, {
        id: '4',

        type: 'component',
        position: { x: 20, y: 20 },
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Hub 1', name: "Hub", image: Hub, }
    }, {
        id: '5',

        type: 'component',
        position: { x: 50, y: 50 },
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Laptop 1', name: "Laptop", image: Laptop, }
    },
];

const initialEdges = [];

function Flow() {
    const nodeTypes = useMemo(() => ({
        component: Component,
    }), []);

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    return (
        <div style={{ height: '100vh', width: '100vw', paddingBottom: "100px" }}>
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Flow;
// { height: '90vh', width: '90vw', padding: '20px' }