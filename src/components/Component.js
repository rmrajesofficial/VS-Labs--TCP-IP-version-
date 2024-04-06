
import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Handle } from 'reactflow';
const Component = ({ id, data }) => {
    return (
        <Flex flexDirection="column" style={{ height: "100%" }} >
            <Flex className="custom-node">
                <Handle
                    type="source"
                    position="right"
                    style={{ borderRadius: '50%', background: '#4A5568' }}
                    _hover={{ background: 'black' }}
                />
                <Image src={data.image} alt="" />
                <Handle
                    type="target"
                    position="left"
                    style={{ borderRadius: '50%', background: '#4A5568' }}
                    _hover={{ background: 'black' }}
                />
            </Flex>
            <Flex justifyContent="center">
                <Text fontSize="7px" >{data.type}</Text></Flex>
        </Flex>
    );
};

export default Component;
