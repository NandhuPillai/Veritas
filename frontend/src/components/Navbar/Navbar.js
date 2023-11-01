import React from "react"
import { Button, ButtonGroup, LinkOverlay } from '@chakra-ui/react'


export default function Navbar() {
    return (
        <header className="header">
            <a className="header--title" href="/"><h2 className="header--title">Veritas</h2></a>
            <ButtonGroup variant='outline' spacing='6'>
                <a href="/ai"><Button className="header--project" colorScheme='black' variant='outline'>AI Reliability</Button></a>
                <a href="/game"><Button className="header--project" colorScheme='black' variant='outline'>Truth Challenge</Button></a>
                <a href="/info"><Button className="header--project" colorScheme='black' variant='outline'>Info Center</Button></a>
            </ButtonGroup>
        </header>
    )
}