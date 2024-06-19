

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useDisclosure, ButtonGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Flex, Divider, Link, Text, Button, Grid, Image, Box, Icon, Center, Select, Input } from '@chakra-ui/react';
import { PiHouseLineDuotone, PiNotePencilDuotone, PiPlusSquareDuotone, PiShareNetworkDuotone, PiTrashDuotone } from "react-icons/pi";
import { SlArrowUp, SlArrowDown, SlArrowLeft, SlArrowRight } from "react-icons/sl";
import 'reactflow/dist/style.css';
import logo from "./assets/logo.png"
import DataCenter from "./assets/icons8-data-center-64.png"
import Switch from './assets/icons8-switch-64.png'
import Hub from './assets/icons8-hub-64.png'
import Laptop from './assets/icons8-laptop-64.png'
import Router from './assets/icons8-router-64.png'
// import Server from './assets/icons8-server-64.png'
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
      data: { ip: null, data_received: null, data_shared: null, routingTable: new Set(), switchingTable: new Set(), type: 'Switch', name: "Switch", image: Switch },
      type: 'component',
      position: { x: 0, y: 0 },
      sourcePosition: 'right',
      targetPosition: 'left',
      mac: macgenerate()
    },
    {
      id: "2",
      data: { ip: null, data_received: null, data_shared: null, routingTable: new Set(), switchingTable: new Set(), type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: -200, y: 0 },
      sourcePosition: 'right',
      targetPosition: 'left',
      mac: macgenerate()
    },
    {
      id: '3',
      data: { ip: null, data_received: null, data_shared: null, routingTable: new Set(), switchingTable: new Set(), type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: 200, y: -200 },
      sourcePosition: 'right',
      targetPosition: 'left',
      mac: macgenerate()
    },
    {
      id: '4',
      data: { ip: null, data_received: null, data_shared: null, routingTable: new Set(), switchingTable: new Set(), type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: 200, y: 0 },
      sourcePosition: 'right',
      targetPosition: 'left',
      mac: macgenerate()
    },
    {
      id: '5',
      data: { ip: null, data_received: null, data_shared: null, routingTable: new Set(), switchingTable: new Set(), type: 'Laptop', name: "Laptop", image: Laptop },
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
      data: { ip: null, data_received: null, data_shared: null, routingTable: new Set(), switchingTable: new Set(), type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: -100, y: 0 },
      sourcePosition: 'right',
      targetPosition: 'left',
      mac: macgenerate()
    },
    {
      id: "2",
      data: { ip: null, data_received: null, data_shared: null, routingTable: new Set(), switchingTable: new Set(), type: 'Laptop', name: "Laptop", image: Laptop },
      type: 'component',
      position: { x: 100, y: -200 },
      sourcePosition: 'right',
      targetPosition: 'left',
      mac: macgenerate()
    },
    {
      id: '3',
      data: { ip: null, data_received: null, data_shared: null, routingTable: new Set(), switchingTable: new Set(), type: 'Workstation', name: "Workstation", image: Workstation },
      type: 'component',
      position: { x: 300, y: 0 },
      sourcePosition: 'right',
      targetPosition: 'left',
      mac: macgenerate()
    },
    {
      id: '4',
      data: { ip: null, data_received: null, data_shared: null, routingTable: new Set(), switchingTable: new Set(), type: 'Laptop', name: "Laptop", image: Laptop },
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({
    rename: null,
    ip: null,
    gateway: null,
    binaryData: null,
    path: {},
    EDetection: "CRC",
    Ecorrection: false,
    framming: 'Bit Stuffing',
    flag: "0111",
    generator: '101',
    selectedComponent: null,
    preview: null,
    codeword: null,
    frameword: null,
    collisionDomain: 0,
    broadcastDomain: 0,
  })
  const handleRename = (event, flag) => {
    if (flag) {
      if (data.rename !== null && data.rename !== '' && data.rename !== undefined) {
        const updateNode = nodes.find((node) => node.id === selectedComponent.id);
        if (updateNode) {
          updateNode.data.name = data.rename;
          console.log(updateNode);
          setNodes(nodes.map((node) => node.id === updateNode.id ? updateNode : node));
          setSelectedComponent(updateNode);
          return;
        }
      }
    }
    setData({ ...data, rename: event.target.value });
  };
  const handleIpChange = (event) => {
    const newIp = event.target.value;
    setData({ ...data, ip: newIp });
  };
  const handleIp = () => {
    const newIp = data.ip;
    const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (!ipPattern.test(newIp)) {
      alert("Invalid IP address format");
      return;
    }
    const updateNode = nodes.find((node) => node.id === selectedComponent.id);
    if (updateNode) {
      updateNode.data.ip = newIp;
      setNodes(nodes.map((node) => node.id === updateNode.id ? updateNode : node));
      setSelectedComponent(updateNode);
      setData({ ...data, ip: null });
      console.log('ip Cahnged');
      return;
    }
  };
  const handleGatewayChange = (event) => {
    const newGateway = event.target.value;
    setData({ ...data, gateway: newGateway });
  };
  const handleGateway = () => {
    const newIp = data.gateway;
    const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (!ipPattern.test(newIp)) {
      alert("Invalid IP address format.");
      return;
    }
    const updateNode = nodes.find((node) => node.id === selectedComponent.id);
    if (updateNode) {
      updateNode.data.gateway = newIp;
      setNodes(nodes.map((node) => node.id === updateNode.id ? updateNode : node));
      setSelectedComponent(updateNode);
      setData({ ...data, gateway: null });
      console.log('gateway Cahnged');
      return;
    }
  }

  const handleDataChange = (e) => {
    console.log(data);
    const dataNew = stringToBinary(e.target.value)
    setData({ ...data, binaryData: dataNew });
  };
  const handleClose = () => {
    setData({
      rename: null,
      binaryData: null,
      path: {},
      EDetection: data.EDetection,
      Ecorrection: data.Ecorrection,
      generator: data.generator,
      framming: 'Bit Stuffing',
      codeword: null,
      frameword: null,
      flag: "0111",
      selectedComponent: null,
      preview: null,
      collisionDomain: 0,
      broadcastDomain: 0,
    });
    onClose()
  };
  const handleDetectionChange = (event) => {
    console.log(data);
    setData({ ...data, EDetection: event.target.value });
  };

  const handleFetchPath = () => {
    const currentNode = nodes.find((node) => node.id === selectedComponent.id);
    const connectedEdges = edges.filter((edge) => edge.source === currentNode.id);
    console.log(currentNode);
    console.log(connectedEdges);
    if (connectedEdges.length === 0)
      alert("No component found Try to reconnect")
    const fetchFurther = (value, node, intermediateNodes = []) => {
      const connectedEdges = edges.filter((edge) => edge.source === node.id);
      connectedEdges.forEach((edge) => {
        const targetNode = nodes.find((n) => n.id === edge.target);
        const newValue = [...value, targetNode.id];
        let newIntermediateNodes = [...intermediateNodes];
        if (!newValue.includes(targetNode.id)) { // Check if targetNode.id is not already included
          newIntermediateNodes = [...intermediateNodes, node.id]; // Store intermediate node
        }
        if (targetNode.data.type === "Switch" || targetNode.data.type === "Hub") {
          fetchFurther(newValue, targetNode, newIntermediateNodes);
        } else {
          data.path[targetNode.id] = newValue;
        }
      });
    };
    connectedEdges.forEach((edge) => {
      const targetNode = nodes.find((n) => n.id === edge.target);
      fetchFurther([selectedComponent.id, targetNode.id], targetNode);
    });
    const updatedPath = { ...data.path };
    connectedEdges.forEach((edge) => {
      const targetNode = nodes.find((n) => n.id === edge.target);
      updatedPath[targetNode.id] = [selectedComponent.id, targetNode.id];
    });
    setData({ ...data, path: updatedPath });
    console.log(data.path);
  };
  const handleComponentSelect = (component) => {
    setData({ ...data, selectedComponent: component });
    console.log(data);
  };


  const EDetection = (data) => {
    if (data.EDetection === "CRC") {
      const polynomialDivision = (dividend, divisor) => {
        const dividendArray = dividend.split("").map(Number);
        const divisorArray = divisor.split("").map(Number);
        let remainder = [...dividendArray];
        for (let i = 0; i <= remainder.length - divisorArray.length; i++) {
          if (remainder[i] === 1) {
            for (let j = 0; j < divisorArray.length; j++) {
              remainder[i + j] ^= divisorArray[j];
            }
          }
        }
        let startIndex = 0;
        while (startIndex < remainder.length && remainder[startIndex] === 0)
          startIndex++;
        return remainder.slice(startIndex).join("");
      };
      const paddedBinaryData = data.binaryData + "0".repeat(data.generator.length - 1);
      const remainder = polynomialDivision(paddedBinaryData, data.generator);
      const dataNew = data.binaryData + remainder
      return dataNew;
    }
    else if (data.EDetection === "Hamming") {
      let string = '';
      let chunks = data.binaryData.match(/.{1,4}/g);
      const xorBits = (bit1, bit2, bit3) => {
        return parseInt(bit1) ^ parseInt(bit2) ^ parseInt(bit3);
      };
      const hamming = (chunk) => {
        let bits = new Array
        let chunkBits = chunk.split("");
        bits.push(...chunkBits);
        const p1 = xorBits(bits[0], bits[2], bits[3]);
        const p2 = xorBits(bits[0], bits[1], bits[3]);
        const p3 = xorBits(bits[0], bits[1], bits[2]);
        return `${bits[0]}${bits[1]}${bits[2]}${p3}${bits[3]}${p2}${p1}`
      }
      chunks.forEach((chunk) => {
        if (chunk.length < 4)
          string += chunk
        else string += hamming(chunk);
      })
      return string;
    }
    else if (data.EDetection === "Parity") {
      const onesCount = (data.binaryData.match(/1/g) || []).length;
      const evenParity = onesCount % 2 === 0;
      if (evenParity)
        return data.binaryData + 0;
      else return data.binaryData + 1;
    }
    console.log('EDetection is null');
  }
  const handlePreview = () => {
    if (data.binaryData === null) {
      alert("Data cannot be empty")
    }
    else if (data.selectedComponent === null) {
      alert("Select the Destination address")
    }
    else {
      let codeword = EDetection(data)
      console.log(codeword);
      function bitStuffing(word, flag) {
        if (word === undefined) { console.log('EDetection not working'); return; }
        var stuffedWord = "";
        for (var i = 0; i < word.length; i++) {
          stuffedWord += word[i];
          if (stuffedWord.endsWith(flag) && i < word.length - 1) {
            stuffedWord = stuffedWord.slice(0, -flag.length);
            stuffedWord += "01101";
          }
        }
        return stuffedWord;
      }
      var stuffedWord = bitStuffing(codeword, data.flag);
      console.log(stuffedWord);
      var PreviewWord = data.flag + stuffedWord + data.flag
      setData({ ...data, codeword: codeword, frameword: stuffedWord, preview: PreviewWord });
    }
    console.log(data);
  };
  const [physical, setPhysical] = useState({
    connection: " Ethernet-(Wired)",
    topology: " Hybrid",

  })
  const [comp, setComp] = useState(true)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [selectedEdge, setSelectedEdge] = useState()
  const [images, setImages] = useState([
    { id: 1, name: "DataCenter", image: DataCenter },
    { id: 2, name: "Switch", image: Switch },
    { id: 3, name: "Hub", image: Hub },
    { id: 4, name: "Laptop", image: Laptop },
    { id: 5, name: "Router", image: Router },
    // { id: 6, name: "Server", image: Server },
    { id: 7, name: "Workstation", image: Workstation },
  ])
  const list = [
    { name: 'Item 1', href: '/item1' },
    { name: 'Item 2', href: '/item2' },
  ];
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [updatedNodes, setUpdatedNodes] = useState(null);
  const [updatedEdges, setUpdatedEdges] = useState(null);
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
          data: { ip: null, data_received: null, data_shared: null, routingTable: new Set(), switchingTable: new Set(), type: name, name: name, image: image[0].image },
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


  const activeKey = 2;

  const nodeTypes = useMemo(() => ({
    component: Component,
  }), []);
  const fetchEachPath = (switchNode) => {
    const connectedEdges = edges.filter((edge) => edge.source === switchNode.id);
    connectedEdges.forEach((edge) => {
      const targetNode = nodes.find((node) => node.id === edge.target);
      if (targetNode.data.type === "Switch") {
        fetchEachPath(targetNode);
      }
      switchNode.data.switchingTable.add(edge.target);
    });
    const updatedNodes = nodes.map((node) =>
      node.id === switchNode.id ? switchNode : node
    );
    setNodes(updatedNodes);
  };
  const domainFind = () => {
    if (data.collisionDomain == 0 && data.broadcastDomain == 0) {
      const switches = nodes.filter((node) => node.data.type === "Hub");
      switches.forEach(() => {
        data.broadcastDomain++;
      }
      )
    }
    return;
  }
  const switchingTableFetch = () => {
    const switches = nodes.filter((node) => node.data.type === "Switch");
    switches.forEach((switchNode) => {
      console.log(switchNode);
      fetchEachPath(switchNode);
    });
  };
  const fetchRoutingPaths = (routerNode, parentNode, hops = 0) => {
    const connectedEdges = edges.filter((edge) => edge.source === routerNode.id);

    connectedEdges.forEach((edge) => {
      const targetNode = nodes.find((node) => node.id === edge.target);

      if (targetNode.id !== routerNode.id) {
        if (!parentNode) {
          parentNode = routerNode;
        }

        const hopsToTarget = hops + 1;
        const routingEntry = { target: edge.target, hops: hopsToTarget };
        parentNode.data.routingTable.add(routingEntry);

        if (targetNode.data.type === "Router" || targetNode.data.type === "Switch") {
          fetchRoutingPaths(targetNode, parentNode, hopsToTarget);
        }
      }
    });

    const updatedNodes = nodes.map((node) =>
      node.id === parentNode.id ? parentNode : node
    );
    setNodes(updatedNodes);
  };

  const routingTableFetch = () => {
    const routers = nodes.filter((node) => node.data.type === "Router");

    routers.forEach((routerNode) => {
      fetchRoutingPaths(routerNode, null);
    });
  };


  const handleSimulate = () => {
    const hasNodeWithNullIp = nodes.some((obj) => obj.data.ip === null);
    const hasNodeWithNullGateway = nodes.some((obj) => obj.data.Gateway === null);
    if (hasNodeWithNullIp) {
      alert('Alert: Some nodes have null IP addresses.');
      return;
    }
    if (hasNodeWithNullGateway) {
      alert('Alert: Some nodes have null Gateway addresses.');
      return 0;
    }

    const path = data.path[data.selectedComponent];
    const sourceNode = nodes.find((node) => node.id === path[0]);
    if (!sourceNode) {
      console.error("Source node not found");
      return;
    }
    let updatedNodes = [...nodes];
    let updatedEdges = [...edges];
    setUpdatedEdges(updatedNodes)
    setUpdatedNodes(updatedEdges)
    sourceNode.data.data_shared = data.preview;
    updatedNodes = updatedNodes.map((node) =>
      node.id === sourceNode.id ? sourceNode : node
    );
    for (let i = 1; i < path.length; i++) {
      const targetNode = updatedNodes.find((node) => node.id === path[i]);
      if (!targetNode) {
        console.error("Target node not found");
        continue;
      }
      const edge = updatedEdges.find(
        (edge) => edge.source === path[i - 1] && edge.target === path[i]
      );
      if (!edge) {
        console.error("Edge not found between nodes");
        continue;
      }
      if (targetNode.data.type === "Switch" || targetNode.data.type === "Hub") {
        targetNode.data.data_shared = sourceNode.data.data_shared;
        if (targetNode.data.type === "Hub") {
          const HubEdges = updatedEdges.filter(edge => edge.source === targetNode.id);
          HubEdges.forEach((HubEdge) => {
            const hubTargetNode = updatedNodes.find((node) => node.id === HubEdge.target);
            hubTargetNode.data.data_received = sourceNode.data.data_shared;
            const updatedHubEdge = { ...HubEdge, data: data.preview, animated: true };
            updatedEdges = updatedEdges.map((edgeItem) =>
              edgeItem.id === updatedHubEdge.id ? updatedHubEdge : edgeItem
            );
          })
        }
      }
      targetNode.data.data_received = sourceNode.data.data_shared;
      updatedNodes = updatedNodes.map((node) =>
        node.id === targetNode.id ? targetNode : node
      );
      const updatedEdge = { ...edge, data: data.preview, animated: true };
      updatedEdges = updatedEdges.map((edgeItem) =>
        edgeItem.id === edge.id ? updatedEdge : edgeItem
      );
    }
    setNodes(updatedNodes);
    setEdges(updatedEdges);
    console.log(updatedEdges);
    console.log(updatedNodes);
    handleClose()
  };




  const onNodeClick = (event, node) => {
    setSelectedComponent(node)
    setComp(false);
    console.log('Node clicked:', node);
    if (node.data.type === "Router" && node.data.ip !== null && node.data.routingTable.size < 1) {
      routingTableFetch()
    }
    domainFind()
    switchingTableFetch()
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
  const getIp = (id) => {
    const node = nodes.find((node) => node.id === id[0]);
    return node ? node.data.ip : "Not Found";
  };
  const getMac = (id) => {
    const node = nodes.find((node) => node.id === id[0]);
    return node ? node.mac : "Not Found";
  };
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
  const dataSet = (node) => {
    setSelectedComponent(node)
    onOpen()
  }
  const stopSimulate = () => {
    // console.log(updatedNodes);
    // console.log(updatedEdges);
    // setNodes([...updatedNodes])
    // setEdges([...updatedEdges])
    setUpdatedEdges(null)
    setUpdatedNodes(null)
  }
  return (
    <>
      <Flex flexDirection="column" height="100vh">
        <Flex height="65px" maxH="65px" mx='2' justifyContent="flex-end" alignItems="center" bg="#F4F4F4">
          <Image src={logo} boxSize={150} mr="auto" ml={20} mt={-4} mb={-2} />

          <Flex>
            <Link mr="20px" _hover={{ color: "#EB4999", textDecoration: "underline" }}>
              <Text fontSize="lg" fontWeight="bold" color="gray.600">GitHub</Text>
            </Link>
            <Link mr="20px" _hover={{ color: "#EB4999", textDecoration: "underline" }}>
              <Text fontSize="lg" fontWeight="bold" color="gray.600">Credits</Text>
            </Link>
          </Flex>
        </Flex>
        <Divider borderColor="#EB4999" mx="2" width='auto' />
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
              <Button onClick={handleClick} variant="outline" py='2' borderRadius={0} borderWidth="1px" borderColor="transparent" borderTopColor="#EB4999">
                {comp ? "Components" : "Control Box"}
                <Flex alignItems="center" ml="20px" my='8px'>
                  {comp ? <SlArrowLeft /> : <SlArrowRight />}
                </Flex>
              </Button>
              {comp && <Flex flexDirection="column" height="400px" border="2px solid gray.100">
                <Divider borderColor="#EB4999" mb="2" height='auto' />
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
              <Divider borderColor="#EB4999" mb="2" height='auto' />
              {!comp &&
                <Flex flexDirection="column" style={{ height: "100%" }} >
                  {selectedComponent ? (<Box height="400px" rounded="10" mr='2'>
                    <Flex justifyContent='center' py='2' rounded="10">
                      <Text fontSize='20' fontWeight='bold' >{selectedComponent.data.name}
                        <Button bg='transparent' fontSize='25' p='0' onClick={() => dataSet(selectedComponent)}> <PiNotePencilDuotone /> </Button></Text>
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
                      <Text fontWeight="bold" mr={1}>Shared: </Text>
                      {selectedComponent.data.data_shared ? selectedComponent.data.data_shared : "No data Found"}</Flex>
                    <Flex ml={8} rounded="10" fontSize='sm'>
                      <Text fontWeight="bold" mr={1}>Recieved: </Text>
                      {selectedComponent.data.data_received ? selectedComponent.data.data_received : "No data Found"}</Flex>
                    {selectedComponent.data.data_recieved && (<Flex ml={8} rounded="10" fontSize='sm'>
                      <Text fontWeight="bold" mr={1}>Data Received: </Text>{selectedComponent.data.data_recieved}</Flex>)}
                    {selectedComponent.data.switchingTable.size !== 0 && (
                      <Flex direction="column" mx={6} my={1} px={2} rounded={5} border="1px solid #CBD5E0">
                        <Text fontSize="sm" fontWeight="bold" textAlign="center">Switching Table</Text>
                        <Flex justify="space-between" fontSize="sm" mt={1} >
                          <Text>Input Mac</Text>
                          <Divider borderColor='gray.300' h="auto" orientation='vertical' />
                          <Text>Output Mac</Text>
                        </Flex>
                        <Divider borderColor='gray.300' w="auto" />
                        <Flex direction="column" >
                          {[...selectedComponent.data.switchingTable.entries()].map(([i, j], index) => (
                            <Flex key={index} justify="space-between" fontSize="sm">
                              <Text fontSize={11}>{selectedComponent.mac}</Text>
                              <Text fontSize={11}>{getMac(i)}</Text>
                            </Flex>
                          ))}
                        </Flex>
                      </Flex>
                    )}
                    <>{divider("Network")}</>
                    <Flex ml={8} rounded="10" fontSize='sm'>
                      <Text fontWeight="bold" mr={1}>IP Address: </Text>{selectedComponent.data.ip}
                    </Flex>
                    <Flex ml={8} rounded="10" fontSize='sm'>
                      <Text fontWeight="bold" mr={1}>Gateway: </Text>{selectedComponent.data.gateway}
                    </Flex>
                    {selectedComponent.data.routingTable && selectedComponent.data.routingTable.size !== 0 && (
                      <Flex direction="column" mx={6} my={1} px={2} rounded={5} border="1px solid #CBD5E0">
                        <Text fontSize="sm" fontWeight="bold" textAlign="center">Routing Table</Text>
                        <Flex justify="space-between" fontSize="sm" mt={1} >
                          <Text>Input IP</Text>
                          <Divider borderColor='gray.300' h="auto" orientation='vertical' />
                          <Text>Output IP</Text>
                          <Divider borderColor='gray.300' h="auto" orientation='vertical' />
                          <Text>Hops</Text>
                        </Flex>
                        <Divider borderColor='gray.300' w="auto" />
                        <Flex direction="column" >
                          {[...selectedComponent.data.routingTable.entries()].map(([i, j], index) => (
                            <Flex key={index} justify="space-between" fontSize="sm">
                              <Text fontSize={11}>{selectedComponent.data.ip}</Text>
                              <Text fontSize={11}>{getIp(i.target)}</Text>
                              <Text fontSize={11}>{i.hops}</Text>
                            </Flex>
                          ))}
                        </Flex>
                      </Flex>
                    )}
                    <>{divider("Transport")}</>
                    <>{divider("Application")}</>
                    <Divider mx='6' w='auto' borderColor='gray.300' />
                  </Box>) : (<Box height="400px" p="auto" textAlign="center">Component is deleted or not selected</Box>)}

                </Flex>}
            </Flex>
          </Flex>
          <Divider borderColor="#EB4999" orientation="vertical" my="2" height='auto' />
          <Flex overflow="hidden" flexDirection="column">
            <Divider borderColor='black' mt='1' mx="2" w='auto' />
            <Flex height="50px" mx="2" justifyContent='end'>
              <Flex justifyContent="center" alignItems="center" m={0} mr="auto" ml={2} h="30px" my="auto" fontSize={24} rounded={5}>
                <Text fontSize={15} fontWeight="bold">Transmission Mode:</Text> <Text ml={1} fontSize={15}>Half-Duplex</Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center" m={0} mr="auto" ml={2} h="30px" my="auto" fontSize={24} rounded={5}>
                <Text fontSize={15} fontWeight="bold">Collision Domain:</Text> <Text ml={1} fontSize={15}>{data.collisionDomain}</Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center" m={0} mr="auto" ml={2} h="30px" my="auto" fontSize={24} rounded={5}>
                <Text fontSize={15} fontWeight="bold">Broadcast Domain:</Text> <Text ml={1} fontSize={15}>{data.broadcastDomain}</Text>
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
              {updatedEdges !== null &&
                <Divider borderColor='gray.300' my='1' mx="2" h='auto' orientation='vertical' />}
              {updatedEdges !== null && (<Button bg='#EB4999' color='white' rounded='30' mx='6' my='1' height='auto' onClick={() => stopSimulate()}>Stop Simulate</Button>)}
            </Flex>
            <Divider borderColor="#EB4999" mx="2" width='auto' />
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


      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent >
          {selectedComponent && (
            <Modal isOpen={isOpen} onClose={handleClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{selectedComponent.data.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Flex align="center" mb={4}>
                    <Input value={data.rename} onChange={(e) => handleRename(e, false)} />
                    <Button ml={2} colorScheme="blue" onClick={(e) => handleRename(e, true)}>Rename</Button>
                  </Flex>
                  <Flex align="center" mb={4}>
                    <Input value={data.ip} onChange={(e) => handleIpChange(e)} />
                    <Button ml={2} colorScheme="blue" onClick={(e) => handleIp(e)}>IPv4</Button>
                  </Flex>
                  <Flex align="center" mb={4}>
                    <Input value={data.gateway} onChange={(e) => handleGatewayChange(e)} />
                    <Button ml={2} colorScheme="blue" onClick={(e) => handleGateway(e)}>Gateway</Button>
                  </Flex>
                  {divider("Data")}
                  <Flex flexDirection="column" alignItems="center">
                    <Input value={data.binaryData} onChange={(e) => handleDataChange(e)} placeholder="Enter data" />
                    {Object.keys(data.path).length === 0 ? (
                      <Button colorScheme="blue" w="100px" my={2} onClick={handleFetchPath}>Fetch Path</Button>) :
                      (
                        <>
                          <Text fontWeight="bold" >Available Components are: </Text>
                          <ButtonGroup flexDirection="column" style={{ width: "100%" }}>
                            {Object.keys(data.path).map((component) => (
                              <Button
                                fontSize={13}
                                key={component}
                                ml={2}
                                px={2}
                                onClick={() => handleComponentSelect(component)}
                                variant={data.selectedComponent === component ? 'solid' : 'outline'}
                                colorScheme={data.selectedComponent === component ? 'blue' : 'gray'}
                                fontWeight="none"
                              >
                                ID: {component}  <Text mx={2} fontWeight="bold" > --{getMac(component)}--</Text>   is available
                              </Button>
                            ))}
                          </ButtonGroup></>
                      )}</Flex>
                  {divider("Error Control")}
                  <Select mb={4} onChange={handleDetectionChange}>
                    <option value="CRC">CRC</option>
                    <option value="Parity">Parity</option>
                    <option value="Hamming">Hamming</option>
                  </Select>
                  {data.EDetection === "Hamming" && (
                    <Flex>
                      <Text fontWeight="bold" mx={2}>Error Correction:</Text> Hamming
                    </Flex>
                  )}
                  {data.EDetection === "CRC" && (
                    <Flex>
                      <Text fontWeight="bold" mx={2}>CRC-Generator:</Text> 101
                    </Flex>
                  )}
                  {divider("Framing")}
                  <Flex>
                    <Text fontWeight="bold" mx={2}>Framming Technique:</Text> {data.framming}<br /></Flex>
                  <Flex>
                    <Text fontWeight="bold" mx={2}>Flag:</Text> {data.flag}
                  </Flex>
                  {data.preview !== null && divider("Preview")}
                  {data.preview !== null && (
                    <>
                      <Flex>
                        <Text fontWeight="bold" mx={2}>Destination Mac:</Text> {getMac(data.selectedComponent)}<br /></Flex>
                      <Flex>
                        <Text fontWeight="bold" mx={2}>Final Frame:</Text> <Text textColor="green" mr={1}>{data.flag}</Text> {data.frameword} <Text ml={1} textColor="green">{data.flag}</Text>
                      </Flex>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  {data.preview ? (<Button colorScheme="blue" mr={3} onClick={handleSimulate}>
                    Simulate
                  </Button>) : (<Button colorScheme="blue" mr={3} onClick={handlePreview}>
                    Preview
                  </Button>)}
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </ModalContent >
      </Modal >
    </>
  );
}



export default App;
