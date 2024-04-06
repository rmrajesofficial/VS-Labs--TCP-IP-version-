

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { Flex, Divider, Link, Text, Button, Grid, Image, Box, Icon, Center, Select, Input } from '@chakra-ui/react';
import { PiHouseLineDuotone, PiNotePencilDuotone, PiPlusSquareDuotone, PiShareNetworkDuotone, PiTrashDuotone } from "react-icons/pi";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import 'reactflow/dist/style.css';
import logo from "./assets/Black___Blue_Minimalist_Modern_Initial_Font_Logo-removebg-preview.png"
import DataCenter from "./assets/icons8-data-center-64.png"
import Switch from './assets/icons8-switch-64.png'
import Hub from './assets/icons8-hub-64.png'
import Laptop from './assets/icons8-laptop-64.png'
import Router from './assets/icons8-router-64.png'
import Server from './assets/icons8-server-64.png'
import Workstation from './assets/icons8-workstation-64.png'
import ReactFlow, {
  Controls,
  ReactFlowProvider,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Component from './components/Component';
function stringToBinary(inputStr) {
  let binaryStr = '';
  for (let i = 0; i < inputStr.length; i++) {
    const char = inputStr[i];
    if (!isNaN(char) && char !== ' ') {
      binaryStr += (parseInt(char) % 10) % 2;
    }
  }
  return binaryStr;
}
function divider(name) {
  return (<Flex width="100%" justifyContent="center" alignItems="center">
    <Box bg="gray.300" style={{ width: "100%" }} m={2} h="1px" >
    </Box>
    <Box w="auto" fontSize="12px" textAlign="center" textColor="gray.400" style={{ width: "51%" }}>
      {name}
    </Box>
    <Box bg="gray.300" style={{ width: "100%" }} m={2} h="1px">
    </Box>
  </Flex>);
}

const initialEdges = [];


function macgenerate() {
  let macAddress = " ";
  const characters = "0123456789ABCDEF";
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 2; j++) {
      macAddress += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (i < 5) {
      macAddress += ":";
    }
  }
  return macAddress;
}
const topology = {
  star: {
    node: [{
      id: "1",
      data: { data_received: null, data_shared: null, type: 'Hub', name: "Hub", image: Hub },
      type: 'component',
      position: { x: 0, y: 0 },
      sourcePosition: 'right',
      error: 2,
      targetPosition: 'left',

      mac: macgenerate()
    },
    {
      id: "2",
      data: { data_received: null, data_shared: null, type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: -200, y: 0 },
      sourcePosition: 'right',
      targetPosition: 'left',

      mac: macgenerate()
    },
    {
      id: '3',
      data: { data_received: null, data_shared: null, type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: 200, y: -200 },
      sourcePosition: 'right',
      targetPosition: 'left',

      mac: macgenerate()
    },
    {
      id: '4',
      data: { data_received: null, data_shared: null, type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: 200, y: 0 },
      sourcePosition: 'right',
      targetPosition: 'left',

      mac: macgenerate()
    },
    {
      id: '5',
      data: { data_received: null, data_shared: null, type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: 200, y: 200 },
      sourcePosition: 'right',
      targetPosition: 'left',

      mac: macgenerate()
    }],
    edge: [{ source: '2', target: '1', id: 'reactflow__edge-2-1', selected: false },
    { source: '1', target: '3', id: 'reactflow__edge-1-3', selected: false },
    { source: '1', target: '4', id: 'reactflow__edge-1-4', selected: false },
    { source: '1', target: '5', id: 'reactflow__edge-1-5', selected: false }]
  },
  mesh: {
    node: [{
      id: "1",
      data: { data_received: null, data_shared: 110101, type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: -100, y: 0 },
      sourcePosition: 'right',
      targetPosition: 'left',

      mac: macgenerate()
    },
    {
      id: "2",
      data: { data_received: null, data_shared: null, type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: 100, y: -200 },
      sourcePosition: 'right',
      targetPosition: 'left',

      mac: macgenerate()
    },
    {
      id: '3',
      data: { data_received: null, data_shared: null, type: 'Workstation', name: "Workstation", image: Workstation },
      type: 'component',
      position: { x: 300, y: 0 },
      sourcePosition: 'right',
      targetPosition: 'left',

      mac: macgenerate()
    },
    {
      id: '4',
      data: { data_received: null, data_shared: null, type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: 100, y: 200 },
      sourcePosition: 'right',
      targetPosition: 'left',

      mac: macgenerate()
    }],
    edge: [{ source: '1', target: '2', id: 'reactflow__edge-1-2', selected: false },
    { source: '1', target: '3', id: 'reactflow__edge-1-3', selected: false },
    { source: '1', target: '4', id: 'reactflow__edge-1-4', selected: false },
    { source: '2', target: '4', id: 'reactflow__edge-2-4', selected: false },
    { source: '2', target: '3', id: 'reactflow__edge-2-3', selected: false },
    { source: '4', target: '3', id: 'reactflow__edge-4-3', selected: false },]
  }
}
function App() {

  const [physical, setPhysical] = useState({
    connection: " Ethernet-(Wired)",
    topology: " Hybrid"
  })
  const [comp, setComp] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [selectedEdge, setSelectedEdge] = useState()
  const [images, setImages] = useState([
    { id: 1, name: "DataCenter", image: DataCenter },
    { id: 2, name: "Switch", image: Switch },
    { id: 3, name: "Hub", image: Hub },
    { id: 4, name: "Laptop", image: Laptop },
    { id: 5, name: "Router", image: Router },
    { id: 6, name: "Server", image: Server },
    { id: 7, name: "Workstation", image: Workstation },
  ])
  const handleClick = () => {
    setComp(!comp);
  };
  const handleComponent = (id, name) => {
    setNodes(prevNodes => {
      const newX = prevNodes.length > 0 ? (prevNodes[prevNodes.length - 1].position.x + 10) : 10;
      const newY = prevNodes.length > 0 ? (prevNodes[prevNodes.length - 1].position.y + 10) : 10;
      const image = images.filter(image => image.name === name);
      return [
        ...prevNodes,
        {
          id: prevNodes.length > 0 ? (parseInt(prevNodes[prevNodes.length - 1].id) + 1).toString() : "1",
          data: { data_received: null, data_shared: null, type: name, name: name, image: image[0].image },
          type: 'component',
          position: { x: newX, y: newY },
          sourcePosition: 'right',
          targetPosition: 'left',
          error: null,
          mac: macgenerate()
        }
      ];
    });
    console.log(nodes);
  };
  const list = [
    { name: 'Item 1', href: '/item1' },
    { name: 'Item 2', href: '/item2' },
  ];

  const activeKey = 2;

  const nodeTypes = useMemo(() => ({
    component: Component,
  }), []);



  const [nodes, setNodes] = useState([]);


  const [edges, setEdges] = useState(initialEdges);

  const runSimulate = () => {
    const updatedEdgesRec = [];
    const updatedNodes = [...nodes];
    const updatedEdges = edges.map(edge => ({ ...edge }));
    updatedEdges.forEach((edge) => {
      const sourceNode = updatedNodes.find((node) => node.id === edge.source);
      const targetNode = updatedNodes.find((node) => node.id === edge.target);
      if (sourceNode && targetNode && sourceNode.data.data_shared !== null && sourceNode.data.data_shared !== '') {
        targetNode.data.data_recieved = sourceNode.data.data_shared;
        if (targetNode.data.type !== "Laptop" &&
          targetNode.data.type !== "Data-Center" &&
          targetNode.data.type !== "Workstation" && targetNode.data.data_shared === null) {
          targetNode.data.data_shared = sourceNode.data.data_shared;
          updatedEdgesRec.push(...dfs(targetNode, updatedNodes))
        }
        edge.data = sourceNode.data.data_shared
        edge.animated = true
      }
    });
    const unfilteredEdges = updatedEdgesRec.concat(updatedEdges)
    const edgeMap = new Map();
    unfilteredEdges.forEach(edge => {
      if (!edgeMap.has(edge.id)) {
        edgeMap.set(edge.id, edge);
      } else {
        const existingEdge = edgeMap.get(edge.id);
        Object.assign(existingEdge, edge);
      }
    });
    const uniqueEdges = Array.from(edgeMap.values());
    setEdges(uniqueEdges);
    console.log(edges);
  };

  function dfs(sourceNode, updatedNodes) {
    const updatedEdgesRec = [];
    const updatedEdges = edges.map(edge => ({ ...edge }));
    updatedEdges.forEach(edge => {
      const targetNode = updatedNodes.find(node => sourceNode.id === edge.source);
      if (sourceNode && targetNode && sourceNode.data.data_shared !== null) {
        targetNode.data.data_received = sourceNode.data.data_shared;
        if (targetNode.data.type !== "Laptop" &&
          targetNode.data.type !== "Data-Center" &&
          targetNode.data.type !== "Workstation" &&
          targetNode.data.data_shared === null) {
          targetNode.data.data_shared = sourceNode.data.data_shared;
          updatedEdgesRec.push(...dfs(targetNode, updatedNodes));
        }
        edge.data = sourceNode.data.data_shared;
        edge.animated = true;
      }
    });

    return updatedEdgesRec.concat(updatedEdges);
  }

  const onNodeClick = (event, node) => {
    setSelectedComponent(node)
    console.log('Node clicked:', node);
  };
  const onEdgeClick = (event, edge) => {
    setSelectedEdge(edge)
    console.log('Edge clicked:', edge);
  };
  const handleTopologyChange = (event) => {
    const selectedTopology = event.target.value;
    setPhysical(prevState => ({
      ...prevState,
      topology: selectedTopology
    }));
  }
  const handleDelete = () => {
    if (selectedComponent == null) return
    const updatedNodes = nodes.filter(node => node.id !== selectedComponent.id);
    const updatedEdges = edges.filter(edge => {
      return edge.source !== selectedComponent.id && edge.target !== selectedComponent.id;
    });
    setNodes(updatedNodes);
    setEdges(updatedEdges);
    setSelectedComponent(null)

  }
  const handleConnectivityChange = (event) => {
    const selectedTopology = event.target.value;
    setPhysical({ ...physical, connection: selectedTopology });
  }
  const handleBinaryInputChange = (id, e) => {
    let data = stringToBinary(e.target.value)
    setSelectedComponent(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        data_shared: data
      }
    }));
    const updatedNodes = nodes.map(node => {
      if (node.id === selectedComponent.id) {
        return {
          ...node,
          data: {
            ...node.data,
            data_shared: data
          }
        };
      }
      return node;
    });
    setNodes(updatedNodes);
  }
  const handleItemSelection = (selectedItem) => {
    switch (selectedItem.itemId) {
      case '/home':
        console.log('Home clicked');
        break;
      case '/new':
        setNodes([])
        setEdges([])
        setSelectedComponent(null)
        setSelectedEdge(null)
        console.log('Create New clicked');
        break;
      case 'mesh':
        setNodes(topology.mesh.node)
        setEdges(topology.mesh.edge)
        setSelectedComponent(null)
        setSelectedEdge(null)
        setPhysical({ connection: " Ethernet-(Wired)", topology: " Mesh" })
        break;
      case 'ring':

        break;
      case 'star':
        setNodes(topology.star.node)
        setEdges(topology.star.edge)
        setSelectedComponent(null)
        setSelectedEdge(null)
        setPhysical({ connection: " Ethernet-(Wired)", topology: " Star" })
        break;
      case 'bus':

        console.log('Bus Topology clicked');
        break;
      default:

        break;
    }

  }
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
    <>
      <Flex flexDirection="column" height="100vh">
        <Flex height="65px" maxH="65px" mx='2' justifyContent="flex-end" alignItems="center" bg="#F4F4F4">
          <Image src={logo} boxSize={150} mr="auto" ml={20} mt={-4} mb={-2} />

          <Flex>
            <Link mr="20px" _hover={{ color: "#EC4899", textDecoration: "underline" }}>
              <Text fontSize="lg" fontWeight="bold" color="gray.600">GitHub</Text>
            </Link>
            <Link mr="20px" _hover={{ color: "#EC4899", textDecoration: "underline" }}>
              <Text fontSize="lg" fontWeight="bold" color="gray.600">Credits</Text>
            </Link>
          </Flex>
        </Flex>
        <Divider borderColor="#EC4899" mx="2" width='auto' />
        <Flex overflow="hidden">
          <Flex width="300px" minH="300px" my='2' bg="white" ml='2'>
            <Flex flexDirection="column" width="300px" >
              <Navigation
                width="300px"
                activeItemId="/management/members"
                onSelect={handleItemSelection}
                items={[
                  {
                    title: 'Home',
                    itemId: '/home',
                    elemBefore: () => <PiHouseLineDuotone />,
                  },
                  {
                    title: 'Create New',
                    itemId: '/new',
                    elemBefore: () => <PiPlusSquareDuotone />,
                  },
                  {
                    title: 'Topologies',
                    itemId: '/management',
                    elemBefore: () => <PiShareNetworkDuotone />,
                    subNav: [
                      {
                        title: 'Mesh Topology',
                        itemId: 'mesh',
                      },
                      {
                        title: 'Ring Topology',
                        itemId: 'ring',
                      },
                      {
                        title: 'Star Topology',
                        itemId: 'star',
                      },
                      {
                        title: 'Bus Topology',
                        itemId: 'bus',
                      },
                    ],
                  },
                ]}
              />
              <Button onClick={handleClick} variant="outline" py='2' borderWidth="1px" borderRadius="0px" borderTopColor="#EC4899">
                {comp ? "Components" : "ControlBox"}
                <Flex alignItems="center" ml="20px" my='8px'>
                  {comp ? <SlArrowDown /> : <SlArrowUp />}
                </Flex>
              </Button>
              {comp && <Flex flexDirection="column" height="400px" border="2px solid gray.100">
                <Divider borderColor="#EC4899" my="2" height='auto' />
                <Grid
                  templateColumns="repeat(3, 2fr)"
                  gap={4}
                  overflowY="auto"
                  maxHeight="100%"
                  p={4}
                >
                  {images.map((image) => (
                    <Flex flexDirection="column" justifyContent='center' height='100px' >
                      <Image key={image.id} src={image.image} alt={image.name} boxSize="100px" _hover={{ bg: "#F0F0F0" }} onClick={() => handleComponent(image.id, image.name)} cursor="pointer" />
                      <Text> {image.name}</Text>
                    </Flex>
                  ))}
                </Grid>
              </Flex>
              }
              <Divider borderColor="#EC4899" my="2" height='auto' />
              {!comp &&
                <Flex flexDirection="column" style={{ height: "100%" }}  >
                  {selectedComponent ? (<Box height="400px" rounded="10" border="2px solid #EC4899" mr='2'>
                    <Flex justifyContent='center' py='2' rounded="10">
                      <Text fontSize='20' fontWeight='bold' >{selectedComponent.data.name}
                        <Button bg='transparent' fontSize='25' p='0'> <PiNotePencilDuotone /> </Button></Text>
                    </Flex>
                    <>{divider("Physical")}</>
                    <Flex ml={8} rounded="10" fontSize='sm' >
                      <Text fontWeight="bold" mr={1}>Connectivity: </Text>{physical.connection} {/* like ethernet */}
                    </Flex>
                    <Flex ml={8} rounded="10" fontSize='sm'>
                      <Text fontWeight="bold" mr={1}>Topology: </Text>{physical.topology}
                    </Flex>
                    <>{divider("Data-Link")}</>
                    <Flex ml={8} rounded="10" fontSize='sm'>
                      <Text fontWeight="bold" mr={1}>MAC Address: </Text>{selectedComponent.mac}
                    </Flex>
                    <Flex ml={8} rounded="10" fontSize='sm'>
                      <Text fontWeight="bold" mr={1}>Error Detection: </Text>{(selectedComponent.error) ? "True" : "False"}
                    </Flex>
                    {selectedComponent.error && (
                      <Flex ml={8} rounded="10" fontSize='sm'>
                        <Text fontWeight="bold" mr={1}>Error Correction: </Text>Error at {selectedComponent.error} bit
                      </Flex>)}
                    <Flex ml={8} rounded="10" fontSize='sm'>
                      <Text fontWeight="bold" mr={1}>Data: </Text>
                      {(selectedComponent.data.type === "Laptop" ||
                        selectedComponent.data.type === "Data-Center" ||
                        selectedComponent.data.type === "Workstation") ? (<Input
                          key={selectedComponent.id}
                          type="text"
                          h={5}
                          border='none'
                          style={{ fontWeight: "bold", marginRight: "4px" }}
                          value={selectedComponent.data.data_shared}
                          placeholder='Enter Binary data'
                          p="auto"
                          fontSize="smaller"
                          onChange={(e) => handleBinaryInputChange(selectedComponent.id, e)}
                        />) : (selectedComponent.data.data_shared ? selectedComponent.data.data_shared : "No data Found")}</Flex>
                    {selectedComponent.data.data_recieved && (<Flex ml={8} rounded="10" fontSize='sm'>
                      <Text fontWeight="bold" mr={1}>Data Received: </Text>{selectedComponent.data.data_recieved}</Flex>)}
                    <Divider mx='6' w='auto' borderColor='gray.300' />
                  </Box>) : (<Box height="400px" rounded="10" border="2px solid #EC4899" mr='2' p="auto" textAlign="center">Component is deleted or not selected</Box>)}

                </Flex>}
            </Flex>
          </Flex>
          <Divider borderColor="#EC4899" orientation="vertical" my="2" height='auto' />
          <Flex overflow="hidden" flexDirection="column">
            <Divider borderColor='black' mt='1' mx="2" w='auto' />
            <Flex height="50px" mx="2" justifyContent='end'>
              <Flex justifyContent="center" alignItems="center" m={0} mr="auto" ml={2} h="30px" my="auto" fontSize={24} rounded={5}>
                <Text fontSize={15} fontWeight="bold">Transmission Mode:</Text> <Text ml={1} fontSize={15}>Half-Duplex</Text>
              </Flex>
              <Divider borderColor='gray.300' my='1' mx="2" h='auto' orientation='vertical' />
              <Flex onClick={handleDelete} cursor="pointer" justifyContent="center" alignItems="center" w="30px" h="30px" _hover={{ bg: 'gray.200' }} m={1} fontSize={24} rounded={5}>
                <PiTrashDuotone />
              </Flex>
              <Divider borderColor='gray.300' my='1' mx="2" h='auto' orientation='vertical' />
              <Flex direction="column" alignItems="center" rounded='30' my='auto' >
                <Select onChange={handleTopologyChange} fontSize={15} h={8} value={physical.topology}>
                  <option value="Mesh">Mesh</option>
                  <option value="Ring">Ring</option>
                  <option value="Star">Star</option>
                  <option value="Bus">Bus</option>
                  <option value="Hybrid">Hybrid</option>
                </Select>
              </Flex>
              <Divider borderColor='gray.300' my='1' mx="2" h='auto' orientation='vertical' />
              <Flex direction="column" alignItems="center" rounded='30' my='auto' >
                <Select onChange={handleConnectivityChange} fontSize={15} h={8} value={physical.connection}>
                  <option value="Ethernet-(wired)">Ethernet-(Wired)</option>
                  <option value="WiFi-(wireless)">WiFi-(Wireless)</option>
                  <option value="Bluetooth-(wireless)">Bluetooth-(Wireless)</option>
                  {/* Add more connectivity options as needed */}
                </Select>

              </Flex>
              <Divider borderColor='gray.300' my='1' mx="2" h='auto' orientation='vertical' />
              <Button bg='#EC4899' color='white' rounded='30' mx='6' my='1' height='auto' onClick={runSimulate}>Simulate</Button>
            </Flex>
            <Divider borderColor="#EC4899" mx="2" width='auto' />
            <Flex overflow="hidden" rounded='2' bg="#F4F4F4" mx='2' mb='2'>
              <div style={{ height: '100vh', width: '100vw', paddingBottom: "100px" }}>
                <ReactFlow
                  nodes={nodes}
                  nodeTypes={nodeTypes}
                  onNodeClick={onNodeClick}
                  onEdgeClick={onEdgeClick}
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
            </Flex>
          </Flex>
        </Flex >
        <Flex height="30px" maxH="30px" bg="black" py="auto" justifyContent={'space-between'}>
          <Text textColor="white" fontSize={13} mx={10}>Developed and Maintained by: Rajes Manna</Text>
          <Text textColor="#f5f5f5" fontSize={13} mx={20}>copyright © 2022 VirtualSimilationLab</Text>
          {/* {selectedEdge && selectedEdge.get("data")(<Text textColor="white" fontSize={13} mx={20}>Data Passes: {selectedEdge.get("data")}</Text>)} */}
        </Flex>
      </Flex >
    </>
  );
}



export default App;
