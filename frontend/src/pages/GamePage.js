import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar.js"
import '../App.css';
import {
    HStack,
    Heading,
    VStack,
    Image,
    Box,
    Button,

} from '@chakra-ui/react';

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

import { ChakraProvider, } from '@chakra-ui/react';

import game_data from '../data/game_data.js';



function GamePage() {
    //console.log(game_data)
    const [visible, setVisible] = useState("hidden");
    const [counter, setCounter] = useState(0);
    const [score, setScore] = useState(0);
    const gamedata = [game_data];

    const imageArray = game_data.map((x) => x.image)
    const [newsimage, setNewsimage] = useState(imageArray[0])

    const titleArray = game_data.map((x) => x.title)
    const [title, setTitle] = useState(titleArray[0])

    const valueArray = game_data.map((x) => x.value)
    const [value, setValue] = useState(valueArray[0])

    function setDataReal() {

        if (counter < 6) {
            if (value === true) {
                setScore(prevScore => prevScore + 1)
            }
            setTitle(prevTitle => titleArray[titleArray.indexOf(prevTitle) + 1])
            setNewsimage(prevImage => imageArray[imageArray.indexOf(prevImage) + 1])
            setCounter(prevCounter => prevCounter + 1)
            setValue(prevValue => valueArray[valueArray.indexOf(prevValue) + 1])
        }
        else {
            setVisible("visible")
        }


    }

    function setDataFake() {



        //console.log(counter)
        if (counter < 6) {
            if (value === false) {
                setScore(prevScore => prevScore + 1)
            }
            setTitle(prevTitle => titleArray[titleArray.indexOf(prevTitle) + 1])
            setNewsimage(prevImage => imageArray[imageArray.indexOf(prevImage) + 1])
            setCounter(prevCounter => prevCounter + 1)
            setValue(prevValue => valueArray[valueArray.indexOf(prevValue) + 1])
        }
        else {
            setVisible("visible")
        }


    }

    return (
        <ChakraProvider>
            <div>
                <Navbar />

                <section className="game-section">
                    <Alert visibility={visible} color={"black"} status='success'>
                        <AlertIcon />
                        Great Work! You got {score} correct! Refresh to try again.
                    </Alert>
                    <VStack>
                        <Heading className='game-header'>
                            Truth Challenge. Test your knowledge.
                        </Heading>
                        <Heading size="md">Identify if the article is fake or real just from the title.</Heading>
                        <Image className='game-images' w="50%" src={newsimage} alt='Magnifying Glass' />
                        <Box w="60%" className="game-output"> {title} </Box>
                        <HStack>
                            <Button margin="10px" colorScheme='blue' onClick={setDataReal}>
                                Real
                            </Button>
                            <Button margin="10px" colorScheme='blue' onClick={setDataFake}>
                                Fake
                            </Button>
                        </HStack>

                    </VStack>


                </section>

            </div>
        </ChakraProvider>
    )
}

export default GamePage