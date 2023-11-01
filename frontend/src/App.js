import axios from "axios";
import { ChakraProvider, HStack, VStack } from '@chakra-ui/react'
import { format } from "date-fns";
import { Heading, Button, Text, Box, } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar.js"
import './App.css';

const baseUrl = "http://127.0.0.1:5000"

function App() {

  return (
    <ChakraProvider>
      <Navbar />

      <div className="App">
        <section className="home-section">
          <VStack>
            <Heading size='4xl' className="glow">
              AI Powered Misinformation Detector
            </Heading>

            <HStack className="home-button">
              <Box align='center' className="ai-output">
                <Box className="space">
                  <Heading size='lg'> AI Fact Checker </Heading>
                </Box>
                <Box>
                  <Text className="sidespace">Use our state-of-the-art AI Engine to check any article on the internet.</Text>
                </Box>
                <Box>
                  <a href="/ai"><Button margin="10px" colorScheme='blue'>Go Here</Button></a>

                </Box>
              </Box>
              <Box align='center' className="ai-output">
                <Box className="space">
                  <Heading size='lg'> Misinformation Game </Heading>
                </Box>
                <Box>
                  <Text className="sidespace">Test your knowledge and skills of finding misinformation through the Truth Challenge</Text>
                </Box>
                <Box>
                  <a href="/game" ><Button margin="10px" colorScheme='blue'>Play Now</Button></a>
                </Box>
              </Box>
            </HStack>

          </VStack>


        </section>

      </div>
    </ChakraProvider>

  );
}

export default App;